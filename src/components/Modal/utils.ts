export function getFocusableElements(container: HTMLElement) {
  return container.querySelectorAll(
    "button, input, a[href], select, textarea, [tabindex]:not([tabindex='-1'])",
  ) as NodeListOf<HTMLElement>;
}
