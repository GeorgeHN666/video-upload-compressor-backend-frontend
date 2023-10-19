import { View, Text, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import PagerView from 'react-native-pager-view'
import { Audio, InterruptionModeAndroid, InterruptionModeIOS, ResizeMode, Video } from 'expo-av'
import { map } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import InViewPort from '@coffeebeanslabs/react-native-inviewport'

const { width, height } = Dimensions.get("window")
Audio.setAudioModeAsync({
    interruptionModeAndroid : InterruptionModeAndroid.DoNotMix,
    interruptionModeIOS : InterruptionModeIOS.DoNotMix,
})

export default function Videos({ navigation }) {
    const RealHeight = (height - useBottomTabBarHeight())
    const videoRef = useRef({})
    const [playbackStatus, setPlaybackStatus] = useState('PLAY')
    const [currentVideo, setCurrentVideo] = useState(0)

    useEffect(() => {
        const Feed = navigation.addListener("focus", () => {
            if(currentVideo !== 0) {
              console.log(currentVideo)
                videoRef.current[currentVideo].playAsync()
                setPlaybackStatus('PAUSE')

          }
        })

        return () => Feed();
      })

    useEffect(() => {
        navigation.addListener('blur', () => {
            if (videoRef !== null || videoRef !== undefined) {
                if (currentVideo !== 0) {
                    videoRef.current[currentVideo].pauseAsync()
                    setPlaybackStatus('PAUSE')
                }    

            }
        })
    })

    let CarrouselData = [
        {
            info: {
                id: 1,
                avatar: "https://images.pexels.com/photos/3454298/pexels-photo-3454298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                title: "Welcome to Las Vegas and the LinkQ!!🤩 🥳",
                description: "We have an amazing trip to las vegas, thanks to Rogers to make this possible.",
            },
            videos: [

                {
                    id: 3099862,
                    type: "video",
                    uri: "https://player.vimeo.com/external/394718464.sd.mp4?s=e369f0eda883f16d097c348d9be0a5a7a3baf7e0&profile_id=165&oauth2_token_id=57447761"

                },
                {
                    id: 398749,
                    type: "image",
                    uri: "https://images.pexels.com/photos/18309072/pexels-photo-18309072/free-photo-of-close-up-of-a-couple-holding-hands.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                },
                {
                    id: 3099,
                    type: "video",
                    uri: "https://player.vimeo.com/external/387095333.sd.mp4?s=5fe9f145581c4406e61798be30193fac54af1fc1&profile_id=164&oauth2_token_id=57447761"

                },
                {
                    id: 603848,
                    type: "image",
                    uri: "https://images.pexels.com/photos/13884280/pexels-photo-13884280.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                },
            ]
        },
        {
            info: {
                id: 2,
                avatar: "https://images.pexels.com/photos/4307869/pexels-photo-4307869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                title: "Back again in the bahamas!! 🌴",
                description: "We are staying a whole week her folks, go get some beers. This year its been such adventure for me and may family, feeling blessed.",
            },
            videos: [
                {
                    id: 309986238263,
                    type: "video",
                    uri: "https://player.vimeo.com/progressive_redirect/playback/796571425/rendition/360p/file.mp4?loc=external&oauth2_token_id=57447761&signature=53bc90b720ac458835348fad9deb202fa253368c955f9f6823a4cee5e0798167"

                },
                {
                    id: 309902526,
                    type: "video",
                    uri: "https://player.vimeo.com/external/436135164.sd.mp4?s=6e483fd51af9ce615ccb4070fd9d497a984080d6&profile_id=165&oauth2_token_id=57447761"

                }
            ]
        },

    ]

    function PlaybackHandler() {
        if (videoRef !== null || videoRef !== undefined) {
            if (currentVideo !== 0) {
                if (playbackStatus === "PLAY") {
                    console.log("Trying to pause")
                    console.log(currentVideo)
                    videoRef.current[currentVideo].pauseAsync()
                    setPlaybackStatus('PAUSE')
                } else {
                    console.log(currentVideo)
                    console.log("Trying to play")
                    videoRef.current[currentVideo].playAsync()
                    setPlaybackStatus('PLAY')
                }
            }

        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <FlatList
                    data={CarrouselData}
                    pagingEnabled={true}
                    renderItem={({ item }) => (
                        <MediaWrapper
                            item={item}
                            RealHeight={RealHeight}
                            PlaybackHandler={PlaybackHandler}
                            videoRef={videoRef}
                            currentVideo={currentVideo}
                            setCurrentVideo={setCurrentVideo}
                        />
                    )}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

function MediaWrapper({ item, RealHeight, PlaybackHandler, videoRef, currentVideo, setCurrentVideo }) {

    return (
        <View
            style={{ width: width, height: RealHeight, position: 'relative', justifyContent: 'flex-end', backgroundColor: 'black' }} >

            <PagerView style={{ width: width, height: RealHeight }} >
                {map(item.videos, (media, key) => (
                    <InViewPort
                        onChange={(isVisible) => {
                            if (isVisible) {
                                setCurrentVideo(media.id)
                            }
                        }}
                        key={key}
                        style={{ width: width, height: RealHeight }}
                    >
                        {media.type === 'video' ? (
                            <VideoReproducer
                                RealHeight={RealHeight}
                                media={media}
                                videoRef={videoRef}
                                PlaybackHandler={PlaybackHandler}
                                currentVideo={currentVideo}
                            />
                        ) : (
                            <ImageViewer
                                RealHeight={RealHeight}
                                URI={media.uri}
                            />
                        )}
                    </InViewPort>
                ))}
            </PagerView>
            <InfoView
                RealHeight={RealHeight}
                info={item.info}
            />
        </View>
    );
}

function ImageViewer({ RealHeight, URI }) {
    return (
        <Image
            style={{ width: width, height: RealHeight }}
            source={{ uri: URI }}
        />

    );
}

function VideoReproducer({ RealHeight,  media, PlaybackHandler, currentVideo,videoRef }) {
    return (
        <PlaybackSection
            PlaybackHandler={PlaybackHandler}
            RealHeight={RealHeight}
        >
            <Video
                ref={ref => videoRef.current[media.id] = ref}
                style={{ width: width, height: RealHeight }}
                resizeMode={ResizeMode.CONTAIN}
                source={{ uri: media.uri }}
                isLooping
                DoNotMix={1}
                shouldPlay={currentVideo === media.id}
            />
        </PlaybackSection>

    );
}

function InfoView({ RealHeight, info }) {
    return (
        <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center', position: 'absolute' }} >
            <LinearGradient
                style={{ width: '100%', paddingVertical: 20 }}
                colors={["#00000000", "#00000068"]}
                locations={[0, 0.2]}
            >
                <View
                    style={{ width: '90%', flexDirection: 'row', alignItems: 'center' }}
                >
                    <View style={{ width: 35, height: 35, overflow: 'hidden', borderRadius: 100 }} >
                        <Image
                            style={{ flex: 1 }}
                            source={{ uri: info.avatar }}
                        />
                    </View>
                    <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 600, color: '#fbfaf8' }} >{info.title}</Text>
                </View>
                <View style={{ width: '90%', paddingVertical: 10 }} >
                    <Text style={{ color: '#fbfaf8' }} numberOfLines={3} >
                        {info.description}
                    </Text>
                </View>
            </LinearGradient>
        </View>
    );
}

function PlaybackSection({ RealHeight, PlaybackHandler, children }) {

    return (
        <TouchableOpacity

            onPress={PlaybackHandler}
            activeOpacity={0.94}
            style={{ width: width, height: RealHeight, backgroundColor: 'rgba(0, 0, 0, 0.10)', position: 'absolute' }} >
            {children}
        </TouchableOpacity>
    );
}