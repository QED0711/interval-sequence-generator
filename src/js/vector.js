class Vector{
    constructor(icVector){
        for(let i = 0; i < icVector.length; i++){
            this[i + 1] = icVector[i] 
        }
        this.valid = true;
    }

    static fromPCSet(pcs){
        let vector = [0,0,0,0,0,0];
        for(let i = 0; i < pcs.length - 1; i++){
            for(let j = i + 1; j < pcs.length; j++){
                let interval = Math.abs(pcs[i] - pcs[j]);
                let ic = interval > 6 ? 12 - interval : interval;
                vector[ic - 1]++
            }
        }
        return new Vector(vector)
    }

    isNull(){
        for(let i = 1; i <= 6; i++){
            if(this[i]) return false;
        }
        return true;        
    }

    print(brackets = "<>"){
        console.log(`${brackets[0]}${this[1]}, ${this[2]}, ${this[3]}, ${this[4]}, ${this[5]}, ${this[6]}${brackets[1]}`)
    }

    toArray(){
        return [this[1], this[2], this[3], this[4], this[5], this[6]]
    }
}

// export default Vector;

let v = Vector.fromPCSet([0, 4]);
v.print()
