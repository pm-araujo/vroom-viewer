import React from 'react';

import './style.css';

const ButtonSelect = (props) => {
  const { data } = props;

  return (
    <div className='ButtonSelect'>
      <span className='ButtonSelect-Title'>{props.title}</span>
      <select className='ButtonSelect-Select'>
        <option key={data.length} value={data.length}>Show All</option>
        { Array.isArray(data) && data.map((v, i) => <option key={i} value={i}>{i + 1}</option>) }
      </select>
    </div>
  );
}

export default ButtonSelect;