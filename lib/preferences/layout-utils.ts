export function applyContentLayout(value: "centered" | "full-width") {
  document.documentElement.setAttribute("data-content-layout", value);
}

export function applyNavbarStyle(value: "sticky" | "scroll") {
  document.documentElement.setAttribute("data-navbar-style", value);
}

export function applySidebarVariant(value: string) {
  document.documentElement.setAttribute("data-sidebar-variant", value);
}

export function applySidebarCollapsible(value: string) {
  document.documentElement.setAttribute("data-sidebar-collapsible", value);
}

export function applyFont(value: string) {
  document.documentElement.setAttribute("data-font", value);
}
