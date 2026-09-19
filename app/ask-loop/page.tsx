"use client";

import { useState } from "react";

export default function AskLoopPage() {
const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");
const [evidence, setEvidence] = useState<string[]>([]);
const [loading, setLoading] = useState(false);

async function askLoop() {
if (!question.trim()) return;

setLoading(true);
setAnswer("");
setEvidence([]);

try {
  const response = await fetch("/api/feedback");

  if (!response.ok) {
    throw new Error("Failed to load feedback");
  }

  const feedback = await response.json();

  const q = question.toLowerCase();

  let relevant = feedback;

  if (
    q.includes("negative") ||
    q.includes("complain") ||
    q.includes("problem")
  ) {
    relevant = feedback.filter(
      (item: any) => item.sentiment === "NEGATIVE"
    );
  }

  if (
    q.includes("positive") ||
    q.includes("like") ||
    q.includes("good")
  ) {
    relevant = feedback.filter(
      (item: any) => item.sentiment === "POSITIVE"
    );
  }

  if (relevant.length === 0) {
    relevant = feedback;
  }

  const categories: Record<string, number> = {};

  relevant.forEach((item: any) => {
    const category = item.category || "General";

    if (categories[category]) {
      categories[category] = categories[category] + 1;
    } else {
      categories[category] = 1;
    }
  });

  const sortedCategories = Object.entries(categories).sort(
    (a, b) => b[1] - a[1]
  );

  let result =
    "I found " +
    relevant.length +
    " relevant feedback item" +
    (relevant.length === 1 ? "" : "s") +
    ".";

  if (sortedCategories.length > 0) {
    result =
      result +
      " The most frequently mentioned area is " +
      sortedCategories[0][0] +
      " with " +
      sortedCategories[0][1] +
      " mention" +
      (sortedCategories[0][1] === 1 ? "" : "s") +
      ".";
  }

  if (
    q.includes("negative") ||
    q.includes("complain") ||
    q.includes("problem")
  ) {
    result =
      result +
      " These responses indicate areas where customers may be experiencing problems.";
  } else {
    result =
      result +
      " Review the supporting feedback below for more detail.";
  }

  setAnswer(result);

  setEvidence(
    relevant.slice(0, 5).map(
      (item: any) =>
        item.message +
        " — " +
        (item.category || "General")
    )
  );
} catch (error) {
  console.error(error);
  setAnswer("Unable to analyze the feedback right now.");
} finally {
  setLoading(false);
}

}

return ( <main className="min-h-screen bg-gray-50 p-8"> <div className="mx-auto max-w-5xl">

    <a
      href="/"
      className="text-sm font-medium text-blue-600 hover:underline"
    >
      ← Back to Dashboard
    </a>

    <h1 className="mt-6 text-3xl font-bold text-gray-900">
      Ask LOOP
    </h1>

    <p className="mt-2 text-gray-600">
      Ask questions about your customer feedback.
    </p>

    <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

      <label className="text-sm font-medium text-gray-700">
        Ask a question
      </label>

      <textarea
        value={question}
        onChange={(event) =>
          setQuestion(event.target.value)
        }
        placeholder="What are customers complaining about?"
        rows={4}
        className="mt-3 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
      />

      <button
        onClick={askLoop}
        disabled={loading || !question.trim()}
        className="mt-4 rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Ask LOOP"}
      </button>

    </div>

    {answer && (
      <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
            AI
          </div>

          <h2 className="font-semibold text-gray-900">
            LOOP Answer
          </h2>

        </div>

        <div className="mt-6 rounded-xl bg-gray-50 p-5">
          <p className="leading-7 text-gray-700">
            {answer}
          </p>
        </div>

        <h3 className="mt-6 font-semibold text-gray-900">
          Supporting Evidence
        </h3>

        <div className="mt-4 space-y-3">

          {evidence.map((item, index) => (
            <div
              key={index}
              className="rounded-lg border bg-white p-4"
            >
              <p className="text-sm text-gray-700">
                "{item}"
              </p>
            </div>
          ))}

        </div>

      </div>
    )}

    <div className="mt-8">

      <h3 className="font-semibold text-gray-900">
        Try asking
      </h3>

      <div className="mt-4 grid gap-3 md:grid-cols-3">

        <button
          onClick={() =>
            setQuestion(
              "What are customers complaining about?"
            )
          }
          className="rounded-xl border bg-white p-4 text-left text-sm hover:border-black"
        >
          What are customers complaining about?
        </button>

        <button
          onClick={() =>
            setQuestion(
              "What do customers like?"
            )
          }
          className="rounded-xl border bg-white p-4 text-left text-sm hover:border-black"
        >
          What do customers like?
        </button>

        <button
          onClick={() =>
            setQuestion(
              "Which areas need attention?"
            )
          }
          className="rounded-xl border bg-white p-4 text-left text-sm hover:border-black"
        >
          Which areas need attention?
        </button>

      </div>

    </div>

  </div>
</main>

);
}
