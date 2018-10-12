import { Button, TextField } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';

import {
    CommentBox,
} from '../../components';
import {
    change_description,
    change_name,
    load_posts,
    submit_post,
    toggle_modal,
} from '../../ducks/post';
import './styles.css';

class HomeComponent extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    componentWillUpdate() {
        this.props.load_posts();
    }
    
    handleNameChange = (event) => {
        this.props.change_name(event.target.value)
    }
    handleDescriptionChange = (event) => {
        this.props.change_description(event.target.value)
    }
    toggleModal = () => {
        this.props.toggle_modal();
    };
    handleSubmit = () => {
        this.props.submit_post();
    }
    render() {
        return (
            <div>
                <div className="header">
                    Petstagram
                    <div className="checkOutButton">
                        <Button variant="contained" color="primary" onClick={this.toggleModal}>Create Post</Button>
                        <Modal
                          open={this.props.modal_open}
                          onClose={this.toggleModal}
                          center
                          classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }}
                          style={{padding: '2em'}}
                        >
                            <h2>New Pet Post:</h2>
                            Name: <TextField required
                              label="Name"
                              value={this.props.name}
                              onChange={this.handleNameChange}
                              margin="normal"
                              autoFocus={true}
                            /><br/>

                            Description: <TextField required
                              label="Description"
                              value={this.props.description}
                              onChange={this.handleDescriptionChange}
                              margin="normal"
                              autoFocus={true}
                            /><br/>

                            <Button variant="contained" color="primary" onClick={()=>this.handleSubmit()} disabled={this.props.name===""}>
                                Submit
                            </Button>
                        </Modal>
                    </div>
                </div>
            </div>
        );

    }
}

export { HomeComponent };

const mapStateToProps = (state, ownProps) => {
    const { post } = state;
    const { description, modal_open, name, } = post;
    return {
        ...ownProps,
        description,
        modal_open,
        name,

    };
};

export const Home = connect(mapStateToProps, {
    change_description,
    change_name,
    load_posts,
    submit_post,
    toggle_modal
})(HomeComponent);
