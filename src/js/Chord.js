import Vector from './vector'
import { pitchChain, applySet, expandPCS, transposeCompressed} from './chordHelperFunctions';



class Chord {
    constructor(intervalArr, set){
        let pcs = pitchChain(intervalArr, set);
        
        this.set = set,
        this.codedSequence = intervalArr,
        this.intervalSequence = applySet(intervalArr, set),
        this.size = intervalArr.length + 1,
        this.pcs = pcs,
        this.transpositions = this.findTranspositions();
        this.expandedPCS = expandPCS(pcs),
        this.vector = Vector.fromPCSet(pcs)  
        this.designation = `(${this.set})-<${this.codedSequence}>`
    }

    findTranspositions(){
        let transpositions = [];    
    
        for(let i = 1; i <= 11; i++){
            transpositions.push(
                {pcs: transposeCompressed(this.pcs, i)}
            )
        }
        
        return transpositions;         
    }
}

export default Chord;