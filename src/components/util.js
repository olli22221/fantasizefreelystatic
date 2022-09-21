export const calculateSteps = (duration) => {

    switch (duration) {
        case "8d":
            return 2
        case "16":
            return 1
        case "q":
            return 4
        case "h":
            return 8
        case "w":
            return 16
        case "n":
            return 1                    
            
    
        default:
            break;
    }
}



export const prepareComposition = (composition_) => {
    let result = []
    
    for (let index = 0; index < composition_.length; index++) {
  
      const measure = composition_[index].filter(element => element.locked == false && element.occupied==true)
      
      let tmpMeasure = []
      for (let idx = 0; idx < measure.length; idx++) {
        let tmpNote = {
          type: measure[idx].type,
          duration: measure[idx].duration,
          accented: measure[idx].accented
        }
        tmpMeasure.push(tmpNote)
  
      }
      if (tmpMeasure.length > 0) {
        result.push(tmpMeasure)
      }
      
    }
    
    return result
  
  
  }


  export const imagesDictionary = {
    "w": require('../media/durations/w.png'),
    "wr": require('../media/durations/w.png'),
    "h": require('../media/durations/h.png'),
    "hr": require('../media/durations/h.png'),
    "q": require('../media/durations/q.png'),
    "qr": require('../media/durations/q.png'),
    "8d": require('../media/durations/8d.jpg'),
    "8r": require('../media/durations/8d.jpg'),
    "16": require('../media/durations/16.png'),
    "16r": require('../media/durations/16.png')

  }