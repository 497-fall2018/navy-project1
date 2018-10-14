import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Comment } from '../Comment';
import {
    handle_update_comment,
    handle_delete_comment
} from '../../ducks/post';
import './styles.css';

class CommentListComponent extends Component {
    render() {
        const commentNodes = (this.props.data).map(comment => (
            <Comment
              author={comment.author}
              description={comment.description}
              key={comment._id}
              id={comment._id}
              timestamp={comment.updatedAt}
              handleUpdateComment={this.props.handleUpdateComment}
              handleDeleteComment={this.props.handleDeleteComment}
            >
            </Comment>
        ));
        return (
            <div>
              { commentNodes }
            </div>
        );
    }
};

// CommentList.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.shape({
//     author: PropTypes.string,
//     id: PropTypes.string,
//     text: PropTypes.string,
//     updatedAt: PropTypes.string,
//   })),
//   handleDeleteComment: PropTypes.func.isRequired,
//   handleUpdateComment: PropTypes.func.isRequired,
// };
//
// CommentList.defaultProps = {
//   data: [],
// };

export { CommentListComponent };

const mapStateToProps = (state, ownProps) => {
    const { post } = state;
    const { data } = post;
    return {
        ...ownProps,
        data
    };
};

export const CommentList = connect(mapStateToProps, {
    handle_delete_comment,
    handle_update_comment,
})(CommentListComponent);
