// GRACE highlighter: colors the rule blocks (untagged fences, which kramdown marks
// language-plaintext, or ```grace). Words come from grace-words.js, generated from
// GRACE-lang.md. Light-mode classes only; INKs makes dark. Without JS the rules read as
// plain text, which is fine.
(function () {
  const W = window.GRACE_WORDS;
  if (!W) return;
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const span = (cls, s) => `<span class="${cls}">${s}</span>`;
  const MODAL = "text-orange-700"; // color only, as highlighters do; brand stays for the one action
  const WORD = "text-violet-700";
  const ACTION = "text-sky-700";
  const LABEL = "opacity-50";
  const SURFACE = "opacity-60";

  const modalRe = new RegExp("\\b(?:MUST NOT|" + W.modal.join("|") + ")\\b", "g");
  const wordRe = new RegExp("\\b(?:" + W.reserved.join("|") + ")\\b", "g");
  const surfaceRe = new RegExp("^(\\s*)((?:" + W.surface.join("|") + "):)(.*)$");
  const labelRe = /^(\s*)([A-Z][A-Za-z ]*? \d+(?:\.\d+)?[a-z]?:)/;

  function line(text) {
    const s = text.match(surfaceRe);
    if (s) return esc(s[1]) + span(SURFACE, esc(s[2] + s[3]));
    let lead = "", body = text;
    const l = text.match(labelRe);
    if (l) { lead = esc(l[1]) + span(LABEL, esc(l[2])); body = text.slice(l[0].length); }
    // one pass over tokens so a later rule never re-colors inside an earlier span
    const tok = /(\[[^\]\n]+\])|\b(MUST NOT|[A-Z]{2,})\b/g;
    let out = "", at = 0, m;
    while ((m = tok.exec(body))) {
      out += esc(body.slice(at, m.index));
      const t = m[0];
      if (m[1]) out += span(ACTION, esc(t));
      else if (t.match(modalRe)) out += span(MODAL, t);
      else if (t.match(wordRe)) out += span(WORD, t);
      else out += esc(t);
      modalRe.lastIndex = 0; wordRe.lastIndex = 0;
      at = m.index + t.length;
    }
    return lead + out + esc(body.slice(at));
  }

  function run() {
    document.querySelectorAll(".language-plaintext pre code, .language-grace pre code")
      .forEach((code) => { code.innerHTML = code.textContent.split("\n").map(line).join("\n"); });
  }
  if (document.readyState !== "loading") run();
  else document.addEventListener("DOMContentLoaded", run);
})();
