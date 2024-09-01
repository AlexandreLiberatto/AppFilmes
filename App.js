import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
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
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.movieImage}
      />
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
        numColumns={2} // Para exibir os filmes em duas colunas
      />
    </View>
  );
}

function DetailsScreen({ route }) {
  const { movie } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.detailImage}
      />
      <Text style={styles.movieTitle}>{movie.original_title}</Text>
      <Text style={styles.movieOverview}>{movie.overview}</Text>
      <Text style={styles.movieReleaseDate}>Data de lançamento: {movie.release_date}</Text>
      <Text style={styles.movieRating}>Avaliação: {movie.vote_average}</Text>
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
    justifyContent: 'space-between',
  },
  movieItem: {
    backgroundColor: '#333',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '45%', // Ajuste para o layout de duas colunas
  },
  movieImage: {
    width: '100%',
    height: 250,
    borderRadius: 8,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  detailImage: {
    width: '100%',
    height: 450,
    borderRadius: 8,
    marginBottom: 15,
  },
  movieOverview: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  movieReleaseDate: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 5,
  },
  movieRating: {
    color: '#ffcc00',
    fontSize: 16,
    marginTop: 10,
  },
});
