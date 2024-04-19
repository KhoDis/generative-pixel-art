function ColorPicker() {
  // Four text inputs for RGBA
  return (
    <div className="grid grid-cols-4 gap-4 col-span-2">
      <input type="text" className="input input-bordered input-sm w-full" />
      <input type="text" className="input input-bordered input-sm w-full" />
      <input type="text" className="input input-bordered input-sm w-full" />
      <input type="text" className="input input-bordered input-sm w-full" />
    </div>
  );
}

export default function CircleOptions() {
  return (
    <>
      <div className="text-2xl">Circle Options</div>
      <div className="grid grid-cols-3 gap-4 p-4">
        <div className="flex items-center justify-start col-span-1">Color</div>
        <ColorPicker />
        <div className="flex items-center justify-start col-span-1">Radius</div>
        <div className="flex items-center justify-center col-span-2">
          <input type="text" className="input input-bordered w-full input-sm" />
        </div>
      </div>
    </>
  );
}
