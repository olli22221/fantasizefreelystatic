import { musicNotes as musicNotesAtom, notePointer as notePointerAtom, noteCount as noteCountAtom } from './redux/store'
import { useRecoilState, useRecoilValue,useResetRecoilState } from 'recoil'
import React from 'react';
import { useNavigate } from "react-router-dom";




function CreativityTask() {

    
const divStyleNotePanel = {
    display:'flex',
    justifyContent: 'center',
    margin: '100px',
    height: "800px",
    flex: 'auto'
    
  };

  let nav = useNavigate();
    const navToComposePanel = () => {

       

        nav("/Compose")

        

    }
  
  
    return(

      <div>
        <div className="row">
        <div className="taskdscr" >
        </div>
        <div className="taskdscr">
          <button onClick={navToComposePanel}>Compose</button>
        </div>
        </div>



      </div>

      /*
        <div > 
    
     <div style={divStyleNotePanel}>
     <div className='dropMidi'>
      <DragDrop />
      <SubmitFile />
     </div>
     <Score />
      
    
    
          
      </div>

      </div>

      */
    );


}


export default CreativityTask;