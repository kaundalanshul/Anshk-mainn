import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";

const defaultAbout = {
  name: "Anshul Kaundal",
  role: "FULL STACK DEVELOPER",
  bio:
    "I design thoughtful digital experiences with a focus on usability, accessibility and visual storytelling. I work end-to-end — from research and wireframes to high-fidelity prototypes and handoff.",
};

const AboutContent = ({ token }) => {
  const [about, setAbout] = useState(defaultAbout);
  const [loading, setLoading] = useState(false);

  const fetchAbout = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/content/about`);
      if (res.data.success && res.data.data) {
        setAbout({ ...defaultAbout, ...res.data.data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAbout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAbout((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `${backendUrl}/api/content/about`,
        { data: about },
        { headers: { token } }
      );
      toast.success("About content updated");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update about");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
        <h2 className="text-xl font-bold text-gray-900">About Section Content</h2>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2 text-sm"
        >
          {loading ? "Saving..." : <><FaSave /> Save Changes</>}
        </button>
      </div>

      <div className="p-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Main</h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Name</label>
                <input
                  type="text"
                  name="name"
                  value={about.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Role</label>
                <input
                  type="text"
                  name="role"
                  value={about.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Bio</label>
                <textarea
                  name="bio"
                  value={about.bio}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-y text-sm"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Preview</h3>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <h4 className="text-xl font-bold text-gray-900">{about.name}</h4>
              <p className="text-sm text-gray-500">{about.role}</p>
              <p className="mt-4 text-gray-600 text-sm leading-relaxed">{about.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AboutContent;
