import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const CanvasJSPieChart = CanvasJSReact.CanvasJSPieChart;

const ModeOfViolencePieChart = () => {
  const [modeOfViolenceData, setModeOfViolenceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModeOfViolenceData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/hakisha/pieCharts/getModeOfViolencePie');
        setModeOfViolenceData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchModeOfViolenceData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Calculate total incidents for all modes of violence
  const totalIncidents = modeOfViolenceData.reduce((total, mode) => total + mode.incidentCount, 0);

  const options = {
    animationEnabled: true,
    title: { text: "Percentage Mode of Violence Distribution" },
    data: [
      {
        type: "pie",
        startAngle: 75,
        indexLabel: "{label}: {y}",
        dataPoints: modeOfViolenceData.map(mode => ({
          label: mode.Mode,
          y: (mode.incidentCount / totalIncidents) * 100
        }))
      }
    ]
  };

  return (
    <div>
      <CanvasJSChart options={options}>
        <CanvasJSPieChart />
      </CanvasJSChart>
    </div>
  );
};

export default ModeOfViolencePieChart;