"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import { GuidelinesQuestionCard, GuidelinesQuestionCardData } from "@/components/guidelines/question-card";
import { Loading } from "@/components/loading";
import { Button } from "@/components/ui/button";
import { CheckCircledIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";

export default function PriorAuthPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [caseDetails, setCaseDetails] = useState<any>(null);
  const [questions, setQuestions] = useState<GuidelinesQuestionCardData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${"http://localhost:8000"}/example-response`);
        setCaseDetails(result.data['response'][0]);
        setQuestions(result.data['response'][0]['steps']);
        setLoading(false);
        console.log(result.data['response'][0])
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">

    <h1 className="text-4xl font-bold leading-tight text-left">
        Case Details
      </h1>
      {loading ? ( 
        <Loading />
      ) : (
        <div>
          <div className="flex justify-between pb-5">
            <div className="p-5 border-double border-4 rounded-lg text-lg font-semibold">
              <div className="flex justify-between w-[500px]">
                <div>
                  <h4 className="text-sm font-medium leading-none">{caseDetails?.procedure_name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {caseDetails?.case_id}
                  </p>
                </div>

                <div className="">
                  <Badge>{caseDetails?.is_met ? "Approved" : "Declined"}</Badge>
                </div>
              
                <div className="">
                  Not Verified
                </div>
              </div>
            </div>
            <div>
              {
                caseDetails?.is_complete ? (
                  <div className="">
                    <Link href="" className="pl-3">
                      <Button variant="outline"> <Pencil2Icon className="mr-2 h-4 w-4" /> Edit Prior Auth</Button>
                    </Link>
                    <Link href="" className="pl-3">
                      <Button variant="default"> <CheckCircledIcon className="mr-2 h-4 w-4" />Verify</Button>
                    </Link>
                  </div>
                ) : null
              }
            </div>
          </div>
          <div>
            {
              caseDetails?.is_complete ? (
                <div className="flex flex-col space-y-2">
                  <div className="col-span-full">
                    <div className="text-left text-xl text-slate-600 pt-10">
                      CPT Codes
                    </div>
                    <div className="mt-2">
                      <div className="flex gap-1">
                        {caseDetails?.cpt_codes.map((code: string, index: string) => (
                          <Badge variant="secondary" key={index}>{code}</Badge>
                        ))}
                        <Badge variant="outline" className="rounded-xl">+</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <div className="text-left text-xl text-slate-600 pt-10">
                      Summary
                    </div>
                    <div className="mt-2">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="block w-full h-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                        defaultValue={caseDetails?.summary}
                      />
                    </div>
                  </div>

                  <div className="text-left text-xl text-slate-600 pt-10">
                    Guideline Questions
                  </div>
                  <div className="flex flex-col space-y-10">
                    {questions?.map((item: GuidelinesQuestionCardData, index: number) => 
                      <GuidelinesQuestionCard key={index} data={item} />
                    )}
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Button variant="outline">Cancel</Button>
                    <Button variant="default">Save</Button>
                  </div>
                </div>
              ) : <Loading/>
            }
          </div>
        </div>
      )}
    </section>
  );
}
