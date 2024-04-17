import { Figures } from "../components/modifier-tree/Figures.tsx";
import { Canvas } from "../components/canvas/Canvas.tsx";
import { Options } from "../components/options/Options.tsx";
import { Modifiers } from "../components/modifier-tree/Modifiers.tsx";
import { Header } from "../components/header/Header.tsx";

function Editor() {
  // const [selectedModifier, setSelectedModifier] = useState(null);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex grow">
        <div className="w-1/4 p-4 border-r border-base-300 h-full">
          <Figures />
        </div>
        <div className="w-1/2 p-4 flex items-center justify-center">
          <Canvas />
        </div>
        <div className="w-1/4 p-4 border-l border-base-300 h-full ">
          <Options />
        </div>
      </div>
      <Modifiers />
    </div>
  );
}

export default Editor;
