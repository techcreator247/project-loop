export const dynamic = "force-dynamic";

export default function AIInsightsPage() {
return ( <main className="min-h-screen bg-gray-50 p-8"> <div className="mx-auto max-w-5xl"> <a
       href="/"
       className="text-sm font-medium text-blue-600 hover:underline"
     >
← Back to Dashboard </a>


    <div className="mt-6">
      <h1 className="text-3xl font-bold text-gray-900">
        AI Insights
      </h1>

      <p className="mt-2 text-gray-600">
        Understand the key insights from your customer feedback.
      </p>
    </div>

    <div className="mt-8 grid gap-6 md:grid-cols-3">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          Customer Sentiment
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          Mostly Positive
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Customers are generally satisfied with the product.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          Top Theme
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          Delivery
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Delivery speed is a recurring topic in customer feedback.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          AI Recommendation
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          Improve Delivery
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Review delivery speed and tracking communication.
        </p>
      </div>
    </div>

    <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">
        Key Customer Insight
      </h2>

      <p className="mt-4 leading-7 text-gray-700">
        Customers are responding positively to product quality,
        while delivery remains an area that could be improved.
        Faster delivery and clearer tracking information may
        improve the overall customer experience.
      </p>
    </section>

    <section className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">
        Recommended Actions
      </h2>

      <div className="mt-4 space-y-3">
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="font-medium text-gray-900">
            1. Review delivery performance
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <p className="font-medium text-gray-900">
            2. Improve shipment tracking updates
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <p className="font-medium text-gray-900">
            3. Monitor recurring delivery complaints
          </p>
        </div>
      </div>
    </section>
  </div>
</main>


);
}
