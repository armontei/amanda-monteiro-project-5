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
            userInput: ''
        }
    }

    componentDidMount() {
        // firebase database
        const dbRef = firebase.database().ref();

        // getting data from firebase
        dbRef.on('value', (data) => {
            const firebaseDataObj = data.val();

            console.log("firebaseDataObj", firebaseDataObj);

            const objArray = Object.keys(firebaseDataObj).map((key) => [(key), firebaseDataObj[key]]);

            // let testArray = Object.values(taskId);
            console.log("objArray", objArray);

            // console.log("taskArray", taskArray);
            // let taskArray = [];

            this.setState({
                rooms: objArray
            })

        })
    }



    handleAdd = (e, room) => {
        e.preventDefault();

        const dbRef = firebase.database().ref();

        let roomId = `/${room[0]}/`

        const newTask = {
            task: this.state.userInput,
            complete: false
        }

        dbRef.child(roomId).push(newTask);

    }



    handleInput = (e) => {
        console.log("target value", e.target.value);


        this.setState({
            userInput: e.target.value
        })
    }

    // removing tasks
    removeTask = (taskKey, room) => {
        const dbRef = firebase.database().ref();
        let roomId = `/${room[0]}/`

        dbRef.child(roomId + taskKey).remove()
    }

    render() {

        return (
            <div className="wrapper">
                <header>
                    <h1>I Dream of Cleannie</h1>
                    <h2>Keep track of everything in your home you need to clean</h2>
                </header>
                <main>
                    {this.state.rooms.map((room, i) => {
                        let roomName = room;
                        let tasks = [];
                        // testing w/ greg
                        for (let taskId in room[1]) {
                            // console.log("taskId: " + taskId);
                            // console.log("in room: " + room[1][taskId]);
                            const taskToAdd = [taskId, room[1][taskId]];
                            tasks.push(taskToAdd);
                        }
                        // console.log(tasks);

                        return (
                            <ul>
                                <h3 key={i}>{room[0]}</h3>

                                {tasks.map(task => {
                                    return (
                                        <li key={task[0]}>
                                        <p>{task[1]}</p>
                                        <button onClick={() => { this.removeTask(task[0], roomName) }}>remove</button>
                                        </li>
                                        ) 
                                    })
                                }

                                <form key={room[0]}>
                                    <label htmlFor="newTask" className="srOnly">Add new task</label>
                                    <input type="text" id="newTask" onChange={this.handleInput} />
                                    <button onClick={(e) => { this.handleAdd(e, roomName) }}>Add Task</button>
                                </form>
                            </ul>
                        )
                    })
                    }
                </main>
            </div>
        )
    }
}

export default App;

