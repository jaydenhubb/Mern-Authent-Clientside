import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Validate email
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const API_URL = `${BACKEND_URL}/api/users/`;

// Register user

const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  return response.data;
};
// Login user

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};
// Logout user

const logout = async () => {
  const response = await axios.get(API_URL + "logout");
  return response.data.Message;
};

// Login status
const getLoginStatus = async () =>{
    const response = await axios.get(API_URL + "loginStatus")
    return response.data
}
// Get User Profile
const getUser = async () =>{
    const response = await axios.get(API_URL + "getUser")
    return response.data
}
// Update Profile
const updateProfile = async (userData) =>{
    const response = await axios.patch(API_URL + "updateUser", userData)
    return response.data
}
// Send Verification mail
const sendVmail = async () =>{
    const response = await axios.post(API_URL + "sendVMail",)
    return response.data.Message
}
// Verify User
const verifyUser = async (verificationToken) =>{
    const response = await axios.patch(API_URL + `verifyUser/${verificationToken}`,)
    return response.data.message
}
// Change Password
const changePassword = async (userData) =>{
    const response = await axios.patch(API_URL + "changePassword" , userData)
    return response.data.message
}
// forgot Password
const forgotPassword = async (userData) =>{
    const response = await axios.post(API_URL + "forgotPassword" , userData)
    return response.data.Message
}
// Reset Password
const resetPassword = async (userData, resetToken) =>{
    const response = await axios.patch(`${API_URL}resetPassword/${resetToken}`, userData)
    return response.data.message
}
// Get Users
const getUsers = async () =>{
    const response = await axios.get(API_URL + "getUsers")
    return response.data
}
// Delete Users
const deleteUser = async (id) =>{
    const response = await axios.delete(API_URL + id)
    return response.data.message
}
// Upgrade Users
const upgradeUser = async (userData) =>{
    const response = await axios.post(API_URL + "upgradeUser", userData)
    return response.data.message
}
// send login code 
const sendLoginCode = async (email) =>{
    const response = await axios.post(API_URL + `sendLoginCode/${email}`)
    return response.data.message
}
// LoginWithCode
const loginWithCode = async (code, email) =>{
    const response = await axios.post(API_URL + `loginWithCode/${email}`, code)
    return response.data
}
// loginWithGoogle
const loginWithGoogle = async (userToken) =>{
    const response = await axios.post(API_URL + "google/callback", userToken)
    return response.data
}

const authService = {
  register,
  login,
  logout,
  getLoginStatus, 
  getUser,
  updateProfile,
  sendVmail,
  verifyUser,
  changePassword,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  upgradeUser,
  sendLoginCode,
  loginWithCode, 
  loginWithGoogle
};
export default authService;
