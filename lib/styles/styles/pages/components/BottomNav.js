import Link from "next/link";
import { useRouter } from "next/router";

const TABS = [
  { href: "/", label: "Bosh sahifa" },
  { href: "/jobs", label: "Ishlar" },
  { href: "/post", label: "E'lon" },
  { href: "/profile", label: "Profil" },
];

export default function BottomNav() {
  const router = useRouter();
  return (
    <nav className="tabbar">
      {TABS.map((t) => (
        <Link key={t.href} href={t.href} className={router.pathname === t.href ? "active" : ""}>
          {t.label}
        </Link>
      ))}
    </nav>
  );
                                                    }
