import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css'

const AjanValinta = () => {
    const [value, onChange] = useState(new Date());

  return (
    <div>
      <h2>Valitse päivämäärä ja aika</h2>
      <DateTimePicker
        amPmAriaLabel="Select AM/PM"
        calendarAriaLabel="Toggle calendar"
        clearAriaLabel="Clear value"
        dayAriaLabel="Day"
        hourAriaLabel="Hour"
        minuteAriaLabel="Minute"
        maxDetail="minute"
        monthAriaLabel="Month"
        nativeInputAriaLabel="Date and time"
        onChange={onChange}
        secondAriaLabel="Second"
        value={value}
        yearAriaLabel="Year"
      />
    </div>
  );
};

export default AjanValinta;