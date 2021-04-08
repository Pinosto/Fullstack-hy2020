interface BmiValues {
    value1: number;
    value2: number;
}

export const parseArgumentsBmi = (args: Array<string>): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateBmi = (height: number, weight: number): string => {

    const bmi: number = weight / (height * height / 10000);

    if (bmi <= 18.5) {
        return 'Underweight';
    }
    if (bmi <= 23) {
        return 'Normal (healthy weight)';
    }
    return 'Overweight';

};

// try {
//     const { value1, value2 } = parseArgumentsBmi(process.argv);
//     console.log(calculateBmi(value1, value2));
// } catch (e) {
//     console.log('Error, something bad happened, message: ', e.message);
// }