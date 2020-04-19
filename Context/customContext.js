import React,{ createContext,useReducer } from "react";


const customContext = (reducer, actions, initialState) => {

    const Context = createContext();

    const Provider = ({ children }) => {

        const [ state,dispatch ] = useReducer(reducer,initialState);

        const boundActions = {};
        for(let keys in actions){
            boundActions[keys] = actions[keys](dispatch);
        }
        return(
            <Context.Provider value={{ state,...boundActions }}>
                { children }
            </Context.Provider>
        );
    }

    return { Context,Provider };
}

export default customContext;