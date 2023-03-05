import { NavLink, Outlet } from "react-router-dom";
import style from "./styles.module.css";

function App() {
  return (
    <div className={style.app}>
      <nav className={style.nav}>
        <NavLink to="/">Questions</NavLink>
        <NavLink to="/new">New Questions</NavLink>
      </nav>
      <hr />
      <div className={style.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
