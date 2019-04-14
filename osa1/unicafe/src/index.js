import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
        <Header text="anna palautetta" />
        <Buttons good={() => setGood(good+1)} bad={() => setBad(bad+1)} neutral={() => setNeutral(neutral+1)} />
        <Header text="Statistiikka" />
        {(good !== 0 || neutral !== 0 || bad !== 0) ? ( 
                <Statistics stat={[good, neutral, bad]} />
            ):(
                <p>Ei yhtään palautetta</p>
            )
        }
    </div>
  )
}

const Header = ({text}) => {
    return <h1>{text}</h1>
}

const Buttons = ({good, bad, neutral}) => {
    return (
        <div>
            <Button action={good} text="Hyvä" />
            <Button action={neutral} text="Neutraali" />
            <Button action={bad} text="Huono" />
        </div>
    )
}

const Button = ({action, text}) => {
    return <button onClick={action}>{text}</button>
}

const Statistics = ({stat}) => {
    const sum = stat[0] + stat[1] + stat[2];
    const calculate = () => {
        return (stat[0] - stat[2]) / sum;
    }

    return(
        <table>
            <tbody>
                <Statistic text="Hyvä" value={stat[0]} />
                <Statistic text="Neutraali" value={stat[1]} />
                <Statistic text="Huono" value={stat[2]} />
                <Statistic text="Yhteensä" value={sum} />
                <Statistic text="Keskiarvo" value={calculate()} />
                <Statistic text="Positiivisia" value={stat[0]/sum*100 + "%"} />
            </tbody>
        </table>
    )
}

const Statistic = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)