import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput } from 'react-native';
import { News } from './component/LoadingComponent';
import { getLinkApi } from './component/ApiComponent';
import { Button } from 'react-native-elements';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      setLoading: "",
      news: "",
      getNews: this._getArticles,
      footerCallback: false,
      emptyData: false,
      publishers: {},
      textSearch: "",
      localNews: "",
    }
  }

  componentDidMount() {
    this._getArticles();
  }

  _renderFooter = () => {
    if (!this.state.footerCallback)
      return (
        <ActivityIndicator size="large" color="#00ff00" animating={this.state.loading} />
      )
    else
      return (
        <ActivityIndicator size="small" color="#00ff00" animating={!this.state.loading} />
      )
  }

  _getPublishers = (articles) => {
    let publishers = {
    };
    articles.map(item => {
      let key = item.author;
      if (publishers[key]) {
        publishers[key] += 1;
      } else {
        publishers[key] = 1;
      }
    });
    return publishers;
  }

  _getArticles = async () => {
    try {
      if (!this.state.emptyData) {
        let linkApi = getLinkApi();
        let response = await fetch(linkApi);
        let temp = await response.json();
        let emptyData = false;
        if (temp.articles.length == 0)
          emptyData = true;
        let news = [...this.state.news, ...temp.articles];
        let loading = false;

        let publishers = this._getPublishers(temp.articles);

        this.setState({ news, loading, emptyData, footerCallback: true, publishers });
      } else {
        this.setState({ footerCallback: false });
        alert("No more articles!!! See you soon");
      }
    } catch (exception) {
      console.log(exception);
      this.setState({ footerCallback: false });
      alert("Can't get data from your API, please check API and reload");
    }
  }

  _onSearch = () => {
    let upperSearch = this.state.textSearch.toUpperCase();
    let news = [];
    let localNews = news;
    this.state.news.map(item => {
      if (item.title.toUpperCase().indexOf(upperSearch) > -1)
        news.push(item);
    });
    this.setState({ news, localNews });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <View style={styles.container}>
            {
              this._renderFooter()
            }
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.search}>
            <View style={styles.inputSearch}>
              <TextInput
                style={styles.textInput}
                defaultValue="Title of Article"
                onChangeText={(textSearch) => this.setState({ textSearch })}
                value={this.state.text}
              />
            </View>
            <View style={styles.btnSearch}>
              <Button
                title="Search"
                backgroundColor="#03A9F4"
                onPress={() => this._onSearch()}
                style={styles.buttonSearch}
              />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Articles Count:</Text>
            <Text style={styles.info}>{this.state.news.length}</Text>
          </View>
          <View style={styles.flatList}>
            <News
              news={this.state.news}
              loading={this.state.loading}
              getNews={this._getArticles}
              renderFooter={this._renderFooter}
            />
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
  search: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  row: {
    flex: 0.05,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 10,
  },
  flatList: {
    flex: 0.85,
  },

  label: {
    fontSize: 20,
    color: 'black',
    marginRight: 10,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 20,
    color: 'grey'
  },
  inputSearch: {
    paddingRight: 10,
    flex: 0.7,
  },
  btnSearch: {
    flex: 0.3,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
