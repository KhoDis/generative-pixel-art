import { Figures } from "../components/Figures.tsx";
import { Canvas } from "../components/Canvas.tsx";
import { Options } from "../components/Options.tsx";
import { Modifiers } from "../components/Modifiers.tsx";
import { Header } from "../components/Header.tsx";

function Editor() {
  // const [selectedModifier, setSelectedModifier] = useState(null);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex grow">
        <div className="w-1/4 p-4 border-r border-base-300 h-full">
          <Figures />
        </div>
        {/* put canvas in the middle */}
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
