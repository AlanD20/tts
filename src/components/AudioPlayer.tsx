import Button from './Button';
import SpeedRate from './SpeedRate';
import { useEffect, useRef, useState } from 'react';
import ContainerLayout from './ContainerLayout';

type Props = {
  blobUrl: string;
};

const AudioPlayer = ({ blobUrl }: Props) => {

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const srcRef = useRef<HTMLSourceElement | null>(null);
  const isBlobUrlEmpty = blobUrl.length === 0;
  const [speedRate, setSpeedRate] = useState<number>(1);

  useEffect(() => {
    if (blobUrl && audioRef.current) {

      srcRef.current?.setAttribute('src', blobUrl);

      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
      audioRef.current.playbackRate = speedRate

    }
  }, [blobUrl]);

  return (
    <>
      <SpeedRate isDisabled={isBlobUrlEmpty} audioRef={audioRef} speedRate={speedRate} setSpeedRate={setSpeedRate} />

      <ContainerLayout className="w-full flex-col">
        <audio
          ref={audioRef}
          controls={true}
          className="w-1/2 max-w-[35%] min-w-[320px]"
        >
          <source ref={srcRef} type="audio/wav" className="bg-accent" />
        </audio>

        <Button
          className="hover:text-white font-bold mt-4"
          disabled={isBlobUrlEmpty}
        >
          <a href={blobUrl} download>
            Download Audio
          </a>
        </Button>
      </ContainerLayout>
    </>
  );
};

export default AudioPlayer;
