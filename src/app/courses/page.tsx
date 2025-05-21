"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const platformCourses = [
  {
    id: "course-1",
    title: "Introduction to Biology",
    description: "Learn the basics of biology, from cells to ecosystems.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    modules: [
      { id: "m1", title: "Cells", completed: false },
      { id: "m2", title: "Genetics", completed: false },
      { id: "m3", title: "Ecosystems", completed: false },
    ],
  },
  {
    id: "course-2",
    title: "Algebra Essentials",
    description: "Master the foundations of algebra for all levels.",
    image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
    modules: [
      { id: "m1", title: "Linear Equations", completed: false },
      { id: "m2", title: "Quadratic Equations", completed: false },
      { id: "m3", title: "Polynomials", completed: false },
    ],
  },
  {
    id: "course-3",
    title: "World History",
    description: "Explore key events and civilizations from ancient to modern times.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    modules: [
      { id: "m1", title: "Ancient Civilizations", completed: false },
      { id: "m2", title: "Middle Ages", completed: false },
      { id: "m3", title: "Modern History", completed: false },
    ],
  },
  {
    id: "course-4",
    title: "Creative Writing",
    description: "Unlock your creativity and improve your writing skills.",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80",
    modules: [
      { id: "m1", title: "Storytelling Basics", completed: false },
      { id: "m2", title: "Character Development", completed: false },
      { id: "m3", title: "Publishing", completed: false },
    ],
  },
];

export default function CoursesPage() {
  const [enrolled, setEnrolled] = useState<string[]>([]);
  const [customCourses, setCustomCourses] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", image: "" });
  const [error, setError] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const savedEnrolled = localStorage.getItem('enrolledCourses');
    if (savedEnrolled) {
      setEnrolled(JSON.parse(savedEnrolled));
    }
    const savedCustom = localStorage.getItem('customCourses');
    if (savedCustom) {
      setCustomCourses(JSON.parse(savedCustom));
    }
  }, []);

  // Save to localStorage when enrolled or customCourses change
  useEffect(() => {
    localStorage.setItem('enrolledCourses', JSON.stringify(enrolled));
  }, [enrolled]);

  useEffect(() => {
    localStorage.setItem('customCourses', JSON.stringify(customCourses));
  }, [customCourses]);


  function handleEnroll(courseId: string) {
    setEnrolled((prev) => (prev.includes(courseId) ? prev : [...prev, courseId]));
  }

  function handleAddCustomCourse(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.description) {
      setError("Please fill in all fields.");
      return;
    }
    setCustomCourses([
      ...customCourses,
      {
        id: `custom-${Date.now()}`,
        title: form.title,
        description: form.description,
        image: form.image || "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80",
        modules: [], // Custom courses start with no modules
      },
    ]);
    setShowModal(false);
    setForm({ title: "", description: "", image: "" });
    setError("");
  }

  const allMyCourses = [
      ...platformCourses.filter(course => enrolled.includes(course.id)),
      ...customCourses
  ];


  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Courses</h2>
      {/* Platform Course Library */}
      <h3 className="text-xl font-semibold mb-4 text-gray-900">Available Courses</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {platformCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
            <img src={course.image} alt={course.title} className="rounded mb-3 h-32 w-full object-cover" />
            <div className="font-bold text-lg text-gray-900 mb-1">{course.title}</div>
            <div className="text-gray-700 mb-3 text-sm">{course.description}</div>
            <button
              className={`mt-auto px-4 py-2 rounded font-semibold transition ${{
                true: "bg-gray-400 text-white cursor-not-allowed",
                false: "bg-blue-600 hover:bg-blue-700 text-white",
              }[enrolled.includes(course.id)]}`}
              onClick={() => handleEnroll(course.id)}
              disabled={enrolled.includes(course.id)}
            >
              {enrolled.includes(course.id) ? "Enrolled" : "Enroll"}
            </button>
          </div>
        ))}
      </div>
      {/* My Courses Section */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">My Courses</h3>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded shadow font-semibold"
          onClick={() => setShowModal(true)}
        >
          + Create Course
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30">
          <form className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md relative" onSubmit={handleAddCustomCourse}>
            <button type="button" className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setShowModal(false)}>&times;</button>
            <h4 className="text-lg font-bold mb-4 text-gray-900">Create Custom Course</h4>
            {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}
            <div className="mb-2">
              <label className="block text-sm font-bold mb-1 text-gray-900">Title</label>
              <input className="w-full border border-gray-400 rounded px-2 py-1 text-gray-900" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-bold mb-1 text-gray-900">Description</label>
              <textarea className="w-full border border-gray-400 rounded px-2 py-1 text-gray-900" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-1 text-gray-900">Image URL (optional)</label>
              <input className="w-full border border-gray-400 rounded px-2 py-1 text-gray-900" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} />
            </div>
            {/* Placeholder for Generate Lessons from Documents */}
            <div className="mb-4 p-3 border border-dashed border-gray-300 rounded text-center text-gray-600">
              Generate lessons from uploaded documents (Coming Soon)
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold">Add Course</button>
          </form>
        </div>
      )}
      {allMyCourses.length === 0 ? (
        <div className="text-gray-500">You have not enrolled in or created any courses yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allMyCourses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`} className="bg-blue-50 rounded-lg shadow p-4 flex flex-col cursor-pointer hover:shadow-md transition">
              <img src={course.image} alt={course.title} className="rounded mb-3 h-32 w-full object-cover" />
              <div className="font-bold text-lg text-blue-900 mb-1">{course.title}</div>
              <div className="text-blue-800 mb-3 text-sm">{course.description}</div>
              {/* This span might be removed or changed later if we add progress bar to card */}
              {platformCourses.some(pc => pc.id === course.id) ? (
                  <span className="mt-auto px-4 py-2 rounded bg-blue-600 text-white font-semibold text-center">Enrolled</span>
              ) : (
                 <span className="mt-auto px-4 py-2 rounded bg-green-600 text-white font-semibold text-center">Custom Course</span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 