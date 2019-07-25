import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image, Animated, ActivityIndicator
} from 'react-native';
import { Button, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import SvgUri from 'react-native-svg-uri';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import { LinearGradient } from 'expo-linear-gradient';
import { DrawerActions } from 'react-navigation';
import LottieView from 'lottie-react-native';

export default class HomeScreen extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            movies: [],
            status: null,
           
        };
    }
    componentWillMount() {
        this.setState({ status: 'Chargement des films en cours ...' });
        
    };
    componentDidMount() {
        fetch('https://feelmapp.herokuapp.com/listMovies').then(response => {
            return response.json();
        }).then(dataFilms => {
            // var films =JSON.parse(dataFilms);
            console.log('======== Films =======', dataFilms.movie[1]._id, dataFilms.movie.poster_path);
            var filmCopy = [];
            for (let i = 0; i < dataFilms.movie.length; i++) {
                filmCopy.push({

                    affiche: dataFilms.movie[i].poster_path,

                })
                this.setState({ movies: filmCopy, state: null});
            }

            console.log('FilmCopy -----', filmCopy)
           
        }).catch(err => {
            console.log(err);
        });

    };
    render() {
        const loading  = this.state;
        var filmsCard = this.state.movies.map((AffichesFilms, i) => {
            console.log('====== Boucle films', AffichesFilms)
            
            return (
                <Card key={i}><Image  style={styles.card} source={{ uri: 'https://image.tmdb.org/t/p/w500' + AffichesFilms.affiche }} /></Card>
                
            )
        })
       
        

        // 
        return (
            <View style={styles.container}>
                
                <Header  // // // // // // // // // // // // // //   Header  // // // // // // //  // // // // // // // 
                    barStyle="light-content"
                    leftComponent={<Button containerStyle={styles.ButtonMood}
                        type="clear"
                        onPress={() => { this.props.navigation.dispatch(DrawerActions.openDrawer()) }}
                        icon={
                            <SvgUri
                                width="30"
                                height="30"
                                color='#fff'
                                source={require('../../assets/icones/svg/menu.svg')}
                                style={{ marginLeft: 15, }}
                                 />
                        }
                        /> }
                    centerComponent={<Image style={{ width: 110, height: 25,}} source={require('../../assets/logo_feelm.png')}/>}
                    containerStyle={{ backgroundColor: 'rgba(19,23,47,0)', justifyContent: 'space-around', borderBottomColor: 'rgba(19,23,47,0)', zIndex:100 }}
                />
               
                <View style={{marginTop:100}}>
                    
                    <LinearGradient
                        colors={['rgba(19,23,47,0)', 'rgba(19,23,47,1)', 'rgba(19,23,47,1)',]}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            height: '100%',
                        }}
                    />
                    

                <CardStack
                    style={styles.content}
                    renderNoMoreCards={() => <Text style={{ fontWeight: '700', fontSize: 18, color: 'gray' }}>Aucun film à proposer :(</Text>}   
                    ref={swiper => {
                        this.swiper = swiper
                    }}
                        disableBottomSwipe={true}
                        disableTopSwipe={true}
                    onSwiped={() => console.log('onSwiped')}
                    onSwipedLeft={() => console.log('onSwipedLeft')}
                >
                        {filmsCard.sort(function (a, b) { return 0.5 - Math.random() })}

                </CardStack>
                        <Image style={{ width: '100%', height: '100%', marginTop: -200, zIndex: -100, opacity: 0.2,  }} source={require('../../assets/fil_BG.jpg')} />
                    
                <View style={{alignItems:'center'}}>   
                <View style={styles.footer}>
                       
                            <TouchableOpacity style={[styles.button, styles.red]} onPress={() => {
                                this.swiper.swipeLeft();
                            }}>
                                <SvgUri source={require('../../assets/close.svg')} width="28"
                                    height="28" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.orange]}
                                onPress={() => this.props.navigation.navigate('Film')} >
                                <SvgUri source={require('../../assets/play.svg')} width="40"
                                    height="40" style={{ marginLeft: 5, }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.green]} onPress={() => {
                                this.swiper.swipeRight();
                            }}>
                                <SvgUri source={require('../../assets/check-mark.svg')} width="28"
                                    height="28" />
                            </TouchableOpacity>


               </View>
               <View style={styles.footer2}>
                        <TouchableOpacity style={[styles.button, styles.blue]} onPress={() => {
                            this.swiper.goBackFromLeft();
                        }}>
                            <SvgUri source={require('../../assets/icones/svg/go-back.svg')} width="28"
                                height="28" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.yellow]} onPress={() => {
                            this.swiper.swipeRight();
                        }}>
                            <SvgUri source={require('../../assets/icones/svg/fav.svg')} width="28"
                                height="28" />
                        </TouchableOpacity>
                </View> 
             </View>             
                </View>
               
                </View>
                        
            
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#13172F'
    },
    Mood: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginRight: 15,
        marginLeft: 15,
    },

    
    TitleButton: {
        fontWeight: 'bold',
        flexDirection: 'column',
        marginLeft: 20,
    },
    content: {
        alignItems: 'center',
    },
    card: {
       marginTop:-20,
        width: 300,
        height: 470,
        borderRadius: 10,
        shadowColor: 'rgba(19,23,47,1)',
        shadowOffset: {
            width: 5,
            height: 10
        },
        shadowOpacity: 1,
    },
    card1: {
        backgroundColor: '#FE474C',
    },
    card2: {
        backgroundColor: '#FEB12C',
    },
    
    footer: {
        marginTop: -20,
        width: 220,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10000
    },
    footer2: {
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        zIndex: 10000
    },
    buttonContainer: {
        width: 220,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    
    button: {
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
    },
    orange: {
        width: 80,
        height: 80,
        borderWidth: 6,
        backgroundColor: '#13172F',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 55,
        marginTop: -30
    },
    green: {
        width: 50,
        height: 50,
        backgroundColor: '#3DB39E',
        borderRadius: 75,
        borderWidth: 6,
        borderColor: '#3DB39E',
    },
    red: {
        width: 50,
        height: 50,
        backgroundColor: '#DD2E44',
        borderRadius: 75,
        borderWidth: 6,
        borderColor: '#DD2E44',
    },
    yellow: {
        width: 50,
        height: 50,
        backgroundColor: '#E5C92F',
        borderRadius: 75,
        borderWidth: 6,
        marginLeft:15,
        borderColor: '#E5C92F',
    },
    blue: {
        width: 50,
        height: 50,
        backgroundColor: '#1C213E',
        borderRadius: 75,
        borderWidth: 6,
        marginRight:15,
        borderColor: '#1C213E',
    }
});