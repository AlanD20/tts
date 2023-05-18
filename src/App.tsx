import Select from 'react-select';
import Footer from '@comp/Footer';
import Button from '@comp/Button';
import axios from './common/axios';
import config from './common/config';
import voices from './common/voices';
import Textarea from '@comp/Textarea';
import TitleText from '@comp/TitleText';
import PageLayout from '@comp/PageLayout';
import { useEffect, useState } from 'react';
import AudioPlayer from '@comp/AudioPlayer';
import ContainerLayout from '@comp/ContainerLayout';

const VoicesObj = () =>
  voices
    .sort((a: any, b: any) => a.localeCompare(b))
    .map((v) => ({
      label: v,
      value: v,
    }));

const App = () => {

  const [inputText, setInputText] = useState<string>('');
  const [voice, setVoice] = useState<string>('Brian');
  const [status, setStatus] = useState<string>('');
  const [blobUrl, setBlobUrl] = useState<string>('');

  useEffect(() => {
    const time = setTimeout(() => setStatus(''), 3500);
    return () => clearTimeout(time);
  }, [status]);

  const handlePlayButton = async () => {
    const text = inputText.trim();

    if (!text) {
      setStatus('Input text is empty!');
      return;
    }

    try {
      const { data, status } = await axios.get(config.api, {
        params: { text, voice },
        responseType: 'blob',
      });

      if (status != 200) {
        setStatus('Failed to get a response!');
        return;
      }

      setBlobUrl(URL.createObjectURL(data));
    } catch {
      setStatus('Failed to get a response from the server!');
    }
  };

  return (
    <PageLayout className="gap-8">
      <TitleText text="TTS Using Stream Element!" />

      {status && <span className="text-red-500 font-bold">{status}</span>}

      <ContainerLayout className="w-3/4 max-w-screen-md min-w-[320px] flex-col gap-8 items-stretch ">
        <Textarea
          label="Text"
          name="text"
          value={inputText}
          className="textarea-secondary h-48"
          onChange={(e) => setInputText(e.target.value)}
        />
        <label
          htmlFor="voice"
          className="label capitalize flex flex-col w-full items-start"
        >
          Voice
          <Select
            id="voice"
            options={VoicesObj()}
            className="mt-2 text-secondary w-full font-bold"
            defaultValue={{ value: 'brian', label: 'Brian' }}
            onChange={(e) => setVoice(e?.value as string)}
          />
        </label>
        <Button
          label="Play"
          onClick={handlePlayButton}
          className="hover:text-white font-bold"
        />
      </ContainerLayout>

      <AudioPlayer blobUrl={blobUrl} />

      <Footer />
    </PageLayout>
  );
};

export default App;
