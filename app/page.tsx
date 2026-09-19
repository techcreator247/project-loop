"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

type Feedback = {
id: string;
message: string;
source: string;
sentiment: string;
category: string | null;
customerName: string | null;
createdAt: string;
};

export default function Home() {
const [feedback, setFeedback] = useState<Feedback[]>([]);
const [loading, setLoading] = useState(true);

async function loadFeedback() {
try {
const response = await fetch("/api/feedback");

  if (!response.ok) {
    throw new Error("Failed to load feedback");
  }

  const data = await response.json();
  setFeedback(data);
} catch (error) {
  console.error("Dashboard error:", error);
} finally {
  setLoading(false);
}

}

useEffect(() => {
loadFeedback();
}, []);

const totalFeedback = feedback.length;

const positiveFeedback = feedback.filter(
(item) => item.sentiment === "POSITIVE"
).length;

const negativeFeedback = feedback.filter(
(item) => item.sentiment === "NEGATIVE"
).length;

const neutralFeedback = feedback.filter(
(item) => item.sentiment === "NEUTRAL"
).length;

const positivePercentage =
totalFeedback > 0
? Math.round((positiveFeedback / totalFeedback) * 100)
: 0;

const negativePercentage =
totalFeedback > 0
? Math.round((negativeFeedback / totalFeedback) * 100)
: 0;

return ( <main className="min-h-screen bg-gray-50 flex"> <Sidebar />

  <section className="flex-1 p-8">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          Feedback Intelligence
        </h2>

        <p className="mt-2 text-gray-600">
          Understand what your customers are saying.
        </p>
      </div>

      <a
        href="/feedback"
        className="rounded-lg bg-black px-5 py-3 font-medium text-white hover:bg-gray-800"
      >
        + Add Feedback
      </a>
    </div>

    {loading ? (
      <p className="mt-8 text-gray-500">
        Loading feedback...
      </p>
    ) : (
      <>
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3">
          <div className="bg-white rounded-xl border p-6">
            <p className="text-sm text-gray-500">
              Total Feedback
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {totalFeedback}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              All customer feedback
            </p>
          </div>

          <div className="bg-white rounded-xl border p-6">
            <p className="text-sm text-gray-500">
              Positive
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {positivePercentage}%
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              {positiveFeedback} feedback items
            </p>
          </div>

          <div className="bg-white rounded-xl border p-6">
            <p className="text-sm text-gray-500">
              Negative
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {negativePercentage}%
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              {negativeFeedback} feedback items
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-6 mt-8">
          <h3 className="text-xl font-semibold">
            Sentiment Breakdown
          </h3>

          <p className="text-gray-500 mt-1">
            Overall customer sentiment
          </p>

          <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
            <div className="rounded-lg bg-green-50 p-5">
              <p className="text-sm text-gray-600">
                Positive
              </p>

              <p className="mt-2 text-2xl font-bold">
                {positiveFeedback}
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-5">
              <p className="text-sm text-gray-600">
                Neutral
              </p>

              <p className="mt-2 text-2xl font-bold">
                {neutralFeedback}
              </p>
            </div>

            <div className="rounded-lg bg-red-50 p-5">
              <p className="text-sm text-gray-600">
                Negative
              </p>

              <p className="mt-2 text-2xl font-bold">
                {negativeFeedback}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-6 mt-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">
                Recent Feedback
              </h3>

              <p className="text-gray-500 mt-1">
                Latest customer comments
              </p>
            </div>

            <a
              href="/feedback"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              View all →
            </a>
          </div>

          <div className="mt-6 space-y-4">
            {feedback.length === 0 ? (
              <p className="text-gray-500">
                No feedback has been submitted yet.
              </p>
            ) : (
              feedback.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {item.customerName || "Anonymous"}
                      </p>

                      <p className="mt-1 text-gray-700">
                        "{item.message}"
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        {item.category || "Uncategorized"} ·{" "}
                        {item.source}
                      </p>
                    </div>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                      {item.sentiment}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </>
    )}
  </section>
</main>

);
}
