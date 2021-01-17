import { useState, useRef } from "react";
import MapGL, { FullscreenControl, GeolocateControl, NavigationControl, ScaleControl } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

export default function Map() {
	const [viewport, setViewport] = useState({
		latitude: 38.8298,
		longitude: -77.3074,
		zoom: 12
	});

	const mapRef = useRef();

	return (
		<div style={{ height: "100vh" }}>
			<MapGL
				{...viewport}
				ref={mapRef}
				width="100%"
				height="100%"
				mapStyle="mapbox://styles/mapbox/navigation-preview-day-v2"
				onViewportChange={nextViewport => setViewport(nextViewport)}
			>
				<div style={{ position: 'absolute', right: 0 }}>
					<FullscreenControl container={document.querySelector('body')} />
					<NavigationControl />
					<GeolocateControl
						positionOptions={{ enableHighAccuracy: true }}
						trackUserLocation={true}
					/>
					<Geocoder
						mapRef={mapRef}
						mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
						onViewportChange={nextViewport => setViewport(nextViewport)}
						position="top-left"
					/>
				</div>
			</MapGL>
		</div>
	);
}