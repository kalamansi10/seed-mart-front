import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navigation from "./components/global/Navigation"
import HomePage from './pages/HomePage'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
  ]);
  
  return (
    <>
      <Navigation isSignedIn={true} />
      <RouterProvider router={router} />
    </>
  )
}

export default App