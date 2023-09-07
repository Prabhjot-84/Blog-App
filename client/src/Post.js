import React from 'react'

const Post = () => {
  return (
    <div className="post">
        <div className="image">
          <img src="https://images.pexels.com/photos/17502664/pexels-photo-17502664/free-photo-of-close-up-of-robot.jpeg?auto=compress&cs=tinysrgb&w=600" />
        </div>
        <div className="texts">
          <h2> AI will destroy humans </h2>
          <p className="info">
            <span className="author"> Pj Snake </span>
            <time>04-09-2023 11:05 </time>
          </p>
          <p className="summary">Artificial Intelligence (AI) is a powerful and transformative technology that has the potential to bring significant benefits to humanity. However, like any powerful tool, it also carries certain risks and challenges that need to be carefully managed.</p>
        </div>
    </div>
  )
}

export default Post