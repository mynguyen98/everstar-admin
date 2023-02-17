import React from 'react'

const NoSearchFound = ({ title }) => {
  return (
    <div style={{ width: '100%', textAlign: 'center', marginTop: '1.2rem' }}>
      <h5>No {title} were found!</h5>
    </div>
  )
}

export default NoSearchFound
