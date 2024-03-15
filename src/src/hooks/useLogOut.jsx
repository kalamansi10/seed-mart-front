import useGetCookie from './useGetCookie'

export default function useLogOut() {
  fetch('http://localhost:3000/users/sign_out', {
    method: 'delete',
    'credentials': 'include',
    headers: {
      'X-CSRF-Token': useGetCookie('CSRF-TOKEN')
    }
  })
    .then(() => window.location.reload())
}