import Link from "next/link";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";

export const dynamic = "force-dynamic";

export default async function NotFound({ params }: { params: Promise<{ locale: string }> }) {
  const resolved = await params;
  const locale = resolved?.locale ?? "ar";
  const l = locale as Locale;
  const dict = getDictionary(l);

  return (
    <div className="panel error-page">
      <p className="eyebrow eyebrow-gold">خارج المسار</p>
      <h2 className="display display-m">هذا الباب لا يؤدي إلى عالم بعد.</h2>
      <p>قد يكون الرابط قديمًا أو غير مكتمل. يمكنك العودة إلى البداية، أو استكشاف عالم الإعلام.</p>
      <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
        <Link href={localizedPath(l, "/")} className="btn btn-gold">
          {dict.common.backToHome}
        </Link>
        <Link href={localizedPath(l, "/media")} className="btn btn-ghost">
          {dict.nav.media}
        </Link>
      </div>
    </div>
  );
}

