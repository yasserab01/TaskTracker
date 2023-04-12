import React, { useContext, useState } from 'react'
import axios from 'axios'
import Cross from '../utils/Cross'
import { AiOutlineLoading } from 'react-icons/ai'
import { AuthContext } from '../../App'

export default function AddBoard({setShowBoardForm, isDark}) {

  const [boardNameReg, setBoardNameReg] = useState('')
  const [boardColumnsReg, setBoardColumnsReg] = useState([])
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const currentColumn = ''
  const [isLoading, setIsLoading] = useState(false)
  const [token,setToken] = useContext(AuthContext)

  const preventPropagation = (e) => {
    e.stopPropagation()
  }

  const addColumn = (e) => {
    e.preventDefault()
    setBoardColumnsReg([...boardColumnsReg, currentColumn])
  }

  const updateColumn = (index, value) => {
    const updatedColumns = [...boardColumnsReg]
    updatedColumns[index] = value
    setBoardColumnsReg(updatedColumns)
  }

  const removeColumn = (index) => {
    const updatedColumns = boardColumnsReg.filter((_, i) => i !== index)
    setBoardColumnsReg(updatedColumns)
  }


  const createBoard = async (e) => {
    e.preventDefault();
    if (!boardNameReg) {

        setIsError(true);
        setErrorMessage('Can\'t be empty.')

        setTimeout(() => {
          setIsError(false)
          setErrorMessage('')
        }, 3000);


      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/boards', {
        name: boardNameReg,
        columns: boardColumnsReg,
      },{headers: {
        'Authorization': `${token}` 
      }})

      if (response.data.error) {
        setIsLoading(false);
        setIsError(true);
        setErrorMessage(response.data.error)
        setTimeout(() => {
          setIsError(false)
          setErrorMessage('')
        }, 3000);
        return;
      }


      setIsLoading(false);
      setBoardColumnsReg([]);
      setBoardNameReg('');
      setShowBoardForm(false);
      const newBoard = {
        id: response.data.id,
        name: boardNameReg,
        columns: boardColumnsReg,
      };
      const boards = JSON.parse(localStorage.getItem('boards') || '[]');
      boards.push(newBoard);
      localStorage.setItem('boards', JSON.stringify(boards));
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div onClick={() => setShowBoardForm(false)} className={`absolute top-0 left-0 w-full h-screen bg-base-100/50 flex justify-center items-center`}>
        <form onSubmit={createBoard} onClick={preventPropagation} className={`w-[90%] md:w-[480px] h-[429px] bg-base-100 text-secondary-content/80' rounded p-8 text-sm overflow-y-scroll scrollbar-hide`}>
            <h2 className='text-xl md:text-2xl font-semibold cursor-default'>Add New Board</h2>
            <div className='flex flex-col mt-6'>
              <label htmlFor="name" className={`text-secondary-content/80 font-semibold tracking-wide text-xs`}>Board Name</label>
              <input value={boardNameReg} onChange={(e) => setBoardNameReg(e.target.value)} placeholder='e.g. Web Design' type="text" name="name" id="name" className={`border focus:border focus:border-primary focus:outline-none ${isError ? 'border-red-600' : null} focus:ring-primary border-[#828FA3]/25 py-2 px-2 mt-2 outline-none bg-base-100`} />
              {isError ? <span className='mt-1 text-sm text-red-600'>{errorMessage}</span> : null}
            </div>
            <div className='flex flex-col mt-4'>
              <label className={`text-secondary-content/80 font-semibold tracking-wide text-xs`}>Columns</label>
              {boardColumnsReg.map((column, index) => (
             <div key={index} className='flex items-center w-full'>   
             <input
                key={index}
                value={column}
                onChange={(e) => updateColumn(index, e.target.value)}
                type='text'
                className={`border focus:border focus:border-primary focus:outline-none focus:ring-primary border-[#828FA3]/25 py-2 px-2 mt-2 outline-none w-[95%] bg-base-100`}
                required
              />
              <Cross onClick={() => removeColumn(index)} />
              </div>
            ))}
              <button onClick={addColumn} className={`mt-4 text-primary font-bold bg-base-300 hover:bg-base-300/80 active:scale-95 py-3 rounded-full text-sm`}>+ Add New Column</button>
            </div>
            <button className='w-full mx-auto bg-primary hover:bg-primary/80 active:scale-95 mt-6 py-3 rounded-full text-secondary-content/80 font-semibold flex justify-center' type="submit">{isLoading ? <AiOutlineLoading className='animate-spin text-lg' /> : 'Create New Board'}</button>
        </form>
    </div>
  )
}
