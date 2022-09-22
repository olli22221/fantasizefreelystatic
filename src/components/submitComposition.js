import React, { useEffect, useState } from "react";
import {midiFiles as midiFilesAtom, jwtToken as jwtTokenAtom, 
  subjectId as subjectIdAtom, counter as counterAtom, 
  musicatResponse as musicatResponseAtom, originalityScore as originalityScoreAtom,
  fluencyScore as fluencyScoreAtom,flexabilityScore as flexabilityScoreAtom,
submissions as submissionsAtom, inspirationFlag as inspirationFlagAtom ,
groups as groupsAtom, analogies as analogiesAtom, totalResult as totalResultAtom} from '../redux/store'
import { useRecoilState, useRecoilValue } from 'recoil'
import axios from "axios";
import { calculateSteps } from './util';
import { useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { useAlert } from 'react-alert'
import ReactLoading from 'react-loading';


function SubmitComposition({composition,meter}) {
  let nav = useNavigate();
  const alert = useAlert()

  const [submitCompositionFlag,setSubmitCompositionFlag] = useState(false)

const jwtToken = useRecoilValue(jwtTokenAtom)
const midiFiles = useRecoilValue(midiFilesAtom);
const inspirationFlag = useRecoilValue(inspirationFlagAtom);
let id = useRecoilValue(subjectIdAtom);
const [groups, setGroups] = useRecoilState(groupsAtom);
const [analogies, setAnalogies] = useRecoilState(analogiesAtom);
const [counter, setCounter] = useRecoilState(counterAtom);
const [submissions, setSubmissions] = useRecoilState(submissionsAtom);
const [musicatResponse, setmusicatResponse] = useRecoilState(musicatResponseAtom);
const [totalResult, setTotalResult] = useRecoilState(totalResultAtom);


const checkComposition = (composition_,meter_) => {
  let measureCnt = 0;
  for (let index = 0; index < composition_.length; index++) {
    const measure = composition_[index].filter(element => element.locked == false && element.occupied==true)
    let meterInformation = meter_ - 1
    for (let idx = 0; idx < measure.length; idx++) {
        const dur = calculateSteps(measure[idx].duration)
        meterInformation = meterInformation - dur
      
    }
    if (measureCnt < 8) {
      if (meterInformation > 0) {
        return false
      }
      else{measureCnt++}
      
    }
      


  }

  if(measureCnt < 8){
    return false
  }



  return true
    

}

const prepareMeter = (meter_) => {
  let result = []
  for (let index = 0; index < meter_.length; index++) {
      result.push(meter_.numberofPlaces)
  }
  console.log(result)
  return result


}

const prepareComposition = (composition_) => {
  let result = []
  
  for (let index = 0; index < composition_.length; index++) {

    const measure = composition_[index].filter(element => element.locked == false && element.occupied==true)
    if (measure.length < 1) {
      return result
    }
    let tmpMeasure = []
    for (let idx = 0; idx < measure.length; idx++) {
      let tmpNote = {
        type: measure[idx].type,
        duration: measure[idx].duration,
        accented: measure[idx].accented
      }
      if (measure.length > 0) {
      tmpMeasure.push(tmpNote)

      }
      else{
        return result
      }

    }

    result.push(tmpMeasure)
  }
  
  return result


}

  const handleSubmit = () => {

    const check = checkComposition(composition,meter)
    if(!check){
      alert.show('Composition is not complete. You need to compose at least 2 phrases');
      return
    }

    else{

      setSubmitCompositionFlag(true)
    
    
    const finalComposition = prepareComposition(composition)
    
    


    let payload = {
        data: finalComposition,
        jwtToken: jwtToken
    }
    
    

    axios.post("https://fantasifreely.de/submitCompositionStatic", JSON.stringify(payload), {
        headers: {
            "Content-Type": "application/json"
            
        }
    }).then((response) => {
        
        const submissionCount = submissions + 1
        setSubmissions(submissionCount)
        
        
        nav("/Result")

    }).catch((error) => {
      setSubmitCompositionFlag(false)
      console.log(error)
    });
    
   /* data.append("count", counter)
    data.append("file", midiFiles)
    data.append("jwtToken", jwtToken)
    axios.post("http://192.168.178.46:5000/upload", data,{
        headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "true",
        }
    })
    .then((response) => {
        console.log(response.data)
    }).catch((error) => {
      console.log(error)
    });
    cnt++;
    setCounter(cnt)
    console.log(counter)*/
  }

    
  };

  useEffect(() => {

    
   

},[])

  return (
    <div >
       { submitCompositionFlag
                    ?<div > <div style={{fontWeight: "bold",fontSize:"22px",marginBottom:"30px", textAlign:"center", backgroundColor:"#399ddb"}}>Submitting the Composition</div> 
                    <div style={{marginLeft:"200px"}}><ReactLoading type={"spin"} color={"ffffff"} height={'20%'} width={'20%'} /></div></div>

                   :
       <Button onClick={handleSubmit} style={{"fontWeight": "bold","borderRadius":"5px","color":"white","height":"50px","backgroundColor":"#403c3b","border":"#403c3b 2px solid"}} variant="contained" endIcon={<SendIcon />}>
        Submit Composition
      </Button>}
      </div>
  );
}

export default SubmitComposition;