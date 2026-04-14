import type { Schema } from "shexj";

/**
 * =============================================================================
 * todoSchema: ShexJ Schema for todo
 * =============================================================================
 */
export const todoSchema: Schema = {
  type: "Schema",
  shapes: [
    {
      id: "urn:solid-todo:/Item",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "urn:solid-todo:/name",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#string",
              },
              annotations: [
                {
                  type: "Annotation",
                  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                  object: {
                    value: "Human-readable title of the todo item",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "urn:solid-todo:/done",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "http://www.w3.org/2001/XMLSchema#boolean",
              },
              annotations: [
                {
                  type: "Annotation",
                  predicate: "http://www.w3.org/2000/01/rdf-schema#comment",
                  object: {
                    value: "Whether the todo item has been completed",
                  },
                },
              ],
            },
          ],
        },
      },
    },
  ],
};
