   import { useState, forwardRef, useEffect } from "react";

   const Tile=forwardRef(({color,position,moveNext,wordFormed,onEnter,onBksp,letterColor,disabled}, ref)=>{
 
   const [letternew,setLetternew]= useState('')
   
   useEffect(() => {
  console.log("Word formed updated:", wordFormed);
  console.log("color of letter background",color)
      }, [wordFormed]);
      const handleChange=(e)=>{
      
      const val=e.target.value.toUpperCase().slice(0,1);
      setLetternew(val)
      if( val && moveNext)
         {
            moveNext()
         }
      }
   return(
      <>
      <div 
      style={{ backgroundColor: color=='yellow'?'#E0CD2B':color, border:color ? color=='yellow'? `2px solid #E0CD2B`:` 2px solid ${color}` :   `2px solid grey`}}   
      className={`w-15 h-15  flex items-center justify-center font-bold text-xl uppercase `}>
   <input
       ref={ref}
      type="text"
      maxLength={1}
      style={{color:letterColor}}
      className={`w-full h-full text-center bg-transparent outline-none`}
      value={letternew}
      disabled={disabled==="disable"}
      onChange={handleChange}
       onKeyDown={(event) => {
         console.log(event.key)
  if (event.key === 'Enter') {
     onEnter?.();
  }
  if (event.key === 'Backspace') {
     onBksp?.();
  }
  
}}
   />
      </div>
      </>
   )
   });

   export default Tile;