import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { GuidelinesQuestionCard } from "@/components/guidelines/question-card"
import { Button } from "@/components/ui/button"

import { useEffect, useState } from "react";
import axios from "axios";
import { DataTableDemo } from "@/components/table"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-4xl font-bold leading-tight text-left">
        Prior Authorizations
      </h1>
      <p className="text-left text-xl text-slate-600">
        View and create an automated authorization
      </p>
      <DataTableDemo />

    </section>
  );
}

