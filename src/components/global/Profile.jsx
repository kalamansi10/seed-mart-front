import { useRef } from 'react'

function SignIn() {
  const profileModal = useRef()
 
  const runShowModal = () => {
    profileModal.current.showModal()
    profileModal.current.addEventListener('click', runCloseModal)
  }

  const runCloseModal = e => {

    const dialogDimensions = profileModal.current.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      profileModal.current.close()
      profileModal.current.removeEventListener('click', runCloseModal)
    }
  }  

  if (false) {
    return (
      <li><a href='/users/sign_out' onClick={runShowModal} data-turbo-frame='devise' data-turbo-method='delete'>Sign Out</a></li>
    )
  } else {
    return (
      <>
        <span onClick={runShowModal}>Sign In</span>
        <dialog ref={profileModal}>
          
        </dialog>
      </>
    )
  }
}

export default SignIn