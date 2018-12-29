import Vector from './vector.mjs'
import { pitchChain, applySet, expandPCS, transposeCompressed, transposePC} from './chordHelperFunctions';



class Chord {
    constructor(intervalArr, set){
        let pcs = pitchChain(intervalArr, set);
        
        this.set = set
        this.codedSequence = intervalArr
        this.intervalSequence = applySet(intervalArr, set)
        this.size = intervalArr.length + 1
        this.pcs = pcs
        this.transpositions = this.findTranspositions();
        this.expandedPCS = expandPCS(pcs)
        this.vector = Vector.fromPCSet(pcs)  
        this.designation = `(${this.set})-<${this.codedSequence}>`
        this.transpositions = this.transpositionContent();
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

    transpositionContent(){
        let pcContent = {
            endsWith: Array.from({length: 12}, () => []),
            contains: Array.from({length: 12}, () => [])
        }

        for(let i = 0; i < this.pcs.length; i++){ // runtime O(12n) = O(n)
            for(let j = 0; j <= 11; j++){
                let transposedPC = transposePC(this.pcs[i], j)

                if(i === this.pcs.length - 1){
                    pcContent.endsWith[j].push(transposedPC);
                } 
                
                pcContent.contains[j].push(transposedPC);
                
            }
        }
        return pcContent;
    }
}

export default Chord;