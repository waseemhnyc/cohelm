"use client"

import { useRouter } from 'next/navigation'
import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


export default function PriorAuth() {
  const [medicalRecordFile, setMedicalRecordFile] = useState<File | null>(null);
  const [guidelineFile, setGuidelineFile] = useState<File | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);
  const [selectedGuideline, setSelectedGuideline] = useState<string | null>(null);
  const router = useRouter();

  const handleMedicalRecordFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMedicalRecordFile(event.target.files ? event.target.files[0] : null);
  };

  const handleGuidelineFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuidelineFile(event.target.files ? event.target.files[0] : null);
  };

  const handleFileUpload = async () => {
    if ((medicalRecordFile || selectedRecord) && (guidelineFile || selectedGuideline)) {
      const formData = new FormData();
      if (medicalRecordFile) {
        formData.append('medicalRecordFile', medicalRecordFile);
      }
      if (guidelineFile) {
        formData.append('guidelineFile', guidelineFile);
      }
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload-pdf`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('File uploaded successfully');
        router.push('/');
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    } else {
      alert('Please select or upload a medical record and a guideline');
    }
  };

  return (
    <div className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <h1 className="text-4xl font-bold leading-tight text-left">
            Create Prior Authorization
        </h1>
        <div className="text-left text-xl text-slate-600">
            Select or upload a medical record and a guideline
        </div>

        <div className="w-1/2 grid gap-6 border p-10">
            <div className="text-left text-xl font-medium mb-2">
                Select or upload a medical record
            </div>
            <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Medical Record" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>Medical Records</SelectLabel>
                <SelectItem value="case1" onSelect={() => setSelectedRecord('case1')}>Case ID: 12345</SelectItem>
                <SelectItem value="case2" onSelect={() => setSelectedRecord('case2')}>Case ID: 67890</SelectItem>
                <SelectItem value="case3" onSelect={() => setSelectedRecord('case3')}>Case ID: 11223</SelectItem>
                <SelectItem value="case4" onSelect={() => setSelectedRecord('case4')}>Case ID: 44556</SelectItem>
                <SelectItem value="case5" onSelect={() => setSelectedRecord('case5')}>Case ID: 77889</SelectItem>
                </SelectGroup>
            </SelectContent>
            </Select>
            <div className="col-span-full">
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                        htmlFor="medical-record-file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold"
                    >
                    Upload a file
                    <input id="medical-record-file-upload" name="medical-record-file-upload" type="file" className="sr-only" onChange={handleMedicalRecordFileChange} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PDF up to 10MB</p>
                </div>
            </div>
            </div>
            
            <div className="text-left text-xl font-medium mb-2">
                Select or upload a guideline
            </div>

            <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Guideline" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>Guidelines</SelectLabel>
                <SelectItem value="guideline1" onSelect={() => setSelectedGuideline('guideline1')}>Facet Joint Injection</SelectItem>
                <SelectItem value="guideline2" onSelect={() => setSelectedGuideline('guideline2')}>Spinal Cord Stimulation</SelectItem>
                <SelectItem value="guideline3" onSelect={() => setSelectedGuideline('guideline3')}>Lumbar Disc Decompression</SelectItem>
                <SelectItem value="guideline4" onSelect={() => setSelectedGuideline('guideline4')}>Cervical Disc Arthroplasty</SelectItem>
                <SelectItem value="guideline5" onSelect={() => setSelectedGuideline('guideline5')}>Lumbar Fusion</SelectItem>
                </SelectGroup>
            </SelectContent>
            </Select>
            <div className="col-span-full">
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                        htmlFor="guideline-file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold"
                    >
                    Upload a file
                    <input id="guideline-file-upload" name="guideline-file-upload" type="file" className="sr-only" onChange={handleGuidelineFileChange} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PDF up to 10MB</p>
                </div>
            </div>
            </div>

            <Button onClick={handleFileUpload}>Create</Button>
        </div>
    </div>
  );
}
