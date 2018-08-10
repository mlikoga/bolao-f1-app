import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pole: '',
      bets: [{ name: 'Hamilton' },
             { name: 'Bottas' },
             { name: 'Vettel' },
             { name: 'Raikkonen' },
             { name: 'Ricciardo' },
             { name: 'Verstappen' },
             { name: 'Alonso' }]
    }
  }

  _setPolePosition(index) {
    this.setState(previousState => {
      return { pole: previousState.bets[index].name}
    });
  }

  _onPressButtonUp(index) {
    this.setState(previousState => {
      if (index > 0) {
        newBets = previousState.bets;
        this.swap(newBets, index - 1, index);
        return { bets: newBets };
      }
    });
  }

  _onPressButtonDown(index) {
    this.setState(previousState => {
      if (index < previousState.bets.length - 1) {
        newBets = previousState.bets;
        this.swap(newBets, index, index + 1);
        return { bets: newBets };
      }
    });
  }

  swap(list, idx1, idx2) {
    list[idx1] = list.splice(idx2, 1, list[idx1])[0];
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Pole: {this.state.pole}</Text>

        <FlatList style={styles.list}
          data={this.state.bets}
          extraData={this.state}
          keyExtractor={(item) => item.name}
          renderItem={({item, index}) =>
            <View style={styles.listitem}>
              <Text>{index + 1}. {item.name}</Text>
              <TouchableOpacity onPress={() => this._setPolePosition(index)}>
                <Image
                  style={styles.button}
                  source={require('./img/f1-helmet.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._onPressButtonUp(index)}>
                <Image
                  style={styles.button}
                  source={require('./img/arrow-up.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._onPressButtonDown(index)}>
                <Image
                  style={styles.button}
                  source={require('./img/arrow-down.png')}
                />
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    alignSelf: 'stretch',
  },
  listitem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    height: 10,
    width: 10,
  },
});
