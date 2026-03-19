import { useState } from "react";
import { getRouteApi } from "@tanstack/react-router";
import { useDebouncedCallback } from "@mantine/hooks";
import { SearchIcon, XIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

const routeApi = getRouteApi("/");

export const SearchInput = () => {
  const navigate = routeApi.useNavigate();
  const { q } = routeApi.useSearch();
  const [query, setQuery] = useState(q);
  const [visible, setVisible] = useState(q.length > 0);

  const updateSearchQueryValue = useDebouncedCallback(() => {
    navigate({
      search: (prev) => ({
        ...prev,
        q: query,
      }),
    });
  }, 500);

  const handleQueryChange = (query: string) => {
    setQuery(query);
    updateSearchQueryValue();
  };

  const handleClose = () => {
    setVisible(false);
    handleQueryChange("");
  };

  if (!visible) {
    return (
      <Button variant="outline" onClick={() => setVisible(true)}>
        <SearchIcon />
        Search
      </Button>
    );
  }

  return (
    <InputGroup
      className="animate-in fade-in slide-in-from-right-4 w-60 duration-200"
      onKeyDown={(e) => e.key === "Escape" && handleClose()}
    >
      <InputGroupAddon align="inline-start">
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput
        autoFocus
        placeholder="Search ideas..."
        value={query}
        onChange={(e) => handleQueryChange(e.target.value)}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label={query ? "Clear search" : "Close search"}
          onClick={handleClose}
          className={
            query ? "animate-in fade-in zoom-in-75 duration-150" : undefined
          }
        >
          <XIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
};
