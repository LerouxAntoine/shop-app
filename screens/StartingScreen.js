import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";

import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth"

const StartingScreen = props => {
    const dispatch = useDispatch()
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem("userData")
            if (!userData) {
                //props.navigation.navigate("Auth");
                dispatch(authActions.setDidTryAL())
                return;
            }
            const transformedData = JSON.parse(userData)
            const { token, userId, expiryDate } = transformedData
            const expirationDate = new Date(expiryDate)

            if (expirationDate <= new Date() || !token || !userId) {
                //props.navigation.navigate("Auth");
                dispatch(authActions.setDidTryAL())
                return;
            }
            const expirationTime = expirationDate.getTime() - new Date().getTime()
            
            //props.navigation.navigate("Shop");
            dispatch(authActions.authenticate(token, userId, expirationTime))
        }

        tryLogin()
    })
    return (
        <View style={styles.screen}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default StartingScreen;