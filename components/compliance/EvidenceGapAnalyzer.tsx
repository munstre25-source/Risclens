"use client";

import { useState } from "react";
import { Upload, FileText, AlertTriangle, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function EvidenceGapAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    try {
      const res = await fetch("/api/evidence-gap-analyzer", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
      setStep(2);
    } catch (error) {
      console.error("Error analyzing policy:", error);
    } finally {
      setLoading(false);
    }
  };

  if (step === 2 && result) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card className="border border-slate-200 shadow-xl overflow-hidden rounded-2xl">
          <div className="bg-slate-50 border-b border-slate-200 px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Analysis Complete</h2>
                <p className="text-slate-500">Your SOC 2 Evidence Gap Report</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-slate-500 font-medium">Coverage Score</div>
                  <div className="text-3xl font-bold text-brand-600">{result.coverage_score}%</div>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-slate-100 flex items-center justify-center relative">
                    <svg className="w-12 h-12 transform -rotate-90">
                        <circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            className="text-slate-100"
                        />
                        <circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            strokeDasharray={`${2 * Math.PI * 20}`}
                            strokeDashoffset={`${2 * Math.PI * 20 * (1 - result.coverage_score / 100)}`}
                            className="text-brand-600"
                        />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-400">SOC2</span>
                </div>
              </div>
            </div>
          </div>
          <CardContent className="p-8">
            <div className="mb-10">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Overall Compliance Readiness</span>
                    <span className="text-sm font-medium text-slate-500">{result.coverage_score}%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-brand-600 transition-all duration-1000 ease-out"
                        style={{ width: `${result.coverage_score}%` }}
                    />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <div className="bg-green-100 p-1.5 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  Controls Covered ({result.controls_covered?.length || 0})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.controls_covered?.map((c: string) => (
                    <span key={c} className="bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold font-mono shadow-sm">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <div className="bg-amber-100 p-1.5 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  </div>
                  Identified Gaps ({result.gaps?.length || 0})
                </h3>
                <div className="space-y-4">
                  {result.gaps?.map((gap: any, i: number) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-brand-200 transition-colors group">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold font-mono text-brand-600 bg-brand-50 px-2 py-0.5 rounded uppercase tracking-tighter">{gap.control}</span>
                        <div className="w-2 h-2 rounded-full bg-amber-400 group-hover:animate-pulse" />
                      </div>
                      <div className="text-sm font-bold text-slate-800 mb-1">{gap.issue}</div>
                      <div className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100 mt-2">
                        <span className="font-bold text-slate-700">Action:</span> {gap.recommendation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-brand-900 rounded-2xl text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <CheckCircle className="w-32 h-32" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-2xl font-bold mb-2">Close these gaps in 30 days?</h4>
                  <p className="text-brand-100 text-lg opacity-90 leading-relaxed">
                    Our compliance experts can help you implement the missing controls and get you audit-ready faster.
                  </p>
                </div>
                <Button className="shrink-0 bg-white text-brand-900 hover:bg-brand-50 font-bold px-8 h-14 rounded-xl text-lg shadow-xl shadow-brand-950/20">
                  Book a Gap Review
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <Button variant="ghost" className="text-slate-500 hover:text-brand-600 font-medium" onClick={() => setStep(1)}>
            Analyze Another Document
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-2xl border-slate-200 rounded-2xl overflow-hidden">
      <CardHeader className="bg-slate-50 border-b border-slate-200 px-8 py-10">
        <CardTitle className="text-2xl font-bold text-slate-900">Upload Your Security Policy</CardTitle>
        <CardDescription className="text-slate-500 text-base">
          Supports PDF format. Your data is processed securely and not stored permanently.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div 
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 group ${file ? 'border-brand-500 bg-brand-50/50' : 'border-slate-200 hover:border-brand-300 hover:bg-slate-50/50'}`}
          >
            <input
              type="file"
              id="policy-upload"
              className="hidden"
              accept=".pdf"
              onChange={handleFileChange}
            />
            <label htmlFor="policy-upload" className="cursor-pointer">
              {file ? (
                <div className="space-y-4 animate-in zoom-in-95">
                  <div className="bg-brand-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                    <FileText className="w-10 h-10 text-brand-600" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-lg text-slate-900">{file.name}</div>
                    <div className="text-sm text-slate-500 font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="bg-slate-100 group-hover:bg-brand-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto transition-colors shadow-inner">
                    <Upload className="w-10 h-10 text-slate-400 group-hover:text-brand-600 transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-xl text-slate-900">Click to upload or drag & drop</div>
                    <p className="text-sm text-slate-500 font-medium italic">PDF format (max 10MB)</p>
                  </div>
                </div>
              )}
            </label>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Business Email</label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full flex h-14 rounded-xl border border-slate-200 bg-white px-4 py-2 text-base ring-offset-background placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-14 text-lg font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-xl shadow-brand-600/20 transition-all hover:-translate-y-0.5"
            disabled={!file || !email || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                Analyzing Document...
              </>
            ) : (
              "Run AI Gap Analysis"
            )}
          </Button>
          
          <div className="flex items-center justify-center gap-6 pt-4 grayscale opacity-50">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enterprise Secured</div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SOC 2 Compliant Pipeline</div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
