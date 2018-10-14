import { Button, TextField, IconButton } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import {AddAPhoto} from '@material-ui/icons';

import {
    CommentBox,
} from '../../components';
import {
    change_description,
    change_name,
    load_posts,
    submit_post,
    toggle_modal,
    handle_change,
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
        this.props.change_name(event.target.value);
    }
    handleDescriptionChange = (event) => {
        this.props.change_description(event.target.value);
    }
    toggleModal = () => {
        this.props.toggle_modal();
    }
    handleSubmit = () => {
        this.props.submit_post();
    }
    handleChange = (event) => {
        this.props.handle_change(URL.createObjectURL(event.target.files[0]));
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
                              autoFocus={false}
                            /><br/>

                            <div className="form-group">
                                <input style={{display: 'none'}} accept="image/*" onChange={this.handleChange} id="icon-button-file" type="file"/>
                                <img src={this.props.file} alt={this.props.file} className="img-thumbnail" style={{width: "50%"}}/><br/>
                                <label htmlFor="icon-button-file">
                                  <IconButton color="primary" component="span">
                                    <AddAPhoto style={{ fontSize: 35 }}/>
                                  </IconButton> <span/>
                                </label>
                            </div>

                            <Button variant="contained" color="primary" onClick={()=>this.handleSubmit()} disabled={this.props.name===""}>
                                Submit
                            </Button>
                        </Modal>
                    </div>
                </div>
                <CommentBox />
            </div>
        );

    }
}

export { HomeComponent };

const mapStateToProps = (state, ownProps) => {
    const { post } = state;
    const { description, modal_open, name, file} = post;
    return {
        ...ownProps,
        description,
        modal_open,
        name,
        file,
    };
};

export const Home = connect(mapStateToProps, {
    change_description,
    change_name,
    load_posts,
    submit_post,
    toggle_modal,
    handle_change
})(HomeComponent);
