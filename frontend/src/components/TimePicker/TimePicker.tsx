import React from 'react'
import "./TimePicker.scss"

interface props {
  labels: string[];
  value: number;
  onChange: (value: number) => void;
}

const TimePicker = (props: props) => {
  return (
    <div className='time-picker-box'>
      {props.labels.map((item, index) => {
        return (
          <button
            className={`time-picker-button ${index === props.value ? 'selected' : ''}`}
            key={index}
          >
            <div className={`time-picker-button-name`}>{item}</div>
          </button>
        )
      })
      }
    </div>
  )
}

export default TimePicker