import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Index } from './pages/Index';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

const App = () => {
  return (
      <Routes>
        <Route path='*' element={<Index />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
  )
};

export default App;
