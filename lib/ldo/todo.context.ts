import type { LdoJsonldContext } from "@ldo/ldo";

/**
 * =============================================================================
 * todoContext: JSONLD Context for todo
 * =============================================================================
 */
export const todoContext: LdoJsonldContext = {
  name: {
    "@id": "urn:solid-todo:/name",
    "@type": "http://www.w3.org/2001/XMLSchema#string",
  },
  done: {
    "@id": "urn:solid-todo:/done",
    "@type": "http://www.w3.org/2001/XMLSchema#boolean",
  },
};
