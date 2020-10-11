import express from 'express';
import bodyParser from 'body-parser';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    if ( typeof req.query.weight !== "number" || typeof req.query.height !== "number" ) {
        res.status(400).json({error: "mallformed parameters"});
        return;
    }
    const bmi = calculateBmi(height, weight);
    res.json({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body;
    if ( daily_exercises === undefined || target === undefined ) {
        res.status(400).json({error: "parameters missing"});
        return;
    } 
    if ( typeof target !== "number" || !Array.isArray(daily_exercises) || typeof daily_exercises[0] !== "number" ) {
        res.status(400).json({error: "malformatted parameters"});
        return;
    }
    const exerc = calculateExercises(daily_exercises, target);
    res.send(exerc);
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});