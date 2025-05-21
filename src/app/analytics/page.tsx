"use client";
import React, { useState, useEffect } from "react";

// Mock platform course data structure (data loaded from LS)
const platformCoursesData = [
  {
    id: "course-1",
    title: "Introduction to Biology",
    modules: [
      { id: "m1", title: "Cells" },
      { id: "m2", title: "Genetics" },
      { id: "m3", title: "Ecosystems" },
    ],
  },
  {
    id: "course-2",
    title: "Algebra Essentials",
    modules: [
      { id: "m1", title: "Linear Equations" },
      { id: "m2", title: "Quadratic Equations" },
      { id: "m3", title: "Polynomials" },
    ],
  },
    {
    id: "course-3",
    title: "World History",
    modules: [
      { id: "m1", title: "Ancient Civilizations" },
      { id: "m2", title: "Middle Ages" },
      { id: "m3", title: "Modern History" },
    ],
  },
  {
    id: "course-4",
    title: "Creative Writing",
    modules: [
      { id: "m1", title: "Storytelling Basics" },
      { id: "m2", title: "Character Development" },
      { id: "m3", title: "Publishing" },
    ],
  },
];

type DocumentMetadata = {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: string;
};

type Course = {
    id: string;
    title: string;
    modules: { id: string; title: string; completed: boolean }[];
    // Add other properties if needed for display (image, description)
    image?: string; // Optional
    description?: string; // Optional
};

export default function AnalyticsPage() {
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [documents, setDocuments] = useState<DocumentMetadata[]>([]);
  const [completedCoursesCount, setCompletedCoursesCount] = useState(0);

  useEffect(() => {
    // Load enrolled and custom courses from Local Storage
    const savedEnrolled = localStorage.getItem('enrolledCourses');
    const savedCustom = localStorage.getItem('customCourses');
    const savedDocuments = localStorage.getItem('documents');

    const enrolledIds: string[] = savedEnrolled ? JSON.parse(savedEnrolled) : [];
    const custom: any[] = savedCustom ? JSON.parse(savedCustom) : [];
    const docs: DocumentMetadata[] = savedDocuments ? JSON.parse(savedDocuments) : [];

    // Combine enrolled platform courses and custom courses, including module completion
    const combinedCourses = platformCoursesData
      .filter(pc => enrolledIds.includes(pc.id))
      .map(pc => {
        // Find the corresponding course in Local Storage to get module completion status
        const lsCourse = custom.find(c => c.id === pc.id); // Check custom first for updated data
        const modulesWithCompletion = lsCourse ? lsCourse.modules : pc.modules.map(m => ({...m, completed: false}));

         // If not found in custom, check if it's a platform course saved with completion status
         if(!lsCourse) {
             const savedAllCourses = localStorage.getItem('allCoursesWithCompletion'); // A new key to potentially store combined data
             if(savedAllCourses) {
                 const parsedSavedCourses = JSON.parse(savedAllCourses);
                 const savedPlatformCourse = parsedSavedCourses.find((c: any) => c.id === pc.id);
                  if(savedPlatformCourse) {
                      return {...pc, modules: savedPlatformCourse.modules};
                  }
             }
         }

        return { ...pc, modules: modulesWithCompletion };
      });

    // Add custom courses (they already contain module completion from the Courses page)
    const allMyCourses: Course[] = [...combinedCourses, ...custom];

    setMyCourses(allMyCourses);
    setDocuments(docs);

    // Calculate completed courses count
    const completedCount = allMyCourses.filter(course =>
        course.modules.length > 0 && course.modules.every(module => module.completed)
    ).length;
    setCompletedCoursesCount(completedCount);

    // Note: For future persistence of module completion across pages without full context API,
    // saving a combined 'allCoursesWithCompletion' array to LS might be simpler.
    // For now, this page reads from the 'enrolledCourses' and 'customCourses' keys.

  }, []); // Run only on mount

   // Helper to calculate progress percentage
   function calculateProgress(modules: Course['modules']) {
       if (!modules || modules.length === 0) return 0;
       const completedCount = modules.filter(m => m.completed).length;
       return Math.round((completedCount / modules.length) * 100);
   }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Analytics</h2>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-100 text-blue-800 rounded-lg shadow-sm p-5 font-semibold">
          <div className="text-2xl">{myCourses.length}</div>
          <div className="text-sm font-medium opacity-90">Total Courses</div>
        </div>
        <div className="bg-green-100 text-green-800 rounded-lg shadow-sm p-5 font-semibold">
          <div className="text-2xl">{completedCoursesCount}</div>
          <div className="text-sm font-medium opacity-90">Completed Courses</div>
        </div>
        <div className="bg-purple-100 text-purple-800 rounded-lg shadow-sm p-5 font-semibold">
          <div className="text-2xl">{documents.length}</div>
          <div className="text-sm font-medium opacity-90">Documents Uploaded</div>
        </div>
         <div className="bg-yellow-100 text-yellow-800 rounded-lg shadow-sm p-5 font-semibold opacity-50 cursor-not-allowed" title="Coming Soon">
          <div className="text-2xl">--</div>
          <div className="text-sm font-medium opacity-90">Study Time (Soon)</div>
        </div>
      </div>

      {/* Course Progress Overview */}
      <h3 className="text-xl font-semibold mb-4 text-gray-900">Course Progress Overview</h3>
      {myCourses.length === 0 ? (
          <div className="text-gray-500">Enroll in or create courses to see progress here.</div>
      ) : (
          <ul className="space-y-4">
              {myCourses.map(course => {
                  const progress = calculateProgress(course.modules);
                  return (
                      <li key={course.id} className="bg-white rounded-lg shadow-sm p-4">
                          <div className="font-medium text-gray-900 mb-1">{course.title}</div>
                           <div className="w-full bg-gray-200 rounded-full h-2.5">
                               <div
                                   className="bg-blue-600 h-2.5 rounded-full"
                                   style={{ width: `${progress}%` }}
                               ></div>
                           </div>
                           <div className="text-sm text-gray-600 mt-1">{progress}% Complete</div>
                      </li>
                  );
              })}
          </ul>
      )}

      {/* Activity Charts Placeholder */}
       <div className="mt-8 p-6 border-2 border-dashed border-gray-300 rounded-lg text-center opacity-50 cursor-not-allowed" title="Coming Soon">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Study Activity Trends (Soon)</h3>
            <p className="text-gray-600">Charts showing your learning activity over time will appear here.</p>
       </div>

    </div>
  );
} 