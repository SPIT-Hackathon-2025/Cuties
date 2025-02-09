import './index.css';
import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { appendTransaction } from './client';

const NFTDetail = (props) => {
  // Merge any props passed from the router's location state with the original props.
  // This ensures that the "source" value (and any other NFT data) is preserved.
  const location = useLocation();
  const data = { ...props, ...location.state };

  const { 
    id, 
    imageUrl, 
    title, 
    description, 
    price, 
    owner, 
    source, 
    exCoins, 
    skills, 
    achievements, 
    contribution 
  } = data;
  
  // Determine if this NFT is from inventory
  const isFromInventory = source === 'inventory';

  const handleButtonClick = async () => {
    if (isFromInventory) {
      console.log("Initiating sell process for NFT ID:", id);
      const transaction = {
        type: "AssetTransfer",
        amount: 4321,
        seller: "selfseller",
        buyer: "somebuyer"
      };
      console.log(transaction);
      await appendTransaction(transaction);
      // Add logic to complete the sell transaction
    } else {
      const transaction = {
        type: "AssetTransfer",
        amount: 1234,
        seller: "owner",
        buyer: "selfbuyer"
      };
      console.log(transaction);
      console.log("Processing purchase for NFT ID:", id);
      // Add logic to handle the NFT purchase
      await appendTransaction(transaction);
    }
  };

  return (
    <Fragment>
      <div className="nft-detail">
        <div className="nft-detail__transaction-header">
          <h1 className="nft-detail__transaction-title">
            Transaction: NFTTransfer/AssetTransfer
          </h1>
          <div className="nft-detail__coins">{exCoins || "500 EXcoins"}</div>
        </div>

        <div className="nft-detail__container">
          <div className="nft-detail__content">
            <div className="nft-detail__image-section">
              <img 
                src={imageUrl || "https://picsum.photos/800/800"}
                alt={title || "NFT"} 
                className="nft-detail__image"
              />
            </div>
            <div className="nft-detail__info-section">
              <div className="nft-detail__header">
                <h1 className="nft-detail__title">{title || "Cosmic Dragon #1337"}</h1>
                <div className="nft-detail__price">{price || "250 EXcoins"}</div>
              </div>
              
              <div className="nft-detail__ownership">
                <h2 className="nft-detail__subtitle">Asset Ownership</h2>
                <div className="nft-detail__address">
                  {owner || "0x503Ac69a87e4143c247018c8b28514863DC7fb52"}
                </div>
              </div>

              <div className="nft-detail__stats">
                <div className="nft-detail__stat-item">
                  <span className="nft-detail__stat-label">Skills</span>
                  <span className="nft-detail__stat-value">{skills || "Level 5"}</span>
                </div>
                <div className="nft-detail__stat-item">
                  <span className="nft-detail__stat-label">Achievements</span>
                  <span className="nft-detail__stat-value">{achievements || "12 Badges"}</span>
                </div>
                <div className="nft-detail__stat-item">
                  <span className="nft-detail__stat-label">Contribution</span>
                  <span className="nft-detail__stat-value">{contribution || "789 Points"}</span>
                </div>
              </div>

              <button 
                className="nft-detail__button" 
                onClick={handleButtonClick}
              >
                {isFromInventory ? 'Sell Now' : 'Buy Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NFTDetail;