import React,{useEffect,useState} from "react";
import { useRecoilState} from 'recoil'

import { allowed as allowedAtom } from "../redux/store";
import Popup from 'reactjs-popup';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function SurveyToken() {

    let nav = useNavigate();
    const [open, setOpen] = useState(true);  
    const closeModal = () => setOpen(false);

    const [allowed, setAllowed] = useRecoilState(allowedAtom);

    useEffect(() => {

        if (!allowed) {
         nav("/")
        }


        if (!open) {
            setAllowed(false)
        }
        console.log(open)
 
     },[allowed,open])

    return(

        <div>
            
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>   
                 <div className="modal">      <p>
  
 Enter the following  Completion Code on Prolific:       C14RW7J7</p>      <a className="close" onClick={closeModal}>  
                      &times;          </a>          
                        </div>  
            </Popup>
             </div>
    )

}


export default SurveyToken;
