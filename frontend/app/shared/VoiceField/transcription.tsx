import React from "react";
import axios from "axios";

import useRetryUntilResolved from "@/app/utils/useRetry";

const API_KEY = process.env.NEXT_PUBLIC__ASSEMBLY_AI_API_KEY;


const Transcription = ({ transactionID, onComplete = () => {}, onFail }: {
  transactionID: string,
  onComplete?: (text: string) => void,
  onFail?: (error: string) => void
}) => {

  const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
      authorization: API_KEY,
      "content-type": "application/json",
      "transfer-encoding": "chunked",
    },
  });

  const [transcriptionProcessing, setTranscriptionProcessing] = React.useState<boolean>(true);
  const [transcription, setTranscription] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const getTranscriptionStatus = async () => {
    if(!transactionID)
      return Promise.resolve(true);

    setTranscriptionProcessing(true);
    return await assembly
      .get(`/transcript/${transactionID}`)
      .then((res) => {
        if (res.data.status === 'completed') {
          setTranscriptionProcessing(false)
          setTranscription(res.data.text);
          onComplete(res.data.text);
          return true;
        }
        return false;
      })
      .catch((err) => {
        setError(err.message);
        onFail?.(err.message);
        setTranscriptionProcessing(false);
        return true;
      });
  };

  useRetryUntilResolved(async () => await getTranscriptionStatus(), 1000);


  return (
    <div className="p-2 italic text-sm">
      {transcriptionProcessing ? 'Transcribing Audio' :
        transcription?.length > 0 ? transcription :
        error?.length > 0 ? error
        : 'Failed to transcribe. Please try again.'}
    </div>
  );

};

export default Transcription;