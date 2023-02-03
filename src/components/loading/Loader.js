import "./Loader.scss";
import ReactDom from "react-dom";
import loaderImg from "../../assets/loader.gif";

const Loader = () => {
  return ReactDom.createPortal(
    <div className="wrapper">
      <div className="loader">
        <img src={loaderImg} alt="" />
      </div>
    </div>,
    document.getElementById("loader"),
  );
};

export const Spinner = () => {
  return (
    <div className="--center-all">
      <img src={loaderImg} alt="" />
    </div>
  );
};

export default Loader;
