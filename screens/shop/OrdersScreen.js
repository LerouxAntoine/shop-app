import React from "react"
import { FlatList, Platform, Text } from "react-native"
import { HeaderButtons, Item } from "react-navigation-header-buttons"
import HeaderButton from "../../components/UI/HeaderButton"

import { useSelector } from "react-redux"

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders)
    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>}
        />
    )
}

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle : "Your Orders",
        headerLeft:
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                    onPress={
                        () => {
                            navData.navigation.toggleDrawer()
                        }}
                />
            </HeaderButtons>
    }
}

export default OrdersScreen