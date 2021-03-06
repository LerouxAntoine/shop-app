
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import productsReducer from "./store/reducers/product"
import cartReducer from "./store/reducers/cart"
import ordersReducer from './store/reducers/orders';
import authReducer from "./store/reducers/auth"
import AppLoading from "expo-app-loading"
import * as Font from "expo-font"
import ReduxThunk from "redux-thunk"
import AppNavigator from './navigation/AppNavigator';
import * as Notifications from "expo-notifications"

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  })
}

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true }
  }
})

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)



  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={err => console.log(err)
        }
      />
    )
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
