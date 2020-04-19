import React,{ Component, Fragment } from "react";
import { Text,View, TextInput } from "react-native";
// import JsonPrety from "react-json-pretty";

import { Context as VirtualKeyboardContext } from "../../Context/virtualKeyboardContext";
class ResultJson extends Component{

    static contextType = VirtualKeyboardContext;

    render(){
        const { state } = this.context;
        let showJSON = state.answerGiven.questionOutput.length == 0 ? false : true;
        return(
            <Fragment>
                <Text>
                    { showJSON == true ? JSON.stringify(state.answerGiven) : ""  }
                </Text>
            </Fragment>
        );
    }
}

export default ResultJson;