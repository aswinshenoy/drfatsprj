'use client';
import React from "react";
import {JobType} from "@/app/j/[code]/types";


const Share = ({ job }: { job: JobType }) => {

  const link = (() => {
    if(typeof window === 'undefined') return;
    const baseURL = window.location.origin;
    return encodeURIComponent(`${baseURL}/j/${job.jobID}`);
  })();

  const text = encodeURIComponent(`Hiring ${job.title}`);

  return (
    <div className="flex flex-col gap-2 p-1">
      <div className="opacity-60 px-2 uppercase text-xs">
        <i className="ri-share-fill mr-1"/>{" "}
        Share This Job
      </div>
      <div className="flex items-center gap-2 px-2">
        <a
          href={`mailto:?subject=${text}&body=${link}`}
          target="_blank"
          rel="noreferrer"
          title="Share via Email"
          className="opacity-70 hover:opacity-100"
        >
          <i className="ri-mail-send-fill text-2xl" aria-label="Email"/>
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${link}?source=linkedin`}
          target="_blank"
          rel="noreferrer"
          title="Share on LinkedIn"
          className="opacity-70 hover:opacity-100"
        >
          <i className="ri-linkedin-fill text-2xl" aria-label="LinkedIn"/>
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${link}?source=twitter&text=${text}`}
          target="_blank"
          rel="noreferrer"
          className="opacity-70 hover:opacity-100"
          title="Share on X (Twitter)"
        >
          <i className="ri-twitter-x-fill text-2xl" aria-label="X"/>
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${link}`}
          target="_blank"
          rel="noreferrer"
          title="Share on Facebook"
          className="opacity-70 hover:opacity-100"
        >
          <i className="ri-facebook-fill text-2xl" aria-label="Facebook"/>
        </a>
      </div>
    </div>
  );
}

export default Share;