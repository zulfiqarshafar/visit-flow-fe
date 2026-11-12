import { useEffect, useState } from "react";
import api from "../api/api";

function ActivityForm({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    segment: "",
    entityId: "",
    visitDate: "",
  });
  const [entities, setEntities] = useState([]);
  const [loadingEntities, setLoadingEntities] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isFormInvalid = () => {
    return !form.segment || !form.entityId || !form.visitDate;
  };

  // Fetch entities
  useEffect(() => {
    const fetchEntities = async () => {
      setLoadingEntities(true);
      setError("");

      try {
        const response = await api.get("/entities", {
          params: {
            segment: form.segment,
          },
        });

        setEntities(response.data);
      } catch (err) {
        console.error("Gagal mengambil data", err);
        setError("Gagal mengambil data.");
        setEntities([]);
      } finally {
        setLoadingEntities(false);
      }
    };

    fetchEntities();
  }, [form.segment]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSegmentChange = (e) => {
    setForm((prev) => ({
      ...prev,
      segment: e.target.value,
      entityId: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormInvalid()) {
      setError("Semua field harus diisi!");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await api.post("/activities", {
        entityId: parseInt(form.entityId),
        segment: form.segment,
        visitDate: form.visitDate,
      });

      onSuccess();
    } catch (err) {
      console.error("Gagal menyimpan data", err);

      setError(err.response?.data?.message || "Gagal menyimpan data.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h1 className="text-lg font-semibold">Tambah Kunjungan</h1>

          <button
            type="button"
            onClick={onClose}
            className="text-3xl text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6 text-sm">
          {/* Segmen */}
          <div>
            <label className="mb-2 block text-gray-700">Segmen</label>

            <select
              name="segment"
              value={form.segment}
              onChange={handleSegmentChange}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="" disabled>
                Pilih segmen
              </option>
              <option value="B2B">B2B</option>
              <option value="B2G">B2G</option>
            </select>
          </div>

          {/* Entitas */}
          <div>
            <label className="mb-2 block text-gray-700">Entitas</label>

            <select
              name="entityId"
              value={form.entityId}
              onChange={handleChange}
              required
              disabled={!form.segment || loadingEntities}
              className="w-full rounded-md border border-gray-300 px-3 py-2 disabled:bg-gray-100"
            >
              <option value="" disabled>
                {!form.segment
                  ? "Pilih segmen terlebih dahulu"
                  : loadingEntities
                    ? "Loading..."
                    : "Pilih entitas"}
              </option>

              {entities.map((entity) => (
                <option key={entity.id} value={entity.id}>
                  {entity.name}
                </option>
              ))}
            </select>

            {form.segment && !loadingEntities && entities.length === 0 && (
              <p className="mt-2 text-xs text-gray-500">
                Tidak ada entitas yang tersedia.
              </p>
            )}
          </div>

          {/* Tanggal Kunjungan */}
          <div>
            <label className="mb-2 block text-gray-700">
              Tanggal Kunjungan
            </label>

            <input
              type="date"
              name="visitDate"
              value={form.visitDate}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-white bg-gray-700 hover:bg-gray-800 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isFormInvalid() || submitting || loadingEntities}
              className="rounded-md bg-blue-600 px-4 py-2  text-white hover:not-disabled:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ActivityForm;
