import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';  
import Notfound from './pages/Notfound';
import Favourite from './pages/Favourite';

function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>}/>
          <Route path="/favourite" element={<ProtectedRoute> <Favourite /> </ProtectedRoute>}/>
          <Route path="*" element={<Notfound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
