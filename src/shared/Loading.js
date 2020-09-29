import React from 'react';

function Loading({ condition=false }) {
  if (condition) {
    return <div className="loading">Loading</div>
  }

  return null;
}

export default Loading;
