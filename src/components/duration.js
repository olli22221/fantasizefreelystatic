
import React, { useRef, useEffect} from 'react'

const Duration =({ type }) => {

    useEffect(() => {

        console.log(type)

    },[type])

    return (
      <div>
        {(() => {
          switch (type) {
            case '8d':
              return  <img height="100px" width="100px" src={require("../media/8d.jpg")}/> ;
            case '16d':
              return  <img height="100px" width="100px" src={require("../media/16.png")}/> ;
            case 'w':
              return  <img height="100px" width="100px" src={require("../media/w.png")}/> ;
            case 'h':
              return <img height="100px" width="100px" src={require("../media/h.png")} /> ;
            case 'q':
              return <img height="100px" width="100px" src={require("../media/q.png")} /> ;
            case 'qr':
              return <img height="100px" width="100px" src={require("../media/qr.png")} /> ;
            default:
              return null;
          }
        })()}
      </div>
    );
  }

  export default Duration;
