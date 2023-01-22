import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { Todo } from './features/Todo/Todo';

function App() {
  return (
    <React.Fragment>
      <Todo></Todo>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
