import '../ReadPost.css';
import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {formatISO9075} from "date-fns";
import { UserContext } from "../userContext";
import {Link} from 'react-router-dom';

export default function ReadPost() {

  const [postInfo,setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext);
  const {id} = useParams();
  
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
        });
      });
  }, []);

  if (!postInfo) return '';

  return (
    <div className="postPage">

        <div className="postPageImg">
            <img src={'https://source.unsplash.com/weekly?orientation=landscape&size=1600x900&' + postInfo.title } />
        </div>

        <h1 className='postTitle'> {postInfo.title} </h1>

        <div className='detailBox' style={{ display:'flex', justifyContent:'space-between', alignContent:'center'}}>
          <div className='postDetails'>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <i> by &nbsp;{postInfo.author.username} </i>
          </div>
          <Link to={`/edit/${postInfo._id}`}>
            <button className='postEditBtn'> <b>EDIT</b> </button>
          </Link>
        </div>

        <div dangerouslySetInnerHTML={{__html:postInfo.content}} />
    </div>
  );
}