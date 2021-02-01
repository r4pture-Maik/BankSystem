const TokenGenerator = require('uuid-token-generator');
const tokGen = new TokenGenerator()
import {Account,Transaction} from "./Account"
export class Bank{
    private accounts: Account[] = [];
    constructor(
        private Name: string, 
        private Address: string,
        private Balance: number = 0,
        private ID?: string
        ){
            !this.ID ? this.ID = tokGen.generate(): this.ID = ID
        }
        
        public getName(){
            return this.Name
        }

        public getAccount(accountName:string){
            return this.accounts.find(singleUser => singleUser.getName() == accountName)
        }

        public setAccount(Name:string,Surname:string,Balance?:number,ID?:string,transactions?:Transaction[]){
            this.accounts.push(new Account(Name,Surname,Number(Balance),ID,transactions))
        }

        public setBalance(balance:number){
            this.Balance = balance
        }
        public getBalance(){
            return this.Balance
        }

        public sendMoney(fromUser:string, toUser:string, money:number,Bank:Bank){
            const from = this.getAccount(fromUser);
            //If bank is setted will try to get user from there
            const to = (Bank) ? (Bank.getAccount(toUser)) : (this.getAccount(toUser))
            //If any of two is undefined return an error
            if(from && to){
                //Same bank
                if(this.Name == Bank.getName()){
                    from?.setTransaction("-",money,toUser);
                    to?.setTransaction("+",money,fromUser)
                }else{
                    //Different bank
                    from.setTransaction("-", money, toUser) 
                    from.setTransaction("-", 1, Bank.getName())
                    Bank.setBalance(Bank.getBalance() + 1)
                    to.setTransaction("+",money,fromUser)
                }  
            }else return false
                           
        }

        toString(){
            return "Name: " + this.Name,
                    "Adress: " + this.Address,
                    "Balance" + this.Balance,
                    "ID:" + this.ID
        }

}