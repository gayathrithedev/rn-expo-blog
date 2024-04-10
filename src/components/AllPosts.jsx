import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View, Text, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import ViewPost from './ViewPost';



const AllPosts = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState('');
    const [activePost, setActivePost] = useState(0);


    const getPosts = () => {
        setLoading(true);
        axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=20`).then((response) => {
            if(data?.length > 0) {
                setData([...data, ...response.data]);
            } else {
                setData(response.data);
            }
            console.log(response.headers["x-total-count"]);
            if(error) {
                setError(null);
            }
    }).catch((error) => { 
        setError(error); }).finally(() => { setLoading(false); });
    }

    useEffect(() => {  
        getPosts()
    }, [page]);

    const handleActivePost = useCallback((id) => { setActivePost(id) }, []);

    const renderItem = ({ item }) => {
        console.log(activePost, item.id, 'use callback')
        return (
            <TouchableOpacity style={styles.listItems} onPress={() => handleActivePost(item.id)}>
                <View style={styles.listItemWrapper}>
                <View style={styles.idContainer}>
                    <Text style={styles.idText}>{item.id}</Text>
                </View>
                <View style={styles.listItemRight}>
                    <Text style={styles.titleText}>{item.title}</Text>
                </View>
                </View>
                    {activePost === item.id ? (
                        <ViewPost id={item?.id} />
                    ): null}
            </TouchableOpacity>
        )
    }

    const handleOnEndReached = () => {
        setPage(page + 1);
    }

    return (
       <View>
        <TextInput placeholder="Search" style={styles.textInput} />
        {error ? <Text style={styles.error}>{error.message}</Text> : null}
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            style={styles.container}
            onEndReached={() => handleOnEndReached()}
            onEndReachedThreshold={0.7}
            ListHeaderComponent={() => {loading ? <ActivityIndicator size="large" color="#000000" /> : null}}
        />
       </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 24
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