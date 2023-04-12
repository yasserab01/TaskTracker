import axios from 'axios'
import React, { memo, useContext } from 'react'
import { useParams } from 'react-router-dom'
import socket from '../config/socket'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'

export default memo(function DeleteBoard({description, isDark, setShowDeleteWindow, setAllBoards}) {

    const [token,setToken] = useContext(AuthContext);  
    const { id } = useParams()
    const navigate = useNavigate()

    // deleting the board
    const handleDeleteBoard = async () => {
        try {
          const request = await axios.delete(`http://localhost:5000/boards/${id}`,{headers: {
            'Authorization': `${token}` 
          }});
          
          
          setShowDeleteWindow(false)
          navigate('/')

        } catch (err) {
          console.log(err);
        }
      };


    

  return (
    <div className={`absolute top-0 left-0 w-full h-full bg-base-100/50 flex justify-center items-center`}>
        <div className='w-[480px] h-[229px] rounded-lg bg-base-100 p-6'>
            <h3 className='text-secondary-content font-bold text-xl'>Delete this board ?</h3>
            <p className='text-sm mt-5 text-[#828FA3]'>{description}</p>
            <div className='flex w-full justify-between mt-8'>
                <button onClick={handleDeleteBoard} className='w-[46%] bg-[#EA5555] hover:bg-[#EA5555]/80 active:scale-95 text-white py-2 rounded-full text-sm font-bold'>Delete</button> 
                <button onClick={() => setShowDeleteWindow(false)} className='bg-primary w-[46%]  active:scale-95 hover:bg-primary/80 text-secondary-content py-2 rounded-full text-sm font-bold'>Cancel</button>
            </div>
        </div>
    </div>
  )
}
)