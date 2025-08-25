import { useState } from "react";
import { CalendarDays, Download, HelpCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/format";

interface HeaderProps {
  title?: string;
  lastUpdated?: Date;
  onExport?: () => void;
  onSettings?: () => void;
  onHelp?: () => void;
}

export function Header({
  title = "Dashboard KPIs",
  lastUpdated = new Date(),
  onExport,
  onSettings,
  onHelp,
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary border-b border-primary-foreground/10">
      <div className="flex items-center justify-between px-6 lg:px-10 h-16">
        {/* Left side - Logo and title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/branding/royalmount-mark.svg" 
              alt="Royalmount" 
              className="h-8 w-8"
            />
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-primary-foreground">
                Carbonleo-Royalmount-Dashboard-KPIs
              </h1>
              <Badge variant="outline" className="text-xs border-primary-foreground/20 text-primary-foreground/80 w-fit">
                Dernière mise à jour: {formatDateTime(lastUpdated)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-3">
          {onExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}
          
          {onSettings && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSettings}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Settings className="h-4 w-4" />
            </Button>
          )}

          {onHelp && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onHelp}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}