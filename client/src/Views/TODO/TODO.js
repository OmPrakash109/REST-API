import { useEffect, useState } from 'react'
import Styles from './TODO.module.css'
import { dummy } from './dummy'
import axios from 'axios';  // axios is an npm module that we use make to make API call from the client

// To make the server accept the request from the client, we install a npm module 'npm i cors' in server folder and we have to import the module in server.js file of server folder

export function TODO(props) {
    // We use useState() hook to manage the state change
    const [newTodo, setNewTodo] = useState('');          // 'newTodo, setNewTodo' useState is being used to store and update the data in 'newTodo' entered in text box of "+ New Task" button, after getting a data it sends it to DB using addTodo() and 'newTodo' becomes '' empty again as written in code
                                                         //newTodo useState() will have the title of the object/document as for creating an object/document, we only require title as a necessity   
                                                        //we just have to get the data from the newTodo useState() and pass that as an object in the body of the api call that we do through axios

    const [todoData, setTodoData] = useState([]);    // 'todoData , setToDoData' is being used to store the fetched data with API from DB in 'todoData'
    const [loading, setLoading] = useState(true);
    console.log("todoDate", todoData);

    useEffect(() => {     //as soon as the page loads/rerenders, the functions inside will be called
        const fetchTodo = async () => {
            const apiData = await getTodo();  //getTodo() will get all the data/todos like getting the data that we added using addTodo() as we have created our own dummy DB and store in 'apiData' variable in the form of list/array of objects
            setTodoData(apiData);               //with setTodoData(apiData), we are updating the 'todoData' state variable with the latest fected data
            setLoading(false)
        }
        fetchTodo();
    }, [])

    //We have to define out API calls within these 4 function : getTodo(), addTodo(), deleteTodo(), updateTodo()
    const getTodo = async () => {              // getTodo() async method of api call, sort of handled by 'todoData' state variable as data fetch karke 'todoDate' me rakhte
        const options = {               //first we define options because we pass these options to axios and these options will tell what sort of request should we do, what sort of method should we use for that request, what is the endpoint(url) i have to hit for that request
            method: "GET",
            url: "http://localhost:8000/api/todo",
            headers: {
                accept: "application/json"
            }
        }
        try {
            const response = await axios.request(options) //.request() is a method axios uses to make any sort of API request
            return response.data;    // there are many stuffs in response and we just need data, so we returned response.data       
        } catch (err) {
            console.log(err);
            return [];          // if it is erroring out the getTodo() should fetch a empty list as if it will be empty list so .length() will be zero so it'll just tell 'No task available' as written return section of this xml
        }
    }

    const addTodo = () => {       //sort of handled by 'newTodo' state variable as 'newTodo' ke value ko add kiya DB me
        const options = {
            method: "POST",
            url: "http://localhost:8000/api/todo",
            headers: {
                accept: "application/json"
            },
            data: {    //In options of 'post' api we also write 'data' to send the data what needs to be posted, in the body
                title: newTodo
            }
        }
        axios               // for getTodo API call, we used async await format to handle the asyn operation and we are using Promise format, both are valid
        .request(options) // since it returns a promise so we'll handle it using .then and .catch
        .then(response => {
            console.log(response.data)  //in 'response' the data is actually in data so we write response.data
            setTodoData(prevData => [...prevData, response.data])  //Here we are just deconstructing the list of objects and attaching this response.data that is whatever the object i am getting back from the new response
        })
        .catch(error => {
            console.log(error)
        })
  
    }

    const deleteTodo = (id) => {
        const options = {
            method: "DELETE",
            url: `http://localhost:8000/api/todo/${id}`,
            headers: {
                accept: "application/json"
            }
        }


    };

    const updateTodo = (id) => {
        const options = {
            method: "PATCH",
            url: `http://localhost:8000/api/todo/${id}`,
            headers: {
                accept: "application/json"
            }
        }
    };

    return (
        <div className={Styles.ancestorContainer}>
            <div className={Styles.headerContainer}>
                <h1>
                    Tasks
                </h1>
                <span>
                    <input
                        className={Styles.todoInput}
                        type='text'
                        name='New Todo'
                        value={newTodo}      
                        onChange={(event) => {               // onChange = event handler used primarily with form elements. ex. <input>, <textarea>, <select>, <radio>. It Triggers a function every time the value of the input changes
                            setNewTodo(event.target.value)      //whenever we write or delete something the function inside gets invoked/triggered and it returns an 'event' object automatically with the help of which we can acces and store the changed/updated value in form element(here <input/>) using 'event.target.value' and pass it to 'setNewTodo' updating function to change/update the value of its stateful variable 'newTodo'

                        }}
                    />
                    <button
                        id='addButton'
                        name='add'
                        className={Styles.addButton}
                        onClick={() => {
                            addTodo()          //with addTodo(), we'll call the 'post' api which post the data whatever it takes, here it takes the data of {newTodo} which is the title of the document/object which is sufficient to create or add
                            setNewTodo('')
                        }}
                    >
                        + New Todo
                    </button>
                </span>
            </div>
            <div id='todoContainer' className={Styles.todoContainer}>
                {loading ? (
                    <p style={{ color: 'white' }}>Loading...</p>
                ) : (
                    todoData?.length > 0 ? (      //here we wrote ?.length > 0 so what it first checks if length is valid then only it proceeds, since there is no todos initially, it directly jumps to : part 
                        todoData?.map((entry, index) => (  //we can call .map() on todoData as it is basically an array of objects
                            <div key={entry._id} className={Styles.todo}>
                                <span className={Styles.infoContainer}>
                                    <input
                                        type='checkbox'
                                        checked={entry.done}
                                        onChange={() => {
                                            updateTodo(entry._id);
                                        }}
                                    />
                                    {entry.title}
                                </span>
                                <span
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        deleteTodo(entry._id);
                                    }}
                                >
                                    Delete
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className={Styles.noTodoMessage}>No tasks available. Please add a new task.</p>
                    )
                )}
            </div>
        </div>
    )
}
