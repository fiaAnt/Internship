import React from 'react';
import ToDoItem from './ToDoItem';
import { useAppSelector } from '../redux/hooks';
import '../styles.css';

const ToDoList = () => {
  const notes = useAppSelector((state) => state.notes.items);
  return (
    <>
      {notes.length === 0 ? (
        <div>
          <p>Добавьте запись</p>
        </div>
      ) : (
        <div>
          {notes.map((note) => (
            <ToDoItem key={note.id} note={note} />
          ))}
        </div>
      )}
    </>
  );
};

export default ToDoList;
