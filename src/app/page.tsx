import Image from "next/image";

export default function LandingPage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <h1 className="text-5xl font-bold text-blue-700 mb-4">LearnMate AI</h1>
      <p className="text-xl text-gray-700 mb-8">Your AI-powered learning companion.</p>
      <div className="flex gap-4">
        <a href="/signup" className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">Get Started</a>
        <a href="/learn" className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded shadow hover:bg-blue-50 transition">Learn More</a>
      </div>
    </section>
  );
}
