import React from 'react'
import { BsWindowSidebar } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

export default function BoardItem({name, id, setCurrentLocation, currentLocation}) {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/${id}`);
        setCurrentLocation(`${id}`)
    }

  return (
    <div onClick={handleClick} className={`flex items-center gap-5 ${currentLocation === id ? 'text-secondary-content' : 'text-secondary-content/70'} ${currentLocation === id ? 'bg-primary' : null} hover:bg-primary hover:text-secondary-content font-bold cursor-pointer py-4 rounded-tr-full rounded-br-full px-3`}>
    <BsWindowSidebar />
    <p className='text-sm'>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
    </div>  
  )
}
