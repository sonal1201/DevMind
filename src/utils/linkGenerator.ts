export function linkGenerate(len: number){
    let options = "gsdbfusbfyusbdvh1234567890";
    let length = options.length;

    let ans = "";

    for(let i=0;i<len;i++){
        ans+=options[Math.floor((Math.random() * length))]
    }

    return ans;
}