import './index.css';
import Frame from 'components/Card/Frame';
import { Fragment } from 'react';

const Marketplace = () => {
  const nfts = [
    {
      id: 1,
      imageUrl: "https://picsum.photos/400/600?random=7",
      title: "Cyber Punk",
      description: "Limited edition digital art",
      price: "2.0 ETH",
      owner: "0x123...4567",
      source: "marketplace"
    },
    {
      id: 2,
      imageUrl: "https://picsum.photos/400/600?random=8",
      title: "Digital Dreams",
      description: "Exclusive NFT collection",
      price: "1.5 ETH",
      owner: "0x234...5678",
      source: "marketplace"
    },
    {
      id: 3,
      imageUrl: "https://picsum.photos/400/600?random=9",
      title: "Modern Art",
      description: "Contemporary digital piece",
      price: "0.8 ETH",
      owner: "0x345...6789",
      source: "marketplace"
    },
    {
      id: 4,
      imageUrl: "https://picsum.photos/400/600?random=10",
      title: "Cyber City",
      description: "Future city landscape",
      price: "1.8 ETH",
      owner: "0x456...7890",
      source: "marketplace"
    },
    {
      id: 5,
      imageUrl: "https://picsum.photos/400/600?random=11",
      title: "Digital Genesis",
      description: "First edition digital art",
      price: "2.5 ETH",
      owner: "0x567...8901",
      source: "marketplace"
    },
    {
      id: 6,
      imageUrl: "https://picsum.photos/400/600?random=12",
      title: "Neo Knight",
      description: "Futuristic warrior collection",
      price: "3.0 ETH",
      owner: "0x678...9012",
      source: "marketplace"
    }
  ];

  return (
    <Fragment>
      <div className="marketplace">
        <div className="marketplace__content">
          <div className="marketplace__card-grid">
            {nfts.map((nft) => (
              <Frame key={nft.id} {...nft} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Marketplace;
