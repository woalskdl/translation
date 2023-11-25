import { StatusBar } from 'expo-status-bar';
import { useTranslation } from './src/use-translation';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Button from './src/Button';
import { useCookie } from './src/use-cookie';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import LoadingView from './src/LoadingView';
import LottieView from 'lottie-react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const {
    t,
    locale,
    setLocale,
    format,
  } = useTranslation();

  const {cookieKey} = useCookie();
  const [isLoaded, setIsLoaded] = useState(false);

  const y = new Date().getFullYear();
  const m = new Date().getMonth() + 1;
  const d = new Date().getDate();

  const todayText = format(t('today_is'), y, m, d);

  useEffect(() => {
    if (cookieKey !== '')
      setIsLoaded(true);
  }, [cookieKey])

  useEffect(() => {
    if (locale !== null)
      SplashScreen.hideAsync();
  }, [locale])


  if (!isLoaded)
    return <LoadingView />;

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        source={require('./assets/background.json')}
        resizeMode='cover'
        style={{
          position: 'absolute', // 기본값 - 없어도됨
          zIndex: -1  // 코드가 위에있어서 없어도 되긴함.
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topContainer}>
          <Text style={styles.todayText}>{todayText}</Text>
          <Text style={styles.cookieText}>{t(cookieKey)}</Text>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.buttonsContainer}>
            <Button
              onPress={() => setLocale('ko')}
              isSelected={locale === 'ko'}
              text="KO"
            />
            <Button
              onPress={() => setLocale('en')}
              isSelected={locale === 'en'}
              text="EN"
            />
            <Button
              onPress={() => setLocale('ja')}
              isSelected={locale === 'ja'}
              text="JA"
            />
            <Button
              onPress={() => setLocale('zh')}
              isSelected={locale === 'zh'}
              text="ZH"
            />
          </View>
        </View>
      </SafeAreaView>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  todayText: {
    position: 'absolute',
    top: 70,
    fontSize: 13,
    color: '#8b658f',
  },
  cookieText: {
    fontSize: 22,
    color: '#372538',
    textAlign: 'center',
    marginHorizontal: 30,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 25
  }
});
