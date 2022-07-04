import React, { useEffect, useState } from 'react'
import './index.css'
import constant from '../../constant'
import { useDispatch } from 'react-redux'
import { changeRole } from '../../actions/UserRoles'

export default function EMSHeader() {

  const users = [
    {
      username: "Scott Tiger",
      role: "HR Manager",
    },
    {
      username: "Haze Thley",
      role: "HR",
    },
  ]

  const [current, login] = useState(true)
  const user = current ? users[0] : users[1]
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeRole(user.role))
  }, [user])

  return (
    <div className='header'>
      <h1>{constant.EMS_TITLE}</h1>
      <h2 onClick={() => {
        login(!current)
      }}>{`${user.username} | ${user.role}`}</h2>
    </div>
  )
}
