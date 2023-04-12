import React, { useState, useContext, useMemo, memo } from 'react'
import axios from 'axios'
import BoardScreen from '../board_elements/BoardScreen'
import AddBoard from '../forms/AddBoard'
import AddTask from '../forms/AddTask'
import Sidebar from '../Sidebar'
import TopBar from '../board_elements/TopBar'
import { useEffect } from 'react'
import socket from '../config/socket'
import { useParams } from 'react-router-dom'
import MobileMenu from '../functionals/MobileMenu'
import withAuth from '../withAuth'
import { AuthContext } from '../../App'

const Board = ()=> {

  const [token,setToken] = useContext(AuthContext);

  const [showTaskForm, setShowTaskForm] = useState(false)

  const [showBoardForm, setShowBoardForm] = useState(false)

  const [showMobileMenu, setShowMobileMenu] = useState(false)

  

  const [allBoards, setAllBoards] = useState([])

  const board = useParams()

  const [columns, setColumns] = useState()

  const [boardName, setBoardName] = useState('')





  useEffect(() => {
    const getCurrentBoard = async () => {
      if (board.id === undefined) {
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/boards/${board.id}`,{headers: {
          'Authorization': `${token}` 
        }});
        setColumns(response.data.columns)
        setBoardName(response.data.name)
      } catch (err) {
        console.log(err);
      }
    }

    getCurrentBoard()

  }, [board.id,columns,boardName])

  useEffect(() => {
      axios.get('http://localhost:5000/boards',{headers: {
        'Authorization': `${token}` 
      }})
        .then(response => {
          setAllBoards(response.data);
        })
        .catch(error => {
          console.log(error);
        });

      
    }, [allBoards]);


  return (
    <div className='h-screen w-full flex md:overflow-y-hidden'>
        <Sidebar showBoardForm={showBoardForm} setShowBoardForm={setShowBoardForm} allBoards={allBoards} />
        <div className='flex flex-col w-full'>
        <TopBar setShowTaskForm={setShowTaskForm} showTaskForm={showTaskForm} allBoards={allBoards} name={boardName} setAllBoards={setAllBoards} setBoardName={setBoardName} columns={columns} setShowMobileMenu={setShowMobileMenu} />
        <BoardScreen  columns={columns} setColumns={setColumns} setShowBoardForm={setShowBoardForm} />
        </div>
        {showTaskForm ? <AddTask setShowTaskForm={setShowTaskForm} columns={columns} /> : null}
        {showBoardForm ? <AddBoard setShowBoardForm={setShowBoardForm}  /> : null}
        {showMobileMenu ? <MobileMenu allBoards={allBoards}  setShowMobileMenu={setShowMobileMenu} setShowBoardForm={setShowBoardForm} /> : null}
    </div>
  )
}

export default withAuth(memo(Board));
