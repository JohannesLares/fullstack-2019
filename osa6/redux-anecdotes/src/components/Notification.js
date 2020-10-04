import React, { useEffect, useState } from 'react'
import { useDispatch, connect } from 'react-redux'
import { end } from '../reducers/notificatioReducer'

const Notification = (props) => {
  const [timeoutId, setTimeoutId] = useState(0)
  const notification = props.notification
  const dispatch = useDispatch()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  useEffect(() => {
    if (notification.notification.length === 0) return 
    clearTimeout(timeoutId)
    setTimeoutId(setTimeout(() => {
      dispatch(end(''))
    }, notification.time))
  }, [notification])
  if (notification.notification.length > 0) 
    return (
      <div style={style}>
        {notification.notification}
      </div>
    )
  return (<></>)
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification