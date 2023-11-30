const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all routes

// Get country information
app.get('/api/countries/:name', async (req, res) => {
  const countryName = req.params.name;

  try {
    // Make a request to the REST Countries API
    const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
    // Send the response data back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching country data');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
