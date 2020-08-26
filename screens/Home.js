import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Alert,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Button,
  Dimensions,
} from 'react-native';
const axios = require('axios');

const {height, width} = Dimensions.get('window');
const Home = () => {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = () => {
    setLoading(true);
    axios
      .get('https://itunes.apple.com/search', {
        params: {
          term: value,
        },
      })
      .then(function (response) {
        if (response) {
          setData(response.data.results);
          setLoading(false);
        }
      })
      .catch(function (error) {
        Alert.alert(error);
      })
      .then(function () {
        // always executed
      });
  };
  return (
    <ScrollView style={{flex: 1, padding: 32, backgroundColor: '#fff'}}>
      <SafeAreaView />
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 22}}>iTunes Music</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextInput
            placeholder="Search..."
            style={{
              height: 40,
              borderColor: '#999998',
              borderWidth: 1,
              padding: 12,
              borderRadius: 5,
              flex: 1,
            }}
            onChangeText={(text) => setValue(text)}
            value={value}></TextInput>
          <View style={{marginLeft: 12, marginRight: 2}}>
            <Button
              onPress={search}
              color="#999998"
              type="outline"
              title="Search"
            />
          </View>
        </View>
      </View>
      {!loading && data.length === 0 ? (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: 32,
            alignItems: 'center',
          }}>
          <Text>No Music</Text>
        </View>
      ) : null}
      {loading && (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            marginTop: 32,
          }}>
          <ActivityIndicator color="#000" size="large" />
        </View>
      )}
      <View style={{marginBottom: 52}}>
        {data &&
          data.map((item, index) => {
            if (item.trackName) {
              return (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginTop: 16,
                    height: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  key={index}>
                  <View style={{flexDirection: 'column'}}>
                    <Image
                      style={{height: 80, width: 80, borderRadius: 10}}
                      source={{uri: item.artworkUrl100}}></Image>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      marginLeft: 16,
                    }}>
                    <Text numberOfLines={1}>{item.trackName}</Text>
                    <Text
                      style={{marginTop: 4, color: '#999998'}}
                      numberOfLines={1}>
                      {item.artistName}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'column', marginLeft: 16}}>
                    <Text style={{color: '#999998'}} numberOfLines={1}>
                      {item.trackPrice} $
                    </Text>
                  </View>
                </View>
              );
            }
          })}
      </View>
    </ScrollView>
  );
};

export default Home;
