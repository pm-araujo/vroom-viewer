import React from 'react';
import Select from 'react-select';
import chroma from 'chroma-js';

import './style.css';

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};

const ButtonSelect = (props) => {
  const {
    data,
    colors,
    isActive,
    title,
    onChange: handleChange
  } = props;

  const formatData = data.map((v, i) => ({ value: i, label: i + 1, color: Array.isArray(v) ? colors.find((_, i2) => v.includes(i2)) : colors[i] }));

  return (
    <div className='ButtonSelect'>
      <span onClick={() => handleChange(data.map((_, i) => i))} className={`ButtonSelect-Title ${isActive && 'active'}`}>{title}</span>

      <Select
        styles={colourStyles}
        isMulti
        name={title}
        options={formatData}
        onChange={ops => handleChange(ops && ops.length > 0 ? ops.map(({ value }) => value) : data.map((_, i) => i))}
        />
    </div>
  );
}

export default ButtonSelect;