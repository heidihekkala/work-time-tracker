//import React from 'react';
//import { useForm } from 'react-hook-form';

function TyöAjanSeuranta() {
    return (
      <div>
        <h2>Työajan seuranta:</h2>
        <form>
          <label htmlFor="työnantaja">Valitse työnantaja:</label>
            <select id="työnantaja" name="työnantaja">
              <option value="A">Työnantaja A</option>
              <option value="B">Työnantaja B</option>
            </select>
        </form>
      </div>
  );}
  
  export default TyöAjanSeuranta;
  