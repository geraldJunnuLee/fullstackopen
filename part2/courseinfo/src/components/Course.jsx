import Header from './Header'
import Content from './Content'

const Course = ({ course }) => {
  const numberOfExercises = course.parts.reduce(
    (accumulator, currentPart) => accumulator + currentPart.exercises,
    0
  )

  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <div style={{ fontWeight: 'bold' }}>
        total of {numberOfExercises} exercises
      </div>
    </div>
  )
}

export default Course
