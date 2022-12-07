import Button from './Button';
import ContainerLayout from './ContainerLayout';
import { MutableRefObject, useState } from 'react';

type Props = {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  isDisabled: boolean;
};

const MIN_SPEED_RATE = 0;
const MAX_SPEED_RATE = 4;

const SpeedRate = ({ isDisabled, audioRef }: Props) => {
  const [speedRate, setSpeedRate] = useState<number>(1);

  const handleSpeedRate = (type: 'up' | 'down') => {
    if (!audioRef.current) return;

    let currentRate = audioRef.current.playbackRate;

    if (type === 'up') {
      currentRate += 0.25;
    } else if (type === 'down') {
      currentRate -= 0.25;
    }

    if (currentRate < MIN_SPEED_RATE || currentRate > MAX_SPEED_RATE) {
      return;
    }

    audioRef.current.playbackRate = currentRate;
    setSpeedRate(currentRate);
  };

  return (
    <ContainerLayout className="flex flex-col">
      <p className="font-bold">Current speed rate: {speedRate}</p>

      <div className="flex gap-4">
        <Button
          disabled={isDisabled}
          label="-0.25x"
          onClick={() => handleSpeedRate('down')}
          className="bg-red-500 hover:bg-red-600 hover:text-white font-bold"
        />
        <Button
          disabled={isDisabled}
          label="+0.25x"
          onClick={() => handleSpeedRate('up')}
          className="bg-sky-500 hover:bg-sky-600 hover:text-white font-bold"
        />
      </div>
    </ContainerLayout>
  );
};

export default SpeedRate;
