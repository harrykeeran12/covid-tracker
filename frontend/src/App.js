/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import './App.css';
import Card from './components/Card';
import { useState, useEffect}  from 'react';
import axios from 'axios';
import Form from './components/Form';
import Graph from './components/Graph';



const App = () => {
/* States */
  /* const [World, setWorld] = useState(() => JSON.parse(localStorage.getItem("world")))
  const [Selected, setSelected] = useState(localStorage.getItem('selected'))
  const [Data, setData] = useState(() => {JSON.parse(localStorage.getItem('data'))}) */
  const [World, setWorld] = useState([])
  const [Selected, setSelected] = useState('UK')
  const [Data, setData] = useState([])
  const cachedWorld = JSON.parse(localStorage.getItem("world"));
  const cachedData = JSON.parse(localStorage.getItem("data"));


  const api = axios.create({baseURL: 'http://localhost:3001'})
/*   Hooks */
  useEffect(() => {
    api.get('/worlddata').then(res=>{
      setWorld(res.data)
    })}, [])
  useEffect(() => {
    api.get('/countries/' + Selected + '/rawdata').then(res=>{
      setData(res.data)
    })}, [Selected])
  
  if (World !== []) {
    localStorage.setItem('world', JSON.stringify(World))
  }
  if (Data !== []) {
    localStorage.setItem('data', JSON.stringify(Data))
    localStorage.setItem('selected', Selected)
  }

  return (
    <div className="App">
      <div className="CountryWrapper">
        <Card data={World} type='world'></Card>
        <Card data={Data}></Card>
        <Form selected={Selected} changeSelect={setSelected}></Form>
      </div>
      <div className="GraphWrapper">
        <Graph worldData={World} selectedData={Data} cachedWorld={cachedWorld} cachedData={cachedData}></Graph>
      </div>
    </div>
  );
}

export default App;
