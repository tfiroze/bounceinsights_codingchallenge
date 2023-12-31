const supertest = require('supertest');
const app = require('../server');

describe('GET /api/countries/:name', () => {
  it('should fetch country data', async () => {
    const countryName = 'finland';
    await supertest(app)
      .get(`/api/countries/${countryName}`)
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);

        const country = response.body[0];
        expect(country).toHaveProperty('name');
        expect(country).toHaveProperty('capital');
        expect(country.name).toHaveProperty('common', 'Finland'); // Confirm that Finland's data is fetched
      });
  });

  it('should handle non-existent country', async () => {
    const countryName = 'nonexistentcountry';
    await supertest(app)
      .get(`/api/countries/${countryName}`)
      .expect(500)
      .then((response) => {
        expect(response.text).toEqual('An error occurred while fetching country data');
      });
  });
});
