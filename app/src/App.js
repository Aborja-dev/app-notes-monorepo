import { useState, useEffect, useRef } from 'react'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from './services/login'
import { LoginForm } from './components/LoginForm'
import { NoteForm } from './components/NoteForm'
import { Toggable } from './components/Toggable'
const saveUserToLocalStorage = (user) => {
  const userJSON = JSON.stringify(user)
  window.localStorage.setItem('userSession', userJSON)
}
const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  useEffect(() => {
    const userSession = window.localStorage.getItem('userSession')
    if (userSession) {
      const sesionData = JSON.parse(userSession)
      noteService.setToken(sesionData.token)
      setUser(sesionData)
    }
  }, [])
  const noteFormRef = useRef()
  const handleLogin = async (event, user) => {
    const { username, password } = user
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      noteService.setToken(user.token)
      setUser(user)
      saveUserToLocalStorage(user)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }
  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('userSession')
  }
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {
        user === null
          ? <LoginForm
              handleSubmit={handleLogin}
            />
          : (
            <div>
              <p>{user.name} logged in</p>
              <Toggable buttonLabel='create note' ref={noteFormRef}>
                <NoteForm
                  addNote={addNote}
                  logout={logout}
                />
              </Toggable>
            </div>
            )
            }
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
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      <Footer />
    </div>
  )
}

export default App
