import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ViewPost = (props) => {
    const {id} = props;
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const viewPost = () => {
        setLoading(true);
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then((response) => {
            console.log(response.data);
            setPost(response.data);
        }).catch((error) => {
            console.log(error);
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    }

    useMemo(() => {
        viewPost();
    }, [])
    return (
        <View style={styles.infoWrapper}>
            {loading ? <ActivityIndicator size="small" color="blue" /> : (
                <>
                    <Text style={styles.body}>{post.body}</Text>
                    <View style={styles.ctaWrapper}>
                        <Text style={styles.user}>Posted by User {post.userId}</Text>
                        <View>
                            <TouchableOpacity>
                                <Text>Share</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}
            
        </View>
    )
}

const styles = StyleSheet.create({
    infoWrapper: {
        padding: 16,
    },
    body: {
        fontSize: 12,
        marginVertical: 8
    },
    user: {
        fontSize: 10,
        color: 'gray'
    },
    ctaWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default ViewPost;