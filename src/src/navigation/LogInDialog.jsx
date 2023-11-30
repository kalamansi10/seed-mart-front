import useInput from '../hooks/useInput'
import useDialog from '../hooks/useDialog'
import SignUpDialog from './SignUpDialog'
import './log-in-dialog.css'

function LogInDialog() {
  const [email, inputEmail] = useInput('email', 'email')
  const [password, inputPassword] = useInput('password', 'password')
  const [logInDialog, showLogIn, closeLogIn] = useDialog()



  function logIn() {
    fetch('/users/sign_in', {
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
          "remember_me": document.getElementById('remember-me').checked == true ? '1' : '0'
        }
      })
    })
      .then(() => window.location.reload())
  }

  return (
    <li>
      <span onClick={showLogIn}>Sign In</span>
      <dialog className='' ref={logInDialog}>
        <div className='login-dialog flex-column align-center box-shadow'>
          <h1>Seedmart Login</h1>
          <div className='input-box'>
            {inputEmail}
            <img src="https://uxwing.com/wp-content/themes/uxwing/download/communication-chat-call/envelope-line-icon.png" alt="envelope-line-icon" />
          </div>
          <div className='input-box'>
            {inputPassword}
            <img src="https://uxwing.com/wp-content/themes/uxwing/download/editing-user-action/lock-line-icon.png" alt="lock-line-icon" />
          </div>
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
              Dont't have an account?
              <SignUpDialog closeLogIn={closeLogIn}/>
            </div>
          </div>
        </div>
      </dialog>
    </li>
  )
}

export default LogInDialog