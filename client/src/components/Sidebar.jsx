import React, { memo, useContext } from 'react'
import Boards from './board_elements/Boards'
import LightMode from './functionals/LightMode'
import Logo from './utils/Logo'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'

export default memo(function Sidebar({showBoardForm, setShowBoardForm, allBoards}) {

  const [token,setToken] = useContext(AuthContext)
  const navigate = useNavigate();
  const logout = () => {
    console.log("logout")
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    navigate('/')
  };




  return (
    <div className='min-w-[300px] md:flex h-screen border-r border-secondary-content p-6 hidden sidebar flex-col justify-between bg-base-300'>
        <div className='flex flex-col'>
        <Link to='/'><Logo/></Link>
        <Boards setShowBoardForm={setShowBoardForm} showBoardForm={showBoardForm} allBoards={allBoards} />
        </div>
        <div className='flex flex-col'>
          <LightMode />
          <button onClick={logout} className='bg-primary hover:bg-primary/80 active:scale-95 py-3 rounded-3xl text-sm px-6 text-secondary-content md:block hidden'>Logout</button>
          {/*<HideSidebar setIsHidden={setIsHidden} isHidden={isHidden} />*/}
        </div>
    </div>
  )
}
)
