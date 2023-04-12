import React, { useContext, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import axios from 'axios'
import EditTask from './functionals/EditTask'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../App'

export default function TaskDetails({task, isDark, setShowDetails, columns, setShowDeleteWindow, setShowTaskEdit}) {

    const [token,setToken] = useContext(AuthContext);
    const [showEdit, setShowEdit] = useState(false)
    const { id } = useParams()


    const preventPropagation = (e) => {
        e.stopPropagation()
    }

    const updateStatus = async (name, completed) => {
        try {
            const subtask = task.subtasks.find(subtask => subtask.name === name);
            subtask.completed = completed;
            await axios.put(`http://localhost:5000/boards/${id}/tasks/${task._id}`, {
                ...task
          },{headers: {
            'Authorization': `${token}` 
          }});
        } catch (err) {
          console.log(err);
        }
      };


  return (
    <>
    <div onClick={() => setShowDetails(false)} className='w-full absolute bg-base-100/50 top-0 left-0 h-full flex justify-center items-center'>
        <div onClick={preventPropagation} className='bg-base-100 text-secondary-content w-[90%] md:w-[480px] h-auto rounded p-8'>
            <div className='flex w-full justify-center items-center relative'>
                <p className='text-xl font-bold w-[80%] break-words'>{task.name.charAt(0).toUpperCase() + task.name.slice(1)}</p>
                <BsThreeDotsVertical onClick={() => setShowEdit(!showEdit)} className='text-[#828FA3] text-xl cursor-pointer justify-self-end' />
                {showEdit ? <EditTask isDark={isDark} setShowEdit={setShowEdit} showEdit={showEdit} setShowDetails={setShowDetails} setShowDeleteWindow={setShowDeleteWindow} setShowTaskEdit={setShowTaskEdit} /> : null}
            </div>
            <p className={`mt-6 text-sm text-[#828FA3] w-full break-words`}>{task.description.charAt(0).toUpperCase() + task.description.slice(1)}</p>
            <p className='mt-6 text-xs font-bold text-secondary-content'> Subtasks ({task.subtasks.filter(subtask => subtask.completed).length} of {task.subtasks.length})</p>
            <div className='flex flex-col'>
                {task.subtasks.map((subtask, index) => (
                    <div key={index} className={`bg-base-200 py-3 mt-4 rounded-lg h-auto ${subtask.completed ? 'line-through text-[#828FA3]' : null}`}>
                    <input
                        key={index} 
                        type="checkbox" 
                        className={`ml-4 bg-base-300 focus:border border-secondary-content/20  rounded-sm focus:border-primary focus:outline-none focus:ring-primary checked:bg-primary`} 
                        name={subtask.name}
                        checked={subtask.completed} 
                        id={subtask.name}
                        onChange={() => updateStatus(subtask.name, !subtask.completed)}
                    />
                        <label htmlFor={subtask.name} className='ml-4 text-sm'>{subtask.name.charAt(0).toUpperCase() + subtask.name.slice(1)}</label>
                    </div>
                ))}
            </div>
            <p className='mt-4 text-xs font-bold'>Current Status</p>
            <select className={`w-full bg-base-200 border border-secondary-content/25 outline-none mt-2`}>
                {columns.map(column => (
                <option key={column} value={column} selected={column === task.status ? column : null} defaultValue={column === task.status}>{column.charAt(0).toUpperCase() + column.slice(1)}</option>
                ))}
            </select>
        </div>
    </div>
    </>
  )
}
