import React, { memo, useEffect, useState } from 'react'
import { BsWindowSidebar } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import BoardItem from './BoardItem'
import { all } from 'axios';

export default memo(function Boards({showBoardForm, setShowBoardForm, allBoards}) {

    const [currentLocation, setCurrentLocation] = useState(() => {
        // Retrieve the current location from local storage, or return an empty string if it's not set yet
        return localStorage.getItem('currentLocation') || '';
      });
    
      useEffect(() => {
        // Update the local storage whenever the current location changes
        localStorage.setItem('currentLocation', currentLocation);
      }, [currentLocation]);
    
    const { id } = useParams()

    useEffect(() => {
        if (id === undefined) {
            setCurrentLocation('')
        }
    }, [id])


  return (
    <div className='w-full'>
        <p className='text-secondary-content text-xs mt-[20%] tracking-wider cursor-default font-bold'>ALL BOARDS ({allBoards.length})</p>
        <div className='flex flex-col mt-[15%]'>
            {allBoards.map(board => (
                <BoardItem
                    name={board.name}
                    id={board._id}
                    key={board._id}
                    setCurrentLocation={setCurrentLocation}
                    currentLocation={currentLocation}
                />
            ))}
            <div onClick={() => setShowBoardForm(!showBoardForm)} className='flex items-center gap-5 hover:bg-primary hover:text-secondary-content font-bold cursor-pointer py-3 rounded-tr-full rounded-br-full px-3 text-secondary-content/80'>
                <BsWindowSidebar />
                <p className='text-sm font-bold'>+ Create New Board</p>
            </div>
        </div>
    </div>
  )
})
