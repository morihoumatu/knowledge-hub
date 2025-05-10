'use client';

import { useState } from 'react';
import { Search, Settings } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SearchBarProps {
  onSearch: (term: string, useRegex: boolean) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [useRegex, setUseRegex] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value, useRegex);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm, useRegex);
  };

  const toggleRegex = () => {
    setUseRegex(!useRegex);
    onSearch(searchTerm, !useRegex);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="キーワードで検索..."
          className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-20 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-1 rounded-md hover:bg-accent"
                >
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>検索設定</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90"
          >
            検索
          </button>
        </div>
      </div>
      
      {showSettings && (
        <div className="absolute top-full mt-2 w-full rounded-md border bg-card p-4 shadow-md">
          <div className="flex items-center space-x-2">
            <Switch
              id="regex-mode"
              checked={useRegex}
              onCheckedChange={toggleRegex}
            />
            <Label htmlFor="regex-mode">正規表現検索を使用</Label>
          </div>
        </div>
      )}
    </form>
  );
}