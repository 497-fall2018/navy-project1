import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    CommentList,
    ModalBox
} from '../../components';
import {
    change_description,
    change_author,
    load_posts,
    submit_new_post,
    submit_updated_post,
    toggle_modal,
    handle_change,
} from '../../ducks/post';
import './styles.css';

class HomeComponent extends Component {

    constructor() {
        super();
        this.pollInterval = null;
    }
    componentDidMount() {
        this.props.load_posts();
        if (!this.pollInterval) {
          this.pollInterval = setInterval(()=>this.props.load_posts(), 1000);
        }
    }

    componentWillUnmount() {
      if (this.pollInterval) clearInterval(this.pollInterval);
      this.pollInterval = null;
    }

    render() {
        return (
            <div>
                <ModalBox />
                <div className="container">
                    <div className="comments">
                      <CommentList />
                    </div>
                </div>

            </div>
        );

    }
}

export { HomeComponent };

const mapStateToProps = (state, ownProps) => {
    const { post } = state;
    const { data, description, error, modal_open, author, file, pollInterval, updateId} = post;
    return {
        ...ownProps,
        author,
        data,
        description,
        error,
        file,
        modal_open,
        pollInterval,
        updateId,
    };
};

export const Home = connect(mapStateToProps, {
    change_description,
    change_author,
    load_posts,
    submit_new_post,
    submit_updated_post,
    toggle_modal,
    handle_change
})(HomeComponent);
