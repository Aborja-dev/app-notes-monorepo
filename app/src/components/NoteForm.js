import React, { useState } from 'react'

export const NoteForm = ({ addNote, logout }) => {
  const [newNote, setNewNote] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }
    addNote(noteObject)
    setNewNote('')
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={newNote}
          onChange={(e) => { setNewNote(e.target.value) }}
        />
        <button type='submit'>save</button>
      </form>
      <button onClick={logout}>Logout</button>
    </>
  )
}
