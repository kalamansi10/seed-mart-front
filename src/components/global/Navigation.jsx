import Profile from './Profile'

export default function Navigation({isSignedIn}) {
  return (
    <nav className='navigation flex-row justify-around'>
      <h1>Seed Mart</h1>
      <ul className="flex-row">
        <li>
          <Profile />
        </li>
        <li>Cart</li>
      </ul>
    </nav>
  )
}
