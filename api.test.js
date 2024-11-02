const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('../src/routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

describe('Wildlife Sightings API', () => {
    let sightingId;

    // Test for submitting a new wildlife sighting
    it('should submit a new wildlife sighting', async () => {
        const response = await request(app)
            .post('/api/sightings')
            .send({
                species: 'Bald Eagle',
                location: 'Yellowstone National Park',
                time: '2023-10-01T14:30:00Z',
                photos: ['https://example.com/photos/sighting-12345.jpg']
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.species).toBe('Bald Eagle');
        sightingId = response.body.id; // Store the ID for later tests
    });

    // Test for retrieving a list of recent sightings
    it('should retrieve a list of recent sightings', async () => {
        const response = await request(app).get('/api/sightings');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test for getting sightings by species
    it('should get sightings for a specific species', async () => {
        const response = await request(app).get('/api/sightings/Bald%20Eagle');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0].species).toBe('Bald Eagle');
    });

    // Test for retrieving statistics about sightings
    it('should retrieve statistics about sightings', async () => {
        const response = await request(app).get('/api/statistics');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('mostCommonSpecies');
        expect(response.body).toHaveProperty('hotspots');
        expect(response.body).toHaveProperty('totalSightings');
    });

    // Test for removing a sighting report
    it('should remove a sighting report', async () => {
        const response = await request(app).delete(`/api/sightings/${sightingId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('text', 'deleted!');
    });

    // Test for trying to get a non-existent sighting
    it('should return 404 for a non-existent sighting', async () => {
        const response = await request(app).get('/api/sightings/non-existent-id');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('code', 404);
    });
});