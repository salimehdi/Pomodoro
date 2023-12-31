import PomodoroTimer from "./Pomodoro"
import {FaRegSun} from "react-icons/fa";
import Setting from "./Setting"
import {useState} from "react"
import "./App.css";
function App() {
const [showSetting,setShowSetting] = useState(false);
const [workTime, setWorkTime] = useState(1500); // 25 minutes in seconds default
const [breakTime, setBreakTime] = useState(300); // 5 minutes break in seconds default
  return (
    <>
    <div className="settings" onClick={()=>{setShowSetting(!showSetting)}}><FaRegSun/></div>
    <div className="heading"> <span>Pomodoro Timer !</span> </div>
    {
      (showSetting)
      ?<Setting workFunc={(workTime)=>setWorkTime(workTime)} breakFunc={(breakTime)=>setBreakTime(breakTime)} changeShowSetting={()=>setShowSetting(!showSetting)} workTime={workTime} breakTime={breakTime}/>
      :<PomodoroTimer workTime={workTime} breakTime={breakTime} />
    }
    </>
  )
}

export default App
