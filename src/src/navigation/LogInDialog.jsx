import React, { useEffect, useState } from 'react'
import useInput from '../hooks/useInput'
import useDialog from '../hooks/useDialog'
import useLogIn from '../hooks/useLogIn'
import useSignUp from '../hooks/useSignUp'
import './log-in-dialog.css'

function LogInDialog() {
  const [email, inputEmail] = useInput('email', 'email')
  const [password, inputPassword] = useInput('password', 'password')
  const [confirmPass, inputConfirmPass] = useInput('password', 'confirm password')
  const [fname, inputFname] = useInput('text', 'first name')
  const [lname, inputLname] = useInput('text', 'last name')

  const [logInDialog, showLogIn, closeLogIn] = useDialog()
  const [passwordSetUpDialog, showPasswordSetUp, closePasswordSetUp] = useDialog()
  const [nameSetUpDialog, showNameSetUp, closeNameSetUp] = useDialog()

  const [error, setError] = useState(null)

  function renderErrorMessage() {
    return error && <div className="error-message">{error}</div>
  }

  function validateLogIn() {
    if (!email) {
      setError("Email can't be blank.")
    } else if (!password) {
      setError("Password can't be blank.")
    } else {
      setError(null)
      useLogIn(email, password, setError)
    }
  }

  function validatePassword() {
    if (password != confirmPass) {
      setError("Password inputs don't match.")
    } else {
      setError(null)
      closePasswordSetUp()
      showNameSetUp()
    }
  }

  function validateSignUp() {
    if (!fname || !lname) {
      setError("First name and last name can't be blank.")
    } else {
      setError(null)
      useSignUp(email, password, fname, lname, setError)
      if (!error) {
        closeNameSetUp()
        showLogIn()
        setError("Sign up successful")
      }
    }
  }

  function renderInput(input) {
    return (
      <div className='input-container'>
        {input}
      </div>
    )
  }

  function logIn() {
    setError(null)       
    showLogIn()
  }

  function signUp() {
    setError(null)
    closeLogIn()
    showPasswordSetUp()
  }

  function backToLogIn() {
    setError(null)
    closePasswordSetUp()
    showLogIn()
  }

  return (
    <li>
      <a onClick={logIn}>Sign In</a>
      <dialog className='' ref={logInDialog}>
        <div className='login-dialog flex-column align-center box-shadow'>
          <h1>Seedmart Login</h1>
          {renderErrorMessage()}
          {renderInput(inputEmail)}
          {renderInput(inputPassword)}
          <div className="remember-forgot flex-row justify-between">
            <div>
              <input type="checkbox" id="remember-me" />
              <label> Remember me</label>
            </div>
            <a>Forgot password?</a>
          </div>
          <button onClick={validateLogIn}>Log in</button>
          <div className="register-link flex-row justify-center">
            <p>
              {"Don't have an account? "}
              <a onClick={signUp}>Register</a>
            </p>
          </div>
        </div>
      </dialog>
      <dialog className='' ref={passwordSetUpDialog}>
        <div className='login-dialog flex-column align-center box-shadow'>
          <h1>Seedmart Sign Up</h1>
          {renderErrorMessage()}
          {renderInput(inputEmail)}
          {renderInput(inputPassword)}
          {renderInput(inputConfirmPass)}
          <button onClick={validatePassword}>Next</button>
          <div className="register-link flex-row justify-center">
            <p>
              <a onClick={backToLogIn}>Go back to login</a>
            </p>
          </div>
        </div>
      </dialog>
      <dialog className='' ref={nameSetUpDialog}>
        <div className='login-dialog flex-column align-center box-shadow'>
          <h1>Seedmart Sign Up</h1>
          {renderErrorMessage()}
          {renderInput(inputFname)}
          {renderInput(inputLname)}          
          <div className="remember-forgot flex-row justify-center">
          <p>
            By signing up, you agree with Seedmart's <a>Terms of Services</a> and <a>Privacy Policy</a>.
          </p>
          </div>
          <button onClick={validateSignUp}>Sign up</button>
        </div>
      </dialog>
    </li>
  )
}

export default LogInDialog