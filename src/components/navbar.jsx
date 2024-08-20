import React from 'react'

const Navbar = ({title}) => {
  return (
    <div className='flex justify-center p-3 bg-blue-50 shadow-sm shadow-blue-100  border border-b-blue-200 rounded-sm  text-blue-900 font-semibold text'>Online Test - {title}</div>
  )
}

export default Navbar