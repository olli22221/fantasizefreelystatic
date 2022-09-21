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
    
import { Progress } from 'react-sweet-progress';
import { Button } from '@mui/material';
import ReactTooltip from 'react-tooltip';



function Result() {

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
        nav("/")
        
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
            <div style={{float:"left"}}>
            <div style={{textAlign:"center",width:"250px",float:"left", "fontWeight": "bold",marginTop:"200px", marginLeft:"160px",backgroundColor:"#2e63b8", color:"white",fontSize:"25px"}}><ReactTooltip multiline={true}/><p   
             data-tip="Circles define groups between two measures or meta groups between two groups. <br> A group in musicat is calculated based on musical gestalt principles and the theory of melody.<br>
             Connection lines between two groups are called analogies. <br> We differentiate
             between string analogies(thick lines) and weak analogies(thin lines). <br>Connection lines between measures are rhythmic realtionships or subanalogies. <br>  An analogy is calculated on the 
             basis of melodic expectation theory and analogy in musical motifs. <br> Musicat emulates an experienced human listener who grades the appropiateness of your melody.<br>
             The more circles and Lines are drawn over the whole score the better your melody is. <br> On the bottom of the image you see the happiness measures which describes how good
             structures are associated with the measure. <br>  If the color is green the measure is associated with good and strong structures.<br> Low happiness (red color) is the consequence 
             of beaing associated with weak structures or if the measure has no association with any structures at all.
             ">Explain Musicat</p></div>   
           
            <div style={{float:"left",marginLeft:"200px",border:"solid 4px silver",borderRadius:"20px",backgroundColor:"#debd90" ,width:"700px", height:"200px", marginTop:"40px",alignItems:"center",display:"flex",justifyContent:"center"}}>
                <div style={{float:"left"}}>
                
                   
                <div style={{float:"left", marginLeft:"30px"}}>
                    
                    <div style={{borderRadius:"8px",textAlign: "center",height:"30px",maxWidth:"190px","fontWeight": "bold",backgroundColor:"#bf622c" ,marginBottom:"30px",color:"white"}}>
                    <p    data-tip="Flexibility is the ability to think of diverging ideas on any given topic and being able to look at it from
many different perspectives.">Flexability Score</p><ReactTooltip />
                    </div>
            <Progress  type="circle" percent={Math.floor((flexabilityScore/flexMax)*100)}  />

            </div>
            <div style={{float:"left", marginLeft:"60px"}}>
                    <div style={{borderRadius:"8px",textAlign: "center",height:"30px",maxWidth:"130px","fontWeight": "bold",backgroundColor:"#0f802d" ,marginBottom:"30px",color:"white"}}>
                    <p    data-tip="Fluency is the ability to think of as many ideas on any given topic and being affluent in one’s thoughts.">Fluency Score</p><ReactTooltip />
                    </div>
            <Progress type="circle" percent={Math.floor((fluencyScore/fluencyMax)*100)}  />

            </div>
            <div style={{float:"left",marginLeft:"60px"}}>
                    <div style={{borderRadius:"8px",textAlign: "center",height:"30px",width:"130px","fontWeight": "bold",backgroundColor:"#387ac9" ,marginBottom:"30px",color:"white"}}>
                    <p    data-tip="Originality is the ability to produce new compositions that is distinguiable from other works.">Originality Score</p><ReactTooltip />
                    </div>
            <Progress  type="circle" percent={Math.floor((originalityScore/origMax)*100)}  />

            </div>
            
            </div>
            
            
            </div>
            <div style={{float:"left",marginLeft:"50px",marginTop:"50px"}}> 
               
               {submissions < 5 && <Button onClick={nextComposition} style={{margin:"50px","fontWeight": "bold","borderRadius":"5px","color":"white","height":"70px","backgroundColor":"#2e63b8","border":"#2e63b8 2px solid"}}>Next Composition</Button>}
               {submissions > 3 && <Button onClick={endTask} style={{margin:"50px","fontWeight": "bold","borderRadius":"5px","color":"white","height":"70px","backgroundColor":"#2e63b8","border":"#2e63b8 2px solid"}}>End Task</Button>}
   
   
               </div>
           
            
            </div>

            <div style={{marginLeft:"50px",borderRadius:"30px",border:"dashed 10px #debd90",float:"left", margin:"25px",backgroundColor:"whitesmoke"}}>
           <div style={{marginTop:"5px",fontSize:"25px","fontWeight": "bold",textAlign:"center"}}> Musicats Listening Result </div>
                <img
                    width={1800}
                    height={500}
                    src= {image}
                />
                
            
            </div>
           
           
            
        </div>


    );


    }



export default Result;