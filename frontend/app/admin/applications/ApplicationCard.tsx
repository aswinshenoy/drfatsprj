'use client';
import React from "react";
import {Badge, Button, Card, useCurrencyFormatter} from "chaya-ui";
import axios from "axios";

const ApplicationCard = ({ application, index }: {
  application: any,
  index: number
}) => {

  const formatCurrency = useCurrencyFormatter();

  const updateStatus = async (status: number) => {
    axios.post(`/api/applications/${application.id}/status`, {
      status
    }).then(({ data }) => {
      if(data?.status == 'success') {
        // reload page
        window.location.reload();
      } else {
        window.alert("Failed to save");
      }
    })
  }

  return (
    <Card>
      <div className="flex justify-between gap-2">
        <div className="font-semibold">
          {`${index+1}. ${application.candidate?.firstName} ${application.candidate?.lastName}`}
        </div>
        <div>
          <Badge color={application?.status == 0 ? "danger" : application?.status == 1 ? "success" : "primary"}>
            {application.statusText}
          </Badge>
        </div>
      </div>
      <div>
        {application.job?.title}
      </div>
      <div className="flex flex-wrap mx-0">
        <div className="w-1/2 p-1 text-sm">
          {`Born: ${application?.candidate?.dateOfBirth} (${application?.candidate?.age} yrs old)`}
        </div>
        <div className="w-1/2 p-1 text-sm">
          {`${application?.candidate?.monthsOfExperience} Months Experience`}
        </div>
        <div className="w-1/2 p-1 text-sm">
          {`Salary Expected: ${formatCurrency(application?.candidate?.expectedSalary ?? 0, 'INR', 2)}`}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-4 mx-0">
        {application?.status !== 1 ? (
          <Button
            onClick={() => updateStatus(1)}
            color="success"
          >
            Accept
          </Button>
        ) : null}
        {application?.status !== 0 ? (
          <Button
            onClick={() => updateStatus(0)}
            color="danger"
          >
            Reject
          </Button>
        ) : null}
      </div>
    </Card>
  );

};

export default ApplicationCard;