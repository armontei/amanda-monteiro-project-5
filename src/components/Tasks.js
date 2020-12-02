import './App.scss';
import { Component } from 'react';
import firebase from './firebase';
// import Rooms from './components/Rooms';

class App extends Component {

    // getting all the rooms
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            tasks: [],
            keys: [],
            userInput: ''
        }
    }

    componentDidMount() {
        // firebase database
        const dbRef = firebase.database().ref();


        // getting data from firebase
        dbRef.on('value', (data) => {

            const firebaseDataObj = data.val();


            // const objArray = Object.keys(firebaseDataObj).map((key) => {
            //   return [(key), Object.values(firebaseDataObj[key])];
            // })



            let roomArray = [];
            let taskArray = [];


            // looping through object
            for (let roomValue in firebaseDataObj) {



                roomArray.push(roomValue)

                const taskId = firebaseDataObj[roomValue]

                console.log("taskId", taskId);


                taskArray.push(taskId)
                console.log("taskArray", taskArray);


                // for (let taskKey in taskId) {
                //   // console.log("test", test);
                //   // console.log("testval", taskId[test].task);

                //   const taskName = taskId[taskKey].task

                //   const formattedObj = {
                //     id: taskKey,
                //     name: taskName
                //   };

                //   taskArray.push(formattedObj)
                // }


                this.setState({
                    rooms: roomArray,
                    tasks: taskArray
                })

            }



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
                        return (
                            <div>

                                <h3 key={i}>{room}</h3>

                                <ul>

                                    {/* {this.state.tasks.map((task) => {

                    return (
                      <li key={taskId}>
                        <p>{taskId}</p>
                        <button onClick={() => { this.removeTask(task.id) }}>remove</button>

                      </li>

                    )

                  })
                  }  */}
                                    <form key={room}>
                                        <label htmlFor="newTask" className="srOnly">Add new task</label>
                                        <input type="text" id="newTask" onChange={this.handleInput} />
                                        <button onClick={(e) => { this.handleAdd(e, room) }}>Add Task</button>
                                    </form>
                                </ul>
                            </div>

                        )
                    })
                    }


                </main>
            </div>
        )
    }
}

export default App;

