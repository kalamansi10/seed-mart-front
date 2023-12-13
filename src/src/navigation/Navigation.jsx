import { useState, useRef } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import useLogOut from '../hooks/useLogOut'
import LogInDialog from './LogInDialog'
import SignUpDialog from './SignUpDialog'
import './navigation.css'

export default function Navigation({ currentUser, logInDialog, signUpDialog, setSearchAPI }) {
  const optionsWrapper = useRef()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')

  function showResults() {
    searchParams.delete('keyword')
    searchParams.append('keyword', keyword)
    navigate('/results?' + searchParams.toString())
    setSearchAPI('/api/v1/search?' + searchParams.toString())
  }

  function handlePressEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      showResults()
    }
  }

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
    <nav className='navigation flex-row align-center'>
      <h1><Link to='/'>Seed Mart</Link></h1>
      <div className='search-container flex-row'>
        <input type="text"
          onKeyDown={handlePressEnter}
          onChange={e => setKeyword(e.target.value)}
          value={keyword}
        />
        <button onClick={showResults}>Search</button>
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
