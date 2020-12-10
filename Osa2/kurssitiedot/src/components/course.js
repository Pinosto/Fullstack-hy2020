import React from 'react'


const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce((sum, value) => sum + value.exercises, 0);
    return (
      <h3>Number of exercises {sum}</h3>
    )
  }
  
  const Part = ({ id, name, exercises }) => {
    return (
      <p>{name} {exercises}</p>
    )
  }
  
  const Content = ({ course }) => {
    return (
      <div>
        
          {course.parts.map(({ name, exercises, id }) =>
            <Part key={id} name={name} exercises={exercises} />
          )}
        
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }
  
  export default Course