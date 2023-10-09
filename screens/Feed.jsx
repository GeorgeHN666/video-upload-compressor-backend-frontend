import { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Video, ResizeMode, Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { Viewport } from '@skele/components'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Animatable from 'react-native-animatable'
import { Animated } from 'react-native';

const { width, height } = Dimensions.get("window")

const ViewAware = Viewport.Aware(View)

Audio.setAudioModeAsync({
  interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
  interruptionModeIOS: InterruptionModeIOS.DoNotMix,
})

export default function Feed({ navigation }) {

  const TabHeight = useBottomTabBarHeight()
  const video = useRef({});
  const [currentIndex, setCurrentIndex] = useState(0)
  const [status, setStatus] = useState('PLAY')

  useEffect(() => {
    const Feed = navigation.addListener("tabPress", async (e) => {
      video.current[currentIndex].pauseAsync()
      setStatus('PAUSE')
    })
  }, [navigation])

  useEffect(() => {
    const out = navigation.addListener('blur', () => {
      video.current[currentIndex].pauseAsync()
      setStatus('PAUSE')
    })
  })

  let Data = [
    {
      info: {
        id: "1",
        avatar: "https://images.pexels.com/photos/3454298/pexels-photo-3454298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Welcome to Las Vegas and the LinkQ!!🤩 🥳",
        description: "We have an amazing trip to las vegas, thanks to Rogers to make this possible.",
      },
      uri: "https://player.vimeo.com/external/387095333.sd.mp4?s=5fe9f145581c4406e61798be30193fac54af1fc1&profile_id=164&oauth2_token_id=57447761"

    },
    {
      info: {
        id: "2",
        avatar: "https://images.pexels.com/photos/4307869/pexels-photo-4307869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        title: "Back again in the bahamas!! 🌴",
        description: "We are staying a whole week her folks, go get some beers. This year its been such adventure for me and may family, feeling blessed.",
      },
      uri: "https://player.vimeo.com/external/394718464.sd.mp4?s=e369f0eda883f16d097c348d9be0a5a7a3baf7e0&profile_id=165&oauth2_token_id=57447761"

    },
    {
      info: {
        id: "3",
        avatar: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=600",
        title: "Coffe time!!",
        description: "Good coffee and good company is all we ask in this life",
      },
      uri: "https://player.vimeo.com/external/436135164.sd.mp4?s=6e483fd51af9ce615ccb4070fd9d497a984080d6&profile_id=165&oauth2_token_id=57447761"

    },
    {
      info: {
        id: "4",
        avatar: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=600",
        title: "Talking about coffeeeeee!!🤭",
        description: "We are visiting the coffee farms here in new york",
      },
      uri: "https://player.vimeo.com/external/435820492.sd.mp4?s=ac169c4d275d59f3eb6710288a3a1b10982f71ce&profile_id=165&oauth2_token_id=57447761"

    },
    {
      info: {
        id: "5",
        avatar: "https://images.pexels.com/photos/6774998/pexels-photo-6774998.jpeg?auto=compress&cs=tinysrgb&w=600",
        title: "Cinematic shoot at vietnam!",
        description: "Hey guys, we visited vietnam last week and we prepared a cinematic video of the beautiful views of vietnam.",
      },
      uri: "https://player.vimeo.com/external/387242416.sd.mp4?s=57e2d102f99b0c27b03d4db5fe9ca903b5646d41&profile_id=165&oauth2_token_id=57447761"

    },
    {
      info: {
        id: "6",
        avatar: "https://images.pexels.com/photos/5378700/pexels-photo-5378700.jpeg?auto=compress&cs=tinysrgb&w=600",
        title: "Living life to the fullest",
        description: "I have been searching the meaning of life this couple of days, i think i finally found it!.",
      },
      uri: "https://player.vimeo.com/progressive_redirect/playback/796571425/rendition/360p/file.mp4?loc=external&oauth2_token_id=57447761&signature=53bc90b720ac458835348fad9deb202fa253368c955f9f6823a4cee5e0798167"

    },
    {
      info: {
        id: "7",
        avatar: "https://images.pexels.com/photos/7745573/pexels-photo-7745573.jpeg?auto=compress&cs=tinysrgb&w=600",
        title: "What a drama!",
        description: "Follow me on IG!",
      },
      uri: "https://player.vimeo.com/external/335851734.sd.mp4?s=7f4d1af280ea09cb3e594e6b43e028aefea55360&profile_id=164&oauth2_token_id=57447761"

    },
    {
      info: {
        id: "8",
        avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600",
        title: "Doing what i love!",
        description: "Currently in a new project, i don't want to spoil but..... MARVEL!!!!!!",
      },
      uri: "https://player.vimeo.com/external/503932157.sd.mp4?s=e85273c787f615e0fa5e507e4889fb060e4fa988&profile_id=164&oauth2_token_id=57447761"

    },
    {
      info: {
        id: "9",
        avatar: "https://images.pexels.com/photos/5486199/pexels-photo-5486199.jpeg?auto=compress&cs=tinysrgb&w=600",
        title: "Always face life front!!",
        description: "Follow my telegram channel, where i teach some tips!!",
      },
      uri: "https://player.vimeo.com/external/482969358.sd.mp4?s=3afac1c710ad7d7fe02ccd7999bc4457c9341350&profile_id=165&oauth2_token_id=57447761"

    },
    {
      info: {
        id: "10",
        avatar: "https://images.pexels.com/photos/4065187/pexels-photo-4065187.jpeg?auto=compress&cs=tinysrgb&w=600",
        title: "Do good in this life people!!",
        description: "Helping people is one of my favorite things to do in this world",
      },
      uri: "https://player.vimeo.com/external/514618101.sd.mp4?s=d3865df3f5580caecff197585ff43068aded1105&profile_id=165&oauth2_token_id=57447761"

    },

  ]


  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} >
        <View style={{ height: (height - TabHeight) }} >
          <Viewport.Tracker>
            <FlatList
              style={{ backgroundColor: 'black', height: (height - TabHeight) }}
              data={Data}

              renderItem={({ item, index }) => (
                <Render
                  TabHeight={TabHeight}
                  currentIndex={currentIndex}
                  index={index}
                  status={status}
                  video={video}
                  setStatus={setStatus}
                  setCurrentIndex={setCurrentIndex}
                  item={item}
                />
              )}
              horizontal={false}
              pagingEnabled={true}
            />
          </Viewport.Tracker>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

function Render({ TabHeight, currentIndex, setCurrentIndex, index, status, video, setStatus, item }) {


  function HandlePlayback() {
    if (currentIndex === index) {
      if (status === 'PLAY') {

        video.current[index].pauseAsync();
        setStatus("PAUSE")
      } else {
        video.current[index].playAsync();
        setStatus('PLAY')
      }
    }
  }

  return (
    <View
      activeOpacity={1}
      style={{ borderWidth: 1, height: (height - TabHeight), position: 'relative' }} >
      <ViewAware
        preTriggerRatio={0.000000000000002}
        onViewportLeave={() => video.current[index].pauseAsync()}
        onViewportEnter={() => {
          setStatus('PLAY')
          setCurrentIndex(index)
        }}
      />
      <Video
        ref={(ref) => video.current[index] = ref}
        style={{ width: width, height: (height - TabHeight) }}
        DoNotMix={1}
        source={{
          uri: item.uri,
        }}
        isLooping={true}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay={currentIndex === index}

      />

      <RenderInterface TabHeight={TabHeight} Info={item.info} />

      <View style={{ width: width, height: height - TabHeight, position: 'absolute', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
        <TouchableOpacity onPress={HandlePlayback} style={{ width: '45%', height: '40%', alignItems: 'center', justifyContent: 'center' }} >

          <Animated.View
            style={{
              opacity: 0.2,
              width: 60,
              height: 60
            }}
          >
            {status === 'PAUSE' ? (
              <MaterialCommunityIcons name="play-circle" size={60} color="#fbfaf8" />
            ) : (
              <MaterialCommunityIcons name="pause-circle" size={60} color="#fbfaf8" />
            )}
          </Animated.View>

        </TouchableOpacity>


      </View>

    </View>
  )
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
            <Image source={{ uri: Info.avatar }} style={{ width: '100%', height: "100%" }} />
          </View>
          <Text style={{ marginLeft: 18, width: 240, fontSize: 16, fontWeight: 600, height: 40, color: '#ffffff' }} >{Info.title}</Text>
        </View>
        <View style={{ marginTop: 10, width: '90%', paddingVertical: 10 }} >
          <Text style={{ color: '#ffffff' }} numberOfLines={3} >{Info.description}</Text>
        </View>
      </View>
    </View>
  )
}

