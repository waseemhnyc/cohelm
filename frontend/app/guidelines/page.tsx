"use client"

import { useEffect, useState } from "react";
import axios from "axios";

export default function GuidelinesPage() {
  const [data, setData] = useState<string[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/example-response`);
        setData(result.data['response']['steps']);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-4xl font-bold leading-tight text-left">
        Guidelines
      </h1>
      <p className="text-left text-xl text-slate-600">
        Upload and manage your guidelines guidelines
      </p>
    </section>
  );
}
