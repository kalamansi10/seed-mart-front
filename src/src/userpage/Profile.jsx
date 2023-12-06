import { useEffect } from "react"

export default function Profile({currentUser}) {

if (currentUser) {
  return (
    <div>
      <div>
        Name: {currentUser.name}
      </div>
      <div>
        Email: {currentUser.email}
      </div>
      <div>
        Gender: {currentUser.gender}
      </div>
      <div>
        Birthday: {currentUser.gender}
      </div>
    </div>
  )
}
}