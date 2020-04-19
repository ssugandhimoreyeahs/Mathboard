import React,{ Component } from "react"
import { TouchableOpacity,StyleSheet, Text, Keyboard } from "react-native";

class Grid extends Component{

    constructor(props){
        super(props);

        this.state = {

        }
    }
   
    render(){
        const { row,column,values,selectedGridDispatch,selectedGrid } = this.props;
        let currentValue = values.value;
        let backgroundColor = (selectedGrid.row === values.row && selectedGrid.column === values.column) ? "#C6EAFD" : "#FFF";
        return(
            <TouchableOpacity 
            onPress={()=>{ selectedGridDispatch(values); }}
            disabled={values.disabled}
            style={{ ...style.gridContainer,backgroundColor }}>
                
                <Text style={ style.textInputStyle }>{ `${currentValue}` }</Text>
            </TouchableOpacity>
        );
    }
}

const style = StyleSheet.create({
    gridContainer: {
        height:50,
        width:50,
        borderWidth:2,
        borderColor:"#C3EAFF",
        justifyContent:"center",
        alignItems:"center"
    },
    textInputStyle: {
        fontSize: 20,
        textAlign:"center"
    }
});

export default Grid;