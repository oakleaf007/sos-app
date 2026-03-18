
import { createContext, useContext, useEffect, useRef, useState } from "react";


const LocationContext = createContext();


export function LocationProvider({ children }) {

    
     const hasFetched = useRef(false);
    const nearByUrl =`http://localhost:4000/api/v1/nearbyfetch`;

    const [location, setLocation] = useState(null);
    // const [ipLocation, setIpLocation] = useState(null);
    const [locationStatus, setLocationStatus] = useState("");
    const [nearby, setNearby] = useState({
        hospitals: [],
        police: [],
        fuel: [],
        fire:[]
    });

    useEffect(() => {
        let watchId;
        // getting location permission
        async function checkLocationPermission() {
            if (!navigator.permissions) return "unknown";
            const res = await navigator.permissions.query({ name: "geolocation" });
            return res.state;

        }

        navigator.permissions?.query({ name: "geolocation" }).then(permission => {

            permission.onchange = () => {

                if (permission.state === "denied") {
                    setLocationStatus("location permission denied");
                    if (watchId) {
                        navigator.geolocation.clearWatch(watchId);
                        watchId = null;
                    }
                }

                if (permission.state === "granted") {
                    setLocationStatus("");
                    getGpsLocation();
                }

            };

        });

        // checking the location permission

        async function checkGPS() {

            const permission = await checkLocationPermission();

            if (permission === "denied") {
                setLocationStatus("location permission denied");
                return false;
            }
            return true;


        }
   

        async function getGpsLocation() {
            if (watchId) return;

            if (!navigator.geolocation) {
                
                setLocationStatus("not supported");
                return;
            }
            watchId = navigator.geolocation.watchPosition(
                position => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    console.log(lat, lon)
                    setLocation({
                        lat, lon
                    });
                    if (!hasFetched.current) {
                        loadNearby(lat, lon);
                        hasFetched.current = true;
                    }

                },
                (error) => {
                    if (error.code === error.PERMISSION_DENIED) {
                        setLocationStatus("location permission denied");
                        console.error("location permission denied");

                    }


                    else if (error.code === error.POSITION_UNAVAILABLE) {
                        setLocationStatus("possition unavailable, device GPS is off probably");
                        console.error("location unavailable");

                    }

                    else if (error.code === error.TIMEOUT) {
                        setLocationStatus("Timeout")
                        console.error("timeout error");


                    }
                },

                { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
            );


        }

        async function searchplace(query, lat, lon) {
            const url = `${nearByUrl}?query=${query}&lat=${lat}&lon=${lon}`;

            const res = await fetch(url);
            const data = await res.json();

            console.log(data);
            return data;
        }
        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function loadNearby(lat, lon) {
            try {
                const hospitals = await searchplace("hospital", lat, lon);
                setNearby((prev => ({ ...prev, hospitals })));
                await delay(2000);

                const police = await searchplace("police", lat, lon);
                setNearby((prev => ({ ...prev, police })));

                await delay(2000);
                const fuel = await searchplace("petrol", lat, lon);
                setNearby((prev => ({ ...prev, fuel })))

                await delay(2000);
                const fire = await searchplace("fire station", lat, lon);
                setNearby((prev => ({ ...prev, fire })))


            } catch (err) {
                console.error(err);
            }


        }
        async function init() {
            const allowed = await checkGPS();
            if (!allowed) {
                console.error("gps permission denied");
                return;
            }
            try {
                
               
                await getGpsLocation();

            } catch (err) {
                console.error(err);

            }

        }
        init();


        return () => {
            if (watchId) navigator.geolocation.clearWatch(watchId);
        }

    }, [])
    return (
        <LocationContext.Provider value={{ location, locationStatus, nearby }}>
            {children}
        </LocationContext.Provider>
    )

}

export function useLocation() {
    return useContext(LocationContext);
}
