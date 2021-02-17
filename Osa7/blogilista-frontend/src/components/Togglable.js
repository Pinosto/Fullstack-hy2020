import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(props.visibleTrue === undefined ? false : true)
  const buttonLabel2 = props.buttonlabel2 === undefined ? 'Cancel' : props.buttonlabel2
  const divId = props.id === undefined ? 'defaultId' : props.id


  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  return (
    <div className={divId}>
      <div className='hideInfo' style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div className='showInfo' style={showWhenVisible}>
        {props.children}
        <Button variant="danger" onClick={toggleVisibility}>{buttonLabel2}</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}