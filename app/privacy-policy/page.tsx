import PublicHeader from '@/components/public/PublicHeader';
import PublicFooter from '@/components/public/PublicFooter';
import SectionHeading from '@/components/ui/SectionHeading';

export default function PrivacyPolicyPage() {
  return (
    <>
      <PublicHeader />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Privacy policy"
          title="How ELTECH handles information and client enquiries."
          description="This summary explains the basic principles behind how we manage inquiries, project information, and communication data."
        />

        <div className="mt-10 space-y-6 rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-base leading-8 text-slate-600">
            ELTECH IT SOLUTIONS collects contact and project information only to respond to enquiries, discuss project requirements, and provide the services requested by the client.
          </p>
          <p className="text-base leading-8 text-slate-600">
            Information submitted through our contact or quote forms is used only for enquiry handling, project scoping, and communication about services. We do not sell personal data or share it with unrelated third parties.
          </p>
          <p className="text-base leading-8 text-slate-600">
            We take reasonable steps to protect information submitted through our website and internal systems, and we retain enquiry records only as long as needed for business operations and legal compliance.
          </p>
          <p className="text-base leading-8 text-slate-600">
            If you would like to update or remove information you submitted, please contact us directly at hello@eltechsolutions.com.
          </p>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
