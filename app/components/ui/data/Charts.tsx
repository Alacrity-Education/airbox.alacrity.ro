// app/components/LiveChart.tsx
"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { color } from "chart.js/helpers";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function LiveChart() {
  // Poll every 10 seconds
  const { data, error } = useSWR("/api/data", fetcher, {
    refreshInterval: 10000,
  });

  console.log(data);
  // Prepare Chart.js data
  const chartData = {
    labels: data?.map((pt: any) => new Date(pt.time)) ?? [],
    datasets: [
      {
        label: "Temperature (°C)",
        data: data?.map((pt: any) => pt.Temperature) ?? [],
        tension: 0,
        borderColor: "#0000ff",
        backgroundColor: "#0000ff",
      },
      {
        label: "Humidity (%)",
        data: data?.map((pt: any) => pt.Humidity) ?? [],
        tension: 0,
        borderColor: "#ff0000",
        backgroundColor: "#ff0000",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Live Station Data" },
    },
  };

  if (error) return <div>Error loading data.</div>;
  if (!data) return <div>Loading…</div>;

  return <Line data={chartData} options={options} />;
}
