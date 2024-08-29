import React from "react";
import LogsContent from "@/components/LogsContent";
import NewIssueButton from "@/components/NewIssueButton";

function LogsPage() {
  return (
    <main className="bg-blue-0 h-full overflow-auto p-5">
      <div className="w-full">
        <h1 className="text-slate-600 text-xl font-medium">Your Past Logs</h1>
      </div>
      <hr className="mb-1 shadow" />

      <div className="h-[50px] flex justify-end pr-5 pt-2">
        <NewIssueButton />
      </div>
      <LogsContent />
    </main>
  );
}

export default LogsPage;
