import { useAppDispatch, useAppSelector } from "../../redux/hooks.ts";
import { addInstruction, removeInstruction } from "../../redux/slice.ts";
import { Circle, Pixel } from "../../renderer/modifiers/primitives";
import colors from "../../renderer/palettes/html.ts";
import { Combine } from "../../renderer/modifiers/builders";
import { point } from "../../renderer/modifiers";
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

  const onAddGroup = () => {
    dispatch(
      addInstruction(
        new Combine(
          new Circle(5, colors.red),
          new Pixel(colors.blue, point(9, 9)),
        ).toInstruction(),
      ),
    );
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
          onClick={onAddGroup}
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
