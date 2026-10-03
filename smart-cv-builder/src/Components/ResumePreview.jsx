import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ResumePreview({ resumeData }) {
    // Split skills by comma into tags
    const skillsList = resumeData.skills
        ? resumeData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
        : [];

    return (
        <div class="print-area bg-white p-8 rounded-xl shadow-lg border border-slate-200 min-h-[750px] flex flex-col justify-between">
            <div>
                {/* Header Section */}
                <div class="border-b-2 border-indigo-600 pb-4 mb-6">
                    <h1 class="text-3xl font-bold text-slate-900 tracking-tight">
                        {resumeData.fullName || "Your Name"}
                    </h1>
                    <p class="text-md font-medium text-indigo-600 mt-1">
                        {resumeData.role || "Target Job Title"}
                    </p>

                    {/* Contact Details */}
                    <div class="flex flex-wrap gap-4 text-xs text-slate-600 mt-3">
                        {resumeData.email && (
                            <span class="flex items-center gap-1">
                                <Mail class="w-3.5 h-3.5 text-slate-400" />
                                {resumeData.email}
                            </span>
                        )}
                        {resumeData.phone && (
                            <span class="flex items-center gap-1">
                                <Phone class="w-3.5 h-3.5 text-slate-400" />
                                {resumeData.phone}
                            </span>
                        )}
                        <span class="flex items-center gap-1">
                            <MapPin class="w-3.5 h-3.5 text-slate-400" />
                            Bareilly, UP, India
                        </span>
                    </div>
                </div>

                {/* Summary */}
                {resumeData.summary && (
                    <div class="mb-6">
                        <h2 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                            Professional Summary
                        </h2>
                        <p class="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                            {resumeData.summary}
                        </p>
                    </div>
                )}

                {/* Experience */}
                {resumeData.experience.length > 0 && (
                    <div class="mb-6">
                        <h2 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                            Work Experience
                        </h2>
                        <div class="space-y-4">
                            {resumeData.experience.map((exp) => (
                                <div key={exp.id}>
                                    <div class="flex justify-between items-baseline">
                                        <h3 class="text-sm font-semibold text-slate-800">
                                            {exp.role || "Position Title"}
                                            <span class="text-slate-500 font-normal">
                                                {exp.company ? ` at ${exp.company}` : ""}
                                            </span>
                                        </h3>
                                        <span class="text-xs text-slate-500 font-medium">
                                            {exp.duration}
                                        </span>
                                    </div>
                                    <p class="text-xs text-slate-600 mt-1 leading-relaxed whitespace-pre-line">
                                        {exp.details ||
                                            "Job responsibilities and key deliverables..."}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {resumeData.education && (
                    <div class="mb-6">
                        <h2 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                            Education
                        </h2>
                        <p class="text-sm text-slate-700">{resumeData.education}</p>
                    </div>
                )}

                {/* Skills */}
                {skillsList.length > 0 && (
                    <div>
                        <h2 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                            Technical Skills
                        </h2>
                        <div class="flex flex-wrap gap-1.5">
                            {skillsList.map((skill, index) => (
                                <span
                                    key={index}
                                    class="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md border border-slate-200 font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Branding */}
            <div class="no-print border-t border-slate-100 pt-3 mt-6 text-center text-xs text-slate-400">
                Generated with Smart Resume Builder
            </div>
        </div>
    );
}
