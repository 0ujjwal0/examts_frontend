import React from 'react'
import { useNavigate } from 'react-router-dom';

const Thankyou = () => {
  const navigate=useNavigate();
  const handleClick=()=>{
    navigate('/');
  }
  return (
    <div className=" h-screen flex justify-center items-center">
      <div className="bg-violet-100 h-1/2 w-2/3 p-4 text-2xl font-serif font-semibold text-gray-700 rounded-3xl border-2 border-violet-300 flex flex-col justify-between items-center">
        <div>
          Thankyou for attempting the test we will reach out to you soon on your
          registered email!
        </div>
        <div className='rounded-full border-2 border-green-600 p-4'>
          <img
            width="80"
            height="80"
            src="https://img.icons8.com/officel/40/000000/checkmark--v1.png"
            alt="checkmark--v1"
          />
        </div>
        <div>
          <div className='text-xl'>You can go back to home page to give more tests!!</div>
          <div className="flex justify-center">
            <button
              className="border-2 border-blue-800 rounded-lg px-3 mt-3 text-violet-600 hover:bg-violet-600 hover:text-white"
              onClick={handleClick}
            >
              home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thankyou