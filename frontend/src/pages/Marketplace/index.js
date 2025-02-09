import './index.css';
import Frame from 'components/Card/Frame';
import { Fragment, useEffect, useState } from 'react';
import { getMarket } from './marketplaceClient'; // Ensure correct function is used

const Marketplace = () => {
  const [nfts, setNfts] = useState([]); // State to hold NFTs
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    const fetchMarketplace = async () => {
      try {
        const marketplaceData = await getMarket(); // Fetch marketplace data
        console.log("Fetched Marketplace Data:", marketplaceData);

        if (!marketplaceData?.data || !Array.isArray(marketplaceData.data)) {
          throw new Error("Invalid data format received.");
        }

        setNfts(marketplaceData.data.map((item) => ({
          id: item?.assetid || "N/A",
          imageUrl: "https://picsum.photos/200/300",
          title: item?.assetname || "Unnamed NFT",
          description: item?.assetdescription || "No description available",
          price: item?.assetcost ? `${item.assetcost} ETH` : "Price unavailable",
          owner: item?.seller || "Unknown Owner",
          source: "marketplace"
        }))); // Set fetched data
      } catch (err) {
        console.error("Error fetching marketplace:", err);
        setError('Failed to load marketplace. Please try again later.');
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };

    fetchMarketplace(); // Fetch data on mount
  }, []); // Run only once on component mount

  return (
    <Fragment>
      <div className="marketplace">
        <h1 className="marketplace__heading">Marketplace</h1>
        <div className="marketplace__content">
          {loading ? (
            <p>Loading...</p> // Show loading message
          ) : error ? (
            <p className="error">{error}</p> // Show error message
          ) : nfts.length === 0 ? (
            <p>No NFTs available in your marketplace.</p> // Show empty marketplace message
          ) : (
            <div className="marketplace__card-grid">
              {nfts.map((nft) => (
                <div key={nft.id} className="marketplace__card">
                  <Frame {...nft} />
                  <button 
                    className="marketplace__action-button" 
                    onClick={() => console.log(`Processing purchase for NFT ID: ${nft.id}`)}
                  >
                    Buy Now
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

export default Marketplace;