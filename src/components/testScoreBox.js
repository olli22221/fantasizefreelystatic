import { height } from '@mui/system';
import React ,{  useEffect,useState} from 'react';
import ScoreBox from './ScoreBox';


function TestScoreBox() {



    return (
        <div style={{margin:"100px"}}>
        <div style={{ height:"800px", margin:"100px"}}>


            <ScoreBox timeSign="4/4" violin={false}/>
        </div>

        </div>


    )




    }



    export default TestScoreBox;
