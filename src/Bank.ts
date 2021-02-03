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

        public addAccount(Name:string, Surname:string, Balance?:number, ID?:string ){
            this.accounts.push(new Account(Name,Surname,Number(Balance),ID))
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
                if(this.ID == destinationBank.getID()){
                    //Same bank
                    this.setTransaction(from.getID(), to.getID(), "-", money);
                    destinationBank.setTransaction(from.getID(), to.getID(), "+", money);
                    from.setBalance(from.getBalance() - money);
                    to.setBalance(to.getBalance() + money);
                }else{
                    //Different bank
                    this.setTransaction(from.getID(), to.getID(),"-", money + 1);
                    destinationBank.setTransaction(from.getID(), to.getID(), "+", money);
                    this.setBalance(this.getBalance() + 1);
                    from.setBalance(from.getBalance() - (money+1));
                    to.setBalance(to.getBalance() + money);
                } 
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