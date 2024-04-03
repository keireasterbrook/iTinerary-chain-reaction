function hourAdder(time) {
    const stringTime = time.toLocaleTimeString('en-GB')
    const slicedNum = stringTime.slice(0, 2)
    const number = Number(slicedNum)
    if(number === 9){
      number = 10
    } else {
      number + 1
    }
    const returnTimeString = time.toISOString()
    const newTime =  number + stringTime.slice(2)
    return returnTimeString.slice(0, 11) + newTime + returnTimeString.slice(-5)
  }

  export {hourAdder} 