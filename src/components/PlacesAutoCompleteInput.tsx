"use client"

import * as React from "react"
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import usePlacesAutocomplete, { Suggestion } from "use-places-autocomplete";

export function PlacesAutoCompleteInput({ label, name, onAddressSelect }: { label: string, name:string, onAddressSelect: (value: string) => void }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleInput = (value: string) => {
    onAddressSelect(value);
    setValue(value);
  };

  return (
    <>
      <Command>
        <label htmlFor={name}>{label}</label>
        <CommandInput
          name={name}
          onBlur={() => clearSuggestions()}
          value={value}
          onChangeCapture={(e) => { handleInput((e.target as HTMLInputElement).value) }}
          placeholder="Pesquisar Endereço"
        />
        <CommandList>
          <CommandGroup>
            {
              status === "OK" &&
              data.map(({ place_id, description }: Suggestion) => (
                <CommandItem
                  className="cursor-pointer"
                  key={place_id}
                  value={description}
                  onSelect={() => {
                    handleInput(description);
                    clearSuggestions();
                  }}
                >{description}</CommandItem>
              ))
            }
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  )
}
