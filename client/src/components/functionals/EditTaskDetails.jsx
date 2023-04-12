import React, { useContext, useState } from 'react'
import AddColumn from '../utils/AddColumn'
import Cross from '../utils/Cross'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../App'

export default function EditTaskDetails({task, setShowTaskEdit,columns}) {

    const [token,setToken] = useContext(AuthContext);
    const [currentname, setCurrentname] = useState(task.name)
    const [currentDescription, setCurrentDescription] = useState(task.description)
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [errorCategory, setErrorCategory] = useState('')
    const [subtasksReg, setSubtasksReg] = useState(task.subtasks)
    const [currentStatus, setCurrentStatus] = useState(task.status)
    const { id } = useParams()

    const preventPropagation = (e) => {
        e.stopPropagation()
    }

    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/boards/${id}/tasks/${task._id}`, {
            name: currentname,
            description: currentDescription,
            subtasks: subtasksReg,
            status: currentStatus
          },{headers: {
            'Authorization': `${token}` 
          }});

          if (response.data.error) {
            setIsError(true)
            setErrorMessage(response.data.error)
            setErrorCategory(response.data.category)

            setTimeout(() => {
              setIsError(false)
              setErrorMessage('')
            }, 3000);

            return;
          }
          setShowTaskEdit(false)
        } catch (err) {
          console.log(err);
        }
      };

    const addColumn = (e) => {
      e.preventDefault();
      const newSubtask = {
        name: "",
        completed: false
      };
      setSubtasksReg([...subtasksReg, newSubtask]);
      };
        
      const updateColumn = (index, value) => {
        const updatedSubtasks = [...subtasksReg];
        updatedSubtasks[index] = {
          ...updatedSubtasks[index],
          name: value,
        };
        setSubtasksReg(updatedSubtasks);
      };
        
      const removeColumn = (index) => {
        const updatedSubtask = subtasksReg.filter((_, i) => i !== index)
        setSubtasksReg(updatedSubtask)
      };

  return (
    <div onClick={() => setShowTaskEdit(false)} className={`flex absolute top-0 left-0 w-full h-full bg-base-100/50 justify-center items-center`}>
        <div onClick={preventPropagation} className={`w-[90%] md:w-[480px] h-[550px] text-secondary-content/80 font-semibold bg-base-100 rounded p-6 overflow-y-scroll scrollbar-hide text-sm`}>
            <h2 className='text-xl'>Edit Task</h2>
            <div className='flex flex-col mt-6'>

                <label htmlFor="name">name</label>
                <input onChange={(e) => setCurrentname(e.target.value)} value={currentname} type="text" name="name" id="name" className={`border ${isError && errorCategory === 'name' ? 'border-red-600' : null} border-[#828FA3]/25 py-2 focus:border focus:border-primary focus:outline-none focus:ring-primary px-2 mt-2 outline-none bg-base-100 : null}`} />
                {isError && errorCategory === 'name' ? <span className='mt-1 text-red-600 text-sm'>{errorMessage}</span> : null}

                <label htmlFor="description" className='mt-6'>Description</label>
                <textarea onChange={(e) => setCurrentDescription(e.target.value)} value={currentDescription} name="description" id="description" cols="30" rows="4" className={`border border-[#828FA3]/25 py-2 px-2 mt-2 resize-none focus:border-primary focus:outline-none focus:ring-primary focus:border outline-none bg-base-100 : null}`}></textarea>

                <label className='mt-6'>Subtasks</label>
                {subtasksReg.map((subtask, index) => (
                    <div key={index} className='flex items-center w-full'>   
                        <input
                        key={index}
                        value={subtask.name}
                        onChange={(e) => updateColumn(index, e.target.value)}
                        type='text'
                        className={`border- focus:border focus:border-primary focus:outline-none focus:ring-primary border-[#828FA3]/25' : 'bg-white border-[#828FA3]/25'} py-2 px-2 mt-2 outline-none w-[95%] ${isError && errorCategory === 'subtask' && subtask.name === '' ? 'border-red-600' : null} rounded bg-base-100 : null}`}
                        required
                        />
                        <Cross onClick={() => removeColumn(index)} />
                    </div> 
                ))}
                {isError && errorCategory === 'subtask' ? <span className='mt-1 text-red-600 text-sm'>{errorMessage}</span> : null}
                <AddColumn addColumn={addColumn} />
                <label htmlFor="status" className='mt-4'>Status</label>
                <select onChange={(e) => setCurrentStatus(e.target.value)} name="status" id="status" className={`border border-[#828FA3]/25 py-2 px-2 mt-2 outline-none bg-base-100 focus:border focus:border-primary focus:outline-none focus:ring-primary' : null}`}>
                {columns.map(column => (
                    <option selected={column === currentStatus ? currentStatus : null} key={column} value={column}>{column.charAt(0).toUpperCase() + column.slice(1)}</option>
                ))}
                </select>
                <button onClick={handleSaveChanges} className='w-full bg-primary hover:bg-primary/80 active:scale-95 py-3 rounded-full mt-6 text-secondary-content text-sm'>Save Changes</button>
            </div>
        </div>
    </div>
  )
}
