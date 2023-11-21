import { useState, useEffect } from 'react'
import LogInDialog from './LogInDialog'
import UserOptions from './UserOptions'

export default function Navigation() {
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    fetch('http://localhost:3000/users/sign_in', {
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => setCurrentUser(data))
  }, [])

  return (
    <nav className='navigation flex-row justify-around'>
      <h1>Seed Mart</h1>
      <ul className="flex-row">
        {!currentUser && <LogInDialog />}
        {currentUser && <UserOptions />}
        <li>Cart</li>
      </ul>
    </nav>
  )
}
