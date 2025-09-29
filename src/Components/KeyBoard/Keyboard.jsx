const Keyboard=({color})=>{
    const keys = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"]
      ];

    return(
        <>
         <div  className={`flex flex-col gap-2`}>      
             
        {keys.map((row ,idx)=>(
            
        
                    <div className={`flex gap-2 ${idx==1?"justify-center":""}`}>

                        {row.map((key)=>
                        (
                        <div key={key} className={`h-12 border border-gray-700 flex items-center justify-center font-bold text-xl uppercase bg-gray-200
                        ${key==="ENTER" ||key==="DELETE"||key==="SPACE"?"w-20":"w-12"  }`}>
                        {key}
                        </div> 
                        )

                        )}
                        </div>
         
        ))}
           </div>
        </>
    )


}

export default Keyboard