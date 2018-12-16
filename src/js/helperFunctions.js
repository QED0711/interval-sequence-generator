
    
export function textToNumArray(text, maxSize, alertMessage){
    let returnText = text ? text.split(" ").map(x => parseInt(x)) : []
    if(returnText.length <= maxSize && returnText.length > 0) return returnText;
    alert(alertMessage)
    return [];
}

