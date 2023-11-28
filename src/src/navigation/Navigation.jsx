import { Link } from 'react-router-dom'
import LogInDialog from './LogInDialog'
import UserOptions from './UserOptions'

export default function Navigation({ currentUser }) {


  return (
    <nav className='navigation flex-row justify-around'>
      <Link to='/'><h1>Seed Mart</h1></Link>
      <ul className="flex-row">
        {!currentUser && <LogInDialog />}
        {currentUser && <UserOptions />}
        <Link to='/cart'><li>Cart</li></Link>
      </ul>
    </nav>
  )
}
