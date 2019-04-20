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
    update()
    return;
  },[])
  
  const update = () => {
    dbService.getPersons()
      .then(response => {
        console.log(response)
        setPersons(response.data)
      })
  }

  const handleChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    var newPerson = { name: newName, number: newNumber }
    for(var person of persons){
      if(newName === person.name) {
        dbService.updatePerson(person.id,  {name: newName, number: newNumber}).then(resp => {
          update()
          doAlert(`Päivitettiin henkilön ${newName} numero muotoon ${newNumber}`)
        }).catch(error => {
          setErrorMessage({message: error.error, type: "error"})
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        return;
      }
    }
    console.log(newPerson)
    dbService.createPerson(newPerson)
      .then((response) => {
        update()
        setErrorMessage({message: `Lisättiin ${newName} numerolla ${newNumber}`, type: "success"})
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }).catch(error => {
        console.log(error.response.data.error)
        setErrorMessage({message: error.response.data.error, type: "error"})
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
      <Persons persons={persons} search={search} doAlert={doAlert} update={update} />
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

const Persons = ({persons, search, doAlert, update}) => {
  const remove = id => {
    var pers = {}
    console.log(persons)
    persons.forEach(person => {
      if(person.id === id) pers = person
    })
    if(window.confirm(`Poistetaanko ${pers.name}`)){
      dbService.deletePerson(id).then(resp => {
        update()
        doAlert(`Poistettiin käyttäjä ${pers.name}`)
      })
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