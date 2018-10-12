import axios from 'axios';

import APIConfig from '../config/api';

const APIRoot = `${APIConfig.apiroot}`;

//Action Types
export const TOGGLE_MODAL = "petstagram/post/TOGGLE_MODAL";
export const CHANGE_DESCRIPTION = "petstagram/post/CHANGE_DESCRIPTION";
export const CHANGE_NAME = "petstagram/post/CHANGE_NAME";
export const LOAD_POSTS = "petstagram/post/LOAD_POSTS";
export const LOAD_POSTS_FAILURE = "petstagram/post/LOAD_POSTS_FAILURE";
export const LOAD_POSTS_SUCCESS = "petstagram/post/LOAD_POSTS_SUCCESS";
export const SUBMIT_POST = "petstagram/post/SUBMIT_POST_SUCCESS";
export const SUBMIT_POST_FAILURE = "petstagram/post/SUBMIT_POST_FAILURE";
export const SUBMIT_POST_SUCCESS = "petstagram/post/SUBMIT_POST_SUCCESS";
// export const LOAD_RESULT = 'petstagram/home/LOAD_RESULT';
// export const LOAD_RESULT_FAILURE = 'petstagram/home/LOAD_RESULT_FAILURE';
// export const LOAD_RESULT_SUCCESS = 'petstagram/home/LOAD_RESULT_SUCCESS';

const INITIAL_STATE = {
    modal_open: false,
    name: "",
    description: "",
    questions: [{
        "id": 0,
        "question_text": "",
        "cards": [
            {
                "id": 29,
                "description": "",
            }
        ]
    },],
};

//Reducers
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type){
        case TOGGLE_MODAL:
            console.log(!state.modal_open);
            return {
                ...state,
                modal_open: !state.modal_open,
            }
        case CHANGE_NAME:
            return {
                ...state,
                name: action.payload,
            }
        case CHANGE_DESCRIPTION:
            return {
                ...state,
                description: action.payload,
            }
        case LOAD_POSTS:
            return {
                ...state,
            }
        case LOAD_POSTS_SUCCESS:
            if(action.payload) {
                return {
                    ...state,
                    quiz_id: action.payload.id,
                    error_message: "",
                    quiz_name: action.payload.quiz_name,
                    questions: action.payload.questions,
                    editing: false,
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
        case SUBMIT_POST:
        case SUBMIT_POST_SUCCESS:
            if(action.payload){
                console.log(!state.modal_open);
                return {
                    ...state,
                    error_message: "",
                    modal_open: !state.modal_open,
                }
            } else {
                return {
                    ...state,
                }
            }

        case SUBMIT_POST_FAILURE:
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
export const toggle_modal = () => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_MODAL,
        });
    };
};

export const change_name = (name) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_NAME,
            payload: name,
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

export const load_posts = (whereto) => {
    const url = `${APIRoot}/${whereto}`;
    return (dispatch) => {
        dispatch({
            type: LOAD_POSTS
        });
        axios.get(url)
          .then((response) => load_posts_success(dispatch, response))
          .catch((error) => load_posts_failure(dispatch, error))
    }
}

export const load_posts_success = (dispatch, response) => {
    dispatch({
        type: LOAD_POSTS_SUCCESS,
        payload: response.data.response,
    });
}

export const load_posts_failure = (dispatch, error) => {
    dispatch({
        type: LOAD_POSTS_FAILURE,
    });
}

export const submit_post = (name, description) => {
    return (dispatch) => {
        dispatch({
            type: SUBMIT_POST,
        });
        axios.post(`${APIRoot}/post`, {
            "name": name,
            "description": description,
        })
          .then((response) => submit_post_success(dispatch, response))
          .catch((error) => submit_post_failure(dispatch, error))
    }
}

export const submit_post_success = (dispatch, response) => {
    dispatch({
        type: SUBMIT_POST_SUCCESS,
        payload: response.data.response,
    });
}

export const submit_post_failure = (dispatch, error) => {
    dispatch({
        type: SUBMIT_POST_FAILURE,
    });
}
