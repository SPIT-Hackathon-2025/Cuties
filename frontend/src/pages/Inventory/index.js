import './index.css';
import Frame from 'components/Card/Frame';
import { Fragment, useEffect, useState } from 'react';
import { getInventory } from './marketplaceClient';

const Inventory = () => {
  const [nfts, setNfts] = useState([]); // State to hold NFTs
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    const fetchInventory = async (username) => {
      try {
        const inventoryData = await getInventory(username); // Fetch inventory data
        console.log(inventoryData); // Log the fetched data for debugging
        
        setNfts(
          inventoryData.data.map((item) => ({
            id: item.assetid,
            imageUrl: "https://picsum.photos/200/300",
            title: item.assetname,
            description: item.assetdescription,
            price: item.assetcost + " ETH",
            owner: item.seller,
            source: "inventory", 
          }))
        ); 
      } catch (err) {
        setError('Failed to load inventory.'); // Handle error
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchInventory("User3"); // Call the function to fetch data
  }, []); // Empty dependency array to run only on mount

  return (
    <Fragment>
      <div className="inventory">
        <h1 className="inventory__heading">Inventory</h1>
        <div className="inventory__content">
          {loading ? (
            <p>Loading...</p> // Show loading message
          ) : error ? (
            <p>{error}</p> // Show error message
          ) : nfts.length === 0 ? (
            <p>No NFTs available in your inventory.</p> // Show no data message
          ) : (
            <div className="inventory__card-grid">
              {nfts.map((nft) => (
                <div key={nft.id} className="inventory__card">
                  <Frame {...nft} />
                  <button 
                    className="inventory__action-button" 
                    onClick={() => console.log(`Initiating sell process for NFT ID: ${nft.id}`)}
                  >
                    Sell
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Inventory;