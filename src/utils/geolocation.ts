export const getGeolocation = (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(`Error getting location: ${error.message}`);
          }
        );
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  };
  