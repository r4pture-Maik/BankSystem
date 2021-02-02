const TokenGenerator = require('uuid-token-generator');
const tokGen = new TokenGenerator()
export class Account{

    constructor(
        private name: string, 
        private surname: string,
        private balance: number = 500,
        private ID: string = tokGen.generate(),      
        ){}

    getName = ():string => this.name
    
    getID = ():string => this.ID
    
    getBalance = ():number => this.balance;

    setBalance = (amount:number) => this.balance = amount;
    
    toJson = () => {this.name, this.surname, this.balance, this.ID}
}

