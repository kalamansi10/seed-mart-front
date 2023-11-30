import { Link, Outlet } from 'react-router-dom'

export default function ProfilePage({currentUser}) {
  
  return (
    <>
      <Link to='/user/profile'><h4>Profile</h4></Link>
      <Link to='/user/addresses'><h4>Addresses</h4></Link>
      <Link to='/user/payment-methods'><h4>Payment Methods</h4></Link>
      <Link to='/user/orders'><h4>Orders</h4></Link>
      <Link to='/user/reviews'><h4>Reviews</h4></Link>
      <Outlet />
    </>
  )
}