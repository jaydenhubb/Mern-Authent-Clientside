import React, { useState, useEffect } from "react";
import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { GrInsecure } from "react-icons/gr";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { loginWithCode, RESET } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loading/Loader";

const CodeLogin = () => {
  const [loginCode, setLoginCode] = useState("");
  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedin, isSuccess } = useSelector(
    (state) => state.auth
  );
  const sendUserLogincode = async()=>{
    await dispatch(sendUserLogincode(email))
    await dispatch(RESET())
  }

  const loginUserWithCode = async (e) => {
    e.preventDefault();
    if (!loginCode) {
      return toast.error("Please enter the login code");
    }
    if (loginCode.length !== 6) {
      return toast.error("Login code must be 8 characters");
    }

    const code = { loginCode };
    await dispatch(loginWithCode({ code, email }));
  };

  useEffect(() => {
    if (isSuccess && isLoggedin) {
      navigate("/profile");
    }

    dispatch(RESET());
  }, [isLoggedin, isSuccess, dispatch, navigate]);
  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader/>}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <GrInsecure size={35} color="#999" />
          </div>
          <h2>Enter Access Code</h2>

          <form onSubmit={loginUserWithCode}>
            <input
              type="text"
              placeholder="Access Code"
              required
              name="accessCode "
              value={loginCode}
              onChange={(e) => setLoginCode(e.target.value)}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Proceed To Login
            </button>
            <span className="--flex-center">
              Check your email for login access code
            </span>
            <div className={styles.links}>
              <p>
                <Link to="/">-Home</Link>
              </p>
              <p onClick = {sendUserLogincode} className="v-link --color-primary">
                <b>Resend Code</b>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default CodeLogin;
