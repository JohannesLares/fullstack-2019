import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
          {
            name: 'Reactin perusteet',
            exercises: 10
          },
          {
            name: 'Tiedonvälitys propseilla',
            exercises: 7
          },
          {
            name: 'Komponenttien tila',
            exercises: 14
          }
        ]
      }


  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
    return(
        <h1>
            {props.courseName}
        </h1>
    )
}

const Total = (props) => {
    var amount = 0
    props.parts.forEach(part => {
        amount += part.exercises;
    });
    return(
        <p>yhteensä {amount} tehtävää</p>
    )
}

const Content = (props) => {
    return (
        <div>
            {
                props.parts.map((part) => 
                    <Part part={part} />
                )
            }
        </div>
    )
}

const Part = (props) => {
    return (
        <p>{props.part.name} {props.part.exercises}</p>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))