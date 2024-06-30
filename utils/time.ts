import { TPomodoroOption } from '@/constants/options';

export function getTimeByOption(option: TPomodoroOption): number {
  switch (option) {
    case 'Pomodoro':
      return 25 * 60;
    case 'Short Break':
      return 5 * 60;
    case 'Long Break':
      return 15 * 60;
  }
}
