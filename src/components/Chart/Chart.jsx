import React, { useState, useEffect } from "react";

import { fetchDailyData } from '../../api';
import { Line, Bar, Pie, Doughnut  } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => { //behave it like componentDidMount
    const fetchAPI = async () => {   // we need url here
      setDailyData(await fetchDailyData());
    };
    // console.log(dailyData)
    fetchAPI();
  }, []);

  const lineChart = (    // if the first dailyData is avaliable then none of the data is avalable
    dailyData.length ? ( // use dailyDate pass to this lineChart //check dailyData of first date wether exist
      <Line
        data={{  // 1st { dynamic, 2nd { opening an object 
          // data gonna be an object
          labels: dailyData.map(({ date }) => date), //x axis, this is map return an array of all the dates
          datasets: [         // an array only one object
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: "Infected",
              borderColor: "#3333ff",
              fill: true   // inside is not filed
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255, 0, 0, 0.5)",   //red box inside color
              fill: true
            }
          ]
        }}
      />) : null
  )

  console.log(confirmed, recovered, deaths);

  const barChart = (
    confirmed ? (
      <Bar 
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],   // 3columns
          datasets:[{
            label: 'People',
            backgroundColor: [
              'rgb(0, 0, 255, 0.5)',
              'rgb(0, 255, 0, 0.5)',
              'rgb(255, 0, 0, 0.5)',
            ],
            data:[confirmed.value, recovered.value, deaths.value]
          }]
        }}
        options={{
          legend: { display: false },
          title: {display: true, text: `Current state in ${country}`}
        }}
      />
    ) : null
  )

  const pieChart = (
    confirmed ? (
      <div className={styles.piechart}>
        <Pie
          data={{
            labels: ['Infected', 'Recovered', 'Death'],
            datasets: [{
              label: 'Rainfall',
              backgroundColor: [
                'rgb(0, 0, 255, 0.5)',
                'rgb(0, 255, 0, 0.5)',
                'rgb(255, 0, 0, 0.5)',
              ],
              hoverBackgroundColor: [
                'rgb(0, 0, 255, 0.5)',
                'rgb(0, 255, 0, 0.5)',
                'rgb(255, 0, 0, 0.5)',
              ],
              data: [confirmed.value, recovered.value, deaths.value],
            }],
          }}
          options={{
            title: {
              display: true,
              text: country ? `Current state in ${country}` : 'Global',
              fontSize: 15,
            },
            legend: {
              display: true,
              position: 'top',
              fullWidth: true,
              reverse: false,
              // "labels": {"fontColor": "rgb(255, 99, 132)"}
            },
          }}
        />
      </div>
    ) : null
  );

  const doughnutChart = (
    confirmed ? (
      <div className={styles.doughnutchart}>
        <Doughnut
          // style={{  }}
          data={{
            labels: ['Infected', 'Recovered', 'Death'],
            datasets: [{
              label: 'Rainfall',
              backgroundColor: [
                'rgb(0, 0, 255, 0.5)',
                'rgb(0, 255, 0, 0.5)',
                'rgb(255, 0, 0, 0.5)',
              ],
              hoverBackgroundColor: [
                'rgb(0, 0, 255, 0.5)',
                'rgb(0, 255, 0, 0.5)',
                'rgb(255, 0, 0, 0.5)',
              ],
              data: [confirmed.value, recovered.value, deaths.value],
            }],
          }}
          options={{
            title: {
              display: true,
              text: country ? `Current state in ${country}` : 'Global',
              fontSize: 15,
            },
            legend: {
              display: true,
              position: 'top',
              fullWidth: true,
              reverse: false,
              // "labels": {"fontColor": "rgb(255, 99, 132)"}
            },
          }}
        />
      </div>
    ) : null
  );

  return (
    <div className={styles.container}>
      { country ? barChart : lineChart }
      {pieChart}
      {doughnutChart}
    </div>
  );
};

export default Chart;
