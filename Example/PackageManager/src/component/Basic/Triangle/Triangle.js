import React, { useEffect } from 'react';

function Triangle() {
  console.log('create Triangle');

  const onMounted = function() {
    console.log('mounted');
  };

  useEffect(onMounted, []);
  return (
    <>
      <canvas id="_glcanvas" width="640" height="480" />
    </>
  );
}

export default Triangle;
