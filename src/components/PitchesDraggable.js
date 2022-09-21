import React ,{useEffect, useRef, useState} from 'react';

import {dragging as dragAtom, replaceActivated as replaceActivatedAtom, inspirationFlag as inspirationFlagAtom} from '../redux/store'
import { useRecoilState, useRecoilValue } from 'recoil';
import { margin } from '@mui/system';



function PitchesDraggable({item ,url,index, moveItem, target,addPitch,replacePitch}) {
    const ref = useRef(null)
    const [dragging, setDragging] = useRecoilState(dragAtom);
    const replaceActivated = useRecoilValue(replaceActivatedAtom)
    const [buttonActivated,setButtonActivated] = useState(false)
    const [panelsrc,setPanelsrc] = useState(false)
    const [inspirationFlag, setInspirationFlag] = useRecoilState(inspirationFlagAtom);



    
    const add = (item) => {
        if (!inspirationFlag) {
            addPitch(item)
        }

        
    } 

    const replace = (item) => {
        if (!inspirationFlag) {
        replacePitch(item)
        }
    }

    



    return(
        
           <div style={{ border: buttonActivated?
         '4px solid darkblue': '4px solid #b0b0b0'}}  className='column6'
            onClick={()=>{if(!replaceActivated){add(item)}else{replace(item)}}} onMouseDown={()=>{
                setButtonActivated(true); setPanelsrc(true)
            }} onMouseUp={()=>{setButtonActivated(false);setPanelsrc(false)}}> 
           <div className='h5'>{url.display} </div>
                   <div style={{marginLeft:"30px",cursor:"pointer"}}>
                    
        <img 
            
            className="flex-pitch"
            height="115px" 
            width="29px" 
            src= {url.panelsrc} 
           
            
            
        />

                    
        </div>
        </div>
        
                       
       
    )

    }

    export default PitchesDraggable;