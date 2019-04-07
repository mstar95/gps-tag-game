var options = {
    enableHighAccuracy: false,
    timeout: 30000,
    maximumAge: 0
};

const gps = () => new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
        (location) => resolve(mapLocation(location)),
        (error) => reject(error),
        options)
})

export default gps;

function mapLocation(location) {
    const {coords} = location
    return {lat: coords.latitude - 0.0361798, lng: coords.longitude - 0.0701858}
}