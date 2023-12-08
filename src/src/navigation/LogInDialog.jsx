import { useState } from 'react'
import useInput from '../hooks/useInput'
import useLogIn from '../hooks/useLogIn'

function LogInDialog({ currentUser, logInDialog, signUpDialog }) {
  const [email, inputEmail] = useInput('email', 'email')
  const [password, inputPassword] = useInput('password', 'password')
  const [error, setError] = useState(null)

  function validateInputs() {
    if (!email) {
      setError("Email can't be blank.")
    } else if (!password) {
      setError("Password can't be blank.")
    } else {
      setError(null)
      useLogIn(email, password, setError)
    }
  }

  function initSignUp() {
    logInDialog.closeDialog()
    signUpDialog.showDialog()
  }
  return (
    <>
      <dialog className='session-dialog' ref={logInDialog.dialogRef}>
        <div className='login-dialog flex-column justify-center align-center box-shadow'>
          <h1>Seedmart Login</h1>
          <div className="error-message">{error}</div>
          {inputEmail}
          {inputPassword}
          <div className='rememberable flex-row justify-between'>
            <label><input type="checkbox" id="remember-me" /> Remember me</label>
            <a>Forgot password?</a>
          </div>
          <button onClick={validateInputs}>Log in</button>
          <div>
            {"Don't have an account? "}
            <a onClick={initSignUp}>Register</a>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default LogInDialog