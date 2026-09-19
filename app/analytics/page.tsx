export const dynamic = "force-dynamic";

import Sidebar from "@/components/Sidebar";
import { prisma } from "@/lib/prisma";

export default async function AnalyticsPage() {
const feedback = await prisma.feedback.findMany({
orderBy: {
createdAt: "desc",
},
});

const total = feedback.length;

const positive = feedback.filter(
(item) => item.sentiment === "POSITIVE"
).length;

const negative = feedback.filter(
(item) => item.sentiment === "NEGATIVE"
).length;

const neutral = feedback.filter(
(item) => item.sentiment === "NEUTRAL"
).length;

const positivePercent =
total > 0 ? Math.round((positive / total) * 100) : 0;

const negativePercent =
total > 0 ? Math.round((negative / total) * 100) : 0;

const neutralPercent =
total > 0 ? Math.round((neutral / total) * 100) : 0;

const categories: Record<string, number> = {};

feedback.forEach((item) => {
const category = item.category || "Uncategorized";

categories[category] = (categories[category] || 0) + 1;

});

const topCategories = Object.entries(categories)
.sort((a, b) => b[1] - a[1])
.slice(0, 6);

return ( <main className="min-h-screen bg-gray-50 flex"> <Sidebar />

  <section className="flex-1 p-8">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        Analytics
      </h1>

      <p className="mt-2 text-gray-600">
        Analyze customer feedback, sentiment, and recurring themes.
      </p>
    </div>

    {/* Summary cards */}
    <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-4">
      <div className="rounded-xl border bg-white p-6">
        <p className="text-sm text-gray-500">
          Total Feedback
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {total}
        </h2>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <p className="text-sm text-gray-500">
          Positive
        </p>

        <h2 className="mt-2 text-3xl font-bold text-green-600">
          {positivePercent}%
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          {positive} responses
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <p className="text-sm text-gray-500">
          Neutral
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-600">
          {neutralPercent}%
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          {neutral} responses
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <p className="text-sm text-gray-500">
          Negative
        </p>

        <h2 className="mt-2 text-3xl font-bold text-red-600">
          {negativePercent}%
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          {negative} responses
        </p>
      </div>
    </div>

    {/* Sentiment analysis */}
    <div className="mt-8 rounded-xl border bg-white p-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Sentiment Analysis
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Distribution of customer sentiment
      </p>

      <div className="mt-6">
        <div className="flex h-8 w-full overflow-hidden rounded-full bg-gray-100">
          {positivePercent > 0 && (
            <div
              className="bg-green-500"
              style={{
                width: `${positivePercent}%`,
              }}
            />
          )}

          {neutralPercent > 0 && (
            <div
              className="bg-gray-400"
              style={{
                width: `${neutralPercent}%`,
              }}
            />
          )}

          {negativePercent > 0 && (
            <div
              className="bg-red-500"
              style={{
                width: `${negativePercent}%`,
              }}
            />
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-500" />
            Positive {positivePercent}%
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-gray-400" />
            Neutral {neutralPercent}%
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            Negative {negativePercent}%
          </div>
        </div>
      </div>
    </div>

    {/* Categories */}
    <div className="mt-8 rounded-xl border bg-white p-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Top Feedback Categories
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Areas customers mention most frequently.
      </p>

      <div className="mt-6 space-y-4">
        {topCategories.length === 0 ? (
          <p className="text-gray-500">
            No categories available.
          </p>
        ) : (
          topCategories.map(([category, count]) => {
            const percentage =
              total > 0
                ? Math.round((count / total) * 100)
                : 0;

            return (
              <div key={category}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">
                    {category}
                  </span>

                  <span className="text-gray-500">
                    {count} ({percentage}%)
                  </span>
                </div>

                <div className="mt-2 h-3 rounded-full bg-gray-100">
                  <div
                    className="h-3 rounded-full bg-black"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>

    {/* Insight */}
    <div className="mt-8 rounded-xl border bg-black p-6 text-white">
      <p className="text-sm font-medium text-gray-300">
        LOOP Insight
      </p>

      <h2 className="mt-2 text-xl font-semibold">
        Customer feedback overview
      </h2>

      <p className="mt-3 text-sm leading-6 text-gray-300">
        LOOP currently has {total} feedback items.{" "}
        {positive > negative
          ? "Positive feedback is currently higher than negative feedback."
          : negative > positive
          ? "Negative feedback is currently higher than positive feedback."
          : "Positive and negative feedback are currently balanced."}
      </p>
    </div>
  </section>
</main>

);
}
