class Sighting {
    constructor(id, species, location, time, photos = []) {
        this.id = id;
        this.species = species;
        this.location = location;
        this.time = time;
        this.photos = photos;
    }
}

class Statistics {
    constructor(mostCommonSpecies, hotspots, totalSightings) {
        this.mostCommonSpecies = mostCommonSpecies;
        this.hotspots = hotspots;
        this.totalSightings = totalSightings;
    }
}

class ErrorResponse {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
}

module.exports = { Sighting, Statistics, ErrorResponse };