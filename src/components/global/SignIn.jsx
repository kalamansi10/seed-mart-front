import React, {useRef, useEffect} from 'react'

function SignIn({isSignedIn}) {
  const deviseModal = useRef()

  const runShowModal = () => {
    deviseModal.current.showModal()
    deviseModal.current.addEventListener("click", runCloseModal)
  }

  const runCloseModal = e => {

    const dialogDimensions = deviseModal.current.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      deviseModal.current.close()
      deviseModal.current.removeEventListener("click", runCloseModal)
    }
  }  

  if (isSignedIn === 'true') {
    return (
      <li><a href="/users/sign_out" onClick={runShowModal} data-turbo-frame="devise" data-turbo-method="delete">Sign Out</a></li>
    )
  } else {
    return (
      <li>
        <a href="/users/sign_in" onClick={runShowModal} data-turbo-frame="devise">Sign In</a>
        <dialog ref={deviseModal}>
          <turbo-frame id="devise" />
        </dialog>
      </li>
    )
  }
}

export default SignIn