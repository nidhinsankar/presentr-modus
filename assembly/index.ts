export * from "./quote";
export * from "./youtube";
export * from "./todos";
export * from "./presentation";
export function sayHello(name: string | null = null): string {
  return `Hello, ${name || "World"}!`;
}
