import React, { useEffect, useState } from "react";
import axios from "axios";
import { Baseurl } from "./baseUrl";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  elements,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = () => {
  const [chartData, setChartData] = useState([]);
  const { id } = useParams();
  const [days, setDays] = useState(1);
  const CoinChartData = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}/coins${id}/market_chart?vs_currency=inr&days=${days}`
      );
      setChartData(data.prices);
      //   console.log(data.prices);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    CoinChartData();
  }, []);

  const myData = {
    lables: chartData.map((value) => {
      const date = new Date(value[0]);
      const time =
        date.getHours() > 12
          ? `${date.getHours() - 12} : ${date.getMinutes()} PM `
          : `${date.getHours()} : ${date.getMinutes()} AM `;
      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        lables: `price in Past Days ${days}`,
        data: chartData.map((value) => value[1]),
        borderColor: "orange",
        borderWidth: "3",
      },
    ],
  };

  return (
    <div>
      <div>Graph Data is not shown because of API limit</div>
      <Line
        data={myData}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
        }}
        style={{ marginTop: "3rem", width: "60rem" }}
      />
      <div style={{ marginTop: "1rem" }}>
        <button className="btns" onClick={() => setDays(1)}>
          24Hours
        </button>
        <button className="btns" onClick={() => setDays(30)}>
          1Month
        </button>
        <button className="btns" onClick={() => setDays(365)}>
          1Year
        </button>
      </div>
    </div>
  );
};

export default CoinChart;
