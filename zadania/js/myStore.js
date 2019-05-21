
import {createStore} from "redux";

const initialState = {
    PLN: 0,
    USD: 0
};

const store = createStore(reducer, initialState);

function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case "DEPOSIT":
            let am = {}

            if (action.payload.currency === 'PLN') {
                am = {
                    'PLN': state.PLN + action.payload.amount
                }
            } else if (action.payload.currency === 'USD') {
                am = {
                    'USD': state.USD + action.payload.amount
                }
            }

            return {
                ...state,
                ...am
            };
            break;
        case "WITHDRAW":
            let wi = {}

            if (action.payload.currency === 'PLN') {
                wi = {
                    'PLN': state.PLN - action.payload.amount
                }
            } else if (action.payload.currency === 'USD') {
                wi = {
                    'USD': state.USD - action.payload.amount
                }
            }

            return {
                ...state,
                ...wi
            };
            break;
        default:
            return state;
    }
}

class Store {
    constructor() {
        console.log("Stan konta", store.getState());
    }

    checkBalance() {
        console.log("Stan konta", store.getState());
    }

    depositeMoney(arg, currency) {
        store.dispatch({
            type: 'DEPOSIT',
            payload: {
                currency: currency,
                amount: arg
            }
        });

        this.checkBalance()
    }

    withdrawMoney(arg, currency) {
        store.dispatch({
            type: 'WITHDRAW',
            payload: {
                currency: currency,
                amount: arg
            }
        });

        this.checkBalance()
    }

}

export default Store;