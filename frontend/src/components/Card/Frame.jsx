import React from "react";
import { useNavigate } from "react-router-dom";
import Pic from "./product/Pic";
import Text from "./product/Text";
import Profile from "./profile/Profile";

const Frame = ({ imageUrl, title, description, price, owner, id, source }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/nft/${id}`, { 
            state: { 
                imageUrl, 
                title, 
                description, 
                price, 
                owner,
                id,
                source
            } 
        });
    };

    return (
        <div 
            className="frame" 
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            style={{ cursor: 'pointer' }}
        >
            <Pic source={imageUrl || "./assets/volkihar-slide-3.jpg"} />
            <Text 
                title={title || "NFT Title"} 
                description={description || "Description"} 
                price={price || "0.1 ETH"}
            />
            <Profile owner={owner || "Anonymous"} />
        </div>
    );
};

export default Frame;