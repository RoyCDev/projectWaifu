import MainPage from "./pages/MainPage"
import { useState, useEffect } from "react"
import { apiRequest } from "./util";

function App() {
  const [user, setUser] = useState({ username: "Guest" });
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const init = async () => {
      try {
        const info = await apiRequest("GET", "/api/user/data/info")
        const profile = await apiRequest("GET", "/api/user/data/profile")

        setUser({ ...info, ...profile });
        setIsLoggedIn(true);
      }

      catch {

      }
    }
    init()

  }, [isLoggedIn])

  return (
    <>
      <MainPage user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </>
  )
}

export default App
