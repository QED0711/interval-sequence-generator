import Vector from './vector'


class Chord {
    constructor(set, sequence, transpositions = [0]){
        this.set = set;
        this.sequence = sequence;
        this.designation = `(${set})-0-<${sequence}>`;
        this.pcs = this.getPCS();   
        this.transpositions = transpositions;     
    }

    static fromChordObject(chordObj){
        return new Chord(chordObj.set, chordObj.sequence, chordObj.transpositions);
    }

    getPCS(){
        let chord = {0: true, size: 1}
        let prevPC = 0
        for(let i = 0; i < this.sequence.length; i++){
            let nextPC = prevPC + this.set[this.sequence[i]];
            if(nextPC >= 12) nextPC = nextPC - 12;
            if(!chord[nextPC]){
                chord[nextPC] = true;
                chord.size += 1;
            } else {
                return false;
            }
            prevPC = nextPC
        }
        return chord;
    }    

    addToSequence(num){
        // updates the chord info when a new interval is added to the sequence. 
        this.sequence.push(num);
        this.designation = `(${this.set})-0-<${this.sequence}>`;
        this.pcs = this.getPCS();        
    }

    getOrderedPCS(){
        let info = this.designation.split("-");
        let set = info[0].match(/\d+/g).map(x => parseInt(x));
        let startingPitch = parseInt(info[1]);
        let sequence = info[2].match(/\d+/g).map(x => parseInt(x));
        let chord = [startingPitch];
        for(let i = 0; i < sequence.length; i++){
            let nextPC = chord[chord.length - 1] + set[sequence[i]];
            if(nextPC >= 12) {nextPC = nextPC - 12}
            chord.push(nextPC) 
        }
        return chord
    }

    getExpandedPCS(){
        let orderedPCS = this.getOrderedPCS();
        for(let i = 1; i < orderedPCS.length; i++){
            while(orderedPCS[i] < orderedPCS[i - 1]){
                orderedPCS[i] += 12;
            }
        }
        return orderedPCS;
    }

    expand(pcs){
        let expanded = [pcs[0], pcs[1]];
        for(let i = 2; i < pcs.length; i++){
            expanded[i] = pcs[i]
            while(expanded[i] < expanded[i - 1]){
                expanded[i] += 12;
            }
        }
        return expanded;        
    }

    getVector(){
        let pcs = this.getOrderedPCS();
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


    transpose(num = 0){
        let designation = this.designation.split("-");
        designation[1] = num.toString();
        this.designation = designation.join("-");
        return this;
    }

    applyFilter(filter){
        return filter.run(this);
    }

}

export default Chord;   