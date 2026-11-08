import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

type BrandLockupProps = {
  locale: Locale;
  priority?: boolean;
};

export function BrandLockup({ locale, priority = false }: BrandLockupProps) {
  const name = locale === "ar" ? "بسمة موسى" : "Basma Moussa";
  const product = locale === "ar" ? "عالم الإعلام" : "Media Universe";

  return (
    <Link href={localizedPath(locale)} className="brand-lockup">
      <span className="brand-lockup__icon">
        <Image
          src="/brand/basma-icon-circle.png"
          alt=""
          width={46}
          height={46}
          sizes="46px"
          priority={priority}
        />
      </span>
      <span className="brand-lockup__text">
        <span className="brand-lockup__word">{name}</span>
        <span className="brand-lockup__sub">{product}</span>
      </span>
    </Link>
  );
}
