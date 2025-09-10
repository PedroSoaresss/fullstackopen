import React from 'react';

function Course({ course }) {
  return (
    <div>
      <h2>{course.name}</h2>
      <ul>
        {course.parts.map(part => (
          <li key={part.id}>
            {part.name} {part.exercises}
          </li>
        ))}
      </ul>
      <strong>Total of exercises: {course.parts.reduce((sum, part) => sum + part.exercises, 0)}</strong>
    </div>
  );
}

export default Course;
