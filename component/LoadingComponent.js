import React from 'react';
import { StyleSheet, Text, View, FlatList, Linking } from 'react-native';
import moment from 'moment';
import { Card, Button } from 'react-native-elements';

export const News = function (props) {
    return (
        <FlatList
            data={props.news}
            renderItem={renderArticleItem}
            keyExtractor={item => item.title}
            ListFooterComponent={props.renderFooter}
            onEndReached={props.getNews}
            onEndReachedThreshold={0.5}
        />
    );
}

const onPress = url => {
    Linking.canOpenURL(url).then(supported => {
        if (supported) {
            Linking.openURL(url);
        } else {
            console.log(`Don't know how to open URL: ${url}`);
        }
    });
};

const renderArticleItem = ({ item }) => {
    return (
        // urlToImage
        <Card title={item.title} image={{ uri: item.urlToImage }}>
            <View style={styles.row}>
                <Text style={styles.label}>Source</Text>
                <Text style={styles.info}>{item.source.name}</Text>
            </View>
            <Text>{item.content}</Text>
            <View style={styles.row}>
                <Text style={styles.label}>Published</Text>
                <Text style={styles.info}>
                    {moment(item.publishedAt).format('LLL')}
                </Text>
            </View>
            <Button
                title="Read more"
                backgroundColor="#03A9F4"
                onPress={() => onPress(item.url)}
            />
        </Card>
    );
};

export const renderViewMore = () => {
    return (
        <Text onPress={onPress}>View more</Text>
    )
}

export const renderViewLess = () => {
    return (
        <Text onPress={onPress}>View less</Text>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    containerFlex: {
        flex: 1,
        alignItems: 'center',
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

