import './styles/styles.css';
import { Route, Routes, Link } from 'react-router-dom';
import PrivateRoute from '../src/components/PrivateRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from '../src/Theme/ThemeContext';
import Home from './pages/Home';
import Layout from './components/Layout';
import Movies from './pages/Movies';
import Search from './pages/Search';
import Movie from './pages/Movie';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyCollection from './components/MyCollection';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route
                path="postmovies"
                element={<PrivateRoute>{<Movies />}</PrivateRoute>}
              />
              <Route
                path="searchmovies"
                element={<PrivateRoute>{<Search />}</PrivateRoute>}
              />
              <Route path="movies/:id" element={<Movie />} />
              <Route path="registration" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route
                path="dashboard"
                element={<PrivateRoute>{<MyCollection />}</PrivateRoute>}
              />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
