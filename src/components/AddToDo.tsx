import React, { useState } from 'react';
import '../styles.css';
import { addTodoAsync } from '../redux/actions';
import { useAppDispatch } from '../redux/hooks';

const AddToDo = () => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const createNote = () => {
    if (text) {
      dispatch(addTodoAsync(text));
      setText('');
    }
  };
  return (
    <>
      <input
        className="input"
        placeholder="note"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <button className="createButton" onClick={createNote}>
        create
      </button>
    </>
  );
};

export default AddToDo;
