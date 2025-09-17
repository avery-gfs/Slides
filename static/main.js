import Reveal from "/reveal.js/dist/reveal.esm.js";
import RevealMarkdown from "/reveal.js/plugin/markdown/markdown.esm.js";
import RevealMath from "/reveal.js/plugin/math/math.esm.js";
import RevealHighlight from "/reveal.js/plugin/highlight/highlight.esm.js";
import RevealNotes from "/reveal.js/plugin/notes/notes.esm.js";

Reveal.initialize({
  hash: true,
  center: false,
  controls: false,
  progress: false,
  transition: "none",
  plugins: [RevealMarkdown, RevealMath, RevealHighlight, RevealNotes],
});
