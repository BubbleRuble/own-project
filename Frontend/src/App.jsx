import './styles/styles.css';
import {Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Movies from './pages/Movies';
import Search from './pages/Search';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />         
          <Route path="postmovies" element={<Movies />} /> 
          <Route path="searchmovies" element={<Search />} /> 
        </Route>
      </Routes>
    </div>
  )
}

export default App;

