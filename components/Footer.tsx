export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white">RiscLens</h3>
            <p className="text-sm text-slate-400">COMPLIANCE READINESS INFRASTRUCTURE</p>
          </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="/about" className="hover:text-slate-100 transition-colors">About</a>
              <a href="/privacy" className="hover:text-slate-100 transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-slate-100 transition-colors">Terms</a>
              <a href="mailto:hello@risclens.com" className="hover:text-slate-100 transition-colors">Contact</a>
            </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-sm text-slate-300 space-y-4">
          <p className="font-semibold text-slate-100">Disclaimer:</p>
          <p>
            RiscLens provides informational estimates only. We do not provide legal advice, audit services, or SOC 2 certification. All results are
            based on self-reported inputs and should be used for planning purposes only. For formal compliance guidance, consult a qualified auditor
            or legal professional.
          </p>
          <p className="text-slate-400 text-xs">© {new Date().getFullYear()} RiscLens. Your data is encrypted and never shared without consent.</p>
        </div>
      </div>
    </footer>
  );
}
