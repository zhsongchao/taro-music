import { FC } from 'react'
import { Provider } from "react-redux";

import store from "./store/store";

import "taro-ui/dist/style/index.scss"; // 全局引入一次即可
import "./app.scss";
import "./assets/iconFont/icon.scss";


const App:FC = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default App
