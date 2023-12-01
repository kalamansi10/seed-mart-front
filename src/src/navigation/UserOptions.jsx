import React from 'react'

export default function UserOptions() {

  function logOut() {
    fetch('http://localhost:3000/users/sign_out', {
      method: 'delete',
      'credentials': 'include',
      headers: {
        'X-CSRF-Token': document.cookie.split('=')[1]
      }
    })
    .then(() => window.location.reload())
  }
  return (
    <button onClick={logOut}>Logout</button>
  )
}
