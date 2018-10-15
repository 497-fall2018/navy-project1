import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
    handle_change,
    handle_delete_post,
    handle_update_post,
} from '../../ducks/post';

class PostComponent extends Component {
    handleUpdatePost = (id) => {
      const oldPost = this.props.data.find(c => c._id === id);
      if (!oldPost) return;
      this.props.handle_update_post(oldPost.author, oldPost.description, id);
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
                  <a onClick={() => { this.handleUpdatePost(this.props.id); }}>update</a>
                  <a onClick={() => { this.props.handle_delete_post(this.props.id); }}>delete</a>
                </div>
              </div>
            </div>
        );
    }

}


export { PostComponent };

const mapStateToProps = (state, ownProps) => {
    const { post } = state;
    const { modal_open, data } = post;
    return {
        ...ownProps,
        modal_open,
        data
    };
};

export const Post = connect(mapStateToProps, {
    handle_change,
    handle_delete_post,
    handle_update_post
})(PostComponent);
