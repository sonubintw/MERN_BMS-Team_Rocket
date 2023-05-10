import { useState } from 'react'
import {React} from 'react'


//props getting destructured from app.js
function MovieSeats({seatData,isSubmit,setisSubmit}) {

  const noOfSeats=['A1','A2','A3','A4','D1','D2'] //seat number
  
  const [valueInp,setValueInp]=useState("") //useState for getting updated value

   const onChange=(event,elem)=>{
     //seats data from input are collected here
     const seats=({
       seatType:elem,
       seatNo:Number(event.target.value)
      })

      seatData(seats)
      setValueInp(event.target.value)
      setisSubmit(true)
      // console.log(isSubmit)
        
   }
 
   return (
    <div className='d-flex flex-wrap ms-4 seats'>
  <h3 className="text-center mb-1 w-100 fw-bold">Seats</h3>
  {/* //seats data for seats */}
  {noOfSeats.map((elem, i) => {
    return (
      <div className='d-flex flex-wrap gap-5' key={i + 2} style={{flexBasis: '16.666%', marginBottom: '1rem'}}>
        <label htmlFor={`inputField${i}`} className="m-3 badge bg-danger fw-bold fs-4 text-wrap">{elem}</label>
        <input type="number" id={`inputField${i}`} min="0" max="10"  key={i} value={isSubmit ? valueInp[-1]:"" } onChange={(e) => onChange(e, elem)} className="form-control mb-3 px-2 py-1 " style={{width: '80px'}}/>
      </div>
    );
  })}
</div>
  )
}

export default MovieSeats