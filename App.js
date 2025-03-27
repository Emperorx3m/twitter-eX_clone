import './gesture-handler';
import "./global.css";
import React, { useEffect, useState } from "react";
import { StatusBar, useColorScheme, Appearance, ActivityIndicator, ImageBackground, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "store";
import AuthStack from "components/navigation/AuthStack";
import MyTabs from 'components/navigation/Tabs';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { login } from 'slices/authSlice';
import { cleanObject } from 'utils/helpers';
import { app, auth } from "utils/firebaseConfig";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { setUserDetails } from 'slices/userDetailsSlice';
import isEqual from "lodash/isEqual";
import MyDrawer from 'components/navigation/Drawer';
import splash from "assets/splash_.png"
import { updateSystemTheme } from 'slices/themeSlice';
export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

function RootNavigator() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { mode } = useSelector((state) => state.theme);
  const db = getFirestore(app);
  const authUser = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // setLoading(true);
        const clean_user = cleanObject(user);
        if (clean_user && !isEqual(clean_user, authUser)) {
          console.log('user>>>', isEqual(clean_user, authUser))
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            dispatch(setUserDetails(userData));
          }
          dispatch(login(clean_user));
        }
        // setLoading(false);
      }
      loading && setLoading(false);
    });
    return unsubscribe;
  }, [authUser]);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(() => {
      dispatch(updateSystemTheme());
    });

    return () => subscription.remove(); // Cleanup on unmount
  }, [dispatch]);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // console.log('isAuthenticated', isAuthenticated)
  if (loading) {
    return (
      <View className='flex-1 items-center'>
    <ImageBackground source={splash} resizeMode='cover' className='w-full h-full' >
      <ActivityIndicator size="large" className="h-full mt-10 border" />
    </ImageBackground>
    </View>
    )

  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MyDrawer /> : <AuthStack />}
      <StatusBar style="auto" barStyle={mode == 'dark' ? 'light-content' : 'dark-content'} />
    </NavigationContainer>
  );
}
