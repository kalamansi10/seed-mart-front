import Session from '../global/Session'

export default function NavBar() {
  return (
    <nav className='navigation flex-row justify-around'>
      <h1>Seed Mart</h1>
      <ul className="flex-row">
        <li>
          <Session />
        </li>
        <li>Cart</li>
      </ul>
    </nav>
  )
}
