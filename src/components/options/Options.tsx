export function Options() {
  //   Placeholder for now
  // for placeholder let's use daisyui
  // we'll put the name of the modifier on the top and then the options below
  // options will be a list of inputs
  // each input will have a label and a value that we can change right next to it

  return (
    <div className="space-y-4">
      <div className="text-2xl">Rect Options</div>
      <div role="tablist" className="tabs tabs-bordered">
        <input
          type="radio"
          name="options"
          role="tab"
          className="tab"
          aria-label="fromPoints"
        />
        <div role="tabpanel" className="tab-content">
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="flex items-center justify-start">Option 1</div>
            <div className="flex items-center justify-center">
              <input type="text" className="input input-bordered" />
            </div>
            <div className="flex items-center justify-start">Option 2</div>
            <div className="flex items-center justify-center">
              <input type="text" className="input input-bordered" />
            </div>
            <div className="flex items-center justify-start">Option 3</div>
            <div className="flex items-center justify-center">
              <input type="text" className="input input-bordered" />
            </div>
          </div>
        </div>
        <input
          type="radio"
          name="options"
          role="tab"
          className="tab"
          aria-label="fromDimensions"
        />
        <div role="tabpanel" className="tab-content">
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="flex items-center justify-start">Option 1</div>
            <div className="flex items-center justify-center">
              <input type="text" className="input input-bordered" />
            </div>
            <div className="flex items-center justify-start">Option 2</div>
            <div className="flex items-center justify-center">
              <input type="text" className="input input-bordered" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
