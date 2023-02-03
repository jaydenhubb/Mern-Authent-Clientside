import axios from "axios";
import { API_URL } from "../auth/authService";



// Send automated email

const sendAutoMail = async (emailData) => {
    const response = await axios.post(API_URL + "sendMail", emailData);
    return response.data.message;
  };

const emailService = {
    sendAutoMail
}

export default emailService