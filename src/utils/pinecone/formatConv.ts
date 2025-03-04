export function formatConvHistory(messages : any) {
    return messages.map((message : string, i:any) => {
        if (i % 2 === 0){
            return `Human: ${message}`
        } else {
            return `AI: ${message}`
        }
    }).join('\n')
}