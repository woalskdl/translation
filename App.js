import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

const i18n = new I18n({
  en : { welcome: 'Hello' },
  ko : { welcome: '안녕하세요' }
})

const deviceLanguage = getLocales()[1].languageCode;
i18n.locale = deviceLanguage;

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{deviceLanguage}</Text>
      <Text>{i18n.t('welcome')}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
