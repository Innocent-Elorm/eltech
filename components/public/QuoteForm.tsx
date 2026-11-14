'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { submitQuote } from '@/lib/actions';

const steps = [
  { label: 'Company', title: 'Company and contact details' },
  { label: 'Project', title: 'Tell us about the project' },
  { label: 'Technical', title: 'Technical requirements' },
  { label: 'Design', title: 'Design direction' },
  { label: 'Pricing', title: 'Budget and timing' },
];

const fieldClassName =
  'mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100';
const labelClassName = 'block text-sm font-medium text-slate-700';

export function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (currentStep > 0) {
      stepHeadingRef.current?.focus();
    }
  }, [currentStep]);

  function reportInvalidField(field: HTMLElement) {
    field.focus();
    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement) {
      field.reportValidity();
    }
  }

  function continueToNextStep() {
    const activeStep = stepRefs.current[currentStep];
    const invalidField = activeStep?.querySelector<HTMLElement>(':invalid');

    if (invalidField) {
      reportInvalidField(invalidField);
      return;
    }

    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const activeStep = stepRefs.current[currentStep];
    const invalidField = activeStep?.querySelector<HTMLElement>(':invalid');

    if (invalidField) {
      event.preventDefault();
      reportInvalidField(invalidField);
    }
  }

  return (
    <form
      action={submitQuote}
      noValidate
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm"
    >
      <div className="border-b border-slate-200 px-6 py-6 md:px-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#2563EB]">
              Step {currentStep + 1} of {steps.length}
            </p>
            <h2 ref={stepHeadingRef} tabIndex={-1} className="mt-1 text-lg font-semibold text-[#101D35]">{steps[currentStep].title}</h2>
          </div>
          <span className="text-sm font-medium text-slate-500">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div
          className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-label="Project brief progress"
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-valuenow={currentStep + 1}
        >
          <div
            className="h-full rounded-full bg-[#2563EB] transition-[width] duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <ol aria-label="Project brief steps" className="mt-5 grid grid-cols-5 gap-2">
          {steps.map((step, index) => {
            const isComplete = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <li key={step.label} aria-current={isCurrent ? 'step' : undefined}>
                <div className={`flex items-center gap-1.5 text-xs font-medium sm:gap-2 sm:text-sm ${isCurrent ? 'text-[#2563EB]' : isComplete ? 'text-[#101D35]' : 'text-slate-400'}`}>
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] ${isCurrent ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]' : isComplete ? 'border-[#2563EB] bg-[#2563EB] text-white' : 'border-slate-300'}`}>
                    {isComplete ? <Check className="h-3.5 w-3.5" /> : index + 1}
                  </span>
                  <span className="truncate">{step.label}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="p-6 md:p-8">
        <section
          ref={(element) => { stepRefs.current[0] = element; }}
          aria-labelledby="company-details-heading"
          hidden={currentStep !== 0}
        >
          <h2 id="company-details-heading" tabIndex={-1} className="sr-only">Company and contact details</h2>
          <p className="mb-6 text-sm leading-6 text-slate-600">Share the best way to reach you and a little about your organization.</p>
          <div className="grid gap-5 md:grid-cols-2">
            <label className={labelClassName}>
              Your name
              <input name="name" autoComplete="name" required className={fieldClassName} />
            </label>
            <label className={labelClassName}>
              Company or organization
              <input name="organization" autoComplete="organization" required className={fieldClassName} />
            </label>
            <label className={labelClassName}>
              Email address
              <input type="email" name="email" autoComplete="email" required className={fieldClassName} />
            </label>
            <label className={labelClassName}>
              Phone number
              <input type="tel" name="phone" autoComplete="tel" required className={fieldClassName} />
            </label>
            <label className={labelClassName}>
              Your role <span className="font-normal text-slate-500">(optional)</span>
              <input name="companyRole" autoComplete="organization-title" className={fieldClassName} />
            </label>
            <label className={labelClassName}>
              Company location <span className="font-normal text-slate-500">(optional)</span>
              <input name="companyLocation" autoComplete="address-level2" className={fieldClassName} />
            </label>
          </div>
        </section>

        <section
          ref={(element) => { stepRefs.current[1] = element; }}
          aria-labelledby="project-details-heading"
          hidden={currentStep !== 1}
        >
          <h2 id="project-details-heading" tabIndex={-1} className="sr-only">Project overview</h2>
          <p className="mb-6 text-sm leading-6 text-slate-600">Describe the outcome you are looking for and the work you need help with.</p>
          <div className="grid gap-5">
            <label className={labelClassName}>
              What kind of service do you need?
              <input name="service" required className={fieldClassName} />
            </label>
            <label className={labelClassName}>
              What should this project help you achieve?
              <textarea name="description" rows={5} required className={fieldClassName} />
            </label>
            <label className={labelClassName}>
              Key features or functionality
              <textarea name="features" rows={4} required className={fieldClassName} />
            </label>
          </div>
        </section>

        <section
          ref={(element) => { stepRefs.current[2] = element; }}
          aria-labelledby="technical-requirements-heading"
          hidden={currentStep !== 2}
        >
          <h2 id="technical-requirements-heading" tabIndex={-1} className="sr-only">Technical requirements</h2>
          <p className="mb-6 text-sm leading-6 text-slate-600">Include any systems, tools, or technical constraints we should consider. It is fine if these details are still undecided.</p>
          <label className={labelClassName}>
            Existing systems, integrations, or technical requirements
            <textarea name="technicalRequirements" rows={6} className={fieldClassName} />
          </label>
        </section>

        <section
          ref={(element) => { stepRefs.current[3] = element; }}
          aria-labelledby="design-direction-heading"
          hidden={currentStep !== 3}
        >
          <h2 id="design-direction-heading" tabIndex={-1} className="sr-only">Design direction</h2>
          <p className="mb-6 text-sm leading-6 text-slate-600">Help us understand who will use the solution and how you want it to feel.</p>
          <div className="grid gap-5">
            <label className={labelClassName}>
              Who will use this product or service?
              <textarea name="targetAudience" rows={3} className={fieldClassName} />
            </label>
            <label className={labelClassName}>
              Design preferences, examples, or brand requirements
              <textarea name="designPreferences" rows={4} className={fieldClassName} />
            </label>
            <label className={labelClassName}>
              Anything else we should know? <span className="font-normal text-slate-500">(optional)</span>
              <textarea name="additional" rows={3} className={fieldClassName} />
            </label>
          </div>
        </section>

        <section
          ref={(element) => { stepRefs.current[4] = element; }}
          aria-labelledby="pricing-heading"
          hidden={currentStep !== 4}
        >
          <h2 id="pricing-heading" tabIndex={-1} className="sr-only">Budget and timing</h2>
          <p className="mb-6 text-sm leading-6 text-slate-600">Your estimate and timing help us suggest a realistic way forward.</p>
          <div className="grid gap-5 md:grid-cols-2">
            <label className={labelClassName}>
              Estimated budget or range
              <input name="budget" required placeholder="e.g. GHS 10,000-20,000 or not sure yet" className={fieldClassName} />
            </label>
            <label className={labelClassName}>
              When would you like to begin?
              <select name="timeline" required defaultValue="" className={fieldClassName}>
                <option value="" disabled>Select a preferred timeframe</option>
                <option value="As soon as possible">As soon as possible</option>
                <option value="Within 1 month">Within 1 month</option>
                <option value="Within 1-3 months">Within 1-3 months</option>
                <option value="More than 3 months">More than 3 months</option>
                <option value="Flexible">Flexible</option>
              </select>
            </label>
          </div>
        </section>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep((step) => Math.max(step - 1, 0))}
            disabled={currentStep === 0}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-[#2563EB] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={continueToNextStep}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]">
              Send project brief <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
