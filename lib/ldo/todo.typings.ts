import type { LdoJsonldContext, LdSet } from "@ldo/ldo";

/**
 * =============================================================================
 * Typescript Typings for todo
 * =============================================================================
 */

/**
 * Item Type
 */
export interface Item {
  "@id"?: string;
  "@context"?: LdoJsonldContext;
  /**
   * Human-readable title of the todo item
   */
  name: string;
  /**
   * Whether the todo item has been completed
   */
  done: boolean;
}
