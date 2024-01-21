import { useUserFetch, useLogFetch } from "./util";
import { Route, Routes, Navigate } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom'

import MainPage from "./pages/MainPage"
import ShopPage from "./pages/ShopPage";

function App() {
  const { data, isPending } = useUserFetch();
  const isLoggedIn = !!data
  useLogFetch();

  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<MainPage user={data || { username: "Guest" }} isLoggedIn={isLoggedIn} />} />
        <Route path="/shop" element={(!isPending) &&
          (isLoggedIn ? <ShopPage user={data} /> : <Navigate to="/" />)}
        />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App
