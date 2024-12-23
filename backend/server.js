const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
const app = express();
const port = 3001;

// Enable CORS for all origins or specify the frontend URL (http://localhost:5173 for your React app)
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

app.post('/api/processOrder', async (req, res) => {
    try {
        const { selectedItems } = req.body;
        const productDetails = await fetchProductDetails(selectedItems);
        const packages = processOrderIntoPackages(productDetails);

        res.json({ packages });

    } catch (error) {
        console.error('Error processing the order:', error);
        res.status(500).send('Server error');
    }
});

// Function to fetch product details from another service or from your own database
async function fetchProductDetails(itemIds) {
    try {
        const productDetails = await axios.get('http://localhost:3001/api/products', {
            params: { itemIds: itemIds.join(',') }
        });

        return productDetails.data;
    } catch (error) {
        console.error('Error fetching product details:', error);
        throw new Error('Could not fetch product details');
    }
}

function processOrderIntoPackages(products) {
    const packages = [];

    let package = {
        items: [],
        totalWeight: 0,
        totalPrice: 0,
        courierCharge: 10
    };

    products.forEach(product => {
        if (package.totalPrice + product.price <= 250 && package.totalWeight + product.weight <= 1000) {
            // Add the product to the current package
            package.items.push(product.name);
            package.totalWeight += product.weight;
            package.totalPrice += product.price;
        } else {
            // Start a new package
            packages.push(package);
            package = {
                items: [product.name],
                totalWeight: product.weight,
                totalPrice: product.price,
                courierCharge: 10
            };
        }
    });

    if (package.items.length > 0) {
        packages.push(package);
    }

    return packages;
}

app.get('/api/products', (req, res) => {
    const products = [
        { id: 1, name: "Item 1", price: 10, weight: 200 },
        { id: 2, name: "Item 2", price: 100, weight: 20 },
        { id: 3, name: "Item 3", price: 30, weight: 300 },
        { id: 4, name: "Item 4", price: 20, weight: 500 },
        { id: 5, name: "Item 5", price: 30, weight: 250 },
        { id: 6, name: "Item 6", price: 40, weight: 10 },
        { id: 7, name: "Item 7", price: 200, weight: 10 },
        { id: 8, name: "Item 8", price: 120, weight: 500 },
        { id: 9, name: "Item 9", price: 130, weight: 790 },
        { id: 10, name: "Item 10", price: 20, weight: 100 },
        { id: 11, name: "Item 11", price: 10, weight: 340 },
        { id: 12, name: "Item 12", price: 4, weight: 800 },
        { id: 13, name: "Item 13", price: 5, weight: 200 },
        { id: 14, name: "Item 14", price: 240, weight: 20 },
        { id: 15, name: "Item 15", price: 123, weight: 700 },
        { id: 16, name: "Item 16", price: 245, weight: 10 },
        { id: 17, name: "Item 17", price: 230, weight: 20 },
        { id: 18, name: "Item 18", price: 110, weight: 200 },
        { id: 19, name: "Item 19", price: 45, weight: 200 },
        { id: 20, name: "Item 20", price: 67, weight: 20 },
        { id: 21, name: "Item 21", price: 88, weight: 300 },
        { id: 22, name: "Item 22", price: 10, weight: 500 },
        { id: 23, name: "Item 23", price: 17, weight: 250 },
        { id: 24, name: "Item 24", price: 19, weight: 10 },
        { id: 25, name: "Item 25", price: 89, weight: 10 },
        { id: 26, name: "Item 26", price: 45, weight: 500 },
        { id: 27, name: "Item 27", price: 99, weight: 790 },
        { id: 28, name: "Item 28", price: 125, weight: 100 },
        { id: 29, name: "Item 29", price: 198, weight: 340 },
        { id: 30, name: "Item 30", price: 220, weight: 800 },
        { id: 31, name: "Item 31", price: 249, weight: 200 },
        { id: 32, name: "Item 32", price: 230, weight: 20 },
        { id: 33, name: "Item 33", price: 190, weight: 700 },
        { id: 34, name: "Item 34", price: 45, weight: 10 },
        { id: 35, name: "Item 35", price: 12, weight: 20 },
        { id: 36, name: "Item 36", price: 5, weight: 200 },
        { id: 37, name: "Item 37", price: 2, weight: 200 },
        { id: 38, name: "Item 38", price: 90, weight: 20 },
        { id: 39, name: "Item 39", price: 12, weight: 300 },
        { id: 40, name: "Item 40", price: 167, weight: 500 },
        { id: 41, name: "Item 41", price: 12, weight: 250 },
        { id: 42, name: "Item 42", price: 8, weight: 10 },
        { id: 43, name: "Item 43", price: 2, weight: 10 },
        { id: 44, name: "Item 44", price: 9, weight: 500 },
        { id: 45, name: "Item 45", price: 210, weight: 790 },
        { id: 46, name: "Item 46", price: 167, weight: 100 },
        { id: 47, name: "Item 47", price: 23, weight: 340 },
        { id: 48, name: "Item 48", price: 190, weight: 800 },
        { id: 49, name: "Item 49", price: 199, weight: 200 },
        { id: 50, name: "Item 50", price: 12, weight: 20 }
    ];

    res.json(products);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
