export default function Navigation({isSignedIn}) {
  return (
    <nav className='navigation flex-row justify-around'>
      <h1>Seed Mart</h1>
      <ul className="flex-row">
        <li>Sign In</li>
        <li>Cart</li>
      </ul>
    </nav>
  )
}
