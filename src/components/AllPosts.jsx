// global imports
import React, {useEffect, useState, useMemo } from 'react';
import { FlatList, View, Text, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

// third party imports
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';


const AllPosts = () => {
// state variables
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const {navigate} = useNavigation();

// fecth all post
    const getPosts = () => {
        setLoading(true);
        axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`).then((response) => {
            if(data?.length > 0) {
                setData([...data, ...response.data]);
            } else {
                setData(response.data);
            }
            if(error) {
                setError(null);
            }
    }).catch((error) => { 
        setError(error); }).finally(() => { setLoading(false); });
    }

// useEffect to fetch all post
    useEffect(() => {  
        getPosts()
    }, [page]);

// navigate to ViewPost
    const navigateToViewPost = (id) => navigate('ViewPost', {id})


// computed details for each item
    const useComputedDetails = (item) => {
        return useMemo(() => {
          const start = Date.now();
          // Dummy computation
          const summary = item.title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          const end = Date.now();
          console.log(`Computation time for item ${item.id}: ${end - start} milliseconds`);
          return summary;
        }, [item]);
      };

// render item for list of posts
    const RenderItem = ({ item }) => {
        useComputedDetails(item);
        return (
            <TouchableOpacity style={styles.listItems} onPress={() => navigateToViewPost(item.id)}>
                <View style={styles.listItemWrapper}>
                <View style={styles.idContainer}>
                    <Text style={styles.idText}>{item.id}</Text>
                </View>
                <View style={styles.listItemRight}>
                    <Text style={styles.titleText}>{item.title}</Text>
                </View>
                </View>
            </TouchableOpacity>
        )
    }

// handle on end reached ----> infinite scroll
    const handleOnEndReached = () => {
        setPage(page + 1);
    }

    return (
       <View style={styles.container}>
        <Text style={styles.header}>Bloggo.</Text>
        {error ? <Text style={styles.error}>{error.message}</Text> : null}
        <FlatList
            data={data}
            renderItem={({item}) => <RenderItem item={item} />}
            keyExtractor={item => item.id.toString()}
            style={styles.container}
            onEndReached={() => handleOnEndReached()}
            onEndReachedThreshold={0.7}
            ListHeaderComponent={() => {loading ? <ActivityIndicator size="large" color="#000000" /> : null}}
        />
       </View>
    )
}


// styles
const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 16
      },
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 8,
    },
    error: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center'
    },
    listItemWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    listItems: {
        padding: 12,
        backgroundColor: '#F4F7FB',
        borderRadius: 8,
        marginBottom: 16
    },
    idContainer: {
        flex: 2,
        alignItems:'center',
        justifyContent: 'center',
        marginRight: 16,
        borderRadius: 8,
        backgroundColor: '#000000',
        height: 60,
        width: 60,
    },
    idText: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: '900'
    },
    listItemRight: {
        flex: 8
    },
    titleText: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8
    },
    textInput: {
        borderColor: '#000000',
        borderWidth: 2,
        borderRadius: 8,
        marginBottom: 8,
        padding: 12,
        marginHorizontal: 24
    },
});
export default AllPosts;