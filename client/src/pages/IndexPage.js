import React from 'react'
import Post from '../Post'
import Headline from '../Headline'

const IndexPage = () => {
  return (
    <>
      <Headline />
      <div className='blogGrid'> 
        <Post />
        <Post />
        <Post /> 
        <Post />  
        <Post />
        <Post />
        <Post />
        <Post />
        <Post /> 
      </div>
    </>
  )
}

export default IndexPage