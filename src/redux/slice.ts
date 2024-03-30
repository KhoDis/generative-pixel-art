import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  Instruction,
  InstructionId,
  InstructionState,
} from "../renderer/types.ts";

export const figureInstructionAdapter = createEntityAdapter<InstructionState>();

const figureInstructionSlice = createSlice({
  name: "figureInstruction",
  initialState: figureInstructionAdapter.getInitialState(),
  reducers: {
    addInstruction: {
      reducer: (state, action: { payload: InstructionState }) => {
        figureInstructionAdapter.addOne(state, action.payload);
      },
      prepare: (instruction: Instruction) => {
        const id = uuidv4();
        return {
          payload: {
            id,
            instruction,
          },
        };
      },
    },
    removeInstruction: (state, action: { payload: InstructionId }) => {
      figureInstructionAdapter.removeOne(state, action.payload);
    },
    updateInstruction: (state, action: { payload: InstructionState }) => {
      const { id, instruction } = action.payload;
      state.entities[id].instruction = instruction;
    },
  },
});

export const { addInstruction, removeInstruction, updateInstruction } =
  figureInstructionSlice.actions;

export default figureInstructionSlice.reducer;

export { figureInstructionSlice };
