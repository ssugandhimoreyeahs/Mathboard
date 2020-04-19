import React,{ Component, Fragment } from "react";
import { Text,View,TouchableOpacity, StyleSheet } from "react-native";

import { Context as VirtualKeyboardContext } from "../../Context/virtualKeyboardContext";
class VirtualKeyboard extends Component{

    static contextType = VirtualKeyboardContext;
    constructor(props){
        super(props);

        this.state = {
            keyboardKeys: []
        }
        
    }
    getKeyboardValues = () => {
        let keyboardKeysArray = [];

        for(let i=1;i<=9;i++){
            let keys = {};
            keys.value = i;
            keyboardKeysArray.push(keys);
        }
        keyboardKeysArray.push({
            value: 0
        });
        keyboardKeysArray.push({
            value: "X"
        });
        return keyboardKeysArray;
    }

    componentDidMount(){
        let keyboardKeys = this.getKeyboardValues();
        this.setState({ keyboardKeys });
    }

    renderKeys = ({ singleKeys }) => {
        const { selectedGrid } = this.context.state;
        return <TouchableOpacity 
            disabled={ selectedGrid.row == undefined || selectedGrid.column == undefined }
            style={ styles.renderBlock } onPress={()=>{
            this.context.onVirtualKeyboardPress(singleKeys.value)
        }}>
            <Text style={ styles.keysText }>{ singleKeys.value }</Text>
        </TouchableOpacity>
    }
    render(){
        const { keyboardKeys } = this.state;
        return(
            <View style={ styles.virtualKeyboardContainer }>
                {
                    keyboardKeys.map((singleKeys,index)=>{
                        return <this.renderKeys key={index} singleKeys={singleKeys}/>
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    virtualKeyboardContainer: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent:"space-evenly"
    },
    renderBlock:{
        height:50,
        width: 30,
        borderRadius: 10,
        backgroundColor:"#fff",
        justifyContent:"center",
        alignItems:"center"

    },
    keysText: {
        fontSize: 22,
        fontWeight: "600"
    }
});

export default VirtualKeyboard;