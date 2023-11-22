import LogInDialog from './LogInDialog'
import UserOptions from './UserOptions'

export default function Navigation({ currentUser }) {


  return (
    <nav className='navigation flex-row justify-around'>
      <h1>Seed Mart</h1>
      <ul className="flex-row">
        {!currentUser && <LogInDialog />}
        {currentUser && <UserOptions />}
        <li>Cart</li>
      </ul>
    </nav>
  )
}
