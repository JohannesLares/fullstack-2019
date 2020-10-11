interface excerciseValues {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface argValues {
    target: number,
    days: number[]
}

export const calculateExercises = (days: number[], target: number): excerciseValues => {
    const sum: number = days.reduce((a, b) => a+b, 0);
    const trainingDayArr: number[] = days.filter(a => a !== 0);

    const periodLength = days.length;
    const trainingDays = trainingDayArr.length;
    const success = (sum/days.length) >= target;
    let rating;
    let ratingDescription;
    const average = sum/days.length;
    if (average - target < -1) {
        rating = 1;
        ratingDescription = 'You should exercise more!';
    } else if ( average - target > 1) {
        rating = 3;
        ratingDescription = 'Excellent, keep on going';
    } else {
        rating = 2;
        ratingDescription = 'Nice work. You could still do better.';
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

const parseArgs = (args: string[]): argValues => {
    const target = Number(args[2]);
    const days: number[] = [];
    for ( let i = 0; i < args.length; i++ ) {
        if (i < 3) continue;
        days.push(Number(args[i]));
    }
    return {
        target,
        days
    };
};

const { target, days } = parseArgs(process.argv);
console.log(calculateExercises(days, target));