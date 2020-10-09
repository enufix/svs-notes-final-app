import React from 'react';
import './App.css';
import Header from "./components/Header";
import NotesGrid from "./components/NotesGrid";
import CreateNote from "./components/CreateNote";
import ManageTags from "./components/ManageTags";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import EditNote from "./components/EditNote";
import FilterNotesByTag from "./components/FilterNotesByTag";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Header title="Seavus Notes" actions = "Manage Tags"/>

          <Switch>
            <Route exact path='/' component={NotesGrid}/>
            <Route path='/create-note' component={CreateNote}/>
            <Route path='/manage-tags' component={ManageTags}/>
            <Route path='/edit-note/:id' component={EditNote}/>
            <Route path='/tags/:id/notes' component={FilterNotesByTag}/>
          </Switch>
          <Link to='/create-note'>
            <button className="add-note-button">+</button>
          </Link>

        </div>
      </BrowserRouter>
  );
}

export default App;
