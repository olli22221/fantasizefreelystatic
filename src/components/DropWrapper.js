import React ,{useRef} from 'react';
import { useDrop } from 'react-dnd';
import {pitches} from './compose'

function DropWrapper  ({ ondrop})  {

    const [{isOver}, drop] = useDrop({
        accept: "Pitches",

        drop: (item,monitor) => {
            ondrop(item,monitor)
        },

        collect: monitor => ({
            isOver: monitor.isOver()
        })
        
    });

    return(

        <div ref={drop}>

            
        </div>
    );
};


export default DropWrapper;