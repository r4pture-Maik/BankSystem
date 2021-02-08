var fs = require('fs');
import { writeToFile } from "./writeFile";
import { Bank } from "./Bank";
import { Account, IAccount } from "./Account";

export class BankSystem{
    constructor(
        private banks: Bank[] = []
        ){this.bankFiller()}

    getBanks = ():Bank[] => this.banks

    getBank = (bankID:string) => this.banks.find(singleBank => singleBank.getID() == bankID)

    addBank = (Name:string, Address:string) => { 
        this.banks.push(new Bank(Name, Address))
        writeToFile(this.banks) 
    }

    addAccount = (bankID:string,name:string,surname:string) => { 
        const singleBank = this.getBank(bankID)
        if(singleBank){
            singleBank.addAccount(name,surname)
            writeToFile(this.banks) 
        }else return false      
    }

    private bankFiller = () => {
        const data = JSON.parse(fs.readFileSync("../resources/bank_system.json", "utf-8"));

        this.banks = data.map((currentValue:any) =>{
            const {name,address,balance,ID, accounts, transactions} = currentValue
            return new Bank(
                name,
                address,
                balance,
                ID,
                transactions,
                accounts.map(({name, surname, balance, ID}:IAccount)=> new Account(name,surname,balance,ID)
            ))
        })  
    }

    public moneyHandler = (fromUser:string,toUser:string,moneyToSend:number) => {
        const fromUserBank = this.banks.find(singleBank => singleBank.getAccount(fromUser))
        const toUserBank = this.banks.find(singleBank => singleBank.getAccount(toUser))
        // if(fromUserBank && toUserBank){
        //     fromUserBank.sendMoney(fromUser,toUser,moneyToSend,toUserBank);
        //     writeToFile(this.banks);
        // }else{
        //     return false
        // }
       return fromUserBank && toUserBank && fromUserBank.sendMoney(fromUser,toUser,moneyToSend,toUserBank) && writeToFile(this.banks);
    }
}