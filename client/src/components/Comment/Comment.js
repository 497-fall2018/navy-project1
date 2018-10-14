import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
    change_description,
    change_author,
    load_posts,
    submit_new_post,
    submit_updated_post,
    toggle_modal,
    handle_change,
    handle_update_comment,
} from '../../ducks/post';

class CommentComponent extends Component {
    handleUpdateComment = (id) => {
      const oldComment = this.props.data.find(c => c._id === id);
      if (!oldComment) return;
      this.props.handle_update_comment(oldComment.author, oldComment.description, oldComment.id);
    }
    render() {
        return(
            <div className="singleComment">
              <img alt="user_image" className="userImage" src={`https://picsum.photos/70?random=${this.props.id}`} />
              <div className="textContent">
                <div className="singleCommentContent">
                  <h3>{this.props.author}</h3>
                  <p>{this.props.description}</p>
                </div>
                <div className="singleCommentButtons">
                  <span className="time">{moment(this.props.timestamp).fromNow()}</span>
                  <a onClick={() => { this.handleUpdateComment(this.props.id); }}>update</a>
                  <a onClick={() => { this.props.handleDeleteComment(this.props.id); }}>delete</a>
                </div>
              </div>
            </div>
        );
    }

}
// CommentComponent.propTypes = {
//  author: PropTypes.string.isRequired,
//  children: PropTypes.string.isRequired,
//  id: PropTypes.string.isRequired,
//  handleUpdateComment: PropTypes.func.isRequired,
//  handleDeleteComment: PropTypes.func.isRequired,
//  timestamp: PropTypes.string.isRequired,
// }


export { CommentComponent };

const mapStateToProps = (state, ownProps) => {
    const { post } = state;
    const { modal_open, data } = post;
    return {
        ...ownProps,
        modal_open,
        data
    };
};

export const Comment = connect(mapStateToProps, {
    change_description,
    change_author,
    load_posts,
    submit_new_post,
    submit_updated_post,
    toggle_modal,
    handle_change,
    handle_update_comment
})(CommentComponent);
