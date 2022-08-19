import mapboxgl from "mapbox-gl";
import { useRef, useState, useEffect } from 'react';
// MaterialUi
import Box from '@mui/material/Box';

//==============================================================================

const mapBoxAPIKey = process.env.REACT_APP_MAP;

/* Typing solution referenced from: 
https://stackoverflow.com/questions/61647949/how-to-resolve-typescript-error-mapbox-gl-react-hooks
*/

function Map() {
  mapboxgl.accessToken = mapBoxAPIKey as string;
  // Default to Berlin lat,lon for now.
  const [lng, setLng] = useState(13.404954);
  const [lat, setLat] = useState(52.520008);
  const [zoom, setZoom] = useState(10);
  let mapContainer = useRef<HTMLDivElement>(null);
  let [map, setMap] = useState(null);

  useEffect(() => {
    const attachMap = (
      setMap: React.Dispatch<React.SetStateAction<any>>,
      mapContainer: React.RefObject<HTMLDivElement>,
    ) => {
      if (!mapContainer.current) {
        return;
      }
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v11', // light-v10 for rain
        center: [lng, lat],
        zoom: zoom,
        interactive: false,
      });

      setMap(map);
    };
    !map && attachMap(setMap, mapContainer);
  }, [map]);

  return (
    <Box mt={5} sx={{height: '250px', position: 'relative'}}>
      <Box
        component='div'
        ref={mapContainer}
        sx={{
          height: '250px',
          '& .mapboxgl-control-container': {
          '& button': {
            display: 'none'
          },
          '& a': {
            textDecoration: 'none',
            color: "#000000"
          },
          width: '100%',
          paddingX: '.4rem',
          backgroundColor: 'rgba(0,0,0,0.2)',
          position: 'absolute',
          zIndex: 1,
          right: '0',
          bottom: 0,
          color: '#fff',
        },
        }}
      />
    </Box>
  );
}

export default Map;