import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import OpenRoute from './components/OpenRoute';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div>
      <Routes>
        
        <Route path="/" element={
         <OpenRoute>
           <Signup />
         </OpenRoute>
        } />
        <Route path="/login" element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
