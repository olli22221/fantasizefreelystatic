import React ,{useEffect, useRef, useState} from 'react';
import { imagesDictionary } from './util';





const ShowImages = ({images}) => {



    return(
        <div >
        
        {images.map( (note,idx) => {
              
            return(
     <img 
         className='InspirationIMG'
         height="75px" 
         width="75px" 
         src= {imagesDictionary[note]} 
        
         
         
     />
            )    } )
        }

</div>              
    
 )
}

export default ShowImages;