import { useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useInput from '../hooks/useInput'
import useLogOut from '../hooks/useLogOut'
import useDialog from '../hooks/useDialog'
import LogInDialog from '../dialogs/LogInDialog'
import SignUpDialog from '../dialogs/SignUpDialog'
import './navigation.css'

export default function Navigation({ currentUser }) {
  // Ref for options container
  const optionsContainer = useRef()
  // Hook for programmatic navigation
  const navigate = useNavigate()
  // Hook for accessing the current location
  const location = useLocation()
  // State for the search keyword
  const searchKeyword = useInput('text', 'search')

  // Custom hooks for login and sign-up dialogs
  const logInDialog = useDialog()
  const signUpDialog = useDialog()

  // Clear the keyword when navigating away from the results page
  useEffect(() => {
    if (location.pathname !== '/results') {
      searchKeyword.setValue('')
    }
  }, [location])

  // Handle pressing Enter key to trigger search
  function handleKeyPressEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      navigate('/results?keyword=' + searchKeyword.value)
    }
  }

  // Toggle visibility of account options
  function toggleOptionsVisibility() {
    optionsContainer.current.classList.toggle('hidden')
  }

  // Render account options based on user authentication status
  function renderAccountOptions() {
    if (currentUser) {
      return (
        <>
          <div className='nav-item' onClick={toggleOptionsVisibility}>
            <a>{currentUser.name}</a>
            <section className='options-wrapper hidden' ref={optionsContainer} onMouseLeave={toggleOptionsVisibility}>
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
            <a onClick={logInDialog.show}>Log in</a>
            <LogInDialog logInDialog={logInDialog} signUpDialog={signUpDialog} />
          </div>
          <div className='nav-item'>
            <a onClick={signUpDialog.show}>Sign up</a>
            <SignUpDialog logInDialog={logInDialog} signUpDialog={signUpDialog} />
          </div>
        </>
      )
    }
  }

  // Main navigation component
  return (
    <nav className='navigation justify-center flex-row align-center'>
      <h1 className='nav-icon'><Link to='/'>Seed Mart</Link></h1>
      <div className='search-container flex-row'>
        <input
          type="text"
          onKeyDown={handleKeyPressEnter}
          onChange={e => searchKeyword.setValue(e.target.value)}
          value={searchKeyword.value}
        />
        <button onClick={() => navigate('/results?keyword=' + searchKeyword.value)}>Search</button>
      </div>
      <div className="nav-options flex-row">
        {renderAccountOptions()}
        <div className='nav-item cart'>
          <Link to='/cart'>Cart</Link>
        </div>
      </div>
    </nav>
  )
}
