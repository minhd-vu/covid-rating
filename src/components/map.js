import { useState, useRef, useCallback } from "react";
import ReactMapGL, { FullscreenControl, GeolocateControl, NavigationControl, Marker, Popup } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import Pin from "./pin";
import Card from "react-bootstrap/Card";
import axios from "axios";

export default function Map() {
	const [viewport, setViewport] = useState({
		latitude: 38.8298,
		longitude: -77.3074,
		zoom: 12
	});

	const [marker, setMarker] = useState([]);
	const [showPopup, togglePopup] = useState(true);
	const [popup, setPopup] = useState();

	const mapRef = useRef();

	const handleViewportChange = useCallback(
		(newViewport) => setViewport(newViewport),
		[]
	);

	const handleGeocoderViewportChange = useCallback(
		(newViewport) => {
			const geocoderDefaultOverrides = { transitionDuration: 1000 };

			return handleViewportChange({
				...newViewport,
				...geocoderDefaultOverrides
			});
		},
		[handleViewportChange]
	);

	function onResult(e) {
		console.log(e);

		setMarker(
			<Marker latitude={e.result.center[1]} longitude={e.result.center[0]}>
				<Pin size={20} onClick={() => togglePopup(true)} />
			</Marker>
		);

		axios.get("/api/search/" + e.result.id, { withCredentials: true })
			.then(res => {
				if (res.status === 200) {
				} else if (res.status === 204) {
				}
			})
			.catch(err => {
				console.log(err);
			});

		setPopup(
			<Popup
				latitude={e.result.center[1]}
				longitude={e.result.center[0]}
				closeButton={true}
				closeOnClick={false}
				onClose={() => togglePopup(false)}
				anchor="bottom">
				<small>
					<Card.Body>
						<Card.Title>{e.result.text}</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">{e.result.properties.address}</Card.Subtitle>
						<Card.Text>Covid Protection Rating <Card.Link href="#">5/5</Card.Link></Card.Text>
						<Card.Text>Covid Reviews <Card.Link href="#">14</Card.Link></Card.Text>
					</Card.Body>
				</small>
			</Popup>
		);
	}

	return (
		<div style={{ height: "80vh" }}>
			<ReactMapGL
				{...viewport}
				ref={mapRef}
				width="100%"
				height="100%"
				mapStyle="mapbox://styles/mapbox/light-v9"
				onViewportChange={handleViewportChange}
				mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
			>
				<div style={{ position: "absolute", right: 0 }}>
					<FullscreenControl />
					<NavigationControl />
					<GeolocateControl
						positionOptions={{ enableHighAccuracy: true }}
						trackUserLocation={true}
					/>
					<Geocoder
						mapRef={mapRef}
						trackProximity={true}
						marker={true}
						onResult={onResult}
						onViewportChange={handleGeocoderViewportChange}
						mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
						position="top-left"
					/>
				</div>
				{showPopup ? popup : marker}
			</ReactMapGL>
		</div>
	);
}