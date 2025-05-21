"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

// Mock platform course data (only structure needed here, data comes from LS)
const platformCoursesData = [
  {
    id: "course-1",
    title: "Introduction to Biology", // Keep title/description for fallback/initial load
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

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [allCourses, setAllCourses] = useState<any[]>([]); // State to hold all courses from LS

  // Load courses from Local Storage on mount and find the current course
  useEffect(() => {
    if (!courseId) return;

    const savedEnrolled = localStorage.getItem('enrolledCourses');
    const savedCustom = localStorage.getItem('customCourses');

    const enrolledIds: string[] = savedEnrolled ? JSON.parse(savedEnrolled) : [];
    const custom: any[] = savedCustom ? JSON.parse(savedCustom) : [];

    // Combine enrolled platform courses and custom courses
    const combinedCourses = [
      ...platformCoursesData.filter(pc => enrolledIds.includes(pc.id)),
      ...custom
    ];

    setAllCourses(combinedCourses);

    const found = combinedCourses.find((c) => c.id === courseId);
    if (found) {
      setCourse(found);
    } else {
        setCourse(null); // Course not found
    }
  }, [courseId]);

  // Update local storage when modules for the current course change
  useEffect(() => {
      if (!course || !allCourses.length) return;

      // Find the index of the current course in the allCourses array
      const courseIndex = allCourses.findIndex(c => c.id === course.id);
      if (courseIndex === -1) return; // Should not happen if course is found

      // Create updated lists for enrolled and custom courses
      const updatedEnrolled = allCourses.filter(c => platformCoursesData.some(pc => pc.id === c.id)).map(c => c.id);
      const updatedCustom = allCourses.filter(c => !platformCoursesData.some(pc => pc.id === c.id));

      // Save back to local storage
      localStorage.setItem('enrolledCourses', JSON.stringify(updatedEnrolled));
      localStorage.setItem('customCourses', JSON.stringify(updatedCustom));

  }, [allCourses, course]); // Dependency on allCourses state

  function handleToggleModule(moduleId: string) {
    if (!course) return;

    // Update the modules in the current course state
    const updatedModules = course.modules.map((m: any) =>
      m.id === moduleId ? { ...m, completed: !m.completed } : m
    );

    // Update the course state
    setCourse({ ...course, modules: updatedModules });

    // Also update the allCourses state to trigger Local Storage save
    setAllCourses(prevAllCourses => 
        prevAllCourses.map(c => 
            c.id === course.id ? { ...c, modules: updatedModules } : c
        )
    );
  }

  if (course === null) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <div className="text-gray-500">Course not found.</div>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => router.push('/courses')}>
          Back to Courses
        </button>
      </div>
    );
  }

  const progress = course.modules && course.modules.length
    ? Math.round((course.modules.filter((m: any) => m.completed).length / course.modules.length) * 100)
    : 0;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button className="mb-4 px-4 py-2 bg-gray-200 rounded" onClick={() => router.push('/courses')}>
        ← Back to Courses
      </button>
      <div className="flex flex-col sm:flex-row gap-6 mb-6">
        <img src={course.image} alt={course.title} className="rounded w-full sm:w-48 h-32 object-cover" />
        <div>
          <h2 className="text-3xl font-bold mb-2 text-gray-900">{course.title}</h2>
          <div className="text-gray-700 mb-2">{course.description}</div>
          <div className="text-sm text-gray-600 mb-2">Progress: {progress}%</div>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">Modules & Lessons</h3>
      {course.modules && course.modules.length > 0 ? (
          <ul className="space-y-3 mb-6">
            {course.modules.map((mod: any) => (
              <li key={mod.id} className="flex items-center gap-3 bg-gray-50 rounded p-3">
                <input
                  type="checkbox"
                  checked={mod.completed}
                  onChange={() => handleToggleModule(mod.id)}
                  className="accent-blue-600 w-5 h-5"
                />
                <span className={`flex-1 ${mod.completed ? "line-through text-gray-400" : "text-gray-900"}`}>{mod.title}</span>
              </li>
            ))}
          </ul>
      ) : (
          <div className="text-gray-500">No modules or lessons available for this course yet.</div>
      )}

      <button
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => {
          if (!course || !course.modules) return;
          const firstIncomplete = course.modules.findIndex((m: any) => !m.completed);
          if (firstIncomplete !== -1) {
             // Navigate to the learn page (placeholder for now)
             // In the future, pass course and module ID: router.push(`/learn/${course.id}/${course.modules[firstIncomplete].id}`);
             router.push('/learn');
          } else {
            window.alert("All modules completed! You can still revisit any lesson.");
          }
        }}
        disabled={!course || !course.modules || course.modules.length === 0}
      >
        {course && course.modules && course.modules.some((m: any) => !m.completed) ? "Start/Continue Learning" : "View Lessons"}
      </button>
    </div>
  );
} 