import axios from 'axios'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import socket from '../config/socket'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'

export default function DeleteBoard({task, isDark,description, setShowDeleteWindow}) {

    const [token,setToken] = useContext(AuthContext);  
    const { id } = useParams()
    


    // deleting a task
    const handleDeleteTask = async () => {
        try {
            const request = await axios.delete(`http://localhost:5000/boards/${id}/tasks/${task._id}`,{headers: {
              'Authorization': `${token}` 
            }});
            setShowDeleteWindow(false)
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div className={`absolute top-0 left-0 w-full h-full bg-base-100/50 flex justify-center items-center`}>
        <div className={`w-[480px] h-[229px] rounded-lg bg-base-100 p-6`}>
            <h3 className='text-secondary-content font-bold text-xl'>Delete this task ?</h3>
            <p className='text-sm mt-5 text-[#828FA3]'>{description}</p>
            <div className='flex w-full justify-between mt-8'>
                 <button onClick={handleDeleteTask} className='w-[46%] bg-[#EA5555] hover:bg-[#EA5555]/80 active:scale-95 text-white py-2 rounded-full text-sm font-bold'>Delete</button>
                <button onClick={() => setShowDeleteWindow(false)} className={`bg-primary w-[46%]  active:scale-95 hover:bg-primary/80 text-secondary-content py-2 rounded-full text-sm font-bold`}>Cancel</button>
            </div>
        </div>
    </div>
  )
}
