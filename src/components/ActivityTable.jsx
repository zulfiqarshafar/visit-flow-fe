function ActivityTable({ activities, loading, error, onToggleStatus }) {
  // Render a row for loading, error, or empty state
  const renderStateRow = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan="6" className="px-6 py-10">
            Loading...
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan="6" className="px-6 py-10 text-red-500">
            {error}
          </td>
        </tr>
      );
    }

    if (activities.length === 0) {
      return (
        <tr>
          <td colSpan="6" className="px-6 py-10">
            Tidak ada data
          </td>
        </tr>
      );
    }
    return null;
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <div className="border-b border-gray-200 px-6 py-4">
        <h1 className="text-lg font-semibold">Data Kunjungan</h1>

        <p className="mt-1 text-sm">{activities.length} data ditemukan</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-center text-sm">
          <thead className="bg-gray-200 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">Entitas</th>
              <th className="px-6 py-3">Segmen</th>
              <th className="px-6 py-3">Wilayah</th>
              <th className="px-6 py-3">Tanggal Kunjungan</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {renderStateRow() || // fallback rendering for loading, error, or empty state
              activities.map((activity) => (
                <tr key={activity.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-left">
                    {activity.entity_name}
                  </td>

                  <td className="px-6 py-4">{activity.segment}</td>

                  <td className="px-6 py-4">{activity.region}</td>

                  <td className="whitespace-nowrap px-6 py-4">
                    {activity.visit_date}
                  </td>

                  <td className="px-6 py-4">
                    {activity.status === "VISITED" ? "Visited" : "Not Visited"}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onToggleStatus(activity)}
                      className={`rounded-md border p-2 min-w-8/12 text-white cursor-pointer ${
                        activity.status === "VISITED"
                          ? "bg-yellow-600 hover:bg-yellow-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {activity.status === "VISITED"
                        ? "Mark as Not Visited"
                        : "Mark as Visited"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ActivityTable;
