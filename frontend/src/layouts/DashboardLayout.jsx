import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50">

      <div className="flex min-h-screen">

        {/* Sidebar */}

        <aside className="hidden lg:block">

          <Sidebar />

        </aside>

        {/* Main Content */}

        <div className="flex-1 flex flex-col">

          <Navbar />

          <main className="flex-1 overflow-y-auto p-6 lg:p-8">

            {children}

          </main>

        </div>

      </div>

    </div>
  );
}