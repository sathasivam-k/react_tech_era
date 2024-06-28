import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseDetails extends Component {
  state = {courseList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getData()
  }

  getFormattedData = data => ({
    description: data.course_details.description,
    id: data.course_details.id,
    imageUrl: data.course_details.image_url,
    name: data.course_details.name,
  })

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedList = this.getFormattedData(fetchedData)

      this.setState({
        courseList: updatedList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
    </div>
  )

  renderSuccess = () => {
    const {courseList} = this.state
    const {name, imageUrl, description} = courseList
    return (
      <div>
        <img src={imageUrl} alt={name} />
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
    )
  }

  renderAllProcess = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div>{this.renderAllProcess()}</div>
      </div>
    )
  }
}

export default CourseDetails
