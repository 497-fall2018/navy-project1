import { Button, TextField, IconButton } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import {AddAPhoto} from '@material-ui/icons';

import {
    change_description,
    change_author,
    load_posts,
    submit_new_post,
    submit_updated_post,
    toggle_modal,
    handle_change,
} from '../../ducks/post';

class ModalBoxComponent extends Component {
    handleNameChange = (event) => {
        this.props.change_author(event.target.value);
    }
    handleDescriptionChange = (event) => {
        this.props.change_description(event.target.value);
    }
    toggleModal = () => {
        this.props.toggle_modal();
    }
    handleSubmit = () => {
        if (this.props.updateId) {
          this.props.submit_updated_post(this.props.author,this.props.description, this.props.updateId);
        } else {
          this.props.submit_new_post(this.props.author,this.props.description);
        }
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
                            <h2>Your Post:</h2>
                            Name: <TextField required
                              label="Name"
                              value={this.props.author}
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

                            <Button variant="contained" color="primary" onClick={()=>this.handleSubmit()} disabled={this.props.author===""}>
                                Submit
                            </Button>
                        </Modal>
                    </div>
                </div>
            </div>
        );

    }
}

export { ModalBoxComponent };

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

export const ModalBox = connect(mapStateToProps, {
    change_description,
    change_author,
    load_posts,
    submit_new_post,
    submit_updated_post,
    toggle_modal,
    handle_change
})(ModalBoxComponent);