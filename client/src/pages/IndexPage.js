import React from 'react'
import Post from '../Post'
import Headline from '../Headline'
import {useEffect, useState} from "react";

const IndexPage = () => {

  const API_URL = process.env.BACKEND_API_URL || 'http://localhost:4000';

  const [posts,setPosts] = useState([]); 
  useEffect(() => {
    fetch(`${API_URL}/post`).then(response => {
      response.json().then(posts => { 
        setPosts(posts);
      });
    });
  }, []);

  return (
    <>
      <Headline />
      <div className='blogGrid'>
        {posts.length > 0 && posts.map(post => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </>
  )
}

export default IndexPage
