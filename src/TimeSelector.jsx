import { useState, useEffect } from "react";
import styled from "styled-components";

const TimeSelectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
  gap: 5px;
`;

const TimeSelect = styled.select`
  padding: 0.75em;
  font-size: 1em;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const DateInput = styled.input`
  padding: 0.75em;
  font-size: 1em;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-right: 5px;
`;

// Apufunktio päivämäärän formatointiin
function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const TimeSelector = ({ value, onChange, label }) => {
  // Parsitaan arvo tai käytetään nykyistä aikaa
  const now = new Date();
  const dateValue = value ? new Date(value) : now;
  
  // Erilliset tilat päivälle, tunnille ja minuutille
  const [date, setDate] = useState(value ? value.split("T")[0] : formatDate(dateValue));
  const [hour, setHour] = useState(
    value ? dateValue.getHours().toString().padStart(2, "0") : 
    dateValue.getHours().toString().padStart(2, "0")
  );
  const [minute, setMinute] = useState(
    value ? (Math.floor(dateValue.getMinutes() / 15) * 15).toString().padStart(2, "0") : 
    (Math.floor(dateValue.getMinutes() / 15) * 15).toString().padStart(2, "0")
  );

  // Päivitetään arvo kun jokin kentistä muuttuu
  useEffect(() => {
    if (date) {
      const newValue = `${date}T${hour}:${minute}:00`;
      onChange(newValue);
    }
  }, [date, hour, minute, onChange]);

  // Generoidaan tunnit (0-23)
  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i.toString().padStart(2, "0"));
  }

  // Minuutit 15 min välein (0, 15, 30, 45)
  const minutes = ["00", "15", "30", "45"];
  
  return (
    <div>
      <label>{label}:
        <TimeSelectContainer>
          <DateInput
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <TimeSelect value={hour} onChange={(e) => setHour(e.target.value)}>
            {hours.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </TimeSelect>
          :
          <TimeSelect value={minute} onChange={(e) => setMinute(e.target.value)}>
            {minutes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </TimeSelect>
        </TimeSelectContainer>
      </label>
    </div>
  );
};

export default TimeSelector;