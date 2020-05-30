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

//firebase.initializeApp(config);
export function getPrepareModulesAttempt(user) {
  return (dispatch) => {
      dispatch({type: "GETPREPAREMODULE_ATTEMPT", payload: true});
      return fetch(config.apiurl+"subscribe/getModuleForUser/" + user.userid, {
          "method": "GET",
          "headers": {
            "content-type": "application/json",
            "Authorization": "bearer " + user.token,
            "accept": "application/json"
          },
        })
      .then(res => res.json())
      .then(json => {
          return(dispatch(getpreparemoduleAttemptSuccess(json,user.token)))
      })
      .catch(err => dispatch(getpreparemoduleAttemptFailure(err)))
  }
}

var ModuleDetailsAvl=[];
var ModuleDetailsPre=[];
var ModuleDetailsSC=[];
var ModuleDetailsSCD=[];

function parseValues(avlModules,token)
{
  for (const [itm] of avlModules) {
    const id = itm.moduleId;   
    const stat = itm.status;

    fetch(config.apiurl+"appmodule/" + id, {
      "method": "GET",
      "headers": {
        "content-type": "application/json",
        "Authorization": "bearer " + token,
        "accept": "application/json"
      },
    })
    .then(response => response.json())
    .then(data => {
      if (stat === 'Available')
      {
        ModuleDetailsAvl.push(data);
      }
      else if (stat === 'Preparation')
      {
        ModuleDetailsPre.push(data);
      }
      else if (stat === 'SelfCertify')
      {
        ModuleDetailsSC.push(data);
      }
      else if (stat === 'SelfCertified')
      {
        ModuleDetailsSCD.push(data);
      }
      
    })
  }
}

function getpreparemoduleAttemptSuccess(data,token) {
  parseValues(data[0].availableModule, token);
  data.push(ModuleDetailsAvl);
  data.push(ModuleDetailsPre);
  data.push(ModuleDetailsSC);
  data.push(ModuleDetailsSCD);
  return {
      type: "GETPREPAREMODULE_SUCCEEDED",
      data
  }
}

function getpreparemoduleAttemptFailure(err) {
  console.log(err);
  return {
      type: "GETPREPAREMODULE_FAILURE"
  }
}

export function getModuleDetails(id,token) {
  return (dispatch) => {
      dispatch({type: "GETMODULE_ATTEMPT", payload: true});
      return fetch(config.apiurl+"appmodule/" + id, {
          "method": "GET",
          "headers": {
            "content-type": "application/json",
            "Authorization": "bearer " + token,
            "accept": "application/json"
          },
        })
      .then(res => res.json())
      .then(json => {
          return(dispatch(getModuleDetailsSuccess(json)))
      })
      .catch(err => dispatch(getModuleDetailsFailure(err)))
  }
}

function getModuleDetailsSuccess(data) {
  return {
      type: "GETMODULE_SUCCEEDED",
      data
  }
}

function getModuleDetailsFailure() {
  return {
      type: "GETPREPAREMODULE_FAILURE"
  }
}

// export const getPrepareModulesAttempt = (user) => {
//   return dispatch => {
//     dispatch({type: "GETPREPAREMODULE_ATTEMPT", payload: true});
//     fetch(config.apiurl+"subscribe/getModuleForUser/" + user.userid, {
//       "method": "GET",
//       "headers": {
//         "content-type": "application/json",
//         "Authorization": "bearer " + user.token,
//         "accept": "application/json"
//       },
//     })
//     .then(response => response.json())
//     .then(response => {
//       //const successCallBack='';
//       getpreparemoduleAttemptSuccess(dispatch, response);
//     })
//     .catch(err => {
//       console.log(err);
//     });

//     // firebase
//     //   .auth()
//     //   .createUserWithEmailAndPassword(email, password)
//     //   .then(user => {
//     //     loginAttempSuccess(dispatch, user, successCallBack);
//     //   })
//     //   .catch(err => {
//     //     //let errMsg = getErrorMsg(err);
//     //     loginAttempFail(dispatch, err, failureCallback);
//     //   });
//   };
// };

export const resetLoginPage = () => {
  return dispatch => {
    dispatch({type: "RESET_LOGIN_PAGE"});
  };
};

export const setErrMsg = el => {
  return dispatch => {
    dispatch({type: "SET_LOGIN_ERROR_MSG", payload: el});
  };
};

export const preparePage = () => {
  return dispatch => {
    dispatch({type: "PREPARE_PAGE"});
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
// const getpreparemoduleAttemptSuccess = (dispatch, availableModule) => {
//   dispatch({type: "GETPREPAREMODULE_SUCCEEDED", payload: availableModule});
//  // successCallBack();
// };

// function getErrorMsg(error) {
//   let {code} = error;

//   switch (code) {
//     case "auth/invalid-email":
//       error.message = "Please enter a valid email id";
//       break;
//     case "auth/user-not-found":
//       error.message = "This email id is not registered. Please register.";
//       break;
//     case "auth/wrong-password":
//       error.message = "Incorrect email or password. Please try again.";
//       break;
//     case "auth/email-already-in-use":
//       error.message = "This email id is already registered. Please use a different email id";
//       break;
//     default:
//       break;
//   }

//   return error;
// }
/**End of Helper Functions**/
