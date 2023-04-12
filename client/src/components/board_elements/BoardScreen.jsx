import React, { memo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Column from '../Column'

export default memo(function BoardScreen({isDark, columns, setColumns, setShowBoardForm}) {

  const { id } = useParams()

  useEffect(() => {
    if (id === undefined) {
      setColumns([])
    }
  }, [id, setColumns])

  return (
    <>
    { columns && columns.length > 0 ?
    <div className='w-full flex justify-start gap-[3rem] bg-base-300 h-full px-[2rem] md:px-[3rem] md:overflow-auto overflow-x-scroll'>
      {columns.map((column, index) => (
        <Column key={`${column}_${index}`} name={column} index={index} isDark={isDark} columns={columns} />
      ))}
    </div>
    :
    <div className='w-full flex flex-col items-center bg-base-300 h-full'>
      {id === undefined ?
          <div className='w-full mx-auto flex flex-col h-full items-center justify-center'>
            <h2 className='text-secondary-content/70 cursor-default font-bold text-sm md:text-xl'>This is home page, to get started create new board.</h2> 
            <button onClick={() => setShowBoardForm(true)} className='h-[40px] md:h-[45px] w-[160px] md:w-[190px] text-xs md:text-sm hover:bg-primary/80 active:scale-95 bg-primary text-secondary-content py-1 md:py-2 rounded-full font-bold text-center mt-6'>+ Create New Board</button>
          </div>
        : 
        <h2 className='text-xl text-secondary-content/70 tracking-wide leading-[1.3] w-[700px] text-center font-bold mt-[20%]'>This board is empty. Create a new task in top right corner to get started.</h2>}
    </div>
    }
    </>
  )
}
)