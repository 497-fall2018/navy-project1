import axios from 'axios';

//Action Types
export const TOGGLE_MODAL = "petstagram/post/TOGGLE_MODAL";
export const CHANGE_DESCRIPTION = "petstagram/post/CHANGE_DESCRIPTION";
export const CHANGE_AUTHOR = "petstagram/post/CHANGE_AUTHOR";
export const LOAD_POSTS = "petstagram/post/LOAD_POSTS";
export const LOAD_POSTS_FAILURE = "petstagram/post/LOAD_POSTS_FAILURE";
export const LOAD_POSTS_SUCCESS = "petstagram/post/LOAD_POSTS_SUCCESS";
export const SUBMIT_NEW_POST = "petstagram/post/SUBMIT_NEW_POST_SUCCESS";
export const SUBMIT_NEW_POST_FAILURE = "petstagram/post/SUBMIT_NEW_POST_FAILURE";
export const SUBMIT_NEW_POST_SUCCESS = "petstagram/post/SUBMIT_NEW_POST_SUCCESS";
export const SUBMIT_UPDATED_POST = "petstagram/post/SUBMIT_UPDATED_POST_SUCCESS";
export const SUBMIT_UPDATED_POST_FAILURE = "petstagram/post/SUBMIT_UPDATED_POST_FAILURE";
export const SUBMIT_UPDATED_POST_SUCCESS = "petstagram/post/SUBMIT_UPDATED_POST_SUCCESS";
export const HANDLE_CHANGE = "petstagram/post/HANDLE_CHANGE";
export const HANDLE_DELETE_COMMENT = "petstagram/post/HANDLE_DELETE_COMMENT";
export const HANDLE_DELETE_COMMENT_SUCCESS = "petstagram/post/HANDLE_DELETE_COMMENT_SUCCESS";
export const HANDLE_DELETE_COMMENT_FAILURE = "petstagram/post/HANDLE_DELETE_COMMENT_FAILURE";
export const HANDLE_UPDATE_COMMENT = "petstagram/post/HANDLE_UPDATE_COMMENT";


const INITIAL_STATE = {
    modal_open: false,
    file: null,
    data: [{
        "author":"a" ,
        "description": "b",
        "_id": "0",
        "updatedAt": ""
    }],
    error: null,
    author: '',
    description: '',
    updateId: null,
    pollInterval: null,
    error_message: "",
};

//Reducers
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type){
        case HANDLE_CHANGE:
            return {
                ...state,
                file: action.payload,
            }

        case TOGGLE_MODAL:
            return {
                ...state,
                modal_open: !state.modal_open,
                author: "",
                description: "",
                file: null,
            }
        case CHANGE_AUTHOR:
            return {
                ...state,
                author: action.payload,
            }
        case CHANGE_DESCRIPTION:
            return {
                ...state,
                description: action.payload,
            }
        case LOAD_POSTS:
        case LOAD_POSTS_SUCCESS:
            if(action.payload) {
                return {
                    ...state,
                    error_message: "",
                    data: action.payload.data,
                }
            }
            return {
                ...state,
                error_message: ""
            }
        case LOAD_POSTS_FAILURE:
            /*
            if the quiz load fails, need to lead them to a 500 page.
            */
            return {
                ...state,
                error_message: "Something went wrong while loading the quiz. We put a monkey on it so it should be solved in no time!",
            }
        case SUBMIT_NEW_POST:
        case SUBMIT_NEW_POST_SUCCESS:
            if(action.payload){
                var prev = state.data;
                var aut = state.author;
                var des = state.description;
                const new_data = [...prev, { "author": aut, "description": des, _id: Date.now().toString() }];
                return {
                    ...state,
                    error_message: "",
                    modal_open: !state.modal_open,
                    author: "",
                    description: "",
                    data: new_data
                }
            } else {
                return {
                    ...state,
                }
            }

        case SUBMIT_NEW_POST_FAILURE:
            /*
            if the posting fails, need to lead them to a 500 page.
            */
            return {
                ...state,
                error_message: "Something went wrong while loading the result.",
            }
        case HANDLE_UPDATE_COMMENT://when user clicks on "update"
            return {
                ...state,
                modal_open: !state.modal_open,
                author: action.payload.author,
                description: action.payload.description,
                updateId: action.payload.id,
            }
        case SUBMIT_UPDATED_POST:
        case SUBMIT_UPDATED_POST_SUCCESS://when user clicks on "submit" after edit
            if(action.payload){
                return {
                    ...state,
                    error_message: "",
                    modal_open: !state.modal_open,
                    author: "",
                    description: "",
                    updateId: null,

                }
            } else {
                return {
                    ...state,
                }
            }

        case SUBMIT_UPDATED_POST_FAILURE:
            /*
            if the posting fails, need to lead them to a 500 page.
            */
            return {
                ...state,
                error_message: "Something went wrong while loading the result.",
            }
        case HANDLE_DELETE_COMMENT:
        case HANDLE_DELETE_COMMENT_SUCCESS:
            if(action.payload) {
                const i = state.data.findIndex(c => c._id === action.payload);
                const new_data = [
                  ...state.data.slice(0, i),
                  ...state.data.slice(i + 1),
                ];
                return {
                    ...state,
                    data: new_data
                }
            } else {
                return {
                    ...state,
                }
            }
        case HANDLE_DELETE_COMMENT_FAILURE:
            /*
            if the posting fails, need to lead them to a 500 page.
            */
            return {
                ...state,
                error_message: "Something went wrong while loading the result.",
            }
        default:
            return {
                ...state
            }
    }
}


//Action Creators
export const handle_change = (file) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_CHANGE,
            payload: file,
        })
    }
}

export const toggle_modal = () => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_MODAL,
        });
    };
};

export const change_author = (author) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_AUTHOR,
            payload: author,
        })
    }
}

export const change_description = (desc) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_DESCRIPTION,
            payload: desc,
        })
    }
}

export const load_posts = () => {
    const url = `/api/comments`;
    return (dispatch) => {
        dispatch({
            type: LOAD_POSTS,
        });
        axios.get(url)
          .then((response) => load_posts_success(dispatch, response))
          .catch((error) => load_posts_failure(dispatch, error))
    }
}

export const load_posts_success = (dispatch, response) => {
    dispatch({
        type: LOAD_POSTS_SUCCESS,
        payload: response.data,
    });
}

export const load_posts_failure = (dispatch, error) => {
    dispatch({
        type: LOAD_POSTS_FAILURE,
    });
}
export const submit_updated_post = (author, description, updateId) => {
    return (dispatch) => {
        dispatch({
            type: SUBMIT_UPDATED_POST,
        });
        axios.put(`/api/comments/${updateId}`, {
             "author": author,
             "description": description,
        })
          .then((response) => submit_updated_post_success(dispatch, response))
          .catch((error) => submit_updated_post_failure(dispatch, error))
    }
}

export const submit_updated_post_success = (dispatch, response) => {
    dispatch({
        type: SUBMIT_UPDATED_POST_SUCCESS,
        payload: response.data,
    });
}

export const submit_updated_post_failure = (dispatch, error) => {
    dispatch({
        type: SUBMIT_UPDATED_POST_FAILURE,
    });
}

export const submit_new_post = (author, description) => {
    return (dispatch) => {
        dispatch({
            type: SUBMIT_NEW_POST,
        });
        axios.post(`/api/comments`, {
             "author": author,
             "description": description,
        })
          .then((response) => submit_new_post_success(dispatch, response))
          .catch((error) => submit_new_post_failure(dispatch, error))
    }
}

export const submit_new_post_success = (dispatch, response) => {
    dispatch({
        type: SUBMIT_NEW_POST_SUCCESS,
        payload: response.data,
    });
}

export const submit_new_post_failure = (dispatch, error) => {
    dispatch({
        type: SUBMIT_NEW_POST_FAILURE,
    });
}

export const handle_update_comment = (author, description, id) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_UPDATE_COMMENT,
            payload: {"author": author, "description": description,"id": id}
        })
    }
}

export const handle_delete_comment = (id) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_DELETE_COMMENT,
        });
        axios.delete(`/api/comments/${id}`, {
        })
        .then((response) => handle_delete_comment_success(dispatch, response, id))
        .catch((error) => handle_delete_comment_failure(dispatch, error))
    }
}
export const handle_delete_comment_success = (dispatch, response, id) => {
    dispatch({
        type: HANDLE_DELETE_COMMENT_SUCCESS,
        payload: id,
    });
}

export const handle_delete_comment_failure = (dispatch, error) => {
    dispatch({
        type: HANDLE_DELETE_COMMENT_FAILURE,
    });
}
