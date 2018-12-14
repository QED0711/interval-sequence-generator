class Vector{
    constructor(icVector){
        for(let i = 0; i < icVector.length; i++){
            this[i + 1] = icVector[i] 
        }
        this.valid = true;
    }

    isNull(){
        for(let i = 1; i <= 6; i++){
            if(this[i]) return false;
        }
        return true;        
    }

    print(){
        console.log(`<${this[1]}, ${this[2]}, ${this[3]}, ${this[4]}, ${this[5]}, ${this[6]}>`)
    }

    toArray(){
        return [this[1], this[2], this[3], this[4], this[5], this[6]]
    }
}

export default Vector;