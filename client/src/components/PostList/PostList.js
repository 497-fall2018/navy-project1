import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Post } from '../Post';
import './styles.css';

class PostListComponent extends Component {
    render() {
        const postNodes = (this.props.data).map(post => (
            <Post
              author={post.author}
              description={post.description}
              key={post._id}
              id={post._id}
              timestamp={post.updatedAt}
            >
            </Post>
        ));
        return (
            <div>
              { postNodes }
            </div>
        );
    }
};

export { PostListComponent };

const mapStateToProps = (state, ownProps) => {
    const { post } = state;
    const { data } = post;
    return {
        ...ownProps,
        data
    };
};

export const PostList = connect(mapStateToProps, {
})(PostListComponent);
