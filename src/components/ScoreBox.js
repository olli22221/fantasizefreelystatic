import React, { useRef, useEffect} from 'react'
import VexFlow, { Accidental } from 'vexflow'
import { Score } from "react-vexflow";
import { useRecoilState, useRecoilValue } from 'recoil'
import Vex from "vexflow";
import { context as contextAtom } from '../redux/store';


const VF = VexFlow.Flow;
const { Formatter, Renderer, Stave, StaveNote ,Dot} = VF;

const clefAndTimeWidth = 60;



 const ScoreBox = ({notes, timeSign, violin}) => {
    function dotted(staveNote) {
        Dot.buildAndAttach([staveNote]);
        return staveNote;
    }


    const container = useRef();
    const rendererRef = useRef();
    

    useEffect(() => {
        
    if (rendererRef.current == null) {
    rendererRef.current = new Renderer(
    container.current,
    Renderer.Backends.SVG
    );
    }


    const renderer = rendererRef.current;
    renderer.resize(950, 230);
    const context = renderer.getContext();
    //const staveWidth = (width - clefAndTimeWidth) / staves.length;
    context.setFont('Arial', 10, '').setBackgroundFillStyle('red')
    const staveMeasure = new Stave(260, 50, 400);
    //const staveMeasure1 = new Stave(500, 100, 400);
    if(violin == true){
        staveMeasure.setContext(context).draw();
        //staveMeasure1.setContext(context).draw();
    }
    else{
        staveMeasure.setContext(context).draw();
        //staveMeasure1.setContext(context).draw();
    }
    

    const measureNotes1 = []
    const measureNotes2 = []
    //const notes_ =  notes.filter(piece => piece.show == true && piece.locked == false)
   // console.log(notes)
    const noteType = notes[1]
    const noteSharp = notes[2]
    for (let index = 0; index < noteType.length; index++) {
        const element = noteType[index];
        
        if (element == 'r') {
            noteType[index] = 'b/4'
        }
        
        
    }
    const durations = notes[0]
    console.log(noteType)
    console.log(durations)
    if(notes != undefined){
    for (let index = 0; index < noteType.length; index++) {
        if(noteType[index] != undefined){
            if (noteSharp[index] == 1) {

                measureNotes1.push(new StaveNote({ keys: [noteType[index]], duration: durations[index] }).addModifier(new Accidental("#")))
            }
            else{
                measureNotes1.push(new StaveNote({ keys: [noteType[index]], duration: durations[index] }))
            }
        }
    }
}

    
    
   /* measureNotes1.push(new StaveNote({ keys:["g/3"], duration:"q"}))
    measureNotes1.push(new StaveNote({ keys:["b/4"], duration:"8r"}))
    measureNotes1.push(new StaveNote({ keys:["b/4"], duration:"wr"}))
    measureNotes1.push(new StaveNote({ keys:["b/4"], duration:"hr"}))
    measureNotes1.push(new StaveNote({ keys:["b/4"], duration:"qr"}))
    measureNotes1.push(new StaveNote({ keys:["b/4"], duration:"16r"}))
    
    */
    
    if(measureNotes1.length>0){
    
    Formatter.FormatAndDraw(context, staveMeasure, measureNotes1);
    
    // Formatter.FormatAndDraw(context, staveMeasure1, measureNotes2);
    }

    

    

},[notes])

    return <div ref={container}  />

}


export default ScoreBox;