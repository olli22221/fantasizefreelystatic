import React, {  useEffect,useState} from 'react'
import { useRecoilValue } from 'recoil';
import { measure1 as measure1Atom,measure2 as measure2Atom,
    measure3 as measure3Atom,measure4 as measure4Atom,measure5 as measure5Atom,measure6 as measure6Atom,
    measure7 as measure7Atom,measure8 as measure8Atom, musicatResponse as musicatResponseAtom} from '../redux/store'
import ScoreBox from './ScoreBox';
import Popup from 'reactjs-popup';




const MusicatGroups = () => {

    const measure1 = useRecoilValue(measure1Atom);
    const measure2 = useRecoilValue(measure2Atom);
    const measure3 = useRecoilValue(measure3Atom);
    const measure4 = useRecoilValue(measure4Atom);
    const measure5 = useRecoilValue(measure5Atom);
    const measure6 = useRecoilValue(measure6Atom);
    const measure7 = useRecoilValue(measure7Atom);
    const measure8 = useRecoilValue(measure8Atom);
    const musicatResult = useRecoilValue(musicatResponseAtom);
    const [musicatGroup1,setmusicatGroup1] = useState([])
    const [musicatGroup2,setmusicatGroup2] = useState([])
    const [musicatGroup3,setmusicatGroup3] = useState([])
    const [musicatGroup4,setmusicatGroup4] = useState([])
    const [musicatGroup5,setmusicatGroup5] = useState([])
    const [currentGroup,setcurrentGroup] = useState(0)


    const measureDictionary = {
        "0":measure1,
        "1":measure2,
        "2":measure3,
        "3":measure4,
        "4":measure5,
        "5":measure6,
        "6":measure7,
        "7":measure8,
    }

    const changeGroup = (direction) => {
        const grouplen = musicatResult['groups'].length

        if (direction =="left") {

            if(currentGroup == 0){
                const currentGroupvar = grouplen - 1
                console.log(grouplen)
                console.log(currentGroupvar)
                setcurrentGroup(currentGroupvar)
            }
            else{
            
            const currentGroupvar = currentGroup - 1 
            console.log(grouplen)
            console.log(currentGroupvar)
            setcurrentGroup(currentGroupvar)
            }
            
        }
        else{
            console.log(grouplen)
            if (currentGroup == grouplen-1) {
                console.log("test")
                setcurrentGroup(0)
            }
            else {
                const currentGroupvar = currentGroup + 1
                console.log(currentGroupvar)
                setcurrentGroup(currentGroupvar)
            }
        }
        
    }
      
    
 
    

    useEffect(() => { 
             console.log(musicatResult)
             const groups = musicatResult['groups']
             let groupCount = 0
             
             for (let index = 0; index < groups.length; index++) {
                const element = groups[index];
                const element_ = element.split("+")
                const firstMeasure = element_[0]
                const secondMeasure = element_[1]
                const measureGroup = [measureDictionary[firstMeasure],measureDictionary[secondMeasure]]
                console.log(secondMeasure)
                switch (groupCount) {
                    case 0:
                        setmusicatGroup1(measureGroup)
                        break;
                    case 1:
                        setmusicatGroup2(measureGroup)
                        break;
                    case 2:
                        setmusicatGroup3(measureGroup)
                        break;
                    case 3:
                        setmusicatGroup4(measureGroup)
                        break;
                    case 4:
                        setmusicatGroup5(measureGroup)
                        break;
                    default:
                        break;
                }
                groupCount++

                
             }
        
    },[musicatResult])

    


    return (
        <div >
            <div >
            <div className='groupsButton'>
                <button onClick={ () => {changeGroup("right")}}>right</button>
                <button onClick={ () => {changeGroup("left")}}>left</button>
            </div>
            </div>
            <div>
            {musicatGroup1.length > 0 && currentGroup == 0 &&
            <div >
                <div  className="flex-container" >
                <ScoreBox notes={musicatGroup1[0].slice(1,17)} timeSign="4/4" violin={false}/>
                </div>
                <div  className="flex-container" >
                <ScoreBox notes={musicatGroup1[1].slice(1,17)} timeSign="4/4" violin={false}/>
                </div>
                </div>
            }
            </div>
            <div>
            {musicatGroup2.length > 0 && currentGroup == 1 &&
            <div >
                <div  className="flex-container" >
                <ScoreBox notes={musicatGroup2[0].slice(1,17)} timeSign="4/4" violin={false}/>
                </div>
                <div  className="flex-container" >
                <ScoreBox notes={musicatGroup2[1].slice(1,17)} timeSign="4/4" violin={false}/>
                </div>
                </div>
            }
            </div>
            <div>
            {musicatGroup3.length > 0 && currentGroup == 2 &&
            <div >
                <div  className="flex-container" >
                <ScoreBox notes={musicatGroup3[0].slice(1,17)} timeSign="4/4" violin={false}/>
                </div>
                <div  className="flex-container" >
                <ScoreBox notes={musicatGroup3[1].slice(1,17)} timeSign="4/4" violin={false}/>
                </div>
                </div>
            }
            </div>

            <div>
            {musicatGroup4.length > 0 && currentGroup == 3 &&
            <div >
                <div  className="flex-container" >
                <ScoreBox notes={musicatGroup4[0].slice(1,17)} timeSign="4/4" violin={false}/>
                </div>
                <div  className="flex-container" >
                <ScoreBox notes={musicatGroup4[1].slice(1,17)} timeSign="4/4" violin={false}/>
                </div>
                </div>
            }
            </div>

             Nur als Resultat am Ende nach dem Submit anzeigen (rechte Seite)
          </div>
      );

}


export default MusicatGroups;
