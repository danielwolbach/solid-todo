import type { ShapeType } from "@ldo/ldo";
import { todoSchema } from "./todo.schema";
import { todoContext } from "./todo.context";
import type { Item } from "./todo.typings";

/**
 * =============================================================================
 * LDO ShapeTypes todo
 * =============================================================================
 */

/**
 * Item ShapeType
 */
export const ItemShapeType: ShapeType<Item> = {
  schema: todoSchema,
  shape: "urn:solid-todo:/Item",
  context: todoContext,
};
