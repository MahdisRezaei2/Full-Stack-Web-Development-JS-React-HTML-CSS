//component must always return something.

import React, { useEffect, useRef, useState } from "react";
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  // create a useState hook for the imp state
  const [important, setImportant] = useState(false);
  //const [dark, setDark] = useState(false);
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.getElementById('root');
  themeToggle.addEventListener('click', function () {
    root.classList.toggle('dark-theme');
    root.classList.toggle('light-theme');
  });
  const [mode, setMode]=useState("light");
  // function themeToggle(){
    
  // }
  
  
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const wasEditing = usePrevious(isEditing);

  function handleChange(e) {
    setNewName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />

      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>

        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className={important ? "c-cb important" : "c-cb"}>
        <div className={ mode ? "s-sb mode": "s-sb"}></div>
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}>
          Edit <span className="visually-hidden">{props.name}</span>
        </button>

        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}>
          Delete <span className="visually-hidden">{props.name}</span>
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => setImportant(!important)}>
          Important <span className="visually-hidden">{props.name}</span>
        </button>

      </div>
    </div>
  );
  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);



  return (
    <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
  );
}
