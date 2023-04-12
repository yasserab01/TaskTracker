import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Task from './Task'
import socket from './config/socket'
import { AuthContext } from '../App'

export default function Column({name, index, isDark, columns}) {

    const [currentTasks, setCurrentTasks] = useState([])
    const board = useParams()
    const [token,setToken] = useContext(AuthContext);



    useEffect(() => {
        axios
          .get(`http://localhost:5000/boards/${board.id}/tasks`,{headers: {
            'Authorization': `${token}` 
          }})
          .then((response) => {
            setCurrentTasks(response.data.filter((task) => task.status === name));
          })
          .catch((error) => {
            console.log(error);
          });
    
          
      }, [board.id, name,currentTasks]);





  return (
    <div className='flex flex-col mt-[2rem] min-w-[350px]'>
        <div className='flex items-center gap-4'>
            <div className={`w-[20px] h-[20px] ${index % 2 ? 'bg-[#8471F2]' : 'bg-[#49C4E5]'} rounded-full`}></div>
            <p className='text-[#828FA3] font-bold tracking-widest text-sm cursor-default'>{name.toUpperCase()} ({currentTasks.length})</p>
        </div>
        <div className='flex flex-col'>
            {currentTasks.map(task => (
                <Task
                    key={task._id}
                    task = {task}
                    isDark={isDark}
                    columns={columns}
                    setCurrentTasks={setCurrentTasks}
                />
            ))}
        </div>
    </div>
  )
}
