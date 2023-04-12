import React, { useContext, useState } from 'react'
import axios from 'axios';
import Cross from '../utils/Cross';
import { useParams } from 'react-router-dom';
import AddColumn from '../utils/AddColumn';
import { AuthContext } from '../../App';

export default function AddTask({setShowTaskForm, columns}) {

    const [token,setToken] = useContext(AuthContext);
    const [nameReg, setnameReg] = useState('')
    const [descriptionReg, setDescriptionReg] = useState('')
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [errorCategory, setErrorCategory] = useState('')
    const [subtasksReg, setSubtasksReg] = useState([])
    const [statusReg, setStatusReg] = useState(columns[0])


    const board = useParams()

    const preventPropagation = (e) => {
        e.stopPropagation();
    }

    const addColumn = (e) => {
        e.preventDefault();
        const newSubtask = {
          name: "",
          completed: false
        };
        setSubtasksReg([...subtasksReg, newSubtask]);
      };
    
      const updateColumn = (index, nameValue) => {
        const updatedSubtasks = [...subtasksReg];
        updatedSubtasks[index] = {
          ...updatedSubtasks[index],
          name: nameValue
        };
        setSubtasksReg(updatedSubtasks);
      };
    
      const removeColumn = (index) => {
        const updatedSubtask = subtasksReg.filter((_, i) => i !== index)
        setSubtasksReg(updatedSubtask)
      }

      const addTask = async (e) => {
        e.preventDefault();

        // authentication
        if (!nameReg) {

            setErrorCategory('name')
            setIsError(true);
            setErrorMessage('Can\'t be empty.');

            setTimeout(() => {
              setIsError(false);
              setErrorMessage('')
            }, 3000);
          
            return;
          }


        try {
          const response = await axios.post(`http://localhost:5000/boards/${board.id}/tasks`, {
            name: nameReg,
            description: descriptionReg,
            subtasks: subtasksReg,
            status: statusReg,
          },{headers: {
            'Authorization': `${token}` 
          }});

          console.log({
            name: nameReg,
            description: descriptionReg,
            subtasks: subtasksReg,
            status: statusReg,
          })
      
          if (response.data.error) {
            setIsError(true);
            setErrorCategory(response.data.category)
            setErrorMessage(response.data.error)
            setTimeout(() => {
              setIsError(false);
              setErrorMessage('')
              setErrorCategory('')
            }, 3000);
            return;
          }
      
          setDescriptionReg('')
          setnameReg('')
          setSubtasksReg([])
          setShowTaskForm(false)
          
          console.log(localStorage.getItem('tasks')===null)
          const tasks = JSON.parse(localStorage.getItem('tasks')===null ? [] : localStorage.getItem('tasks'))
          tasks.push(response.data)
          
          localStorage.setItem('tasks', JSON.stringify(tasks))
        } catch (err) {
          console.log(err)
        }
      }


  return (
    <div onClick={() => setShowTaskForm(false)} className={`absolute top-0 left-0 w-full h-screen bg-base-100/50 flex justify-center items-center`}>
        <form onSubmit={addTask} onClick={preventPropagation} className={`w-[90%] md:w-[480px] h-[550px] md:h-[550px] bg-base-100 text-secondary-content/80 rounded p-8 text-sm overflow-y-scroll scrollbar-hide`}>
            <h2 className='font-bold text-xl md:text-2xl cursor-default'>Add New Task</h2>
            <div className='flex flex-col mt-6'>
                <label htmlFor="name" className={`text-secondary-content/80 font-bold tracking-wide text-xs`}>name</label>
                <input onChange={(e) => setnameReg(e.target.value)} placeholder='e.g. Take coffee break' type="text" name="name" id="name" className={`border border-[#828FA3]/25 py-2 px-2 mt-2 text-sm md:text-base ${isError && errorCategory === 'name' ? 'border-red-600' : null} outline-none bg-base-100 focus:border focus:border-primaryfocus:outline-none focus:ring-primary`} />
                {isError && errorCategory === 'name' ? <span className='text-sm mt-1 text-red-600'>{errorMessage}</span> : null}
            </div>
            <div className='flex flex-col mt-4'>
                <label htmlFor="description" className={`text-secondary-content/80 font-bold tracking-wide text-xs`}>Description</label>
                <textarea onChange={(e) => setDescriptionReg(e.target.value)} placeholder='e.g. Its always good to take a break. This 15 minute break will recharge the batteries a little.' name="description" id="description" cols="30" rows="5" className={`border focus:border ${isError && errorCategory === 'description' ? 'border-red-600' : null} focus:border-primaryfocus:outline-none focus:ring-primaryborder-[#828FA3]/25 px-2 resize-none py-2 text-sm md:text-base mt-2 outline-none bg-base-100`}></textarea>
                {isError && errorCategory === 'description' ? <span className='text-sm mt-1 text-red-600'>{errorMessage}</span> : null}
            </div>
            <div className='flex flex-col mt-4'>
                <label htmlFor="subtasks" className={`text-secondary-content/80 font-bold tracking-wide text-xs`}>Subtasks</label>
                {subtasksReg.map((subtask, index) => (
                    <div key={index} className='flex w-full items-center'>
                    <input placeholder='e.g. Drink coffee & smile' type="text" className={`w-[95%] border text-sm md:text-base border-[#828FA3]/25 py-2 px-2 mt-2 outline-none focus:border focus:border-primaryfocus:outline-none focus:ring-primary bg-base-100`}
                        key={index}
                        value={subtask.name}
                        onChange={(e) => updateColumn(index, e.target.value)}
                    />
                    <Cross onClick={() => removeColumn(index)} />
                    </div>
                ))}
                {isError && errorCategory === "subtask" ? <span className='mt-1 text-red-600 text-sm'>{errorMessage}</span> : null}
                <AddColumn addColumn={addColumn} />
            </div>
            <div className='flex flex-col mt-4'>
                <label htmlFor="status" className='text-secondary-content/80 font-bold tracking-wide text-xs'>Status</label>
                <select onChange={(e) => setStatusReg(e.target.value)} name="status" id="status" className={`py-2 bg-base-100 border border-[#828FA3]/25 px-2 mt-2 outline-none text-sm md:text-base focus:border focus:border-primaryfocus:outline-none focus:ring-primary`}>
                    {columns.map(column => (
                        <option key={column} value={column}>{column}</option>
                    ))}
                </select>
            </div>
            <button type='submit' className='w-full mx-auto bg-primary hover:bg-primary/80 active:scale-95 mt-6 py-3 rounded-3xl text-sm text-secondary-content/80 font-bold'>Create Task</button>
        </form>
    </div>
  )
}
