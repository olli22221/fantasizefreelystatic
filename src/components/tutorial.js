import { useRecoilState, useRecoilValue,useResetRecoilState } from 'recoil'
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Beginning from "../media/Tutorial/Beginning.PNG"
import AddnewNotes from "../media/Tutorial/ADDNEWNOTES.PNG"
import BackToAddMode from "../media/Tutorial/BACKTOADDMODE.PNG"
import BackToAddMode2 from "../media/Tutorial/BACKTOADDMODE2.PNG"
import ComposePanel from "../media/Tutorial/ComposePanel.PNG"
import ComposePanelChangedDuration from "../media/Tutorial/ComposePanelChangedDuration.PNG"
import ComposePanelSharpNotes from "../media/Tutorial/ComposePanelSharpNotes.PNG"
import CreativityScores from "../media/Tutorial/CreativityScores.PNG"
import Delete from "../media/Tutorial/DELETE.PNG"
import GetInspiration1 from "../media/Tutorial/GetInspiration1.PNG"
import GetInspiration2 from "../media/Tutorial/GetInspiration2.PNG"
import PlaySuggestion from "../media/Tutorial/PlaySuggestion.PNG"
import Replace from "../media/Tutorial/REPLACE.PNG"
import Replace2 from "../media/Tutorial/REPLACE2.PNG"
import ReplaceDeactivated from "../media/Tutorial/REPLACEDEACTIVATED.PNG"
import ShowColors from "../media/Tutorial/ShowColors.PNG"
import ShowDurations from "../media/Tutorial/ShowDurations.PNG"
import ShowEugeneStructures from "../media/Tutorial/ShowEugeneStructures.PNG"
import ShowPitches from "../media/Tutorial/ShowPitches.PNG"
import SubmitComposition from "../media/Tutorial/SubmitComposition.PNG"
import SubmitComposition1 from "../media/Tutorial/SubmitComposition1.PNG"
import WholeMeasure from "../media/Tutorial/WholeMeasure.PNG"
import ChangeCursor from "../media/Tutorial/ChangeCursor.PNG"
import ChangeCursor2 from "../media/Tutorial/ChangeCursor2.PNG"
import result from "../media/Tutorial/result.PNG"




function Tutorial() {

    


  let nav = useNavigate();
    const navToComposePanel = () => {

       

        nav("/Compose")

        

    }
  
  
    return(

      <div>
        <h1 style={{textAlign:"center",fontSize: "45px"}}>Tutorial of Fantasifreely</h1>

        <h1 style={{textAlign:"center",fontSize: "30px"}}>Welcome to the Tutorial of Fantasizefreely. In the following I will walk through all the
        functionalities provided. <br></br> There are 4 main sections. The Score, Composing Panel, Inspiration Section and the Creativity Score display.<br></br>
        Pay attention to the red arrows and associated numbers. I will explain these references in the description texts under the <br></br>
        corresponding Image.</h1>

        
        <div className="taskdscr" >
          <h1 style={{textAlign:"center",marginBottom:"50px"}}>At the very Beginning of the Composition</h1>
        <img
                    width={1000}
                    height={600}
                    src= {Beginning}
                />
                <h1 style={{textAlign:"center",fontSize: "25px"}}>
                  At the Score Section you see a cursor(1) which is at the beginning of the composition. When you start adding notes this cursor will move
                  forward. By clicking onto the notes inside the Score you can mark them and depending in which mode you are replace or add a new note. Deleting
                  Notes from the Score is possible by clicking on the delete button. I will explain this later in the Compose Panel Section.
                  Also it is possible to change the meter of the Score(2). The Play The Melody Button(3) will play the current composed music composition.
                  At (4) you can set different volumes for each measure. 

                </h1>

        </div>
        <div className="taskdscr">
        <h1 style={{textAlign:"center",marginBottom:"50px"}}>The Composition Panel</h1>
        <img
                    width={1400}
                    height={600}
                    src= {ComposePanel}
                />

          <h1 style={{textAlign:"center",fontSize: "25px"}}>
                  The Composing Panel provides music notes (3) from the end of the 3rd octave until the C note from the 6th octave.
                  It also gives you the opportunity to give the notes different duration (1) (whole notes, half notes, quarter notes, eighth notes and sixteenth notes).
                  By clicking on one of the buttons the compose Panel will changed the duration of the notes in the composition panel.
                  You can also make notes sharp by clicking on the Sharp Button(2). What happens if one clicks on the Sixteenth Notes Button(1)
                  we will see at the next picture.

                </h1>

        </div>


        <div className="taskdscr">
        <h1 style={{textAlign:"center",marginBottom:"50px"}}>Changing Durations</h1>
        <img
                    width={1400}
                    height={600}
                    src= {ComposePanelChangedDuration}
                />

          <h1 style={{textAlign:"center",fontSize: "25px"}}>
                  Now after clicking on the Sixteenth Notes Button you see the notes changed to sixteenth duration. Lets click on the Sharp Button (2)
                  and see what is happening. Next Picture will tell us.

                </h1>

        </div>


        <div className="taskdscr">
        <h1 style={{textAlign:"center",marginBottom:"50px"}}>Changing To Sharp Notes</h1>
        <img
                    width={1400}
                    height={600}
                    src= {ComposePanelSharpNotes}
                />

          <h1 style={{textAlign:"center",fontSize: "25px"}}>
                  Now after clicking on the Sharp Button you see the notes changed to sharp representation. If you want to go back to normal
                  representation just click on the NONE Button (2). It will change immediately back.

                </h1>

        </div>


        <div className="taskdscr">
        <h1 style={{textAlign:"center",marginBottom:"50px"}}>Adding Notes</h1>
        <img
                    width={1400}
                    height={600}
                    src= {AddnewNotes}
                />

          <h1 style={{textAlign:"center",fontSize: "25px"}}>
                 As mentioned at the top in the introduction section there two modes. Add Notes Mode and Replace Notes Mode. By default Add Notes Mode
                 is activated. The Cursor in red (1) is moving forward as you compose and add new notes by clicking on the notes in the composition panel.
                 By clicking on another note inside the score you can change the position of the cursor. Lets click on the second quarter note in the 2nd measure.

                </h1>

        </div>

        <div className="taskdscr">
        <h1 style={{textAlign:"center",marginBottom:"50px"}}>Changing the Cursor</h1>
        <img
                    width={1400}
                    height={600}
                    src= {ChangeCursor}
                />

          <h1 style={{textAlign:"center",fontSize: "25px"}}>
                 We changed the cursors position to the 2nd note in the 2nd measure (1). Now by clicking on the DELETE Button (2) we let the note vanish 
                 from the 2nd measure in the score. 
                 
                </h1>

        </div>


        <div className="taskdscr">
        <h1 style={{textAlign:"center",marginBottom:"50px"}}>Changing the Cursor</h1>
        <img
                    width={1400}
                    height={600}
                    src= {ChangeCursor2}
                />

          <h1 style={{textAlign:"center",fontSize: "25px"}}>
                After the deletion of the note the cursor changed its position to the preceding note (1). Now lets change the position of the cursor again to the 2nd note (2) of 
                the measure. Click on the 2n note.
                 
                </h1>

        </div>


        <div className="taskdscr">
        <h1 style={{textAlign:"center",marginBottom:"50px"}}>Replace a Note</h1>
        <img
                    width={1400}
                    height={600}
                    src= {Replace}
                />

          <h1 style={{textAlign:"center",fontSize: "25px"}}>
                Now the cursor (1) has changed its position to the 2nd note of the measure. Now we want to replace this note with a half note.
                For this we have to activate the REPLACE Mode. This is done by clicking on the REPLACE Button (2). We also need to change the duration
                of the notes in the compose Panel. This is done by clicking on the HALF NOTES Button (3).
                </h1>

        </div>


        <div className="taskdscr">
        <h1 style={{textAlign:"center",marginBottom:"50px"}}>Replace a Note</h1>
        <img
                    width={1400}
                    height={600}
                    src= {Replace2}
                />

          <h1 style={{textAlign:"center",fontSize: "25px"}}>
                After clicking on the REPLACE BUTTON this Button is bordered by a white color. This means we are in Replacing Mode.
                By clicking on the F Note (2) the note will be replaced. As you can see in the picture. But always keep the meter in mind.
                If a note doesnt fit into a measure because the meter doesnt allow an error message will show up.
                So in this case you cant add whole note because it doesnt fit as already two other quarter notes reside inside the measure.

                </h1>

        </div>


        <div className="taskdscr">
        <h1 style={{textAlign:"center",marginBottom:"50px"}}>Back to Add Mode</h1>
        <img
                    width={1400}
                    height={600}
                    src= {BackToAddMode}
                />

          <h1 style={{textAlign:"center",fontSize: "25px"}}>
                After clicking on the REPLACE Button (1) again the Add Mode will be activated. Now we see the cursor is positioned at the 2nd note of the 
                2nd measure. Lets add a new note between the 2nd note and 3rd note of the 2nd measure (2). This is done by clicking on one of the notes in the
                composition panel. Lets choose note G . Click on the G note. 
                
                </h1>

        </div>

        <div className="taskdscr">
        <h1 style={{textAlign:"center",marginBottom:"50px"}}>Back to Add Mode</h1>
        <img
                    width={1400}
                    height={600}
                    src= {BackToAddMode2}
                />

          <h1 style={{textAlign:"center",fontSize: "25px"}}>
                The new note G will show up as you can see in the 2nd measure.
                I hope this gave you a good introduction in how to compose with Fantasizefreely.
                
                </h1>

        </div>


        <div className="taskdscr">
        <h1 style={{textAlign:"center",marginBottom:"50px"}}>Get Inspiration</h1>
        <img
                    width={1400}
                    height={600}
                    src= {GetInspiration1}
                />

          <h1 style={{textAlign:"center",fontSize: "25px"}}>
                Lets go to the other side of the application. Starting at the Inspiration Section.
                This section consists of a Button "Get Inspiration" (1) which by clicking on it run an artificial Intelligence in the
                background to compute the upcoming notes to give you some inspiration. In (2) you can choose 3 different creativity mode for the 
                AI. It can be less creative which means it doesnt do any unexpected, surprising stuff. It can be more creative which means it
                creates more novel music. So the suggestions will be more unexpected and novel. Or just take the default one which lies in the middle.
                So it is up to you what you prefer in this case. If you have set a creativity degree for the AI then click on the "Get Inspration" Button.
                
                </h1>

        </div>

        <div className="taskdscr">
        <h1 style={{textAlign:"center",marginBottom:"50px"}}>Get Inspiration</h1>
        <img
                    width={1400}
                    height={600}
                    src= {GetInspiration2}
                />

          <h1 style={{textAlign:"center",fontSize: "25px"}}>
                After clicking on this Button you will have to wait like 30 to 60 seconds depending on how busy the backend server is (1).
                But when the loading screen disappears you can choose one of the inspiration Types under the Button.
                
                </h1>

        </div>

        <div className="taskdscr">
        <h1 style={{textAlign:"center",marginBottom:"50px"}}>Inspiration Type</h1>
        <img
                    width={1400}
                    height={600}
                    src= {ShowColors}
                />

          <h1 style={{textAlign:"center",fontSize: "25px"}}>
                For the inspiration type "Color" to show up click on the corresponding radio Button.
                This type shows you the pitch heights in color represesntation. Choose a reference note and then according to the brightness of the
                colors decide which notes come next.

                
                </h1>

        </div>

        <div className="taskdscr">
        <h1 style={{textAlign:"center",marginBottom:"50px"}}>Inspiration Type</h1>
        <img
                    width={1400}
                    height={600}
                    src= {ShowDurations}
                />

          <h1 style={{textAlign:"center",fontSize: "25px"}}>
                For the inspiration type "Durations" (1) to show up click on the corresponding radio Button (2).
                This type shows you the only the durations of the computed upcoming notes. You have to decide which pitch heights fit.

                
                </h1>

        </div>


        <div className="taskdscr">
        <h1 style={{textAlign:"center",marginBottom:"50px"}}>Inspiration Type</h1>
        <img
                    width={1400}
                    height={600}
                    src= {ShowPitches}
                />

          <h1 style={{textAlign:"center",fontSize: "25px"}}>
                For the inspiration type "Pitches" (2) to show up click on the corresponding radio Button (1).
                This type shows you the only the pitches of the computed upcoming notes. You have to decide which octave and which durations fit.

                
                </h1>

        </div>


        <div className="taskdscr">
        <h1 style={{textAlign:"center",marginBottom:"50px"}}>Inspiration Type</h1>
        <img
                    width={1400}
                    height={600}
                    src= {PlaySuggestion}
                />

          <h1 style={{textAlign:"center",fontSize: "25px"}}>
                For the inspiration type "PlaySuggestion" (1) to show up click on the corresponding radio Button (2).
                This type plays the whole suggested upcoming notes. Click on the Button and listen to it. Then figure out which notes
                were played and if they fit as upcoming notes.

                
                </h1>

        </div>


        <div className="taskdscr">
        <h1 style={{textAlign:"center",marginBottom:"50px"}}>Inspiration Type</h1>
        <img
                    width={1400}
                    height={600}
                    src= {WholeMeasure}
                />

          <h1 style={{textAlign:"center",fontSize: "25px"}}>
                For the inspiration type "WholeMeasure" (2) to show up click on the corresponding radio Button (1).
                This type shows the whole suggested upcoming notes. You have to decide if they fit as upcoming notes.

                
                </h1>

        </div>


        <div className="taskdscr">
        <h1 style={{textAlign:"center",marginBottom:"50px"}}>Inspiration Type</h1>
        <img
                    width={1400}
                    height={600}
                    src= {ShowEugeneStructures}
                />

          <h1 style={{textAlign:"center",fontSize: "25px"}}>
                For the inspiration type "EugeneStructures" (1) to show up click on the corresponding radio Button (2).
                This type show the encoded version of the notes. Your task is to decode the symbols into meaningful succession of notes.
                If you hover over the corresponding radio Button there is an explanation provided<br></br>
                <br></br><br></br>
                Also here is a link to the book where the symbols will be explained on page 96.<br></br><br></br>
                <a style={{border:"solid 2px blue",color:'blue',textDecoration: 'none'}} href="https://www.dropbox.com/s/5kgn7ox6e5wuah2/narmour.melodic_structures.pdf?dl=0" target="_blank">Eugene Narmours</a>

                
                </h1>

        </div>

        <div className="taskdscr">
        <h1 style={{textAlign:"center",marginBottom:"50px"}}>Creativity Scores</h1>
        <img
                    width={1400}
                    height={600}
                    src= {CreativityScores}
                />

          <h1 style={{textAlign:"center",fontSize: "25px"}}>
                This sections gets updated every time you change your Score/Composition.
                It shows you a flexability Score which tells you how distinct/divers your musical ideas within the composition are.
                It shows you a Fluency Score which tells you how many musical thoughts you created and it shows you an Originality Score 
                which tells you how novel your musical ideas are against a general population of music composition and your previuosly created compositions.


                
                </h1>

        </div>


        <div className="taskdscr">
        <h1 style={{textAlign:"center",marginBottom:"50px"}}>Submit Composition</h1>
        <img
                    width={1400}
                    height={600}
                    src= {SubmitComposition}
                />

          <h1 style={{textAlign:"center",fontSize: "25px"}}>
                
                When you composed at least 8 measure you are qualified to submit your Composition.
                Click on the Submit Composition Button (1).

                
                </h1>

        </div>


        <div className="taskdscr">
        <h1 style={{textAlign:"center",marginBottom:"50px"}}>Submit Composition</h1>
        <img
                    width={1400}
                    height={600}
                    src= {SubmitComposition1}
                />

          <h1 style={{textAlign:"center",fontSize: "25px"}}>
                
                This will take like 20 to 30 seconds (1) until you are navigated to the result page.

                
                </h1>

        </div>


        <div className="taskdscr">
        <h1 style={{textAlign:"center",marginBottom:"50px"}}>See your overall Performance</h1>
        <img
                    width={1400}
                    height={600}
                    src= {result}
                />

          <h1 style={{textAlign:"center",fontSize: "25px"}}>
                
                The result page will show you musicats listening result (3) where circles mean that you have created groups between
                nearby measures and line connections between them mean that you created analogies. So musicat checks the 
                appropiateness of your composition.
                Also an overall Score (2) will show up which is the combination of musicats score and the 3 Creativity Scores.
                Click on the "Another Composition Button" (1) for creating another composition.
                After 3 Compositions you have the opportunity to end the whole task by clicking on the "End Task" Button.
                After 5 Compositions the task ends and only a Button "End Task" will show up.

                
                </h1>

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


export default Tutorial;