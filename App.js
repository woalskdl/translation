import { StatusBar } from 'expo-status-bar';
import { useTranslation } from './src/use-translation';
import { StyleSheet, Text, View } from 'react-native';
import Button from './src/Button';
import { useCookie } from './src/use-cookie';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import LoadingView from './src/LoadingView';

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
  const todayText = format(t('today_is'), 2023, 11, 25);

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
      <Text>{todayText}</Text>
      <Text>{t(cookieKey)}</Text>

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

      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row'
  }
});
