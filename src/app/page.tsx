"use client";
import { Button } from "@/components/ui/button";
import { retrieveData } from "@/utils/pinecone/retrieveData";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const [questionPrompt, setQuestionPrompt] = useState("");
  const [answer, setanswer] = useState("");

  //uploading pdf to pinecone
  // useEffect(() => {
  //   uploadPdf();
  // }, []);

  const mutation: any = useMutation({
    mutationFn: () => {
      return retrieveData(questionPrompt);
    },
    onSuccess: (res) => {
      setanswer(res);
    },
  });

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-6 ">
      <div className=" w-[500px] p-8 rounded-xl shadow-lg bg-white ">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          The Parenting Coach
        </h1>

        <form id="promptForm" className="space-y-6">
          <div>
            <label
              htmlFor="prompt"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Ask Your Question:
            </label>
            <textarea
              id="prompt"
              rows={5}
              className="w-full px-4 py-3 "
              onChange={(e) => setQuestionPrompt(e.target.value)}
              placeholder="e.g., 'How to handle toddler tantrums?', 'What are some tips to reduce my child's screen time?'"
            />
          </div>

          <div className="flex justify-center">
            <Button
              disabled={mutation.isPending}
              type="button"
              className="w-full py-5 text-lg font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => {
                mutation.mutate();
              }}
            >
              Get Expert Advice
            </Button>
          </div>
        </form>
        {mutation.isPending && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <p className="text-gray-500 animate-pulse">AI is thinking...</p>
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        <div id="response" className={answer ? "mt-8" : "mt-8 hidden"}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Our Response:
          </h2>
          <p className="px-4 py-3 rounded-lg border shadow-sm bg-gray-100 text-gray-700">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
