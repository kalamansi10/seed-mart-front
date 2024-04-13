import useGetCookie from './useGetCookie'

export default function useSignUp(email, password, name, handleSignUpSuccess) {
  fetch('/users', {
    method: 'post',
    'credentials': 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': useGetCookie('CSRF-TOKEN')
    },
    body: JSON.stringify({
      "user": {
        "email": email,
        "password": password,
        "name": name,
      }
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
    })
    .then(() => {
      handleSignUpSuccess()
    })
    .catch(error => {
      console.error('Error during login:', error)
      setError('Sign up failed. Please check your credentials and try again.')
    })
}