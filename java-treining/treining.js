const App = () => {
  const course = 'Desenvolvimento de aplicação Half Stack'
  const part1 = {
    name: 'Fundamentos da biblioteca React',
    exercises: 10
  }
  const part2 = {
    name: 'Usando props para passar dados',
    exercises: 7
  }
  const part3 = {
    name: 'Estado de um componente',
    exercises: 14
  }

  return (
    <div>
      <h1>{course}</h1>
      <h2>{part1.name}</h2>
      <p>Exercícios: {part1.exercises}</p>
      <h2>{part2.name}</h2>
      <p>Exercícios: {part2.exercises}</p>
      <h2>{part3.name}</h2>
      <p>Exercícios: {part3.exercises}</p>
    </div>
  )
}

export default App