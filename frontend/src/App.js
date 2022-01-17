/* eslint-disable no-unused-vars */
import './App.css';
import Card from './components/Card';
import { useState, useEffect}  from 'react';
import axios from 'axios';
import Form from './components/Form';



const App = () => {
  const [World, setWorld] = useState([])
  const [Selected, setSelected] = useState('UK')
  const [Data, setData] = useState([])
  const api = axios.create({baseURL: 'http://localhost:3001'})
  useEffect(() => {
    api.get('/worlddata').then(res=>{
      setWorld(res.data)
    }
  )
    
  }, [])
  useEffect(() => {
    api.get('/countries/' + Selected + '/rawdata').then(res=>{
      setData(res.data)
    }
    )
  }, [Selected])
  
  
  return (
    <div className="App">
      <div className="CountryWrapper">
        <Card data={World} type='world'></Card>
        <Card data={Data}></Card>
        <Form selected={Selected} changeSelect={setSelected}></Form>
      </div>
      <div className="GraphWrapper"></div>
    </div>
  );
}

export default App;
