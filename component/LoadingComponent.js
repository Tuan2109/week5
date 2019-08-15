import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';

export const getNews = async function (props) {
    const news = await fetch(
        'https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=3f72e8032a804760b7f08ba98fa711f8'
    );
    return news.json();
}

export const News = function (props) {
    console.log(props);
    return (
        <View style={styles.container}>
            <FlatList
                data={props.news}
                renderItem={renderArticleItem}
                keyExtractor={item => item.title}
            />
        </View>
    );
}

const renderArticleItem = ({ item }) => {
    console.log(item, "hello");
    // return (
    //     <Card title={item.title} image={item.urlToImage}>
    //         <View style={styles.row}>
    //             <Text style={styles.label}>Source</Text>
    //             <Text style={styles.info}>{item.source.name}</Text>
    //         </View>
    //         <Text style={styles}>{item.content}</Text>
    //         <View style={styles.row}>
    //             <Text style={styles.label}>Published</Text>
    //             <Text style={styles.info}>
    //                 {moment(item.publishedAt).format('LLL')}
    //             </Text>
    //         </View>
    //         <Button icon={<Icon />} title="Read more" backgroundColor="#03A9F4" />
    //     </Card>
    // );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerFlex: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        marginTop: 40,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    header: {
        height: 30,
        width: '100%',
        backgroundColor: 'pink'
    },
    row: {
        flexDirection: 'row'
    },
    label: {
        fontSize: 16,
        color: 'black',
        marginRight: 10,
        fontWeight: 'bold'
    },
    info: {
        fontSize: 16,
        color: 'grey'
    }
});

