import { useState } from 'react'
import useInput from '../hooks/useInput'
import useLogIn from '../hooks/useLogIn'

function LogInDialog({ logInDialog, signUpDialog }) {
  // State for input values and errors
  const userEmail = useInput('email', 'email')
  const userPass = useInput('password', 'password')
  const [error, setError] = useState(null)

  // Handle login validation
  function handleLoginValidation() {
    if (!userEmail.value) {
      setError("Email can't be blank.")
    } else if (!userPass.value) {
      setError("Password can't be blank.")
    } else {
      setError(null)
      useLogIn(userEmail.value, userPass.value, setError)
    }
  }

  // Initiate sign-up process
  function handleSignUpInitiation() {
    logInDialog.closeDialog()
    signUpDialog.showDialog()
  }

  return (
    <>
      <dialog className='session-dialog' ref={logInDialog.dialogRef}>
        <div className='login-dialog flex-column justify-center align-center box-shadow'>
          <h1>Seedmart Login</h1>
          <div className="error-message">{error}</div>
          {userEmail.input}
          {userPass.input}
          <div className='rememberable flex-row justify-between'>
            <label><input type="checkbox" id="remember-me" /> Remember me</label>
            <a>Forgot password?</a>
          </div>
          <button onClick={handleLoginValidation}>Log in</button>
          <div>
            {"Don't have an account? "}
            <a onClick={handleSignUpInitiation}>Register</a>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default LogInDialog
