import React from 'react'

export default function AddColumn({addColumn}) {
  return (
    <button onClick={addColumn} className='mt-4 text-primary font-bold bg-base-300 hover:bg-base-300/80 active:scale-95 py-3 rounded-full text-sm'>+ Add New Column</button>
  )
}
