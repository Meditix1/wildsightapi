const express = require('express');
const { Sighting, Statistics, ErrorResponse } = require('./models');

const router = express.Router();
let sightings = []; // In-memory storage

// Submit a new wildlife sighting
router.post('/sightings', (req, res) => {
    const { species, location, time, photos } = req.body;
    const id = `${sightings.length + 1}`;
    const newSighting = new Sighting(id, species, location, time, photos);
    sightings.push(newSighting);
    res.status(201).json(newSighting);
});

// Retrieve a list of recent sightings
router.get('/sightings', (req, res) => {
    res.status(200).json(sightings);
});

// Get sightings for a specific species
router.get('/sightings/:species', (req, res) => {
    const { species } = req.params;
    const filteredSightings = sightings.filter(s => s.species === species);
    if (filteredSightings.length === 0) {
        return res.status(404).json(new ErrorResponse(404, 'Species not found'));
    }
    res.status(200).json(filteredSightings);
});

// Retrieve statistics about sightings
router.get('/statistics', (req, res) => {
    if (sightings.length === 0) {
        return res.status(404).json(new ErrorResponse(404, 'No sightings found'));
    }
    const mostCommonSpecies = sightings.reduce((acc, sighting) => {
        acc[sighting.species] = (acc[sighting.species] || 0) + 1;
        return acc;
    }, {});
    const mostCommon = Object.keys(mostCommonSpecies).reduce((a, b) => mostCommonSpecies[a] > mostCommonSpecies[b] ? a : b);
    const hotspots = [...new Set(sightings.map(s => s.location))];
    const totalSightings = sightings.length;

    const stats = new Statistics(mostCommon, hotspots, totalSightings);
    res.status(200).json(stats);
});

// Delete a sighting report
router.delete('/sightings/:id', (req, res) => {
    const { id } = req.params;
    const index = sightings.findIndex(s => s.id === id);
    if (index === -1) {
        return res.status(404).json(new ErrorResponse(404, 'Sighting not found'));
    }
    sightings.splice(index, 1);
    res.status(200).json({ text: 'deleted!' });
});

// Test route
router.get('/hi', (req, res) => {
    res.status(200).json({ text: 'Hello world!' });
});

module.exports = router;