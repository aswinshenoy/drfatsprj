'use client';
import React, {useEffect} from "react";
import {Button, Label, ProgressBar} from "chaya-ui";
import { useRecorder } from 'react-microphone-recorder';
import axios from "axios"

import Transcription from "@/app/shared/VoiceField/transcription";

export type VoiceData = {
  file: File,
  text: string
};

const API_KEY = process.env.NEXT_PUBLIC__ASSEMBLY_AI_API_KEY;


const VoiceField = ({ label, isRequired, value, onChange } : {
  label: string,
  isRequired: boolean,
  value: VoiceData | undefined
  onChange: (value: VoiceData | undefined) => void
}) => {

  const zeroPad = (numberStr: number) => {
    return numberStr.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
  }

  const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
      authorization: API_KEY,
      "content-type": "application/json",
      "transfer-encoding": "chunked",
    },
  });

  const {
    audioLevel, startRecording, pauseRecording, stopRecording, resumeRecording,
    resetRecording, audioURL, audioFile, recordingState, isRecording, timeElapsed
  } = useRecorder();

  const [uploadURL, setUploadURL] = React.useState<string|null>(null);
  const [transactionID, setTransactionID] = React.useState<string|null>(null);

  const getTranscription = () => {
    assembly
      .post("/upload", audioFile)
      .then((res) => {

        setUploadURL(res.data.upload_url);

        assembly
          .post("/transcript", {
            audio_url: res.data.upload_url,
          })
          .then((res) => {
            setTransactionID(res.data.id);
          })
          .catch((err) => {
            console.error(err);
          });

      }).catch((err) => console.error(err));
  };

  useEffect(() => {
    if(audioURL && recordingState === 'stopped') {
      getTranscription();
    }
  }, [recordingState, audioURL]);

  return (
    <div className="flex flex-col gap-2">
      <Label isRequired={isRequired}>
        {label}
      </Label>
      <div>
        <input aria-hidden="true" className="hidden" value={value?.text} />
        <div>
          {value?.text ? (
            <div className="flex flex-col gap-3">
              <div className="p-3 italic text-sm max-h-[35vh] overflow-y-auto bg-neutral-300/50 rounded-lg shadow-inner">
                {value.text}
              </div>
              <div className="flex items-center justify-between gap-2">
                {audioURL ? (
                  <audio
                    src={audioURL}
                    controls
                  />
                ) : (
                  <div className="opacity-75">
                    {`${zeroPad(Math.round(timeElapsed / 60))}:${zeroPad(Math.round(timeElapsed % 60))} elapsed`}
                  </div>
                )}
                <Button
                  size="sm"
                  variant="minimal"
                  color="secondary"
                  leftIcon="ri-mic-fill text-xl font-bold"
                  onClick={() => {
                    onChange(undefined);
                    setTransactionID(null);
                    setUploadURL(null);
                    if(recordingState === 'stopped' && resetRecording)
                      resetRecording();
                  }}
                >
                  Record Again
                </Button>
              </div>
            </div>
          ) : recordingState === 'stopped' ? (
            <div>
                {audioFile ? (
                  !(uploadURL && uploadURL?.length > 0) ? 'Uploading Audio'
                    : transactionID ? (
                      <Transcription
                        transactionID={transactionID}
                        onComplete={(text) => onChange({ file: audioFile as File, text })}
                        onFail={() => {
                          setUploadURL(null);
                          setTransactionID(null);
                          resetRecording && resetRecording();
                        }}
                      />
                    ) : null
                ) : null}
            </div>
          ) : isRecording ? (
            <div className="flex items-start gap-2 mx-0">
              {recordingState === 'paused' ? (
                <Button
                  variant="minimal"
                  color="secondary"
                  leftIcon="ri-pause-fill"
                  onClick={pauseRecording}
                />
              ) : (
                <Button
                  variant="minimal"
                  color="secondary"
                  leftIcon="ri-play-fill"
                  onClick={resumeRecording}
                />
              )}
              <Button
                variant="minimal"
                color="secondary"
                leftIcon="ri-stop-fill"
                onClick={stopRecording}
              />
              <div className="flex flex-col gap-1 px-2 w-1/4">
                <div className="opacity-75">
                  {`${zeroPad(Math.round(timeElapsed / 60))}:${zeroPad(Math.round(timeElapsed % 60))} elapsed`}
                </div>
                <ProgressBar
                  value={audioLevel}
                />
              </div>
            </div>
          ) : (
            <Button
              size="sm"
              variant="minimal"
              color="secondary"
              leftIcon="ri-mic-fill"
              onClick={startRecording}
            >
              Answer
            </Button>
          )}
        </div>
      </div>
    </div>
  );

};

export default VoiceField;
