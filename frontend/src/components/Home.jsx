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
      setCountryInfo(response.data[0]);
    } catch (error) {
      setError('Failed to fetch country data');
      setCountryInfo(null);
      console.error(error); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 p-4 text-center">
    <div className="mb-8 p-4 w-full max-w-2xl bg-indigo-600 rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold text-white">
        Bounce Insights Coding Challenge
      </h1>
    </div>
    <div className="text-2xl font-medium mb-4 text-gray-100 bg-indigo-600 p-2 rounded-md shadow">
      Please Enter Your Country
    </div>
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
      {error && <p className="text-white text-2xl mt-2">{error}</p>}

      {countryInfo && (
      <div className="mt-8 mb-8 p-5 bg-white text-gray-800 rounded-xl shadow-lg max-w-2xl w-full mx-auto">
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-3xl font-bold text-center">{countryInfo?.name?.common}</h2>
          <img src={countryInfo?.flags?.png} alt={`Flag of ${countryInfo?.name?.common}`} className="my-4 h-20"/>
        </div>
        <div className="border border-gray-300 rounded-lg">
          <div className="grid grid-cols-2 divide-y divide-gray-300">
            <p className="border-r p-2 font-semibold">Official Name:</p>
            <p className="p-2">{countryInfo?.name?.official}</p>

            <p className="border-r p-2 font-semibold">Capital:</p>
            <p className="p-2">{countryInfo?.capital}</p>

            <p className="border-r p-2 font-semibold">Region:</p>
            <p className="p-2">{countryInfo?.region}</p>

            <p className="border-r p-2 font-semibold">Subregion:</p>
            <p className="p-2">{countryInfo?.subregion}</p>

            <p className="border-r p-2 font-semibold">Languages:</p>
            <p className="p-2">{Object.values(countryInfo?.languages).join(', ')}</p>

            <p className="border-r p-2 font-semibold">Currencies:</p>
            <p className="p-2">
              {Object.entries(countryInfo?.currencies).map(([code, { name, symbol }]) => `${name} (${symbol})`).join(', ')}
            </p>

            <p className="border-r p-2 font-semibold">Population:</p>
            <p className="p-2">{countryInfo?.population?.toLocaleString()}</p>

            <p className="border-r p-2 font-semibold">Timezones:</p>
            <p className="p-2">{countryInfo?.timezones?.join(', ')}</p>

            <p className="border-r p-2 font-semibold">Continents:</p>
            <p className="p-2">{countryInfo?.continents?.join(', ')}</p>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default Home;
