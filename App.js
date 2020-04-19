import React,{ Component } from "react";
import { View } from "react-native";
import Platform from "./Mathboard/Platform";
import { Provider as VirtualKeyboardProvider } from "./Context/virtualKeyboardContext";
import Mathboard from "./Mathboard/board";

class App extends Component{

  render(){
    return(
      <Platform>
        <VirtualKeyboardProvider>
          <Mathboard />
        </VirtualKeyboardProvider>
      </Platform>
    );
  }
}

export default App;