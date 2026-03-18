
import { LocationProvider, useLocation } from "../../contexts/LocationContext";
import Map from "../map/Map";

export function InnerMap() {
    const { locationStatus } = useLocation();

    return (
<>
        { locationStatus && <p id="status">{locationStatus}</p>}
        <Map/>

</>
)
   

}


export default function MapPage() {


    return (
        <LocationProvider>
            <InnerMap />

        </LocationProvider>

    );
}