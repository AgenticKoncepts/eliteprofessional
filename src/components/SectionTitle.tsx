interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionTitle({ eyebrow, title, subtitle, align = "center" }: Props) {
  return (
    <div className={`mb-10 md:mb-14 ${align === "center" ? "text-center" : ""}`}>
      {eyebrow && (
        <div className="text-[11px] tracking-[0.4em] text-gold mb-3 font-medium">{eyebrow}</div>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-3">{title}</h2>
      {subtitle && (
        <p
          className={`text-muted-foreground max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
