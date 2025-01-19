import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import styled from "styled-components";
import Button from '@mui/material/Button';
//import AjanValinta from "./SetDateTime";

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
  font-size: 1em;
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

function TimeTracker() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  //const [workHours, setWorkHours] = useState(null);

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

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
              type="time" 
              value={startTime} 
              onChange={handleStartTimeChange} 
            />
          </label>
          <label>Lopetusaika:
            <Input 
              type="time" 
              value={endTime} 
              onChange={handleEndTimeChange} 
            />
          </label>
        </form>
      </TimeEntryContainer>
      <Button variant="contained" size="large" style={{
        backgroundColor: 'rgb(8, 100, 95)'}}>Lisää tunnit</Button>
    </Container>
  );}
  
  export default TimeTracker;
  