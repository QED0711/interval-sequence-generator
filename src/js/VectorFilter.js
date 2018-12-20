import Vector from "./vector";

class VectorFilter {
	constructor(){
		this[1] = {'type' : null, 'value' : 0};
		this[2] = {'type' : null, 'value' : 0};
		this[3] = {'type' : null, 'value' : 0};
		this[4] = {'type' : null, 'value' : 0};
		this[5] = {'type' : null, 'value' : 0};
		this[6] = {'type' : null, 'value' : 0};
	}

	setVector(intervalClass, type, value){
		this[intervalClass] = {'type' : type, 'value' : value}
	}

	runVectorFilter(chordVector){
		for(let i = 1; i <= 6; i++){
			if(this[i].type){
				switch(this[i].type){
					case('lessThan'):
						if(!(chordVector[i] < this[i].value)){
							return false;
						}
						break;
					case('atLeast'):
						if(!(chordVector[i] >= this[i].value)){
							return false;
						}
						break;
					case('exactly'):
						if(!(chordVector[i] === this[i].value)){
							return false;
						}
				}	
			} 
		}
		return true;
	}
}

export default VectorFilter;