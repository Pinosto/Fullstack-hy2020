import express from 'express';
const app = express();
app.use(express.json());
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    if (Number(req.query.height) && Number(req.query.weight)) {
        const weight = Number(req.query.weight);
        const height = Number(req.query.height);
        const bmi = calculateBmi(Number(req.query.height), Number(req.query.weight));
        return res.send({ weight, height, bmi });
    } else {
        return res.status(400).send({ error: "malformatted parameters" });
    }
});

app.post('/exercises', (req, res) => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    const { target, daily_exercises }: any = req.body;

    if (!target || !daily_exercises) {
        return res.status(400).send({ error: "parameters missing" });
    }

    if (isNaN(target) || (daily_exercises as []).some((hours) => isNaN(hours))) {
        return res.status(400).send({ error: "parameters not a number" });
    }
    return res.send(exerciseCalculator(daily_exercises, target));
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});