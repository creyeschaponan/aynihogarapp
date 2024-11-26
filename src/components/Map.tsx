import Mapbox, { MapView, Camera, LocationPuck, ShapeSource, SymbolLayer, Images } from '@rnmapbox/maps';
import { featureCollection, point } from '@turf/helpers';
import technicals from '../data/technicals.json';

// Access token
const accesToken = process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_ACCESS_TOKEN;
Mapbox.setAccessToken(accesToken);

// Load images
const images = {
  bombilla: require('../../assets/icons/bombilla.png'),
  grifo: require('../../assets/icons/grifo.png'),
  martillo: require('../../assets/icons/martillo.png'),
  paleta: require('../../assets/icons/paleta.png'),
  pined: require('../../assets/icons/Pin.png'),
};

export default function Map() {
  // Create features for each point
  const points = technicals.map((technical) =>
    point([technical.long, technical.lat], { icon: technical.icon })
  );
  const technicalsFeatures = featureCollection(points);

  return (
    <MapView
      style={{ flex: 1 }}
      localizeLabels={{ locale: 'es' }}
      
      compassEnabled
      logoEnabled={false}
      compassViewPosition={1}
      
    >
      <Camera followZoomLevel={14} followUserLocation />
      <LocationPuck pulsing={{ isEnabled: true }} puckBearingEnabled puckBearing="heading"   />
      
      {/* Load images into the map */}
      <Images images={images} />

      <ShapeSource id="technicals" shape={technicalsFeatures}>
        <SymbolLayer
          id="symbolLocationSymbols"
          minZoomLevel={1}
          style={{
            iconImage: ['get', 'icon'],
            iconAllowOverlap: true,
            iconSize: 0.7,
            iconAnchor: 'bottom',
          }}
        />
      </ShapeSource>
    </MapView>
  );
}
