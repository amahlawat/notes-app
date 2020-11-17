import React from 'react';

import Modal from '../Modal/Modal';
import Note from './Note/Note';
import './Notes.css';

class Notes extends React.Component{
    state = {
        isModalShown: false,
        modalData: null,
        dragId: ""
    }
    clickHandler = note => {
        this.setState({ isModalShown: true, modalData: note });
    }
    callbackModal = (action, id) => {
        if(action === "close")
            this.setState({ isModalShown: false });
        else if(action === "delete"){
            let tasks = JSON.parse(localStorage.getItem("tasks-app"));
            let indexx = -1;
            tasks.forEach((task, index) => {
                if(task.id === id)
                    indexx = index; 
            });
            indexx > -1 && tasks.splice(indexx, 1);
            document.getElementsByClassName("task-body")[0].innerHTML = `Task id <span class="highlight">${id}</span> is deleted successfully<span class="success-tick" />`;
            console.log(tasks)
            // localStorage.setItem("tasks-app", JSON.stringify(tasks));
        }
    }
    onDragStart = (event) => {
        event.dataTransfer.effectAllowed = "move";
        // console.log(" drag start ", event.target.getAttribute('id'))
        this.setState({ dragId: event.target.getAttribute('id') });
        // event.dataTransfer.setData("text", event.target.getAttribute('id'));
        // event.currentTarget.style.backgroundColor = "#e9c46a";
    }  
    onDragEnd(event) {
        // event.currentTarget.style.backgroundColor = "#2a9d8f";
    }      
    onDragOver(event) {
        event.preventDefault();
    }      
    onDrop = (event) => {
        let status = event.target.getAttribute("dropid");
        console.log(" status ", status, " dragId ", this.state.dragId);
        if(localStorage.getItem("tasks-app") && this.state.dragId != ""){
            let tasks = JSON.parse(localStorage.getItem("tasks-app"));
            for(let task of tasks){
                if((task.id).toString() === (this.state.dragId).split("-")[1])
                    task.status = status;                     
            }
            localStorage.setItem("tasks-app", JSON.stringify(tasks));
        }
        
       event.dataTransfer.clearData();        
       this.forceUpdate();
    }

    render(){
        let notes = JSON.parse(localStorage.getItem("tasks-app"));
        return(
            <React.Fragment>
                <div className="tasks">
                    <div className="tasks-selected tasks-col">
                        <p className="tasks-type">Selected For Development</p>
                        <div className="tasks-list">
                            <div dropid="selected" className="on-drop" onDragOver={this.onDragOver} onDrop={this.onDrop}></div>
                            {notes != null && notes.map(note => (
                                <React.Fragment key={note.id}>
                                {(note.status === "selected") &&
                                    <div id={`outerdiv-${note.id}`} draggable="true" onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
                                        <Note clickHandler={this.clickHandler} note={note} />
                                    </div>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div className="tasks-inprogress tasks-col">
                        <p className="tasks-type">InProgress</p>
                        <div className="tasks-list">
                            <div dropid="inprogress" className="on-drop" onDragOver={this.onDragOver} onDrop={this.onDrop}></div>
                            {notes != null && notes.map(note => (
                                <React.Fragment key={note.id}>
                                {(note.status === "inprogress") &&
                                    <div id={`outerdiv-${note.id}`} draggable="true" onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
                                        <Note clickHandler={this.clickHandler} note={note} />
                                    </div>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div className="tasks-done tasks-col">
                        <p className="tasks-type">Done</p>
                        <div className="tasks-list">
                            <div dropid="done" className="on-drop" onDragOver={this.onDragOver} onDrop={this.onDrop}></div>
                            {notes != null && notes.map(note => (
                                <React.Fragment key={note.id}>
                                    {(note.status === "done") && 
                                        <div id={`outerdiv-${note.id}`} draggable="true" onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
                                            <Note clickHandler={this.clickHandler} note={note} />
                                        </div>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
                {this.state.isModalShown && <Modal data={this.state.modalData} callbackModal={this.callbackModal} history={this.props.history}/>}
            </React.Fragment>
        )
    }
}

export default Notes;