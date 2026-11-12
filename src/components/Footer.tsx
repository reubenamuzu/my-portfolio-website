import type { IconType } from "react-icons";
import { FaGithub, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from "react-icons/fa6";
import { LuArrowUp } from "react-icons/lu";
import { accentFor } from "@/data/projects";
import { site, socials, type SocialId } from "@/data/site";

const ICONS: Record<SocialId, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  instagram: FaInstagram,
};

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-line bg-bg-deep/70">
      <div className="shell flex flex-col items-center gap-7 py-10 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="logo">
            AMSON
            <span className="logo-tag" aria-hidden="true">
              [DEV]
            </span>
          </p>
          <p className="mt-2 text-sm text-ink-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>

        <ul className="flex flex-wrap justify-center gap-3">
          {socials.map((social, i) => {
            const Icon = ICONS[social.id];
            return (
              <li key={social.id}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social accent-${accentFor(i)}`}
                  aria-label={`${social.label} (opens in a new tab)`}
                >
                  <Icon aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>

        <a href="#top" className="to-top" aria-label="Back to top">
          <LuArrowUp aria-hidden="true" size={20} />
        </a>
      </div>
    </footer>
  );
}
