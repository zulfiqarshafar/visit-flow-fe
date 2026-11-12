import { useCallback, useEffect, useState } from "react";
import ActivityTable from "../components/ActivityTable";
import ActivityFilters from "../components/ActivityFilters";
import api from "../api/api";
import ActivityForm from "../components/ActivityForm";

function DashboardPage({ onLogout }) {
  const [filters, setFilters] = useState({
    search: "",
    segment: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const params = {
        search: filters.search,
        segment: filters.segment,
        status: filters.status,
        from: filters.dateFrom,
        to: filters.dateTo,
      };

      Object.keys(params).forEach((key) => {
        if (!params[key]) {
          delete params[key];
        }
      });

      const response = await api.get("/activities", {
        params,
      });

      setActivities(response.data);
    } catch (err) {
      console.error("Gagal mengambil data", err);

      setError("Gagal mengambil data!");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      segment: "",
      status: "",
      dateFrom: "",
      dateTo: "",
    });
  };

  const handleToggleStatus = async (activity) => {
    const newStatus = activity.status === "VISITED" ? "NOT_VISITED" : "VISITED";

    try {
      const response = await api.patch(`/activities/${activity.id}`, {
        status: newStatus,
      });

      setActivities((prevActivities) =>
        prevActivities.map((act) =>
          act.id === activity.id ? { ...act, ...response.data } : act,
        ),
      );
    } catch (err) {
      console.error("Gagal memperbarui data", err);
      setError("Gagal memperbarui data!");
    }
  };

  const handleCreateSuccess = async () => {
    setShowForm(false);
    await fetchActivities();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Visit Flow</h1>
        <button
          className="rounded-md bg-red-700 px-4 py-2 text-sm text-white hover:bg-red-800 cursor-pointer"
          onClick={onLogout}
        >
          Log out
        </button>
      </div>

      {/* Filter */}
      <ActivityFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        resetFilters={resetFilters}
      />

      <div className="mb-4 flex justify-between">
        <button
          onClick={() => setShowForm(true)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 cursor-pointer"
        >
          Tambah Kunjungan
        </button>
      </div>

      {/* Content */}
      <ActivityTable
        activities={activities}
        loading={loading}
        error={error}
        onToggleStatus={handleToggleStatus}
      />

      {/* Modal */}
      {showForm && (
        <ActivityForm
          onClose={() => setShowForm(false)}
          onSuccess={handleCreateSuccess}
        />
      )}
    </div>
  );
}
export default DashboardPage;
