function ActivityFilters({ filters, onFilterChange, resetFilters }) {
  return (
    <div className="mb-6 rounded-lg border border-gray-200 p-5 text-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="mb-2 block text-gray-700">Cari Nama Entitas</label>

          <input
            type="text"
            placeholder="Cari nama entitas..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        {/* Segmen */}
        <div>
          <label className="mb-2 block text-gray-700">Segmen</label>

          <select
            value={filters.segment}
            onChange={(e) => onFilterChange("segment", e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="">Semua Segmen</option>
            <option value="B2B">B2B</option>
            <option value="B2G">B2G</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="mb-2 block text-gray-700">Status</label>

          <select
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="">Semua Status</option>
            <option value="VISITED">Visited</option>
            <option value="NOT_VISITED">Not Visited</option>
          </select>
        </div>

        {/* Tanggal awal */}
        <div>
          <label className="mb-2 block text-gray-700">Tanggal Awal</label>

          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onFilterChange("dateFrom", e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        {/* Tanggal akhir */}
        <div>
          <label className="mb-2 block text-gray-700">Tanggal Akhir</label>

          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => onFilterChange("dateTo", e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <button
          onClick={resetFilters}
          className="self-end w-full lg:w-1/2 rounded-md border border-gray-300 bg-gray-100 px-4 py-2 hover:bg-gray-200 cursor-pointer"
        >
          Reset filter
        </button>
      </div>
    </div>
  );
}

export default ActivityFilters;
