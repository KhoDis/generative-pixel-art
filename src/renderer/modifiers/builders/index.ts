import Combine, { CombineInstruction } from "./combine.ts";
import Move, { MoveInstruction } from "./move.ts";
import { Shape } from "../../types.ts";

export { Combine, Move };

export default { Combine, Move };

export type BuilderInstruction = CombineInstruction | MoveInstruction;

export interface Builder extends Shape {}
