import React, { useEffect, useState } from 'react';
import { deleteNote, toggleNote } from '../redux/notesReducer';
import { useAppDispatch } from '../redux/hooks';
import { Note } from '../redux/notesReducer';
import '../styles.css';

interface ToDoItemProps {
  note: Note;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ note }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {}, [note]);

  const handleToggle = () => {
    dispatch(toggleNote(note.id));
  };

  return (
    <div className={`item ${note.status ? 'completed' : 'pending'}`}>
      <input
        type="checkbox"
        checked={note.status}
        onChange={handleToggle}
      ></input>
      <p>{note.text}</p>
      <button
        className="deleteButton"
        onClick={() => dispatch(deleteNote(note.id))}
      >
        delete
      </button>
    </div>
  );
};

export default ToDoItem;
