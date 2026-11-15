import { experiences } from "../data/experiences.js";
export async function loadExperiences({ mode = "normal", signal } = {}) {
  await new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, 500);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new DOMException("Cancelled", "AbortError"));
      },
      { once: true },
    );
  });
  if (signal?.aborted) throw new DOMException("Cancelled", "AbortError");
  if (mode === "failure")
    throw new Error(
      "Our trip list could not be loaded. Your saved plan is safe.",
    );
  if (mode === "empty") return [];
  return experiences.map((item) => ({
    ...item,
    seats:
      mode === "changed" && item.id === "margalla-sunrise" ? 0 : item.seats,
    title:
      mode === "content" && item.id === "margalla-sunrise"
        ? "Margalla sunrise: the very long scenic route through the quieter forest paths, with a slow breakfast and time to take in the view"
        : item.title,
    art:
      mode === "content" && item.id === "margalla-sunrise"
        ? "missing"
        : item.art,
    description:
      mode === "content" && item.id === "margalla-sunrise"
        ? ""
        : item.description,
  }));
}
