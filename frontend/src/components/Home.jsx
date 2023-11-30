import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [country, setCountry] = useState('');
  const [countryInfo, setCountryInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setCountry(e.target.value);
  };

  const handleButtonClick = async () => {
    setError('');
    setLoading(true);
    try {
      const response = await axios.get(`https://backend-bounceinsights-codingchallenge.onrender.com/api/countries/${country}`);
      console.log(response.data)
      setCountryInfo(response.data[0]);
    } catch (error) {
      setError('Failed to fetch country data');
      setCountryInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 p-4 text-center">
      <h1 className="text-5xl font-bold mb-6">
        Hello, welcome to the Bounce Insights Coding Challenge!
      </h1>
      <p className="text-xl mb-4">Please Enter Your Country</p>
      <div className="flex flex-wrap justify-center items-center gap-4">
        <input
          type="text"
          value={country}
          onChange={handleInputChange}
          placeholder="Enter a country name"
          className="px-4 py-2 w-72 leading-tight text-gray-700 bg-white/80 border border-gray-300 rounded focus:outline-none focus:border-pink-300"
        />
        <button
          onClick={handleButtonClick}
          className="px-6 py-2 bg-pink-300 text-white font-bold rounded hover:bg-pink-400 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Go'}
        </button>
      </div>
      {error && <p className="text-white mt-2">{error}</p>}
      {countryInfo && (
        <div className="mt-8 bg-white text-gray-800 rounded-xl shadow-lg max-w-2xl w-full overflow-hidden">
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-2 text-gray-800">{countryInfo?.name?.common}</h2>
      <div className="text-gray-700">
        <p className="mb-1"><strong>Official Name:</strong> {countryInfo?.name?.official}</p>
        <p className="mb-1"><strong>Capital:</strong> {countryInfo?.capital}</p>
        <p className="mb-1"><strong>Region:</strong> {countryInfo?.region}</p>
        <p className="mb-1"><strong>Subregion:</strong> {countryInfo?.subregion}</p>
        <p className="mb-1"><strong>Languages:</strong> {Object.values(countryInfo?.languages).join(', ')}</p>
        <p className="mb-1"><strong>Currencies:</strong> {Object.entries(countryInfo?.currencies).map(([code, { name, symbol }]) => `${name} (${symbol})`).join(', ')}</p>
        <p className="mb-1"><strong>Population:</strong> {countryInfo?.population?.toLocaleString()}</p>
        <p className="mb-1"><strong>Timezones:</strong> {countryInfo?.timezones?.join(', ')}</p>
        <p className="mb-1"><strong>Continents:</strong> {countryInfo?.continents?.join(', ')}</p>
      </div>
    </div>
    <div className="p-5 border-t border-gray-200">
      <img src={countryInfo?.flags?.png} alt={`Flag of ${countryInfo?.name?.common}`} className="mx-auto h-20"/>
    </div>
  </div>
    )}
    </div>
  );
}

export default Home;
