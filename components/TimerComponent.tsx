import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  time: number;
}

const TimerComponent: React.FC<Props> = ({ time }) => {
  const formattedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formattedTime}</Text>
    </View>
  );
};

export default TimerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 15,
  },
  time: {
    fontSize: 80,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
  },
});
