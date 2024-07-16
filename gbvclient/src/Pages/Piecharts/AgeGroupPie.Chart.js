import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';


const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const CanvasJSPieChart = CanvasJSReact.CanvasJSPieChart;

const AgeGroupPieChart = () => {
  const [ageGroupData, setAgeGroupData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgeGroupData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/hakisha/pieCharts/getAgeGroupPie');
        setAgeGroupData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAgeGroupData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Calculate total incidents for all age groups
  const totalIncidents = ageGroupData.reduce((total, ageGroup) => total + ageGroup.incidentCount, 0);

  const options = {
    animationEnabled: true,
    title: { text: "Percentage Age Group Distribution" },
    data: [
      {
        type: "pie",
        startAngle: 75,
        indexLabel: "{label}: {y}",
        dataPoints: ageGroupData.map(ageGroup => ({
          label: ageGroup.AgeGroup,
          y: (ageGroup.incidentCount / totalIncidents) * 100
        }))
      }
    ]
  };

  return (
   
      <CanvasJSChart options={options} >
        <CanvasJSPieChart />
      </CanvasJSChart>
    
  );
};

export default AgeGroupPieChart;