// ❗ You don't need to add extra action creators to achieve MVP
import * as type from './action-types'
import axios from 'axios';

export function moveClockwise(value) {
  return { type: type.MOVE_CLOCKWISE, payload: value };
 }

export function moveCounterClockwise(value) { 
  return { type: type.MOVE_COUNTERCLOCKWISE, payload: value };
}

export function selectAnswer(value) {
  return { type: type.SET_SELECTED_ANSWER, payload: value };
 }

export function setMessage(value) {
  return { type: type.SET_INFO_MESSAGE, payload: value };
 }

export function setQuiz(value){ 
  return { type: type.SET_QUIZ_INTO_STATE, payload: value };
}

export function inputChange(value) { 
  return { type: type.INPUT_CHANGE, payload: value };
}

export function resetForm() { 
  return { type: type.RESET_FORM};
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    axios.get(`http://localhost:9000/api/quiz/next`)
      .then(response => {
        dispatch(setQuiz(response.data))
      })
      .catch(error => {
        console.error(error)
      })
  }
}
export function postAnswer(object) {
  return function (dispatch) {
    axios.post(`http://localhost:9000/api/quiz/answer`, {quiz_id:object.quiz_id, answer_id:object.answer_id})
    .then(response=> {
      //console.log(response.data);
      dispatch(setQuiz(null))
      dispatch(fetchQuiz())
      dispatch(selectAnswer(null))      
      dispatch(setMessage(response.data.message))
    })
    .catch(error=> {
      console.error(error)
    })
  }
}
export function postQuiz(object) {
  return function (dispatch) {
    axios.post(`http://localhost:9000/api/quiz/new`, {question_text: object.question_text, true_answer_text: object.true_answer_text, false_answer_text: object.false_answer_text})
      .then(response => {
        dispatch(setMessage(`Congrats: "${response.data.question}" is a great question!`));
        dispatch(resetForm());
      })
      .catch(error => {
        console.error(error);
      });
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
