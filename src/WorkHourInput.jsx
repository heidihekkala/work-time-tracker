import { useState } from "react";
import ExportToExcel from "./ExportToExcel";
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
  text-align: center;
  margin-bottom: 1em;
  padding: 0.75em;
  font-size: 1.3em;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 80%;
  text-align: center;
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

//const Result = styled.p`
  //font-size: 1.2em;
  //color: #333;
  //margin-top: 0.5em;
//`;

const EntryList = styled.div`
  margin-top: 2em;
`;

const EntryItem = styled.div`
  background-color: #f5f5f5;
  padding: 1em;
  margin: 0.5em 0;
  border-radius: 5px;
`;

function TimeTracker() {
  const [entries, setEntries] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [employer, setEmployer] = useState('A');
  const [error, setError] = useState("");
  const [selectedEntry, setSelectedEntry] = useState(null);

  const addStartTime = () => {
    if (!startTime) {
      setError("Syötä aloitusaika.");
      return;
    }

    const newEntry = {
      id: Date.now(),
      employer,
      startTime,
      endTime: null
    };

    setEntries([...entries, newEntry]);
    setStartTime('');
    setError('');
  };

  const addEndTime = () => {
    if (!selectedEntry) {
      setError("Valitse työsuoritus listalta.");
      return;
    }
    if (!endTime) {
      setError("Syötä lopetusaika.");
      return;
    }

    const startDate = new Date(selectedEntry.startTime);
    const endDate = new Date(endTime);

    if (endDate < startDate) {
      setError("Lopetusaika ei voi olla ennen aloitusaikaa.");
      return;
    }

    const timeDifference = endDate - startDate;
    const hours = timeDifference / (1000 * 60 * 60);

    const updatedEntries = entries.map(entry =>
      entry.id === selectedEntry.id
        ? { ...entry, endTime, hours: hours.toFixed(2) }
        : entry
    );

    setEntries(updatedEntries);
    setEndTime('');
    setSelectedEntry(null);
    setError('');
  };

  const incompleteEntries = entries.filter(entry => !entry.endTime);

  return (
    <Container>
      <H2>Työajan seuranta</H2>
      <TimeEntryContainer>
        <form>
          <label>Valitse työnantaja:
            <Select
              value={employer}
              onChange={(e) => setEmployer(e.target.value)}
            >
              <option value="A">Työnantaja A</option>
              <option value="B">Työnantaja B</option>
            </Select>
          </label>
          
          <div>
            <label>Aloitusaika:
              <Input 
                type="datetime-local" 
                step="900"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </label>
            <Button 
              variant="contained" 
              size="large" 
              onClick={addStartTime}
              style={{ backgroundColor: 'rgb(8, 100, 95)', marginBottom: '1em'}}
            >Tallenna aloitusaika
            </Button>
          </div>

          {incompleteEntries.length > 0 && (
            <div>
              <Select
                value={selectedEntry && selectedEntry.id ? selectedEntry.id : ''}
                onChange={(e) => setSelectedEntry(entries.find(entry => entry.id === parseInt(e.target.value)))}
              >
                <option value="">Valitse keskeneräinen merkintä</option>
                {incompleteEntries.map(entry => (
                  <option key={entry.id} value={entry.id}>
                    {entry.employer} - {new Date(entry.startTime).toLocaleString()}
                  </option>
                ))}
              </Select>

              <label>Lopetusaika:
                <Input 
                  type="datetime-local" 
                  step="900"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </label>
              <Button 
                variant="contained" 
                size="large" 
                onClick={addEndTime}
                style={{ backgroundColor: 'rgb(8, 100, 95)', marginBottom: '1em' }}
              >
                Tallenna lopetusaika
              </Button>
            </div>
          )}
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </form>
      </TimeEntryContainer>

      <EntryList>
        <h3>Tallennetut merkinnät:</h3>
        {entries.map(entry => (
          <EntryItem key={entry.id}>
            <p>Työnantaja: {entry.employer}</p>
            <p>Aloitus: {new Date(entry.startTime).toLocaleString()}</p>
            {entry.endTime && (
              <>
                <p>Lopetus: {new Date(entry.endTime).toLocaleString()}</p>
                <p>Tunnit: {entry.hours} h</p>
              </>
            )}
          </EntryItem>
        ))}
      </EntryList>
      <ExportToExcel entries={entries} />
    </Container>
  );
}

export default TimeTracker;