import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "top",
    },

    title: {
      display: true,
      text: "Holdings",
    },
  },
};

const VerticalGraph = ({ data }) => {
  const chartData = {
    ...data,

    datasets: data.datasets.map((dataset) => ({
      ...dataset,

      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
        "#66BB6A",
        "#EC407A",
        "#26C6DA",
        "#7E57C2",
        "#AB47BC",
        "#42A5F5",
        "#FFA726",
        "#26A69A",
        "#EF5350",
      ],

      borderColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
        "#66BB6A",
        "#EC407A",
        "#26C6DA",
        "#7E57C2",
        "#AB47BC",
        "#42A5F5",
        "#FFA726",
        "#26A69A",
        "#EF5350",
      ],

      borderWidth: 1,
    })),
  };

  return (
    <Bar
      options={options}
      data={chartData}
    />
  );
};

export default VerticalGraph;