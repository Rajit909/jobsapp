"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {TabsContent} from "@radix-ui/react-tabs";
import React, { useEffect, useState } from "react";
import CommonForm from "@/components/common-form";
import {
  candidateOnboardFormControls,
  initialCandidateFormData,
  initialRecruiterFormData,
  recruiterOnboardFormControls,
} from "@/utils";
import { useUser } from "@clerk/nextjs";
import { createProfileAction } from "@/actions";



const Onboard = () => {
  const [currentTab, setCurrentTab] = useState("candidate");
  const [recruiterFormData, setRecruiterFormData] = useState(
    initialRecruiterFormData
  );
  const [candidateFormData, setCandidateFormData] = useState(
    initialCandidateFormData
  );
  const [file, setFile] = useState(null);

  const currentAuthUser = useUser();
  const { user } = currentAuthUser;

  function handleFileChange(event) {
    event.preventDefault();
    setFile(event.target.files[0]);
  }

  async function handleUploadPdfToSupabase() {
    const { data, error } = await supabaseClient.storage
      .from("job-board-public")
      .upload(`/public/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    console.log(data, error);
    if (data) {
      setCandidateFormData({
        ...candidateFormData,
        resume: data.path,
      });
    }
  }

  console.log(candidateFormData);

  useEffect(() => {
    if (file) handleUploadPdfToSupabase();
  }, [file]);

  function handleTabChange(value) {
    setCurrentTab(value);
  }
console.log(recruiterFormData)


  function handleRecuiterFormValid() {
    return (
      recruiterFormData &&
      recruiterFormData.name.trim() !== "" &&
      recruiterFormData.companyName.trim() !== "" &&
      recruiterFormData.companyRole.trim() !== ""
    );
  }

  function handleCandidateFormValid() {
    return Object.keys(candidateFormData).every(
      (key) => candidateFormData[key].trim() !== ""
    );
  }

  async function createProfile() {
    const data =
      currentTab === "candidate"
        ? {
            candidateInfo: candidateFormData,
            role: "candidate",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          }
        : {
            recruiterInfo: recruiterFormData,
            role: "recruiter",
            isPremiumUser: false,
            userId: user?.id,
            email: user?.primaryEmailAddress?.emailAddress,
          };

    await createProfileAction(data, "/onboard");
  }

  console.log(candidateFormData);

  return (
    <>
      <div className="bg-white">
        <Tabs value={currentTab} onValueChange={handleTabChange}>
          <div className="w-full">
            <div className="flex items-baseline justify-between border-b pb-6 pt-24">
              <h1 className=" text-4xl font-bold tracking-tight text-gray-900 ">
                Welcome to OnBoarding
              </h1>
              <TabsList className="">
                <TabsTrigger className="pr-4" value="candidate">Candidate</TabsTrigger>
                <TabsTrigger className="" value="recruiter">Recruiter</TabsTrigger>
              </TabsList>
            </div>
          </div>
          <TabsContent value="candidate">
            <CommonForm
              action={createProfile}
              formData={candidateFormData}
              setFormData={setCandidateFormData}
              buttonText={"Onboard as Candidate"}
              formControls={candidateOnboardFormControls}
              handleFileChange={handleFileChange}
              isBtnDisabled={!handleCandidateFormValid()}
            />
          </TabsContent>
          <TabsContent value="recruiter">
            <CommonForm
              action={createProfile}
              formControls={recruiterOnboardFormControls}
              buttonText={"Onboard as Recruiter"}
              formData={recruiterFormData}
              setFormData={setRecruiterFormData}
              handleFileChange={handleFileChange}
              isBtnDisabled={!handleRecuiterFormValid()}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Onboard;
