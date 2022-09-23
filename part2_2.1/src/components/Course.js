import React from 'react';

const Header = ({ header }) => <h1>{header}</h1>;

const Content = ({ parts }) => {
//   console.log("Content: ", parts);
  return (
    <div>
      {parts.map((part) => <Part key={part.id}  part={part}/>)}
    </div>
  )
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>;

const Total = ({ parts }) => {
//   console.log("Total: ", parts);

  // const total = parts.reduce((prev, cur) => prev + cur.exercises, 0);
  // console.log(total);
  return (
    <p>
      <b>
        Total of {parts.reduce((prev, cur) => prev + cur.exercises, 0)} exercises
      </b>
    </p>
  )
}

const Course = ({ courses }) => {
//   console.log("Course", courses);
  return (
    courses.map((course) => {
      return (
        <div key={course.id}>
          <Header header={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )
    })
  )
}

export default Course;