import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  Alert,
  SafeAreaView,
} from 'react-native';
const axios = require('axios');

const Home = () => {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://itunes.apple.com/search', {
        params: {
          term: value,
        },
      })
      .then(function (response) {
        // console.log(response);
        setData(response.results);
      })
      .catch(function (error) {
        // console.log(error);
        Alert.alert(error);
      })
      .then(function () {
        // always executed
      });
  }, [value]);

  const search = (text) => {
    // console.log(text);
    setValue(text);
  };

  const renderItem = ({item}) => {
    console.log(item);
    return (
      <View>
        <Text>{item.trackName}</Text>
      </View>
    );
  };
  return (
    <ScrollView style={{flex: 1, flexDirection: 'column', padding: 32}}>
      <SafeAreaView />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          //   backgroundColor: 'red',
          padding: 16,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 22}}>iTunes Music</Text>
      </View>
      <View>
        <TextInput
          placeholder="Search..."
          style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 12}}
          onChangeText={(text) => search(text)}
          value={value}
        />
      </View>
      <View>
        {data && (
          <FlatList
            data={data}
            // renderItem={renderItem}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <View>
                <Text>{item.trackName}</Text>
              </View>
            )}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Home;
