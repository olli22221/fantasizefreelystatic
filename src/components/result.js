import React ,{  useEffect,useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue,useResetRecoilState } from 'recoil'
import ScoreBox from './ScoreBox';
import { measure1 as measure1Atom,measure2 as measure2Atom,
    measure3 as measure3Atom,measure4 as measure4Atom,measure5 as measure5Atom,measure6 as measure6Atom,
    measure7 as measure7Atom,measure8 as measure8Atom, musicatResponse as musicatResponseAtom,originalityScore as originalityScoreAtom,
    fluencyScore as fluencyScoreAtom,flexabilityScore as flexabilityScoreAtom,
    submissions as submissionsAtom, jwtToken as jwtTokenAtom,
analogies as analogiesAtom, groups as groupsAtom, totalResult as totalResultAtom} from '../redux/store'
import { allowed2 as allowedAtom2 } from "../redux/store";

import { Progress } from 'react-sweet-progress';
import { Button } from '@mui/material';
import ReactTooltip from 'react-tooltip';



function Result() {
    const [allowed2, setAllowed2] = useRecoilState(allowedAtom2);

    let nav = useNavigate();
    const maxTotalResult = 400
    const flexMax = 550
    const origMax = 100
    const fluencyMax = 500
    
    const musicatResult = useRecoilValue(musicatResponseAtom);
    const analogies = useRecoilValue(analogiesAtom);
    const groups = useRecoilValue(groupsAtom);
    const totalResult = useRecoilValue(totalResultAtom);

    
    const [image, setImage] = useState("");
    const [submissions, setSubmissions] = useRecoilState(submissionsAtom);
    const [flexabilityScore, setFlexabilityScore] = useRecoilState(flexabilityScoreAtom);
    const [fluencyScore, setFluencyScore] = useRecoilState(fluencyScoreAtom);
    const [originalityScore, setOriginalityScore] = useRecoilState(originalityScoreAtom);
    const [jwtToken, setJwtToken] = useRecoilState(jwtTokenAtom);
    const [creativityCategory, setCreativityCategory] = useState(null);



    const nextComposition = () => {
        setFlexabilityScore(0)
        setFluencyScore(0)
        setOriginalityScore(0)
        nav("/compose")
    }

    const endTask = () => {
        setJwtToken([])
        setSubmissions(0)
        setFlexabilityScore(0)
        setFluencyScore(0)
        setOriginalityScore(0)
        setAllowed2(true)
        nav("/SurveyEndPage")
    }

    useEffect(() => {

        console.log(totalResult)
        if (totalResult < 200) {
            setCreativityCategory(0)
            
        }
        else if(totalResult >= 200 && totalResult < 350) {
            setCreativityCategory(1)
        }
        else if(totalResult >= 350) {
            setCreativityCategory(2)
        }
        setImage("data:image/jpeg;charset=utf-8;base64,"+musicatResult)
        console.log(creativityCategory)


    },[musicatResult])
    


    return (

        
        <div>

            
            <div style={{backgroundColor:"#debd90" ,fontSize:"40px","fontWeight": "bold",textAlign:"center"}}> Fantasize Freely  </div>
            
            
               <div style={{backgroundColor:"#debd90" ,width:"700px", height:"500px", marginLeft:"600px",marginTop:"100px"}}>
                <h1 style={{textAlign:"center",marginBottom:"80px"}}>Your personal Dashboard</h1>
                <div style={{marginLeft:"50px"}}>
                <h2>Guidelines to improve your music composition</h2>
                <h3>When do we call a composition to be creative</h3>
                <p>
                    Creativity is often defined to be the ability to produce some original and unusual ideas.
                    Some of the great creativity theorists developed measurable quantifiers to conclude if a work
                    is creative or not. You can make use of some of the following tips to make your composition creative.
                </p>
                <ol style={{marginTop:"10px"}}>
                    <li> When given a genre think of it as many combinations as possible. Be fluent in your thoughts.</li>
                    <li> Be more divergent in your thought process.</li>
                    <li> Order your thoughts on a music to identify if the composition you produce is distinguishable from other works</li>
                </ol>
                
                </div>
                </div>
                <div style={{marginLeft:"750px"}}> 
               
               {submissions < 5 && <Button onClick={nextComposition} style={{margin:"50px","fontWeight": "bold","borderRadius":"5px","color":"white","height":"70px","backgroundColor":"#2e63b8","border":"#2e63b8 2px solid"}}>Next Composition</Button>}
               {submissions > 0 && <Button onClick={endTask} style={{margin:"50px","fontWeight": "bold","borderRadius":"5px","color":"white","height":"70px","backgroundColor":"#2e63b8","border":"#2e63b8 2px solid"}}>End Task</Button>}
   
   
               </div>

           
            
      

            
           
           
            
        </div>


    );


    }



export default Result;