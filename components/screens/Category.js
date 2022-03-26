import React, { useState, useContext } from 'react';
import { SearchBar } from 'react-native-elements';
import { View } from 'react-native';
import ModalAnime from '../ModalAnime';
import Provider from '../SearchProvider'
import { AnimeContext } from "../API/Context";
import AnimeList from '../AnimeList'
import { ScrollView, Dimensions } from 'react-native';

export default function Category() {
  const { darkTheme } = useContext(AnimeContext);
  const screen = Dimensions.get("screen");
  const [Data, setData] = useState([])
  const [userInput, setUserInput] = useState()
  const [Visible, setVisible] = useState(false)
  const [Target, setTarget] = useState()
  const [SearchValue, setSearchValue] = useState()

  const categoriesList = ['1', '27', '36', '6', '7', '24', '4', '30', '21']

  return (
    <ScrollView style={{ backgroundColor: darkTheme ? "#282C35" : "white" }} >

      <View style={{
        backgroundColor: darkTheme ? '#282C35' : 'white',
        width: screen.width,
      }}>

        <SearchBar
          returnKeyType='search'
          placeholder='Enter an anime name...'
          multiline={false}
          searchIcon={{ size: 25 }}
          inputStyle={{
            backgroundColor: darkTheme ? '#282C35' : '#f2f2f2',
            borderRadius: 15
          }}
          inputContainerStyle={{
            backgroundColor: darkTheme ? '#282C35' : '#f2f2f2',
            borderRadius: 15
          }}
          leftIconContainerStyle={{
            backgroundColor: darkTheme ? '#282C35' : '#f2f2f2',
            borderRadius: 15
          }}
          containerStyle={{
            backgroundColor: darkTheme ? '#212121' : 'white',
            borderWidth: 0,
            shadowColor: 'white',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent'
          }}
          onChangeText={(value) => setUserInput(value)}
          value={userInput}
          onSubmitEditing={() => setSearchValue(userInput)}
          onClear={() => setSearchValue(null)}
        />
      </View>
      {
        !SearchValue ?
          categoriesList.map(categoryId => (
            <View key={categoryId}>

              <AnimeList
                id={categoryId}
                setTarget={setTarget}
                setVisible={setVisible}
              />
            </View>

          ))

          :
          <Provider
            Data={Data}
            setData={setData}
            SearchValue={SearchValue}
            setTarget={setTarget}
            setVisible={setVisible} />
      }
      {
        Target ?
          <ModalAnime
            Visible={Visible}
            setVisible={setVisible}
            Target={Target}
          />
          :
          <View style={{ backgroundColor: '#f2f2f2' }}>
          </View>
      }
    </ScrollView>
  );
}


