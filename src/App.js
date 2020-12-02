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
      userInput: '',
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
      userInput: e.target.value
    })
  }

  // adding the new task to the page
  handleAdd = (e, room) => {
    // prevent form fro refreshing the page on submit
    e.preventDefault();
    
    const dbRef = firebase.database().ref();

    let roomId = `/${room[0]}/`

    // object structure which new task will be added
    const newTask = {
      task: this.state.userInput,
      complete: "no"
    }

    // adding a new task in the form of a child element to the specified room
    dbRef.child(roomId).push(newTask);
  }

  // complete task
  completeTask = (taskKey, room) => {
    const dbRef = firebase.database().ref();
    let roomId = `/${room[0]}/`

    dbRef.child(roomId + taskKey).update({
      complete: "yes"
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
      <div>

        {/* HEADER SECTION */}
        <header>
          <div className="headerOverlay">
            <h1 className="wrapper">I Dream of Cleannie</h1>
            <h2 className="wrapper">Keep track of everything in your home you need to clean</h2>
          </div>
        </header>

        {/* MAIN SECTION */}
        <main className="wrapper">

          {/* mapping through initial array with rooms and task objects inside each room */}
          {this.state.rooms.map((room, i) => {

            // creating another array with tasks to map through
            let tasks = [room[1]];

              return (
                
                <ul>
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
                      <div>

                        {/* mapping through the new array with created with all the task values */}
                        { newArray.map( realTasks => {
                          
                          return (

                            // displaying the tasks to the page along with a button to remove the task
                            <li key={realTasks[0]}>
                              <button onClick={() => { this.completeTask(realTasks[0], room) }} className={realTasks[2] + "Btn"}></button>
                              <p className={realTasks[2]}>{realTasks[1]}</p>
                              <button onClick={() => { this.removeTask(realTasks[0], room) }} className="removeBtn">remove</button>
                            </li>
                            
                          )

                        })}

                      </div>
                    )

                  })
                  }

                  {/* ADD TASK FORM SECTION */}
                  <form key={room[0]}>
                    <label htmlFor="newTask" className="srOnly">Add new task</label>
                    <input type="text" id="newTask" onChange={this.handleInput} />
                    <button onClick={ (e) => {this.handleAdd(e, room)} } className="addBtn">Add Task</button>
                  </form>

                </ul>
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

