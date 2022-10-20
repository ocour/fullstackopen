import { useState, useEffect } from 'react';
import Note from './components/Note';
import noteServices from './services/notes';
import loginService from './services/login';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteServices
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      })
  }, [])

  const toggleImportance = (id) => {
    const note = notes.find(note => note.id === id);
    const changedNote = {...note, important: !note.important};

    noteServices
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      })
      .catch(error => {
        // Sets error message
        setErrorMessage(
          `Note "${note.content}" was already removed from the server`
        )
        // Removes erro message after given time, this case 5000 = 5sec
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        // removes note
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    noteServices
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      const user = await loginService.login({
        username, password
      });
      setUser(user);
      setUsername('');
      setPassword('');
    }
    catch (exception) {
      setErrorMessage('Wrong credetials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  // Both work the same
  //const notesToShow = showAll ? notes : notes.filter(note => note.important === true);
  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null
      ? <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
      : <div>
          <p>{user.name} logged-in</p>
          {<NoteForm addNote={addNote} newNote={newNote} handleNoteChange={handleNoteChange} />}
        </div>}

      <h2>Notes</h2>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App