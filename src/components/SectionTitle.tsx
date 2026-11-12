import type { Accent } from "@/data/projects";

type Props = {
  /** Used for aria-labelledby on the parent <section>. */
  id: string;
  children: React.ReactNode;
  accent?: Accent;
};

/** Glowing diamond + uppercase title + a thin line running to the right edge. */
export default function SectionTitle({ id, children, accent = "cyan" }: Props) {
  return (
    <div className={`section-title accent-${accent}`}>
      <span className="diamond" aria-hidden="true" />
      <h2 id={id}>{children}</h2>
      <span className="section-rule" aria-hidden="true" />
    </div>
  );
}
