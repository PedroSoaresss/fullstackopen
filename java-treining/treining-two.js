const App = () => {
  const course = "Desenvolvimento de aplicação Half Stack"
  const parts = [
    {
      name: "Fundamentos da biblioteca React",
      exercises: 10,
    },
    {
      name: "Usando props para passar dados",
      exercises: 7,
    },
    {
      name: "Estado de um componente",
      exercises: 14,
    },
  ]
  
  return (  
    <div>
      <h1>{course}</h1>
      {parts.map((part, index) => (
        <div key={index}>
          <h2>{part.name}</h2>
          <p>Exercícios: {part.exercises}</p>
        </div>
      ))}
    </div>
  )
}

export default App