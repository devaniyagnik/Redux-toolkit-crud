
import React from 'react';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddDataForm from './components/AddDataForm';
import UpdateDataForm from './components/UpdateDataForm';

const App = () => {
  return (

    <BrowserRouter>
      <Routes>
      
        <Route exact path="/" element={<Home />} />
        <Route exact path="/addData" element={<AddDataForm/>} />
        <Route exact path="/updateData/:id" element={<UpdateDataForm/>} />
       
      </Routes>
    </BrowserRouter>
  );
};

export default App;
