import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { doc, setDoc } from 'firebase/firestore';
import { db } from 'utils/firebaseConfig';
import { setUserDetails } from 'slices/userDetailsSlice';
import { COLORS } from 'utils/theme';
import { photoURL } from 'utils/helpers';


const PROFILE_FILE_PATH = FileSystem.documentDirectory + 'profile.json';

const EditProfileScreen = () => {
    const { mode, theme } = useSelector((state) => state.theme);
    const userdeets = useSelector((state) => state.userDeets?.userDetails);
    const navigation = useNavigation();
    const profilePicture = userdeets?.photoUrl ?? photoURL;
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        name: userdeets.name,
        bio: userdeets.bio,
        location: userdeets.location,
        website: userdeets.website,
        photoUrl: profilePicture,
        bannerUrl: userdeets.bannerUrl,
    });

    const [isEdited, setIsEdited] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const hasChanges = Object.keys(form).some((key) => form[key] !== userdeets[key]);
        setIsEdited(hasChanges);
    }, [form]);

    const saveProfileData = async (data) => {
        console.log('form', JSON.stringify(form, null, 2));

        await FileSystem.writeAsStringAsync(PROFILE_FILE_PATH, JSON.stringify(data));
        await setDoc(doc(db, 'users', userdeets.uid), data, { merge: true });
    };

    const saveImageLocally = async (uri, filename) => {
        const localUri = FileSystem.cacheDirectory + filename;
        await FileSystem.copyAsync({ from: uri, to: localUri });
        return localUri;
    };

    const pickImage = async (type) => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') return;

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            legacy: true
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            const fileExtension = uri.split('.').pop();
            const newFilename = `${type}.${fileExtension}`;
            const localUri = await saveImageLocally(uri, newFilename);
        
            console.log('localUri', localUri);
            setForm({ 
                ...form, 
                [type]: `${localUri}?t=${new Date().getTime()}` // Force update by appending a timestamp
            });
        }
        
    };

    const handleSave = async () => {
        console.log("handleSave")
        if (!isEdited) return;
        setLoading(true);
        try {
            const updatedProfile = { ...userdeets, ...form };
            await saveProfileData(form);
            dispatch(setUserDetails(updatedProfile));
            navigation.goBack();
        } catch (error) {
            console.error('Error saving user details:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className={`flex-1 p-4 ${mode === 'dark' ? COLORS.darkBg : COLORS.lightBg}`}>
            <View className='flex-row justify-between items-center mb-4'>
                <TouchableOpacity onPress={() => navigation.goBack()} className="rounded-full flex-row  items-center gap-x-2">
                    <MaterialCommunityIcons name="arrow-left" size={24} color={theme?.text} />
                    <Text cclassName={`text-xl ${mode === 'dark' ? 'text-white' : 'text-black'}`}>Edit Profile</Text>
                </TouchableOpacity>
                {isEdited && !loading && (
                    <TouchableOpacity onPress={handleSave}>
                        <Text className='text-lg font-semibold text-blue-500'>Save</Text>
                    </TouchableOpacity>
                )}
                {loading && <ActivityIndicator size="small" color="blue" />}
            </View>

            <TouchableOpacity onPress={() => pickImage('bannerUrl')} className='relative'>
                <View className="h-40">
                    {form?.bannerUrl ?
                        <Image source={{ uri: form?.bannerUrl }} className="w-full h-full" />
                        :
                        <View className='bg-gray-400 w-full h-full items-center justify-center' />
                    }
                    <View className='absolute inset-0 bg-black opacity-50 justify-center items-center'>
                        <MaterialCommunityIcons name="camera-plus" size={32} color={"white"} />
                    </View>
                </View>
            </TouchableOpacity>

            <View className='flex-row items-center mt-[-40] ml-4'>
                <TouchableOpacity onPress={() => pickImage('photoUrl')} className='relative'>
                    <Image source={{ uri: form.photoUrl }} className='w-20 h-20 rounded-full border-2 border-white' />
                    <View className='absolute inset-0 bg-black opacity-50 justify-center items-center rounded-full'>
                        <MaterialCommunityIcons name="camera-plus" size={20} color={"white"} />
                    </View>
                </TouchableOpacity>
            </View>

            <Text className={`text-lg font-semibold ${mode === 'dark' ? COLORS.textDark : COLORS.textLight} mt-4`}>Name</Text>
            <TextInput value={form.name} onChangeText={(text) => setForm({ ...form, name: text })} className={`border border-gray-300 rounded-md p-2 mt-1 ${mode === 'dark' ? 'text-white' : 'text-black'}`} />

            <Text className={`text-lg font-semibold ${mode === 'dark' ? COLORS.textDark : COLORS.textLight} mt-4`}>Bio</Text>
            <TextInput value={form.bio} onChangeText={(text) => setForm({ ...form, bio: text })} className={`border border-gray-300 rounded-md p-2 mt-1 ${mode === 'dark' ? 'text-white' : 'text-black'}`} multiline />

            <Text className={`text-lg font-semibold ${mode === 'dark' ? COLORS.textDark : COLORS.textLight} mt-4`}>Location</Text>
            <TextInput value={form.location} onChangeText={(text) => setForm({ ...form, location: text })} className={`border border-gray-300 rounded-md p-2 mt-1 ${mode === 'dark' ? 'text-white' : 'text-black'}`} />

            <Text className={`text-lg font-semibold ${mode === 'dark' ? COLORS.textDark : COLORS.textLight} mt-4`}>Website</Text>
            <TextInput value={form.website} onChangeText={(text) => setForm({ ...form, website: text })} className={`border border-gray-300 rounded-md p-2 mt-1 ${mode === 'dark' ? 'text-white' : 'text-black'}`} />
        </View>
    );
};

export default EditProfileScreen;
