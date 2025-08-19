'use client'
import { SwitchInputProps } from "@/types/inputs/switchs";

export default function SwitchInput({ checked, onChange, label }: SwitchInputProps) {
  return (
    <div className="sm:col-span-full">
      <label className="block text-sm font-medium">{label}</label>
      <div className="mt-2 flex items-center">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="sr-only"
          />
          <div className={`w-11 h-5.5 rounded-full transition-colors duration-200 ${checked ? 'bg-green-500' : 'bg-gray-200'}`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${checked ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
          </div>
        </label>
        <span className="ml-3 text-sm text-gray-600">{checked ? 'Sí' : 'No'}</span>
      </div>
    </div>
  );
}