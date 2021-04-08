interface trainingInput {
    value1: number[];
    value2: number;
}

interface trainingResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const parseArgumentsTraining = (args: Array<string>): trainingInput => {
    if (args.length < 4) throw new Error('Not enough arguments');

    if (isNaN(Number(args[2]))) {
        throw new Error('Provided values were not numbers!');
    }

    const workouts: number[] = [];
    for (const number of args.slice(3)) {
        if (!isNaN(Number(number))) {
            workouts.push(Number(number));
        } else {
            throw new Error('Provided values were not numbers!');
        }
    }

    return {
        value1: workouts,
        value2: Number(args[2])
    };
};

export const exerciseCalculator = (workouts: Array<number>, target: number): trainingResult => {
    const periodLength: number = workouts.length;
    const trainingDays: number = workouts.filter(w => w !== 0).length;
    const average: number = workouts.reduce((a, b) => a + b, 0) / periodLength;
    const success: boolean = target <= average;
    const rating: number = success ? 3 : target / 2 <= average ? 2 : 1;
    const ratingDescription: string = rating === 3 ? 'great' : rating === 2 ? 'not too bad but could be better' : 'The only bad workout is the one that didn’t happen';
    return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
};



// try {
//     const { value1, value2 } = parseArgumentsTraining(process.argv);
//     console.log(exerciseCalculator(value1, value2))
// } catch (e) {
//     console.log('Error, something bad happened, message: ', e.message);
// }