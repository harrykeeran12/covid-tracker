import './Card.css'
import React from 'react'
function Card(props) {
  const data = props.data;
  const type = props.type;
  return ( 
    <div className='CardWrapper' type={type}>
      {type == 'world'
      ? <>
      <p>🌍{data[1]} Total: {data[2]}</p>
      <p>🌍{data[1]} Recovered: {data[4]}</p>
      <p>🌍{data[1]} Deaths: {data[6]}</p> 
      </>
      : <>
      <span className='Redo'></span>
      <>
      <p>{data[1]} Total: {data[2]}</p>
      <p>{data[1]} Recovered: {data[4]}</p>
      <p>{data[1]} Deaths: {data[6]}</p> 
      </>
      </>
      }
    </div>
   );
}

export default Card;