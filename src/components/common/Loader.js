import React from 'react'

export default function Loader(props) {
  return (
    <div
      style={{width: props.width, height: props.height}}
      className="spinner-grow text-primary"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}
