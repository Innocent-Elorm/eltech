type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  onDarkBackground?: boolean;
};

export default function SectionHeading({ eyebrow, title, description, align = 'left', onDarkBackground = false }: Props) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const eyebrowClass = onDarkBackground ? 'text-blue-200' : 'text-[#2563EB]';
  const titleClass = onDarkBackground ? 'text-white' : 'text-[#101D35]';
  const descriptionClass = onDarkBackground ? 'text-slate-300' : 'text-slate-600';

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow ? <p className={`mb-3 text-sm font-semibold uppercase tracking-[0.2em] ${eyebrowClass}`}>{eyebrow}</p> : null}
      <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${titleClass}`}>{title}</h2>
      {description ? <p className={`mt-4 text-lg ${descriptionClass}`}>{description}</p> : null}
    </div>
  );
}
