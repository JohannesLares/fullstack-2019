export interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

export interface CourseDescription extends CoursePartBase {
    description: string;
  }

export interface CoursePartOne extends CourseDescription {
    name: "Fundamentals";
  }

export interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }

export interface CoursePartThree extends CourseDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
  }

export interface CoursePartFour extends CourseDescription {
    name: "Not today my friend";
    isThisReal: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;