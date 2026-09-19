"use client";

import { FormEvent, useEffect, useState } from "react";

type Feedback = {
  id: string;
  customerName: string | null;
  message: string;
  category: string | null;
  sentiment: string;
  source: string;
  createdAt: string;
};

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [category, setCategory] = useState("");
  const [sentiment, setSentiment] = useState("NEUTRAL");
  const [success, setSuccess] = useState("");

  async function loadFeedback() {
    try {
      const response = await fetch("/api/feedback");

      if (!response.ok) {
        throw new Error("Failed to load feedback");
      }

      const data = await response.json();
      setFeedback(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFeedback();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    setSubmitting(true);
    setSuccess("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          customerName,
          category,
          sentiment,
          source: "website",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      setSuccess("Feedback submitted successfully!");

      setMessage("");
      setCustomerName("");
      setCategory("");
      setSentiment("NEUTRAL");

      await loadFeedback();
    } catch (error) {
      console.error(error);
      setSuccess("Failed to submit feedback.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">

        <a
          href="/"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Dashboard
        </a>

        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Customer Feedback
        </h1>

        <p className="mt-2 text-gray-600">
          Add new feedback and view existing customer feedback.
        </p>

        {/* Add Feedback Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-gray-900">
            Add New Feedback
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div>
              <label className="text-sm font-medium text-gray-700">
                Customer Name
              </label>

              <input
                type="text"
                value={customerName}
                onChange={(event) =>
                  setCustomerName(event.target.value)
                }
                placeholder="e.g. Rahul"
                className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>

              <input
                type="text"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                placeholder="e.g. Delivery"
                className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
              />
            </div>

          </div>

          <div className="mt-5">
            <label className="text-sm font-medium text-gray-700">
              Feedback
            </label>

            <textarea
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              placeholder="What did the customer say?"
              rows={5}
              required
              className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
            />
          </div>

          <div className="mt-5">
            <label className="text-sm font-medium text-gray-700">
              Sentiment
            </label>

            <select
              value={sentiment}
              onChange={(event) =>
                setSentiment(event.target.value)
              }
              className="mt-2 w-full rounded-lg border px-4 py-3"
            >
              <option value="POSITIVE">Positive</option>
              <option value="NEUTRAL">Neutral</option>
              <option value="NEGATIVE">Negative</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Feedback"}
          </button>

          {success && (
            <p className="mt-4 text-sm font-medium text-green-600">
              {success}
            </p>
          )}
        </form>

        {/* Existing Feedback */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Existing Feedback
          </h2>

          {loading ? (
            <p className="mt-4 text-gray-500">
              Loading feedback...
            </p>
          ) : feedback.length === 0 ? (
            <p className="mt-4 text-gray-500">
              No feedback has been submitted yet.
            </p>
          ) : (
            <div className="mt-5 space-y-4">
              {feedback.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {item.customerName || "Anonymous"}
                      </p>

                      <p className="text-sm text-gray-500">
                        {item.category || "Uncategorized"}
                      </p>
                    </div>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium">
                      {item.sentiment}
                    </span>
                  </div>

                  <p className="mt-4 text-gray-700">
                    {item.message}
                  </p>

                  <p className="mt-3 text-xs text-gray-400">
                    Source: {item.source}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}