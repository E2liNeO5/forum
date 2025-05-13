import { Outlet } from "react-router"
import '../styles.scss'
import Header from "../components/Header/Header"
import TagSidebar from "../components/TagSidebar/TagSidebar"

const MainLayout = () => {
  return (
    <div className="main_container">
      <Header />
      <TagSidebar />
      <Outlet />
    </div>
  )
}

export default MainLayout