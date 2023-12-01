export default function useSignUp(email, password, fname, lname, setError) {
  fetch('/users', {
    method: 'post',
    'credentials': 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.cookie.split('=')[1]
    },
    body: JSON.stringify({
      "user": {
        "email": email,
        "password": password,
        "fname": fname,
        "lname": lname
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
    })
    .catch(error => {
      console.error('Error during login:', error)
      setError('Sign up failed. Please check your credentials and try again.')
    })
}