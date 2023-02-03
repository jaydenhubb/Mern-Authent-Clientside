import React from "react";
import { useDispatch } from "react-redux";
import {
  RESET,
  sendVmail,
} from "../../redux/features/auth/authSlice";
import "./Notification.scss";

const Notification = () => {
  const dispatch = useDispatch();

  const sendVEmail = async () => {
    await dispatch(sendVmail());
    await dispatch(RESET());
  };

  return (
    <div className="container">
      <div className="alert">
        <p>
          <b>Message:</b> &nbsp;
        </p>
        <p>
          A verification link has been sent, check your email.
          &nbsp;
        </p>
        <p className="v-link" onClick={sendVEmail}>
          <b>Resend Link?</b>
        </p>
      </div>
    </div>
  );
};

export default Notification;