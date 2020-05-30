import firebase from "firebase/app";
import "firebase/auth";
import "firebase/messaging";

const config = {
  apiKey: "AIzaSyAFD02XskxCcbdTz_mlK4kKtO8motJsNCE",
  authDomain: "possibilities-parenting.firebaseapp.com",
  databaseURL: "https://possibilities-parenting.firebaseio.com",
  projectId: "possibilities-parenting",
  storageBucket: "possibilities-parenting.appspot.com",
  messagingSenderId: "1009512559846",
  apiurl: "http://localhost:3000/v1/"
};

firebase.initializeApp(config);

export const loginAttempt = ({email, password, successCallBack, failureCallback}) => {
  return dispatch => {
    dispatch({type: "LOGIN_ATTEMPT", payload: true});
    if (password === "" && email !== "") {
      let errMsg = {};
      errMsg.message = "Please enter a valid password";
      loginAttempFail(dispatch, errMsg, failureCallback);
    } else {
      //fetch("http://ilcdp1.ravikadam.in/v1/auth/login", {
      fetch(config.apiurl + "auth/login", {
        "method": "POST",
        "headers": {
          "content-type": "application/json",
          "accept": "application/json"
        },
        "body": JSON.stringify({
          email: email,
          password: password
        })
      })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        loginAttempSuccess(dispatch, response, successCallBack);
      })
      .catch(err => {
        console.log(err);
      });

    }
  };
};

// firebase
//   .auth()
//   .onAuthStateChanged(function (user) {
//     if (user) {
//       //console.log(user);
//     } else {
//       //console.log("no user");
//     }
//   });

export const registerAttempt = ({email, password, accesscode, firstname, lastname, successCallBack, failureCallback}) => {
  return dispatch => {
    dispatch({type: "REGISTER_ATTEMPT", payload: true});

    fetch(config.apiurl+"auth/register", {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        email: email,
        password: password,
        accesscode: accesscode,
        // title: '',
        name: firstname + ' ' + lastname,
        firstname: firstname,
        lastname: lastname,
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      registerAttempSuccess(dispatch, response, successCallBack);
    })
    .catch(err => {
      console.log(err);
    });

    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(user => {
    //     loginAttempSuccess(dispatch, user, successCallBack);
    //   })
    //   .catch(err => {
    //     //let errMsg = getErrorMsg(err);
    //     loginAttempFail(dispatch, err, failureCallback);
    //   });
  };
};

export const myprofileAttempt = ({accesscode, firstname, lastname,title,phone,location,address1,address2,city,state,country,zipcode, successCallBack, failureCallback}) => {
  return dispatch => {
    dispatch({type: "MYPROFILE_ATTEMPT", payload: true});
    console.log('MyProfile User -');
    console.log(this.props.auth.user.uid);
    fetch(config.apiurl+"users/" + this.props.auth.user.uid, {
      "method": "PATCH",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        accesscode: accesscode,
        title: title,
        name: firstname + ' ' + lastname,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        location: location,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        country: country,
        zipcode: zipcode,
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      myprofileAttempSuccess(dispatch, response, successCallBack);
    })
    .catch(err => {
      console.log(err);
    });

    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(user => {
    //     loginAttempSuccess(dispatch, user, successCallBack);
    //   })
    //   .catch(err => {
    //     //let errMsg = getErrorMsg(err);
    //     loginAttempFail(dispatch, err, failureCallback);
    //   });
  };
};

export const setErrMsg = el => {
  return dispatch => {
    dispatch({type: "SET_LOGIN_ERROR_MSG", payload: el});
  };
};

export const resetPassword = email => {
  var auth = firebase.auth();
  var emailAddress = email;
  return dispatch => {
    if (email) {
      dispatch({type: "PASSWORD_RESET_IN_PROGRESS", payload: true});
      auth
        .sendPasswordResetEmail(emailAddress)
        .then(function () {
          dispatch({type: "RESET_PASSWORD_LINK_SENT", payload: true});
        })
        .catch(function (error) {
          let err = getErrorMsg(error);
          setErrorMsgInForgotPassword(dispatch, err.message);
        });
    } else {
      setErrorMsgInForgotPassword(dispatch, "Please enter a valid email id");
    }
  };
};

export const updateUserDetails = user => {
  return dispatch => {
    dispatch({type: "UPDATE_USER_UID", payload: user.uid});
  };
};

export const resetLoginPage = () => {
  return dispatch => {
    dispatch({type: "RESET_LOGIN_PAGE"});
  };
};

export const resetForgotPasswordPage = () => {
  return dispatch => {
    dispatch({type: "RESET_FORGOT_PASSWORD_PAGE"});
  };
};

export const registerNewUserPage = () => {
  return dispatch => {
    dispatch({type: "RESET_REGISTER_NEW_USER_PAGE"});
  };
};

export const myprofilePage = () => {
  return dispatch => {
    dispatch({type: "MYPROFILE_PAGE"});
  };
};

export const signOut = () => {
  let auth = firebase.auth();
  return dispatch => {
    console.log("ran");
    auth
      .signOut()
      .then(function () {
        dispatch({type: "LOGOUT_ATTEMPT"})
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

/**Helper Functions**/
const loginAttempSuccess = (dispatch, user, successCallBack) => {
  dispatch({type: "LOGIN_SUCCEEDED", payload: user});
  successCallBack();
};
const registerAttempSuccess = (dispatch, user, successCallBack) => {
  dispatch({type: "REGISTER_SUCCEEDED", payload: user});
  successCallBack();
};
const myprofileAttempSuccess = (dispatch, user, successCallBack) => {
  dispatch({type: "MYPROFILE_SUCCEEDED", payload: user});
  successCallBack();
};
const loginAttempFail = (dispatch, err, failureCallback, pos) => {
  dispatch({type: "LOGIN_FAILED", payload: err.message});
  failureCallback();
};

function getErrorMsg(error) {
  let {code} = error;

  switch (code) {
    case "auth/invalid-email":
      error.message = "Please enter a valid email id";
      break;
    case "auth/user-not-found":
      error.message = "This email id is not registered. Please register.";
      break;
    case "auth/wrong-password":
      error.message = "Incorrect email or password. Please try again.";
      break;
    case "auth/email-already-in-use":
      error.message = "This email id is already registered. Please use a different email id";
      break;
    default:
      break;
  }

  return error;
}

function setErrorMsgInForgotPassword(dispatch, msg) {
  dispatch({type: "SET_RESET_PASSWORD_ERROR_MSG", payload: msg});

  setTimeout(() => {
    dispatch({type: "SET_RESET_PASSWORD_ERROR_MSG", payload: " "});
  }, 3000);
}
/**End of Helper Functions**/
