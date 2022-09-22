import React, { useState,useCallback,useEffect } from 'react';
import Pitches from './Pitches';
import './../App.css';
import PitchesDraggable from './PitchesDraggable';
import { calculateSteps } from './util';
import Select from 'react-select';
import ReactLoading from 'react-loading';
import DeleteIcon from '@mui/icons-material/Delete';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ReactTooltip from 'react-tooltip';
import LightbulbCircleSharpIcon from '@mui/icons-material/LightbulbCircleSharp';
import {activeMeasure as activeMeasureAtom,measure1 as measure1Atom,measure2 as measure2Atom,
    measure3 as measure3Atom,measure4 as measure4Atom,measure5 as measure5Atom,measure6 as measure6Atom,
    measure7 as measure7Atom,measure8 as measure8Atom,measure9 as measure9Atom,measure10 as measure10Atom,
    measure11 as measure11Atom,measure12 as measure12Atom,measure13 as measure13Atom,measure14 as measure14Atom,
    measure15 as measure15Atom,measure16 as measure16Atom,
    meter as meterAtom, dragging as dragAtom, 
    hovering as hoverAtom,activeNote as activeNoteAtom, pointer as pointerAtom, 
    replaceActivated as replaceActivatedAtom, activePanel as activePanelAtom,
    musicatResponse as musicatResponseAtom,originalityScore as originalityScoreAtom,
    fluencyScore as fluencyScoreAtom,flexabilityScore as flexabilityScoreAtom} from '../redux/store'
import { measure1Meter as measure1MeterAtom,measure2Meter as measure2MeterAtom,measure3Meter as measure3MeterAtom,
    measure4Meter as measure4MeterAtom,measure5Meter as measure5MeterAtom,measure6Meter as measure6MeterAtom,
    measure7Meter as measure7MeterAtom,measure8Meter as measure8MeterAtom ,measure9Meter as measure9MeterAtom,measure10Meter as measure10MeterAtom,
    measure11Meter as measure11MeterAtom,
    measure12Meter as measure12MeterAtom,measure13Meter as measure13MeterAtom,measure14Meter as measure14MeterAtom,
    measure15Meter as measure15MeterAtom,measure16Meter as measure16MeterAtom , inspirationFlag as inspirationFlagAtom } from '../redux/store';
import { useRecoilValue,useRecoilState } from 'recoil';
import {pitches,halfpitches,wholepitches,sixteenthpitches,eightpitches,
    defaultpitches,defaultpitchesoccupied, defaultPitchesArray_,sixteenthpitchesSharp,
eightpitchesSharp,pitchesSharp,wholepitchesSharp,halfpitchesSharp} from '../data/composePanelData'
import { jwtToken as jwtTokenAtom } from '../redux/store';
import Modal from 'react-modal';
import SubmitComposition from './submitComposition';
import {fourQuarter,twoQuarter,sixEighth} from '../data/meterData'
import 'reactjs-popup/dist/index.css';
import { useNavigate } from "react-router-dom";
import * as Tone from "tone";
import { playMelody, playSynth,NoteDurationDict, playsuggestion } from './ToneSampler';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import { Button, Stack } from '@mui/material';
import axios from "axios";
import { prepareComposition } from './util';
import ScoreBox from './ScoreBox';
import ShowImages from './showInspirationImages';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import { useAlert } from 'react-alert'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };


function Compose() {

    const [value, setValue] = useState('');
    const alert = useAlert()
    const handleTemperatureChange = (event) => {
        console.log(event)
        setTemperatureValue(event.target.value);
    }
    const handleChange = (event) => {
        
        
        setValue(event.target.value);
        
      };
    let nav = useNavigate();
    const flexMax = 550
    const origMax = 100
    const fluencyMax = 500
    const [temperatureValue, setTemperatureValue] = useState(1)
    const [narmourEncodingsState,setNarmourEncodingsState] = useState([])
    const noteCharDict = {"c":"C","d":"D","e":"E","f":"F","g":"G","a":"A","b":"B","r":"R"}
    const noteToPitchheightDict = {"g/3":55,"a/3":57,"b/3":59,"c/4":60,"d/4":62,"e/4":64,"f/4":65,"g/4":67,"a/4":69,"b/4":71,"c/5":72
    ,"d/5":74,"e/5":76,"f/5":77,"g/5":79,"a/5":81,"b/5":83,"c/6":84}
    const options = ["showWholeMeasure","playSuggestion","showDurations",
    "showPitches","showColors","showEugeneStructures"]
    const accentDict = {0:"",1:"#"}
    const [showWholeMeasure, setShowWholeMeasure] = useState([]);
    const [playSuggestionStateVar, setPlaySuggestionStateVar] = useState([]);
    const [showDurations, setShowDurations] = useState([]);
    const [showPitches, setShowPitches] = useState([]);
    const [showColors, setShowColors] = useState([]);
    const [showEugeneStructures, setShowEugeneStructures] = useState([]);
    
    const [option, setOption] = useState();
    //const [inspirations, setinspirations] = useState([]);
    const meterArray = [fourQuarter,twoQuarter,sixEighth]
    const meterSelect = [
        { value: 17, label: '4/4' },
        { value: 13, label: '6/8' },
        { value: 9, label: '2/4' },
    ]
    const [meterIndex1,setMeterIndex1] = useState(0)
    const [open, setOpen] = useState(false);
    const [volumeMeasure1,setvolumeMeasure1] = useState(0)
    const [volumeMeasure2,setvolumeMeasure2] = useState(0)
    const [volumeMeasure3,setvolumeMeasure3] = useState(0)
    const [volumeMeasure4,setvolumeMeasure4] = useState(0)
    const [volumeMeasure5,setvolumeMeasure5] = useState(0)
    const [volumeMeasure6,setvolumeMeasure6] = useState(0)
    const [volumeMeasure7,setvolumeMeasure7] = useState(0)
    const [volumeMeasure8,setvolumeMeasure8] = useState(0)
    const [volumeMeasure9,setvolumeMeasure9] = useState(0)
    const [volumeMeasure10,setvolumeMeasure10] = useState(0)
    const [volumeMeasure11,setvolumeMeasure11] = useState(0)
    const [volumeMeasure12,setvolumeMeasure12] = useState(0)
    const [volumeMeasure13,setvolumeMeasure13] = useState(0)
    const [volumeMeasure14,setvolumeMeasure14] = useState(0)
    const [volumeMeasure15,setvolumeMeasure15] = useState(0)
    const [volumeMeasure16,setvolumeMeasure16] = useState(0)
    const [meterscr1, setMetersrc1] = useState(fourQuarter);
    const musicatResult = useRecoilValue(musicatResponseAtom);
    const [isActive, setIsActive] = useState(false);
    const [panelArray, setpanelArray] = useState(pitches);
    const [panelDuration, setPanelDuration] = useState("quarter");
    const [accent, setAccent] = useState(0);
    const [activeNote, setactiveNote] = useRecoilState(activeNoteAtom);
    const [meter, setMeter] = useRecoilState(meterAtom);
    const [jwtToken, setJwtToken] = useRecoilState(jwtTokenAtom);
    const [measure1Meter, setmeasure1Meter] = useRecoilState(measure1MeterAtom);
    const [measure2Meter, setmeasure2Meter] = useRecoilState(measure2MeterAtom);
    const [measure3Meter, setmeasure3Meter] = useRecoilState(measure3MeterAtom);
    const [measure4Meter, setmeasure4Meter] = useRecoilState(measure4MeterAtom);
    const [measure5Meter, setmeasure5Meter] = useRecoilState(measure5MeterAtom);
    const [measure6Meter, setmeasure6Meter] = useRecoilState(measure6MeterAtom);
    const [measure7Meter, setmeasure7Meter] = useRecoilState(measure7MeterAtom);
    const [measure8Meter, setmeasure8Meter] = useRecoilState(measure8MeterAtom);
    const [measure9Meter, setmeasure9Meter] = useRecoilState(measure9MeterAtom);
    const [measure10Meter, setmeasure10Meter] = useRecoilState(measure10MeterAtom);
    const [measure11Meter, setmeasure11Meter] = useRecoilState(measure11MeterAtom);
    const [measure12Meter, setmeasure12Meter] = useRecoilState(measure12MeterAtom);
    const [measure13Meter, setmeasure13Meter] = useRecoilState(measure13MeterAtom);
    const [measure14Meter, setmeasure14Meter] = useRecoilState(measure14MeterAtom);
    const [measure15Meter, setmeasure15Meter] = useRecoilState(measure15MeterAtom);
    const [measure16Meter, setmeasure16Meter] = useRecoilState(measure16MeterAtom);
    const [showPitchesAccents, setShowPitchesAccents] = useState([])
    const [originalityScore, setOriginalityScore] = useRecoilState(originalityScoreAtom);
    const [flexabilityScore, setFlexabilityScore] = useRecoilState(flexabilityScoreAtom);
    const [fluencyScore, setFluencyScore] = useRecoilState(fluencyScoreAtom);
    const [replaceActivated, setreplaceActivated] = useRecoilState(replaceActivatedAtom);
    const [activePanel, setActivePanel] = useRecoilState(activePanelAtom);
    const [selectedOption, setSelectedOption] = useState(  { value: 17, label: '4/4' },);
    const [inspirationFlag, setInspirationFlag] = useRecoilState(inspirationFlagAtom);
    const [narmourFlag, setNarmourFlag] = useState(false);

    function valuetext(value) {
        return `${value}`;
      }
    
      function closeModal() {
        setOpen(false);
      }


      useEffect(() => {

        if (inspirationFlag == true) {
            setOpen(true)
        }

        if (inspirationFlag == false) {
            setOpen(false)
        }
              



    }, [inspirationFlag])

    useEffect(() => {

       if (jwtToken.length==0 ) {
        nav("/")
       }
              



    }, [jwtToken])


      
    const calculatePitches = (inspirations) => {

        const pitches= []
        const notes = inspirations[1]
        const accents = inspirations[2]
        const durations = inspirations[0]
        for (let index = 0; index < notes.length; index++) {
            const dur = durations[index]
            if (!dur.includes("r")) {
                const tmpNote = notes[index]
                if (accents[index] == 1) {
                    pitches.push(noteToPitchheightDict[tmpNote] + 1)
                }
                else if(accents[index] == 2){
                    pitches.push(noteToPitchheightDict[tmpNote] - 1)
                }
                else{
                    pitches.push(noteToPitchheightDict[tmpNote])
            }
            }
            
            
        }


        
        return pitches
    }


    const calculatePitchesTest = (measure) => {
        const pitches= []
        console.log(measure)
        for (let index = 0; index < measure.length; index++) {
            const note = measure[index]
            if (note.accented != undefined) {
                if (note['accented'] == 1) {
                    pitches.push(noteToPitchheightDict[note['type'][0]] + 1)
                }
                else if(note['accented'] == 2){
                    pitches.push(noteToPitchheightDict[note['type'][0]] - 1)
                }
                else{
                    pitches.push(noteToPitchheightDict[note.type[0]])
            }
                
            }
            
            
        }


        console.log(pitches)
        return pitches
    }

    const computeRegistralDirection = (diff1,diff2) => {

        if (diff1 == 0 && diff2 == 0 ) {
            return "Lateral"
        }
        const registralDir1 = Math.sign(diff1)
        const registralDir2 = Math.sign(diff2)
        if (registralDir1 == registralDir2) {
            return true
        }
        else{return false}
    }

    const testNM = () => {
        setNarmourEncodingsState(calculateNarmourEncodings(calculatePitchesTest(measure1)))
    }

    const getNarmourEncodings = (pitches) => {
        return calculateNarmourEncodings(pitches.filter(x => x !='r'))
    }

    const isLarge = (diff) => {
        if (Math.abs(diff) > 3){
            return true
        }
        else{
            return false
        }
    }

    const calculateNarmourEncodings = (pitches) => {
        let index = 0
        let NarmourEncodings = []
        let state = "start"
        let diff1 = 0
        let diff2 = 0
        while (index < pitches.length-1) {
            
            const actualPitch = pitches[index]
            const nextPitch = pitches[index+1]
            if (state == "start") {
                diff1 = actualPitch - nextPitch
                state = "afterStart"
                index++
                continue
            }
            else if(state == "afterStart"){
                diff2 = actualPitch - nextPitch
                const intervallicDifference = Math.abs(diff1) - Math.abs(diff2)
                const registralDirection = computeRegistralDirection(diff1,diff2)

                if (registralDirection == true) {

                    if (intervallicDifference <= 2 && intervallicDifference >= -2) {
                        state = "processContinuation"
                        NarmourEncodings.push("P")
                        
                        continue
                    }
                    else{
                        if (Math.abs(diff1) <  Math.abs(diff2)) {
                            state = "start"
                            NarmourEncodings.push("VP")
                            continue
                        }
                        else{
                            state = "start"
                            NarmourEncodings.push("IR")
                        }
                    }

                }

                else if(registralDirection == false){

                    if (intervallicDifference <= 2 && intervallicDifference >= -2) {

                        if (intervallicDifference == 0) {
                            NarmourEncodings.push("ID")
                            state = "start"
                            
                            continue
                        }
                        else{
                            NarmourEncodings.push("IP")
                            state = "start"
                            
                            continue
                        }
                    }
                    else{
                        
                        if (isLarge(diff1) && isLarge(diff2)) {
                            NarmourEncodings.push("IP")
                            state = "start"
                            
                            continue
                            
                        }
                        else if (!isLarge(diff1) && isLarge(diff2)) {
                            NarmourEncodings.push("VR")
                            state = "start"
                            
                            continue
                        }
                        else{
                            NarmourEncodings.push("R")
                            state = "start"
                            
                            continue
                        }

                    }


                }

                else{
                    state = "duplicationContinuation"
                    NarmourEncodings.push("D")
                    continue

                }
            }

            else if (state == "duplicationContinuation") {
                
                diff1 = actualPitch - nextPitch
                index++
                state = "duplicationContinuation_"
                     continue
                    }
            else if (state == "duplicationContinuation_") {
                diff2 = actualPitch - nextPitch
                const registralDirection = computeRegistralDirection(diff1,diff2)
                if (registralDirection == "Lateral") {
                    state = "duplicationContinuation"
                    continue
                }

                    
                else{
                        index--
                        state = "start"
                        continue
                }
            }
            else if (state == "processContinuation") {
                diff1 = actualPitch - nextPitch
                index++
                state = "processContinuation_"
                continue
            }
            else if (state == "processContinuation_") {
            
                diff2 = actualPitch - nextPitch
                const intervallicDifference = Math.abs(diff1) - Math.abs(diff2)
                const registralDirection = computeRegistralDirection(diff1,diff2)
                if (registralDirection == true) {

                    if (intervallicDifference <= 2 && intervallicDifference >= -2) {
                        state = "processContinuation"
                        
                        continue
                    }
                    else{
                        
                        index--
                        state = "start"
                        continue
                        
                    }

                }

                
                else{
                        index--
                        state = "start"
                        continue
                }

            }
            
            	
        }
             
        
        return NarmourEncodings
       
    }






    const calculateColorbrightness = (inspirations) => {
        if (inspirations[1] != undefined ) {
            
        
        const tmpColors= []
        const notes = inspirations[1]
        const accents = inspirations[2]

        for (let index = 0; index < notes.length; index++) {
            const tmpNote = notes[index]
            if (tmpNote == 'r') {
                tmpColors.push("R")
                continue
            }
            if (accents[index] == 1) {
                tmpColors.push(noteToPitchheightDict[tmpNote] + 1)
            }
            else if(accents[index] == 2){
                tmpColors.push(noteToPitchheightDict[tmpNote] - 1)
            }
            else{
                tmpColors.push(noteToPitchheightDict[tmpNote])
            }
            
        }



        return tmpColors
    }
    }

    
    /*useEffect(() => {

        if (option == "showColors") {
            const colors = calculateColorbrightness()
            if (colors == undefined) {
                return
            }
            const brightnessess = []
            const minColor = Math.min(...colors.filter(note => note!="R"))
            const maxColor = Math.max(...colors.filter(note => note!="R"))
            let difference = 0
            for (let index = 0; index < colors.length; index++) {
                const element = colors[index];
                if (element == "R") {
                    brightnessess.push("R")
                    continue
                }
                difference = element - minColor
                if (difference == 0) {
                    brightnessess.push("50%")
                    
                }
                else{
                    const brightness = 50 + (difference * 5)
                    brightnessess.push(brightness.toString()+"%")
                }
                
            }

            setBrightnessColors(brightnessess)
            

        }
        else if (option == "showEugeneStructures") {
            getNarmourEncodings(calculatePitches(inspirations[1]))
            
            
        }



    }, [option])*/

    const changeColor = () => {
        setIsActive(true);
    }

    const playwholeComposition = () => {
        const notesMeasure1 =  measure1.filter(piece => piece.show == true && piece.locked == false)
        const notesMeasure2 =  measure2.filter(piece => piece.show == true && piece.locked == false)
        const notesMeasure3 =  measure3.filter(piece => piece.show == true && piece.locked == false)
        const notesMeasure4 =  measure4.filter(piece => piece.show == true && piece.locked == false)
        const notesMeasure5 =  measure5.filter(piece => piece.show == true && piece.locked == false)
        const notesMeasure6 =  measure6.filter(piece => piece.show == true && piece.locked == false)
        const notesMeasure7 =  measure7.filter(piece => piece.show == true && piece.locked == false)
        const notesMeasure8 =  measure8.filter(piece => piece.show == true && piece.locked == false)
        const notesMeasure9 =  measure9.filter(piece => piece.show == true && piece.locked == false)
        const notesMeasure10 =  measure10.filter(piece => piece.show == true && piece.locked == false)
        const notesMeasure11 =  measure11.filter(piece => piece.show == true && piece.locked == false)
        const notesMeasure12 =  measure12.filter(piece => piece.show == true && piece.locked == false)
        const notesMeasure13 =  measure13.filter(piece => piece.show == true && piece.locked == false)
        const notesMeasure14 =  measure14.filter(piece => piece.show == true && piece.locked == false)
        const notesMeasure15 =  measure15.filter(piece => piece.show == true && piece.locked == false)
        const notesMeasure16 =  measure16.filter(piece => piece.show == true && piece.locked == false)
        const wholeComposition = [notesMeasure1,notesMeasure2,notesMeasure3,notesMeasure4,
            notesMeasure5,notesMeasure6,notesMeasure7,notesMeasure8,
            notesMeasure9,notesMeasure10,notesMeasure11,notesMeasure12,
            notesMeasure13,notesMeasure14,notesMeasure15,notesMeasure16]
       
                playMelody(wholeComposition,[volumeMeasure1,volumeMeasure2,volumeMeasure3,
                    volumeMeasure4,volumeMeasure5,volumeMeasure6,
                    volumeMeasure7,volumeMeasure8, volumeMeasure9,volumeMeasure10,volumeMeasure11,
                    volumeMeasure12,volumeMeasure13,volumeMeasure14,
                    volumeMeasure15,volumeMeasure16 ])
                
                        
    }
     


    const [modalIsOpen, setIsOpen] = useState(false)

    
    const [activeMeasure,setactiveMeasure] = useRecoilState(activeMeasureAtom);
    const [measure1,setMeasure1] = useRecoilState(measure1Atom);
    const [measure2,setMeasure2] = useRecoilState(measure2Atom);
    const [measure3,setMeasure3] = useRecoilState(measure3Atom);
    const [measure4,setMeasure4] = useRecoilState(measure4Atom);
    const [measure5,setMeasure5] = useRecoilState(measure5Atom);
    const [measure6,setMeasure6] = useRecoilState(measure6Atom);
    const [measure7,setMeasure7] = useRecoilState(measure7Atom);
    const [measure8,setMeasure8] = useRecoilState(measure8Atom);
    const [measure9,setMeasure9] = useRecoilState(measure9Atom);
    const [measure10,setMeasure10] = useRecoilState(measure10Atom);
    const [measure11,setMeasure11] = useRecoilState(measure11Atom);
    const [measure12,setMeasure12] = useRecoilState(measure12Atom);
    const [measure13,setMeasure13] = useRecoilState(measure13Atom);
    const [measure14,setMeasure14] = useRecoilState(measure14Atom);
    const [measure15,setMeasure15] = useRecoilState(measure15Atom);
    const [measure16,setMeasure16] = useRecoilState(measure16Atom);

    const [pointer,setPointer] = useRecoilState(pointerAtom);
    
    
    const [hovering, setHover] = useRecoilState(hoverAtom);
    const dragging = useRecoilValue(dragAtom);
    useEffect(() => {
        console.log(accent,panelDuration)

        switch (panelDuration) {
            case "whole":
                switch (accent) {
                    case 0:
                        setpanelArray(wholepitches)
                        break;
                    case 1:
                        setpanelArray(wholepitchesSharp)
                        break;
                    case 2:
                        setpanelArray(wholepitches)
                        break;
                
                    default:
                        break;
                }
                break;
            case "half":
                switch (accent) {
                    case 0:
                        setpanelArray(halfpitches)
                        break;
                    case 1:
                        setpanelArray(halfpitchesSharp)
                        break;
                    case 2:
                        setpanelArray(halfpitches)
                        break;
                
                    default:
                        break;
                }
                break;
            case "quarter":
                switch (accent) {
                    case 0:
                        setpanelArray(pitches)
                        break;
                    case 1:
                        setpanelArray(pitchesSharp)
                        break;
                    case 2:
                        setpanelArray(pitches)
                        break;
                
                    default:
                        break;
                }
                break;
            case "eighth":
                switch (accent) {
                    case 0:
                        setpanelArray(eightpitches)
                        break;
                    case 1:
                        setpanelArray(eightpitchesSharp)
                        break;
                    case 2:
                        setpanelArray(eightpitches)
                        break;
                
                    default:
                        break;
                }
                break;
            case "sixteenth":
                switch (accent) {
                    case 0:
                        setpanelArray(sixteenthpitches)
                        break;
                    case 1:
                        setpanelArray(sixteenthpitchesSharp)
                        break;
                    case 2:
                        setpanelArray(sixteenthpitches)
                        break;
                
                    default:
                        break;
                }
                break;
            default:
                break;
        }
       

    }, [accent,panelDuration])

   
 


    /*const [{isOver}, drop] = useDrop(() => ({
        accept: "image",
        
        drop: (item) => addImageToBoard(item.id,item.index),
        collect: monitor => ({
            isOver: !!monitor.isOver(),

        }),

        
    }))

    const addImageToBoard = (id,index) => {

            if(index == null){

            }

        
            const pitchToAdd = pitches.filter((pitch => id === pitch.id))
            setBoard((board) => [...board, pitchToAdd[0]])
            
    }*/

        const replaceItem = (item) => {
            if (activeNote == 0) {
                
                return
                
            }
            

            const indexToReplace = activeNote
            const itemSteps = calculateSteps(item.duration)
            
            
            if(activeMeasure == 0){
                const updatedBoardData = measure1.slice(0,measure1Meter)
                const restboard = measure1.slice(measure1Meter,measure1.length)
                const stepsToReplace = calculateSteps(updatedBoardData[indexToReplace].duration)
                const sliceLen = updatedBoardData.filter(piece => piece.occupied == false).length
                if(itemSteps > sliceLen + stepsToReplace){alert.show('This Note doesnt fit into the actual measure!');  return}
                else{
                if(itemSteps == stepsToReplace){
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,measure1Meter)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(result)
                    setMeasure1(result)

                }
                else if(itemSteps < stepsToReplace){
                    const diffDuration = stepsToReplace - itemSteps
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length).concat(new Array(diffDuration).fill(defaultpitches))
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(middlePart)
                    setMeasure1(result)

                }
                else{
                    const diffDuration = itemSteps - stepsToReplace
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length-diffDuration)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(result)
                    setMeasure1(result)

                }
                const pitch = item['type'][0]
            
                playSynth(pitch.replace('/',''),1)
            }
                
            }
            else if(activeMeasure == 1){
                const updatedBoardData = measure2.slice(0,measure2Meter)
                const restboard = measure1.slice(measure2Meter,measure2.length)
                const stepsToReplace = calculateSteps(updatedBoardData[indexToReplace].duration)
                const sliceLen = updatedBoardData.filter(piece => piece.occupied == false).length
                console.log(item)
                if(itemSteps > sliceLen + stepsToReplace){alert.show('This Note doesnt fit into the actual measure!');  return}
                else{
                if(itemSteps == stepsToReplace){
                    console.log(item)
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,measure1Meter)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(result)
                    setMeasure2(result)

                }
                else if(itemSteps < stepsToReplace){
                    const diffDuration = stepsToReplace - itemSteps
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length).concat(new Array(diffDuration).fill(defaultpitches))
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(middlePart)
                    setMeasure2(result)

                }
                else{
                    const diffDuration = itemSteps - stepsToReplace
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length-diffDuration)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(result)
                    setMeasure2(result)

                }
                const pitch = item['type'][0]
                playSynth(pitch.replace('/',''),1)
            }
            }
            else if(activeMeasure == 2){
                const updatedBoardData = measure3.slice(0,measure3Meter)
                const restboard = measure3.slice(measure3Meter,measure3.length)
                const stepsToReplace = calculateSteps(updatedBoardData[indexToReplace].duration)
                const sliceLen = updatedBoardData.filter(piece => piece.occupied == false).length
                console.log(item)
                if(itemSteps > sliceLen + stepsToReplace){alert.show('This Note doesnt fit into the actual measure!');  return}
                else{
                if(itemSteps == stepsToReplace){
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,measure1Meter)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(result)
                    setMeasure3(result)

                }
                else if(itemSteps < stepsToReplace){
                    const diffDuration = stepsToReplace - itemSteps
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length).concat(new Array(diffDuration).fill(defaultpitches))
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(middlePart)
                    setMeasure3(result)

                }
                else{
                    const diffDuration = itemSteps - stepsToReplace
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length-diffDuration)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(result)
                    setMeasure3(result)

                }
                const pitch = item['type'][0]
            
                playSynth(pitch.replace('/',''),1)
            }
            }


            else if(activeMeasure == 3){
                const updatedBoardData = measure4.slice(0,measure4Meter)
                const restboard = measure4.slice(measure4Meter,measure4.length)
                const stepsToReplace = calculateSteps(updatedBoardData[indexToReplace].duration)
                const sliceLen = updatedBoardData.filter(piece => piece.occupied == false).length
                
                if(itemSteps > sliceLen + stepsToReplace){alert.show('This Note doesnt fit into the actual measure!');  return}
                else{
                if(itemSteps == stepsToReplace){
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,measure1Meter)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(result)
                    setMeasure4(result)

                }
                else if(itemSteps < stepsToReplace){
                    const diffDuration = stepsToReplace - itemSteps
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length).concat(new Array(diffDuration).fill(defaultpitches))
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(middlePart)
                    setMeasure4(result)

                }
                else{
                    const diffDuration = itemSteps - stepsToReplace
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length-diffDuration)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(result)
                    setMeasure4(result)

                }
                const pitch = item['type'][0]
            
                playSynth(pitch.replace('/',''),1)
            }
            }

            else if(activeMeasure == 4){
                const updatedBoardData = measure5.slice(0,measure5Meter)
                const restboard = measure5.slice(measure5Meter,measure5.length)
                const stepsToReplace = calculateSteps(updatedBoardData[indexToReplace].duration)
                const sliceLen = updatedBoardData.filter(piece => piece.occupied == false).length
                
                if(itemSteps > sliceLen + stepsToReplace){alert.show('This Note doesnt fit into the actual measure!');  return}
                else{
                if(itemSteps == stepsToReplace){
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,measure1Meter)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(result)
                    setMeasure4(result)

                }
                else if(itemSteps < stepsToReplace){
                    const diffDuration = stepsToReplace - itemSteps
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length).concat(new Array(diffDuration).fill(defaultpitches))
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    setMeasure5(result)

                }
                else{
                    const diffDuration = itemSteps - stepsToReplace
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length-diffDuration)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    setMeasure5(result)

                }
                const pitch = item['type'][0]
            
                playSynth(pitch.replace('/',''),1)
            }
            }
            

            else if(activeMeasure == 5){
                const updatedBoardData = measure6.slice(0,measure6Meter)
                const restboard = measure6.slice(measure6Meter,measure6.length)
                const stepsToReplace = calculateSteps(updatedBoardData[indexToReplace].duration)
                const sliceLen = updatedBoardData.filter(piece => piece.occupied == false).length
                
                if(itemSteps > sliceLen + stepsToReplace){alert.show('This Note doesnt fit into the actual measure!');  return}
                else{
                if(itemSteps == stepsToReplace){
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,measure1Meter)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(result)
                    setMeasure6(result)

                }
                else if(itemSteps < stepsToReplace){
                    const diffDuration = stepsToReplace - itemSteps
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length).concat(new Array(diffDuration).fill(defaultpitches))
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    setMeasure6(result)

                }
                else{
                    const diffDuration = itemSteps - stepsToReplace
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length-diffDuration)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    setMeasure6(result)

                }
                const pitch = item['type'][0]
            
                playSynth(pitch.replace('/',''),1)
            }
            }
            

            else if(activeMeasure == 6){
                const updatedBoardData = measure7.slice(0,measure7Meter)
                const restboard = measure7.slice(measure7Meter,measure7.length)
                const stepsToReplace = calculateSteps(updatedBoardData[indexToReplace].duration)
                const sliceLen = updatedBoardData.filter(piece => piece.occupied == false).length
                
                if(itemSteps > sliceLen + stepsToReplace){alert.show('This Note doesnt fit into the actual measure!');  return}
                else{
                if(itemSteps == stepsToReplace){
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,measure1Meter)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(result)
                    setMeasure7(result)

                }
                else if(itemSteps < stepsToReplace){
                    const diffDuration = stepsToReplace - itemSteps
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length).concat(new Array(diffDuration).fill(defaultpitches))
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    setMeasure7(result)

                }
                else{
                    const diffDuration = itemSteps - stepsToReplace
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length-diffDuration)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    setMeasure7(result)

                }
                const pitch = item['type'][0]
            
                playSynth(pitch.replace('/',''),1)
            }
            }


            else if(activeMeasure == 7){
                const updatedBoardData = measure8.slice(0,measure8Meter)
                const restboard = measure8.slice(measure8Meter,measure8.length)
                const stepsToReplace = calculateSteps(updatedBoardData[indexToReplace].duration)
                const sliceLen = updatedBoardData.filter(piece => piece.occupied == false).length
                
                if(itemSteps > sliceLen + stepsToReplace){alert.show('This Note doesnt fit into the actual measure!');  return}
                else{
                if(itemSteps == stepsToReplace){
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,measure1Meter)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    setMeasure8(result)

                }
                else if(itemSteps < stepsToReplace){
                    const diffDuration = stepsToReplace - itemSteps
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length).concat(new Array(diffDuration).fill(defaultpitches))
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    setMeasure8(result)

                }
                else{
                    const diffDuration = itemSteps - stepsToReplace
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length-diffDuration)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    setMeasure8(result)

                }
                const pitch = item['type'][0]
            
                playSynth(pitch.replace('/',''),1)
            }
            }

            if(activeMeasure == 8){
                const updatedBoardData = measure9.slice(0,measure9Meter)
                const restboard = measure9.slice(measure9Meter,measure9.length)
                const stepsToReplace = calculateSteps(updatedBoardData[indexToReplace].duration)
                const sliceLen = updatedBoardData.filter(piece => piece.occupied == false).length
                if(itemSteps > sliceLen + stepsToReplace){alert.show('This Note doesnt fit into the actual measure!');  return}
                else{
                if(itemSteps == stepsToReplace){
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,measure1Meter)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(result)
                    setMeasure9(result)

                }
                else if(itemSteps < stepsToReplace){
                    const diffDuration = stepsToReplace - itemSteps
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length).concat(new Array(diffDuration).fill(defaultpitches))
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(middlePart)
                    setMeasure9(result)

                }
                else{
                    const diffDuration = itemSteps - stepsToReplace
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length-diffDuration)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(result)
                    setMeasure9(result)

                }
                const pitch = item['type'][0]
            
                playSynth(pitch.replace('/',''),1)
            }
                
            }
            else if(activeMeasure == 9){
                const updatedBoardData = measure10.slice(0,measure10Meter)
                const restboard = measure10.slice(measure10Meter,measure10.length)
                const stepsToReplace = calculateSteps(updatedBoardData[indexToReplace].duration)
                const sliceLen = updatedBoardData.filter(piece => piece.occupied == false).length
                console.log(item)
                if(itemSteps > sliceLen + stepsToReplace){alert.show('This Note doesnt fit into the actual measure!');  return}
                else{
                if(itemSteps == stepsToReplace){
                    console.log(item)
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,measure1Meter)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(result)
                    setMeasure10(result)

                }
                else if(itemSteps < stepsToReplace){
                    const diffDuration = stepsToReplace - itemSteps
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length).concat(new Array(diffDuration).fill(defaultpitches))
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(middlePart)
                    setMeasure10(result)

                }
                else{
                    const diffDuration = itemSteps - stepsToReplace
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length-diffDuration)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(result)
                    setMeasure10(result)

                }
                const pitch = item['type'][0]
                playSynth(pitch.replace('/',''),1)
            }
            }
            else if(activeMeasure == 10){
                const updatedBoardData = measure11.slice(0,measure11Meter)
                const restboard = measure11.slice(measure11Meter,measure11.length)
                const stepsToReplace = calculateSteps(updatedBoardData[indexToReplace].duration)
                const sliceLen = updatedBoardData.filter(piece => piece.occupied == false).length
                console.log(item)
                if(itemSteps > sliceLen + stepsToReplace){alert.show('This Note doesnt fit into the actual measure!');  return}
                else{
                if(itemSteps == stepsToReplace){
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,measure1Meter)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(result)
                    setMeasure11(result)

                }
                else if(itemSteps < stepsToReplace){
                    const diffDuration = stepsToReplace - itemSteps
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length).concat(new Array(diffDuration).fill(defaultpitches))
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(middlePart)
                    setMeasure11(result)

                }
                else{
                    const diffDuration = itemSteps - stepsToReplace
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length-diffDuration)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(result)
                    setMeasure11(result)

                }
                const pitch = item['type'][0]
            
                playSynth(pitch.replace('/',''),1)
            }
            }


            else if(activeMeasure == 11){
                const updatedBoardData = measure12.slice(0,measure12Meter)
                const restboard = measure12.slice(measure12Meter,measure12.length)
                const stepsToReplace = calculateSteps(updatedBoardData[indexToReplace].duration)
                const sliceLen = updatedBoardData.filter(piece => piece.occupied == false).length
                
                if(itemSteps > sliceLen + stepsToReplace){alert.show('This Note doesnt fit into the actual measure!');  return}
                else{
                if(itemSteps == stepsToReplace){
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,measure1Meter)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(result)
                    setMeasure12(result)

                }
                else if(itemSteps < stepsToReplace){
                    const diffDuration = stepsToReplace - itemSteps
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length).concat(new Array(diffDuration).fill(defaultpitches))
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(middlePart)
                    setMeasure12(result)

                }
                else{
                    const diffDuration = itemSteps - stepsToReplace
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length-diffDuration)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(result)
                    setMeasure12(result)

                }
                const pitch = item['type'][0]
            
                playSynth(pitch.replace('/',''),1)
            }
            }

            else if(activeMeasure == 12){
                const updatedBoardData = measure13.slice(0,measure13Meter)
                const restboard = measure13.slice(measure13Meter,measure13.length)
                const stepsToReplace = calculateSteps(updatedBoardData[indexToReplace].duration)
                const sliceLen = updatedBoardData.filter(piece => piece.occupied == false).length
                
                if(itemSteps > sliceLen + stepsToReplace){alert.show('This Note doesnt fit into the actual measure!');  return}
                else{
                if(itemSteps == stepsToReplace){
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,measure1Meter)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(result)
                    setMeasure13(result)

                }
                else if(itemSteps < stepsToReplace){
                    const diffDuration = stepsToReplace - itemSteps
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length).concat(new Array(diffDuration).fill(defaultpitches))
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    setMeasure13(result)

                }
                else{
                    const diffDuration = itemSteps - stepsToReplace
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length-diffDuration)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    setMeasure13(result)

                }
                const pitch = item['type'][0]
            
                playSynth(pitch.replace('/',''),1)
            }
            }
            

            else if(activeMeasure == 13){
                const updatedBoardData = measure14.slice(0,measure14Meter)
                const restboard = measure14.slice(measure14Meter,measure14.length)
                const stepsToReplace = calculateSteps(updatedBoardData[indexToReplace].duration)
                const sliceLen = updatedBoardData.filter(piece => piece.occupied == false).length
                
                if(itemSteps > sliceLen + stepsToReplace){alert.show('This Note doesnt fit into the actual measure!');  return}
                else{
                if(itemSteps == stepsToReplace){
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,measure1Meter)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(result)
                    setMeasure14(result)

                }
                else if(itemSteps < stepsToReplace){
                    const diffDuration = stepsToReplace - itemSteps
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length).concat(new Array(diffDuration).fill(defaultpitches))
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    setMeasure14(result)

                }
                else{
                    const diffDuration = itemSteps - stepsToReplace
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length-diffDuration)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    setMeasure14(result)

                }
                const pitch = item['type'][0]
            
                playSynth(pitch.replace('/',''),1)
            }
            }
            

            else if(activeMeasure == 14){
                const updatedBoardData = measure15.slice(0,measure15Meter)
                const restboard = measure15.slice(measure15Meter,measure15.length)
                const stepsToReplace = calculateSteps(updatedBoardData[indexToReplace].duration)
                const sliceLen = updatedBoardData.filter(piece => piece.occupied == false).length
                
                if(itemSteps > sliceLen + stepsToReplace){alert.show('This Note doesnt fit into the actual measure!');  return}
                else{
                if(itemSteps == stepsToReplace){
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,measure1Meter)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    console.log(result)
                    setMeasure15(result)

                }
                else if(itemSteps < stepsToReplace){
                    const diffDuration = stepsToReplace - itemSteps
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length).concat(new Array(diffDuration).fill(defaultpitches))
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    setMeasure15(result)

                }
                else{
                    const diffDuration = itemSteps - stepsToReplace
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length-diffDuration)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    setMeasure15(result)

                }
                const pitch = item['type'][0]
            
                playSynth(pitch.replace('/',''),1)
            }
            }


            else if(activeMeasure == 15){
                const updatedBoardData = measure16.slice(0,measure16Meter)
                const restboard = measure16.slice(measure16Meter,measure16.length)
                const stepsToReplace = calculateSteps(updatedBoardData[indexToReplace].duration)
                const sliceLen = updatedBoardData.filter(piece => piece.occupied == false).length
                
                if(itemSteps > sliceLen + stepsToReplace){alert.show('This Note doesnt fit into the actual measure!');  return}
                else{
                if(itemSteps == stepsToReplace){
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,measure1Meter)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    setMeasure16(result)

                }
                else if(itemSteps < stepsToReplace){
                    const diffDuration = stepsToReplace - itemSteps
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length).concat(new Array(diffDuration).fill(defaultpitches))
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    setMeasure16(result)

                }
                else{
                    const diffDuration = itemSteps - stepsToReplace
                    const firstPart = updatedBoardData.slice(0, indexToReplace)
                    const middlePart = [item].concat(new Array(itemSteps-1).fill(defaultpitchesoccupied))
                    const endPart = updatedBoardData.slice(indexToReplace + stepsToReplace,updatedBoardData.length-diffDuration)
                    const result = firstPart.concat(middlePart).concat(endPart).concat(restboard)
                    setMeasure16(result)

                }
                const pitch = item['type'][0]
            
                playSynth(pitch.replace('/',''),1)
            }
            }
            

            
            
           


        }


        const deleteItem = () => {
            if (activeNote == 0) {
                return
                
            }
            if(activeMeasure == 0){
                const indexToDelete = activeNote
                const stepsToDelete = calculateSteps(measure1[indexToDelete].duration)
                const firstPart = measure1.slice(0, indexToDelete)
                const newActivatedIndex = calculateLastNoteIndex(firstPart)
                const secondPart = new Array(stepsToDelete).fill(defaultpitches) 
                const tmpPart = measure1.slice(indexToDelete+stepsToDelete, measure1.length)
                const boundaryIndexToEmptyPlaces = calculateLastNoteIndex(tmpPart)
                let resultingMeasure = []
                if(tmpPart[boundaryIndexToEmptyPlaces] == undefined){
                    resultingMeasure = firstPart.concat(secondPart)
                    
                }

                else{
                const space = calculateSteps(tmpPart[boundaryIndexToEmptyPlaces].duration)
                const thirdPart = tmpPart.slice(0,boundaryIndexToEmptyPlaces+space)
                const endPart = tmpPart.slice(boundaryIndexToEmptyPlaces+space, tmpPart.length)
                const endPart_ = secondPart.concat(endPart)
                resultingMeasure = firstPart.concat(thirdPart).concat(endPart_)
                }
                setMeasure1(resultingMeasure)
                
                setactiveNote(newActivatedIndex)
                const stepsFornewActivated = calculateSteps(resultingMeasure[newActivatedIndex].duration)
                setPointer(newActivatedIndex + stepsFornewActivated)
            }

            if(activeMeasure == 1){
                
                const indexToDelete = activeNote
                const stepsToDelete = calculateSteps(measure2[indexToDelete].duration)
                const firstPart = measure2.slice(0, indexToDelete)
                const newActivatedIndex = calculateLastNoteIndex(firstPart)
                const secondPart = new Array(stepsToDelete).fill(defaultpitches) 
                const tmpPart = measure2.slice(indexToDelete+stepsToDelete, measure2.length)
                const boundaryIndexToEmptyPlaces = calculateLastNoteIndex(tmpPart)
                let resultingMeasure = []
                if(tmpPart[boundaryIndexToEmptyPlaces] == undefined){
                    resultingMeasure = firstPart.concat(secondPart)
                    
                }

                else{
                    const space = calculateSteps(tmpPart[boundaryIndexToEmptyPlaces].duration)
                const thirdPart = tmpPart.slice(0,boundaryIndexToEmptyPlaces+space)
                const endPart = tmpPart.slice(boundaryIndexToEmptyPlaces+space, tmpPart.length)
                const endPart_ = secondPart.concat(endPart)
                resultingMeasure = firstPart.concat(thirdPart).concat(endPart_)

                }
                
                setMeasure2(resultingMeasure)
                
                setactiveNote(newActivatedIndex)
                const stepsFornewActivated = calculateSteps(resultingMeasure[newActivatedIndex].duration)
                setPointer(newActivatedIndex + stepsFornewActivated)

                }
            

            if(activeMeasure == 2){

                const indexToDelete = activeNote
                const stepsToDelete = calculateSteps(measure3[indexToDelete].duration)
                const firstPart = measure3.slice(0, indexToDelete)
                const newActivatedIndex = calculateLastNoteIndex(firstPart)
                const secondPart = new Array(stepsToDelete).fill(defaultpitches) 
                const tmpPart = measure3.slice(indexToDelete+stepsToDelete, measure3.length)
                const boundaryIndexToEmptyPlaces = calculateLastNoteIndex(tmpPart)
                let resultingMeasure = []
                if(tmpPart[boundaryIndexToEmptyPlaces] == undefined){
                    resultingMeasure = firstPart.concat(secondPart)
                    
                }

                else{
                const space = calculateSteps(tmpPart[boundaryIndexToEmptyPlaces].duration)
                const thirdPart = tmpPart.slice(0,boundaryIndexToEmptyPlaces+space)
                const endPart = tmpPart.slice(boundaryIndexToEmptyPlaces+space, tmpPart.length)
                const endPart_ = secondPart.concat(endPart)
                resultingMeasure = firstPart.concat(thirdPart).concat(endPart_)
                }
                setMeasure3(resultingMeasure)
                
                setactiveNote(newActivatedIndex)
                const stepsFornewActivated = calculateSteps(resultingMeasure[newActivatedIndex].duration)
                setPointer(newActivatedIndex + stepsFornewActivated)

            }

            if(activeMeasure == 3){

                const indexToDelete = activeNote
                const stepsToDelete = calculateSteps(measure4[indexToDelete].duration)
                const firstPart = measure4.slice(0, indexToDelete)
                const newActivatedIndex = calculateLastNoteIndex(firstPart)
                const secondPart = new Array(stepsToDelete).fill(defaultpitches) 
                const tmpPart = measure4.slice(indexToDelete+stepsToDelete, measure4.length)
                const boundaryIndexToEmptyPlaces = calculateLastNoteIndex(tmpPart)
                let resultingMeasure = []
                if(tmpPart[boundaryIndexToEmptyPlaces] == undefined){
                    resultingMeasure = firstPart.concat(secondPart)
                    
                }

                else{
                const space = calculateSteps(tmpPart[boundaryIndexToEmptyPlaces].duration)
                const thirdPart = tmpPart.slice(0,boundaryIndexToEmptyPlaces+space)
                const endPart = tmpPart.slice(boundaryIndexToEmptyPlaces+space, tmpPart.length)
                const endPart_ = secondPart.concat(endPart)
                resultingMeasure = firstPart.concat(thirdPart).concat(endPart_)
                }
                setMeasure4(resultingMeasure)
                
                setactiveNote(newActivatedIndex)
                const stepsFornewActivated = calculateSteps(resultingMeasure[newActivatedIndex].duration)
                setPointer(newActivatedIndex + stepsFornewActivated)

            }

            if(activeMeasure == 4){

                const indexToDelete = activeNote
                const stepsToDelete = calculateSteps(measure5[indexToDelete].duration)
                const firstPart = measure5.slice(0, indexToDelete)
                const newActivatedIndex = calculateLastNoteIndex(firstPart)
                const secondPart = new Array(stepsToDelete).fill(defaultpitches) 
                const tmpPart = measure5.slice(indexToDelete+stepsToDelete, measure5.length)
                const boundaryIndexToEmptyPlaces = calculateLastNoteIndex(tmpPart)
                let resultingMeasure = []
                if(tmpPart[boundaryIndexToEmptyPlaces] == undefined){
                    resultingMeasure = firstPart.concat(secondPart)
                    
                }

                else{
                const space = calculateSteps(tmpPart[boundaryIndexToEmptyPlaces].duration)
                const thirdPart = tmpPart.slice(0,boundaryIndexToEmptyPlaces+space)
                const endPart = tmpPart.slice(boundaryIndexToEmptyPlaces+space, tmpPart.length)
                const endPart_ = secondPart.concat(endPart)
                resultingMeasure = firstPart.concat(thirdPart).concat(endPart_)
                }
                setMeasure5(resultingMeasure)
                
                setactiveNote(newActivatedIndex)
                const stepsFornewActivated = calculateSteps(resultingMeasure[newActivatedIndex].duration)
                setPointer(newActivatedIndex + stepsFornewActivated)

            }

            if(activeMeasure == 5){

                const indexToDelete = activeNote
                const stepsToDelete = calculateSteps(measure6[indexToDelete].duration)
                const firstPart = measure6.slice(0, indexToDelete)
                const newActivatedIndex = calculateLastNoteIndex(firstPart)
                const secondPart = new Array(stepsToDelete).fill(defaultpitches) 
                const tmpPart = measure6.slice(indexToDelete+stepsToDelete, measure6.length)
                const boundaryIndexToEmptyPlaces = calculateLastNoteIndex(tmpPart)
                let resultingMeasure = []
                if(tmpPart[boundaryIndexToEmptyPlaces] == undefined){
                    resultingMeasure = firstPart.concat(secondPart)
                    
                }

                else{
                const space = calculateSteps(tmpPart[boundaryIndexToEmptyPlaces].duration)
                const thirdPart = tmpPart.slice(0,boundaryIndexToEmptyPlaces+space)
                const endPart = tmpPart.slice(boundaryIndexToEmptyPlaces+space, tmpPart.length)
                const endPart_ = secondPart.concat(endPart)
                resultingMeasure = firstPart.concat(thirdPart).concat(endPart_)
                }
                setMeasure6(resultingMeasure)
                
                setactiveNote(newActivatedIndex)
                const stepsFornewActivated = calculateSteps(resultingMeasure[newActivatedIndex].duration)
                setPointer(newActivatedIndex + stepsFornewActivated)

            }

            if(activeMeasure == 6){

                const indexToDelete = activeNote
                const stepsToDelete = calculateSteps(measure7[indexToDelete].duration)
                const firstPart = measure7.slice(0, indexToDelete)
                const newActivatedIndex = calculateLastNoteIndex(firstPart)
                const secondPart = new Array(stepsToDelete).fill(defaultpitches) 
                const tmpPart = measure7.slice(indexToDelete+stepsToDelete, measure7.length)
                const boundaryIndexToEmptyPlaces = calculateLastNoteIndex(tmpPart)
                let resultingMeasure = []
                if(tmpPart[boundaryIndexToEmptyPlaces] == undefined){
                    resultingMeasure = firstPart.concat(secondPart)
                    
                }

                else{
                const space = calculateSteps(tmpPart[boundaryIndexToEmptyPlaces].duration)
                const thirdPart = tmpPart.slice(0,boundaryIndexToEmptyPlaces+space)
                const endPart = tmpPart.slice(boundaryIndexToEmptyPlaces+space, tmpPart.length)
                const endPart_ = secondPart.concat(endPart)
                resultingMeasure = firstPart.concat(thirdPart).concat(endPart_)
                }
                setMeasure7(resultingMeasure)
                
                setactiveNote(newActivatedIndex)
                const stepsFornewActivated = calculateSteps(resultingMeasure[newActivatedIndex].duration)
                setPointer(newActivatedIndex + stepsFornewActivated)

            }

            if(activeMeasure == 7){

                const indexToDelete = activeNote
                const stepsToDelete = calculateSteps(measure8[indexToDelete].duration)
                const firstPart = measure8.slice(0, indexToDelete)
                const newActivatedIndex = calculateLastNoteIndex(firstPart)
                const secondPart = new Array(stepsToDelete).fill(defaultpitches) 
                const tmpPart = measure8.slice(indexToDelete+stepsToDelete, measure8.length)
                const boundaryIndexToEmptyPlaces = calculateLastNoteIndex(tmpPart)
                let resultingMeasure = []
                if(tmpPart[boundaryIndexToEmptyPlaces] == undefined){
                    resultingMeasure = firstPart.concat(secondPart)
                    
                }

                else{
                const space = calculateSteps(tmpPart[boundaryIndexToEmptyPlaces].duration)
                const thirdPart = tmpPart.slice(0,boundaryIndexToEmptyPlaces+space)
                const endPart = tmpPart.slice(boundaryIndexToEmptyPlaces+space, tmpPart.length)
                const endPart_ = secondPart.concat(endPart)
                resultingMeasure = firstPart.concat(thirdPart).concat(endPart_)
                }
                setMeasure8(resultingMeasure)
                
                setactiveNote(newActivatedIndex)
                const stepsFornewActivated = calculateSteps(resultingMeasure[newActivatedIndex].duration)
                setPointer(newActivatedIndex + stepsFornewActivated)

            }

            if(activeMeasure == 8){
                const indexToDelete = activeNote
                const stepsToDelete = calculateSteps(measure9[indexToDelete].duration)
                const firstPart = measure9.slice(0, indexToDelete)
                const newActivatedIndex = calculateLastNoteIndex(firstPart)
                const secondPart = new Array(stepsToDelete).fill(defaultpitches) 
                const tmpPart = measure9.slice(indexToDelete+stepsToDelete, measure9.length)
                const boundaryIndexToEmptyPlaces = calculateLastNoteIndex(tmpPart)
                let resultingMeasure = []
                if(tmpPart[boundaryIndexToEmptyPlaces] == undefined){
                    resultingMeasure = firstPart.concat(secondPart)
                    
                }

                else{
                const space = calculateSteps(tmpPart[boundaryIndexToEmptyPlaces].duration)
                const thirdPart = tmpPart.slice(0,boundaryIndexToEmptyPlaces+space)
                const endPart = tmpPart.slice(boundaryIndexToEmptyPlaces+space, tmpPart.length)
                const endPart_ = secondPart.concat(endPart)
                resultingMeasure = firstPart.concat(thirdPart).concat(endPart_)
                }
                setMeasure9(resultingMeasure)
                
                setactiveNote(newActivatedIndex)
                const stepsFornewActivated = calculateSteps(resultingMeasure[newActivatedIndex].duration)
                setPointer(newActivatedIndex + stepsFornewActivated)
            }

            if(activeMeasure == 9){
                
                const indexToDelete = activeNote
                const stepsToDelete = calculateSteps(measure10[indexToDelete].duration)
                const firstPart = measure10.slice(0, indexToDelete)
                const newActivatedIndex = calculateLastNoteIndex(firstPart)
                const secondPart = new Array(stepsToDelete).fill(defaultpitches) 
                const tmpPart = measure10.slice(indexToDelete+stepsToDelete, measure10.length)
                const boundaryIndexToEmptyPlaces = calculateLastNoteIndex(tmpPart)
                let resultingMeasure = []
                if(tmpPart[boundaryIndexToEmptyPlaces] == undefined){
                    resultingMeasure = firstPart.concat(secondPart)
                    
                }

                else{
                    const space = calculateSteps(tmpPart[boundaryIndexToEmptyPlaces].duration)
                const thirdPart = tmpPart.slice(0,boundaryIndexToEmptyPlaces+space)
                const endPart = tmpPart.slice(boundaryIndexToEmptyPlaces+space, tmpPart.length)
                const endPart_ = secondPart.concat(endPart)
                resultingMeasure = firstPart.concat(thirdPart).concat(endPart_)

                }
                
                setMeasure10(resultingMeasure)
                
                setactiveNote(newActivatedIndex)
                const stepsFornewActivated = calculateSteps(resultingMeasure[newActivatedIndex].duration)
                setPointer(newActivatedIndex + stepsFornewActivated)

                }
            

            if(activeMeasure == 10){

                const indexToDelete = activeNote
                const stepsToDelete = calculateSteps(measure11[indexToDelete].duration)
                const firstPart = measure11.slice(0, indexToDelete)
                const newActivatedIndex = calculateLastNoteIndex(firstPart)
                const secondPart = new Array(stepsToDelete).fill(defaultpitches) 
                const tmpPart = measure11.slice(indexToDelete+stepsToDelete, measure11.length)
                const boundaryIndexToEmptyPlaces = calculateLastNoteIndex(tmpPart)
                let resultingMeasure = []
                if(tmpPart[boundaryIndexToEmptyPlaces] == undefined){
                    resultingMeasure = firstPart.concat(secondPart)
                    
                }

                else{
                const space = calculateSteps(tmpPart[boundaryIndexToEmptyPlaces].duration)
                const thirdPart = tmpPart.slice(0,boundaryIndexToEmptyPlaces+space)
                const endPart = tmpPart.slice(boundaryIndexToEmptyPlaces+space, tmpPart.length)
                const endPart_ = secondPart.concat(endPart)
                resultingMeasure = firstPart.concat(thirdPart).concat(endPart_)
                }
                setMeasure11(resultingMeasure)
                
                setactiveNote(newActivatedIndex)
                const stepsFornewActivated = calculateSteps(resultingMeasure[newActivatedIndex].duration)
                setPointer(newActivatedIndex + stepsFornewActivated)

            }

            if(activeMeasure == 11){

                const indexToDelete = activeNote
                const stepsToDelete = calculateSteps(measure12[indexToDelete].duration)
                const firstPart = measure12.slice(0, indexToDelete)
                const newActivatedIndex = calculateLastNoteIndex(firstPart)
                const secondPart = new Array(stepsToDelete).fill(defaultpitches) 
                const tmpPart = measure12.slice(indexToDelete+stepsToDelete, measure12.length)
                const boundaryIndexToEmptyPlaces = calculateLastNoteIndex(tmpPart)
                let resultingMeasure = []
                if(tmpPart[boundaryIndexToEmptyPlaces] == undefined){
                    resultingMeasure = firstPart.concat(secondPart)
                    
                }

                else{
                const space = calculateSteps(tmpPart[boundaryIndexToEmptyPlaces].duration)
                const thirdPart = tmpPart.slice(0,boundaryIndexToEmptyPlaces+space)
                const endPart = tmpPart.slice(boundaryIndexToEmptyPlaces+space, tmpPart.length)
                const endPart_ = secondPart.concat(endPart)
                resultingMeasure = firstPart.concat(thirdPart).concat(endPart_)
                }
                setMeasure12(resultingMeasure)
                
                setactiveNote(newActivatedIndex)
                const stepsFornewActivated = calculateSteps(resultingMeasure[newActivatedIndex].duration)
                setPointer(newActivatedIndex + stepsFornewActivated)

            }

            if(activeMeasure == 12){

                const indexToDelete = activeNote
                const stepsToDelete = calculateSteps(measure13[indexToDelete].duration)
                const firstPart = measure13.slice(0, indexToDelete)
                const newActivatedIndex = calculateLastNoteIndex(firstPart)
                const secondPart = new Array(stepsToDelete).fill(defaultpitches) 
                const tmpPart = measure13.slice(indexToDelete+stepsToDelete, measure13.length)
                const boundaryIndexToEmptyPlaces = calculateLastNoteIndex(tmpPart)
                let resultingMeasure = []
                if(tmpPart[boundaryIndexToEmptyPlaces] == undefined){
                    resultingMeasure = firstPart.concat(secondPart)
                    
                }

                else{
                const space = calculateSteps(tmpPart[boundaryIndexToEmptyPlaces].duration)
                const thirdPart = tmpPart.slice(0,boundaryIndexToEmptyPlaces+space)
                const endPart = tmpPart.slice(boundaryIndexToEmptyPlaces+space, tmpPart.length)
                const endPart_ = secondPart.concat(endPart)
                resultingMeasure = firstPart.concat(thirdPart).concat(endPart_)
                }
                setMeasure13(resultingMeasure)
                
                setactiveNote(newActivatedIndex)
                const stepsFornewActivated = calculateSteps(resultingMeasure[newActivatedIndex].duration)
                setPointer(newActivatedIndex + stepsFornewActivated)

            }

            if(activeMeasure == 13){

                const indexToDelete = activeNote
                const stepsToDelete = calculateSteps(measure14[indexToDelete].duration)
                const firstPart = measure14.slice(0, indexToDelete)
                const newActivatedIndex = calculateLastNoteIndex(firstPart)
                const secondPart = new Array(stepsToDelete).fill(defaultpitches) 
                const tmpPart = measure14.slice(indexToDelete+stepsToDelete, measure14.length)
                const boundaryIndexToEmptyPlaces = calculateLastNoteIndex(tmpPart)
                let resultingMeasure = []
                if(tmpPart[boundaryIndexToEmptyPlaces] == undefined){
                    resultingMeasure = firstPart.concat(secondPart)
                    
                }

                else{
                const space = calculateSteps(tmpPart[boundaryIndexToEmptyPlaces].duration)
                const thirdPart = tmpPart.slice(0,boundaryIndexToEmptyPlaces+space)
                const endPart = tmpPart.slice(boundaryIndexToEmptyPlaces+space, tmpPart.length)
                const endPart_ = secondPart.concat(endPart)
                resultingMeasure = firstPart.concat(thirdPart).concat(endPart_)
                }
                setMeasure14(resultingMeasure)
                
                setactiveNote(newActivatedIndex)
                const stepsFornewActivated = calculateSteps(resultingMeasure[newActivatedIndex].duration)
                setPointer(newActivatedIndex + stepsFornewActivated)

            }

            if(activeMeasure == 14){

                const indexToDelete = activeNote
                const stepsToDelete = calculateSteps(measure15[indexToDelete].duration)
                const firstPart = measure15.slice(0, indexToDelete)
                const newActivatedIndex = calculateLastNoteIndex(firstPart)
                const secondPart = new Array(stepsToDelete).fill(defaultpitches) 
                const tmpPart = measure15.slice(indexToDelete+stepsToDelete, measure15.length)
                const boundaryIndexToEmptyPlaces = calculateLastNoteIndex(tmpPart)
                let resultingMeasure = []
                if(tmpPart[boundaryIndexToEmptyPlaces] == undefined){
                    resultingMeasure = firstPart.concat(secondPart)
                    
                }

                else{
                const space = calculateSteps(tmpPart[boundaryIndexToEmptyPlaces].duration)
                const thirdPart = tmpPart.slice(0,boundaryIndexToEmptyPlaces+space)
                const endPart = tmpPart.slice(boundaryIndexToEmptyPlaces+space, tmpPart.length)
                const endPart_ = secondPart.concat(endPart)
                resultingMeasure = firstPart.concat(thirdPart).concat(endPart_)
                }
                setMeasure15(resultingMeasure)
                
                setactiveNote(newActivatedIndex)
                const stepsFornewActivated = calculateSteps(resultingMeasure[newActivatedIndex].duration)
                setPointer(newActivatedIndex + stepsFornewActivated)

            }

            if(activeMeasure == 15){

                const indexToDelete = activeNote
                const stepsToDelete = calculateSteps(measure16[indexToDelete].duration)
                const firstPart = measure16.slice(0, indexToDelete)
                const newActivatedIndex = calculateLastNoteIndex(firstPart)
                const secondPart = new Array(stepsToDelete).fill(defaultpitches) 
                const tmpPart = measure16.slice(indexToDelete+stepsToDelete, measure16.length)
                const boundaryIndexToEmptyPlaces = calculateLastNoteIndex(tmpPart)
                let resultingMeasure = []
                if(tmpPart[boundaryIndexToEmptyPlaces] == undefined){
                    resultingMeasure = firstPart.concat(secondPart)
                    
                }

                else{
                const space = calculateSteps(tmpPart[boundaryIndexToEmptyPlaces].duration)
                const thirdPart = tmpPart.slice(0,boundaryIndexToEmptyPlaces+space)
                const endPart = tmpPart.slice(boundaryIndexToEmptyPlaces+space, tmpPart.length)
                const endPart_ = secondPart.concat(endPart)
                resultingMeasure = firstPart.concat(thirdPart).concat(endPart_)
                }
                setMeasure16(resultingMeasure)
                
                setactiveNote(newActivatedIndex)
                const stepsFornewActivated = calculateSteps(resultingMeasure[newActivatedIndex].duration)
                setPointer(newActivatedIndex + stepsFornewActivated)

            }
            
        }
    
        

        const calculatemeasureBoundaries = (activeNote,index) => {

            const measureNumber = ~~(index / 17)
            const endOfMeasure = (measureNumber * 17)+meter
            const measureStart = endOfMeasure-meter+1

        }

        const calculateLastNoteIndex = (currentMeasure) => {
            
            for (let i = currentMeasure.length-1; i > 0; i--) {
                if (currentMeasure[i].locked == false && currentMeasure[i].occupied == true ) {
                    return i;
                }
                
            }
            return 0
                
        }

        const checkMatch = (index,steps, measure) => {
            
            const endOfMeasure = meter
            const sliceOfBoard = measure.slice(endOfMeasure-meter+1,endOfMeasure)
            //const sliceLen = sliceOfBoard.filter(piece => piece.occupied == false).length
            const sliceLen = measure.filter(piece => piece.occupied == false).length
            if(steps <= sliceLen){
                return true
            }
            else {
                
                return false
            }

            

        }

        
        const addPitch = (item) => {
            
            const index = activeNote
            const steps = calculateSteps(item.duration)
            
            if (activeMeasure == 0) {
                
                const fit = checkMatch(index,steps,measure1)
            
            if(fit){
                
                playSynth(item['type'][0].replace('/',''),1)
                if (activeNote % measure1Meter == 0) {
                    const index = 1
                    setMeasure1(measure1 =>{
                    
                    
                    
                        
                        const updatedBoardData = measure1.slice(0,measure1Meter)
                        const restboard = measure1.slice(measure1Meter,measure1.length)
                        
                        const startSlice = updatedBoardData.slice(0,index)
                        const tmpDefaultPitches = defaultpitchesoccupied
                        const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                        const endSlice = updatedBoardData.slice(index,updatedBoardData.length-steps)
                        
                        const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                        return updatedBoardData_
    
                    })

                    setactiveNote(index)
                    setPointer(pointer =>{
                        const followUpPointer = index + steps
                        if(followUpPointer % 17 == 0 ){
                        return index + steps+1}
                        else{
                            return index + steps
                        }
                    })

                }
               else{
 
                    const activeItem = calculateSteps( measure1[index].duration)

                setMeasure1(measure1 =>{
                    
                    const updatedBoardData = measure1.slice(0,measure1Meter)
                    const restboard = measure1.slice(measure1Meter,measure1.length)
                    const steps_ = calculateSteps(updatedBoardData[index].duration) 
                    const startSlice = updatedBoardData.slice(0,index+steps_)
                    const  tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(index+steps_,updatedBoardData.length-steps)
                    
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    console.log(updatedBoardData_)
                    return updatedBoardData_

                })
                setactiveNote(index+activeItem)
                setPointer(pointer =>{
                    const followUpPointer = index+activeItem + steps
                    if(followUpPointer % measure1Meter == 0 ){
                    return index + steps+1}
                    else{
                        return index + steps
                    }
                })
                
                
            }


        }


        else{

            const currentMeasure_ =  [...measure1]
            const sliceLen = currentMeasure_.filter(piece => piece.occupied == false).length
            if(sliceLen > 0){
                
                    alert.show('This Note doesnt fit into the actual measure!');  return
                
                
            }
            
            const lastNoteofMeasure = calculateLastNoteIndex(currentMeasure_)
            if (activeNote == lastNoteofMeasure) {
                
                setPointer(1)
                const fit = checkMatch(index,steps,measure2)
                
                if (!fit) {
                    alert.show('This Note doesnt fit into the actual measure!');  return
                }
                
                
                
                    setMeasure2(measure2 =>{
                    
                    
                    
                        
                        const updatedBoardData = measure2.slice(0,measure2Meter)
                        const restboard = measure2.slice(measure2Meter,measure2.length)
                        
                        const startSlice = updatedBoardData.slice(0,1)
                        const tmpDefaultPitches = defaultpitchesoccupied
                        const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                        const endSlice = updatedBoardData.slice(1,updatedBoardData.length-steps)
                        
                        const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                        return updatedBoardData_
                
            })

            setactiveMeasure(1)
                setactiveNote(1)
                
                setPointer(pointer =>{
                   
                    return index + steps
                   
                })
        }

            else{

            }




        }
                 
            }
            else if (activeMeasure == 1) {
                
                const fit = checkMatch(index,steps,measure2)
                
            if(fit){

                playSynth(item['type'][0].replace('/',''),1)
                if (activeNote % measure2Meter == 0) {
                    const index = 1
                    setMeasure2(measure2 =>{
                    
                    
                    
                        
                        const updatedBoardData = measure2.slice(0,measure2Meter)
                        const restboard = measure2.slice(measure2Meter,measure2.length)
                        
                        const startSlice = updatedBoardData.slice(0,index)
                        const tmpDefaultPitches = defaultpitchesoccupied
                        const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                        const endSlice = updatedBoardData.slice(index,updatedBoardData.length-steps)
                        
                        const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                        console.log(updatedBoardData_)
                        return updatedBoardData_
    
                    })

                    setactiveNote(index)
                    setPointer(pointer =>{
                        const followUpPointer = index + steps
                        if(followUpPointer % measure2Meter == 0 ){
                        return index + steps+1}
                        else{
                            return index + steps
                        }
                    })

                    
                }

                else{

                    
                    const activeItem = calculateSteps( measure2[index].duration)

                setMeasure2(measure2 =>{
                    
                    
                    
                    
                    const updatedBoardData = measure2.slice(0,measure2Meter)
                    const restboard = measure2.slice(measure2Meter,measure2.length)
                    const steps_ = calculateSteps(updatedBoardData[index].duration) 
                    const startSlice = updatedBoardData.slice(0,index+steps_)
                    const  tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(index+steps_,updatedBoardData.length-steps)
                    
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    return updatedBoardData_

                })
                setactiveNote(index+activeItem)
                setPointer(pointer =>{
                    const followUpPointer = index+activeItem + steps
                    if(followUpPointer % measure2Meter == 0 ){
                    return index + steps+1}
                    else{
                        return index + steps
                    }
                })
                
                
            }


        }


        else{

            const currentMeasure_ =  [...measure2]
            const sliceLen = currentMeasure_.filter(piece => piece.occupied == false).length
            
            if(sliceLen > 0){
                alert.show('This Note doesnt fit into the actual measure!'); return
            }
            const lastNoteofMeasure = calculateLastNoteIndex(currentMeasure_)
            
            
            if (activeNote == lastNoteofMeasure) {
                
                setPointer(1)
                const fit = checkMatch(index,steps,measure3)
                
                if (!fit) {
                    alert.show('This Note doesnt fit into the actual measure!'); return
                }

                setMeasure3(measure3 =>{
                    
                    
                    
                    
                    const updatedBoardData = measure3.slice(0,measure3Meter)
                    const restboard = measure3.slice(measure3Meter,measure3.length)
                    
                    const startSlice = updatedBoardData.slice(0,1)
                    const tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(1,updatedBoardData.length-steps)
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    return updatedBoardData_
            
        })
                setactiveMeasure(2)
                setactiveNote(1)

                setPointer(pointer =>{
                   
                    return index + steps
                   
                })
                
            }

            else{

            }



        }
                
            }
            else if (activeMeasure == 2) {

                const fit = checkMatch(index,steps,measure3)
                
            if(fit){

                playSynth(item['type'][0].replace('/',''),1)
                if (activeNote % measure3Meter == 0) {
                    const index = 1
                    setMeasure3(measure3 =>{
                    
                    
                    
                        
                        const updatedBoardData = measure3.slice(0,measure3Meter)
                        const restboard = measure3.slice(measure3Meter,measure3.length)
                        
                        const startSlice = updatedBoardData.slice(0,index)
                        const tmpDefaultPitches = defaultpitchesoccupied
                        const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                        const endSlice = updatedBoardData.slice(index,updatedBoardData.length-steps)
                        
                        const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                        console.log(updatedBoardData_)
                        return updatedBoardData_
    
                    })

                    setactiveNote(index)
                    setPointer(pointer =>{
                        const followUpPointer = index + steps
                        if(followUpPointer % measure3Meter == 0 ){
                        return index + steps+1}
                        else{
                            return index + steps
                        }
                    })

                    
                }

                else{

                    
                    const activeItem = calculateSteps( measure3[index].duration)

                setMeasure3(measure3 =>{
                    
                    
                    
                    
                    
                    const updatedBoardData = measure3.slice(0,measure3Meter)
                    const restboard = measure3.slice(measure3Meter,measure3.length)
                    const steps_ = calculateSteps(updatedBoardData[index].duration) 
                    const startSlice = updatedBoardData.slice(0,index+steps_)
                    const  tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(index+steps_,updatedBoardData.length-steps)
                    
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    console.log(updatedBoardData_)
                    return updatedBoardData_

                })
                setactiveNote(index+activeItem)
                setPointer(pointer =>{
                    const followUpPointer = index+activeItem + steps
                    if(followUpPointer % measure3Meter == 0 ){
                    return index + steps+1}
                    else{
                        return index + steps
                    }
                })
                
                
            }


        }


        else{
            const currentMeasure_ =  [...measure3]
            const sliceLen = currentMeasure_.filter(piece => piece.occupied == false).length
            if(sliceLen > 0){
                alert.show('This Note doesnt fit into the actual measure!');  return
            }
            const lastNoteofMeasure = calculateLastNoteIndex(currentMeasure_)
            
            if (activeNote == lastNoteofMeasure) {
                
                setPointer(1)
                const fit = checkMatch(index,steps,measure4)
                
                if (!fit) {
                    alert.show('This Note doesnt fit into the actual measure!'); return
                }


                setMeasure4(measure4 =>{
                    
                    
                    const updatedBoardData = measure4.slice(0,measure4Meter)
                    const restboard = measure4.slice(measure4Meter,measure4.length)
                    console.log(restboard)
                    const startSlice = updatedBoardData.slice(0,1)
                    const tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(1,updatedBoardData.length-steps)
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    console.log(startSlice)
                    console.log(middleSlice)
                    console.log(endSlice)
                    console.log(restboard)
                    return updatedBoardData_
            
        })

            setactiveMeasure(3)
                setactiveNote(1)
                
                setPointer(pointer =>{
                   
                    return index + steps
                   
                })
                
            }
            else{

            }




        }
                
            }

            
            else if (activeMeasure == 3) {
                
                const fit = checkMatch(index,steps,measure4)
                
            if(fit){

                playSynth(item['type'][0].replace('/',''),1)
                if (activeNote % measure4Meter == 0) {
                    const index = 1
                    setMeasure4(measure4 =>{
                    
                    
                    
                        
                        const updatedBoardData = measure4.slice(0,measure4Meter)
                        const restboard = measure4.slice(measure4Meter,measure4.length)
                        
                        const startSlice = updatedBoardData.slice(0,index)
                        const tmpDefaultPitches = defaultpitchesoccupied
                        const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                        const endSlice = updatedBoardData.slice(index,updatedBoardData.length-steps)
                        
                        const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                        console.log(updatedBoardData_)
                        return updatedBoardData_
    
                    })

                    setactiveNote(index)
                    setPointer(pointer =>{
                        const followUpPointer = index + steps
                        if(followUpPointer % measure4Meter == 0 ){
                        return index + steps+1}
                        else{
                            return index + steps
                        }
                    })

                    
                }

                else{

                    
                    const activeItem = calculateSteps( measure4[index].duration)

                setMeasure4(measure4 =>{
                    
                    
                    
                    
                    const updatedBoardData = measure4.slice(0,measure4Meter)
                    const restboard = measure4.slice(measure4Meter,measure4.length)
                    const steps_ = calculateSteps(updatedBoardData[index].duration) 
                    const startSlice = updatedBoardData.slice(0,index+steps_)
                    const  tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(index+steps_,updatedBoardData.length-steps)
                    
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    return updatedBoardData_

                })
                setactiveNote(index+activeItem)
                setPointer(pointer =>{
                    const followUpPointer = index+activeItem + steps
                    if(followUpPointer % measure4Meter == 0 ){
                    return index + steps+1}
                    else{
                        return index + steps
                    }
                })
                
                
            }


        }


        else{

            const currentMeasure_ =  [...measure4]
            const sliceLen = currentMeasure_.filter(piece => piece.occupied == false).length
            
            if(sliceLen > 0){
                alert.show('This Note doesnt fit into the actual measure!');  return
            }
            const lastNoteofMeasure = calculateLastNoteIndex(currentMeasure_)
            
            
            if (activeNote == lastNoteofMeasure) {
                
                setPointer(1)
                const fit = checkMatch(index,steps,measure5)
                
                if (!fit) {
                    alert.show('This Note doesnt fit into the actual measure!'); return
                }

                setMeasure5(measure5 =>{
                    
                    
                    
                    
                    console.log(measure5)
                    const updatedBoardData = measure5.slice(0,measure5Meter)
                    
                    const restboard = measure5.slice(measure5Meter,measure5.length)
                    console.log(measure5Meter)
                    console.log(measure5)
                    const startSlice = updatedBoardData.slice(0,1)
                    const tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(1,updatedBoardData.length-steps)
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    console.log(startSlice)
                    console.log(middleSlice)
                    console.log(endSlice)
                    console.log(restboard)
                    return updatedBoardData_
            
        })
                setactiveMeasure(4)
                setactiveNote(1)

                setPointer(pointer =>{
                   
                    return index + steps
                   
                })
                
            }

            else{

            }



        }
                
            }


            else if (activeMeasure == 4) {
                
                
                const fit = checkMatch(index,steps,measure5)
                
            if(fit){
                
                playSynth(item['type'][0].replace('/',''),1)
                if (activeNote % measure5Meter == 0) {
                    const index = 1
                    setMeasure5(measure5 =>{
                    
                    
                    
                        
                        const updatedBoardData = measure5.slice(0,measure5Meter)
                        const restboard = measure5.slice(measure5Meter,measure5.length)
                        
                        const startSlice = updatedBoardData.slice(0,index)
                        const tmpDefaultPitches = defaultpitchesoccupied
                        const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                        const endSlice = updatedBoardData.slice(index,updatedBoardData.length-steps)
                        
                        const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                        console.log(updatedBoardData_)
                        return updatedBoardData_
    
                    })

                    setactiveNote(index)
                    setPointer(pointer =>{
                        const followUpPointer = index + steps
                        if(followUpPointer % measure5Meter == 0 ){
                        return index + steps+1}
                        else{
                            return index + steps
                        }
                    })

                    
                }

                else{

                    
                    const activeItem = calculateSteps( measure5[index].duration)

                setMeasure5(measure5 =>{
                    
                    
                    
                    
                    const updatedBoardData = measure5.slice(0,measure5Meter)
                    const restboard = measure5.slice(measure5Meter,measure5.length)
                    const steps_ = calculateSteps(updatedBoardData[index].duration) 
                    const startSlice = updatedBoardData.slice(0,index+steps_)
                    const  tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(index+steps_,updatedBoardData.length-steps)
                    
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    return updatedBoardData_

                })
                setactiveNote(index+activeItem)
                setPointer(pointer =>{
                    const followUpPointer = index+activeItem + steps
                    if(followUpPointer % measure5Meter == 0 ){
                    return index + steps+1}
                    else{
                        return index + steps
                    }
                })
                
                
            }


        }


        else{
            
            const currentMeasure_ =  [...measure5]
            const sliceLen = currentMeasure_.filter(piece => piece.occupied == false).length
            console.log(currentMeasure_)
            if(sliceLen > 0){
                
                alert.show('This Note doesnt fit into the actual measure!');  return
            }
            const lastNoteofMeasure = calculateLastNoteIndex(currentMeasure_)
            
            
            if (activeNote == lastNoteofMeasure) {
                
                setPointer(1)
                const fit = checkMatch(index,steps,measure6)
                
                if (!fit) {
                    alert.show('This Note doesnt fit into the actual measure!'); return
                }

                setMeasure6(measure6 =>{
                    
                    
                    
                    
                    const updatedBoardData = measure6.slice(0,measure6Meter)
                    const restboard = measure6.slice(measure6Meter,measure6.length)
                    
                    const startSlice = updatedBoardData.slice(0,1)
                    const tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(1,updatedBoardData.length-steps)
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    return updatedBoardData_
            
        })
                setactiveMeasure(5)
                setactiveNote(1)

                setPointer(pointer =>{
                   
                    return index + steps
                   
                })
                
            }

            else{

            }



        }
                
            }
            
            
            else if (activeMeasure == 5) {
                console.log("Testo")
                const fit = checkMatch(index,steps,measure6)
                
            if(fit){

                playSynth(item['type'][0].replace('/',''),1)
                if (activeNote % measure6Meter == 0) {
                    const index = 1
                    setMeasure6(measure6 =>{
                    
                    
                    
                        
                        const updatedBoardData = measure6.slice(0,measure6Meter)
                        const restboard = measure6.slice(measure6Meter,measure6.length)
                        
                        const startSlice = updatedBoardData.slice(0,index)
                        const tmpDefaultPitches = defaultpitchesoccupied
                        const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                        const endSlice = updatedBoardData.slice(index,updatedBoardData.length-steps)
                        
                        const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                        console.log(updatedBoardData_)
                        return updatedBoardData_
    
                    })

                    setactiveNote(index)
                    setPointer(pointer =>{
                        const followUpPointer = index + steps
                        if(followUpPointer % measure6Meter == 0 ){
                        return index + steps+1}
                        else{
                            return index + steps
                        }
                    })

                    
                }

                else{

                    
                    const activeItem = calculateSteps( measure6[index].duration)

                setMeasure6(measure6 =>{
                    
                    
                    
                    
                    const updatedBoardData = measure6.slice(0,measure6Meter)
                    const restboard = measure6.slice(measure6Meter,measure6.length)
                    const steps_ = calculateSteps(updatedBoardData[index].duration) 
                    const startSlice = updatedBoardData.slice(0,index+steps_)
                    const  tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(index+steps_,updatedBoardData.length-steps)
                    
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    return updatedBoardData_

                })
                setactiveNote(index+activeItem)
                setPointer(pointer =>{
                    const followUpPointer = index+activeItem + steps
                    if(followUpPointer % measure6Meter == 0 ){
                    return index + steps+1}
                    else{
                        return index + steps
                    }
                })
                
                
            }


        }


        else{

            const currentMeasure_ =  [...measure6]
            const sliceLen = currentMeasure_.filter(piece => piece.occupied == false).length
            
            if(sliceLen > 0){
                alert.show('This Note doesnt fit into the actual measure!');  return
            }
            const lastNoteofMeasure = calculateLastNoteIndex(currentMeasure_)
            
            
            if (activeNote == lastNoteofMeasure) {
                
                setPointer(1)
                const fit = checkMatch(index,steps,measure7)
                
                if (!fit) {
                    alert.show('This Note doesnt fit into the actual measure!'); return
                }

                setMeasure7(measure7 =>{
                    
                    
                    
                    
                    const updatedBoardData = measure7.slice(0,measure7Meter)
                    const restboard = measure7.slice(measure7Meter,measure7.length)
                    
                    const startSlice = updatedBoardData.slice(0,1)
                    const tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(1,updatedBoardData.length-steps)
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    return updatedBoardData_
            
        })
                setactiveMeasure(6)
                setactiveNote(1)

                setPointer(pointer =>{
                   
                    return index + steps
                   
                })
                
            }

            else{

            }



        }
                
            }
            
            else if (activeMeasure == 6) {
                
                const fit = checkMatch(index,steps,measure7)
                
            if(fit){

                playSynth(item['type'][0].replace('/',''),1)
                if (activeNote % measure7Meter == 0) {
                    const index = 1
                    setMeasure7(measure7 =>{
                    
                    
                    
                        
                        const updatedBoardData = measure7.slice(0,measure7Meter)
                        const restboard = measure7.slice(measure7Meter,measure7.length)
                        
                        const startSlice = updatedBoardData.slice(0,index)
                        const tmpDefaultPitches = defaultpitchesoccupied
                        const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                        const endSlice = updatedBoardData.slice(index,updatedBoardData.length-steps)
                        
                        const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                        console.log(updatedBoardData_)
                        return updatedBoardData_
    
                    })

                    setactiveNote(index)
                    setPointer(pointer =>{
                        const followUpPointer = index + steps
                        if(followUpPointer % measure7Meter == 0 ){
                        return index + steps+1}
                        else{
                            return index + steps
                        }
                    })

                    
                }

                else{

                    
                    const activeItem = calculateSteps( measure7[index].duration)

                setMeasure7(measure7 =>{
                    
                    
                    
                    
                    const updatedBoardData = measure7.slice(0,measure7Meter)
                    const restboard = measure7.slice(measure7Meter,measure7.length)
                    const steps_ = calculateSteps(updatedBoardData[index].duration) 
                    const startSlice = updatedBoardData.slice(0,index+steps_)
                    const  tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(index+steps_,updatedBoardData.length-steps)
                    
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    return updatedBoardData_

                })
                setactiveNote(index+activeItem)
                setPointer(pointer =>{
                    const followUpPointer = index+activeItem + steps
                    if(followUpPointer % measure7Meter == 0 ){
                    return index + steps+1}
                    else{
                        return index + steps
                    }
                })
                
                
            }


        }


        else{

            const currentMeasure_ =  [...measure7]
            const sliceLen = currentMeasure_.filter(piece => piece.occupied == false).length
            
            if(sliceLen > 0){
                alert.show('This Note doesnt fit into the actual measure!');  return
            }
            const lastNoteofMeasure = calculateLastNoteIndex(currentMeasure_)
            
            
            if (activeNote == lastNoteofMeasure) {
                
                setPointer(1)
                const fit = checkMatch(index,steps,measure8)
                
                if (!fit) {
                    alert.show('This Note doesnt fit into the actual measure!'); return
                }

                setMeasure8(measure8 =>{
                    
                    
                    
                    
                    const updatedBoardData = measure8.slice(0,measure8Meter)
                    const restboard = measure8.slice(measure8Meter,measure8.length)
                    
                    const startSlice = updatedBoardData.slice(0,1)
                    const tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(1,updatedBoardData.length-steps)
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    return updatedBoardData_
            
        })
                setactiveMeasure(7)
                setactiveNote(1)

                setPointer(pointer =>{
                   
                    return index + steps
                   
                })
                
            }

            else{

            }



        }
                
            }

            else if (activeMeasure == 7) {
                
                const fit = checkMatch(index,steps,measure8)
            
            if(fit){
                
                playSynth(item['type'][0].replace('/',''),1)
                if (activeNote % measure8Meter == 0) {
                    const index = 1
                    setMeasure8(measure8 =>{
                    
                    
                    
                        
                        const updatedBoardData = measure8.slice(0,measure8Meter)
                        const restboard = measure8.slice(measure8Meter,measure8.length)
                        
                        const startSlice = updatedBoardData.slice(0,index)
                        const tmpDefaultPitches = defaultpitchesoccupied
                        const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                        const endSlice = updatedBoardData.slice(index,updatedBoardData.length-steps)
                        
                        const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                        return updatedBoardData_
    
                    })

                    setactiveNote(index)
                    setPointer(pointer =>{
                        const followUpPointer = index + steps
                        if(followUpPointer % 17 == 0 ){
                        return index + steps+1}
                        else{
                            return index + steps
                        }
                    })

                }
               else{
 
                    const activeItem = calculateSteps( measure8[index].duration)

                setMeasure8(measure8 =>{
                    
                    const updatedBoardData = measure8.slice(0,measure1Meter)
                    const restboard = measure8.slice(measure8Meter,measure8.length)
                    const steps_ = calculateSteps(updatedBoardData[index].duration) 
                    const startSlice = updatedBoardData.slice(0,index+steps_)
                    const  tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(index+steps_,updatedBoardData.length-steps)
                    
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    console.log(updatedBoardData_)
                    return updatedBoardData_

                })
                setactiveNote(index+activeItem)
                setPointer(pointer =>{
                    const followUpPointer = index+activeItem + steps
                    if(followUpPointer % measure1Meter == 0 ){
                    return index + steps+1}
                    else{
                        return index + steps
                    }
                })
                
                
            }


        }


        else{

            const currentMeasure_ =  [...measure8]
            const sliceLen = currentMeasure_.filter(piece => piece.occupied == false).length
            if(sliceLen > 0){
                
                    alert.show('This Note doesnt fit into the actual measure!');  return
                
                
            }
            
            const lastNoteofMeasure = calculateLastNoteIndex(currentMeasure_)
            if (activeNote == lastNoteofMeasure) {
                
                setPointer(1)
                const fit = checkMatch(index,steps,measure9)
                
                if (!fit) {
                    alert.show('This Note doesnt fit into the actual measure!');  return
                }
                
                
                
                    setMeasure9(measure9 =>{
                    
                    
                    
                        
                        const updatedBoardData = measure9.slice(0,measure9Meter)
                        const restboard = measure9.slice(measure9Meter,measure9.length)
                        
                        const startSlice = updatedBoardData.slice(0,1)
                        const tmpDefaultPitches = defaultpitchesoccupied
                        const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                        const endSlice = updatedBoardData.slice(1,updatedBoardData.length-steps)
                        
                        const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                        return updatedBoardData_
                
            })

            setactiveMeasure(8)
                setactiveNote(1)
                
                setPointer(pointer =>{
                   
                    return index + steps
                   
                })
        }

            else{

            }

        }
                
            }

            else if (activeMeasure == 8) {
                
                const fit = checkMatch(index,steps,measure9)
            
            if(fit){
                
                playSynth(item['type'][0].replace('/',''),1)
                if (activeNote % measure9Meter == 0) {
                    const index = 1
                    setMeasure9(measure9 =>{
                    
                    
                    
                        
                        const updatedBoardData = measure9.slice(0,measure9Meter)
                        const restboard = measure9.slice(measure9Meter,measure9.length)
                        
                        const startSlice = updatedBoardData.slice(0,index)
                        const tmpDefaultPitches = defaultpitchesoccupied
                        const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                        const endSlice = updatedBoardData.slice(index,updatedBoardData.length-steps)
                        
                        const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                        return updatedBoardData_
    
                    })

                    setactiveNote(index)
                    setPointer(pointer =>{
                        const followUpPointer = index + steps
                        if(followUpPointer % 17 == 0 ){
                        return index + steps+1}
                        else{
                            return index + steps
                        }
                    })

                }
               else{
 
                    const activeItem = calculateSteps( measure9[index].duration)

                setMeasure9(measure9 =>{
                    
                    const updatedBoardData = measure9.slice(0,measure1Meter)
                    const restboard = measure9.slice(measure9Meter,measure9.length)
                    const steps_ = calculateSteps(updatedBoardData[index].duration) 
                    const startSlice = updatedBoardData.slice(0,index+steps_)
                    const  tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(index+steps_,updatedBoardData.length-steps)
                    
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    console.log(updatedBoardData_)
                    return updatedBoardData_

                })
                setactiveNote(index+activeItem)
                setPointer(pointer =>{
                    const followUpPointer = index+activeItem + steps
                    if(followUpPointer % measure1Meter == 0 ){
                    return index + steps+1}
                    else{
                        return index + steps
                    }
                })
                
                
            }


        }


        else{

            const currentMeasure_ =  [...measure9]
            const sliceLen = currentMeasure_.filter(piece => piece.occupied == false).length
            if(sliceLen > 0){
                
                    alert.show('This Note doesnt fit into the actual measure!');  return
                
                
            }
            
            const lastNoteofMeasure = calculateLastNoteIndex(currentMeasure_)
            if (activeNote == lastNoteofMeasure) {
                
                setPointer(1)
                const fit = checkMatch(index,steps,measure10)
                
                if (!fit) {
                    alert.show('This Note doesnt fit into the actual measure!');  return
                }
                
                
                
                    setMeasure10(measure10 =>{
                    
                    
                    
                        
                        const updatedBoardData = measure10.slice(0,measure10Meter)
                        const restboard = measure10.slice(measure10Meter,measure10.length)
                        
                        const startSlice = updatedBoardData.slice(0,1)
                        const tmpDefaultPitches = defaultpitchesoccupied
                        const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                        const endSlice = updatedBoardData.slice(1,updatedBoardData.length-steps)
                        
                        const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                        return updatedBoardData_
                
            })

            setactiveMeasure(9)
                setactiveNote(1)
                
                setPointer(pointer =>{
                   
                    return index + steps
                   
                })
        }

            else{

            }




        }
                 
            }
            else if (activeMeasure == 9) {
                
                
                const fit = checkMatch(index,steps,measure10)
                
            if(fit){
                
                playSynth(item['type'][0].replace('/',''),1)
                if (activeNote % measure10Meter == 0) {
                    const index = 1
                    setMeasure10(measure10 =>{
                    
                    
                    
                        
                        const updatedBoardData = measure10.slice(0,measure10Meter)
                        const restboard = measure10.slice(measure10Meter,measure10.length)
                        
                        const startSlice = updatedBoardData.slice(0,index)
                        const tmpDefaultPitches = defaultpitchesoccupied
                        const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                        const endSlice = updatedBoardData.slice(index,updatedBoardData.length-steps)
                        
                        const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                        console.log(updatedBoardData_)
                        return updatedBoardData_
    
                    })

                    setactiveNote(index)
                    setPointer(pointer =>{
                        const followUpPointer = index + steps
                        if(followUpPointer % measure10Meter == 0 ){
                        return index + steps+1}
                        else{
                            return index + steps
                        }
                    })

                    
                }

                else{

                    
                    const activeItem = calculateSteps( measure10[index].duration)

                setMeasure10(measure10 =>{
                    
                    
                    
                    
                    const updatedBoardData = measure10.slice(0,measure10Meter)
                    const restboard = measure10.slice(measure10Meter,measure10.length)
                    const steps_ = calculateSteps(updatedBoardData[index].duration) 
                    const startSlice = updatedBoardData.slice(0,index+steps_)
                    const  tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(index+steps_,updatedBoardData.length-steps)
                    
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    return updatedBoardData_

                })
                setactiveNote(index+activeItem)
                setPointer(pointer =>{
                    const followUpPointer = index+activeItem + steps
                    if(followUpPointer % measure10Meter == 0 ){
                    return index + steps+1}
                    else{
                        return index + steps
                    }
                })
                
                
            }


        }


        else{
            
            const currentMeasure_ =  [...measure10]
            const sliceLen = currentMeasure_.filter(piece => piece.occupied == false).length
            console.log(currentMeasure_)
            if(sliceLen > 0){
                
                alert.show('This Note doesnt fit into the actual measure!');  return
            }
            const lastNoteofMeasure = calculateLastNoteIndex(currentMeasure_)
            
            
            if (activeNote == lastNoteofMeasure) {
                
                setPointer(1)
                const fit = checkMatch(index,steps,measure11)
                
                if (!fit) {
                    alert.show('This Note doesnt fit into the actual measure!'); return
                }

                setMeasure11(measure11 =>{
                    
                    
                    
                    
                    const updatedBoardData = measure11.slice(0,measure11Meter)
                    const restboard = measure11.slice(measure11Meter,measure11.length)
                    
                    const startSlice = updatedBoardData.slice(0,1)
                    const tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(1,updatedBoardData.length-steps)
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    return updatedBoardData_
            
        })
                setactiveMeasure(10)
                setactiveNote(1)

                setPointer(pointer =>{
                   
                    return index + steps
                   
                })
                
            }

            else{

            }



        }
                
            }
            else if (activeMeasure == 10) {

                const fit = checkMatch(index,steps,measure11)
                
            if(fit){

                playSynth(item['type'][0].replace('/',''),1)
                if (activeNote % measure11Meter == 0) {
                    const index = 1
                    setMeasure11(measure11 =>{
                    
                    
                    
                        
                        const updatedBoardData = measure11.slice(0,measure11Meter)
                        const restboard = measure11.slice(measure11Meter,measure11.length)
                        
                        const startSlice = updatedBoardData.slice(0,index)
                        const tmpDefaultPitches = defaultpitchesoccupied
                        const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                        const endSlice = updatedBoardData.slice(index,updatedBoardData.length-steps)
                        
                        const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                        console.log(updatedBoardData_)
                        return updatedBoardData_
    
                    })

                    setactiveNote(index)
                    setPointer(pointer =>{
                        const followUpPointer = index + steps
                        if(followUpPointer % measure11Meter == 0 ){
                        return index + steps+1}
                        else{
                            return index + steps
                        }
                    })

                    
                }

                else{

                    
                    const activeItem = calculateSteps( measure11[index].duration)

                setMeasure11(measure11 =>{
                    
                    
                    
                    
                    
                    const updatedBoardData = measure11.slice(0,measure11Meter)
                    const restboard = measure11.slice(measure11Meter,measure11.length)
                    const steps_ = calculateSteps(updatedBoardData[index].duration) 
                    const startSlice = updatedBoardData.slice(0,index+steps_)
                    const  tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(index+steps_,updatedBoardData.length-steps)
                    
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    console.log(updatedBoardData_)
                    return updatedBoardData_

                })
                setactiveNote(index+activeItem)
                setPointer(pointer =>{
                    const followUpPointer = index+activeItem + steps
                    if(followUpPointer % measure11Meter == 0 ){
                    return index + steps+1}
                    else{
                        return index + steps
                    }
                })
                
                
            }


        }


        else{
            const currentMeasure_ =  [...measure11]
            const sliceLen = currentMeasure_.filter(piece => piece.occupied == false).length
            if(sliceLen > 0){
                alert.show('This Note doesnt fit into the actual measure!');  return
            }
            const lastNoteofMeasure = calculateLastNoteIndex(currentMeasure_)
            
            if (activeNote == lastNoteofMeasure) {
                
                setPointer(1)
                const fit = checkMatch(index,steps,measure12)
                
                if (!fit) {
                    alert.show('This Note doesnt fit into the actual measure!'); return
                }


                setMeasure12(measure12 =>{
                    
                    
                    const updatedBoardData = measure12.slice(0,measure12Meter)
                    const restboard = measure12.slice(measure12Meter,measure12.length)
                    console.log(restboard)
                    const startSlice = updatedBoardData.slice(0,1)
                    const tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(1,updatedBoardData.length-steps)
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    console.log(startSlice)
                    console.log(middleSlice)
                    console.log(endSlice)
                    console.log(restboard)
                    return updatedBoardData_
            
        })

            setactiveMeasure(11)
                setactiveNote(1)
                
                setPointer(pointer =>{
                   
                    return index + steps
                   
                })
                
            }
            else{

            }




        }
                
            }

            
            else if (activeMeasure == 11) {
                
                const fit = checkMatch(index,steps,measure12)
                
            if(fit){

                playSynth(item['type'][0].replace('/',''),1)
                if (activeNote % measure12Meter == 0) {
                    const index = 1
                    setMeasure12(measure12 =>{
                    
                    
                    
                        
                        const updatedBoardData = measure12.slice(0,measure12Meter)
                        const restboard = measure12.slice(measure12Meter,measure12.length)
                        
                        const startSlice = updatedBoardData.slice(0,index)
                        const tmpDefaultPitches = defaultpitchesoccupied
                        const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                        const endSlice = updatedBoardData.slice(index,updatedBoardData.length-steps)
                        
                        const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                        console.log(updatedBoardData_)
                        return updatedBoardData_
    
                    })

                    setactiveNote(index)
                    setPointer(pointer =>{
                        const followUpPointer = index + steps
                        if(followUpPointer % measure12Meter == 0 ){
                        return index + steps+1}
                        else{
                            return index + steps
                        }
                    })

                    
                }

                else{

                    
                    const activeItem = calculateSteps( measure12[index].duration)

                setMeasure12(measure12 =>{
                    
                    
                    
                    
                    const updatedBoardData = measure12.slice(0,measure12Meter)
                    const restboard = measure12.slice(measure12Meter,measure12.length)
                    const steps_ = calculateSteps(updatedBoardData[index].duration) 
                    const startSlice = updatedBoardData.slice(0,index+steps_)
                    const  tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(index+steps_,updatedBoardData.length-steps)
                    
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    return updatedBoardData_

                })
                setactiveNote(index+activeItem)
                setPointer(pointer =>{
                    const followUpPointer = index+activeItem + steps
                    if(followUpPointer % measure12Meter == 0 ){
                    return index + steps+1}
                    else{
                        return index + steps
                    }
                })
                
                
            }


        }


        else{

            const currentMeasure_ =  [...measure12]
            const sliceLen = currentMeasure_.filter(piece => piece.occupied == false).length
            
            if(sliceLen > 0){
                alert.show('This Note doesnt fit into the actual measure!');  return
            }
            const lastNoteofMeasure = calculateLastNoteIndex(currentMeasure_)
            
            
            if (activeNote == lastNoteofMeasure) {
                
                setPointer(1)
                const fit = checkMatch(index,steps,measure13)
                
                if (!fit) {
                    alert.show('This Note doesnt fit into the actual measure!'); return
                }

                setMeasure13(measure13 =>{
                    
                    
                    
                    
                    console.log(measure13)
                    const updatedBoardData = measure13.slice(0,measure13Meter)
                    
                    const restboard = measure13.slice(measure13Meter,measure13.length)
                    console.log(measure13Meter)
                    console.log(measure13)
                    const startSlice = updatedBoardData.slice(0,1)
                    const tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(1,updatedBoardData.length-steps)
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    console.log(startSlice)
                    console.log(middleSlice)
                    console.log(endSlice)
                    console.log(restboard)
                    return updatedBoardData_
            
        })
                setactiveMeasure(12)
                setactiveNote(1)

                setPointer(pointer =>{
                   
                    return index + steps
                   
                })
                
            }

            else{

            }



        }
                
            }


            else if (activeMeasure == 12) {
                
                
                const fit = checkMatch(index,steps,measure13)
                
            if(fit){
                
                playSynth(item['type'][0].replace('/',''),1)
                if (activeNote % measure13Meter == 0) {
                    const index = 1
                    setMeasure13(measure13 =>{
                    
                    
                    
                        
                        const updatedBoardData = measure13.slice(0,measure13Meter)
                        const restboard = measure13.slice(measure13Meter,measure13.length)
                        
                        const startSlice = updatedBoardData.slice(0,index)
                        const tmpDefaultPitches = defaultpitchesoccupied
                        const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                        const endSlice = updatedBoardData.slice(index,updatedBoardData.length-steps)
                        
                        const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                        console.log(updatedBoardData_)
                        return updatedBoardData_
    
                    })

                    setactiveNote(index)
                    setPointer(pointer =>{
                        const followUpPointer = index + steps
                        if(followUpPointer % measure13Meter == 0 ){
                        return index + steps+1}
                        else{
                            return index + steps
                        }
                    })

                    
                }

                else{

                    
                    const activeItem = calculateSteps( measure13[index].duration)

                setMeasure13(measure13 =>{
                    
                    
                    
                    
                    const updatedBoardData = measure13.slice(0,measure13Meter)
                    const restboard = measure13.slice(measure13Meter,measure13.length)
                    const steps_ = calculateSteps(updatedBoardData[index].duration) 
                    const startSlice = updatedBoardData.slice(0,index+steps_)
                    const  tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(index+steps_,updatedBoardData.length-steps)
                    
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    return updatedBoardData_

                })
                setactiveNote(index+activeItem)
                setPointer(pointer =>{
                    const followUpPointer = index+activeItem + steps
                    if(followUpPointer % measure13Meter == 0 ){
                    return index + steps+1}
                    else{
                        return index + steps
                    }
                })
                
                
            }


        }


        else{
            
            const currentMeasure_ =  [...measure13]
            const sliceLen = currentMeasure_.filter(piece => piece.occupied == false).length
            console.log(currentMeasure_)
            if(sliceLen > 0){
                
                alert.show('This Note doesnt fit into the actual measure!');  return
            }
            const lastNoteofMeasure = calculateLastNoteIndex(currentMeasure_)
            
            
            if (activeNote == lastNoteofMeasure) {
                
                setPointer(1)
                const fit = checkMatch(index,steps,measure14)
                
                if (!fit) {
                    alert.show('This Note doesnt fit into the actual measure!'); return
                }

                setMeasure14(measure14 =>{
                    
                    
                    
                    
                    const updatedBoardData = measure14.slice(0,measure14Meter)
                    const restboard = measure14.slice(measure14Meter,measure14.length)
                    
                    const startSlice = updatedBoardData.slice(0,1)
                    const tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(1,updatedBoardData.length-steps)
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    return updatedBoardData_
            
        })
                setactiveMeasure(13)
                setactiveNote(1)

                setPointer(pointer =>{
                   
                    return index + steps
                   
                })
                
            }

            else{

            }



        }
                
            }
            
            
            else if (activeMeasure == 13) {
                
                const fit = checkMatch(index,steps,measure14)
                
            if(fit){

                playSynth(item['type'][0].replace('/',''),1)
                if (activeNote % measure14Meter == 0) {
                    const index = 1
                    setMeasure14(measure14 =>{
                    
                    
                    
                        
                        const updatedBoardData = measure14.slice(0,measure14Meter)
                        const restboard = measure14.slice(measure14Meter,measure14.length)
                        
                        const startSlice = updatedBoardData.slice(0,index)
                        const tmpDefaultPitches = defaultpitchesoccupied
                        const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                        const endSlice = updatedBoardData.slice(index,updatedBoardData.length-steps)
                        
                        const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                        console.log(updatedBoardData_)
                        return updatedBoardData_
    
                    })

                    setactiveNote(index)
                    setPointer(pointer =>{
                        const followUpPointer = index + steps
                        if(followUpPointer % measure14Meter == 0 ){
                        return index + steps+1}
                        else{
                            return index + steps
                        }
                    })

                    
                }

                else{

                    
                    const activeItem = calculateSteps( measure14[index].duration)

                setMeasure14(measure14 =>{
                    
                    
                    
                    
                    const updatedBoardData = measure14.slice(0,measure14Meter)
                    const restboard = measure14.slice(measure14Meter,measure14.length)
                    const steps_ = calculateSteps(updatedBoardData[index].duration) 
                    const startSlice = updatedBoardData.slice(0,index+steps_)
                    const  tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(index+steps_,updatedBoardData.length-steps)
                    
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    return updatedBoardData_

                })
                setactiveNote(index+activeItem)
                setPointer(pointer =>{
                    const followUpPointer = index+activeItem + steps
                    if(followUpPointer % measure14Meter == 0 ){
                    return index + steps+1}
                    else{
                        return index + steps
                    }
                })
                
                
            }


        }


        else{

            const currentMeasure_ =  [...measure14]
            const sliceLen = currentMeasure_.filter(piece => piece.occupied == false).length
            
            if(sliceLen > 0){
                alert.show('This Note doesnt fit into the actual measure!');  return
            }
            const lastNoteofMeasure = calculateLastNoteIndex(currentMeasure_)
            
            
            if (activeNote == lastNoteofMeasure) {
                
                setPointer(1)
                const fit = checkMatch(index,steps,measure15)
                
                if (!fit) {
                    alert.show('This Note doesnt fit into the actual measure!'); return
                }

                setMeasure15(measure15 =>{
                    
                    
                    
                    
                    const updatedBoardData = measure15.slice(0,measure15Meter)
                    const restboard = measure15.slice(measure15Meter,measure15.length)
                    
                    const startSlice = updatedBoardData.slice(0,1)
                    const tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(1,updatedBoardData.length-steps)
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    return updatedBoardData_
            
        })
                setactiveMeasure(14)
                setactiveNote(1)

                setPointer(pointer =>{
                   
                    return index + steps
                   
                })
                
            }

            else{

            }



        }
                
            }
            
            else if (activeMeasure == 14) {
                
                const fit = checkMatch(index,steps,measure15)
                
            if(fit){

                playSynth(item['type'][0].replace('/',''),1)
                if (activeNote % measure15Meter == 0) {
                    const index = 1
                    setMeasure15(measure15 =>{
                    
                    
                    
                        
                        const updatedBoardData = measure15.slice(0,measure15Meter)
                        const restboard = measure15.slice(measure15Meter,measure15.length)
                        
                        const startSlice = updatedBoardData.slice(0,index)
                        const tmpDefaultPitches = defaultpitchesoccupied
                        const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                        const endSlice = updatedBoardData.slice(index,updatedBoardData.length-steps)
                        
                        const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                        console.log(updatedBoardData_)
                        return updatedBoardData_
    
                    })

                    setactiveNote(index)
                    setPointer(pointer =>{
                        const followUpPointer = index + steps
                        if(followUpPointer % measure15Meter == 0 ){
                        return index + steps+1}
                        else{
                            return index + steps
                        }
                    })

                    
                }

                else{

                    
                    const activeItem = calculateSteps( measure15[index].duration)

                setMeasure15(measure15 =>{
                    
                    
                    
                    
                    const updatedBoardData = measure15.slice(0,measure15Meter)
                    const restboard = measure15.slice(measure15Meter,measure15.length)
                    const steps_ = calculateSteps(updatedBoardData[index].duration) 
                    const startSlice = updatedBoardData.slice(0,index+steps_)
                    const  tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(index+steps_,updatedBoardData.length-steps)
                    
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    return updatedBoardData_

                })
                setactiveNote(index+activeItem)
                setPointer(pointer =>{
                    const followUpPointer = index+activeItem + steps
                    if(followUpPointer % measure15Meter == 0 ){
                    return index + steps+1}
                    else{
                        return index + steps
                    }
                })
                
                
            }


        }


        else{

            const currentMeasure_ =  [...measure15]
            const sliceLen = currentMeasure_.filter(piece => piece.occupied == false).length
            
            if(sliceLen > 0){
                alert.show('This Note doesnt fit into the actual measure!');  return
            }
            const lastNoteofMeasure = calculateLastNoteIndex(currentMeasure_)
            
            
            if (activeNote == lastNoteofMeasure) {
                
                setPointer(1)
                const fit = checkMatch(index,steps,measure16)
                
                if (!fit) {
                    alert.show('This Note doesnt fit into the actual measure!'); return
                }

                setMeasure16(measure16 =>{
                    
                    
                    
                    
                    const updatedBoardData = measure16.slice(0,measure16Meter)
                    const restboard = measure16.slice(measure16Meter,measure16.length)
                    
                    const startSlice = updatedBoardData.slice(0,1)
                    const tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(1,updatedBoardData.length-steps)
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    return updatedBoardData_
            
        })
                setactiveMeasure(15)
                setactiveNote(1)

                setPointer(pointer =>{
                   
                    return index + steps
                   
                })
                
            }

            else{

            }



        }
                
            }

            else if (activeMeasure == 15) {
                
                const fit = checkMatch(index,steps,measure16)
                
            if(fit){

                playSynth(item['type'][0].replace('/',''),1)
                if (activeNote % measure16Meter == 0) {
                    const index = 1
                    setMeasure16(measure16 =>{
                    
                    
                    
                        
                        const updatedBoardData = measure16.slice(0,measure16Meter)
                        const restboard = measure16.slice(measure16Meter,measure16.length)
                        
                        const startSlice = updatedBoardData.slice(0,index)
                        const tmpDefaultPitches = defaultpitchesoccupied
                        const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                        const endSlice = updatedBoardData.slice(index,updatedBoardData.length-steps)
                        
                        const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                        console.log(updatedBoardData_)
                        return updatedBoardData_
    
                    })

                    setactiveNote(index)
                    setPointer(pointer =>{
                        const followUpPointer = index + steps
                        if(followUpPointer % measure16Meter == 0 ){
                        return index + steps+1}
                        else{
                            return index + steps
                        }
                    })

                    
                }

                else{

                    
                    const activeItem = calculateSteps( measure16[index].duration)

                setMeasure16(measure16 =>{
                    
                    
                    
                    
                    const updatedBoardData = measure16.slice(0,measure16Meter)
                    const restboard = measure16.slice(measure16Meter,measure16.length)
                    const steps_ = calculateSteps(updatedBoardData[index].duration) 
                    const startSlice = updatedBoardData.slice(0,index+steps_)
                    const  tmpDefaultPitches = defaultpitchesoccupied
                    const middleSlice = [item].concat(new Array(steps-1).fill(tmpDefaultPitches))
                    const endSlice = updatedBoardData.slice(index+steps_,updatedBoardData.length-steps)
                    
                    
                    const updatedBoardData_ = startSlice.concat(middleSlice).concat(endSlice).concat(restboard)
                    return updatedBoardData_

                })
                setactiveNote(index+activeItem)
                setPointer(pointer =>{
                    const followUpPointer = index+activeItem + steps
                    if(followUpPointer % measure16Meter == 0 ){
                    return index + steps+1}
                    else{
                        return index + steps
                    }
                })
                
                
            }


        }


        
                
            }
        
            
            

        }

        useEffect(() => {
                setMeasure1(defaultPitchesArray_(selectedOption['value']))
                setMeasure2(defaultPitchesArray_(selectedOption['value']))
                setMeasure3(defaultPitchesArray_(selectedOption['value']))
                setMeasure4(defaultPitchesArray_(selectedOption['value']))
                setMeasure5(defaultPitchesArray_(selectedOption['value']))
                setMeasure6(defaultPitchesArray_(selectedOption['value']))
                setMeasure7(defaultPitchesArray_(selectedOption['value']))
                setMeasure8(defaultPitchesArray_(selectedOption['value']))
                setMeasure9(defaultPitchesArray_(selectedOption['value']))
                setMeasure10(defaultPitchesArray_(selectedOption['value']))
                setMeasure11(defaultPitchesArray_(selectedOption['value']))
                setMeasure12(defaultPitchesArray_(selectedOption['value']))
                setMeasure13(defaultPitchesArray_(selectedOption['value']))
                setMeasure14(defaultPitchesArray_(selectedOption['value']))
                setMeasure15(defaultPitchesArray_(selectedOption['value']))
                setMeasure16(defaultPitchesArray_(selectedOption['value']))
                setactiveMeasure(0)
                setactiveNote(0)
                setPointer(1)

                setmeasure1Meter(selectedOption['value'])
                setmeasure2Meter(selectedOption['value'])
                setmeasure3Meter(selectedOption['value'])
                setmeasure4Meter(selectedOption['value'])
                setmeasure5Meter(selectedOption['value'])
                setmeasure6Meter(selectedOption['value'])
                setmeasure7Meter(selectedOption['value'])
                setmeasure8Meter(selectedOption['value'])
                setmeasure9Meter(selectedOption['value'])
                setmeasure10Meter(selectedOption['value'])
                setmeasure11Meter(selectedOption['value'])
                setmeasure12Meter(selectedOption['value'])
                setmeasure13Meter(selectedOption['value'])
                setmeasure14Meter(selectedOption['value'])
                setmeasure15Meter(selectedOption['value'])
                setmeasure16Meter(selectedOption['value'])
                
    
   

        },[selectedOption])
        

        const switchLeft = ( measureNumber) =>{
            if (meterIndex1 == 0){
                setMeterIndex1(meterArray.length-1)
                setMetersrc1(meterArray[meterIndex1])
                
                setMeasure1(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
                setMeasure2(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
                setMeasure3(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
                setMeasure4(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
                setMeasure5(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
                setMeasure6(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
                setMeasure7(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
                setMeasure8(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
               
                
                setactiveMeasure(0)
                setactiveNote(0)
                setPointer(1)
                setmeasure1Meter(meterArray[meterIndex1].numberofPlaces)
                setmeasure2Meter(meterArray[meterIndex1].numberofPlaces)
                setmeasure3Meter(meterArray[meterIndex1].numberofPlaces)
                setmeasure4Meter(meterArray[meterIndex1].numberofPlaces)
                setmeasure5Meter(meterArray[meterIndex1].numberofPlaces)
                setmeasure6Meter(meterArray[meterIndex1].numberofPlaces)
                setmeasure7Meter(meterArray[meterIndex1].numberofPlaces)
                setmeasure8Meter(meterArray[meterIndex1].numberofPlaces)
                return
            }

            
            setMeterIndex1((meterIndex1-1)%3)
            setMetersrc1(meterArray[meterIndex1])
            
            setMeasure1(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
            setMeasure2(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
            setMeasure3(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
            setMeasure4(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
            setMeasure5(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
            setMeasure6(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
            setMeasure7(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
            setMeasure8(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
           
            setactiveMeasure(measureNumber)
            setactiveNote(0)
            setPointer(1)
            setmeasure1Meter(meterArray[meterIndex1].numberofPlaces)
            setmeasure2Meter(meterArray[meterIndex1].numberofPlaces)
            setmeasure3Meter(meterArray[meterIndex1].numberofPlaces)
            setmeasure4Meter(meterArray[meterIndex1].numberofPlaces)
            setmeasure5Meter(meterArray[meterIndex1].numberofPlaces)
            setmeasure6Meter(meterArray[meterIndex1].numberofPlaces)
            setmeasure7Meter(meterArray[meterIndex1].numberofPlaces)
            setmeasure8Meter(meterArray[meterIndex1].numberofPlaces)

        }

        const switchRight = (measureNumber) =>{
            setMeterIndex1((meterIndex1+1)%3)
           
            setMetersrc1(meterArray[meterIndex1])
            setMeasure1(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
            setMeasure2(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
            setMeasure3(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
            setMeasure4(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
            setMeasure5(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
            setMeasure6(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
            setMeasure7(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
            setMeasure8(defaultPitchesArray_(meterArray[meterIndex1].numberofPlaces))
            
            setactiveMeasure(measureNumber)
            setactiveNote(0)
            setPointer(1)
            setmeasure1Meter(meterArray[meterIndex1].numberofPlaces)
            setmeasure2Meter(meterArray[meterIndex1].numberofPlaces)
            setmeasure3Meter(meterArray[meterIndex1].numberofPlaces)
            setmeasure4Meter(meterArray[meterIndex1].numberofPlaces)
            setmeasure5Meter(meterArray[meterIndex1].numberofPlaces)
            setmeasure6Meter(meterArray[meterIndex1].numberofPlaces)
            setmeasure7Meter(meterArray[meterIndex1].numberofPlaces)
            setmeasure8Meter(meterArray[meterIndex1].numberofPlaces)
                
        }

        const changeStateOfReplace = () => {
            setreplaceActivated(!replaceActivated)
            console.log(replaceActivated)

        }

        const changeDuration = (duration) => {

                 setPanelDuration(duration)
            
        }

        const changeAccent = (accent) => {

            if(accent === "none")setAccent(0)
            if(accent === "sharp")setAccent(1)
            if(accent === "minor")setAccent(2)
            

        }
        const goToResult = () => {

            nav("/TestScoreBox")
            
       
   }
   const changeVolume1 = (func,vol) => {
    const el = document.getElementsByClassName(vol)
    
    func(parseInt(el[0].children[3].attributes['aria-valuenow'].nodeValue))
    

}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

const playSuggestion = () => {
    playsuggestion(playSuggestionStateVar)
}

const getSuggestions = () => {
    setOption()
    //setinspirations([])
    setInspirationFlag(true)
    const composition= [measure1,measure2,measure3,measure4,measure5,
        measure6,measure7,measure8,measure9,measure10,measure11,measure12,measure13,
        measure14,measure15,measure16]
    const finalComposition = prepareComposition(composition)
    console.log(finalComposition)
    let payload = {
        data: finalComposition,
        meter: meterIndex1,
        temperature:temperatureValue,
        jwtToken: jwtToken
        
    }
    axios.post("https://fantasifreely.de/runRNNStatic", JSON.stringify(payload), {
        headers: {
            "Content-Type": "application/json"
            
        }
    }).then((response) => {
        
        console.log(response)
        
        
        
        
        
        //setinspirations(response.data.suggestions[randomIndex])

        processInspirations(response.data.suggestions)
        setOption(value)
        
        
        
        setInspirationFlag(false)
        

    }).catch((error) => {
        setInspirationFlag(false)
      console.log(error)
    });
}

const calculateSortedIndices = (list) => {
    const tmpList = [...list]
    let result = []
    for (let index = 0; index < tmpList.length; index++) {
        const element = tmpList[index];
        result.push({ind:index,elem:element})
        
    }
    result.sort((a,b) => {
        return a.elem - b.elem
    }).reverse()

    return result

    

}



const setWholeMeasure = (inspirations) => {
    let result = []
    
    for (let index = 0; index < inspirations.length; index++) {
        const element = inspirations[index][0].length;
        result.push(element)

        
    }
    const Indices = calculateSortedIndices(result)
    const indicesLen = Math.floor(Indices.length / 2)
    const best = Indices.slice(0, indicesLen)
    const randomIndex = getRandomInt(best.length)
    
    setShowWholeMeasure(inspirations[best[randomIndex].ind])
    const randPlay = getRandomInt(best.length)
    setPlaySuggestionStateVar(inspirations[best[randPlay].ind])
    const randPitches = getRandomInt(best.length)
    setShowPitches(inspirations[best[randPitches].ind][1])
    setShowPitchesAccents(inspirations[best[randPitches].ind][2])
    const randDurations = getRandomInt(best.length)
    setShowDurations(inspirations[best[randDurations].ind][0])
    const randColorInspirations = getRandomInt(best.length)
    setColorInspirations(inspirations[best[randColorInspirations].ind])
    const randNarmourInspirations = getRandomInt(best.length)
    const narmour = getNarmourEncodings(calculatePitches(inspirations[best[randNarmourInspirations].ind]))
    console.log(showPitches)
    setShowEugeneStructures(narmour)
    

}

useEffect(() => {

    if (showEugeneStructures.length == 0) {
        setNarmourFlag(true)
    }
    else{
        setNarmourFlag(false)
    }
          



}, [showEugeneStructures])

const setColorInspirations = (inspirations) => {

    
        const colors = calculateColorbrightness(inspirations)
        if (colors == undefined) {
            return
        }
        const brightnessess = []
        const minColor = Math.min(...colors.filter(note => note!="R"))
        const maxColor = Math.max(...colors.filter(note => note!="R"))
        let difference = 0
        for (let index = 0; index < colors.length; index++) {
            const element = colors[index];
            if (element == "R") {
                brightnessess.push("R")
                continue
            }
            difference = element - minColor
            if (difference == 0) {
                brightnessess.push("50%")
                
            }
            else{
                const brightness = 50 + (difference * 5)
                brightnessess.push(brightness.toString()+"%")
            }
            
        }

        setShowColors(brightnessess)

}


const setNarmourInspirations = (inspirations) => {
    
}


const processInspirations = (inspirations) => {

    setWholeMeasure(inspirations)


}




/*const testScoring = () => {

    const composition= [measure1,measure2,measure3,measure4,measure5,
        measure6,measure7,measure8]
    const momentaryComposition = prepareComposition(composition)
    console.log(momentaryComposition)

    let payload = {
        data: momentaryComposition,
        jwtToken: jwtToken
        
    }
    axios.post("https://fantasifreely.de/calculateCreativityBasic", JSON.stringify(payload), {
        headers: {
            "Content-Type": "application/json"
            
        }
    }).then((response) => {
        console.log(response)

        setFluencyScore(response.data['fluency'])
        setFlexabilityScore(response.data['flexability'])
        setOriginalityScore(response.data['originality'])

    }).catch((error) => {
      console.log(error)
    });

}*/


        

    

    return(
        <div style={{display:"flex", float:"left",marginLeft:"100px",marginTop:"30px", border:"2px solid white", backgroundColor:"#E2C59C"}}>

            <div className='topColumnLeft' onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}}>
        <div className='div-toptop' >
        <div className='chooseMeter-container'>
        <Select
        
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={meterSelect}
      />
        <Button style={{"marginLeft":"55px","fontWeight": "bold","borderRadius":"5px","color":"white","height":"50px","backgroundColor":"#403c3b","border":"#403c3b 2px solid"}} variant="contained" endIcon={<MusicNoteIcon />}  size="large"  disabled={inspirationFlag} onClick={playwholeComposition}> Play the Melody </Button>

                </div>
        <div className='div-top'   style={{border:"solid 4px silver",borderRadius:"20px",backgroundColor:"#debd90",overflowY:'scroll'}}>

           

            <div    className="row" >
           
                
                <div className='rowA' >
                <div className='sliderWidth'>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <VolumeDownIcon
    fontSize="inherit"
    style={{ fontSize: "20px" }}
  />
        <Slider 
                    className='volume1'
                    onChange={() => changeVolume1(setvolumeMeasure1,'volume1') }
                    valueLabelDisplay="auto"
                    getAriaValueText={`${volumeMeasure1}`}
                    min={-24}
                    max={8}
                    step={4}
                    color="secondary"
                    aria-label="Temperature"
                    

                    
                     />
                     
                     
                      <VolumeUpIcon
    fontSize="inherit"
    style={{ fontSize: "20px" }}
  />
 
  </Stack>
  </div>
           
            <div    className="flex-container"  >
                <div className="flex-container">
                     
                {measure1.slice(0,17).map( (note ,idx) => {
                    return <Pitches measure={0}  url={note} activated={activeNote}  index={idx} item={note}  board={measure1} />
                })} </div>

               
                    
            </div>
            

</div>
            
            
            

        <div className='rowA'>

        <div className='sliderWidth'>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <VolumeDownIcon
    fontSize="inherit"
    style={{ fontSize: "20px" }}
  />
        <Slider 
                    className='volume2'
                    onChange={() => changeVolume1(setvolumeMeasure2,'volume2') }
                    valueLabelDisplay="auto"
                    getAriaValueText={`${volumeMeasure2}`}
                    min={-12}
                    max={8}
                    step={4}
                    color="secondary"
                    aria-label="Temperature"
                    

                    
                     />
                     
                     
                      <VolumeUpIcon
    fontSize="inherit"
    style={{ fontSize: "20px" }}
  />
 
  </Stack>
  </div>
                    
            
            <div    className="flex-container"  >
                
                <div className="flex-container">
                     
                {measure2.slice(0,17).map( (note ,idx) => {
                    return <Pitches measure={1}  url={note} activated={activeNote}  index={idx} item={note} board={measure2}  />
                })} </div>

                
                    
            </div>
            
            </div>
            </div>

            <div    className="row" >
            <div className='rowA' id='measure3'>

                            <div className='sliderWidth'>
                            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <VolumeDownIcon
                    fontSize="inherit"
                    style={{ fontSize: "20px" }}
                />
                        <Slider 
                                    className='volume3'
                                    onChange={() => changeVolume1(setvolumeMeasure3,'volume3') }
                                    valueLabelDisplay="auto"
                                    getAriaValueText={`${volumeMeasure3}`}
                                    min={-20}
                                    max={8}
                                    step={4}
                                    color="secondary"
                                    aria-label="Temperature"
                                    

                                    
                                    />
                                    
                                    
                                    <VolumeUpIcon
                    fontSize="inherit"
                    style={{ fontSize: "20px" }}
                />
                
                </Stack>
                </div>
                            
            <div   className="flex-container"  >
                
                 <div className="flex-container">
                     
                {measure3.slice(0,17).map( (note ,idx) => {
                    return <Pitches measure={2}  url={note} activated={activeNote}  index={idx} item={note} board={measure3} />
                })} </div>

                
                    
            </div>
            
        </div>        

        <div className='rowA' id='measure3'>

                    <div className='sliderWidth'>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                        <VolumeDownIcon
                fontSize="inherit"
                style={{ fontSize: "20px" }}
            />
                    <Slider 
                                className='volume4'
                                onChange={() => changeVolume1(setvolumeMeasure4,'volume4') }
                                valueLabelDisplay="auto"
                                getAriaValueText={`${volumeMeasure4}`}
                                min={-12}
                                max={8}
                                step={4}
                                color="secondary"
                                aria-label="Temperature"
                                

                                
                                />
                                
                                
                                <VolumeUpIcon
                fontSize="inherit"
                style={{ fontSize: "20px" }}
            />
            
            </Stack>
            </div>
            
            <div   className="flex-container"  >
                
                <div className="flex-container">
                     
                {measure4.slice(0,17).map( (note ,idx) => {
                    return <Pitches measure={3}  url={note} activated={activeNote}  index={idx} item={note} board={measure4} />
                })} </div>

                
                    
            </div>
            
        </div>        
  
            </div>

            <div    className="row" >
            <div className='rowA' id='measure3'>

                        <div className='sliderWidth'>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                        <VolumeDownIcon
                fontSize="inherit"
                style={{ fontSize: "20px" }}
            />
                    <Slider 
                                className='volume5'
                                onChange={() => changeVolume1(setvolumeMeasure5,'volume5') }
                                valueLabelDisplay="auto"
                                getAriaValueText={`${volumeMeasure5}`}
                                min={-12}
                                max={8}
                                step={4}
                                color="secondary"
                                aria-label="Temperature"
                                

                                
                                />
                                
                                
                                <VolumeUpIcon
                fontSize="inherit"
                style={{ fontSize: "20px" }}
            />
            
            </Stack>
            </div>
            
            <div className="flex-container"  >
                
                <div className="flex-container">
                     
                {measure5.slice(0,17).map( (note ,idx) => {
                    return <Pitches measure={4}  url={note} activated={activeNote}  index={idx} item={note} board={measure5} />
                })} </div>

               
                    
            </div>
            
        </div>        

        <div className='rowA' id='measure3'>

                    <div className='sliderWidth'>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                        <VolumeDownIcon
                fontSize="inherit"
                style={{ fontSize: "20px" }}
            />
                    <Slider 
                                className='volume6'
                                onChange={() => changeVolume1(setvolumeMeasure6,'volume6') }
                                valueLabelDisplay="auto"
                                getAriaValueText={`${volumeMeasure6}`}
                                min={-12}
                                max={8}
                                step={4}
                                color="secondary"
                                aria-label="Temperature"
                                

                                
                                />
                                
                                
                                <VolumeUpIcon
                fontSize="inherit"
                style={{ fontSize: "20px" }}
            />
            
            </Stack>
            </div>
            <div    className="flex-container"  >
                
                
                    <div className="flex-container">
                     
                {measure6.slice(0,17).map( (note ,idx) => {
                    return <Pitches measure={5}  url={note} activated={activeNote}  index={idx} item={note} board={measure6} />
                })} </div>

                    
            </div>
            
        </div>
        
                
  
            </div>
            
            
            <div    className="row" >
            <div className='rowA' id='measure3'>

                            <div className='sliderWidth'>
                            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <VolumeDownIcon
                    fontSize="inherit"
                    style={{ fontSize: "20px" }}
                />
                        <Slider 
                                    className='volume7'
                                    onChange={() => changeVolume1(setvolumeMeasure7,'volume7') }
                                    valueLabelDisplay="auto"
                                    getAriaValueText={`${volumeMeasure7}`}
                                    min={-12}
                                    max={8}
                                    step={4}
                                    color="secondary"
                                    aria-label="Temperature"
                                    

                                    
                                    />
                                    
                                    
                                    <VolumeUpIcon
                    fontSize="inherit"
                    style={{ fontSize: "20px" }}
                />
                
                </Stack>
                </div>
            
            <div className="flex-container"  >
                
                
                    <div className="flex-container">
                     
                {measure7.slice(0,17).map( (note ,idx) => {
                    return <Pitches measure={6}  url={note} activated={activeNote}  index={idx} item={note} board={measure7} />
                })} </div>

               
                    
            </div>
            
        </div>        

        <div className='rowA' id='measure3'>

                    <div className='sliderWidth'>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                        <VolumeDownIcon
                fontSize="inherit"
                style={{ fontSize: "20px" }}
            />
                    <Slider 
                                className='volume8'
                                onChange={() => changeVolume1(setvolumeMeasure8,'volume8') }
                                valueLabelDisplay="auto"
                                getAriaValueText={`${volumeMeasure8}`}
                                min={-12}
                                max={8}
                                step={4}
                                color="secondary"
                                aria-label="Temperature"
                                

                                
                                />
                                
                                
                                <VolumeUpIcon
                fontSize="inherit"
                style={{ fontSize: "20px" }}
            />
            
            </Stack>
            </div>
            
            <div    className="flex-container"  >
                
               
                    <div className="flex-container">
                     
                {measure8.slice(0,17).map( (note ,idx) => {
                    return <Pitches measure={7}  url={note} activated={activeNote}  index={idx} item={note} board={measure8} />
                })} </div>

                
                    
            </div>
            
        </div>
        </div>
        <div className='row' >
        
        <div className='rowA' >
                <div className='sliderWidth'>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <VolumeDownIcon
    fontSize="inherit"
    style={{ fontSize: "20px" }}
  />
        <Slider 
                    className='volume9'
                    onChange={() => changeVolume1(setvolumeMeasure9,'volume9') }
                    valueLabelDisplay="auto"
                    getAriaValueText={`${volumeMeasure9}`}
                    min={-24}
                    max={8}
                    step={4}
                    color="secondary"
                    aria-label="Temperature"
                    

                    
                     />
                     
                     
                      <VolumeUpIcon
    fontSize="inherit"
    style={{ fontSize: "20px" }}
  />
 
  </Stack>
  </div>
           
            <div    className="flex-container"  >
                <div className="flex-container">
                     
                {measure9.slice(0,17).map( (note ,idx) => {
                    return <Pitches measure={8}  url={note} activated={activeNote}  index={idx} item={note}  board={measure9} />
                })} </div>

               
                    
            </div>
            

</div>
            
            
            

        <div className='rowA'>

        <div className='sliderWidth'>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <VolumeDownIcon
    fontSize="inherit"
    style={{ fontSize: "20px" }}
  />
        <Slider 
                    className='volume10'
                    onChange={() => changeVolume1(setvolumeMeasure10,'volume10') }
                    valueLabelDisplay="auto"
                    getAriaValueText={`${volumeMeasure10}`}
                    min={-12}
                    max={8}
                    step={4}
                    color="secondary"
                    aria-label="Temperature"
                    

                    
                     />
                     
                     
                      <VolumeUpIcon
    fontSize="inherit"
    style={{ fontSize: "20px" }}
  />
 
  </Stack>
  </div>
                    
            
            <div    className="flex-container"  >
                
                <div className="flex-container">
                     
                {measure10.slice(0,17).map( (note ,idx) => {
                    return <Pitches measure={9}  url={note} activated={activeNote}  index={idx} item={note} board={measure10}  />
                })} </div>

                
                    
            </div>
            
            </div>
            </div>

            <div    className="row" >
            <div className='rowA' id='measure3'>

                            <div className='sliderWidth'>
                            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <VolumeDownIcon
                    fontSize="inherit"
                    style={{ fontSize: "20px" }}
                />
                        <Slider 
                                    className='volume11'
                                    onChange={() => changeVolume1(setvolumeMeasure11,'volume11') }
                                    valueLabelDisplay="auto"
                                    getAriaValueText={`${volumeMeasure11}`}
                                    min={-20}
                                    max={8}
                                    step={4}
                                    color="secondary"
                                    aria-label="Temperature"
                                    

                                    
                                    />
                                    
                                    
                                    <VolumeUpIcon
                    fontSize="inherit"
                    style={{ fontSize: "20px" }}
                />
                
                </Stack>
                </div>
                            
            <div   className="flex-container"  >
                
                 <div className="flex-container">
                     
                {measure11.slice(0,17).map( (note ,idx) => {
                    return <Pitches measure={10}  url={note} activated={activeNote}  index={idx} item={note} board={measure11} />
                })} </div>

                
                    
            </div>
            
        </div>        

        <div className='rowA' id='measure3'>

                    <div className='sliderWidth'>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                        <VolumeDownIcon
                fontSize="inherit"
                style={{ fontSize: "20px" }}
            />
                    <Slider 
                                className='volume12'
                                onChange={() => changeVolume1(setvolumeMeasure12,'volume12') }
                                valueLabelDisplay="auto"
                                getAriaValueText={`${volumeMeasure12}`}
                                min={-12}
                                max={8}
                                step={4}
                                color="secondary"
                                aria-label="Temperature"
                                

                                
                                />
                                
                                
                                <VolumeUpIcon
                fontSize="inherit"
                style={{ fontSize: "20px" }}
            />
            
            </Stack>
            </div>
            
            <div   className="flex-container"  >
                
                <div className="flex-container">
                     
                {measure12.slice(0,17).map( (note ,idx) => {
                    return <Pitches measure={11}  url={note} activated={activeNote}  index={idx} item={note} board={measure12} />
                })} </div>

                
                    
            </div>
            
        </div>        
  
            </div>

            <div    className="row" >
            <div className='rowA' id='measure3'>

                        <div className='sliderWidth'>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                        <VolumeDownIcon
                fontSize="inherit"
                style={{ fontSize: "20px" }}
            />
                    <Slider 
                                className='volume13'
                                onChange={() => changeVolume1(setvolumeMeasure13,'volume13') }
                                valueLabelDisplay="auto"
                                getAriaValueText={`${volumeMeasure13}`}
                                min={-12}
                                max={8}
                                step={4}
                                color="secondary"
                                aria-label="Temperature"
                                

                                
                                />
                                
                                
                                <VolumeUpIcon
                fontSize="inherit"
                style={{ fontSize: "20px" }}
            />
            
            </Stack>
            </div>
            
            <div className="flex-container"  >
                
                <div className="flex-container">
                     
                {measure13.slice(0,17).map( (note ,idx) => {
                    return <Pitches measure={12}  url={note} activated={activeNote}  index={idx} item={note} board={measure13} />
                })} </div>

               
                    
            </div>
            
        </div>        

        <div className='rowA' id='measure3'>

                    <div className='sliderWidth'>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                        <VolumeDownIcon
                fontSize="inherit"
                style={{ fontSize: "20px" }}
            />
                    <Slider 
                                className='volume14'
                                onChange={() => changeVolume1(setvolumeMeasure14,'volume14') }
                                valueLabelDisplay="auto"
                                getAriaValueText={`${volumeMeasure14}`}
                                min={-12}
                                max={8}
                                step={4}
                                color="secondary"
                                aria-label="Temperature"
                                

                                
                                />
                                
                                
                                <VolumeUpIcon
                fontSize="inherit"
                style={{ fontSize: "20px" }}
            />
            
            </Stack>
            </div>
            <div    className="flex-container"  >
                
                
                    <div className="flex-container">
                     
                {measure14.slice(0,17).map( (note ,idx) => {
                    return <Pitches measure={13}  url={note} activated={activeNote}  index={idx} item={note} board={measure14} />
                })} </div>

                    
            </div>
            
        </div>
        
                
  
            </div>
            
            
            <div    className="row" >
            <div className='rowA' id='measure3'>

                            <div className='sliderWidth'>
                            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <VolumeDownIcon
                    fontSize="inherit"
                    style={{ fontSize: "20px" }}
                />
                        <Slider 
                                    className='volume15'
                                    onChange={() => changeVolume1(setvolumeMeasure15,'volume15') }
                                    valueLabelDisplay="auto"
                                    getAriaValueText={`${volumeMeasure15}`}
                                    min={-12}
                                    max={8}
                                    step={4}
                                    color="secondary"
                                    aria-label="Temperature"
                                    

                                    
                                    />
                                    
                                    
                                    <VolumeUpIcon
                    fontSize="inherit"
                    style={{ fontSize: "20px" }}
                />
                
                </Stack>
                </div>
            
            <div className="flex-container"  >
                
                
                    <div className="flex-container">
                     
                {measure15.slice(0,17).map( (note ,idx) => {
                    return <Pitches measure={14}  url={note} activated={activeNote}  index={idx} item={note} board={measure15} />
                })} </div>

               
                    
            </div>
            
        </div>        

        <div className='rowA' id='measure3'>

                    <div className='sliderWidth'>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                        <VolumeDownIcon
                fontSize="inherit"
                style={{ fontSize: "20px" }}
            />
                    <Slider 
                                className='volume16'
                                onChange={() => changeVolume1(setvolumeMeasure16,'volume16') }
                                valueLabelDisplay="auto"
                                getAriaValueText={`${volumeMeasure16}`}
                                min={-12}
                                max={8}
                                step={4}
                                color="secondary"
                                aria-label="Temperature"
                                

                                
                                />
                                
                                
                                <VolumeUpIcon
                fontSize="inherit"
                style={{ fontSize: "20px" }}
            />
            
            </Stack>
            </div>
            
            <div    className="flex-container"  >
                
               
                    <div className="flex-container">
                     
                {measure16.slice(0,17).map( (note ,idx) => {
                    return <Pitches measure={15}  url={note} activated={activeNote}  index={idx} item={note} board={measure16} />
                })} </div>

                
                    
            </div>
            
        </div>
        
                
  
            </div>
            </div>


            
            <div className='Pitches' >
                <div className='column1'>
                
               
                    {panelArray.slice(0,9).map( (note ,idx) => {
                         
                        return (
                        
                 <PitchesDraggable url={note}  index={idx} item={note} addPitch={addPitch} replacePitch={replaceItem} />
                 
                
                 
                 
                 )
                        
                    })}
                   
                    <div className='column1'>
                    {panelArray.slice(9,19).map( (note ,idx) => {
                        return <PitchesDraggable url={note}  index={idx} item={note} addPitch={addPitch} replacePitch={replaceItem} />
                    })}
                    </div>
                    
                    </div>
                    
    
            </div>
            <div style={{marginLeft:"380px",marginTop:"350px"}}>
                    <div style={{float:"left"}}>
                        
                    <SubmitComposition composition={[measure1,measure2,measure3,measure4,measure5,
                        measure6,measure7,measure8,measure9,measure10,measure11,measure12,measure13,
                        measure14,measure15,measure16]} meter={selectedOption['value']} />
                </div>
                
                
                </div>
            </div>

            
            
            
                
            </div>

            <div className='topColumnRight'>
                    
                    
            <div >

           

                    <div style={{marginTop:"360px",width:"130px",marginLeft:"10px",border:"solid 4px silver",borderRadius:"20px",backgroundColor:"#debd90"}} className='column3'>
                    <Button disabled= {inspirationFlag}  style={{"margin":"3px","font-weight": "bold","borderRadius":"5px","color":"white","height":"40px","width":"125px","backgroundColor":"#403c3b","border":"#403c3b 2px solid"}} onClick={() => {changeDuration("whole")}}> Whole Notes </Button>
                    <Button disabled= {inspirationFlag} style={{"margin":"3px","font-weight": "bold","borderRadius":"5px","color":"white","height":"40px","width":"125px","backgroundColor":"#403c3b","border":"#403c3b 2px solid"}} onClick={() => {changeDuration("half")}} > Half Notes </Button>
                    <Button disabled= {inspirationFlag} style={{"margin":"3px","font-weight": "bold","borderRadius":"5px","color":"white","height":"40px","width":"125px","backgroundColor":"#403c3b","border":"#403c3b 2px solid"}} onClick={() => {changeDuration("quarter")}}> Quarter Notes </Button>
                    <Button disabled= {inspirationFlag} style={{"margin":"3px","font-weight": "bold","borderRadius":"5px","color":"white","height":"40px","width":"125px","backgroundColor":"#403c3b","border":"#403c3b 2px solid"}} onClick={() => {changeDuration("eighth")}} > Eighth Notes </Button>
                    <Button disabled= {inspirationFlag} style={{"margin":"3px","font-weight": "bold","borderRadius":"5px","color":"white","height":"40px","width":"125px","backgroundColor":"#403c3b","border":"#403c3b 2px solid"}} onClick={() => {changeDuration("sixteenth")}}> Sixteenth Notes </Button>
                    <div className='columnBottom'>
                        <Button disabled= {inspirationFlag} style={{"margin":"3px","font-weight": "bold","borderRadius":"5px","color":"white","height":"40px","width":"125px","backgroundColor":"#403c3b","border":"#403c3b 2px solid"}} onClick={() => {changeAccent("sharp")}}> Sharp </Button>
                        <Button disabled= {inspirationFlag} style={{"margin":"3px","font-weight": "bold","borderRadius":"5px","color":"white","height":"40px","width":"125px","backgroundColor":"#403c3b","border":"#403c3b 2px solid"}} onClick={() => {changeAccent("none")}}> None </Button>
                        <Button disabled= {inspirationFlag} style={{"margin":"3px","font-weight": "bold","borderRadius":"5px","color":"white","height":"40px","width":"125px","backgroundColor":"#403c3b","border":"#403c3b 2px solid"}} onClick={deleteItem} variant="outlined" startIcon={<DeleteIcon />}> Delete </Button>
                    <Button disabled= {inspirationFlag} style={{"margin":"3px","font-weight": "bold","borderRadius":"5px","color":"white","height":"40px","width":"125px","backgroundColor":"#403c3b",border: replaceActivated? '3px solid white':'#403c3b' }} onClick={changeStateOfReplace} > Replace </Button>
                    
                    </div>
                    

                    </div>
                   
                    
                    </div>
                
    </div>
               
      
            </div>

    );


}

export default Compose;