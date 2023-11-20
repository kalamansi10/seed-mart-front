import useInput from './useInput'
import useCheckUser from './useCheckUser'
import useDialog from './useDialog'

function Session() {
  const [email, inputEmail] = useInput('email', 'email')
  const [password, inputPassword] = useInput('password', 'password')
  const currentUser = useCheckUser()

  const [profileDialog, showDialog] = useDialog()


  const logIn = () => {
    fetch('http://localhost:3000/users/sign_in', {
      method: 'post',
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.cookie.split('=')[1]
      },
      body: JSON.stringify({
        "user": {
          "email": email,
          "password": password
        }
      })
    })
  }

  const logOut = () => {
    fetch('http://localhost:3000/users/sign_out', {
      method: 'delete',
      'credentials': 'include',
      headers: {
        'X-CSRF-Token': document.cookie.split('=')[1]
      }
    })
  }

  if (currentUser) {
    return (
      <button onClick={logOut}>Log out</button>
    )
  } else {
    return (
      <>
        <span onClick={showDialog}>Sign In</span>
        <dialog ref={profileDialog}>
          {inputEmail}
          {inputPassword}
          <button onClick={logIn}>Log in</button>
        </dialog>
      </>
    )
  }
}

export default Session