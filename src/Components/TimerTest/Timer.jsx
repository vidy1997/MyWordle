import { useEffect, useState, useRef } from "react"

const Timer=()=>{
const [, forceUpdate] = useState(0);
const sec=useRef('00')
const min=useRef('00')
const hrs=useRef('00')

useEffect(()=>{
let seconds,minutes,hours=0;
setInterval(() => {

seconds=(parseInt(sec.current,10))
minutes=(parseInt(min.current,10))
hours= (parseInt(hrs.current,10))
if(seconds>59)
{
    seconds=0;
    minutes=minutes+1
}
else if(minutes>59)
{
    minutes=0
    hours=hours+1;

}
else
{
    seconds=seconds+1;
}

sec.current=seconds.toString().padStart(2,'0')
min.current=minutes.toString().padStart(2,'0')
hrs.current=hours.toString().padStart(2,'0')
forceUpdate(prev => prev + 1);
}, 1000)},[])





return(
    <>
    Time Starts: {`${hrs.current}:${min.current}:${sec.current}`}
    </>
)







}

export default Timer