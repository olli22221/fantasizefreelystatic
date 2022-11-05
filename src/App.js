import './App.css';
import React, { useRef, useEffect, useState, Component } from 'react'
import { useBeforeunload } from 'react-beforeunload';
import { useRecoilState, useRecoilValue,useResetRecoilState } from 'recoil'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import CreativityTask from './CreativityTask';
import Compose from './components/compose';
import TestScoreBox from './components/testScoreBox';
import Result from './components/result';
import Tutorial from './components/tutorial';
import { transitions, positions,types, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import SurveyEndPage from './components/surveyEnd';
import SurveyToken from './components/surveyToken';
import SurveyPage from './components/survey';

function App() {
 
  

  
  const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_LEFT,
    timeout: 5000,
    offset: '100px',
    type: 'error',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }
  
  

  
   
  return (
    <AlertProvider template={AlertTemplate} {...options}>
    <Router>

      <Routes>
      <Route exact path='/' element={<SurveyPage/>}/>
      <Route exact path='/Main' element={<Main/>}/>
      <Route exact path='/Tutorial' element={<Tutorial/>}/>
      <Route exact path='/CreativityTask' element={<CreativityTask/>}/>
      <Route exact path='/Compose' element={<Compose/>}/>
      <Route exact path='/Result' element={<Result/>}/>
      <Route exact path='/TestScoreBox' element={<TestScoreBox/>}/>
      <Route exact path='/SurveyEndPage' element={<SurveyEndPage/>}/>
      <Route exact path='/SurveyToken' element={<SurveyToken/>}/>
      </Routes>

      </Router>
  
      </AlertProvider>



   
  );

  

  
  }
export default App;
