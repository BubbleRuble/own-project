import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import '../styles/index.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
    <h1>Hello, {user.name} !</h1>

    <nav>
        <ul className="dashboard-list">
          <li className="dashboard-link"><Link to="/postmovies">🎬 Мої фільми</Link></li>
          <li className="dashboard-link"><Link to="/searchmovies">🔍 Пошук</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Dashboard;