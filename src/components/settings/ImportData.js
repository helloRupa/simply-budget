import React, { useRef } from 'react';

function ImportData() {
  const filePicker = useRef(null);

  const handleClick = e => {
    filePicker.current.click();
  };

  const handleFile = e => {
    console.log(filePicker.current.files[0])
  };

  return <>
    <button onClick={handleClick}>
      Import Data
    </button>
    <input 
      type="file" 
      accept=".json" 
      ref={filePicker} 
      onChange={handleFile} />
  </>
}

export default ImportData;
