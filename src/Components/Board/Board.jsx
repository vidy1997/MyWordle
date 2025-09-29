import { createRef, useReducer, useRef, useState, useEffect } from "react";
import Tile from "../Tile/Tile";
import { colorEnum } from "../../utils/Enum";
const Board=({size,mode, boardData})=>{

let todaysWordle="SCONE";
todaysWordle=todaysWordle.split('')
const [showResult,setShowResult]=useState(false)
const [wordFormed,setWordFormed]= useState('')
const [colors,setColors]=useState([])
const [colorArray,setColorArray]=useState([])
const [message,setMessage]= useState('') 
const [guesses,setGuesses]=useState([])
const [disable,setDisable]=useState([])
const allrefs=useRef(Array.from({length:size.rows},()=>
Array.from({length:size.columns},()=> createRef() )))

const [show, setShow] = useState(false);
const letterColor=(rowIndex)=>{
    let newColors=[]
    let copytodaysWordle=[...todaysWordle]
    let copywordFormed=wordFormed.toUpperCase().split('')
    if (wordFormed.length===5)
   {

    copywordFormed.forEach( v => {     
      if(copytodaysWordle.includes(v))
        {
            if(copywordFormed.indexOf(v)==copytodaysWordle.indexOf(v)) 
              {
                copywordFormed=copytodaysWordle.slice(0,copywordFormed.indexOf(v))+copywordFormed.slice(copywordFormed.indexOf(v)+1,copywordFormed.length)
                copytodaysWordle=copytodaysWordle.slice(0,copytodaysWordle.indexOf(v))+copytodaysWordle.slice(copytodaysWordle.indexOf(v)+1,copytodaysWordle.length)
                newColors.push(colorEnum.GREEN)
              }
            else
              {
                newColors.push(colorEnum.YELLOW)
              }
        }
    else
    {
      newColors.push(colorEnum.GREY)
     

    }
    }); 

    setDisable((prev)=> 
  {  
    const disabled= [...prev]
    disabled[rowIndex]=Array(5).fill("disable")
    return disabled;
   }) 
    
     setColorArray((prev)=>
    
  {  const updated = [...prev];
    updated[rowIndex] = newColors; // write colors to the right row

  return updated;
   })
  } 

   
    //setColors((prev)=>({...prev, colorArray})) //( ) tells JS “this is an object literal” not a function block.{ ...prev, color } spreads all previous state values, then adds/overwrites color.
    
  }

  useEffect(()=>{
    console.log("value of colors array",colorArray)
    console.log("value of tiles disabled",disable)
    let allGreen=null
    allGreen = colorArray.some(row => row?.length === 5 && row.every(color => color === 'green'));

    if(allGreen || guesses.length===6)
    {
      // show modal and disable tiles

      setShowResult(true);

    }

  },[colorArray,guesses])

  useEffect(() => {
    if (message.length !== 0) {
      setShow(true);

      const timer = setTimeout(() => {
        setShow(false);
        setMessage('')
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
       const firstTile = allrefs.current[0][0]; // Reference to the first tile
    if (firstTile && firstTile.current) 
      {
      firstTile.current.focus();
      }
  }, []);

  // useEffect(()=>
  //   {
  //     const getPos=wordFormed.length-1;
  //     letterColor(wordFormed.charAt(getPos),getPos)
  //   },[wordFormed])

return(
    <>
    <div className="flex flex-col gap-2 items-center">
        {Array.from({length:size.rows}).map((_,rowIndex)=>(

            <div key={rowIndex}
            className="flex gap-2"
            >
                {Array.from({length:size.columns}).map((_,colIndex)=>(

                    <Tile key={`${rowIndex}-${colIndex}`}     
                   color={colorArray?.[rowIndex]?.[colIndex]}
                   letterColor={colorArray?.[rowIndex]?.[colIndex] !== undefined ? "white" : "black"}
                   disabled={disable?.[rowIndex]?.[colIndex]}
                    ref={allrefs.current[rowIndex][colIndex]} 
                    position={[rowIndex,colIndex]}
                    moveNext={()=>{const nextIndex=colIndex+1
                        if(nextIndex<=size.columns)
                           {
                            setWordFormed(prev => prev + (allrefs.current[rowIndex][colIndex]?.current?.value || ''));
                            if(nextIndex!=size.columns)
                            { const nextRef = allrefs.current?.[rowIndex]?.[nextIndex]
                            nextRef?.current?.focus();}                           
                        }
                        
                    }}
                 
                    wordFormed={wordFormed}
                    onEnter={() => {
                        if (wordFormed.length < 5) {
                        setMessage('Min 5 letters!');
                        } 
                        else {
                        letterColor(rowIndex)
                        setGuesses((prev)=>[...prev,wordFormed])
                        setMessage('');
                        const nextIndex=colIndex+1
                        if(nextIndex==size.columns)
                           {
                            setWordFormed('');
                            const nextRef = allrefs.current?.[rowIndex+1]?.[0]
                            nextRef?.current?.focus();
                           
                        }
                        }
                    }}

                    onBksp={()=>
                      {
                       {  
                          if(allrefs.current[rowIndex][colIndex]?.current?.value==='')
                          { setWordFormed(prev => prev.slice(0,colIndex-1 ));
                            const backIndex=colIndex-1
                            const nextRef=allrefs.current?.[rowIndex]?.[backIndex]
                            nextRef?.current?.focus()
                          }
                          
                        }
                      }
                    }
                    />
                ))}

            </div>
        ))}

    </div>
    {show &&
 <div
      className="modal show"
      style={{ display: 'block', position: 'fixed ',zIndex:1000 }}
    >
      <Modal.Dialog>


        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>


      </Modal.Dialog>
    </div>

    }

    {showResult &&
  
 <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black/50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Yay! Congratulations!!
                </h3>
                <button
                  type="button"
                  onClick={() => setShowResult(false)}
                  className="text-gray-400 bg-transparent hover:bg-black hover:text-red-700 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center "
                >
                  X
                </button>
              </div>

              {/* Body */}
              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-black dark:text-gray-400 font-robotoCondensed ">
                  Want to start tracking your stats and streaks?
                </p>
                <button
                  type="button"
                  onClick={() => setShowResult(false)}
                  className="text-black font-bold bg-transparent  hover:bg-black hover:text-red-700 rounded-lg inline-flex justify-center items-center "
                >
                  Create a Free Account
                </button>
              </div>

              {/* Footer */}
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                
              </div>
            </div>
          </div>
        </div>




}
    </>
)

};

export default Board;