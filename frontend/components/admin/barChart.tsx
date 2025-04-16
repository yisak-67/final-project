import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
type Props = {
  labels: never[];
  data: number[];
};
const BarChart = ({ labels, data }: Props) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: labels,
      datasets: [
        {
          label: "New Lands",
          data: data,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgb(1, 255, 1, 0.5",
        } as never,
      ],
    });
    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Lands created per month",
        },
      },

      maintainAspectRatio: false,
      responsive: true,
    });
  }, []);

  return (
    <>
      <div className="w-full md:col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};

export default BarChart;
