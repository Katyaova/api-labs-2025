import React from 'react';

const Task = (props) => {
    
    const priorityClass = props.priority.toLowerCase(); 

    return (
        <div className="card" style={{ backgroundColor: props.done ? 'teal' : '#2b7b8a' }}>
            <p className="title">{props.title}</p>
            <p>Due: {props.deadline}</p>
            <p className="description">{props.description}</p>
            <p className={`priority ${priorityClass}`}>{props.priority}</p> 
            <button onClick={props.markDone} className='doneButton'>Done</button>
            <button className='deleteButton' onClick={props.deleteTask}>Delete</button>
        </div>
    );
}

export default Task;
