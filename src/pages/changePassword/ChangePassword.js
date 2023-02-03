import "./ChangePassword.scss";
import Card from "../../components/card/Card";
import styles from "../auth/auth.module.scss";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { useEffect, useState } from "react";
import PageMenu from "../../components/pageMenu/PageMenu";
import PasswodInput from "../../components/passwordInput/PasswodInput";
import UseRedirectSession from "../../customHook/UseRedirectSession";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  changePassword,
  logout,
  RESET,
} from "../../redux/features/auth/authSlice";
import { Spinner } from "../../components/loading/Loader";
import { sendAutoMail } from "../../redux/features/email/emailSlice";

const initialState = {
  oldPassword: "",
  password: "",
  password2: "",
};
const ChangePassword = () => {
  const [formData, setFormData] = useState(initialState);
  UseRedirectSession("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timesIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <BsCheck2All color="green" size={15} />;

  const { oldPassword, password, password2 } = formData;
  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [pLength, setPLength] = useState(false);
  const { isLoading, user } =
    useSelector((state) => state.auth);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    }
    return timesIcon;
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !password2 || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be greater than 5 characters");
    }

    if (password !== password2) {
      return toast.error("Passwords do not match");
    }
    const userData = {
      oldPassword,
      password,
    };
    const emailData = {
      subject: "Password Changed - JAY:AUTH",
      send_to: user.email,
      reply_to: "noreply@gmail.com",
      template: "changePassword",
      url:"/forgot"
    }
    await dispatch(changePassword(userData));
    await dispatch(sendAutoMail(emailData));
    await dispatch(logout());
    await dispatch(RESET(userData));
    navigate("/login");
  };
  return (
    <>
      <section className="container">
        <PageMenu />
        <h2 className="--flex-center">Change Password</h2>
        <div className="--flex-center change-password">
          <Card cardClass={"card"}>
            <>
              <form onSubmit={updatePassword}>
                <p>
                  <label>Current Password</label>
                  <PasswodInput
                    placeholder="Current Password"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <label>New Password:</label>
                  <PasswodInput
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <label>Confirm New Password:</label>
                  <PasswodInput
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={handleInputChange}
                  />
                </p>
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
                {isLoading ? (
                  <Spinner />
                ) : (
                  <button type="submit" className="--btn --btn-danger --btn-block">
                    Change Password
                  </button>
                )}
              </form>
            </>
          </Card>
        </div>
      </section>
    </>
  );
};

export default ChangePassword;
