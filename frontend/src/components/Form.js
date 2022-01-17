import './Form.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
function Form() {
  const [FormList, setFormList] = useState([])
  const [Selected, setSelected] = useState('')
  const api = axios.create({baseURL: 'http://localhost:3001'})
  let options = [];

  const handleChange = e => {
    setSelected(e.value);
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

  let temp = FormList
  temp.forEach(e => {
    options.push({value: e, label: e})
  });
  console.log(Selected)
  /* console.log(options) */
  return ( 
    <div className='FormWrapper'>
    <Select options={options} 
    className='SelectBox' 
    placeholder='Select a country to find the data of:'
    isSearchable 
    makeAnimated
    value={options.find(obj => obj.value === Selected)}
    onChange={handleChange}
    ></Select>
    </div>
   );
}

export default Form;