import React from "react";

const ProfileInfo = ({ owner }) => {
    return (
        <div className="profile-info">
            <span>Owned by </span>
            <span className="name">{owner}</span>
        </div>
    );
};

export default ProfileInfo;