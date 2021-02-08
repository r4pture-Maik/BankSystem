const TokenGenerator = require('uuid-token-generator');
const tokGen = new TokenGenerator()
export interface IAccount{
    name: string, 
    surname: string,
    balance: number,
    ID: string
}
export class Account implements IAccount{

    constructor(
        public name: string, 
        public surname: string,
        public balance: number = 500,
        public ID: string = tokGen.generate(),      
        ){}

    getName = ():string => this.name
    
    getID = ():string => this.ID
    
    getBalance = ():number => this.balance;

    setBalance = (amount:number) => this.balance = amount;
    
}



