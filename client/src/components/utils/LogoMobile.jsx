import React, { useContext } from 'react'
import { ThemeContext } from '../../App'

export default function LogoMobile() {
  const [theme,setTheme] = useContext(ThemeContext)
  return (
    <div className='flex items-center'>
    { theme === 'dark'  ?
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"  viewBox="0 0 803.75 794.39">

<rect x="0" y="0" width="100%" height="100%" fill="#ffffff"/>
<g transform="matrix(4.9357 0 0 4.9357 500.0016 500.0015)" id="289180">
</g>
</svg>:
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 803.75 794.39">

<rect x="0" y="0" width="100%" height="100%" fill="#ffffff"/>
<g transform="matrix(4.9357 0 0 4.9357 500.0016 500.0015)" id="289180">
</g>
</svg>
    }
    </div>
  )
}
