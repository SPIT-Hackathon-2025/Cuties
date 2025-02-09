import React from "react";
//ßimport ProfilePic from "./ProfilePic";
import ProfileInfo from "./ProfileInfo";

const Profile = ({ owner }) => {
    return (
        <div className="profile">
            
            <ProfileInfo owner={owner} />
        </div>
    );
};

export default Profile;