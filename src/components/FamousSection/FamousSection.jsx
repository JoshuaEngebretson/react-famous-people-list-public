import React, { useState, useEffect } from 'react';
import './FamousSection.css';
import axios from 'axios';

function FamousSection() {
  let [famousPersonName, setPersonName] = useState('');
  let [famousPersonRole, setPersonRole] = useState('');
  let [famousPeopleArray, setPeopleArray] = useState([]);

  // TODO: on load, call the fetchPeople() function
  useEffect(() => {
    fetchPeople();
  }, [])

  const fetchPeople = () => {
    // TODO: fetch the list of people from the server
    console.log('inside fetchPeople');
    axios({
      method: 'GET',
      url: '/people'
    }).then((response) => {
      setPeopleArray(response.data)
      console.log(response.data);
      console.log('GET /people accomplished');
    }).catch((error) => {
      console.log('The axios GET request failed within fetchPeople. Error:', error);
    })
  }

  const addPerson = (evt) => {
    evt.preventDefault();
    console.log(`The person is ${famousPersonName} and they're famous for ${famousPersonRole}`);
    
    // TODO: create POST request to add this new person to the database
    axios({
      method: 'POST',
      url: '/people',
      data: {
        name: famousPersonName,
        role: famousPersonRole
      }
    }).then((reponse) => {
      fetchPeople();

    }).catch((error) => {

    })

    // HINT: the server is expecting a person object 
    //       with a `name` and a `role` property
  
  }

    return (
      <section className="new-person-section">
        <form onSubmit={addPerson}>
          <label htmlFor="name-input">Name:</label>
          <input 
            id="name-input"
            onChange={e => setPersonName(e.target.value)}
          />
          <label htmlFor="role-input">Famous for:</label>
          <input 
            id="role-input"
            onChange={e => setPersonRole(e.target.value)}
          />
          <button type="submit">Done</button>
        </form>
        <p>
          {famousPersonName} is famous for "{famousPersonRole}".
        </p>
        <ul>
          {/* TODO: Render the list of famous people */}
          {
            famousPeopleArray.map((person) => {
              return <li key={person.id}>{person.name} is famous for "{person.role}".</li>
            })
          }
        </ul>
      </section>
    );
}

export default FamousSection;
