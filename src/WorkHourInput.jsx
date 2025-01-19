import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import styled from "styled-components";
import Button from '@mui/material/Button';


const Container = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: white;
  border-radius: 6px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 2em auto;
  padding: 1em 1em 2em;
`;

const H2 = styled.div`
  font-size: 2.5em;
`;

const TimeEntryContainer = styled.div`
  max-width: 500px;
  margin: 1em auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  background-color: lightgrey;
  display: flex;         
  justify-content: center;
`;

const Input = styled.input`
  width: 80%;
  text-align:center;
  margin-bottom: 1em;
  padding: 0.75em;
  font-size: 1.3em;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 80%;
  text-align:center;
  margin-bottom: 1em;
  padding: 0.75em;
  font-size: 1em;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
  margin-top: -0.5em;
`;

const Result = styled.p`
  font-size: 1.2em;
  color: #333;
  margin-top: 0.5em;
`;

function TimeTracker() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [workHours, setWorkHours] = useState(null);
  const [error, setError] = useState("");
  //const [timeEntries, setTimeEntries] = useState([]);

  const calculateTime = () => {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    if (!startDate || !endDate) {
      setError("Täytä molemmat ajat.");
      setWorkHours(null);
      return;
    } 

    const timeDifference = endDate - startDate;

    if (timeDifference < 0) {
      setError("Lopetusaika ei voi olla ennen aloitusaikaa.");
      setWorkHours(null);
      return;
    }

    // Muutetaan millisekunnit tunneiksi ja minuuteiksi
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    setWorkHours(`Työtunnit: ${hours} tuntia ja ${minutes} minuuttia`);
  }

  return (
    <Container>
      <H2>Työajan seuranta:</H2>
      <TimeEntryContainer>
        <form>
          <label>Valitse työnantaja:
            <Select name="työnantaja">
              <option value="A">Työnantaja A</option>
              <option value="B">Työnantaja B</option>
            </Select>
          </label>
          <label>Aloitusaika:
            <Input 
              type="datetime-local" 
              value={startTime}  
              onChange={(event) => setStartTime(event.target.value)}
            />
          </label>
          <label>Lopetusaika:
            <Input 
              type="datetime-local" 
              value={endTime}  
              onChange={(event) => setEndTime(event.target.value)}
            />
          </label>
          <Button variant="contained" size="large" onClick={calculateTime} style={{
            backgroundColor: 'rgb(8, 100, 95)'}}>Lisää tunnit</Button>
        </form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {workHours !== null && !error && <Result>{workHours}</Result>}
      </TimeEntryContainer>
    </Container>
  );
}


export default TimeTracker;
  