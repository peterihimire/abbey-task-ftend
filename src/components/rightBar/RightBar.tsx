import React from "react";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../hooks/useTypedSelector";

import "./rightBar.scss";

const RightBar: React.FC = () => {
  const currentUser = useAppSelector((state: RootState) => state.user);

  const friendDetails = currentUser?.userData?.friends?.flatMap((friend) => ({
    fullname: friend?.friend?.fullname,
    email: friend?.friend?.email,
  }));

  const followerDetails = currentUser?.userData?.followers?.flatMap(
    (follower) => ({
      fullname: follower?.following?.fullname,
      email: follower?.following?.email,
    })
  );

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <span>Jane Doe</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <span>Jane Doe</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Friends</span>

          {friendDetails?.length === 0
            ? "No followers"
            : friendDetails?.map((friend, index) => (
                <div className="user" key={index}>
                  <div className="userInfo">
                    <img
                      src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      alt=""
                    />
                    <div className="online" />
                    <span>{friend?.fullname}</span>
                  </div>
                </div>
              ))}
        </div>
        <div className="item">
          <span>Followers</span>
          {followerDetails?.length === 0
            ? "No friends"
            : followerDetails?.map((followwer, index) => (
                <div className="user" key={index}>
                  <div className="userInfo">
                    <img
                      src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      alt=""
                    />
                    <p>
                      <span>{followwer?.fullname}</span>
                    </p>
                  </div>
                  <span>1 min ago</span>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
