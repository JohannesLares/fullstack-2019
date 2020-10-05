import React, { useEffect, useState }from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { end } from '../reducers/notificationReducer'

const Notification = () => {
  const [timer, setTimer] = useState(0)

  const notification = useSelector(state => state.notification)

  const dispatch = useDispatch()

  useEffect(() => {
    clearTimeout(timer)

    if (notification.length === 0) return 

    setTimer(setTimeout(() => {
      dispatch(end(''))
    }, 5000))
  }, [notification])

  return(
    <div className="alert">
      <h1>{notification}</h1>
    </div>
  )
}

export default Notification