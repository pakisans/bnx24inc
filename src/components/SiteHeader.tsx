import Link from "next/link";
import { Logo } from "./brand/Logo";
import { HeaderNav } from "./HeaderNav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-navy-900/8 bg-paper">
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="-m-2 flex items-center p-2" aria-label="BNX 24 Inc. home">
          <Logo className="h-7 w-auto sm:h-8" />
        </Link>
        <HeaderNav />
      </div>
    </header>
  );
}
