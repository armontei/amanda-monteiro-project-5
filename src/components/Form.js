const Form = ({room, inputChangeHandler, newTaskHandler, e}) => {

    return (

        <form key={room}>
            <label htmlFor="newTask" className="srOnly">Add new task</label>
            <input type="text" id="newTask" onChange={(e) => { inputChangeHandler(e) }}  id={room} placeholder="Enter a new task" />
            <button onClick={(e) => { newTaskHandler(e, room) }} className="addBtn">Add Task</button>
        </form>
    )   
}

export default Form;

