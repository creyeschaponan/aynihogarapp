import Mapbox,{ MapView,Camera, LocationPuck } from '@rnmapbox/maps';

const accesToken = process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_ACCESS_TOKEN;
Mapbox.setAccessToken(accesToken);

export default function Map() {
    return (
        <MapView 
            style={{ flex: 1 }} 
            localizeLabels={{ locale: 'es' }} 
            styleURL="mapbox://styles/mapbox/dark-v11"
            compassEnabled
            logoEnabled={false}
            compassViewPosition={1}
        >
            <Camera 
                followZoomLevel={14} 
                followUserLocation 
            />
            <LocationPuck 
                pulsing={{ isEnabled: true }} 
                puckBearingEnabled 
                puckBearing="heading" 
            />
        </MapView>
    )
}