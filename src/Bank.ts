const TokenGenerator = require('uuid-token-generator');
const tokGen = new TokenGenerator()
import {Account} from "./Account"
export class Bank{
    
    constructor(
        private name: string, 
        private address: string,
        private balance: number = 500,
        private ID: string = tokGen.generate(),
        private transactions:Transaction[] = [],
        private accounts: Account[] = []
        ){}
        
        public getAccount = (accountID:string) => this.accounts.find(singleUser => singleUser.getID() === accountID)
        
        public getAccounts = () => this.accounts

        public addAccount(name:string, surname:string, balance?:number, id?:string ){
            this.accounts.push(new Account(name,surname,Number(balance),id))
        }

        public setBalance(balance:number){
            this.balance = balance
        }
        public getBalance(){
            return this.balance
        }
        public getID(){
            return this.ID
        }

        private setTransaction = (fromAccount:string, toAccount:string, type:string, money:number) =>
            this.transactions.push({fromAccount, toAccount, type, money})

        getTransactions = () => this.transactions

        public sendMoney(fromUser:string, toUser:string, money:number, destinationBank:Bank){
            const from = this.getAccount(fromUser);
            const to = destinationBank.getAccount(toUser)
            if(from && to){
                const isTheSameBank = this.ID == destinationBank.getID();
                this.setTransaction(from.getID(), to.getID(), "-", money + (isTheSameBank ? 0 : 1));
                destinationBank.setTransaction(from.getID(), to.getID(), "+", money);
                from.setBalance(from.getBalance() - money + (isTheSameBank ? 0 : 1));
                to.setBalance(to.getBalance() + money);
                !isTheSameBank && this.setBalance(this.getBalance() + 1);
                return true
                //if(!isTheSameBank) this.setBalance(this.getBalance() + 1);
            } else return false         
        }

        toString(){
            return "Name: " + this.name,
                    "Adress: " + this.address,
                    "Balance" + this.balance,
                    "ID:" + this.ID
        }
}

export type Transaction = { 
    fromAccount:string
    toAccount:string
    type:string
    money:number
 } 