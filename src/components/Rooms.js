import './App.scss';
import { Component } from 'react';
import firebase from './firebase';
// import Rooms from './components/Rooms';

class App extends Component {

    // getting all the rooms
    constructor() {
        super();
        this.state = {
            rooms: [],
            tasks: []
        }
    }

    componentDidMount() {
        // firebase database
        const dbRef = firebase.database().ref();

        // getting data from firebase
        dbRef.on('value', (data) => {
            const firebaseDataObj = data.val();

            console.log("data obj", firebaseDataObj);

            let roomArray = [];
            let taskArray = [];

            // looping through object
            for (let roomValue in firebaseDataObj) {

                roomArray.push(roomValue)

                console.log("roomArray", roomArray);
                console.log("Room value", roomValue);

                const taskId = firebaseDataObj[roomValue]

                console.log("taskId", taskId);


                for (let taskValue in taskId) {

                    const taskName = taskId[taskValue]
                    console.log("taskName", taskName);




                    // format it to the way we want it
                    const formattedObj = {
                        id: taskValue,
                        task: taskName
                    }

                    taskArray.push(formattedObj)
                    console.log("formattedObj", formattedObj);

                    console.log("taskArray", taskArray);
                }

            }


            // updating our this.state.room state with firebase data
            this.setState({
                rooms: roomArray,
                tasks: taskArray
            })

        })
    }



    handleAdd = (e) => {
        e.preventDefault();

        const dbRef = firebase.database().ref();

        dbRef.push(this.state.userInput);
    }

    handleInputChange = (e) => {
        console.log(e.target.value);

        this.setState({
            userInput: e.target.value
        })
    }

    // removing tasks
    // removeTask = (taskId) => {
    //   const dbRef = firebase.database().ref();

    //   dbRef.child(taskId).remove();
    // }

    render() {
        return (
            <div className="wrapper">
                <header>
                    <h1>I Dream of Cleannie</h1>
                    <h2>Keep track of everything in your home you need to clean</h2>
                </header>
                <main>
                    {
                        this.state.rooms.map((room, i) => {
                            return (
                                <div>
                                    <ul>
                                        <button key={i}>{room}</button>
                                        {
                                            this.state.tasks.map((task) => {
                                                return (
                                                    <li key={task.id}><p>{task.task}</p></li>
                                                )
                                            })
                                        }
                                    </ul>


                                </div>

                            )
                        })
                    }
                    {/* <ul>
            {
              this.state.tasks.map((task) => {
                return (
                  <li key={task.id}><button>{task.name}</button></li>
                )
              })
            }
          </ul> */}
                    {/* <form>
            <label htmlFor="newTask">add a new task</label>
            <input type="text" id="newTask" onChange={this.handleInputChange} />
            <button onClick={this.handleAdd}>add</button>
          </form> */}
                </main>
            </div>
        )
    }
}

export default App;

/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use https://firebase.google.com/docs/web/setup#available-libraries -->

MVP (Minimum Viable Product) Goals
- have buttons with different rooms in a house
- click on room to show cleaning tasks associated with that room
- tasks can be marked as completed, deleted, or user can add their own (saved in firebase)

Stretch Goals
- user can add their own/delete rooms
- add calendar that shows date task last completed or date user wants to complete task by

*/

// display buttons that user can click on that corresponds to a specific room in a home

// when button is clicked all the tasks associated with that room will be displayed on the page

// user can add a task in an input field which will be saved through firebase

// user can delete a task they have added or mark it as complete

// previous room tasks will be hidden when user clicks on a different room button and tasks associated with that room will be displayed on the page
