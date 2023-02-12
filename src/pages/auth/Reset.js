import React, { useState,useEffect } from "react";
import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { MdPassword } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import PasswodInput from "../../components/passwordInput/PasswodInput";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RESET, resetPassword } from "../../redux/features/auth/authSlice";


const initialState = {
  password: "",
  password2: "",
};


const Reset = () => {
  const [formData, setFormData] = useState(initialState);
  const {  password, password2 } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timesIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <BsCheck2All color="green" size={15} />;
  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [pLength, setPLength] = useState(false);
  const {  isSuccess, message } =
    useSelector((state) => state.auth);
  const {resetToken} = useParams()
    useEffect(() => {
      if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
        setUCase(true);
      } else {
        setUCase(false);
      }
      if (password.match(/([0-9])/)) {
        setNum(true);
      } else {
        setNum(false);
      }
      if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
        setSChar(true);
      } else {
        setSChar(false);
      }
      if (password.length > 5) {
        setPLength(true);
      } else {
        setPLength(false);
      }
    }, [password]);

    const switchIcon = (condition) => {
      if (condition) {
        return checkIcon;
      }
      return timesIcon;
    };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const reset = async(e) => {
    e.preventDefault();
    if ( !password2 || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be greater than 5 characters");
    }

    if (password !== password2) {
      return toast.error("Passwords do not match");
    }
    const userData = {
      password,
    };
    await dispatch(resetPassword({userData, resetToken}));
    navigate("/login");
  };
  useEffect(()=>{
    if(isSuccess && message.includes("Reset Successful")){
      navigate("/login")
    
    }
    dispatch(RESET());
  },[dispatch, navigate,  isSuccess, message]
  )
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>
          <h2>Reset Password</h2>

          <form onSubmit={reset}>
            <PasswodInput
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <PasswodInput
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />
             <Card cardClass={styles.group}>
                  <ul className="form-list">
                    <li>
                      <span className={styles.indicator}>
                        {switchIcon(uCase)} &nbsp; Lowercase & Uppercase
                      </span>
                    </li>
                    <li>
                      <span className={styles.indicator}>
                        {switchIcon(num)} &nbsp;Number (0-9)
                      </span>
                    </li>
                    <li>
                      <span className={styles.indicator}>
                        {switchIcon(sChar)} &nbsp;Special Character
                      </span>
                    </li>
                    <li>
                      <span className={styles.indicator}>
                        {switchIcon(pLength)} &nbsp;At least 6 Characters
                      </span>
                    </li>
                  </ul>
                </Card>

            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
            </button>
            <div className={styles.links}>
              <p>
                <Link to="/">-Home</Link>
              </p>
              <p>
                <Link to="/login">-Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Reset;
