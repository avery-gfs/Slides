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

const pyodideReady = (async () => {
  const { loadPyodide } = await import("https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.mjs");
  const py = await loadPyodide();
  await py.loadPackage("micropip");         
  await py.runPythonAsync(`
    import micropip
  `); // to import python libaries "await micropip.install(<libary-name>) e.g await micropip.install("tenacity")
  return py;
})();

function injectRunButton() {
  document.querySelectorAll("pre code.language-python").forEach((codeEl) => {
    const pre = codeEl.closest("pre");
    if (pre.dataset.pyInjected) return;
    pre.dataset.pyInjected = "true";

    const btn = document.createElement("button");
    btn.textContent = "▶ Run";
    pre.after(btn);

    const output = document.createElement("pre");
    btn.after(output);

    btn.onclick = async () => {
      const py = await pyodideReady;
      let out = "";
      py.setStdout({ batched: s => out += s + "\n" });
      py.setStderr({ batched: s => out += s + "\n" });
      try {
      const result = await py.runPythonAsync(codeEl.innerText);
      output.textContent = out 
      } catch (err) {
        output.textContent = err.message
      }
    };
  });
}

Reveal.on("ready", injectRunButton);
Reveal.on("slidechanged", injectRunButton);