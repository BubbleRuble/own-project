import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="home__container">
      <h1>Інформація про проєкт</h1>
      {/* <img src=""/> */}
      <p>
        Це навчальний проєкт, який створений з метою вивчення React, React Router та інших
        пов'язаних технологій. Тут ви можете переглядати інформацію про різні фільми.
      </p>
    </div>
  )
}

export default Home;