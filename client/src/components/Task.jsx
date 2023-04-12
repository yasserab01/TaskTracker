import React, { useState } from 'react'
import TaskDetails from './TaskDetails'
import DeleteTask from './functionals/DeleteTask'
import EditTaskDetails from './functionals/EditTaskDetails'

export default function Task({task, isDark, columns, setCurrentTask}) {

    const [showDetails, setShowDetails] = useState(false)
    const [showTaskEdit, setShowTaskEdit] = useState(false)
    const [hoverColor, setHoverColor] = useState(false)
    const [showDeleteWindow, setShowDeleteWindow] = useState(false)
    const deleteDescription = `Are you sure you want to delete the ${task.name} task and its subtasks? This action cannot be reversed.`;
  return (
    <>
    <div onMouseOver={() => setHoverColor(true)} onMouseOut={() => setHoverColor(false)} onClick={() => setShowDetails(true)} className='w-[340px] break-words h-full mt-[35px] bg-primary text-secondary-content/70 rounded-lg shadow-md shadow-base-200 py-6 px-5 flex flex-col justify-center cursor-pointer'>
        <h3 className={`font-bold text-xl ${hoverColor ? 'text-secondary-content' : null}`}>{task.name}</h3>
        <p className='text-xs text-base-200 font-bold mt-2'>{task.subtasks.filter(subtask => subtask.completed).length} of {task.subtasks.length} {task.subtasks.length === 1 ? 'subtask' : 'subtasks'}</p>
    </div>
    {showDetails ? <TaskDetails task={task} isDark={isDark} setShowDetails={setShowDetails} showDetails={showDetails} columns={columns} setShowDeleteWindow={setShowDeleteWindow} setShowTaskEdit={setShowTaskEdit}  /> : null}
    {showDeleteWindow ? <DeleteTask task={task} isDark={isDark} description={deleteDescription} setShowDeleteWindow={setShowDeleteWindow} /> : null}
    {showTaskEdit ? <EditTaskDetails task={task} isDark={isDark} setShowTaskEdit={setShowTaskEdit} columns={columns} setCurrentTask={setCurrentTask} /> : null}
    </>
  )
}
