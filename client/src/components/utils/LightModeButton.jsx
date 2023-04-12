import React, { useContext } from 'react'
import { ThemeContext } from '../../App'

export default function LightModeButton({toggleSwitch}) {
  const[theme,setTheme] = useContext(ThemeContext)
  return (
    <div className={`relative flex items-center w-16 h-6 rounded-full bg-base-300`}>
    <label
      htmlFor='toggle'
      className='bg-base-300 w-16 h-6 flex items-center justify-start rounded-full transition-colors ease-in-out duration-300 cursor-pointer'
    >
      <div
        className={`${
          theme === 'dark' ? 'translate-x-10' : 'translate-x-0'
        } w-6 h-6 rounded-full bg-primary border border-base-300 transform transition-transform ease-in-out duration-300`}
      ></div>
    </label>
    <input
      id='toggle'
      type='checkbox'
      checked={theme==='dark'}
      onChange={toggleSwitch}
      className='hidden'
    />
  </div>
  )
}
