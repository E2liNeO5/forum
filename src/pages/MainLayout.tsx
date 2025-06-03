import { Outlet } from "react-router"
import '../styles.scss'
import Header from "../components/Header/Header"
import Toasts from "../components/UI/Toast/Toasts"

const MainLayout = () => {
  return (
    <div className="main_container">
      <Header />
      <Outlet />
      <Toasts />
    </div>
  )
}

export default MainLayout