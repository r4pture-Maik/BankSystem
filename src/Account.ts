const TokenGenerator = require('uuid-token-generator');
const tokGen = new TokenGenerator()
export class Account{
    constructor(
        private Name: string, 
        private Surname: string,
        private Balance: number,
        private ID?: string,
        private transactions:Transaction[] = [],
        ){ 
            !this.ID ? this.ID = tokGen.generate(): this.ID = ID
            !this.Balance ? this.Balance = 500 : this.Balance = Balance
        }

    public getName():string{
        return this.Name
    }

    public setBalance(amount:number){
        return this.Balance = amount;
    }

    public setTransaction(type:string, amount:number, accountName:string){
        var tempTranscation:Transaction = {type:type, money:amount, account:accountName}
        console.log(type)
        const newBalance = (type) === "+" ? (amount + this.Balance) : (this.Balance - amount)
        this.setBalance(newBalance)
        this.transactions.push(tempTranscation)
    }
    
}

export type Transaction = { 
    type:string
    money:number
    account:string
 } 