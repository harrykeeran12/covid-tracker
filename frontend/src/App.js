/* eslint-disable no-unused-vars */
import './App.css';
import Card from './components/Card';
import { useState, useEffect}  from 'react';
import axios from 'axios';
import Form from './components/Form';



const App = () => {
  const [World, setWorld] = useState([])
  const [Selected, setSelected] = useState(['UK', 'USA'])
  const [Data, setData] = useState([])
  const api = axios.create({baseURL: 'http://localhost:3001'})
  useEffect(() => {
    api.get('/worlddata').then(res=>{
      setWorld(res.data)
    },
    api.get('/countries/' + Selected[0] + '/rawdata').then(res=>{
      setData(res.data)
    }
    ),
  )
    
  }, [])
  
  
  return (
    <div className="App">
      <div className="CountryWrapper">
        <Card data={World} type='world'></Card>
        <Card data={Data}></Card>
        <Form></Form>
      </div>
      <div className="GraphWrapper"></div>
    </div>
  );
}

export default App;
