import customContext from "./customContext";
import QuestionInputJson from "../API/questionInput.json";

const SELECTGRID = 'SELECTGRID';
const INSERTVALUE = 'INSERTVALUE';
const REMOVEVALUE = 'REMOVEVALUE';
const COMPUTERESULT = "COMPUTERESULT";

const getInitialValues = (rows,columns) => {
       let values = [];
        
        for(let row = 0; row < rows.length; row ++){
            for(let column = 0; column < columns.length; column++){
                
                let obj = {};
                let checkQuestionInput = QuestionInputJson.questionInput.find((itr) => itr.row == row && itr.column == column );
                if(checkQuestionInput == undefined){
                    obj.row = row;
                    obj.column = column;
                    obj.value = "";
                    obj.disabled = false;
                }else{
                    obj.row = row;
                    obj.column = column;
                    obj.value = checkQuestionInput.value;
                    obj.disabled = true;
                }
                values.push(obj);
                
                
            }
        }
        return values;
}

const getTotalRows = (totalRows) => {
    let rowsArray = [];
    for(let i=0;i<totalRows;i++){
        rowsArray.push(i);
    }
    return rowsArray;
}
const getTotalColumn = (totalColumns) => {
    let columnArray = [];
    for(let i=0;i<totalColumns;i++){
        columnArray.push(i);
    }
    return columnArray;
}
const initialState = {
    totalRows: 6,
    totalColumns: 6
}
initialState.rows = getTotalRows(initialState.totalRows);
initialState.columns = getTotalColumn(initialState.totalColumns);
initialState.values = getInitialValues(initialState.rows,initialState.columns);
initialState.selectedGrid = {
    row: undefined,
    column: undefined,
    value: undefined
};
initialState.answerGiven = { questionOutput: [] };
const reducer = (state,action) => {
    const { type,payload } = action;
    const { values,selectedGrid,rows,columns,totalRows,totalColumns } = state;
    switch(type){

        case SELECTGRID: 
            return { ...state, selectedGrid: payload};
        
        case INSERTVALUE:
            const updatedValues = values.map((singleValues)=>{
                if(singleValues.row === selectedGrid.row && singleValues.column === selectedGrid.column){
                    singleValues.value = payload;
                    return singleValues;
                }else{
                    return singleValues;
                }
            })
            return { ...state,values: updatedValues,answerGiven : { questionOutput: [] } };

        case COMPUTERESULT: 
            let questionGiven = [];
            let answerGiven = [];
            
            for(let i=0;i < totalRows; i++){
                for(let j=0;j< totalColumns; j++){
                    let checkQuestionInput = QuestionInputJson.questionInput.find((itr) => itr.row == i && itr.column == j );
                    if(checkQuestionInput === undefined){
                        let pushObj = values.find( fin => fin.row == i && fin.column == j);
                        //answerGiven.push(pushObj);
                        if(pushObj.value !== ""){
                            delete pushObj.disabled;
                            answerGiven.push(pushObj);
                        }
                    }
                }
            }
               
                
                
            
            return { ...state,answerGiven : { questionOutput: answerGiven }};
        default: return state;
    }
}

const onVirtualKeyboardPress = (dispatch) => (key) => {
    dispatch({
        type: INSERTVALUE,
        payload:key === "X" ? "" : key
    });
}

const selectGrid = (dispatch) => (grid) => {
    dispatch({
        type:SELECTGRID,
        payload: grid
    });
}

const computeResult = (dispatch) => () => {
    dispatch({
        type: COMPUTERESULT
    });
}
export const { Context,Provider } = customContext(reducer,{
    onVirtualKeyboardPress,selectGrid,computeResult
},initialState);