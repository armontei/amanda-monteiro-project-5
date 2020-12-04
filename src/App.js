import './App.scss';
import { Component, Fragment } from 'react';
import firebase from './firebase';
import Header from './components/Header.js'
import Rooms from './components/Rooms.js'
import Task from './components/Tasks.js'
import Form from './components/Form.js'
import Suggestion from './components/Suggestion'
import Footer from './components/Footer';

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

      const generateTaskList = (obj) => {
        
        return Object.keys(obj).map(key => {
            return {
            id: key,
            taskName: obj[key].task,
            isComplete: obj[key].complete
            }

        })
      }

      const newArray = []

      for (const room in firebaseDataObj) {

        const newObj = {
          name: room,
          tasks: generateTaskList(firebaseDataObj[room])
        }

        newArray.push(newObj);
      }
      
      this.setState({
        rooms: newArray
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

    let roomId = `/${room}/`

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

    // resetting user input and clearing form
    this.setState({
      userInput: ''
    })

    document.getElementById(room).value = '';

  }

  // complete task function
  completeTask = (taskKey, room, status) => {
    const dbRef = firebase.database().ref();
    let roomId = `/${room}/`

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

  // removing tasks functions
  removeTask = (taskKey, room) => {

    const dbRef = firebase.database().ref();
    let roomId = `/${room}/`
  
    dbRef.child(roomId + taskKey).remove()
  }


  // suggest a new random task function
  newSuggestion = (room) => {
    
    const bathroomTasks = ["clean shower", "wash towels", "clean sink", "wash shower curtain", "clean toilet", "clean mirror", "sweep floor", "mop floor"];
    const bedroomTasks = ["wash blankets", "change bed sheets", "tidy closet", "dust surfaces", "organize drawers", "clean windows", "vacuum carpet"];
    const kitchenTasks = ["wash dishes", "sweep floor", "mop floor", "wipe counter", "clean sink", "clean microwave", "clean stove", "take out garbage"];
    const livingRoomTasks = ["dust surfaces", "vacuum carpet", "sweep floor", "mop floor", "organize shelves", "tidy coffee table", "clean windows"];

    if ( room === "Bathroom") {
      document.getElementById(room).value = bathroomTasks[Math.floor(Math.random() * bathroomTasks.length)];

      this.setState({
        userInput: document.getElementById(room).value
      })
    } else if (room === "Bedroom") {
      document.getElementById(room).value = bedroomTasks[Math.floor(Math.random() * bedroomTasks.length)];

      this.setState({
        userInput: document.getElementById(room).value
      })
    } else if (room === "Kitchen") {
      document.getElementById(room).value = kitchenTasks[Math.floor(Math.random() * kitchenTasks.length)];

      this.setState({
        userInput: document.getElementById(room).value
      })
    } else if (room === "Living Room") {
      document.getElementById(room).value = livingRoomTasks[Math.floor(Math.random() * livingRoomTasks.length)];

      this.setState({
        userInput: document.getElementById(room).value
      })
    }

  }


  render() {

    return (

    <Fragment>
      {/* HEADER SECTION */}
      <Header headerText="I Dream of Cleannie" subheaderText="Keep track of everything in your home you need to clean"/>

      {/* MAIN SECTION */}
      <main className="wrapper content">
      
          {this.state.rooms.map((room) => {
            return (
              <Rooms roomName={room.name}>

                {room.tasks.map(task => {

                  return <Task taskName={task.taskName} removeTaskHandler={this.removeTask} labelTaskHandler={this.completeTask} taskId={task.id} isChecked={task.isComplete} room={room.name} />

                })}

                {/* ADD TASK SECTION */}
                <Form inputChangeHandler={this.handleInput} room={room.name} newTaskHandler={this.handleAdd} />

                <Suggestion room={room.name} suggestionHandler={this.newSuggestion} />

              </Rooms> 
              
            )
            
          })}
          
      </main>

      {/* FOOTER SECTION */}
      <Footer />

    </Fragment>
    )
  }
}

export default App;

