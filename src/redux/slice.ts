import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";
import { Instruction, InstructionId, Render } from "../renderer/types.ts";
import { RootState } from "./store.ts";
import renderCircle from "../components/modifiers/circle/renderCircle.ts";
import renderCombine from "../components/modifiers/combine/renderCombine.ts";
import renderEmpty from "../components/modifiers/empty/renderEmpty.ts";
import createEmpty from "../components/modifiers/empty/createEmpty.ts";
import renderTranslate from "../components/modifiers/translate/renderTranslate.ts";

export const instructionAdapter = createEntityAdapter<Instruction>();

export type InstructionSliceState = {
  instructions: EntityState<Instruction, InstructionId>;
  selectedInstructionId: InstructionId | null;
  rootInstructionId: InstructionId;
};

function getInitialInstructionState(): InstructionSliceState {
  const rootModifier = createEmpty();
  const rootInstructionId = rootModifier.id;
  const instructions = instructionAdapter.addOne(
    instructionAdapter.getInitialState(),
    rootModifier,
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
      state.instructions = instructionAdapter.addOne(
        state.instructions,
        action.payload,
      );
    },
    removeInstruction: (state, action: { payload: InstructionId }) => {
      state.instructions = instructionAdapter.removeOne(
        state.instructions,
        action.payload,
      );
    },
    updateInstruction: (state, action: { payload: Instruction }) => {
      state.instructions = instructionAdapter.updateOne(state.instructions, {
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
    updateParams<T extends Instruction>(
      state: InstructionSliceState,
      action: { payload: { id: InstructionId; params: Partial<T["params"]> } },
    ) {
      const instruction = state.instructions.entities[action.payload.id] as T;
      if (!instruction) {
        throw new Error(`Instruction with id ${action.payload.id} not found`);
      }

      const changes = {
        ...instruction,
        params: { ...instruction.params, ...action.payload.params },
      };
      state.instructions = instructionAdapter.updateOne(state.instructions, {
        id: action.payload.id,
        changes,
      });
    },
    replaceSelectedInstruction: (
      state,
      action: { payload: { instruction: Instruction } },
    ) => {
      // TODO: Show user feedback if no instruction is selected
      if (state.selectedInstructionId === null) {
        throw new Error("No instruction selected");
      }

      const newInstruction = action.payload.instruction;

      // If the selected instruction is the root instruction, update the root
      if (state.selectedInstructionId === state.rootInstructionId) {
        state.rootInstructionId = newInstruction.id;
      }

      // Remove all children of the selected instruction
      const selectedInstruction =
        state.instructions.entities[state.selectedInstructionId];
      newInstruction.parentId = selectedInstruction.parentId;

      console.log(
        "replaceSelectedInstruction.selectedInstruction",
        selectedInstruction.id,
        selectedInstruction.parentId,
      );
      for (const childId of selectedInstruction.children) {
        console.log("childId", childId);
        instructionAdapter.removeOne(state.instructions, childId);
      }

      // Update the parent to change one of the children to the new id
      if (selectedInstruction.parentId) {
        const parent =
          state.instructions.entities[selectedInstruction.parentId];
        const newChildren = parent.children.map((id) =>
          id === state.selectedInstructionId ? newInstruction.id : id,
        );
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const changes: Instruction = { ...parent, children: newChildren };
        console.log("new children", newChildren);
        state.instructions = instructionAdapter.updateOne(state.instructions, {
          id: parent.id,
          changes,
        });
      }

      // Update the selected instruction
      state.instructions = instructionAdapter.updateOne(state.instructions, {
        id: state.selectedInstructionId,
        changes: newInstruction,
      });

      // Set selected instruction to the new instruction
      state.selectedInstructionId = newInstruction.id;
    },
  },
});

export const {
  addInstruction,
  removeInstruction,
  updateInstruction,
  selectInstruction,
  deselectInstruction,
  updateParams,
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

export const selectSelectedInstruction = (state: RootState) => {
  const id = selectSelectedInstructionId(state);
  return id ? selectInstructionById(state, id) : null;
};

export const selectRendered = (state: RootState) => {
  // Make recursive function to build shape
  const render = (instruction: Instruction): Render => {
    switch (instruction.modifier) {
      case "circle":
        return renderCircle(instruction.params);
      case "combine":
        return renderCombine(
          instruction.children.map((id) => {
            return render(selectInstructionById(state, id));
          }),
        );
      case "empty":
        return renderEmpty();
      case "translate":
        return renderTranslate(
          instruction.params,
          render(selectInstructionById(state, instruction.children[0])),
        );
      default:
        throw new Error(`Unknown instruction modifier: ${instruction}`);
    }
  };

  return render(selectInstructionById(state, selectRootInstructionId(state)));
};
