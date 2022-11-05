import React, { useCallback, useEffect, useState, Component } from 'react'
import "survey-core/defaultV2.min.css";
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { jwtToken as jwtTokenAtom } from '../redux/store';
import axios from "axios";
import { useAlert } from 'react-alert'
import { allowed as allowedAtom } from "../redux/store";
import { allowed2 as allowedAtom2 } from "../redux/store";
import { useRecoilState } from 'recoil'


import { Link, useNavigate } from "react-router-dom";


StylesManager.applyTheme("defaultV2");

function SurveyEndPage() {
    let nav = useNavigate();
    
    const [allowed, setAllowed] = useRecoilState(allowedAtom);
    const [allowed2, setAllowed2] = useRecoilState(allowedAtom2);
    const alert = useAlert()

    const [jwtToken, setJwtToken] = useRecoilState(jwtTokenAtom);

    const surveyJson = {
        elements: [
            {
                name: "I would be happy to use the creativity support tool on a regular basis.",
                title: "I would be happy to use the creativity support tool on a regular basis.       (1->Strongly Disagree and 10->Strongly Agree )",
                type: "rating",
                rateMin:1,
                rateMax:10,
                isRequired: true
            },    
        {
            name: "I enjoyed using the creativity support tool.",
            title: "I enjoyed using the creativity support tool.       (1->Strongly Disagree and 10->Strongly Agree )",
            type: "rating",
            rateMin:1,
            rateMax:10,
            isRequired: true
        },
        {
            name: "It was easy for me to explore many different ideas using the creativity support tool.",
            title: "It was easy for me to explore many different ideas using the creativity support tool.       (1->Strongly Disagree and 10->Strongly Agree )",
            type: "rating",
            rateMin:1,
            rateMax:10,
            isRequired: true
        },
        {
            name: "The creativity support tool was helpful in allowing me to track different ideas or possibilities.",
            title: "The creativity support tool was helpful in allowing me to track different ideas or possibilities.      (1->Strongly Disagree and 10->Strongly Agree )",
            type: "rating",
            rateMin:1,
            rateMax:10,
            isRequired: true
        },
        {
            name: "I was able to be very creative while doing the activity inside the creativity support tool.",
            title: "I was able to be very creative while doing the activity inside the creativity support tool.       (1->Strongly Disagree and 10->Strongly Agree )",
            type: "rating",
            rateMin:1,
            rateMax:10,
            isRequired: true
        },
        {
            name: "The creativity support tool allowed me to be very expressive.",
            title: "The creativity support tool allowed me to be very expressive.       (1->Strongly Disagree and 10->Strongly Agree )",
            type: "rating",
            rateMin:1,
            rateMax:10,
            isRequired: true
        },
        {
            name: "My attention was fully tuned to the activity, and I forgot about the tool that I was using.",
            title: "My attention was fully tuned to the activity, and I forgot about the tool that I was using.       (1->Strongly Disagree and 10->Strongly Agree )",
            type: "rating",
            rateMin:1,
            rateMax:10,
            isRequired: true
        },
        {
            name: "I became so absorbed in the activity that I forgot about the creativity support tool that I was using.",
            title: "I became so absorbed in the activity that I forgot about the creativity support tool that I was using.       (1->Strongly Disagree and 10->Strongly Agree )",
            type: "rating",
            rateMin:1,
            rateMax:10,
            isRequired: true
        },
        {
            name: "I was satisfied with what I got out of the creativity support tool.",
            title: "I was satisfied with what I got out of the creativity support tool.       (1->Strongly Disagree and 10->Strongly Agree )",
            type: "rating",
            rateMin:1,
            rateMax:10,
            isRequired: true
        },
        {
            name: "What I was able to produce was worth the effort I had to exert to produce it.",
            title: "What I was able to produce was worth the effort I had to exert to produce it.       (1->Strongly Disagree and 10->Strongly Agree )",
            type: "rating",
            rateMin:1,
            rateMax:10,
            isRequired: true
        },
        {
            name: "The system or tool allowed other people to work with me easily. ",
            title: " The system or tool allowed other people to work with me easily.        (1->Strongly Disagree and 10->Strongly Agree )",
            type: "rating",
            rateMin:1,
            rateMax:10,
            isRequired: true
        },
        {
            name: " It was really easy to share ideas and designs with other people inside this system or tool. ",
            title: " It was really easy to share ideas and designs with other people inside this system or tool.        (1->Strongly Disagree and 10->Strongly Agree )",
            type: "rating",
            rateMin:1,
            rateMax:10,
            isRequired: true
        },
        {
            name: "b1",
            title: "When doing this task, it is most important that I am able to...",
            type: "radiogroup",
            choices: [
                { value: "Be creative and expressive", text: "Be creative and expressive" },
                { value: "Explore many different ideas, outcomes, or possibilities", text: "Explore many different ideas, outcomes, or possibilities" }
                
            ],
            isRequired: true
        },
        {
            name: "b2",
            title: "When doing this task, it is most important that I am able to...",
            type: "radiogroup",
            choices: [
                { value: "Work with other people", text: "Work with other people" },
                { value: "Be creative and expressive", text: "Be creative and expressive" }
                
            ],
            isRequired: true
        },
        {
            name: "b3",
            title: "When doing this task, it is most important that I am able to...",
            type: "radiogroup",
            choices: [
                { value: "Become immersed in the activity", text: "Become immersed in the activity" },
                { value: "Work with other people", text: "Work with other people" }
                
            ],
            isRequired: true
        },
        {
            name: "b4",
            title: "When doing this task, it is most important that I am able to...",
            type: "radiogroup",
            choices: [
                { value: "Work with other people", text: "Work with other people" },
                { value: "Enjoy using the system or tool", text: "Enjoy using the system or tool" }
                
            ],
            isRequired: true
        },
        {
            name: "b5",
            title: "When doing this task, it is most important that I am able to...",
            type: "radiogroup",
            choices: [
                { value: "Explore many different ideas, outcomes, or possibilities", text: "Explore many different ideas, outcomes, or possibilities" },
                { value: "Work with other people", text: "Work with other people" }
                
            ],
            isRequired: true
        },
        {
            name: "b6",
            title: "When doing this task, it is most important that I am able to...",
            type: "radiogroup",
            choices: [
                { value: "Work with other people", text: "Work with other people" },
                { value: "Produce results that are worth the effort I put in", text: "Produce results that are worth the effort I put in" }
                
            ],
            isRequired: true
        },
        {
            name: "b7",
            title: "When doing this task, it is most important that I am able to...",
            type: "radiogroup",
            choices: [
                { value: "Enjoy using the system or tool", text: "Enjoy using the system or tool" },
                { value: "Produce results that are worth the effort I put in", text: "Produce results that are worth the effort I put in" }
                
            ],
            isRequired: true
        },
        {
            name: "b8",
            title: "When doing this task, it is most important that I am able to...",
            type: "radiogroup",
            choices: [
                { value: "Be creative and expressive", text: "Be creative and expressive" },
                { value: "Become immersed in the activity", text: "Become immersed in the activity" }
                
            ],
            isRequired: true
        },
        {
            name: "b9",
            title: "When doing this task, it is most important that I am able to...",
            type: "radiogroup",
            choices: [
                { value: "Become immersed in the activity", text: "Become immersed in the activity" },
                { value: "Enjoy using the system or tool", text: "Enjoy using the system or tool" }
                
            ],
            isRequired: true
        },
        {
            name: "b10",
            title: "When doing this task, it is most important that I am able to...",
            type: "radiogroup",
            choices: [
                { value: "Be creative and expressive", text: "Be creative and expressive" },
                { value: "Produce results that are worth the effort I put in", text: "Produce results that are worth the effort I put in" }
                
            ],
            isRequired: true
        },
        {
            name: "b11",
            title: "When doing this task, it is most important that I am able to...",
            type: "radiogroup",
            choices: [
                { value: "Become immersed in the activity", text: "Become immersed in the activity" },
                { value: "Explore many different ideas, outcomes, or possibilities", text: "Explore many different ideas, outcomes, or possibilities" }
                
            ],
            isRequired: true
        },
        {
            name: "b12",
            title: "When doing this task, it is most important that I am able to...",
            type: "radiogroup",
            choices: [
                { value: "Explore many different ideas, outcomes, or possibilities", text: "Explore many different ideas, outcomes, or possibilities" },
                { value: "Produce results that are worth the effort I put in", text: "Produce results that are worth the effort I put in" }
                
            ],
            isRequired: true
        },
        {
            name: "b13",
            title: "When doing this task, it is most important that I am able to...",
            type: "radiogroup",
            choices: [
                { value: "Be creative and expressive", text: "Be creative and expressive" },
                { value: "Enjoy using the system or tool", text: "Enjoy using the system or tool" }
                
            ],
            isRequired: true
        },
        {
            name: "b14",
            title: "When doing this task, it is most important that I am able to...",
            type: "radiogroup",
            choices: [
                { value: "Become immersed in the activity", text: "Become immersed in the activity" },
                { value: "Produce results that are worth the effort I put in", text: "Produce results that are worth the effort I put in" }
                
            ],
            isRequired: true
        },
        {
            name: "b15",
            title: "When doing this task, it is most important that I am able to...",
            type: "radiogroup",
            choices: [
                { value: "Enjoy using the system or tool", text: "Enjoy using the system or tool" },
                { value: "Explore many different ideas, outcomes, or possibilities", text: "Explore many different ideas, outcomes, or possibilities" }
                
            ],
            isRequired: true
        },
        {
            name: "Learning to operate this creativity support tool would be easy for me.",
            title: "Learning to operate this creativity support tool would be easy for me.       (1->Extremely Unlikely and 7->Extremely Likely )",
            type: "rating",
            rateMin:1,
            rateMax:7,
            isRequired: true
        },
        {
            name: "My interaction with this creativity support tool would be clear and understandable.",
            title: "My interaction with this creativity support tool would be clear and understandable.       (1->Extremely Unlikely and 7->Extremely Likely )",
            type: "rating",
            rateMin:1,
            rateMax:7,
            isRequired: true
        },
        {
            name: "I would find this creativity support tool would be clear and understandable.",
            title: "I would find this creativity support tool would be clear and understandable.       (1->Extremely Unlikely and 7->Extremely Likely )",
            type: "rating",
            rateMin:1,
            rateMax:7,
            isRequired: true
        },
        {
            name: "It would be easy for me to become skillful at using this creativity support tool.",
            title: "It would be easy for me to become skillful at using this creativity support tool.       (1->Extremely Unlikely and 7->Extremely Likely )",
            type: "rating",
            rateMin:1,
            rateMax:7,
            isRequired: true
        },
        {
            name: "I would find this creativity support tool easy to use.",
            title: "I would find this creativity support tool easy to use.       (1->Extremely Unlikely and 7->Extremely Likely )",
            type: "rating",
            rateMin:1,
            rateMax:7,
            isRequired: true
        },
        
      {
                
        type: "text",
        name: "What did you most like about the tool?",
        title: "What did you most like about the tool?",
        isRequired: true
      },
      {
                
        type: "text",
        name: "What did you dislike about the tool?",
        title: "What did you dislike about the tool?",
        isRequired: true
      },
      {
                
        type: "text",
        name: "If given a chance, what would you change or add in the tool?",
        title: "If given a chance, what would you change or add in the tool?",
        isRequired: true
      }
    ]
    }

    const survey = new Model(surveyJson);
    survey.focusFirstQuestionAutomatic = false;
  
    const alertResults = useCallback((sender) => {
        let payload = {
            jwtToken: jwtToken,
            postExperimental: sender.data
        }
    
        axios.post('https://fantasifreely.de/'+"submitSurveyStatic",JSON.stringify(payload), {
            headers: {
                "Content-Type": "application/json"
            }
           }).then((response) => {
                setJwtToken([])
                setAllowed(true)
                setAllowed2(false)
                
                nav("/SurveyToken")
                
    
            }).catch((error) => {
                if(error.response.status == 401 ){
                    alert.show('Your Session expired');
                    nav("/")
                      return
                }else{
                
                console.log(error)
                nav("/SurveyEndPage")
                return
                }}
            )
        
    }, []);
  
    survey.onComplete.add(alertResults);
    useEffect(() => {

       if (!allowed2) {
        nav("/")
       }


    },[])
    return( 
    <div>
        <div style={{textAlign:"center",marginBottom:"25px",font: "30px bolder"}}>Survey of FantasizeFreely</div>
       
        <Survey model={survey} />;

        </div>
    )
}


export default SurveyEndPage;
