import React,{ Component,Fragment, PureComponent } from "react";
import { Text,View, StyleSheet } from "react-native";

import Grid from "./Component/Grid";
import { Context as VirtualKeyboardContext } from "../Context/virtualKeyboardContext";

class Gridcontainer extends PureComponent{

    static contextType = VirtualKeyboardContext;
    constructor(props){
        super(props);
    }
    
    selectedGridDispatch = (selectedGrid) => {
        const { selectGrid } = this.context;
        selectGrid(selectedGrid);
    }
    render(){
        let customKey = 0;
        const { state } = this.context;
        const { rows,columns,values,selectedGrid } = state;
        return(
            <Fragment>
                <View style={ styles.gridContainer }>
                {
                    rows.map((row,rowIndex) => {
                        return columns.map((column,columnIndex) => {
                            customKey++;
                            return <Grid 
                                key={customKey}
                                row={row}
                                column={column}
                                values={ values.find( itr => itr.row == row && itr.column == column ) }
                                selectedGridDispatch={this.selectedGridDispatch}
                                selectedGrid={selectedGrid}
                            />
                        })
                    })
                }
                </View>
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    gridContainer:{ 
        width:"80%",
        flexDirection:"row",
        flexWrap:"wrap",
        alignSelf:"center",
        justifyContent:"center" 
    }
})
export default Gridcontainer;