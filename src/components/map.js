import { useState } from "react";
import ReactMapGL, { FullscreenControl } from "react-map-gl";

export default function Map() {
	const [viewport, setViewport] = useState({
		latitude: 38.8298,
		longitude: -77.3074,
		zoom: 12
	});

	return (
		<ReactMapGL
			{...viewport}
			width="80vw"
			height="80vh"
			onViewportChange={nextViewport => setViewport(nextViewport)}
		>
		</ReactMapGL>
	);
}