import { makeAutoObservable } from 'mobx'

class Score {
    score = 0
    constructor () {
      makeAutoObservable(this)
    }

    increment () {
      this.score = this.score + 5
      console.log(this.score)
      return this.score
    }

    decrement () {
      this.score = this.score - 1
      console.log(this.score)
      return this.score
    }

    getScore(){
      return this.score
    }
}

export default new Score()
