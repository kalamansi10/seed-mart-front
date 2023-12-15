import { useState, useRef, useEffect } from 'react'
import { Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import useLogOut from '../hooks/useLogOut'
import LogInDialog from './LogInDialog'
import SignUpDialog from './SignUpDialog'
import './navigation.css'

export default function Navigation({ currentUser, logInDialog, signUpDialog, setSearchAPI }) {
  // Ref for options wrapper
  const optionsWrapperRef = useRef()
  // Hook for managing search parameters
  const [searchParams] = useSearchParams()
  // Hook for programmatic navigation
  const navigate = useNavigate()
  // Hook for accessing the current location
  const location = useLocation()
  // State for the search keyword
  const [keyword, setKeyword] = useState('')

  // Clear the keyword when navigating away from the results page
  useEffect(() => {
    if (location.pathname !== '/results') {
      setKeyword('')
    }
  }, [location])

  // Update search parameters and navigate to results
  function updateSearchParamsAndNavigate() {
    searchParams.delete('keyword')
    searchParams.append('keyword', keyword)
    navigate('/results?' + searchParams.toString())
    setSearchAPI('/api/v1/search?' + searchParams.toString())
  }

  // Handle pressing Enter key to trigger search
  function handleKeyPressEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      updateSearchParamsAndNavigate()
    }
  }

  // Toggle visibility of account options
  function toggleOptionsVisibility() {
    optionsWrapperRef.current.classList.toggle('hidden')
  }

  // Render account options based on user authentication status
  function renderAccountOptions() {
    if (currentUser) {
      return (
        <>
          <div className='nav-item' onClick={toggleOptionsVisibility}>
            <a>{currentUser.name}</a>
            <section className='options-wrapper hidden' ref={optionsWrapperRef} onMouseLeave={toggleOptionsVisibility}>
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

  // Main navigation component
  return (
    <nav className='navigation justify-center flex-row align-center'>
      <h1 className='nav-icon'><Link to='/'>Seed Mart</Link></h1>
      <div className='search-container flex-row'>
        <input
          type="text"
          onKeyDown={handleKeyPressEnter}
          onChange={e => setKeyword(e.target.value)}
          value={keyword}
        />
        <button onClick={updateSearchParamsAndNavigate}>Search</button>
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
