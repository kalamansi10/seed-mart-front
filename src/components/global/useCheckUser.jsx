import { useState, useEffect } from "react"

function useCheckUser() {
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    fetch('http://localhost:3000/users/sign_in', {
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => setCurrentUser(data))
  }, [])

  return currentUser
}

export default useCheckUser
