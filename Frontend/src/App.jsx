import './styles/styles.css';
import {Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Movies from './pages/Movies';
import Search from './pages/Search';
import Movie from './pages/Movie';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />         
          <Route path="postmovies" element={<Movies />} /> 
          <Route path="searchmovies" element={<Search />} /> 
          <Route path="movies/:id" element={<Movie />} /> 
          <Route path="registration" element={<Register />} /> 
          <Route path="login" element={<Login />} /> 
          <Route path="dashboard" element={<Dashboard />} /> 
        </Route>
      </Routes>
    </div>
  )
}

export default App;



