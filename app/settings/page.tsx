export default function SettingsPage() {
return ( <main className="min-h-screen bg-gray-50 p-8"> <div className="mx-auto max-w-4xl"> <a
       href="/"
       className="text-sm font-medium text-blue-600 hover:underline"
     >
← Back to Dashboard </a>


    <h1 className="mt-6 text-3xl font-bold text-gray-900">
      Settings
    </h1>

    <p className="mt-2 text-gray-600">
      Manage your LOOP workspace settings.
    </p>

    <div className="mt-8 space-y-6">
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">
          Workspace
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          LOOP Demo Workspace
        </p>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">
          Feedback Sources
        </h2>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <span>Website</span>
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              Connected
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <span>CSV Upload</span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
              Available
            </span>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">
          AI Settings
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          AI-powered feedback analysis and customer insights.
        </p>

        <div className="mt-4 rounded-lg bg-gray-50 p-4">
          <p className="text-sm font-medium text-gray-700">
            AI Analysis
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Enabled for this workspace.
          </p>
        </div>
      </section>
    </div>
  </div>
</main>


);
}
