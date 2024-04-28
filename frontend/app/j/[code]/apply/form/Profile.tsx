import React from "react";
import {ApplicationDataType} from "./types";
import {TextInput, Dropzone, Button} from "chaya-ui";

const ProfileForm = ({ data, setData }: {
  data: ApplicationDataType, setData: (data: ApplicationDataType) => void
}) => {

  const [coverLetterMode, setCoverLetterMode] = React.useState<'file' | 'text'>(
    data?.coverLetterText?.length ? 'text' : 'file'
  );

  return (
    <React.Fragment>
      <div className="flex rounded-lg md:rounded-xl p-3 md:p-4 lg:p-6 bg-white shadow-lg flex-wrap mx-0">
        <h3 className="w-full p-2 mb-2 text-lg md:text-xl opacity-80">
          <i className="ri-user-line mr-2"/>
          Basic Information
        </h3>
        <div className="w-full md:w-1/2 p-2">
          <TextInput
            label="First Name"
            name="first_name"
            placeholder="eg: Ashwin"
            isRequired
            value={data?.firstName}
            onChange={(firstName) => setData({...data, firstName})}
          />
        </div>
        <div className="w-full md:w-1/2 p-2">
          <TextInput
            label="Last Name"
            name="last_name"
            placeholder="eg: S Shenoy"
            value={data?.lastName}
            onChange={(lastName) => setData({...data, lastName})}
          />
        </div>
        <div className="w-full md:w-1/2 p-2">
          <TextInput
            label="Email"
            name="email"
            placeholder="eg: aswinshenoy65@gmail.com"
            value={data?.email}
            type="email"
            isRequired
            onChange={(email) => setData({...data, email})}
          />
        </div>
        <div className="w-full md:w-1/2 p-2">
          <TextInput
            label="Phone Number"
            name="phone"
            placeholder="eg: +9181390XXXX"
            value={data?.phoneNumber}
            type="tel"
            isRequired
            onChange={(phoneNumber) => setData({...data, phoneNumber})}
          />
        </div>
      </div>
      <div className="flex rounded-lg md:rounded-xl p-3 md:p-4 lg:p-6 bg-white shadow-lg flex-wrap mx-0">
        <h3 className="w-full p-2 mb-2 text-lg md:text-xl opacity-80">
          <i className="ri-profile-line mr-2"/>
          Resume & Cover Letter
        </h3>
        <div className="w-full md:w-1/2 p-2">
          <Dropzone
            labels={{
              label: 'Resume',
              text: 'Drag and drop your resume here or click to upload',
              hint: 'Only PDF, DOCX, DOC files are allowed',
            }}
            isRequired
            allowMultiple={false}
            accept={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
            // @ts-ignore
            value={data?.resume ?? []}
            // @ts-ignore
            onChange={(resume) => setData({...data, resume})}
          />
        </div>
        {coverLetterMode === 'file' ? (
          <div className="w-full md:w-1/2 p-2">
            <Dropzone
              labels={{
                label: 'Cover Letter',
                text: 'Drag and drop your cover letter here or click to upload',
                hint: 'Only PDF, DOCX, DOC files are allowed',
              }}
              allowMultiple={false}
              accept={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
              // @ts-ignore
              value={data?.coverLetter ?? []}
              // @ts-ignore
              onChange={(coverLetter) => setData({...data, coverLetter})}
            />
            <div className="inline-flex mt-3 py-2 flex-col">
              <div className="text-sm italic opacity-80">
                Do not have cover letter as a document?
              </div>
              <Button
                variant="link"
                className="w-fit py-1 font-semibold text-left"
                size="sm"
                onClick={() => {
                  setCoverLetterMode('text');
                  setData({...data, coverLetter: null});
                }}
                rightIcon="ri-arrow-right-line"
              >
                Type Cover Letter
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full p-2">
            <div className="flex flex-col gap-2">
              <TextInput
                label="Cover Letter"
                name="cover_letter_text"
                value={data?.coverLetterText}
                type="textarea"
                rows={5}
                onChange={(coverLetterText) => setData({...data, coverLetterText})}
              />
              <div className="inline-flex mt-2 py-2 flex-col">
                <div className="text-sm italic opacity-80">
                  Have cover letter as a document?
                </div>
                <Button
                  variant="link"
                  className="w-fit py-1 font-semibold text-left"
                  size="sm"
                  onClick={() => {
                    setCoverLetterMode('file');
                    setData({...data, coverLetterText: ''});
                  }}
                  rightIcon="ri-arrow-right-line"
                >
                  Upload Cover Letter
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default ProfileForm;