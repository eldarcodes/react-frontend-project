import React from 'react'

export default function Post({post}) {
  return (
    <div className="jumbotron">
      <h1 className="display-4">{post.title}</h1>
      <p className="lead">{post.creator}</p>
      <hr className="my-4" />
      <small>{post.date}</small>
      <p>{post.subtitle}</p>
      <button className="btn btn-primary btn-lg">Learn more</button>
    </div>
  )
}
