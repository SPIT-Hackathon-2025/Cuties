import './index.css';
import { useLocation, useParams } from 'react-router-dom';
import { Fragment } from 'react';

const NFTDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { imageUrl, title, description, price, owner, source } = state || {};
  
  // Check if user came from inventory or marketplace
  const isFromInventory = state?.source === 'inventory';

  return (
    <Fragment>
      <div className="nft-detail">
        <div className="nft-detail__transaction-header">
          <h1 className="nft-detail__transaction-title">
            Transaction: NFTTransfer/AssetTransfer
          </h1>
          <div className="nft-detail__coins">500 EXcoins</div>
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
                  <span className="nft-detail__stat-value">Level 5</span>
                </div>
                <div className="nft-detail__stat-item">
                  <span className="nft-detail__stat-label">Achievements</span>
                  <span className="nft-detail__stat-value">12 Badges</span>
                </div>
                <div className="nft-detail__stat-item">
                  <span className="nft-detail__stat-label">Contribution</span>
                  <span className="nft-detail__stat-value">789 Points</span>
                </div>
              </div>

              <button className="nft-detail__button">
                {isFromInventory ? 'Complete Sell' : 'Buy Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NFTDetail;