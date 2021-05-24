import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

const ClockContainer = ({ sessionDate, timerZero }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const miliseconds = moment(sessionDate).utc().diff(moment());
  const [duration, setDuration] = useState(moment.duration(miliseconds, 'milliseconds'));

  useEffect(() => {
    const interval = setInterval(() => {
      if (duration.seconds() >= 0) {
        calculateHours();
      } else {
        clearInterval();
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (timerZero) {
      if (duration.asSeconds() <= 0) {
        timerZero();
        return;
      }
    }
  }, [seconds]);

  const calculateHours = () => {
    setDays(duration.days());
    setHours(duration.hours());
    setMinutes(duration.minutes());
    setSeconds(duration.seconds());

    setDuration(duration.subtract(1, 'second'));
  };

  return (
    <View style={styles.clockContainer}>
      <View style={styles.timeCounter}>
        <Text style={styles.timeCounterText}>{days}</Text>
        <Text style={styles.timeDescText}>DIAS</Text>
      </View>
      <Text style={styles.timeCounterText}>:</Text>
      <View style={styles.timeCounter}>
        <Text style={styles.timeCounterText}>{hours}</Text>
        <Text style={styles.timeDescText}>HORAS</Text>
      </View>
      <View style={styles.timeCounter}>
        <Text style={styles.timeCounterText}>{minutes}</Text>
        <Text style={styles.timeDescText}>MINS</Text>
      </View>
      <Text style={styles.timeCounterText}>:</Text>
      <View style={styles.timeCounter}>
        <Text style={styles.timeCounterText}>{seconds}</Text>
        <Text style={styles.timeDescText}>SEGS</Text>
      </View>
    </View>
  );
};

export default ClockContainer;

const styles = StyleSheet.create({
  clockContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 6
  },
  timeCounter: {
    alignItems: 'center',
    marginHorizontal: 4,
  },
  timeCounterText: {
    fontSize: 36,
    color: '#393A3C',
  },
  timeDescText: {
    fontSize: 9,
    color: '#393A3C',
  },
});
