import React from "react";
import './css/Main.css';
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState, useRecoilValue } from 'recoil'
import { jwtToken as jwtTokenAtom, originalityScore as originalityScoreAtom,
flexabilityScore as flexabilityScoreAtom, fluencyScore as fluencyScoreAtom, submissions as submissionsAtom} from "./redux/store";
import  { useState,useCallback,useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useAlert } from 'react-alert'
import { Button, Stack } from '@mui/material';



function Main() {
    const [jwtToken, setjwtToken] = useRecoilState(jwtTokenAtom);

    const [originalityScore, setOriginalityScore] = useRecoilState(originalityScoreAtom);
    const [flexabilityScore, setFlexabilityScore] = useRecoilState(flexabilityScoreAtom);
    const [fluencyScore, setFluencyScore] = useRecoilState(fluencyScoreAtom);
    const [submissions, setSubmissions] = useRecoilState(submissionsAtom);
    const [name, setName] = useState('');
    const handleChange = (event) => {
      setName(event.target.value);
    };
    const alert = useAlert()

    let nav = useNavigate();
    

    const navToComposePanel = () => {

        if (name != '') {


            let payload = {
                data:name,
                basic:"1"
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
            caches.keys().then((names) => {
                names.forEach((name) => {
                  caches.delete(name);
                });
              });

        }).catch((error) => {
            if(error.response.status == 408 ){
                alert.show('Given Initial already exists. Please provide a different inital');  return
            }else{
            console.log(error)}
        })

    }
        //nav("/Compose")

        

        else{
            alert.show('Please put your initials in the Name Box');  return
        }
    }

   

    return (
        <div>
        <div style={{fontSize: "50px",textAlign:"center",fontFamily:"Cursive",height:"80px",width:"550px",marginLeft:"680px",marginTop:"30px","color":"#2e63b8" }}>
        Fantasize Freely
    </div>
    <div style={{alignItems:"center"}} >
        
       
        
       
        <div style={{height:"900px"}}>
        
            
        
            <div style={{textAlign:"center",fontFamily:"Cursive",borderRadius:"30px",fontSize: "25px",height:"360px",width:"900px",marginLeft:"500px",marginTop:"100px", backgroundColor:"whitesmoke","color":"black"}}>
        <Typewriter options={{delay: 5}}
        onInit={(typewriter) => {
            typewriter.typeString("Welcome fellow Musician! On this platform you can test your creativity in melody composition. The main task is to compose 3-5 short melodies with a length of 8 to 16 measures. During composing you have the opportunity to listen to your melody but also you can play it on an acoustic instrument. When the time has come and you think your melody is ready for a submission just click on the submitComposition Button. At the end you will be navigated to a feedback page. I wish you a lot of fun.").start();
        } }  
        />
            </div >

            <div style={{marginLeft:"750px"}}>
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 2, width: '40ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-name"
        label="Please type your initials here"
        value={name}
        onChange={handleChange}
        style={{border: '3px solid #403c3b',backgroundColor:'white',marginTop:"50px"}}
      />
      
    </Box>
    </div>
            
            <Button style={{color:"white",height:"150px",padding:"0px",backgroundColor:"#2e63b8",marginTop:"40px",marginLeft:"800px","borderRadius":"5px","font-weight": "bold","height":"50px","width":"265px","border":"#2e63b8 2px solid"}} onClick={navToComposePanel}>Lets Begin</Button>

        </div>
    </div>

       
    </div>



    )
}


export default Main;