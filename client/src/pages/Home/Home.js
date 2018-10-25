import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    PostList,
    ModalBox
} from '../../components';
import {
    load_posts,
} from '../../ducks/post';
import './styles.css';

class HomeComponent extends Component {
    componentDidMount() {
        this.props.load_posts();
    }

    render() {
        return (
            <div>
                <ModalBox />
                <div className="container">
                    <div className="comments">
                      <PostList />
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
    load_posts,
})(HomeComponent);
