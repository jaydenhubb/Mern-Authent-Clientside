import "./UserStats.scss";
import InfoBox from "../infoBox/InfoBox";
import { FaUsers } from "react-icons/fa";
import { BiUserCheck, BiUserMinus, BiUserX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Calc_suspended_Users, Calc_Verified_Users } from "../../redux/features/auth/authSlice";


const icon1 = <FaUsers size={40} color="#fff" />;
const icon2 = <BiUserCheck size={40} color="#fff" />;
const icon3 = <BiUserMinus size={40} color="#fff" />;
const icon4 = <BiUserX size={40} color="#fff" />;

const UserStats = () => {

  const { users, verifiedUsers, suspendedUsers } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(Calc_Verified_Users())
    dispatch(Calc_suspended_Users())
  },[dispatch, users])
  return (
    <div className="user-summary">
      <h3 className="--mt">User Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={icon1}
          title={"Total Users"}
          count={users.length}
          bgColor="card1"
        />
        <InfoBox
          icon={icon2}
          title={"Verified Users"}
          count={verifiedUsers}
          bgColor="card2"
        />
        <InfoBox
          icon={icon3}
          title={"Unverified Users"}
          count={users.length-verifiedUsers}
          bgColor="card3"
        />
        <InfoBox
          icon={icon4}
          title={"Suspended Users"}
          count={suspendedUsers}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default UserStats;
