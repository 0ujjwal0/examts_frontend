import React from 'react'
import { useNavigate } from 'react-router-dom';

const Thankyou = () => {
    const navigate= useNavigate();
    const handleClick=()=>{
      navigate('/');
    }
    const handleLogout=()=>{
        localStorage.removeItem("userData")
        const user=localStorage.getItem('userData')
        if(!user){
            navigate('/');
        }
    }
  return (
    <>
      <div>Thankyou for attempting the test we will reach out to you soon on your registered email!</div>
      <button onClick={handleClick}>home</button>
      <button onClick={handleLogout}>logout</button>
    </>
  );
}

export default Thankyou