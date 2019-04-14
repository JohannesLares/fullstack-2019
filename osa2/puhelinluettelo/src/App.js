import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
        console.log(response)
        setPersons(response.data)
    })
    return;
  },[])
  
  const handleChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    var copy = [...persons];
    copy.push({ name: newName, number: newNumber });
    for(var person of persons){
      if(newName === person.name) {
        alert(`${newName} on jo listalla`)
        return;
      }
    }
    setPersons(copy)
  }

  const doSearch = event => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <SearchBox oldValue={search} changeValue={doSearch} />
      <h3>Lisää uusi</h3>
      <Form 
        newName={newName} 
        handleChange={handleChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
        handleSubmit={handleSubmit}
      />
      <h2>Numerot</h2>
      <Persons persons={persons} search={search} />
    </div>
  )

}

const Form = ({newName, handleChange, handleNumberChange, newNumber, handleSubmit}) => {
  return(
    <form>
        <div>
          nimi: <input value={newName} onChange={handleChange} />
          numero: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit} >lisää</button>
        </div>
      </form>
  )
}

const SearchBox = ({oldValue, changeValue}) => {
  return(<p>Rajaa näytettäviä: <input value={oldValue} onChange={changeValue} /></p>)
}

const Persons = ({persons, search}) => {
  return(
    persons.map((person, key) => {
      if(search === "" || person.name.toLowerCase().includes(search.toLowerCase()) || person.number.includes(search)){
        return(<p key={key}>{person.name} {person.number}</p>)
      }
      return ""
    })
  )
}

export default App