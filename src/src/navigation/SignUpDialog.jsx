import useInput from '../hooks/useInput'
import useDialog from '../hooks/useDialog'

function SignUpDialog({ closeLogin }) {
  const [fname, inputFname] = useInput('text', 'first name')
  const [lname, inputLname] = useInput('text', 'last name')
  const [email, inputEmail] = useInput('email', 'email')
  const [password, inputPassword] = useInput('password', 'password')
  const [confirmPass, inputConfirmPass] = useInput('password', 'confirm password')
  const [logInDialog, showLogIn, closeLogIn] = useDialog()
  const [signUpDialog, showSignUp, closeSignUp] = useDialog()



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
          "fname": fname,
          "lname": lname,
        }
      })
    })
      .then(() => window.location.reload())
  }

  function signUp() {
  }

  return (
    <>
      <a href="#" onClick={() => {
        closeLogin
        showSignUp()
      }}> Register </a>
      <dialog className='' ref={signUpDialog}>
        <div className='login-dialog flex-column align-center box-shadow'>
          <h1>Seedmart Sign Up</h1>
          <div className='input-box'>
            {inputFname}
          </div>
          <div className='input-box'>
            {inputLname}
          </div>
          <div className='input-box'>
            {inputEmail}
          </div>
          <div className='input-box'>
            {inputPassword}
          </div>
          <div className='input-box'>
            {inputConfirmPass}
          </div>
          <button onClick={signUp}>Sign up</button>
        </div>
      </dialog>
    </>
  )
}

export default SignUpDialog