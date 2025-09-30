import './Style/Test.css'

import { Link } from 'react-router-dom'

<div className='list'>
  <a href='https://www.indiabix.com/computer-science/computer-fundamentals/'>
    <p className='test-para'>Second Year</p>
  </a>
  <br /><hr />

  <Link to='/exam'>
    <p className='test-para'>Third Year</p>
  </Link>
  <br /><hr />

  <a href='#'>
    <p className='test-para'>Final Year</p>
  </a>
  <br />
</div>
