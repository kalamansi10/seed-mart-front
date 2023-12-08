import { useState } from 'react'
import useInput from '../hooks/useInput'
import useSignUp from '../hooks/useSignUp'

export default function SignUpDialog({ currentUser, logInDialog, signUpDialog }) {
  const [email, inputEmail] = useInput('email', 'email')
  const [name, inputName] = useInput('text', 'full name')
  const [password, inputPassword] = useInput('password', 'password')
  const [confirmPass, inputConfirmPass] = useInput('password', 'confirm password')
  const [error, setError] = useState(null)

  function validateInputs() {
    if (!email || !name || !password || !confirmPass) {
      setError('Placeholder error message.')
    } else if (password != confirmPass) {
      setError("Password inputs don't match.")
    } else {
      setError(null)
      useSignUp(email, password, name, setError)
      if (!error) {
        signUpDialog.closeDialog()
        logInDialog.showDialog()
        setError("Sign up successful")
      }
    }
  }

  function backToLogIn() {
    signUpDialog.closeDialog()
    logInDialog.showDialog()
  }

  return (
    <>
      <dialog className='session-dialog' ref={signUpDialog.dialogRef}>
        <div className='signup-dialog box-shadow'>
          <h1>Seedmart Sign Up</h1>
          <div className="error-message">{error}</div>
          {inputEmail}
          {inputName}
          {inputPassword}
          {inputConfirmPass}
          <div className='captcha'>
            Captcha Placeholder
          </div>
          <p>
            By signing up, you agree with Seedmart's
            <br />
            <a>Terms of Services</a> and <a>Privacy Policy</a>.
          </p>
          <button onClick={validateInputs}>Sign up</button>
          <section className='login-link'><a onClick={backToLogIn}>Back to Log in</a></section>
        </div>
      </dialog>
    </>
  )
}
