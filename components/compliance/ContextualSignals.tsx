import { getSupabaseClient } from '@/lib/supabase';
import Link from 'next/link';

export type SignalData = {
  name: string;
  slug: string;
  domain: string;
  signal_score: number;
  industry: string;
  public_signals: {
    soc2_status?: string;
    has_security_page?: boolean;
    trust_url?: string;
  };
};

interface ContextualSignalsProps {
  industry?: string;
  limit?: number;
  title?: string;
  framework?: string;
}

export async function ContextualSignals({ 
  industry, 
  limit = 3, 
  title = "Real-world compliance examples",
  framework = "SOC 2"
}: ContextualSignalsProps) {
  const supabase = getSupabaseClient();
  
  let query = supabase
    .from('company_signals')
    .select('name, slug, domain, signal_score, public_signals, industry')
    .eq('indexable', true)
    .order('signal_score', { ascending: false });

  if (industry) {
    query = query.eq('industry', industry);
  }

  const { data: signals, error } = await query.limit(limit);

  if (error || !signals || signals.length === 0) {
    // Fallback if no specific industry signals found, get top general signals
    const { data: generalSignals } = await supabase
      .from('company_signals')
      .select('name, slug, domain, signal_score, public_signals, industry')
      .eq('indexable', true)
      .order('signal_score', { ascending: false })
      .limit(limit);
    
    if (!generalSignals || generalSignals.length === 0) return null;
    return <SignalsList signals={generalSignals as SignalData[]} title={title} framework={framework} />;
  }

  return <SignalsList signals={signals as SignalData[]} title={title} framework={framework} />;
}

function SignalsList({ signals, title, framework }: { signals: SignalData[], title: string, framework: string }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
          <svg className="w-4 h-4 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {title}
        </h3>
        <Link href="/compliance/directory" className="text-xs text-brand-600 hover:text-brand-700 font-medium">
          View full directory →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {signals.map((signal) => (
          <Link 
            key={signal.slug} 
            href={`/compliance/directory/${signal.slug}`}
            className="group bg-white border border-slate-100 p-4 rounded-lg hover:border-brand-200 hover:shadow-sm transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-900 group-hover:text-brand-700 transition-colors">{signal.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-brand-50 text-brand-700 rounded-full font-bold">
                {signal.signal_score}
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center text-[11px] text-slate-500">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                {framework} {signal.public_signals.soc2_status || 'Verified'}
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                {signal.industry} • {signal.domain}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-slate-400 italic">
        Signals extracted from public security and trust pages. Data is used for benchmarking and research.
      </p>
    </div>
  );
}
