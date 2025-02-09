import './index.css';
import Frame from 'components/Card/Frame';
import { Fragment } from 'react';

const Inventory = () => {
  const nfts = [
    {
      id: 1,
      imageUrl: "https://picsum.photos/400/600?random=1",
      title: "Digital Art #1",
      description: "A unique digital art piece",
      price: "0.5 ETH",
      owner: "0x742...4832",
      source: "inventory"
    },
    {
      id: 2,
      imageUrl: "https://picsum.photos/400/600?random=2",
      title: "Cyber Knight",
      description: "Legendary cyber collection",
      price: "1.2 ETH",
      owner: "0x742...4832",
      source: "inventory"
    },
    {
      id: 3,
      imageUrl: "https://picsum.photos/400/600?random=3",
      title: "Abstract Mind",
      description: "Part of Abstract collection",
      price: "0.8 ETH",
      owner: "0x742...4832",
      source: "inventory"
    },
    {
      id: 4,
      imageUrl: "https://picsum.photos/400/600?random=4",
      title: "Digital Art #2",
      description: "Unique digital creation",
      price: "0.3 ETH",
      owner: "0x742...4832",
      source: "inventory"
    },
    {
      id: 5,
      imageUrl: "https://picsum.photos/400/600?random=5",
      title: "Cyber World",
      description: "Digital landscape art",
      price: "0.6 ETH",
      owner: "0x742...4832",
      source: "inventory"
    },
    {
      id: 6,
      imageUrl: "https://picsum.photos/400/600?random=6",
      title: "Mind Space",
      description: "Abstract art collection",
      price: "0.9 ETH",
      owner: "0x742...4832",
      source: "inventory"
    }
  ];

  return (
    <Fragment>
      <div className="inventory">
        <div className="inventory__content">
          <div className="inventory__card-grid">
            {nfts.map((nft) => (
              <Frame key={nft.id} {...nft} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Inventory;
