import HeaderComponent from '@/components/HeaderComponent';
import TimerComponent from '@/components/TimerComponent';
import { EAppColor } from '@/constants/colors';
import { TPomodoroOption } from '@/constants/options';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { getTimeByOption } from '@/utils/time';

const colorsMap = new Map<TPomodoroOption, EAppColor>([
  ['Pomodoro', EAppColor.Primary],
  ['Short Break', EAppColor.Secondary],
  ['Long Break', EAppColor.Tertiary],
]);

export default function Index() {
  // #region state
  const [time, setTime] = useState<number>(25 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [clickSound, setClickSound] = useState<Audio.Sound>();

  const [pomodoroOption, setPomodoroOption] =
    useState<TPomodoroOption>('Pomodoro');

  // #region effects
  useEffect(() => {
    if (clickSound)
      return () => {
        clickSound.unloadAsync();
      };
  }, [clickSound]);

  useEffect(() => {
    if (!isActive) return;

    let interval: NodeJS.Timeout;

    interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 0.001);

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (time === 0) {
      setIsActive(false);
      setTime(getTimeByOption(pomodoroOption));
    }
  }, [time, pomodoroOption]);

  useEffect(() => {
    setIsActive(false);
    setTime(getTimeByOption(pomodoroOption));
  }, [pomodoroOption]);

  // #region functions
  const handleStartStop = () => {
    playSound();
    setIsActive((prev) => !prev);
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('@/assets/click.wav')
    );

    setClickSound(sound);
    await sound.playAsync();
  };

  // #region render
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colorsMap.get(pomodoroOption) },
      ]}
    >
      <Text style={styles.text}>Pomodoro</Text>

      <HeaderComponent
        pomodoroOption={pomodoroOption}
        setPomodoroOption={setPomodoroOption}
        time={time}
        setTime={setTime}
      />

      <TimerComponent time={time} />

      <TouchableOpacity style={styles.button} onPress={handleStartStop}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {isActive ? 'STOP' : 'START'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  text: { fontSize: 32, fontWeight: 'bold' },
  button: {
    alignItems: 'center',
    backgroundColor: '#333333',
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  },
});
