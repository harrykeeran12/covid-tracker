/* eslint-disable react-hooks/exhaustive-deps */
import './Form.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function Form(props) {
  const cachedFormList = JSON.parse(localStorage.getItem('countrylist'));
 /*  States */
  const [FormList, setFormList] = useState(cachedFormList)
  const [FormSelected, setFormSelected] = useState('')
  /* const cachedFormList = JSON.parse(localStorage.getItem('countrylist')); */
  const api = axios.create({baseURL: 'http://localhost:3001'})
  let options = [];

  const handleChange = e => {
    setFormSelected(e.value);
  }

  useEffect(() => {
    api.get('/countries').then(res=>{
      let temp = res.data
      temp.length = 224;
      temp.sort();
      
      setFormList(temp)
      /* console.log(FormList) */
    })
  }, [])
  if (FormList.length !== 0) {
    localStorage.setItem('countrylist', JSON.stringify(FormList))
  }
  let temp = FormList

  temp.forEach(e => {
    options.push({value: e, label: e})
  });

  props.changeSelect(FormSelected)
  /* console.log(options) */
  return ( 
    <div className='FormWrapper'>
    <Select options={options} 
    className='SelectBox' 
    placeholder='Select a country to find the data of:'
    isSearchable 
    makeAnimated
    value={options.find(obj => obj.value === FormSelected)}
    onChange={handleChange}
    ></Select>
    </div>
   );
}

export default Form;