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
  font-size: 1.2em;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-right: 5px;
`;

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const TimeSelector = ({ value, onChange, label }) => {
  const now = new Date();
  const dateValue = value ? new Date(value) : now;

  // Tila päivämäärälle, tunnille ja minuutille
  const [date, setDate] = useState(formatDate(dateValue));
  const [hour, setHour] = useState(dateValue.getHours().toString().padStart(2, "0"));
  const [minute, setMinute] = useState((Math.floor(dateValue.getMinutes() / 15) * 15).toString().padStart(2, "0"));

  // **TÄRKEÄ MUUTOS:** Kun `value` muuttuu, päivitetään tilat
  useEffect(() => {
    if (value) {
      const newDate = new Date(value);
      setDate(formatDate(newDate));
      setHour(newDate.getHours().toString().padStart(2, "0"));
      setMinute((Math.floor(newDate.getMinutes() / 15) * 15).toString().padStart(2, "0"));
    }
  }, [value]);

  // Päivitetään arvo, kun jokin kentistä muuttuu
  useEffect(() => {
    if (date) {
      const newValue = `${date}T${hour}:${minute}:00`;
      onChange(newValue);
    }
  }, [date, hour, minute, onChange]);

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
  const minutes = ["00", "15", "30", "45"];

  return (
    <div>
      <label>{label}:
        <TimeSelectContainer>
          <DateInput type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <TimeSelect value={hour} onChange={(e) => setHour(e.target.value)}>
            {hours.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </TimeSelect>
          :
          <TimeSelect value={minute} onChange={(e) => setMinute(e.target.value)}>
            {minutes.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </TimeSelect>
        </TimeSelectContainer>
      </label>
    </div>
  );
};

export default TimeSelector;
