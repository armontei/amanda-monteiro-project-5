import './App.scss';
import { Component } from 'react';
import firebase from './firebase';

// font awesome library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faSquare as farSquare } from "@fortawesome/free-regular-svg-icons";

library.add(faCheckSquare, farSquare, faTrashAlt);


class App extends Component {

  // getting all the rooms
  constructor(props) {
    super(props);
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

      const objArray = Object.keys(firebaseDataObj).map((key) => [(key), firebaseDataObj[key]]);

      this.setState({
        rooms: objArray
      })

    })
  }


  // getting input from the user for new tasks they want to add
  handleInput = (e) => {

    this.setState({
      userInput: e.target.value,
    })
  }

  // adding the new task to the page
  handleAdd = (e, room) => {
    // prevent form fro refreshing the page on submit
    e.preventDefault();
    
    const dbRef = firebase.database().ref();

    let roomId = `/${room[0]}/`

    if (this.state.userInput === "") {
      alert("Please enter a task!")
    } else {
      // object structure which new task will be added
      const newTask = {
        task: this.state.userInput,
        complete: "no"
      }

      // adding a new task in the form of a child element to the specified room
      dbRef.child(roomId).push(newTask);
    }

    // resetting user input
    this.setState({
      userInput: ''
    })

    document.getElementById(room[0]).value = '';

  }

  // complete task
  completeTask = (taskKey, room, status) => {
    const dbRef = firebase.database().ref();
    let roomId = `/${room[0]}/`


    if (status === "no") {
      dbRef.child(roomId + taskKey).update({
        complete: "yes"
      })
    } else {
      dbRef.child(roomId + taskKey).update({
        complete: "no"
      })

    }
  }

  // removing tasks
  removeTask = (taskKey, room) => {
    const dbRef = firebase.database().ref();
    let roomId = `/${room[0]}/`

    dbRef.child(roomId + taskKey).remove()
  }

  render() {

    return (
      <div>

        {/* HEADER SECTION */}
        <header>
          <div className="headerOverlay">
            <h1 className="wrapper">I Dream of Cleannie</h1>
            <h2 className="wrapper">Keep track of everything in your home you need to clean</h2>
          </div>
        </header>

        {/* MAIN SECTION */}
        <main className="wrapper content">

          {/* mapping through initial array with rooms and task objects inside each room */}
          {this.state.rooms.map((room, i) => {

            // creating another array with tasks to map through
            let tasks = [room[1]];

              return (
                
                <div className="taskContainer">
                  {/* displaying names of all the rooms */}
                  <h3 key={i}>{room[0]}</h3>

                  {/* mapping through the tasks associated with the room */}
                  {tasks.map(task => {

                    // creating a new array outside for loop because if the return is inside the for loop only the first item will be returned and not the rest of the items
                    let newArray = [];

                    // mapping through task objects so it can be turned into an array to extract information
                    for (let taskId in task) {
                      // getting the task ID, task name, and completed status inside an array
                      newArray.push([taskId, task[taskId].task, task[taskId].complete]);
                    }

                    return (
                      <ul>

                        {/* mapping through the new array with created with all the task values */}
                        { newArray.map( realTasks => {
                          
                          // console.log(newArray);
                          return (
                            // displaying the tasks to the page along with a button to remove the task
                            <li key={realTasks[0]} className={realTasks[0]}>

                              <div tabindex="0" aria-label="Mark task as complete" onClick={() => { this.completeTask(realTasks[0], room, realTasks[2]) }} className="taskUpdate">
                                <button tabindex="-1" className={realTasks[2] + "Btn"}>
                                  {/* font awesome icon that will change between check and unchecked when clicked */}
                                  <FontAwesomeIcon icon={(realTasks[2] === "yes") ? "check-square" :  ['far', 'square']} />
                                </button>
                                <p className={realTasks[2]}>{realTasks[1]}</p>
                              </div>

                              <button aria-label="Remove this task" onClick={() => { this.removeTask(realTasks[0], room) }} className="removeBtn">
                                <FontAwesomeIcon icon={faTrashAlt} />
                              </button>

                            </li>
                            
                          )

                        })}

                      </ul>
                    )

                  })
                  }

                  {/* ADD TASK FORM SECTION */}
                  <form key={room[0]}>
                    <label htmlFor="newTask" className="srOnly">Add new task</label>
                    <input type="text" id="newTask" onChange={this.handleInput} id={room[0]} placeholder="e.g. sweep floors" />
                    <button onClick={ (e) => {this.handleAdd(e, room)} } className="addBtn">Add Task</button>
                  </form>
                
                </div>
              )            
          })
          }

        </main>

        {/* FOOTER SECTION */}
        <footer>
          <p className="wrapper">Created by <a href="https://github.com/armontei">Amanda Monteiro</a> at <a href="https://junocollege.com/">Juno College</a></p>
        </footer>
      </div>
    )
  }
}

export default App;

