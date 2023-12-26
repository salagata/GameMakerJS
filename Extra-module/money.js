function setNoEditable(obj) {
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            Object.defineProperty(obj,key,{
                value: value,
                writable: false
            })
        }
    };
    return obj;
}

class Coin {
    constructor(name,scale,moneyReference = "GENERIC_COIN") {
        this.name = name;
        this.scale = scale //* bank.coins.find(c => c.name == moneyReference).scale;
        this.moneyReference = moneyReference;
    }
}

var GLOBAL_ID = 0
var bank = {
    accounts: [],
    coins:[
        setNoEditable(new Coin("GENERIC_COIN",1,"GENERIC_COIN"))
    ],
    newAccount(nameAccount,balance = {}) {
        let newAccount
        this.accounts.push()
    },
    newCoin(name,scale = 1,moneyReference = "GENERIC_COIN") {
        this.coins.push(new Coin(name,scale,moneyReference))
    },
    newCoins(...coins) {
        for (const coin of coins) {
            this.newCoin(coin[0] ?? coin,coin[1],coin[2])
        }
    },
    getCoin(name) {
        return this.coins.find(c => c.name == name)
    },
    convertCoins(coin1,quantity,coin2,round = true) {
        let r = round ? Math.floor : () => {}
        let c1 = typeof coin1 == "string" ? this.getCoin(coin1) : coin1;
        let c2 = typeof coin2 == "string" ? this.getCoin(coin2) : coin2;
        if(c1.moneyReference == c2.name) {// talisman.mR == gem -> true
            return r(c1.scale * quantity) // 50 * 50 gem
        } else if(c1.moneyReference == "GENERIC_COIN") {
            throw new Error("Money doesn't have scale to coin target")
        } else if(c2.moneyReference == c1.name) {
            return r(quantity/c2.scale) // 50 gem -> talisman, talisman -> 50 gem, 50 / 
        } else {
            return this.convertCoins(c2,c1.scale * quantity,this.getCoin(c2.moneyReference),round) * quantity // ((50 * 50 gem) -> coins) * 50
        }// talisman , 250 , gem 
        // 50 talisman -> coins
        // 50 * talisman.scale = 50 * 50 gem = 250 gem 
        // 250 gem -> coins 
        // 250 * gem.scale = 250 * 500 coins = 125000 coins
    }
}
class Account {
    constructor(name,balance = {}) {
        this.name = name;
        this.id = ++GLOBAL_ID,
        this.balance = balance
    }
    getCoinBalance(name) {
        return this.balance[name]
    }
    convertCoins(coin1,quantity,coin2,round = true) {
        // balance = 150 gem , 9 talisman
        bank.convertCoins(coin1,quantity,coin2,round)
    }
}

export {bank}