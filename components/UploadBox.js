import React, {Component} from 'react';
import ProgressBar from './ProgressBar';
import Dropdown from './Dropdown';
import FileSelector from './FileSelector';

const UploadBox = ({label, file, handleUpload, separator, setSeparator, percent, style }) => {
  return (
    <div className='uploadBox'>
      <FileSelector label={label} file={file} handleUpload={handleUpload}/>
      <Dropdown setSeparator={setSeparator} separator={separator}/>
      {
        (percent>0) ? <ProgressBar percent={percent} bsStyle={style}/> : <div></div>
      }
    </div>
  );
}

export default UploadBox;
