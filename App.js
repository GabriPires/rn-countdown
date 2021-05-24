import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import moment from 'moment';
import { StatusBar } from 'expo-status-bar';

import ClockContainer from './components/Clock';

export default function App() {
  const [showMessage, setShowMessage] = useState(false);

  function handleTimeout() {
    setShowMessage(true);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Reloginho bonitinho</Text>
      <ClockContainer sessionDate={moment().add(10, 's')} timerZero={handleTimeout}/>
      {showMessage ? (
        <Text>Uhu terminou! 😆</Text>
      ) : null}
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
