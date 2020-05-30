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
  availableModuleAvl: [],
  availableModulePre: [],
  availableModuleSC: [],
  availableModuleSCD: [],
  moduleObj: [],
  ModuleDetails: [],
  isFetching: false,
  error: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "Navigation/NAVIGATE":
      return state;
    case "GETPREPAREMODULE_ATTEMPT":
      return { ...state, isLoadingData: true, loginErrorMsg: "", authInProgress: true };  
    case "GETPREPAREMODULE_SUCCEEDED":
      console.log('data in reducer');
      console.log(action.data);
      return {
        ...state,
        isLoggedIn: true,
        availableModule: action.data[0].availableModule,
        availableModuleAvl: action.data[1],
        availableModulePre: action.data[2],
        availableModuleSC: action.data[3],
        availableModuleSCD: action.data[4],
      };
//      return { ...state, isLoadingData: false, loginErrorMsg: "", authInProgress: true, availableModule: action.payload };  
    case "GETMODULE_ATTEMPT":
      return { ...state, isLoadingData: true, loginErrorMsg: "", authInProgress: true };  
    case "GETMODULE_SUCCEEDED":
      return {
        ...state,
//        ...INITIAL_STATE,
        isLoggedIn: true,
        ModuleDetails: action.data,
      };    
default:
      return state;
  }
};

// export default function todosReducer(state = INITIAL_STATE, action) {
//   switch(action.type) {
//     case "Navigation/NAVIGATE":
//       return state;
//       case "GETPREPAREMODULE_ATTEMPT":
//           return {
//               ...state,
//               isFetching: true
//           }
//       case "GETPREPAREMODULE_SUCCEEDED":
//           return {
//               ...state,
//               ...INITIAL_STATE,
//               isFetching: false,
//               isLoggedIn: true,
//               availableModule: action.data[0].availableModule
//           }
//       case "GETPREPAREMODULE_FAILURE":
//           return {
//               ...state,
//               isFetching: false,
//               error: true
//           }
//       default:
//           return state
//   }
// }