import React from 'react';
import Select from 'react-select';

import './style.css';

const toArray = arg => {};

const selectStyles = {
  option: (provided, state) => ({
    ...provided,
    color: '#000000'
  })
};

const ButtonSelect = (props) => {
  const {
    data,
    isActive,
    title,
    onChange: handleChange
  } = props;

  const formatData = data.map((_, i) => ({ value: i, label: i + 1 }));

  return (
    <div className='ButtonSelect'>
      <span className={`ButtonSelect-Title ${isActive && 'active'}`}>{title}</span>

      <Select
        styles={selectStyles}
        isMulti
        name={title}
        options={formatData}
        onChange={ops => handleChange(ops && ops.length > 0 ? ops.map(({ value }) => value) : data.map((_, i) => i))}
        />
    </div>
  );
}

export default ButtonSelect;