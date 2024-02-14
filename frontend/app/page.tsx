import { PriorAuthTable } from "@/components/prior-auth/table"

export default function IndexPage() {
  return (
    <div className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-4xl font-bold leading-tight text-left">
        Prior Authorizations
      </h1>
      <p className="text-left text-xl text-slate-600">
        View and create an authorization
      </p>
      <PriorAuthTable />
    </div>
  );
}
