"use client"

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})

export type GuidelinesQuestionCardData = {
  question: string;
  options: {
    key: string;
    text: string;
    selected: boolean;
  }[];
  reasoning: string;
  evidence: {
    content: string;
    event_datetime: string;
    page_number: number;
    pdf_id: string;
    pdf_name: string | null;
  }[];
};

export function GuidelinesQuestionCard({ data }: { data: GuidelinesQuestionCardData}) {

  console.log(data)
  // data["evidence"] --> use this to display the source documents
  // data["reaosning"] --> use this as prompt for the user to update

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: data.options?.filter(option => option.selected).map(option => option.key),
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>      
      <div className="flex flex-row justify-between">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 border w-[50%] px-5 py-5">
          <FormField
            control={form.control}
            name="items"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">{data.question}</FormLabel>
                </div>
                {data.options?.map((item) => (
                  <FormField
                    key={item.key}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.key}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={item.selected}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.key])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.key
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.text}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
        <div className="space-y-10">
          <div className="flex flex-col text-right">
          <div className="mb-4">
            <FormLabel className="text-base">Sources</FormLabel>
          </div>
          <div className="flex flex-row gap-2">
            {[...new Set(data.evidence.map(evidence => `${evidence.pdf_id.slice(-4)} - ${evidence.page_number}`))]
              .sort((a, b) => {
                const [aPdfId, aPageNumber] = a.split(' - ');
                const [bPdfId, bPageNumber] = b.split(' - ');
                if (aPageNumber === bPageNumber) {
                  return aPdfId.localeCompare(bPdfId);
                }
                return parseInt(aPageNumber) - parseInt(bPageNumber);
              })
              .map((sortedEvidence, index) => (
                <div key={index} className="flex space-y-4">
                  <Badge variant="secondary">PDF - {sortedEvidence}</Badge>
                </div>
              ))}
          </div>
          </div>
          <div className="text-right">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Copilot Prompt & Reasoning</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                  <DialogTitle>Prompt</DialogTitle>
                  <DialogDescription>
                    <div className="mt-2">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="block w-full h-[320px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                        defaultValue={data.reasoning.split('\n').slice(0, -3).join('\n')}
                      />
                    </div>
                  </DialogDescription>
                  <DialogTitle className="pt-5">Reasoning</DialogTitle>
                  <DialogDescription>
                    <div className="mt-2">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="block w-full h-[320px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                        defaultValue={data.reasoning.split('\n').slice(-3).join('\n')}
                      />
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </Form>
  )
}
