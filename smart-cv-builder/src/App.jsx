import React, { useState } from "react";
import Header from "./Components/Header";
import FormSection from "./Components/FormSection";
import ResumePreview from "./Components/ResumePreview";

export default function App() {
  // Mobile responsive layout toggle
  const [activeTab, setActiveTab] = useState("edit");
  const [loadingField, setLoadingField] = useState(null);

  // Resume State Management
  const [resumeData, setResumeData] = useState({
    fullName: "John Doe",
    role: "Frontend Developer",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    summary:
      "Detail-oriented Frontend Developer with hands-on experience in building responsive web applications using React and Tailwind CSS.",
    skills:
      "React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Git, REST APIs",
    education: "B.Tech in Computer Science and Engineering - AKTU (2026)",
    experience: [
      {
        id: 1,
        role: "Web Development Intern",
        company: "Technohacks Solutions",
        duration: "July 2025 - August 2025",
        details:
          "Developed responsive user interfaces using HTML, CSS, and JavaScript. Optimized site load time and cross-browser compatibility.",
      },
    ],
  });

  // Handle standard text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({ ...prev, [name]: value }));
  };

  // Dynamic Experience Handlers
  const handleExperienceChange = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    }));
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          role: "",
          company: "",
          duration: "",
          details: "",
        },
      ],
    }));
  };

  const removeExperience = (id) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  // AI Suggestion Handler (Integrated with API + Fallback)
  const handleAiEnhance = async (type, expId = null) => {
    const fieldKey = expId ? `exp-${expId}` : type;
    setLoadingField(fieldKey);

    const originalText =
      type === "summary"
        ? resumeData.summary
        : resumeData.experience.find((e) => e.id === expId)?.details;

    try {
      // API payload to enhance content
      const prompt = `Refine and improve the following text for a professional resume in clear bullet points/concise sentences: "${originalText}"`;

      // API fetch logic (Uses environment variable or fallback simulated AI)
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (apiKey) {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          },
        );
        const data = await response.json();
        const enhancedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (enhancedText) {
          applyEnhancement(type, expId, enhancedText.trim());
          return;
        }
      }

      // Offline / Local AI Fallback Simulation
      setTimeout(() => {
        const simulatedOutput =
          type === "summary"
            ? "Results-driven Frontend Engineer with expertise in building scalable, accessible, and fast web applications using React.js and modern JavaScript."
            : "• Built high-performance, responsive UI components using React and Tailwind CSS.\n• Collaborated with team members to integrate REST APIs and improve application render speed by 25%.";

        applyEnhancement(type, expId, simulatedOutput);
      }, 1000);
    } catch (error) {
      console.error("AI Processing Error:", error);
    } finally {
      setLoadingField(null);
    }
  };

  const applyEnhancement = (type, expId, text) => {
    if (type === "summary") {
      setResumeData((prev) => ({ ...prev, summary: text }));
    } else if (type === "experience" && expId) {
      handleExperienceChange(expId, "details", text);
    }
  };

  // Trigger Browser Print for PDF Output
  const handlePrint = () => {
    window.print();
  };

  return (
    <div class="min-h-screen flex flex-col bg-slate-100">
      {/* Top Bar */}
      <Header
        onPrint={handlePrint}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main class="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form Column */}
        <div class={`${activeTab === "edit" ? "block" : "hidden"} lg:block`}>
          <FormSection
            resumeData={resumeData}
            onChange={handleInputChange}
            onExperienceChange={handleExperienceChange}
            onAddExperience={addExperience}
            onRemoveExperience={removeExperience}
            onAiEnhance={handleAiEnhance}
            loadingField={loadingField}
          />
        </div>

        {/* Live Preview Column */}
        <div class={`${activeTab === "preview" ? "block" : "hidden"} lg:block`}>
          <div class="sticky top-20">
            <ResumePreview resumeData={resumeData} />
          </div>
        </div>
      </main>
    </div>
  );
}
