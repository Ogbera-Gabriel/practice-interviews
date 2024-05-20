import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./digital.css";

export default function Clock() {
    const [time, setTime] = useState({
        hours: "00",
        minutes: "00",
        seconds: "00",
    });
    useEffect(() => {
      const id = setInterval(() => {
        const date = new Date();
        setTime({
         hours: String(date.getHours()).padStart(2, '0'),
         minutes: String(date.getMinutes()).padStart(2, "0"),
         seconds: String(date.getSeconds()).padStart(2, "0"),
        })
        
      }, 1000)
      return () => clearInterval(id)
    }, [])

    return (
        <div>
         <h2>Digital Clock</h2>
        <div className="digital-clock">
           {time.hours}:{time.minutes}:{time.seconds}
        </div>
        <div style={{marginTop: "10px"}}>
            <Link to="/">HomePage</Link>
        </div>
        </div>
    )
}