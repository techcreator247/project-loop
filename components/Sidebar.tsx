export default function Sidebar() {
return ( <aside className="w-64 min-h-screen bg-white border-r p-6"> <div> <h1 className="text-2xl font-bold text-gray-900">
LOOP </h1>


    <p className="mt-1 text-sm text-gray-500">
      Feedback Intelligence
    </p>
  </div>

  <nav className="mt-8 space-y-2">
    <a
      href="/"
      className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
    >
      Dashboard
    </a>

    <a
      href="/feedback"
      className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
    >
      Feedback
    </a>

    <a
      href="/analytics"
      className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
    >
      Analytics
    </a>

    <a
      href="/ai-insights"
      className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
    >
      AI Insights
    </a>

    <a
      href="/ask-loop"
      className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
    >
      Ask LOOP
    </a>

    <a
      href="/settings"
      className="block rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
    >
      Settings
    </a>
  </nav>
</aside>


);
}
