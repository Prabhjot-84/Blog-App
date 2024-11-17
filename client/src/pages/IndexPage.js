import React, { useEffect, useState } from 'react';
import Post from '../Post';
import Headline from '../Headline';

const IndexPage = () => {
  const API_URL = process.env.BACKEND_API_URL || 'http://localhost:4000';

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/post`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const posts = await response.json();
        setPosts(posts);
      } catch (err) {
        console.error('Failed to fetch posts:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [API_URL]);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error loading posts: {error}</div>;
  }

  return (
    <>
      <Headline />
      <div className="blogGrid">
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post._id || post.id} {...post} />)
        ) : (
          <div>No posts available.</div>
        )}
      </div>
    </>
  );
};

export default IndexPage;