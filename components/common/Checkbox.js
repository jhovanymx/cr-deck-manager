import { useState } from "react"
import { Switch } from "@headlessui/react" 
import { HiCheck } from "react-icons/hi"

export default function Checkbox({ isChecked = false, label, onChange = () => {} }) {
  const [enabled, setEnabled] = useState(isChecked)

  const onChangeState = (isEnabled) => {
    setEnabled(isEnabled)
    onChange({
      label,
      isEnabled
    })
  }

  return (
    <Switch.Group>
      <div className="flex items-center gap-1">
        <Switch
          className="inline-flex flex-none items-center justify-center h-5 w-5 rounded bg-white shadow-md"
          checked={enabled}
          onChange={onChangeState}
        >
          <HiCheck className={`${enabled ? "opacity-100" : "opacity-0"}` } />
        </Switch>
        <Switch.Label className="text-sm">{label}</Switch.Label>
      </div>
    </Switch.Group>
  )
}