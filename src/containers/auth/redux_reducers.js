const INITIAL_STATE = {
  authInProgress: false,
  resetPasswordInProgress: false,
  passwordLinkSent: false,
  userRegistrationInProgress: false,
  anyAuthRequestInProgress: false,
  isLoggedIn: false,
  user: null,
  user_token: "",
  user_uid: "",
  loginErrorMsg: "",
  forgotPasswordErrorMsg: "",
  registrationErrorMsg: "",
  availableModule: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "Navigation/NAVIGATE":
      return state;
    case "LOGIN_ATTEMPT": //login progress
      return { ...state, msg: "", authInProgress: true };
    case "LOGIN_SUCCEEDED": //login sucess
      return {
        ...state,
        ...INITIAL_STATE,
        isLoggedIn: true,
        user: action.payload.user,
        user_uid: action.payload.user.id,
        user_token:action.payload.tokens.refresh.token
      };
    case "REGISTER_SUCCEEDED": //register sucess
      return {
        ...state,
        ...INITIAL_STATE,
      };
    case "LOGIN_FAILED": //login failed
      return { ...state, loginErrorMsg: action.payload, authInProgress: false };
    case "LOGOUT_ATTEMPT": //logout progress
      console.log("attempted");
      return { ...state, ...INITIAL_STATE };
    case "LOGOUT_SUCCEEDED": //logout sucess
      return { ...state };
    case "LOGOUT_FAILED": //logout failed
      return { ...state, loginErrorMsg: "Logout Failed" };
    case "SET_LOGIN_ERROR_MSG":
      return { ...state, loginErrorMsg: action.payload };
    case "REGISTER_ATTEMPT":
      return { ...state, loginErrorMsg: "", authInProgress: true };
    case "MYPROFILE_ATTEMPT":
      return { ...state, loginErrorMsg: "", authInProgress: true };  
    case "PASSWORD_RESET_IN_PROGRESS":
      return {
        ...state,
        forgotPasswordErrorMsg: "",
        resetPasswordInProgress: action.payload
      };
    case "SET_RESET_PASSWORD_ERROR_MSG":
      return {
        ...state,
        forgotPasswordErrorMsg: action.payload,
        resetPasswordInProgress: false
      };
    case "RESET_PASSWORD_LINK_SENT":
      return {
        ...state,
        resetPasswordInProgress: false,
        passwordLinkSent: true
      };
    case "UPDATE_TOKEN":
      return { ...state, user_token: action.payload };
    case "UPDATE_USER_UID":
      return { ...state, user_uid: action.payload };
    case "RESET_LOGIN_PAGE":
      return { ...state, loginErrorMsg: "" };
    case "RESET_FORGOT_PASSWORD_PAGE":
      return { ...state, ...INITIAL_STATE };
    case "RESET_REGISTER_NEW_USER_PAGE":
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
