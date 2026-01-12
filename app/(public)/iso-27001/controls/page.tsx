import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthorBio } from '@/components/AuthorBio';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  Building2,
  Users,
  Lock,
  ChevronRight,
  FileText,
  Server,
  Key,
  Eye,
  AlertTriangle,
  Database,
  Wifi,
  HardDrive,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'ISO 27001:2022 Annex A Controls | Complete Guide to 93 Controls | RiscLens',
  description:
    'Complete reference guide to all 93 ISO 27001:2022 Annex A controls. Organized by theme: Organizational (37), People (8), Physical (14), and Technological (34).',
  alternates: {
    canonical: 'https://risclens.com/iso-27001/controls',
  },
};

const organizationalControls = [
  { id: 'A.5.1', title: 'Policies for information security', description: 'Establish and communicate information security policies.' },
  { id: 'A.5.2', title: 'Information security roles and responsibilities', description: 'Define and allocate security responsibilities.' },
  { id: 'A.5.3', title: 'Segregation of duties', description: 'Separate conflicting duties to reduce risk of fraud or error.' },
  { id: 'A.5.4', title: 'Management responsibilities', description: 'Ensure management enforces security policies.' },
  { id: 'A.5.5', title: 'Contact with authorities', description: 'Maintain appropriate contact with relevant authorities.' },
  { id: 'A.5.6', title: 'Contact with special interest groups', description: 'Maintain contact with security forums and associations.' },
  { id: 'A.5.7', title: 'Threat intelligence', description: 'Collect and analyze information about security threats.' },
  { id: 'A.5.8', title: 'Information security in project management', description: 'Integrate security into project management.' },
  { id: 'A.5.9', title: 'Inventory of information and other associated assets', description: 'Identify and maintain an inventory of assets.' },
  { id: 'A.5.10', title: 'Acceptable use of information and other associated assets', description: 'Define rules for acceptable use of assets.' },
  { id: 'A.5.11', title: 'Return of assets', description: 'Ensure return of assets upon termination.' },
  { id: 'A.5.12', title: 'Classification of information', description: 'Classify information according to its value and sensitivity.' },
  { id: 'A.5.13', title: 'Labelling of information', description: 'Develop procedures for labelling information.' },
  { id: 'A.5.14', title: 'Information transfer', description: 'Protect information during transfer.' },
  { id: 'A.5.15', title: 'Access control', description: 'Establish access control policy based on business requirements.' },
  { id: 'A.5.16', title: 'Identity management', description: 'Manage the full lifecycle of identities.' },
  { id: 'A.5.17', title: 'Authentication information', description: 'Control allocation of authentication information.' },
  { id: 'A.5.18', title: 'Access rights', description: 'Provision and revoke access rights.' },
  { id: 'A.5.19', title: 'Information security in supplier relationships', description: 'Address security in supplier agreements.' },
  { id: 'A.5.20', title: 'Addressing information security within supplier agreements', description: 'Include security requirements in supplier contracts.' },
  { id: 'A.5.21', title: 'Managing information security in the ICT supply chain', description: 'Manage security risks in the supply chain.' },
  { id: 'A.5.22', title: 'Monitoring, review and change management of supplier services', description: 'Monitor and review supplier services.' },
  { id: 'A.5.23', title: 'Information security for use of cloud services', description: 'Manage security of cloud service usage.' },
  { id: 'A.5.24', title: 'Information security incident management planning and preparation', description: 'Plan and prepare for incident management.' },
  { id: 'A.5.25', title: 'Assessment and decision on information security events', description: 'Assess security events and decide on classification.' },
  { id: 'A.5.26', title: 'Response to information security incidents', description: 'Respond to incidents according to procedures.' },
  { id: 'A.5.27', title: 'Learning from information security incidents', description: 'Use incidents to improve security.' },
  { id: 'A.5.28', title: 'Collection of evidence', description: 'Collect and preserve evidence.' },
  { id: 'A.5.29', title: 'Information security during disruption', description: 'Maintain security during disruptions.' },
  { id: 'A.5.30', title: 'ICT readiness for business continuity', description: 'Plan for ICT continuity.' },
  { id: 'A.5.31', title: 'Legal, statutory, regulatory and contractual requirements', description: 'Identify applicable requirements.' },
  { id: 'A.5.32', title: 'Intellectual property rights', description: 'Protect intellectual property.' },
  { id: 'A.5.33', title: 'Protection of records', description: 'Protect records from loss and unauthorized access.' },
  { id: 'A.5.34', title: 'Privacy and protection of PII', description: 'Ensure privacy and PII protection.' },
  { id: 'A.5.35', title: 'Independent review of information security', description: 'Conduct independent security reviews.' },
  { id: 'A.5.36', title: 'Compliance with policies, rules and standards for information security', description: 'Ensure compliance with security policies.' },
  { id: 'A.5.37', title: 'Documented operating procedures', description: 'Document operating procedures.' },
];

const peopleControls = [
  { id: 'A.6.1', title: 'Screening', description: 'Verify backgrounds of personnel before employment.' },
  { id: 'A.6.2', title: 'Terms and conditions of employment', description: 'Include security responsibilities in employment contracts.' },
  { id: 'A.6.3', title: 'Information security awareness, education and training', description: 'Provide ongoing security training.' },
  { id: 'A.6.4', title: 'Disciplinary process', description: 'Establish formal disciplinary process for security violations.' },
  { id: 'A.6.5', title: 'Responsibilities after termination or change of employment', description: 'Define post-employment security responsibilities.' },
  { id: 'A.6.6', title: 'Confidentiality or non-disclosure agreements', description: 'Use NDAs to protect confidential information.' },
  { id: 'A.6.7', title: 'Remote working', description: 'Implement security measures for remote work.' },
  { id: 'A.6.8', title: 'Information security event reporting', description: 'Enable and encourage event reporting.' },
];

const physicalControls = [
  { id: 'A.7.1', title: 'Physical security perimeters', description: 'Define and secure physical perimeters.' },
  { id: 'A.7.2', title: 'Physical entry', description: 'Secure areas with appropriate entry controls.' },
  { id: 'A.7.3', title: 'Securing offices, rooms and facilities', description: 'Design and apply physical security.' },
  { id: 'A.7.4', title: 'Physical security monitoring', description: 'Monitor premises continuously.' },
  { id: 'A.7.5', title: 'Protecting against physical and environmental threats', description: 'Protect against environmental risks.' },
  { id: 'A.7.6', title: 'Working in secure areas', description: 'Define procedures for working in secure areas.' },
  { id: 'A.7.7', title: 'Clear desk and clear screen', description: 'Implement clear desk and screen policies.' },
  { id: 'A.7.8', title: 'Equipment siting and protection', description: 'Position equipment to reduce risks.' },
  { id: 'A.7.9', title: 'Security of assets off-premises', description: 'Protect assets used outside premises.' },
  { id: 'A.7.10', title: 'Storage media', description: 'Manage storage media throughout lifecycle.' },
  { id: 'A.7.11', title: 'Supporting utilities', description: 'Protect equipment from power failures.' },
  { id: 'A.7.12', title: 'Cabling security', description: 'Protect power and telecommunications cabling.' },
  { id: 'A.7.13', title: 'Equipment maintenance', description: 'Maintain equipment to ensure availability.' },
  { id: 'A.7.14', title: 'Secure disposal or re-use of equipment', description: 'Sanitize equipment before disposal or re-use.' },
];

const technologicalControls = [
  { id: 'A.8.1', title: 'User endpoint devices', description: 'Protect information on endpoint devices.' },
  { id: 'A.8.2', title: 'Privileged access rights', description: 'Restrict and manage privileged access.' },
  { id: 'A.8.3', title: 'Information access restriction', description: 'Restrict access according to access control policy.' },
  { id: 'A.8.4', title: 'Access to source code', description: 'Restrict access to source code.' },
  { id: 'A.8.5', title: 'Secure authentication', description: 'Implement secure authentication mechanisms.' },
  { id: 'A.8.6', title: 'Capacity management', description: 'Monitor and manage resource capacity.' },
  { id: 'A.8.7', title: 'Protection against malware', description: 'Implement malware protection.' },
  { id: 'A.8.8', title: 'Management of technical vulnerabilities', description: 'Identify and address vulnerabilities.' },
  { id: 'A.8.9', title: 'Configuration management', description: 'Establish secure configurations.' },
  { id: 'A.8.10', title: 'Information deletion', description: 'Delete information when no longer required.' },
  { id: 'A.8.11', title: 'Data masking', description: 'Mask data according to access control policy.' },
  { id: 'A.8.12', title: 'Data leakage prevention', description: 'Apply DLP measures.' },
  { id: 'A.8.13', title: 'Information backup', description: 'Maintain and test backups.' },
  { id: 'A.8.14', title: 'Redundancy of information processing facilities', description: 'Implement redundancy for availability.' },
  { id: 'A.8.15', title: 'Logging', description: 'Produce, store, and protect logs.' },
  { id: 'A.8.16', title: 'Monitoring activities', description: 'Monitor networks and systems.' },
  { id: 'A.8.17', title: 'Clock synchronization', description: 'Synchronize clocks to reference time.' },
  { id: 'A.8.18', title: 'Use of privileged utility programs', description: 'Restrict and control utility program use.' },
  { id: 'A.8.19', title: 'Installation of software on operational systems', description: 'Control software installation.' },
  { id: 'A.8.20', title: 'Networks security', description: 'Secure and manage networks.' },
  { id: 'A.8.21', title: 'Security of network services', description: 'Identify security mechanisms for network services.' },
  { id: 'A.8.22', title: 'Segregation of networks', description: 'Segregate networks by function.' },
  { id: 'A.8.23', title: 'Web filtering', description: 'Manage access to external websites.' },
  { id: 'A.8.24', title: 'Use of cryptography', description: 'Define rules for cryptographic controls.' },
  { id: 'A.8.25', title: 'Secure development life cycle', description: 'Establish secure development rules.' },
  { id: 'A.8.26', title: 'Application security requirements', description: 'Identify security requirements.' },
  { id: 'A.8.27', title: 'Secure system architecture and engineering principles', description: 'Apply secure architecture principles.' },
  { id: 'A.8.28', title: 'Secure coding', description: 'Apply secure coding principles.' },
  { id: 'A.8.29', title: 'Security testing in development and acceptance', description: 'Define and implement security testing.' },
  { id: 'A.8.30', title: 'Outsourced development', description: 'Direct and monitor outsourced development.' },
  { id: 'A.8.31', title: 'Separation of development, test and production environments', description: 'Separate environments.' },
  { id: 'A.8.32', title: 'Change management', description: 'Control changes through change management.' },
  { id: 'A.8.33', title: 'Test information', description: 'Select and protect test information.' },
  { id: 'A.8.34', title: 'Protection of information systems during audit testing', description: 'Plan audit tests to minimize disruption.' },
];

const ControlSection = ({ 
  id, 
  title, 
  icon: Icon, 
  controls, 
  color 
}: { 
  id: string; 
  title: string; 
  icon: any; 
  controls: { id: string; title: string; description: string }[]; 
  color: string;
}) => (
  <section id={id} className="py-16 border-b border-slate-200">
    <div className="flex items-center gap-4 mb-8">
      <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div>
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{id.toUpperCase()}</span>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">{controls.length} Controls</p>
      </div>
    </div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {controls.map((control) => (
        <div key={control.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-200 hover:shadow-sm transition-all">
          <div className="flex items-start gap-3">
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded shrink-0">{control.id}</span>
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">{control.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{control.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default function ISO27001ControlsPage() {
  const breadcrumbItems = [
    { label: 'Frameworks', href: '/compliance' },
    { label: 'ISO 27001', href: '/iso-27001' },
    { label: 'Annex A Controls', href: '/iso-27001/controls' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <GeneralPageSchema
        title="ISO 27001:2022 Annex A Controls"
        description="Complete reference guide to all 93 ISO 27001:2022 Annex A controls."
        url="https://risclens.com/iso-27001/controls"
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'ISO 27001', item: 'https://risclens.com/iso-27001' },
          { name: 'Annex A Controls', item: 'https://risclens.com/iso-27001/controls' },
        ]}
      />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-blue-900 via-blue-900 to-blue-800 text-white py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-4">
            <Breadcrumbs items={breadcrumbItems} variant="dark" />
            <div className="mt-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-bold uppercase tracking-wider mb-6">
                <FileText className="w-4 h-4" />
                ISO 27001:2022
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
                Annex A Controls<br />
                <span className="text-blue-300">Complete Reference</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-3xl">
                The 2022 update reorganized controls from 114 in 14 domains to 93 controls in 4 themes: 
                Organizational, People, Physical, and Technological.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/iso-27001-checklist"
                  className="bg-white text-blue-900 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:bg-blue-50 transition-all flex items-center gap-2"
                >
                  Download Checklist
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/soc-2-readiness-calculator"
                  className="bg-white/10 text-white border border-white/20 font-bold px-6 py-3.5 rounded-xl hover:bg-white/20 transition-all"
                >
                  Assess Readiness
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4 bg-blue-50 border-b border-blue-200 sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <span className="font-medium text-blue-700">Jump to:</span>
              <a href="#a.5" className="px-3 py-1.5 bg-blue-100 rounded-lg text-blue-800 hover:bg-blue-200 font-medium flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                Organizational (37)
              </a>
              <a href="#a.6" className="px-3 py-1.5 bg-blue-100 rounded-lg text-blue-800 hover:bg-blue-200 font-medium flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                People (8)
              </a>
              <a href="#a.7" className="px-3 py-1.5 bg-blue-100 rounded-lg text-blue-800 hover:bg-blue-200 font-medium flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                Physical (14)
              </a>
              <a href="#a.8" className="px-3 py-1.5 bg-blue-100 rounded-lg text-blue-800 hover:bg-blue-200 font-medium flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" />
                Technological (34)
              </a>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4">
          <ControlSection 
            id="a.5" 
            title="Organizational Controls" 
            icon={Building2} 
            controls={organizationalControls}
            color="bg-blue-600"
          />
          <ControlSection 
            id="a.6" 
            title="People Controls" 
            icon={Users} 
            controls={peopleControls}
            color="bg-emerald-600"
          />
          <ControlSection 
            id="a.7" 
            title="Physical Controls" 
            icon={Shield} 
            controls={physicalControls}
            color="bg-amber-600"
          />
          <ControlSection 
            id="a.8" 
            title="Technological Controls" 
            icon={Lock} 
            controls={technologicalControls}
            color="bg-purple-600"
          />
        </div>

        <section className="py-20 bg-blue-900">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Implement These Controls?</h2>
            <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">
              Get a gap assessment to understand which controls you already have in place and what needs to be implemented.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/soc-2-readiness-calculator"
                className="w-full sm:w-auto bg-white text-blue-900 font-bold px-10 py-5 rounded-xl hover:bg-blue-50 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                Start Gap Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/iso-27001"
                className="w-full sm:w-auto bg-blue-800 text-white border border-blue-700 font-bold px-10 py-5 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                Back to ISO 27001 Hub
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <AuthorBio authorId="kevin" />
          </div>
        </section>

        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6 text-center">Related Resources</h3>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
              <Link href="/iso-27001" className="text-slate-600 hover:text-blue-600 font-medium">ISO 27001 Hub</Link>
              <Link href="/iso-27001-checklist" className="text-slate-600 hover:text-blue-600 font-medium">ISO 27001 Checklist</Link>
              <Link href="/soc-2-vs-iso-27001" className="text-slate-600 hover:text-blue-600 font-medium">SOC 2 vs ISO 27001</Link>
              <Link href="/soc-2" className="text-slate-600 hover:text-blue-600 font-medium">SOC 2 Hub</Link>
              <Link href="/vendor-risk-assessment" className="text-slate-600 hover:text-blue-600 font-medium">Vendor Risk</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
