import React ,{useRef,useEffect,useState} from 'react';
import {useDrag,useDrop} from 'react-dnd'
import Icon from "react-crud-icons";
import { activeMeasure as activeMeasureAtom,board as boardAtom, activeNote as activeNoteAtom } from '../redux/store';
import { useRecoilValue,useRecoilState } from 'recoil';

import "../../node_modules/react-crud-icons/dist/css/react-crud-icons.css";
function Pitches({measure,item ,url,index, deleteItem, moveItem, addItem,board,func,activated}) {
    
    const [activeNote, setactiveNote] = useRecoilState(activeNoteAtom);
    const [activeMeasure, setactiveMeasure] = useRecoilState(activeMeasureAtom);
    
    const [isActive, setIsActive] = useState(false);

    const ref = useRef(null)
    



                


               

    useEffect(() => {
        
        if(item.occupied && measure==activeMeasure){
            

                setIsActive(activated == index)
                
            }
        else{
            setIsActive(false)
        }
        


        
        
        
    }, [activated,activeNote,activeMeasure])

    const changeColor = () => {
        if (item.show) {
            setactiveMeasure(measure)
            setactiveNote(index)
        }
        



        }
        



    return(
                
        <div  className="flex-pitch" style={{}}>
           <div    className="column" >
           
           
        <img 
            
            height="128px" 
            width="27px"
            src={url.src} 
            style={{border: isActive? '2px solid red' : '',cursor:"pointer"}} 
            onClick={changeColor}
            
        /> </div>
        

           </div>
        

     
    )
};

export default Pitches;