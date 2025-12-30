import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | RiscLens SOC 2 Calculator',
  robots: 'noindex, nofollow',
};

// Server-side admin authentication check
async function validateAdmin(): Promise<boolean> {
  const cookieStore = cookies();
  const adminToken = cookieStore.get('admin_token')?.value;
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret) {
    console.error('ADMIN_SECRET environment variable not set');
    return false;
  }

  return adminToken === adminSecret;
}

// Admin login form component
function AdminLoginForm() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="card">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Admin Access
          </h1>
          <form action="/api/admin/login" method="POST">
            <div className="mb-4">
              <label htmlFor="secret" className="form-label">
                Admin Secret
              </label>
              <input
                type="password"
                id="secret"
                name="secret"
                required
                className="form-input"
                placeholder="Enter admin secret"
                autoComplete="off"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Admin dashboard component (placeholder for Pass B)
function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">
            RiscLens Admin Dashboard
          </h1>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="text-sm text-gray-600 hover:text-gray-900">
              Logout
            </button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="text-sm text-gray-500 mb-1">Total Leads</div>
            <div className="text-2xl font-bold text-gray-900">--</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-500 mb-1">Keep Leads</div>
            <div className="text-2xl font-bold text-trust-600">--</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-500 mb-1">Sell Leads</div>
            <div className="text-2xl font-bold text-orange-600">--</div>
          </div>
          <div className="card">
            <div className="text-sm text-gray-500 mb-1">Revenue</div>
            <div className="text-2xl font-bold text-brand-600">$--</div>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="form-label">Search</label>
              <input
                type="text"
                placeholder="Search by company or email..."
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Type</label>
              <select className="form-input">
                <option value="">All</option>
                <option value="keep">Keep</option>
                <option value="sell">Sell</option>
              </select>
            </div>
            <div>
              <label className="form-label">Industry</label>
              <select className="form-input">
                <option value="">All Industries</option>
              </select>
            </div>
            <button className="btn-secondary">
              Export CSV
            </button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Industry</th>
                  <th>Score</th>
                  <th>Type</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No leads yet. Leads will appear here after form submissions.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* A/B Testing Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">A/B Variants</h2>
          <div className="card">
            <p className="text-gray-500">A/B testing controls will be implemented in Pass B.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default async function AdminPage() {
  const isAuthenticated = await validateAdmin();

  if (!isAuthenticated) {
    return <AdminLoginForm />;
  }

  return <AdminDashboard />;
}

