var fs = require("fs")

export function writeToFile(localGames:any){
    fs.writeFileSync("../resource/bank_system.json", JSON.stringify(localGames));
}