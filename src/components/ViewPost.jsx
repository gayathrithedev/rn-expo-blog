import React, { useState, useMemo, memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Share } from 'react-native';

import {useRoute, useNavigation} from '@react-navigation/native'
import axios from 'axios';

const ViewPost = () => {
    const {params} = useRoute();
    const {id} = params;
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onShare = async () => {
        try {
          const result = await Share.share({
            title: `User ${post?.userId} posted this:`,
            message: post?.title,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          Alert.alert(error.message);
        }
      };

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
    const navigation = useNavigation();

    useMemo(() => {
        viewPost();
    }, [])
    return (
            <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.goBackText}>Go Back</Text>
                </TouchableOpacity>
            <Text style={styles.heading}>Post Details</Text>
            </View>
                {loading ? <ActivityIndicator size="small" color="blue" /> : (
                    <>
                        <Text style={styles.title}>{post.title}</Text>
                        <Text style={styles.body}>{post.body}</Text>
                        <View style={styles.ctaWrapper}>
                            <Text style={styles.user}>Posted by User {post.userId}</Text>
                            <View>
                                <TouchableOpacity style={styles.shareBtn} onPress={onShare}>
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
    shareBtn: {
        backgroundColor: '#d3d3d3',
        padding: 8,
        borderRadius: 4
    },
    goBackText: {
        color: 'blue',
        marginRight: 24
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16,
        borderBottomWidth: 0.6,
        borderBottomColor: '#f2f2f2',
        marginHorizontal: -16,
        paddingHorizontal: 16,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        paddingTop: 30,
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
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
        paddingTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default ViewPost;