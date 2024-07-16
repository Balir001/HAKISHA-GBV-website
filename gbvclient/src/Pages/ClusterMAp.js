import React, { useEffect, useState, useRef, useCallback } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { NavigationControl } from 'react-map-gl';
import Supercluster from "supercluster";
import pinImage from "../image/interview.png"
import "./Page.css"


const supercluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
});

export const ClusterMap = () => {
  const [points, setPoints] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(0);
  const[data,setData]=useState()
 

  const mapRef = useRef();


  useEffect(()=>{
  
   fetchData()

  },
    [])

    


    const fetchData = async () => {
        const response = await fetch('http://localhost:3001/hakisha/incident/fetchIncidents');
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData)
      };
   
    

    

  useEffect(() => {
    

    if (data) {
      
        const points = data.map(listOfCordinates => ({
          type: 'Feature',
          properties: {
            cluster: false,
            lng: listOfCordinates.longitude,
            lat: listOfCordinates.latitude,
            caseId: listOfCordinates.id,
          },
          geometry: {
            type: 'Point',
            coordinates: [parseFloat(listOfCordinates.longitude), parseFloat(listOfCordinates.latitude)],
          }
        }));
    
        setPoints(points);
        console.log(points)
      }

  }, [data]);

  useEffect(() => {
    if (points.length > 0) {
        supercluster.load(points);
        setClusters(supercluster.getClusters(bounds, zoom));
      }
  }, [points, zoom, bounds]);

  const updateBounds=useCallback(()=>{
    if(mapRef.current){
      setBounds(mapRef.current.getMap().getBounds().toArray().flat());
    }
  },[]);

  useEffect(() => {
    updateBounds()
  }, [updateBounds]);

  return (
    <div className="map-container">
    <ReactMapGL
      initialViewState={{
        longitude:39.86535,
        latitude: -3.51064,
        zoom: 9,
      }}
      mapboxAccessToken={process.env.REACT_APP_API_MAPACESSTOKEN}
      // "pk.eyJ1IjoiYmxhaXIzIiwiYSI6ImNscXF0b3h4YzFoMG4yaW13cnhwaTA0Y3AifQ.fCOw0KgPe-zXBLRnl8h6oQ"
      mapStyle="mapbox://styles/mapbox/streets-v9"
      // style={{ width: '90px', height: '90px', margin: 10 }}
      id="clustermap"
      ref={mapRef}
      
      // onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
      onMove={(evt) => {
        setZoom(evt.viewState.zoom);
        setBounds(evt.target.getBounds().toArray().flat());
      }}
    >  

    <NavigationControl position="top-right" />


      {clusters.map((cluster) => {
        const { cluster: isCluster, point_count } = cluster.properties;
        const [longitude, latitude] = cluster.geometry.coordinates;

        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              longitude={longitude}
              latitude={latitude}
            >
              <div
                className='cluster-marker'
                style={{
                  color: '#fff',
                  background: '#1978c8',
                 borderRadius: '50%',
                 padding: '10px',
                  display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center',
                  width: `${10 + (point_count / points.length) * 20}px`,
                  height: `${10 + (point_count / points.length) * 20}px`,
                }}
                onClick={() => {
                  const zoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 20);
                  mapRef.current.flyTo({
                    center: [longitude, latitude],
                    zoom,
                    speed: 1,
                  });
                }}
              >
                {point_count}
              </div>
            </Marker>
          );
        }

        return (
          <Marker
            key={`listOfCordinates-${cluster.properties.caseId}`}
            longitude={longitude}
            latitude={latitude}
          >
            <img src={pinImage} alt="caseReport" style={{width:20,height:20}} />
          </Marker>
        );
      })}
    </ReactMapGL>
    </div>
  );
};
