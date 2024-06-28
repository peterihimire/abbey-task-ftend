import React, { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";

import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { getUserInfo } from "../../redux/features/users/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeftBar: React.FC = () => {
  // const { currentUser } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  // Fetch user info when component mounts
  const [logging, setLogging] = useState(false);
  const [error, setError] = useState("");

  const fetchUserInfo = async () => {
    try {
      const response = await dispatch(getUserInfo());
      console.log("This is user return value", response);
      if (response.payload.status === "success") {
        toast.success(`${response.payload.msg}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setLogging(false);
        // setTimeout(() => {
        //   // navigate("/");
        // }, 3000);
      } else {
        toast.error(response.payload.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLogging(false);
      }
    } catch (err: any) {
      console.log("Will this error log...", err);
      setLogging(false);
      setError(err.data.errors);
      console.error("Failed to fetch user info: ", error);
    } finally {
      setLogging(false);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, [dispatch]);

  // Get current user from Redux store
  const currentUser = useAppSelector((state: RootState) => state.user);

  console.log("Yeah, current whatttt USER", currentUser);

  // if (!currentUser) {
  //   return null; // Optionally, you can show a loading spinner here
  // }

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            {/* <img src={currentUser.profilePic} alt="" />
            <span>{currentUser.name}</span> */}
          </div>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Events} alt="" />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="" />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Videos} alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <span>Messages</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Fund} alt="" />
            <span>Fundraiser</span>
          </div>
          <div className="item">
            <img src={Tutorials} alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="" />
            <span>Courses</span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LeftBar;
