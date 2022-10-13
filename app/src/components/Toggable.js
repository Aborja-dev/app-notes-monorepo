import PropTypes from 'prop-types'
import React, { forwardRef, useImperativeHandle, useState } from 'react'

import { es } from '../i18n'

export const Toggable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenvisible = { display: visible ? 'none' : '' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  return (
    <>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>{es.TOGGABLE.CANCEL_BUTTON}</button>
      </div>
      <div style={hideWhenvisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
    </>
  )
})
Toggable.displayName = 'Togglable'
Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
