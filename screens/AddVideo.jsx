import { View, Text, ScrollView, TextInput, Button } from 'react-native'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { map } from 'lodash'
import { InsertPost,Test } from '../api/post'

export default function AddVideo({navigation}) {

    const [form, setForm] = useState(initForm())

    function onChange(id, e) {
        setForm({ ...form, [id]: e })
    }

    async function openGalery() {
        console.log("trying to open library")
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsMultipleSelection: true,
            videoMaxDuration : 30,
            orderedSelection : true,
            aspect : [16,9],
        })

        if (result.canceled) {
            console.log("canceled")
        }

        if (!result.canceled) {


            var formData = new FormData();
            formData.append("avatar", form.avatar)
            formData.append("title", form.title)
            formData.append("description", form.description)

            map(result.assets, (item, key) => {
                const extension = result.assets[key].uri.substring(result.assets[key].uri.lastIndexOf(".") + 1);
                const fileName = result.assets[key].uri.replace(/^.*[\\\/]/, "");
                const uri = result.assets[key].uri

                formData.append("files",{
                    name : fileName,
                    type : `video/${extension}`,
                    uri : uri,
                })
            })

            console.log("About to send test endpoint")
            // SEND FORM AND REFACTOR BACKEND TO RECEIVE CODE
            InsertPost(formData)
            // Reset all data
            setForm(initForm())

            navigation.navigate("feed")
        }

    }

    function Go() {
        navigation.navigate("feed")
    }

    return (
        <View style={{ backgroundColor: 'red', flex: 1, alignItems: 'center' }}  >
            <ScrollView style={{ flex: 1, width: '95%' }} >
                <View style={{ backgroundColor: 'green', marginTop: 20 }} >
                    <Text style={{ fontSize: 20, fontWeight: '700' }} >Avatar</Text>
                    <TextInput style={{ borderWidth: 2, padding: 5 }} onChangeText={(e) => onChange("avatar", e)} />
                </View>
                <View style={{ backgroundColor: 'green', marginTop: 20 }} >
                    <Text style={{ fontSize: 20, fontWeight: '700' }} >Title</Text>
                    <TextInput style={{ borderWidth: 2, padding: 5 }} onChangeText={(e) => onChange("title", e)} />
                </View>
                <View style={{ backgroundColor: 'green', marginTop: 20 }} >
                    <Text style={{ fontSize: 20, fontWeight: '700' }} >Description</Text>
                    <TextInput style={{ borderWidth: 2, padding: 5 }} onChangeText={(e) => onChange("description", e)} />
                </View>

                <View style={{ backgroundColor: 'green', marginTop: 20 }} >
                    <Text style={{ fontSize: 20, fontWeight: '700', paddingVertical: 10 }} >Add videos</Text>
                    <Button style={{ padding: 10 }} onPress={() => openGalery()} title='Open Galery' />
                    <Button style={{ padding: 10 }} onPress={() => Go()} title='Go to feed' />
                </View>
            </ScrollView>
        </View>
    )
}

function initForm() {
    return {
        avatar: "",
        title: "",
        description: ""
    }
}