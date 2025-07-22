import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Bh from './Bh';
import Home from './Home';
import Birthday from './Birthday';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />  }/>
      <Route path="/birthday/:id" element={<Birthday />} />
     <Route path="/bh/:id" element={<Bh />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
