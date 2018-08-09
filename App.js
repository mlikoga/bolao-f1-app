import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pole: '',
      bets: ['Hamilton', 'Bottas', 'Vettel', 'Raikkonen', 'Verstappen', 'Ricciardo'],
    };
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

        <FlatList
          data={this.state.bets}
          extraData={this.state}
          renderItem={({item, index}) =>
            <View style={styles.listitem}>
              <Text>{item}</Text>
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
