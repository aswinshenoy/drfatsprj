import React from "react";
import {Button} from "chaya-ui";

const ProfileImporter = ({ onFillManual, }: {
  onFillManual: () => void
}) => (
  <div className="flex justify-center items-center min-h-[50vh] gap-4">
    <div className="flex flex-col gap-6">
      <div className="bg-white flex flex-col gap-4 p-4 md:p-6 lg:p-8 rounded-lg md:rounded-xl shadow-lg md:shadow-xl">
        <h1 className="text-xl md:text-2xl font-semibold">
          Import Profile
        </h1>
        <p className="opacity-80">
          Fill your profile using your LinkedIn Profile or Resume.
        </p>
        <div className="flex flex-col gap-4">
          <Button
            size="lg"
            variant="solid"
            color="shade"
            className="!bg-blue-900 w-full"
            leftIcon="ri-linkedin-fill"
          >
            Import from LinkedIn
          </Button>
          <Button
            size="lg"
            variant="solid"
            color="shade"
            className="!bg-orange-700 w-full"
            leftIcon="ri-file-upload-line"
          >
            Upload Resume
          </Button>
        </div>
      </div>
      <div className="flex items-center flex-col gap-2">
        <div className="py-2 mb-4 relative w-full">
          <hr className="border-neutral-500/20 w-full" />
          <div
            className="text-sm absolute -top-[2.5px] left-[45%] rounded-lg bg-neutral-100 px-1 py-1 italic"
          >
            OR
          </div>
        </div>
        <Button
          size="lg"
          variant="solid"
          color="white"
          onClick={onFillManual}
          className="w-full shadow hover:shadow-none rounded-xl"
          rightIcon="ri-arrow-right-line"
        >
          Enter Manually
        </Button>
      </div>
    </div>
  </div>
);

export default ProfileImporter;