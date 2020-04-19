import React,{ Fragment } from "react";
import { SafeAreaView,Platform, View, StatusBar } from "react-native";


const DetectPlatform = ({ children }) => {

  return Platform.OS == "ios" ?
   <PlatformIOS children={children} /> :
   <PlatformAndroid children={children} />
   
}

const PlatformAndroid = ({ children }) => {

    return(
        <Fragment>
            <View 
                style={{
                    height: StatusBar.currentHeight,
                    backgroundColor:"grey"
                }}
            />
            { children }
        </Fragment>
    );
}
const PlatformIOS = ({ children }) => {
    return(
        <Fragment>
            <SafeAreaView 
                style={{ flex: 0,
                    backgroundColor:"grey"
                }}/>
            <SafeAreaView style={{ flex: 1 }}>
                { children }
            </SafeAreaView>
        </Fragment>
    );
}
export default DetectPlatform;