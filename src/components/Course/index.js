import {Link} from 'react-router-dom'
import './index.css'

const Course = props => {
  const {jobDetails} = props
  const {id, name, logoUrl} = jobDetails

  return (
    <li>
      <Link to={`/courses/${id}`}>
        <img src={logoUrl} alt={name} />
        <p>{name}</p>
      </Link>
    </li>
  )
}

export default Course
