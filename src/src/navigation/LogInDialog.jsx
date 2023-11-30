import React, { useEffect, useState } from 'react'
import useInput from '../hooks/useInput'
import useDialog from '../hooks/useDialog'
import SignUpDialog from './SignUpDialog'
import './log-in-dialog.css'

function LogInDialog() {
  const [email, inputEmail] = useInput('email', 'email')
  const [password, inputPassword] = useInput('password', 'password')
  const [logInDialog, showLogIn, closeLogIn] = useDialog()
  const [error, setError] = useState(null)

  function logIn() {
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
        return response.json()
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

  function renderErrorMessage() {
    return error && <div className="error-message">{error}</div>;
  }

  function renderInputBox(inputElement, iconSrc) {
    return (
      <div className='input-box'>
        {inputElement}
        <img src={iconSrc} alt="icon" />
      </div>
    )
  }

  return (
    <li>
      <span onClick={showLogIn}>Sign In</span>
      <dialog className='' ref={logInDialog}>
        <div className='login-dialog flex-column align-center box-shadow'>
          <h1>Seedmart Login</h1>
          {renderErrorMessage()}
          {renderInputBox(inputEmail, "https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/envelope-line-icon.png")}
          {renderInputBox(inputPassword, "https://uxwing.com/wp-content/themes/uxwing/download/editing-user-action/lock-line-icon.png")}
          <div className="remember-forgot flex-row justify-between">
            <div>
              <input type="checkbox" id="remember-me" />
              <label>Remember me</label>
            </div>
            <a href="#">Forgot password?</a>
          </div>
          <button onClick={logIn}>Log in</button>
          <div className="register-link flex-row justify-center">
            <div>
              Don't have an account?
              <SignUpDialog closeLogIn={closeLogIn} />
            </div>
          </div>
        </div>
      </dialog>
    </li>
  )
}

export default LogInDialog