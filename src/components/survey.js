import React, { useCallback, useEffect, useState, Component } from 'react'
import "survey-core/defaultV2.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from 'react-alert'

import { useRecoilState, useRecoilValue } from 'recoil'
import { jwtToken as jwtTokenAtom, originalityScore as originalityScoreAtom,
flexabilityScore as flexabilityScoreAtom, fluencyScore as fluencyScoreAtom 
, submissions as submissionsAtom} from "../redux/store";

import { allowed as allowedAtom , allowed2 as allowedAtom2} from "../redux/store";
StylesManager.applyTheme("defaultV2");

function SurveyPage() {
    const alert = useAlert()
    const [jwtToken, setjwtToken] = useRecoilState(jwtTokenAtom);
    const [allowed, setAllowed] = useRecoilState(allowedAtom);
    const [allowe2, setAllowed2] = useRecoilState(allowedAtom2);

    const [originalityScore, setOriginalityScore] = useRecoilState(originalityScoreAtom);
    const [flexabilityScore, setFlexabilityScore] = useRecoilState(flexabilityScoreAtom);
    const [fluencyScore, setFluencyScore] = useRecoilState(fluencyScoreAtom);
    const [submissions, setSubmissions] = useRecoilState(submissionsAtom);
    const [name, setName] = useState('');

    let nav = useNavigate();
    

    
    const surveyJson = {
        elements: [
            
            {
                
                  type: "text",
                  name: "initials",
                  title: "Enter your Initials please:",
                  isRequired: true
                }
            ,

            {
                
                type: "text",
                name: "age",
                title: "Age",
                isRequired: true
              }
          ,

          {
                
            type: "text",
            name: "gender",
            title: "Gender",
            isRequired: true
          }
      ,{
                
        type: "text",
        name: "country",
        title: "Country of Residence",
        isRequired: true
      }
  ,{
  type: "text",
  name: "Area of focus",
  title: "Area of focus",
  isRequired: true
}
,
  {
    name: "How is your experience with music",
    title: "How is your experience with music.       (1->very few and 5->profound )",
    type: "rating",
    rateMin:1,
    rateMax:5,
    isRequired: true
},
{
    "name": "greeting",
    "type": "html",
    "html":"<div>We suggest you to watch the Tutorial video as it helps you to understand how the music composition Task works</div>"
},

  {
    "name": "greetings",
    "type": "html",
    "html": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/u_zbjDF6OYY\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
  }]
    }

    useEffect(() => {

      setAllowed(false)
      setAllowed2(false)

   },[])

    const survey = new Model(surveyJson);
    survey.focusFirstQuestionAutomatic = false;
  
    const alertResults = useCallback((sender) => {
      //const results = JSON.stringify(sender.data);
      console.log(sender.data);
      let payload = {
        data:sender.data["initials"],
        basic:"0",
        preExperimental: sender.data
    }

    

    axios.post('https://fantasifreely.de/'+"startStatic",JSON.stringify(payload), {
        headers: {
            "Content-Type": "application/json"
        }
       }).then((response) => {
            console.log(response.data)
            setjwtToken(response.data)
            setFlexabilityScore(0)
            setFluencyScore(0)
            setOriginalityScore(0)
            setSubmissions(0)
            nav("/Compose")
            

        }).catch((error) => {
            if(error.response.status == 408 ){
                alert.show('Given Initial already exists. Please provide a different inital');
                nav("/")
                  return
            }else{
            console.log(error)}
        })
    
      //nav("/Compose")
      //console.log(results);
    }, []);
    survey.onComplete.add(alertResults);
  
    return( 
    <div>
        <div style={{textAlign:"center",marginBottom:"25px",font: "30px bolder"}}>Survey of FantasizeFreely</div>
        <div style={{marginLeft:"650px",textAlign:"center",height:"240px",width:"600px",font: "20px bolder"}}> As part of a scientific bachelor thesis, we are testing a tool which detects creativity in students. The survey process will be as follows. Firstly we request you to fill in your demographic information on this survey. Then a link to the creativity tool and a video tutorial  is provided to you. You will be requested to submit 1 to 5 short melodies. When you have done that you provide us with your honest opinion on this creativity tool.



P.S.: This survey contains credits to get free survey responses at SurveySwap.io </div>
        <Survey model={survey} />;

        </div>
    )
}


export default SurveyPage;