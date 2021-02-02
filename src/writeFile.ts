const fs = require('fs')
export function writeToFile(localBanks:any){
    fs.writeFileSync("../resources/bank_system.json", JSON.stringify(localBanks));
}