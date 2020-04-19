import React,{ Component,Fragment } from "react";
import { Text,View, ScrollView,StyleSheet, Button, TouchableOpacity, Alert } from "react-native";

import VirtualKeyboard from "./Component/VirtualKeyboard";
import GridContainer from "./Gridcontainer";
import QuestionInputJson from "../API/questionInput.json";

import { Context as VirtualKeyboardContext } from "../Context/virtualKeyboardContext";
import Result from "./Component/ResultJson";

class Board extends Component{
    static contextType = VirtualKeyboardContext


    triggerNext = () => {
        const { state,computeResult } = this.context;
        const { selectedGrid,values,totalRows,totalColumns } = state;
        if(selectedGrid.row == undefined && selectedGrid.column == undefined){
            Alert.alert("Message","Please Give Answer Before Continue");
            return false;
        }
        
        let isUserSelectAnswer = false;
        
        for(let i=0;i < totalRows; i++){
            for(let j=0;j< totalColumns; j++){
                let checkQuestionInput = QuestionInputJson.questionInput.find((itr) => itr.row == i && itr.column == j );
                if(checkQuestionInput === undefined){
                    let pushObj = values.find( fin => fin.row == i && fin.column == j);
                    if(pushObj.value !== ""){
                        isUserSelectAnswer = true;
                        break;
                    }
                }
            }
        }
        if(isUserSelectAnswer == false){
            Alert.alert("Message","Please Give Answer Before Continue");
            return false;
        }else{
            computeResult();
        }
        
    }
    render(){
        
        return(
            <View style={style.container}>
                <ScrollView keyboardShouldPersistTaps={"always"}>
                    <Text style={style.heading}>Math Board</Text>
                    
                    <View style={style.gridContainer}>
                        <GridContainer />
                    </View>

                    <View style={ style.virtualKeyboardStyle }>
                        <VirtualKeyboard />
                    </View>

                    
                        <TouchableOpacity 
                        onPress={this.triggerNext}
                        style={ style.nextButton }>
                            <Text style={ style.nextText }>Next</Text>
                        </TouchableOpacity>
                    

                        <View style={{ marginTop: 30, marginBottom: 100,width:"90%",alignSelf:"center" }}>
                            <Result />
                        </View>
                      
                </ScrollView>
            </View>
        );    
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%"
    },
    heading: {
        textAlign:"center",
        fontSize:20,
        fontWeight: "600",
        marginTop:20
    },
    gridContainer: {
        marginTop:40,
        width:"100%",
        borderColor:'red',
        borderWidth:0,
        
    },
    virtualKeyboardStyle: { 
        marginTop: 50,
        width:"100%",
        backgroundColor: "#5D5D5D",
        height: 70,
        justifyContent:"center",
        alignItems:"center"
    },
    nextButton:{ 
        alignSelf:"center",
        marginTop:20,
        justifyContent:"center",
        alignItems:"center",
        width:110,
        height: 40,
        backgroundColor: "#5D5D5D",
        borderRadius:30 
    },
    nextText: { 
        color:"#FFF" ,
        fontSize: 18,
        fontWeight: "600"
    }
});


export default Board;