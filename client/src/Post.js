import React from 'react'
import {formatISO9075, format} from "date-fns";

const Post = ({_id,title,summary,cover,content, createdAt}) => {
  return (
    // <div className='postCont'>
      <div className="post">
      <div className="image">
        <img src="https://images.pexels.com/photos/17502664/pexels-photo-17502664/free-photo-of-close-up-of-robot.jpeg?auto=compress&cs=tinysrgb&w=600" />
        {/* <img src={cover} /> */}
      </div>
      <div className="texts"> 
        <h2> {title} </h2>
        <p className="summary">{summary}</p>
      </div>
      <hr></hr>
      <p className="info"> 
        <span className="author"> Pj Snake </span>
        {/* <time> { formatISO9075(new Date(createdAt) ) } </time> */}
        <time> { format(new Date(createdAt), 'MMM d, yyyy' ) } </time>
      </p>
      <button className='readBtn'> Read </button>
    </div>
    // </div>
  )
}

export default Post