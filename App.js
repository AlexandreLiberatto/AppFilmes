import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, {useEstate,useEffect} from 'react';

export default function App() {

  const [movies, setMovies] = useState([]);
  const [abas, setAbas] = useState([]);

  useEffect(()=> {
    //requisição vai aqui
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=506fadb0256c13349acc05dabebf9604&language=en-US&page=1'){
      method: 'GET'
    }
    .then(response => response.json())
    .then(function(json){

      setMovies(json);


    })
  },[])


  if(movies != null){
     return(
      <View style={styles.container}>
        {
          movies.results.map(function(val){
            if(val.id == abas){
              return(              <View>
                <TouchableOpacity onPress={()=>setAbas(val.id)}>
                  <Text>{val.original_title}</Text>
                </TouchableOpacity>
                <Text>{val.overview}</Text>
              </View>
              )

            } else {
              return(
                <View>
                <TouchableOpacity onPress={()=>setAbas(val.id)}>
                  <Text>{val.original_title}</Text>
                </TouchableOpacity>
                </View>
              )
            }
          })
        }

      </View>
     )


  } else {
    return(
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    )
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
