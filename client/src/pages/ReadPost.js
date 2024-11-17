import '../ReadPost.css';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {formatISO9075} from "date-fns";
import {Link} from 'react-router-dom';

export default function ReadPost() {

  const [postInfo,setPostInfo] = useState(null);
  const {id} = useParams();

  const API_URL = process.env.BACKEND_API_URL || 'http://localhost:4000';

  useEffect(() => {
    fetch(`${API_URL}/post/${id}`)
        .then(response => response.json())
        .then(postInfo => {
            setPostInfo(postInfo);
      })
      .catch(err => console.error('Error fetching post:', err));
  }, [API_URL, id]);


  if (!postInfo) return '';

  return (
    <div className="postPage">

        <div className="postPageImg">
            <img alt='cover' src={'https://source.unsplash.com/weekly?orientation=landscape&size=1600x900&' + postInfo.title } />
        </div>

        <h1 className='postTitle'> {postInfo.title} </h1>

        <div className='detailBox' style={{ display:'flex', justifyContent:'space-between', alignContent:'center'}}>
          
          <div className='postDetails'>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <i> by &nbsp;{postInfo.author.username} </i>
          </div>
          
          <div style={{ display:'flex', alignContent:'center'}}>
            <Link to={`/edit/${postInfo._id}`} className='editDltBtn'>
              <button className='postEditBtn'> 
                <span className='edit_img_cont'> <img className='edit_img' src='../edit_img.png' alt='' /> </span>
                <b className='edit_text'> EDIT </b> 
              </button>
            </Link>
            <button className='postDltBtn'> 
              <span className='dlt_img_cont'> <img className='dlt_img' src='../dlt_img.png' alt='' /> </span>
              <b className='dlt_text'> DLT </b> 
            </button>
          </div>

        </div>

        <div dangerouslySetInnerHTML={{__html:postInfo.content}} />
    </div>
  );
}