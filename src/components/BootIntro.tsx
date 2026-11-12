/**
 * One-time "system boot" overlay.
 *
 * It is hidden by default. A tiny inline script in layout.tsx shows it on the
 * first visit only, then removes it after about a second, or straight away on
 * any key press or tap. It never shows when the visitor prefers reduced motion.
 */
export default function BootIntro() {
  return (
    <div className="boot" aria-hidden="true">
      <div className="w-full max-w-sm">
        <div className="mono space-y-1.5 text-cyan">
          <p className="boot-line">&gt; amson.sys booting</p>
          <p className="boot-line">&gt; loading projects</p>
          <p className="boot-line text-lime">&gt; ready</p>
        </div>
        <div className="boot-track mt-5">
          <div className="boot-fill" />
        </div>
        <p className="mono mt-4 text-[0.65rem] text-ink-muted">Press any key or tap to skip</p>
      </div>
    </div>
  );
}

/** Runs before the page paints. Kept as a string so it can be inlined in <head>. */
export const bootScript = `(function(){var d=document.documentElement;d.setAttribute('data-js','');try{if(localStorage.getItem('amson-boot')||matchMedia('(prefers-reduced-motion: reduce)').matches)return;localStorage.setItem('amson-boot','1')}catch(e){return}d.setAttribute('data-boot','run');var done=false;function end(){if(done)return;done=true;d.setAttribute('data-boot','out');setTimeout(function(){d.removeAttribute('data-boot')},200);removeEventListener('keydown',end);removeEventListener('pointerdown',end)}setTimeout(end,950);addEventListener('keydown',end);addEventListener('pointerdown',end)})();`;
