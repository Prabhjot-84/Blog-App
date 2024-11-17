import React from 'react'
import {format} from "date-fns";
import { Link } from 'react-router-dom';

const Post = ({_id,title,summary,content,author,createdAt}) => {
  
  return (
    // <div className='postCont'>
      <div className="post">

      <div className="image">
        <Link to={`/post/${_id}`}>
          {/* <img src="https://images.pexels.com/photos/17502664/pexels-photo-17502664/free-photo-of-close-up-of-robot.jpeg?auto=compress&cs=tinysrgb&w=600" /> */}
          <img alt='cover' src={`https://picsum.photos/seed/${title}/1600/900`} />
        </Link>
      </div>

      <div className="texts"> 
        <Link to={`/post/${_id}`}>
          <h2> {title} </h2>
        </Link>
        <p className="summary">{summary}</p>
      </div>

      <hr></hr>

      <p className="info"> 
        <span className="author"> {author.username} </span>  
        {/* <time> { formatISO9075(new Date(createdAt) ) } </time> */}
        <time> { format(new Date(createdAt), 'MMM d, yyyy' ) } </time>
      </p>
 
      <Link to={`/post/${_id}`} className='readBtnLink'>
        <button className='readBtn'> Read </button>
      </Link>
      
    </div>
    // </div>
  )
}
   
export default Post