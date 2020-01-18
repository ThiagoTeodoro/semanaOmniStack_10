import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import ConfigAxios from '../config/ConfigAxios';
import { connect, disconnect, subscribeToNewDevs } from '../config/ConfigSocket';

function Main({ navigation }) {

    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState('');

    useEffect(() => {
        async function loadInitialPosition() {
            const {granted} = await requestPermissionsAsync();
            
            if(granted){

                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;
                
                setCurrentRegion({
                    latitude : latitude,
                    longitude : longitude,
                    latitudeDelta : 0.04,
                    longitudeDelta: 0.04,
                });

            }
        }

        // Chamando a função criada acima.
        loadInitialPosition();
    }, [])

    /**
     * Função que ira executar toda vez que a variavel
     * devs mudar.
     */
    useEffect(() => {

        // Esse [...devs, dev] copia todos os devs e adicionao novo dev no final
        
        // Esse Dev vai vim via injeção por que lá no evento do Socket eu consigo injetar
        // ele pois recebo isso do servidor.
        subscribeToNewDevs(dev => setDevs([...devs, dev]));


    }, [devs])

    function setupWebSocket(){
        // Se já tiver conectado vai desconectar primeiro, pois o evento aqui é baseado no botão.
        disconnect();

        const {latitude, longitude} = currentRegion;
                
        connect(latitude, longitude, techs);
    }

    async function loadDevs() {
        
        const {latitude, longitude } = currentRegion;

        const response = await ConfigAxios.get('/search', {
            params : {
                latitude : latitude,
                longitude : longitude,
                techs: techs
            }
        });

        setDevs(response.data.devs);
        setupWebSocket();
    };

    function handleRegionChanged(region) {
        setCurrentRegion(region);
    };

    // Só vamos mostrar alguma coisa no APP se tivemos a região do telefone.
    if(!currentRegion){
        
        return null;
    } else {

        return (     
            <>       
                <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map}>
                    {
                        devs.map(dev => {
                            return (
                                <Marker key={dev._id} coordinate={{latitude: dev.location.coordinates[1], longitude: dev.location.coordinates[0]}}>
                                    <Image style={styles.avatar} source={{uri: dev.avatar_url}} />
                                    <Callout onPress={() => {
                                        navigation.navigate('Profile', { github_username : dev.github_username});
                                    }}>
                                        <View style={styles.callout}>
                                            <Text style={styles.devName}>{dev.name}</Text>
                                            <Text style={styles.devBio}>{dev.bio}</Text>
                                            <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                                        </View>
                                    </Callout>
                                </Marker>
                            );
                        })
                    }        

                </MapView>   
                <View style={styles.searchForm}>
                    <TextInput 
                        style={styles.searchInput} 
                        placeholder="Buscar devs por techs..."
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false}
                        value={techs}
                        onChangeText={text => setTechs(text)}
                    />
                    <TouchableOpacity 
                        style={styles.loadButton} 
                        onPress={loadDevs}>
                        <MaterialIcons
                            name="my-location"
                            size={20}
                            color="#FFF"
                        />
                    </TouchableOpacity>
                </View>         
            </>
        );
    }

}

const styles = StyleSheet.create({
    map: {
        flex : 1
    },
    avatar: {
        width: 54,
        height: 54, 
        borderRadius : 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },

    callout: {
        width: 260,
    },

    devName : {
        fontWeight: 'bold',
        fontSize: 16,
    },

    devBio : {
        color: '#666',
        marginTop : 5,
    },

    devTechs : {
        marginTop: 5
    },

    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20 ,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    }, 

    loadButton : {
        width: 50,
        height: 50,
        backgroundColor: '#8E4Dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    }
    
})

export default Main;