import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignupPage from './components/pages/Signup';
import LoginPage from './components/pages/Login';
import Board from './components/pages/Board'
import { createContext, useEffect, useState } from 'react';
export const AuthContext = createContext();
export const ThemeContext = createContext();
function App() {
  const [token , setToken] = useState(localStorage.getItem("token"));
  const [theme, setTheme] = useState('cupcake');
  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', theme);
  }, [theme]);
  return (
    <ThemeContext.Provider value={[theme , setTheme]}>
    <AuthContext.Provider value={[token , setToken]}>
    <div className="App">
        <BrowserRouter>
        <Routes>

            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path={'/'} element={<Board/>}/>
            <Route path={'/:id'} element={<Board/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </AuthContext.Provider> 
    </ThemeContext.Provider> 
    );
}

export default App;
