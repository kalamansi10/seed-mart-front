import useGetCookie from '../hooks/useGetCookie'

export default function AddToCart({ item, amount }) {
  function updateCart() {
    let API = '/api/v1/add-to-cart?' + 'item_id=' + item.id + '&amount=' + amount
    fetch(API, {
      method: 'post',
      credentials: 'include',
      headers: {
        'X-CSRF-Token': useGetCookie('CSRF-TOKEN')
      }
    })
  }

  return (
    <button className='add-to-cart-button' onClick={updateCart}>Add to cart</button>
  )
}
