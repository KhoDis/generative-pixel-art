import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import { addInstruction, removeInstruction } from "../../redux/slice.ts";
import { Circle } from "../../renderer/modifiers/primitives";
import colors from "../../renderer/palettes/html.ts";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  LightBulbIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

export function FigureControls({ selected }: { selected: number }) {
  const dispatch = useAppDispatch();
  // const shapes = useAppSelector((state) => state.figureInstruction.entities);
  const order = useAppSelector((state) => state.figureInstruction.ids);

  const onAdd = () => {
    dispatch(addInstruction(new Circle(5, colors.red).toInstruction()));
  };

  const onRemove = () => {
    dispatch(removeInstruction(order[selected]));
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="join">
        <button
          className="btn btn-square btn-sm join-item btn-primary"
          onClick={onAdd}
        >
          <PlusIcon className="w-4 h-4" />
        </button>
        <button
          className="btn btn-square btn-sm join-item btn-primary"
        >
          <LightBulbIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="join">
        <button className="btn btn-square btn-sm join-item btn-primary">
          <ArrowDownIcon className="w-4 h-4" />
        </button>
        <button className="btn btn-square btn-sm join-item btn-primary">
          <ArrowUpIcon className="w-4 h-4" />
        </button>
      </div>
      <button
        className="btn btn-square btn-sm join-item btn-error"
        onClick={onRemove}
      >
        <TrashIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
