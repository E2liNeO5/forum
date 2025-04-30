import { Outlet } from "react-router"
import '../styles.scss'
import Header from "../components/Header/Header"
import FilterSidebar from "../components/FilterSidebar/FilterSidebar"

const MainLayout = () => {
  return (
    <div className="main_container">
      <Header />
      <FilterSidebar />
      <Outlet />
    </div>
  )
}

export default MainLayout