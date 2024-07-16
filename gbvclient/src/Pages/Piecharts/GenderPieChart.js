import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const CanvasJSPieChart = CanvasJSReact.CanvasJSPieChart;

const GenderPieChart = () => {
  const [genderData, setGenderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenderData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/hakisha/pieCharts/getGender');
        setGenderData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchGenderData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Calculate total incidents for all genders
  const totalIncidents = genderData.reduce((total, gender) => total + gender.incidentCount, 0);

  const options = {
    animationEnabled: true,
    title: {
      text: "Percentage Gender Distribution"
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        indexLabel: "{label}: {y}",
        dataPoints: genderData.map(gender => ({
          label: gender.Gender,
          y: (gender.incidentCount / totalIncidents) * 100
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

export default GenderPieChart;