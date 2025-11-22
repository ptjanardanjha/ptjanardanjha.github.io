import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePoojas, Pooja } from "@/hooks/usePoojas";

interface PoojaComboboxProps {
  values: string[];
  onChange: (values: string[]) => void;
  readOnly?: boolean; // new prop
}

export function PoojaCombobox({ values, onChange, readOnly = false }: PoojaComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const { poojas, loading, error } = usePoojas();

  const selectedPoojas = React.useMemo(
    () => poojas.filter((p) => values.includes(p.poojaId)),
    [poojas, values]
  );

  const handleSelect = (poojaId: string) => {
    if (readOnly) return; // prevent selection if readonly
    const newValues = values.includes(poojaId)
      ? values.filter((id) => id !== poojaId)
      : [...values, poojaId];
    onChange(newValues);
  };

  const removePooja = (poojaId: string) => {
    if (readOnly) return; // prevent removal if readonly
    onChange(values.filter((id) => id !== poojaId));
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Dropdown */}
      <Popover open={open} onOpenChange={(isOpen) => !readOnly && setOpen(isOpen)}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            onClick={() => !readOnly && setOpen(!open)}
          >
            {values.length > 0
              ? `${values.length} pooja${values.length > 1 ? "s" : ""} selected`
              : "Select poojas..."}
            {!readOnly && <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
          </Button>
        </PopoverTrigger>
        {!readOnly && (
          <PopoverContent className="w-full p-0">
            {loading ? (
              <div className="p-4 text-center text-muted-foreground">Loading poojas...</div>
            ) : error ? (
              <div className="p-4 text-center text-red-500">{error}</div>
            ) : (
              <Command>
                <CommandInput placeholder="Search pooja..." />
                <CommandEmpty>No pooja found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-auto">
                  {poojas.map((pooja) => (
                    <CommandItem
                      key={pooja.poojaId}
                      value={pooja.poojaId}
                      onSelect={() => handleSelect(pooja.poojaId)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          values.includes(pooja.poojaId) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div className="flex flex-col">
                        <span>{pooja.name}</span>
                        {/* <span className="text-xs text-muted-foreground">
                          {pooja.sanskritName} • {pooja.duration} • ₹{pooja.price}
                        </span> */}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            )}
          </PopoverContent>
        )}
      </Popover>
      {/* Badges */}
{values.length > 0 && (
  <div className="flex flex-wrap gap-2">
    {values
      .map((id) => poojas.find((p) => p.poojaId == id))
      .filter((p): p is Pooja => !!p) // remove null/undefined
      .map((pooja) => (
        <Badge key={pooja.poojaId} variant="secondary">
          {pooja.name}
          <button
            type="button"
            className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={() => removePooja(pooja.poojaId)}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove {pooja.name}</span>
          </button>
        </Badge>
      ))}
  </div>
)}


    </div>
  );
}
