import axios from 'axios'

class Whale {
  constructor(initPosY, initVelocity){
    this.initPosY = initPosY
    this.posY = initPosY
    this.initVelocity =0
    this.time = 0
    this.acceleration = -33
    this.responseTimes = [0]
    let counter = 0
    // this.intervalId = setInterval(() => {
    //   let responseStartTime = new Date()
    //   this.ping().then(() => {
    //     counter++
    //     console.log(counter);
    //     let responseFinishTime = new Date()
    //     let responseLength = parseFloat(responseFinishTime - responseStartTime)
    //     // if(counter > 10 && Math.random() > 0.5){responseLength += Math.random() * 2000}
    //     console.log("resposne length", responseLength);
    //     console.log("average", this.getAverageResponseTime());
    //     console.log(Math.abs(responseLength - this.getAverageResponseTime()));
    //     if(Math.abs(responseLength - this.getAverageResponseTime()) < 30){this.responseTimes.push(responseLength)}
    //
    //
    //     if(this.responseTimes.length > 5){this.responseTimes.shift()}
    //     console.log(this.responseTimes);
    //   })
    // }, 2000)
  }

  // ping(){
  //   return axios.get("http://localhost:4000/test")
  // }
  //
  // getAverageResponseTime(){
  //   let sum = this.responseTimes.reduce((sum, value) => {
  //     return sum + value
  //   }, 0)
  //   return sum / this.responseTimes.length
  // }

  setVelocity(){
    this.velocity = this.initVelocity + this.acceleration * this.time
  }

  setPosY(){
    this.posY = this.initPosY - (this.initVelocity * this.time + 1/2 * this.acceleration * Math.pow(this.time, 2))
  }

  incrementTime(time, maxPosY){
    this.time += time
    this.setVelocity()
    this.setPosY()
    console.log(this.posY);
    if(this.posY > maxPosY - 150) {
      this.posY = maxPosY - 150
      this.isBottom = true
    } else {
      this.posY = this.posY
    }
  }
}

export default Whale
