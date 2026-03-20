/**
 * WebMCP HTML attribute extensions for React/JSX.
 *
 * Adds `toolname` and `tooldescription` attributes to <form> elements,
 * enabling declarative WebMCP tool discovery by Chrome 146+ agents.
 */
import "react";

declare module "react" {
  interface FormHTMLAttributes<T> {
    toolname?: string;
    tooldescription?: string;
  }
}
