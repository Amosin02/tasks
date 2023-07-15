const Course = ({ course }) => {
    const CourseLine = ({ title, num }) => {
        return(
          <p>{title} {num}</p>
        )
      }    
      
      const TotalLine = ({ arr, ind }) => {
        const all = arr[ind].parts.reduce((sum, part) => {
          return sum + part.exercises
        }, 0)
      
        return(
          <strong>total of {all} exercises</strong>
        )
      }
      
      const TitleLine = ({ arr, ind }) => {
        return(
          <h2>{arr[ind].name}</h2>
        )
      }

    const copy = course

    function courseLine(index) {
        const line = copy[index].parts.map(part =>
        <CourseLine key={part.id} title={part.name} num={part.exercises} />
        )
        return line
    }

    return(
        <div>
        
        <h1>Web development curriculum</h1>

        <TitleLine arr={copy} ind={0} />
        {courseLine(0)}
        <TotalLine arr={copy} ind={0} />

        <TitleLine arr={copy} ind={1} />
        {courseLine(1)}
        <TotalLine arr={copy} ind={1} />

        </div>
    )
}

export default Course