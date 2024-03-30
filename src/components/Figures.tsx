import { useAppSelector } from "../redux/hooks.ts";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { Figure } from "./Figure.tsx";
import { FigureControls } from "./FigureControls.tsx";

export function Figures() {
  // const dispatch = useAppDispatch();
  const shapes = useAppSelector((state) => state.figureInstruction.entities);
  const order = useAppSelector((state) => state.figureInstruction.ids);
  const [selected, setSelected] = useState(0);

  console.log("shapes", shapes);

  const Tab = ({ name, index }: { name: string; index: number }) => {
    return (
      <a
        role="tab"
        className={`flex space-x-2 items-center justify-center tab ${
          selected === index ? "tab-active" : ""
        }`}
        onClick={() => setSelected(index)}
      >
        <span>{name}</span>
        {index !== 0 && (
          <button className="btn btn-square btn-xs btn-ghost">
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
      </a>
    );
  };
  return (
    <>
      {/*<div className="space-y-4">*/}
      {/*  <div role="tablist" className="tabs tabs-lifted">*/}
      {/*    <Tab name="rect" index={0} />*/}
      {/*    <div role="tabpanel" className="tab-content">*/}
      {/*      <Figure />*/}
      {/*    </div>*/}
      {/*    <Tab name="wheel" index={1} />*/}
      {/*    <div role="tabpanel" className="tab-content border-base-300">*/}
      {/*      <Figure />*/}
      {/*    </div>*/}
      {/*    <Tab name="tree" index={2} />*/}
      {/*    <div*/}
      {/*      role="tabpanel"*/}
      {/*      className="tab-content border-base-300 rounded-box"*/}
      {/*    >*/}
      {/*      <Figure />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <FigureControls />*/}
      {/*</div>*/}
      {/*  use Redux now */}
      <div className="space-y-4">
        <div role="tablist" className="tabs tabs-lifted">
          {order.map((id, index) => (
            <>
              <Tab name={shapes[id].instruction.type.modifier} index={index} />
              <div role="tabpanel" className="tab-content">
                <Figure
                  name={shapes[id].instruction.type.modifier}
                  instruction={shapes[id].instruction}
                />
              </div>
            </>
          ))}
        </div>
        <FigureControls selected={selected} />
      </div>
    </>
  );
}
