import { useState } from 'react'
import useInput from '../hooks/useInput'
import useSignUp from '../hooks/useSignUp'

export default function SignUpDialog({ logInDialog, signUpDialog }) {
  // State for input values and errors
  const [email, inputEmail] = useInput('email', 'email')
  const [name, inputName] = useInput('text', 'full name')
  const [password, inputPassword] = useInput('password', 'password')
  const [confirmPass, inputConfirmPass] = useInput('password', 'confirm password')
  const [error, setError] = useState(null)

  // Handle sign-up validation
  function handleSignUpValidation() {
    if (!email || !name || !password || !confirmPass) {
      setError('Please fill in all fields.')
    } else if (password !== confirmPass) {
      setError("Password inputs don't match.")
    } else {
      setError(null)
      useSignUp(email, password, name, setError, handleSignUpSuccess)
    }
  }

  // Handle sign-up success
  function handleSignUpSuccess() {
    signUpDialog.closeDialog()
    logInDialog.showDialog()
    setError('Sign up successful')
  }

  // Navigate back to login
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
            <a href="/terms-of-service">Terms of Service</a> and <a href="/privacy-policy">Privacy Policy</a>.
          </p>
          <button onClick={handleSignUpValidation}>Sign up</button>
          <section className='login-link'><a onClick={backToLogIn}>Back to Log in</a></section>
        </div>
      </dialog>
    </>
  )
}

