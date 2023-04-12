import React, { memo, useContext, useState } from 'react'
import AddColumn from '../utils/AddColumn'
import Cross from '../utils/Cross'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../App'

export default memo(function EditBoardDetails({isDark, columns, name, setShowEditBoard}) {

  const [token, setToken] = useContext(AuthContext)  
  const [subtasksReg, setSubtasksReg] = useState(columns)
    const [boardColumnsReg, setBoardColumnsReg] = useState(columns)
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [errorCategory, setErrorCategory] = useState('')
    const [currentColumn, setCurrentColumn] = useState('')
    const [currentName, setCurrentName] = useState(name)

    const { id } = useParams()

    const preventPropagation = (e) => {
        e.stopPropagation();
    }

    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/boards/${id}`, {
            name: currentName,
            columns: boardColumnsReg,
          },{headers: {
            'Authorization': `${token}` 
          }});

          if (response.data.error) {
            setIsError(true)
            setErrorMessage(response.data.error)
            setErrorCategory(response.data.category)

            setTimeout(() => {
              setIsError(false)
              setErrorMessage(response.data.error)
            }, 3000);

            return;

          }

          setShowEditBoard(false)
        } catch (err) {
          console.log(err);
        }
      };

    const addColumn = (e) => {
        e.preventDefault();
        setSubtasksReg([...subtasksReg, currentColumn]);
        setBoardColumnsReg([...boardColumnsReg, currentColumn]);
        setCurrentColumn('');
      };
        
      const updateColumn = (index, value) => {
        const updatedColumns = [...boardColumnsReg];
        updatedColumns[index] = value;
        setBoardColumnsReg(updatedColumns);
        
        const updatedSubtasks = [...subtasksReg];
        updatedSubtasks[index] = value;
        setSubtasksReg(updatedSubtasks);
      };
        
      const removeColumn = (index) => {
        const updatedColumns = boardColumnsReg.filter((_, i) => i !== index);
        setBoardColumnsReg(updatedColumns);
        
        const updatedSubtasks = subtasksReg.filter((_, i) => i !== index);
        setSubtasksReg(updatedSubtasks);
      };

  return (
    <div onClick={() => setShowEditBoard(false)} className='bg-base-100/50  z-20 absolute top-0 left-0 w-full h-full flex justify-center items-center'>
        <div onClick={preventPropagation} className='w-[90%] md:w-[480px] h-[488px] font-semibold overflow-y-scroll scrollbar-hide bg-base-100 text-secondary-content rounded p-6 text-sm'>
            <h2 className='text-xl'>Edit Board</h2>
            <div className='flex flex-col mt-6'>
                <label htmlFor="name">Board name</label>
                <input onChange={(e) => setCurrentName(e.target.value)} value={currentName} type="text" name="name" id="name" className={`border- focus:border focus:border-primary ${isError && errorCategory === 'title' ? 'border-red-600' : null} focus:outline-none focus:ring-[#635FC7] border-[#828FA3]/25 py-2 px-2 mt-2 rounded outline-none w-[95%] ${isDark ? 'bg-[#2B2C37]' : null}`} />
                {isError && errorCategory === 'title' ? <span className='text-red-600 text-sm mt-1'>{errorMessage}</span> : null}
            </div>
            <div className='flex flex-col mt-4'>
                <label>Board Columns</label>
                {boardColumnsReg.map((column, index) => (
                    <div key={index} className='flex items-center w-full'>   
                        <input
                        key={index}
                        onChange={(e) => updateColumn(index, e.target.value)}
                        value={column}
                        type='text'
                        className={`border- focus:border ${isError && errorCategory === 'column' && column === '' ? 'border-red-600' : null} focus:border-primary focus:outline-none focus:ring-primary border-neutral/25 py-2 px-2 mt-2 outline-none w-[95%] rounded `}
                        required
                        />
                        <Cross onClick={() => removeColumn(index)} />
                    </div> 
                ))}
                {isError && errorCategory === 'column' ? <span className='text-red-600 text-sm mt-1'>{errorMessage}</span> : null}
                <AddColumn addColumn={addColumn} />
                <button onClick={handleSaveChanges} className='w-full bg-primary hover:bg-primary/80 active:scale-95 py-3 rounded-full mt-4 text-secondary-content'>Save Changes</button>
            </div>
        </div>
    </div>
  )
}
)