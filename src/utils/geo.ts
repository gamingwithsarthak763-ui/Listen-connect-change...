/**
 * Geographic utility functions including Haversine formula and Geolocation API
 */

/**
 * Calculates great-circle distance between two points in Kilometers using the Haversine formula.
 */
export function calculateHaversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const rLat1 = toRad(lat1);
  const rLat2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rLat1) * Math.cos(rLat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  // Round to 1 decimal place (e.g. 2.4 km)
  return Math.round(d * 10) / 10;
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Estimated travel time based on distance (assuming urban relief dispatch speed of ~25 km/h + 5 min prep)
 */
export function estimateTravelTimeMinutes(distanceKm: number): number {
  if (distanceKm <= 0.1) return 3;
  const dispatchPrepMinutes = 5;
  const transitMinutes = Math.round((distanceKm / 25) * 60);
  return dispatchPrepMinutes + transitMinutes;
}

/**
 * Wraps browser navigator.geolocation in a Promise with timeout & options
 */
export interface GeoResult {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export function getCurrentUserCoordinates(): Promise<GeoResult> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser / आपका ब्राउज़र स्थान सेवा समर्थित नहीं करता है'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        let msg = 'Failed to get location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            msg = 'Location permission was denied. Please allow access in browser settings. / स्थान अनुमति अस्वीकृत हुई।';
            break;
          case error.POSITION_UNAVAILABLE:
            msg = 'Location information is unavailable. / स्थान की जानकारी उपलब्ध नहीं है।';
            break;
          case error.TIMEOUT:
            msg = 'Location request timed out. / स्थान अनुरोध का समय समाप्त हुआ।';
            break;
        }
        reject(new Error(msg));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    );
  });
}
