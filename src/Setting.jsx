import React, { useState, useEffect } from "react";
import "./Pomodoro.css";
function PomodoroTimer({workFunc,breakFunc,changeShowSetting,workTime,breakTime}) {
  return (
    <div className="settingPage">
        <label>Work Time:
            <input 
            value={workTime/60}
            placeholder="in minutes"
            onChange={(e)=>{workFunc(e.target.value*60)}}
            type="number"
            />
        </label>
        <label>Break Time:
            <input 
            value={breakTime/60}
            placeholder="in minutes"
            onChange={(e)=>{breakFunc(e.target.value*60)}}
            type="number"
            />
        </label>
        <button onClick={()=>{changeShowSetting()}}>Change</button>
        {
        (workTime === 1500 && breakTime === 300)&&
        <span>*recommended</span>
        }
    </div>
  );
}

export default PomodoroTimer;
