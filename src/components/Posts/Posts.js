import React from 'react'
import Post from './Post.js'

export default function Posts(props) {
  return (
    <div className="container">
      {props.posts.length > 0 ? (
        props.posts.map(post => <Post post={post} key={post.id} />)
      ) : (
        <div className="alert alert-primary text-center" role="alert">
          Пока нет постов =(
        </div>
      )}
    </div>
  )
}
