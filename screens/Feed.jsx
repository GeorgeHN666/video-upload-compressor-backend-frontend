import { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Video, ResizeMode, Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { map } from 'lodash';
import PagerView from 'react-native-pager-view';
import InViewPort from "@coffeebeanslabs/react-native-inviewport";
import { Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const { width, height } = Dimensions.get("window")


Audio.setAudioModeAsync({
  interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
  interruptionModeIOS: InterruptionModeIOS.DoNotMix,
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

export default function Feed({ navigation }) {

  const TabHeight = useBottomTabBarHeight()
  const video = useRef({});
  const HorizontalSwiper = useRef();
  const [videoStatus, setVideoStatus] = useState('PLAY')
  const [videoID, setVideoID] = useState();
  const [refresh, setRefresh] = useState(false);
  const videoRef = useRef(null)


  useEffect(() => {
    navigation.addListener("tabPress", async (e) => {
      videoRef.current.pauseAsync()
      setVideoStatus('PAUSE')
    })
  }, [navigation])

  useEffect(() => {
    navigation.addListener('blur', () => {
      videoRef.current.pauseAsync()
      setVideoStatus('PAUSE')
    })
  })


  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} >
        <View style={{ height: (height - TabHeight), width: width, backgroundColor: 'green' }} >
          <PagerView
            orientation={'vertical'}
            style={{ width: '100%', height: '100%', backgroundColor: 'pink' }}

          >

            {map(CarrouselData, (item, key) => (
              <HorizontalCarrousel
                key={key}
                item={item}
                video={video}
                videoID={videoID}
                setRefresh={setRefresh}
                refresh={refresh}
                HorizontalSwiper={HorizontalSwiper}
                videoRef={videoRef}
                videoStatus={videoStatus}
                setVideoStatus={setVideoStatus}
                TabHeight={TabHeight}
              />
            ))}

          </PagerView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

function HorizontalCarrousel({ item, videoStatus, setVideoStatus,TabHeight,videoRef }) {

  const [scrollState, setScrollState] = useState('idle')



  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: 'red' }} >
      <PagerView
        style={{ width: '100%', height: '100%', backgroundColor: 'red' }} >
        {map(item.videos, (vid, key) => (
          <View
            style={{ width: '100%', height: '100%' }}
            key={key}
          >
            {vid.type === "video" ? (
              <VideoComponent
                key={key}
                vid={vid}
                item={item}
                videoRef={videoRef}
                scrollState={scrollState}
                videoStatus={videoStatus}
                setVideoStatus={setVideoStatus}
                TabHeight={TabHeight}
              />
            ) : (
              <Image
                style={{
                  width: '100%',
                  height: '100%'
                }}
                source={{ uri: vid.uri }}
              />
            )}
          </View>
        ))}
      </PagerView>
    </View>
  )
}

function VideoComponent({ item,vid, videoStatus, setVideoStatus,TabHeight,videoRef }) {


  const [visibility, setVisibility] = useState(false)
  const [currentVideo, setCurrentVideo] = useState();


  function HandlePlayback() {
    console.log(currentVideo)
    if (currentVideo !== null || currentVideo !== undefined) {
      console.log("In here")
      if (videoStatus === 'PLAY') {
        console.log("Playing to pause")
        console.log(videoRef.current.pauseAsync())
        setVideoStatus("PAUSE")
      } else {
        console.log("Pause to play")

        videoRef.current.playAsync();
        setVideoStatus('PLAY')
      }
    }
  }

  return (

    <InViewPort

      onChange={(isVisible) => {
        setCurrentVideo(vid.id)
        setVisibility(isVisible)
      }}
      as='View'
      style={{ width: '100%', height: '100%', backgroundColor: 'gray' }} >
      <VideoComp
        videoStatus={videoStatus}
        setVideoStatus={setVideoStatus}
        videoRef={videoRef}
        currentVideo={currentVideo}
        visibility={visibility}
        vid={vid}
      />

      <RenderInterface TabHeight={TabHeight} Info={item.info} />

      <View style={{ width: width, height: height - TabHeight, position: 'absolute', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
        <TouchableOpacity onPress={HandlePlayback} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }} >

          <Animated.View
            style={{
              opacity: 0.8,
              width: 60,
              height: 60
            }}
          >
            {videoStatus === 'PAUSE' ? (
              <MaterialCommunityIcons name="play-circle" size={60} color="red" />
            ) : (
              <MaterialCommunityIcons name="pause-circle" size={60} color="red" />
            )}
          </Animated.View>

        </TouchableOpacity>


      </View>
    </InViewPort>
  );
}

function VideoComp({ vid, videoRef, currentVideo, visibility}) {

  return (
    <Video
      style={{ width: '100%', height: '100%' }}
      ref={videoRef}
      source={{
        uri: vid.uri,
      }}
      // volume={0.0}
      isLooping={true}
      resizeMode={ResizeMode.CONTAIN}
      // shouldPlay={false}
      shouldPlay={visibility}
    />
  );
}

function RenderInterface({ TabHeight, Info }) {

  return (
    <View style={{ position: 'absolute', width: width, height: (height - TabHeight), flexDirection: 'column', justifyContent: 'space-between' }} >
      <View style={{ width: width, height: 40, marginTop: 18, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
        <View style={{ flexDirection: 'row', width: 'fit-content', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 }} >
          <Text style={{ fontSize: 20, fontWeight: 600, color: '#ffffff' }} >Explore</Text>
          <Text style={{ marginLeft: 18, fontSize: 20, fontWeight: 600, color: '#ffffff' }} >Feed</Text>
        </View>
      </View>
      <View style={{ width: width, paddingVertical: 20, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, width: width }} >
          <View style={{ width: 50, height: 50, borderRadius: 100, backgroundColor: 'red', overflow: 'hidden' }} >
            <Image source={{ uri: Info?.avatar }} style={{ width: '100%', height: "100%" }} />
          </View>
          <Text style={{ marginLeft: 18, width: 240, fontSize: 16, fontWeight: 600, height: 40, color: '#ffffff' }} >{Info?.title}</Text>
        </View>
        <View style={{ marginTop: 10, width: '90%', paddingVertical: 10 }} >
          <Text style={{ color: '#ffffff' }} numberOfLines={3} >{Info?.description}</Text>
        </View>
      </View>
    </View>
  )
}

let Data = [
  {
    info: {
      id: 1,
      avatar: "https://images.pexels.com/photos/3454298/pexels-photo-3454298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Welcome to Las Vegas and the LinkQ!!🤩 🥳",
      description: "We have an amazing trip to las vegas, thanks to Rogers to make this possible.",
    },
    uri: "https://player.vimeo.com/external/387095333.sd.mp4?s=5fe9f145581c4406e61798be30193fac54af1fc1&profile_id=164&oauth2_token_id=57447761"

  },
  {
    info: {
      id: 2,
      avatar: "https://images.pexels.com/photos/4307869/pexels-photo-4307869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Back again in the bahamas!! 🌴",
      description: "We are staying a whole week her folks, go get some beers. This year its been such adventure for me and may family, feeling blessed.",
    },
    uri: "https://player.vimeo.com/external/394718464.sd.mp4?s=e369f0eda883f16d097c348d9be0a5a7a3baf7e0&profile_id=165&oauth2_token_id=57447761"

  },
  {
    info: {
      id: 3,
      avatar: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Coffe time!!",
      description: "Good coffee and good company is all we ask in this life",
    },
    uri: "https://player.vimeo.com/external/436135164.sd.mp4?s=6e483fd51af9ce615ccb4070fd9d497a984080d6&profile_id=165&oauth2_token_id=57447761"

  },
  {
    info: {
      id: 4,
      avatar: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Talking about coffeeeeee!!🤭",
      description: "We are visiting the coffee farms here in new york",
    },
    uri: "https://player.vimeo.com/external/435820492.sd.mp4?s=ac169c4d275d59f3eb6710288a3a1b10982f71ce&profile_id=165&oauth2_token_id=57447761"

  },
  {
    info: {
      id: 5,
      avatar: "https://images.pexels.com/photos/6774998/pexels-photo-6774998.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Cinematic shoot at vietnam!",
      description: "Hey guys, we visited vietnam last week and we prepared a cinematic video of the beautiful views of vietnam.",
    },
    uri: "https://player.vimeo.com/external/387242416.sd.mp4?s=57e2d102f99b0c27b03d4db5fe9ca903b5646d41&profile_id=165&oauth2_token_id=57447761"

  },
  {
    info: {
      id: 6,
      avatar: "https://images.pexels.com/photos/5378700/pexels-photo-5378700.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Living life to the fullest",
      description: "I have been searching the meaning of life this couple of days, i think i finally found it!.",
    },
    uri: "https://player.vimeo.com/progressive_redirect/playback/796571425/rendition/360p/file.mp4?loc=external&oauth2_token_id=57447761&signature=53bc90b720ac458835348fad9deb202fa253368c955f9f6823a4cee5e0798167"

  },
  {
    info: {
      id: 7,
      avatar: "https://images.pexels.com/photos/7745573/pexels-photo-7745573.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "What a drama!",
      description: "Follow me on IG!",
    },
    uri: "https://player.vimeo.com/external/335851734.sd.mp4?s=7f4d1af280ea09cb3e594e6b43e028aefea55360&profile_id=164&oauth2_token_id=57447761"

  },
  {
    info: {
      id: 8,
      avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Doing what i love!",
      description: "Currently in a new project, i don't want to spoil but..... MARVEL!!!!!!",
    },
    uri: "https://player.vimeo.com/external/503932157.sd.mp4?s=e85273c787f615e0fa5e507e4889fb060e4fa988&profile_id=164&oauth2_token_id=57447761"

  },
  {
    info: {
      id: 9,
      avatar: "https://images.pexels.com/photos/5486199/pexels-photo-5486199.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Always face life front!!",
      description: "Follow my telegram channel, where i teach some tips!!",
    },
    uri: "https://player.vimeo.com/external/482969358.sd.mp4?s=3afac1c710ad7d7fe02ccd7999bc4457c9341350&profile_id=165&oauth2_token_id=57447761"

  },
  {
    info: {
      id: 10,
      avatar: "https://images.pexels.com/photos/4065187/pexels-photo-4065187.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Do good in this life people!!",
      description: "Helping people is one of my favorite things to do in this world",
    },
    uri: "https://player.vimeo.com/external/514618101.sd.mp4?s=d3865df3f5580caecff197585ff43068aded1105&profile_id=165&oauth2_token_id=57447761"

  },

]