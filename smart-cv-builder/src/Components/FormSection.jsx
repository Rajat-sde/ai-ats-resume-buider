import React from "react";
import { Sparkles, Plus, Trash2 } from "lucide-react";

export default function FormSection({
    resumeData,
    onChange,
    onExperienceChange,
    onAddExperience,
    onRemoveExperience,
    onAiEnhance,
    loadingField,
}) {
    return (
        <div class="space-y-6">
            {/* 1. Personal Details */}
            <section class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h2 class="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">
                    Personal Information
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-medium text-slate-600 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={resumeData.fullName}
                            onChange={onChange}
                            class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-slate-600 mb-1">
                            Target Role
                        </label>
                        <input
                            type="text"
                            name="role"
                            value={resumeData.role}
                            onChange={onChange}
                            class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="Frontend Developer"
                        />
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-slate-600 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={resumeData.email}
                            onChange={onChange}
                            class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-slate-600 mb-1">
                            Phone
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={resumeData.phone}
                            onChange={onChange}
                            class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="+1 234 567 890"
                        />
                    </div>
                </div>
            </section>

            {/* 2. Professional Summary with AI Button */}
            <section class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div class="flex items-center justify-between mb-4 border-b pb-2">
                    <h2 class="text-lg font-semibold text-slate-800">
                        Professional Summary
                    </h2>
                    <button
                        type="button"
                        onClick={() => onAiEnhance("summary")}
                        disabled={loadingField === "summary"}
                        class="flex items-center space-x-1.5 text-xs bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-200 transition"
                    >
                        <Sparkles class="w-3.5 h-3.5" />
                        <span>
                            {loadingField === "summary" ? "Enhancing..." : "AI Enhance"}
                        </span>
                    </button>
                </div>
                <textarea
                    name="summary"
                    rows="4"
                    value={resumeData.summary}
                    onChange={onChange}
                    class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                    placeholder="Brief overview of your career and key achievements..."
                />
            </section>

            {/* 3. Work Experience Dynamic Section */}
            <section class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div class="flex items-center justify-between mb-4 border-b pb-2">
                    <h2 class="text-lg font-semibold text-slate-800">Work Experience</h2>
                    <button
                        type="button"
                        onClick={onAddExperience}
                        class="flex items-center space-x-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition"
                    >
                        <Plus class="w-3.5 h-3.5" />
                        <span>Add Position</span>
                    </button>
                </div>

                <div class="space-y-4">
                    {resumeData.experience.map((exp, index) => (
                        <div
                            key={exp.id}
                            class="p-4 border border-slate-200 rounded-lg bg-slate-50 relative space-y-3"
                        >
                            {resumeData.experience.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => onRemoveExperience(exp.id)}
                                    class="absolute top-3 right-3 text-slate-400 hover:text-red-500 transition"
                                >
                                    <Trash2 class="w-4 h-4" />
                                </button>
                            )}

                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="Job Title"
                                    value={exp.role}
                                    onChange={(e) =>
                                        onExperienceChange(exp.id, "role", e.target.value)
                                    }
                                    class="px-3 py-1.5 text-sm border border-slate-300 rounded-md outline-none bg-white"
                                />
                                <input
                                    type="text"
                                    placeholder="Company"
                                    value={exp.company}
                                    onChange={(e) =>
                                        onExperienceChange(exp.id, "company", e.target.value)
                                    }
                                    class="px-3 py-1.5 text-sm border border-slate-300 rounded-md outline-none bg-white"
                                />
                            </div>

                            <div class="flex items-center justify-between">
                                <input
                                    type="text"
                                    placeholder="Duration (e.g. 2021 - Present)"
                                    value={exp.duration}
                                    onChange={(e) =>
                                        onExperienceChange(exp.id, "duration", e.target.value)
                                    }
                                    class="w-full sm:w-1/2 px-3 py-1.5 text-sm border border-slate-300 rounded-md outline-none bg-white"
                                />
                                <button
                                    type="button"
                                    onClick={() => onAiEnhance("experience", exp.id)}
                                    disabled={loadingField === `exp-${exp.id}`}
                                    class="flex items-center space-x-1 text-xs text-indigo-600 hover:underline font-medium"
                                >
                                    <Sparkles class="w-3.5 h-3.5" />
                                    <span>
                                        {loadingField === `exp-${exp.id}`
                                            ? "Improving..."
                                            : "Improve Description"}
                                    </span>
                                </button>
                            </div>

                            <textarea
                                rows="3"
                                placeholder="Key accomplishments and responsibilities..."
                                value={exp.details}
                                onChange={(e) =>
                                    onExperienceChange(exp.id, "details", e.target.value)
                                }
                                class="w-full px-3 py-2 text-sm border border-slate-300 rounded-md outline-none bg-white resize-none"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Education & Skills */}
            <section class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h2 class="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">
                    Education & Skills
                </h2>
                <div class="space-y-4">
                    <div>
                        <label class="block text-xs font-medium text-slate-600 mb-1">
                            Education Summary
                        </label>
                        <input
                            type="text"
                            name="education"
                            value={resumeData.education}
                            onChange={onChange}
                            class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="B.S. in Computer Science - University Name (2020 - 2024)"
                        />
                    </div>
                    <div>
                        <label class="block text-xs font-medium text-slate-600 mb-1">
                            Skills (Comma-separated)
                        </label>
                        <input
                            type="text"
                            name="skills"
                            value={resumeData.skills}
                            onChange={onChange}
                            class="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="React, JavaScript, Tailwind CSS, Git, HTML/CSS"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
