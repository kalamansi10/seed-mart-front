import useCookiesAndHeaders from './useCookiesAndHeaders'

export default function useLogOut() {
  const { getHeader } = useCookiesAndHeaders()

  fetch('http://localhost:3000/users/sign_out', getHeader("DELETE"))
    .then(() => window.location.reload())
}