import { useRef } from 'react'
import { Link } from 'react-router-dom'
import LogInDialog from './LogInDialog'
import './navigation.css'

export default function Navigation({ currentUser }) {
  const optionsWrapper = useRef()

  function showOptions() {
    optionsWrapper.current.classList.toggle('hidden')
  }

  function logOut() {
    fetch('/users/sign_out', {
      method: 'delete',
      'credentials': 'include',
      headers: {
        'X-CSRF-Token': document.cookie.split('=')[1]
      }
    })
      .then(() => window.location.reload())
  }

  function renderUserOptions() {
    return (
      <>
        <div>
          <a>Notifications</a>
        </div>
        <div className='nav' onClick={showOptions}>
          <a>{currentUser.fname + ' ' + currentUser.lname}</a>
          <section className='options-wrapper hidden' ref={optionsWrapper} onMouseLeave={showOptions}>
            <li><Link to='/user/profile'>My Account</Link></li>
            <li><a>My purchases</a></li>
            <li><a onClick={logOut}>Logout</a></li>
          </section>
        </div>
      </>
    )
  }

  return (
    <nav className='navigation flex-row justify-around align-center'>
      <h1><Link to='/'>Seed Mart</Link></h1>
      <div className="nav-options flex-row">
        <div>
          <Link to='/cart'>Cart</Link>
        </div>
        {!currentUser && <LogInDialog />}
        {currentUser && renderUserOptions()}
      </div>
    </nav>
  )
}
