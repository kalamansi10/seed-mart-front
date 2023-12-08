import { useRef } from 'react'
import { Link } from 'react-router-dom'
import useLogOut from '../hooks/useLogOut'
import LogInDialog from './LogInDialog'
import SignUpDialog from './SignUpDialog'
import './navigation.css'

export default function Navigation({ currentUser, logInDialog, signUpDialog }) {
  const optionsWrapper = useRef()

  function showOptions() {
    optionsWrapper.current.classList.toggle('hidden')
  }

  function renderAccountOptions() {
    if (currentUser) {
      return (
        <>
          <div className='nav-item' onClick={showOptions}>
            <a>{currentUser.name}</a>
            <section className='options-wrapper hidden' ref={optionsWrapper} onMouseLeave={showOptions}>
              <li><Link to='/user/profile'>My Account</Link></li>
              <li><a>My purchases</a></li>
              <li><a onClick={useLogOut}>Logout</a></li>
            </section>
          </div>
          <div className='nav-item'>
            <a>Notifications</a>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className='nav-item'>
            <a onClick={logInDialog.showDialog}>Log in</a>
            <LogInDialog logInDialog={logInDialog} signUpDialog={signUpDialog} />
          </div>
          <div className='nav-item'>
            <a onClick={signUpDialog.showDialog}>Sign up</a>
            <SignUpDialog logInDialog={logInDialog} signUpDialog={signUpDialog} />
          </div>
        </>
      )
    }
  }


  return (
    <nav className='navigation flex-row justify-around align-center'>
      <h1><Link to='/'>Seed Mart</Link></h1>
      <div className="nav-options flex-row">
        {renderAccountOptions()}
        <div className='nav-item'>
          <Link to='/cart'>Cart</Link>
        </div>
      </div>
    </nav>
  )
}
