import './Graph.css';
import { Bar} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);




function Graph(props) {
  /* let worldData = props.worldData;
  let selectedData = props.selectedData; */
  let worldData = props.cachedWorld;
  let selectedData = props.cachedData;
  const labels = [worldData[1], selectedData[1]];
  const titletext = 'Comparison between COVID data of the ' + worldData[1] + ' against ' +  selectedData[1];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: titletext,
      },
  },
  };
  const data = {
    labels,
    datasets: [
      {
        label: 'Total Cases',
        data: [parseInt(worldData[2].split(',').join('')), parseInt(selectedData[2].split(',').join(''))]
        /* data: [1000, 10000] */,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Total Recovered',
        data: [parseInt(worldData[4].split(',').join('')), parseInt(selectedData[4].split(',').join(''))],
        backgroundColor: 'rgba(0,0,255,0.25)',
      },
      {
        label: 'Total Deaths',
        data: [parseInt(worldData[6].split(',').join('')), parseInt(selectedData[6].split(',').join(''))],
        backgroundColor: 'rgba(0,255,0,0.25)',
      }
    ],
  };
  return ( 
    <div className='GraphWrapper'>
      <Bar options={options} data={data} width={400} height={200}></Bar>
      {/* <p>{props.cachedData}</p> */}
    </div>
   );
}

export default Graph;