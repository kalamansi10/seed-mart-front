export default function useLogIn(email, password, setError) {
  fetch('/users/sign_in', {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.cookie.split('=')[1]
    },
    body: JSON.stringify({
      user: {
        email: email,
        password: password,
        remember_me: document.getElementById('remember-me').checked === true ? '1' : '0'
      }
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
    })
    .then(() => {
      setError(null)
      window.location.reload()
    })
    .catch(error => {
      console.error('Error during login:', error)
      setError('Login failed. Please check your credentials and try again.')
    })
}

