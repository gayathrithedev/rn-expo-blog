import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AllPosts from './src/components/AllPosts';
import AppNavigator from './src/navigation';

export default function App() {
  return (
    <NavigationContainer>
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <AppNavigator />
    </View>
    </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
});
