import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function BarChart({id}) {
  const [chartData, setChartData] = useState({
    categories: [],
    series: [{ name: "Sales on this day", data: [] }],
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      //const response = await axios.post( 'http://localhost:5000/sales/gengraph',id); // Assuming '/chart-data' is the endpoint from Flask API
      const response = await fetch('http://localhost:5000/sales/gengraph', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: id
      });
      const jsonData = await response.json();
      setChartData({
        categories: jsonData.labels,
        series: [{ name: "Sales on this day", data: jsonData.values }],
      });
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  return (
    <div className="container-fluid mb-5">
      <Chart
        type="bar"
        width="100%" // Set chart width to 100% of its container
        height={500} // You can adjust the height as needed
        series={chartData.series}
        options={{
          // Your chart configuration
          chart: {
            toolbar: {
              show: true,
            },
          },
          title: {
            text: [id],
            style: { fontSize: "30px" },
          },
          colors: ["#f90000"],
          theme: { mode: "light" },
          xaxis: {
            categories: chartData.categories,
          },
          yaxis: {
            title: {
              text: "Sales",
            },
          },
          legend: { show: true, position: "right" },
          dataLabels: { style: { fontSize: "15px" } },
        }}
      />
    </div>
  );
}


export default BarChart;