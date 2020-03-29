import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPosts} from './../../redux/Posts/postsReducer'
import Posts from './Posts'

class PostsContainer extends Component {
  componentDidMount() {
    this.props.getPosts()
    document.title = 'Главная страница'
  }
  render() {
    return (
      <div>
        <Posts {...this.props} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {posts: state.postsPage.posts}
}

export default connect(mapStateToProps, {getPosts})(PostsContainer)
