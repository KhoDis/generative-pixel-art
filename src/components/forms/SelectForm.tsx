export default function SelectForm<T extends string>({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: T;
  options: T[];
  onChange: (value: T) => void;
}) {
  return (
    <>
      <div className="flex items-center justify-start col-span-1">{name}</div>
      <div className="flex items-center justify-center col-span-2">
        <select
          className="select select-bordered select-sm w-full"
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
