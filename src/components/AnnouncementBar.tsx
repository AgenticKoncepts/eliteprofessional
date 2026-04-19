import { useI18n } from "@/lib/i18n";

export function AnnouncementBar() {
  const { t } = useI18n();
  const text = t("announce");
  return (
    <div className="bg-announcement text-announcement-foreground text-xs tracking-wider py-2 overflow-hidden">
      <div className="flex whitespace-nowrap marquee">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="px-12 inline-flex items-center gap-3">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
