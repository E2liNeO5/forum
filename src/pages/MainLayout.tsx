import { Outlet } from "react-router"
import '../styles.scss'
import Header from "../components/Header/Header"

const MainLayout = () => {
  return (
    <div className="main_container">
      <Header />
      <Outlet />
    </div>
  )
}

export default MainLayout