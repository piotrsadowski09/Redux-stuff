import React from "react";
import ReactDOM from "react-dom";
import {createStore, combineReducers} from 'redux';
import { connect, Provider} from 'react-redux';


//Stan początkowy
const initialState = {
    filter: "all",
    posts: [
        { title: "Pierwsze kroki z reduxem", category: "frontend" },
        { title: "JAVA to nie JavaScript", category: "backend" },
        { title: "CSS to moja pasja", category: "frontend" },
        { title: "Ahaja", category: "fantasy" },
        { title: "Krzyżacy", category: "history" },
        { title: "Malazańska księga poległych", category: "fantasy" },
        { title: "1984", category: "fantasy" },
        { title: "Sirmarilion", category: "fantasy" },
        { title: "Wladca pierscieni", category: "fantasy" },
        { title: "Quo Vadis", category: "history" },
        { title: "JavaScript. Zasady programowania obiektowego", category: "frontend" },
        { title: "JavaScript i jquery", category: "frontend" },
        { title: "Martin Eden", category: "history" },
        { title: "Kubus Puchatek", category: "history" },
        { title: "Python dla kazdego", category: "backend" },
        { title: "C++ dla opornych", category: "backend" },
        { title: "Ostatnie rozdanie", category: "fantasy" },
        { title: "Podreczny leksykon przyrody polskiej", category: "history"},

    ]
};


//Reducery – zajmują się redukowanie stora
function filterReducer(state = initialState.filter, action) {
    return state;
}

function postsReducer(state = {data: initialState.posts, filtred: initialState.posts}, action) {
    console.log(state);
    switch(action.type) {
        case 'FILTER':
            return { ...state, filtred: state.data.filter((e) => e.category === action.payload.toLocaleLowerCase())
            }
            break;
    }

    return {data: state, filtred: state};
}


//Łączę reducery w całość
const reducers = combineReducers({
    filter: filterReducer,
    posts: postsReducer
});

//Tworzę store dla całej aplikacji
const store = createStore(reducers, initialState);


//Funkcja służy do dodawania propsów do komponentu – w tym wypadku propsy to funkcje, służące do dispachowania akcji do reducerów
function mapDispatchToProps(dispatch) {
    return {
        getGenre: (e, genre) => dispatch({
            type: 'FILTER',
            payload: genre
        })
    }
}


//Funkcja służy do dodawania propsów do komponentu
function mapStateToProps(state) {
    return {posts: state.posts}
}

//Komponent
const App = (props) => {

    if(!props.posts.filtred) {
        return null;
    }

    let books = props.posts.filtred.map((e,i) => {
        return <li key={i}>{e.title}</li>
    });

    return (
        <>
            <button onClick={(e,arg) => props.getGenre(e, e.currentTarget.innerText)} >Fantasy</button>
            <button onClick={(e,arg) => props.getGenre(e, e.currentTarget.innerText)} >History</button>
            <button onClick={(e,arg) => props.getGenre(e, e.currentTarget.innerText)} >Frontend</button>
            <button onClick={(e,arg) => props.getGenre(e, e.currentTarget.innerText)} >Backend</button>
            <ul>
                {books}
            </ul>
        </>
    )
};

//WiseApp to komponent który zwraca komponent App nakarmiony propsami
const WiseApp = connect(mapStateToProps, mapDispatchToProps)(App)


//Renderuje wszystko
ReactDOM.render(
    <Provider store={store} >
        <WiseApp />
    </Provider>,
    document.querySelector("#app"));
