import { useState } from "react";



export default function Test() {
   const [count, setCount] = useState(0);
    
   function handleCount() {
     setCount((prev) => prev + 1);
   }

   return(
    <div>
      <p>The count is {count}</p>
      <button
       onClick={handleCount} 
      >
      Increase Count
      </button>
    </div>
   )
}
