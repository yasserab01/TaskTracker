import React from 'react'

export default function EditTask({setShowEdit, isDark, setShowDetails, setShowDeleteWindow, setShowTaskEdit}) {

    const handleShowDelete = () => {
        setShowDeleteWindow(true);
        setShowDetails(false)
        setShowEdit(false)
    }

    const handleShowEdit = () => {
      setShowDetails(false);
      setShowEdit(false);
      setShowTaskEdit(true)
    }

  return (
    <div className={`absolute bg-base-300  w-[192px] h-[94px] rounded-lg top-2.5 -right-40 z-10 flex flex-col items-start justify-center px-4 gap-4 text-sm`}>
        <button onClick={handleShowEdit} className='text-secondary-content font-bold'>Edit Task</button>
        <button onClick={handleShowDelete} className='text-[#EA5555] font-bold'>Delete Task</button>
    </div>
  )
}
