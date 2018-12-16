
    
    export function textToNumArray(text, alertMessage){
        let returnText = text ? text.split(" ").map(x => parseInt(x)) : []
        if(returnText.length <= 6 && returnText.length > 0) return returnText;
        alert(alertMessage)
        return [];
    }