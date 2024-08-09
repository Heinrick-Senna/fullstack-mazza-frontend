"use client"
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useEffect } from "react";

import usePlacesAutocomplete, { Suggestion } from "use-places-autocomplete";

interface IAutocompleteInputProps {
  label: string,
  name: string,
  onAddressSelect: (value: string) => void
}

export default function PlacesAutoCompleteInput({ label, name, onAddressSelect }: IAutocompleteInputProps) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      language: 'pt-BR',
      componentRestrictions: { country: "br" },
      types: ["address"]
    },
  });

  useEffect(() => {
    onAddressSelect(value);
  }, [value]);

  if (!ready) return <p>Loading....</p>;

  return (
    <>
      <Command>
        <label htmlFor={name}>{label}</label>
        <CommandInput
          name={name}
          onBlur={() => setTimeout(() => clearSuggestions(), 100)}
          value={value}
          onChangeCapture={(e) => { setValue((e.target as HTMLInputElement).value) }}
          placeholder="Pesquisar Endereço"
        />
        <CommandList>
          {
            status === "OK" && data && data[0].description != value &&
            <CommandGroup>
              {
                data.map(({ place_id, description }: Suggestion) => (
                  <CommandItem
                    className="cursor-pointer"
                    key={place_id}
                    value={description}
                    onSelect={() => {
                      setValue(description)
                      clearSuggestions();
                    }}
                  >{description}</CommandItem>
                ))
              }
            </CommandGroup>
          }
        </CommandList>
      </Command>
    </>
  )
}