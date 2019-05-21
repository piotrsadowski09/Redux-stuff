

import Store from "./myStore";

const s = new Store();

document.querySelector('.deposit-pln')
    .addEventListener("click", function(){
        s.depositeMoney(200, 'PLN');
    });

document.querySelector('.deposit-usd')
    .addEventListener("click", function(){
        s.depositeMoney(200, 'USD');
    });

document.querySelector('.withdraw-pln')
    .addEventListener("click", function(){
        s.withdrawMoney(200, 'PLN');
    });

document.querySelector('.withdraw-usd')
    .addEventListener("click", function(){
        s.withdrawMoney(200, 'USD');
    });
