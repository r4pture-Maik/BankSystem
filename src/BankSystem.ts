const file = require("../resource/bank_system.json");
var fs = require("fs");
import {writeToFile} from "./writeFile";
import {Bank} from "./Bank";

export class BankSystem{
    private Banks: Bank[] = [];

    constructor(){this.bankFiller()}

    public getBanks(){
        return this.Banks
    }

    public getBank(bankName:string){
        return this.Banks.find(singleBank => singleBank.getName() == bankName)
    }

    private bankFiller(){
        const data = JSON.parse(fs.readFileSync("../resource/bank_system.json", "utf-8", (err: NodeJS.ErrnoException) => {
            if (err) throw err;
        }));
        data.map((currentValue:any,bankIndex:number,) =>{
            const {Name,Address,Balance,ID} = currentValue 
            const tempBank = new Bank(Name,Address,Balance,ID);
            this.Banks.push(tempBank)  
            //Accounts filler
            currentValue.accounts.map((currentUser:any)=>{
                const {Name, Surname, Balance, ID} = currentUser
                const {transactions} = currentUser
                this.Banks[bankIndex].setAccount(Name,Surname,Balance,ID,transactions)
            })
        })
         
    }

    public moneyHandler(fromUser:string,toUser:string,moneyToSend:number){
        const fromUserBank = this.Banks.find(singleBank => singleBank.getAccount(fromUser))
        const toUserBank = this.Banks.find(singleBank => singleBank.getAccount(toUser))
        if(fromUserBank && toUserBank){
            fromUserBank.sendMoney(fromUser,toUser,moneyToSend,toUserBank);
            //console.log(JSON.stringify(this.Banks))
            writeToFile(this.Banks)
        }else{
            return false
        }
    }
//Nella api tu mandi il tuo user quello dell'altro e lui deve pescare da quelle due info ache banca fanno parte
    

    // private setBanks(Name:string,Address:string,ID:string){
    //     this.Banks.push(new Bank(Name,Address,ID))
    // }  
}


const Oloregast = new BankSystem();
Oloregast.moneyHandler("user1b1","user1b2",500)
console.log(Oloregast.getBanks())
 
console.log(Oloregast.getBank("Bank 1")!.getAccount("user1b1"))
console.log(Oloregast.getBank("Bank 2")!.getAccount("user1b2"))