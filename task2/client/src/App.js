import React from 'react';
import './App.css';
import Registration from "./components/Registration";
import NoteList from "./components/NoteList";

function App() {
  return (
    <div className="App">
      <h1>Notes</h1>
      <Registration></Registration>
      <NoteList></NoteList>
    </div>
  );
}

export default App;
