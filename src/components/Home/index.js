import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Course from '../Course'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstants.initial, jobList: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedList = fetchedData.courses.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        logoUrl: eachItem.logo_url,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobList: updatedList,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className='products-loader-container' data-testid='loader'>
      <Loader type='ThreeDots' color='#0b69ff' height='50' width='50' />
    </div>
  )

  renderFailure = () => (
    <div>
      <img
        src='https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png'
        alt='failure view'
      />
      <h1>OOPS! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <div>
        <button type='button' onClick={this.getData()}>
          Retry
        </button>
      </div>
    </div>
  )

  renderSuccess = () => {
    const {jobList} = this.state
    return (
      <ul>
        {jobList.map(eachItem => (
          <Course key={eachItem.id} jobDetails={eachItem} />
        ))}
      </ul>
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
        <div>
          <h1>Courses</h1>
          {this.renderAllProcess()}
        </div>
      </div>
    )
  }
}

export default Home
