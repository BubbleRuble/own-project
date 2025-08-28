import React from 'react';
import {Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>} />
      </Routes> 

      {/* <div>
        <h1>Logo</h1>
        <h1>Info</h1>
        <h1>Movies</h1>
        <h1>Settings</h1>
      </div> */}
    </>
  )
}

export default App;
