import { useAppSelector } from "../../redux/hooks.ts";
// import { useState } from "react";
// import { XMarkIcon } from "@heroicons/react/16/solid";
import InstructionTree from "./InstructionTree.tsx";

export default function Figures() {
  // const dispatch = useAppDispatch();
  const root = useAppSelector(
    (state) => state.figureInstruction.rootInstructionId,
  );

  // const [selected, setSelected] = useState(0);

  // const Tab = ({ name, index }: { name: string; index: number }) => {
  //   return (
  //     <a
  //       role="tab"
  //       className={`flex space-x-2 items-center justify-center tab ${
  //         selected === index ? "tab-active" : ""
  //       }`}
  //       onClick={() => setSelected(index)}
  //     >
  //       <span>{name}</span>
  //       {index !== 0 && (
  //         <button className="btn btn-square btn-xs btn-ghost">
  //           <XMarkIcon className="w-4 h-4" />
  //         </button>
  //       )}
  //     </a>
  //   );
  // };
  return (
    <>
      <div className="space-y-4">
        {/*<div role="tablist" className="tabs tabs-lifted">*/}
        {/*  {order.map((id, index) => (*/}
        {/*    <>*/}
        {/*      <div>Hello</div>*/}
        {/*      /!*<Tab name={shapes[id].instruction.type.modifier} index={index} />*!/*/}
        {/*      /!*<div role="tabpanel" className="tab-content">*!/*/}
        {/*      /!*  <Figure*!/*/}
        {/*      /!*    name={shapes[id].instruction.type.modifier}*!/*/}
        {/*      /!*    instruction={shapes[id].instruction}*!/*/}
        {/*      /!*  />*!/*/}
        {/*      /!*</div>*!/*/}
        {/*    </>*/}
        {/*  ))}*/}
        {/*</div>*/}
        <div>
          <InstructionTree root={root} />
        </div>
        {/*<FigureControls selected={selected} />*/}
      </div>
    </>
  );
}
