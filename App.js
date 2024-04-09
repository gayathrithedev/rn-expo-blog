import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AllPosts from './src/components/AllPosts';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.header}>Blog Application</Text>
      <AllPosts />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 24
  }
});
