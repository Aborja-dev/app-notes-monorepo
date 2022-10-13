import React, { useState } from 'react'

import { Toggable } from './Toggable'

export const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return (
    <>
      <Toggable buttonLabel='Show Login'>
        <form onSubmit={(e) => props.handleSubmit(e, { username, password })}>
          <div>
            Username
            <input
              type='text'
              value={username}
              name='Username'
              onChange={(e) => { setUsername(e.target.value) }}
            />
          </div>
          <div>
            Password
            <input
              type='password'
              value={password}
              name='Password'
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>
          <button id='login-form-button' type='submit'>login</button>
        </form>
      </Toggable>
    </>
  )
}
