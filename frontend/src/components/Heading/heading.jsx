import React from 'react'
const Heading = ({heading}) => {
   
  return (
    <>
        <div className="container">
            <div className="row">
                <h2 className='heading'>{heading}</h2>
            </div>
        </div>
    </>
  )
}

export default Heading