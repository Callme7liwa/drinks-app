import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Key, ExternalLink } from 'lucide-react';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apiKey: string;
  onSaveApiKey: (key: string) => void;
}

const SettingsModal = ({ open, onOpenChange, apiKey, onSaveApiKey }: SettingsModalProps) => {
  const [inputKey, setInputKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);

  const handleSave = () => {
    onSaveApiKey(inputKey);
    onOpenChange(false);
  };

  const handleClear = () => {
    setInputKey('');
    onSaveApiKey('');
    localStorage.removeItem('openai_api_key');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-2 border-foreground shadow-brutal-lg bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display flex items-center gap-2">
            <Key className="w-6 h-6 text-primary" />
            Settings
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add your OpenAI API key to enable AI-generated drinks and images.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey" className="text-base font-bold">
              OpenAI API Key
            </Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={showKey ? 'text' : 'password'}
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="sk-..."
                className="pr-12 h-12 border-2 border-foreground shadow-brutal-sm font-mono text-sm"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="bg-muted rounded-xl p-4 border-2 border-foreground/10">
            <p className="text-sm text-muted-foreground mb-2">
              Don't have an API key?
            </p>
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
            >
              Get one from OpenAI
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleClear}
              className="flex-1"
            >
              Clear
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1"
            >
              Save
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            🔒 Your key is stored locally and never sent to our servers.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
