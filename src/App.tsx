import Select from 'react-select';
import Button from '@comp/Button';
import axios from './common/axios';
import config from './common/config';
import voices from './common/voices';
import Textarea from '@comp/Textarea';
import TitleText from '@comp/TitleText';
import PageLayout from '@comp/PageLayout';
import ContainerLayout from '@comp/ContainerLayout';
import { useEffect, useMemo, useRef, useState } from 'react';

const App = () => {
  const [text, setText] = useState<string>('');
  const [voice, setVoice] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const srcRef = useRef<HTMLSourceElement | null>(null);

  const VoicesObj = useMemo(
    () =>
      voices
        .sort((a: any, b: any) => a.localeCompare(b))
        .map((v) => ({
          label: v,
          value: v,
        })),
    []
  );

  const handlePlayButton = async () => {
    try {
      const { data, status } = await axios.get(config.api, {
        params: { text, voice },
        responseType: 'blob',
      });

      if (status != 200) {
        setStatus('Failed to get a response!');
        return;
      }

      let blobUrl = URL.createObjectURL(data);
      srcRef.current?.setAttribute('src', blobUrl);
      audioRef.current?.pause();
      audioRef.current?.load();
      audioRef.current?.play();
    } catch {
      setStatus('Failed to get a response from the server!');
    }
  };

  useEffect(() => {
    const time = setTimeout(() => setStatus(''), 3500);
    return () => clearTimeout(time);
  }, [status]);

  return (
    <PageLayout className="gap-8">
      <TitleText text="Text Reader From Stream Element!" />
      {status && <span className="text-red-500">{status}</span>}

      <ContainerLayout className="flex-col gap-8 items-stretch w-[65ch]">
        <Textarea
          label="Text"
          name="text"
          value={text}
          className="textarea-secondary h-48"
          onChange={(e) => setText(e.target.value)}
        />
        <Select
          options={VoicesObj}
          className="text-primary"
          onChange={(e) => setVoice(e?.value as string)}
        />
        <Button label="Play" onClick={handlePlayButton} />
      </ContainerLayout>

      <ContainerLayout>
        <audio ref={audioRef} controls={true}>
          <source ref={srcRef} type="audio/wav" />
        </audio>
      </ContainerLayout>
    </PageLayout>
  );
};

export default App;
