const Rooms = ({roomName, children}) => {
    return (
        <div className="taskContainer">

            <h3>{roomName}</h3>

            {children}

        </div> 
    )
}

export default Rooms;