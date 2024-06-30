import { EPomodoroOption, TPomodoroOption } from '@/constants/options';
import { getTimeByOption } from '@/utils/time';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  pomodoroOption: TPomodoroOption;
  setPomodoroOption: React.Dispatch<React.SetStateAction<TPomodoroOption>>;
}

const options = Object.values(EPomodoroOption);

const HeaderComponent: React.FC<Props> = ({
  time,
  setTime,
  pomodoroOption,
  setPomodoroOption,
}) => {
  const handlePress = (option: TPomodoroOption) => {
    setTime(getTimeByOption(option));

    setPomodoroOption(option);
  };

  return (
    <View style={styles.tabsContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.option,
            option !== pomodoroOption && { borderColor: 'transparent' },
          ]}
          onPress={() => handlePress(option)}
        >
          <Text style={{ fontWeight: 'bold' }}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  option: {
    borderWidth: 3,
    padding: 5,
    flex: 1,
    borderColor: 'white',
    marginVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});
