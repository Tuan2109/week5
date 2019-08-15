import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { News, getNews } from './component/LoadingComponent';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      setLoading: "",
      news: "",
    }
  }

  componentDidMount() {
    getNews(this.state)
    .then((news) => {
      let loading = false;
      this.setState({news, loading});
    })
  }


  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <View style={styles.container}>
            <ActivityIndicator size="large" loading={this.state.loading} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.container}>
            <News props={this.state} />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
