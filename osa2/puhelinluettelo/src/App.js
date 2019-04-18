import React, { useState, useEffect } from 'react'
import axios from 'axios'
import dbService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState({})

  useEffect(() => {
    dbService.getPersons()
      .then(response => {
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
    let copy = [...persons]
    var newPerson = { name: newName, number: newNumber, id: persons.length +1 }
    for(var person of persons){
      if(newName === person.name) {
        dbService.updatePerson(person.id,  {name: newName, number: newNumber}).then(
          doAlert(`Päivitettiin henkilön ${newName} numero muotoon ${newNumber}`)
        ).catch(error => {
          setErrorMessage({message: `Jotain meni vikaan`, type: "error"})
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        return;
      }
    }
    copy.push(newPerson)
    setPersons(copy)
    console.log(newPerson)
    dbService.createPerson(newPerson)
      .then((response) => {
        setErrorMessage({message: `Lisättiin ${newName} numerolla ${newNumber}`, type: "success"})
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const doSearch = event => {
    setSearch(event.target.value)
  }

  const doAlert = msg => {
    setErrorMessage({message: msg, type: "success"})
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification error={errorMessage} />
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
      <Persons persons={persons} search={search} doAlert={doAlert} />
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

const Persons = ({persons, search, doAlert}) => {
  const remove = id => {
    if(window.confirm(`Poistetaanko ${persons[id-1].name}`)){
      dbService.deletePerson(id)
      doAlert(`Poistettiin käyttäjä ${persons[id-1].name}`)
    }
  }

  return(
    persons.map((person, key) => {
      if(search === "" || person.name.toLowerCase().includes(search.toLowerCase()) || person.number.includes(search)){
        return(<p key={key}>{person.name} {person.number} <button onClick={()=>remove(person.id)} >Poista</button> </p>)
      }
      return ""
    })
  )
}

const Notification = ({ error }) => {
  if(error===null || error.message === null || error.type === null) return null;
  return(
    <div className={error.type}>{error.message}</div>
  )
}

export default App