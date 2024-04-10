// global imports
import React, {useEffect, useState, useMemo, useCallback } from 'react';
import { FlatList, View, Text, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

// third party imports
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';


let loadMore = true;

const AllPosts = () => {
// state variables
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const {navigate} = useNavigation();
    const [isFetching, setIsFetching] = useState(false); // New state to track fetch status


// fecth all post
const fetchData = async (page) => {
    const limit = 10;  // Adjust the limit as needed
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const totalCount = response.headers.get('X-Total-Count');
    setCount(totalCount);
    return response.json();
  };
  

// useEffect to fetch all post
// add throttling to avoid multiple requests
useEffect(() => {
    const loadPageData = async () => {
      if (!isFetching && !loading) {
        setLoading(true);
        setIsFetching(true);
        const newData = await fetchData(page);
        setData(currentData => [...currentData, ...newData]);
        setLoading(false);
        setIsFetching(false);
      }
    };
    loadPageData();
  }, [page]);

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

// handle on end reached ----> infinite scroll
    const handleLoadMore = () => {
        if(page<=10 && !isFetching) {
            setPage(currentPage => currentPage + 1);
        }
    };


// navigate to view post
    const handleItemPress = useCallback((id) => {
        navigate('ViewPost', { id })
    }, []);


// render item for list of posts
    const ListItemComponent = ({ item, onPress }) => {
        // useComputedDetails(item);
        return (
            <TouchableOpacity style={styles.listItems} onPress={() => onPress(item?.id)}>
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


    const renderItem = useCallback(({ item }) => (
        <ListItemComponent item={item} onPress={handleItemPress} />
      ), []);

    return (
       <View style={styles.container}>
        <Text style={styles.header}>Bloggo.</Text>
        {error ? <Text style={styles.error}>{error.message}</Text> : null}
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            style={styles.container}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading ? <ActivityIndicator size="large" color="#000000" /> : null}
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