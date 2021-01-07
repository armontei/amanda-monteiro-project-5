// font awesome library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faSquare as farSquare } from "@fortawesome/free-regular-svg-icons";

library.add(faCheckSquare, farSquare, faTrashAlt);


const Task = ({isChecked, taskName, removeTaskHandler, taskId, labelTaskHandler, room}) => {

    if (taskId === "hidden" ) {
        return null
    }  return (
            <li>
                <div className="taskUpdate" tabindex="0" aria-label="Mark task as complete">
                    <input type="checkbox" id={taskId} tabindex="-1" checked={isChecked === "yes" ? true : false} onChange={() => { labelTaskHandler(taskId, room, isChecked) }} />
                    <label htmlFor={taskId}>
                        <span className={isChecked + "Btn"}>
                            <FontAwesomeIcon icon={(isChecked === "yes") ? "check-square" : ['far', 'square']} />
                        </span>
                        <span className={isChecked}>{taskName}</span>
                    </label>
                </div>
                <button aria-label="Remove this task" className="removeBtn"  onClick={ () => { removeTaskHandler(taskId, room)} } >
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </li>
    )
    }

export default Task;