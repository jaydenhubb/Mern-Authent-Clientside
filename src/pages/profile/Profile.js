import "./Profile.scss";
import Card from "../../components/card/Card";
// import profimg from "../../assets/avatarr.png";
import { useEffect, useLayoutEffect, useState } from "react";
import PageMenu from "../../components/pageMenu/PageMenu";
import UseRedirectSession from "../../customHook/UseRedirectSession";
import { useSelector, useDispatch } from "react-redux";
import { getUser, selectUser, updateProfile } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loading/Loader";
import { toast } from "react-toastify";
import Notification from "../../components/notification/Notification";


export const shortenName = (name, n)=>{
  if(name.length > n){
    const shortenedname = name.substring(0, n).concat("...")
    return shortenedname
  }
  return name
}


const Profile = () => {
  UseRedirectSession("/login");

  const dispatch = useDispatch();
  const { isLoading,  user } = useSelector(
    (state) => state.auth
  );
  const cloudName = process.env.REACT_APP_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;
  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    photo: user?.photo || "",
    role: user?.role || "",
    isverified: user?.isVerified || false,
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImg, setProfileImg] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleImageChange = (e) => {
    setProfileImg(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    let imageURL;
    try {
      if (
        profileImg !== null &&
        (profileImg.type === "image/jpeg" ||
          profileImg.type === "image/jpg" ||
          profileImg.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImg);
        image.append("cloud_name", cloudName);
        image.append("upload_preset", uploadPreset);

        // save image to cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/blazejay/image/upload",
          { method: "POST", body: image }
        );
        const imgData = await response.json();
        console.log(imgData);
        imageURL = imgData.url.toString();
      }

      // Save to database
      const userData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImg ? imageURL : profile.photo,
      };
      dispatch(updateProfile(userData));
    } catch (err) {
      toast.error(err.message);
    }
  };

  useLayoutEffect(()=>{
    if(user){
      setProfile({
        ...profile, 
        name:user.name,
        email:user.email,
        phone:user.phone,
        photo:user.photo,
        role:user.role,
        bio:user.bio,
        isVerified:user.isVerified,
      })
    }
  },[user, setProfile,])
  return (
    <>
      {!profile.isVerified && <Notification/>}
      <section className="container">
        <PageMenu />
      {isLoading && <Loader />}
        <h2>Profile</h2>
        <div className="--flex-start profile">
          <Card cardClass={"card"}>
            {!isLoading && user && (
              <>
              <div className="profile-photo">
                <div>
                  <img
                    src={imagePreview === null ? user?.photo : imagePreview}
                    alt="profile pic"
                  />
                  <h3>Role: {profile?.role}</h3>
                </div>
              </div>
              <form onSubmit={saveProfile}>
                <p>
                  <label>Change Photo:</label>
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleImageChange}
                  />
                </p>
                <p>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={profile?.name}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={profile?.email}
                    onChange={handleInputChange}
                    disabled
                  />
                </p>
                <p>
                  <label>Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={profile?.phone}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <label>Bio:</label>
                  <textarea
                    name="bio"
                    value={profile?.bio}
                    onChange={handleInputChange}
                    cols="30"
                    rows="10"
                  ></textarea>
                </p>
                <button className="--btn --btn-primary --btn-block">
                  Update Profile
                </button>
              </form>
            </>
            )}
            
          </Card>
        </div>
      </section>
    </>
  );
};

export const UserName = ()=>{
  const user = useSelector(selectUser)
  const userName = user?.name || "..."

  return <p className="--color-white">Hi, {shortenName(userName, 8)} |</p>
}

export default Profile;
