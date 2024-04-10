import React from 'react';


import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllPosts from '../components/AllPosts';
import ViewPost from '../components/ViewPost';


const Stack = createNativeStackNavigator();


const AppNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="AllPosts" component={AllPosts} />
            <Stack.Screen name="ViewPost" component={ViewPost} />
        </Stack.Navigator>
    )
}

export default AppNavigator;