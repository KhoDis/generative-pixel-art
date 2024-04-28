import IntInput from "../inputs/IntInput.tsx";

export function SingleIntForm({
  name,
  value,
  onChange,
}: {
  name: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <>
      <div className="flex items-center justify-start col-span-1">{name}</div>
      <div className="flex items-center justify-center col-span-2">
        <IntInput defaultValue={value} onChange={onChange} min={0} max={255} />
      </div>
    </>
  );
}
