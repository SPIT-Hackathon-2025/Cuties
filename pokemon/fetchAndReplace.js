import { MongoClient } from 'mongodb';

export async function getRandomAssetImage(username) {
    const client = new MongoClient('mongodb+srv://maazmalik2004:abenzene1234@dspace.odk45.mongodb.net/');

    try {
        await client.connect();
        const db = client.db('wagerverse');
        const collection = db.collection('userData');

        // Find the user and get their inventory
        const user = await collection.findOne({ username });
        
        if (!user || !user.inventory || user.inventory.length === 0) {
            throw new Error('User not found or has no assets');
        }

        // Filter out any empty objects or items without assetImage
        const validAssets = user.inventory.filter(item => 
            item && item.assetimage && item.assetimage.trim() !== ''
        );

        if (validAssets.length === 0) {
            throw new Error('No valid asset images found');
        }

        // Select a random asset image
        const randomIndex = Math.floor(Math.random() * validAssets.length);
        return validAssets[randomIndex].assetimage;

    } catch (error) {
        console.error('Error:', error);
        throw error;
    } finally {
        await client.close();
    }
}

// Example usage:
// import { getRandomAssetImage } from './getRandomAssetImage.js';

try {
    const randomImage = await getRandomAssetImage('User1');
    console.log('Random asset image URL:', randomImage);
} catch (error) {
    console.error('Error getting random asset:', error);
}