import React from "react";
import ProfilePic from "./ProfilePic";
import ProfileInfo from "./ProfileInfo";

const Profile = ({ owner }) => {
    return (
        <div className="profile">
            <ProfilePic />
            <ProfileInfo owner={owner} />
        </div>
    );
};

export default Profile;