import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";
import { Instruction, InstructionId } from "../renderer/types.ts";
import { RootState } from "./store.ts";
import { Empty } from "../renderer/modifiers/primitives";

export const instructionAdapter = createEntityAdapter<Instruction>();

export type InstructionSliceState = {
  instructions: EntityState<Instruction, InstructionId>;
  selectedInstructionId: InstructionId | null;
  rootInstructionId: InstructionId;
};

function getInitialInstructionState(): InstructionSliceState {
  const rootModifier = new Empty();
  const rootInstructionId = rootModifier.id;
  const instructions = instructionAdapter.addOne(
    instructionAdapter.getInitialState(),
    rootModifier.toInstruction(),
  );

  return {
    instructions,
    selectedInstructionId: null,
    rootInstructionId,
  };
}

const figureInstructionSlice = createSlice({
  name: "figureInstruction",
  initialState: getInitialInstructionState(),
  reducers: {
    addInstruction: (state, action: { payload: Instruction }) => {
      instructionAdapter.addOne(state.instructions, action.payload);
    },
    removeInstruction: (state, action: { payload: InstructionId }) => {
      instructionAdapter.removeOne(state.instructions, action.payload);
    },
    updateInstruction: (state, action: { payload: Instruction }) => {
      instructionAdapter.updateOne(state.instructions, {
        id: action.payload.id,
        changes: action.payload,
      });
    },
    selectInstruction: (state, action: { payload: InstructionId }) => {
      state.selectedInstructionId = action.payload;
    },
    deselectInstruction: (state) => {
      state.selectedInstructionId = null;
    },
    replaceSelectedInstruction: (
      state,
      action: { payload: { instruction: Instruction } },
    ) => {
      if (state.selectedInstructionId === null) {
        throw new Error("No instruction selected");
      }

      const newInstruction = action.payload.instruction;
      console.log("replaceSelectedInstruction", newInstruction);
      state.instructions = instructionAdapter.updateOne(state.instructions, {
        id: state.selectedInstructionId,
        changes: newInstruction,
      });
    }
  },
});

export const {
  addInstruction,
  removeInstruction,
  updateInstruction,
  selectInstruction,
  deselectInstruction,
  replaceSelectedInstruction,
} = figureInstructionSlice.actions;

export default figureInstructionSlice.reducer;

export { figureInstructionSlice };

// selectors
export const {
  selectById: selectInstructionById,
  selectIds: selectInstructionIds,
  selectEntities: selectInstructionEntities,
  selectAll: selectAllInstructions,
  selectTotal: selectTotalInstructions,
} = instructionAdapter.getSelectors(
  (state: RootState) => state.figureInstruction.instructions,
);

export const selectRootInstructionId = (state: RootState) =>
  state.figureInstruction.rootInstructionId;

export const selectSelectedInstructionId = (state: RootState) =>
  state.figureInstruction.selectedInstructionId;
