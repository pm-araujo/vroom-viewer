import React, { Fragment } from 'react';

import './style.css';

const FileInput = (props) => {
  return (
    <Fragment>
      <input
        id="file"
        className="FileInput"
        name="file"
        type="file"
        onChange={e => props.clickHandler(e.target.files[0])}/>
      <label htmlFor="file">{props.text}</label>
    </Fragment>
  );
}

export default FileInput;