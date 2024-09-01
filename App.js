import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=506fadb0256c13349acc05dabebf9604&language=en-US&page=1')
      .then(response => response.json())
      .then(json => {
        setMovies(json.results);
      })
      .catch(error => console.error('Erro ao buscar os filmes:', error));
  }, []);

  const renderMovie = ({ item }) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate('Details', { movie: item })}
    >
      <Text style={styles.movieTitle}>{item.original_title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

function DetailsScreen({ route }) {
  const { movie } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.movieTitle}>{movie.original_title}</Text>
      <Text style={styles.movieOverview}>{movie.overview}</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Filmes Populares' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalhes do Filme' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  list: {
    alignItems: 'center',
  },
  movieItem: {
    backgroundColor: '#333',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  movieTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieOverview: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});
