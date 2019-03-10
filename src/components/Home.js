import React from 'react'
import { Link } from 'react-router-dom'

function Home () {
  return (
    <div className='home-container'>
      <ul className='popular-list'  >
        <li style={{ margin: '0 50px' }}>
          <h3>Github Battle: Battle with your friend!</h3>
          <Link className='button' to='/battle' >
            Battle
          </Link>
        </li>
        <li style={{ margin: '0 50px' }}>
          <h3>Most popular programming languages repositories!</h3>
          <Link className='button' to='/popular' >
            Popular Repos
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Home