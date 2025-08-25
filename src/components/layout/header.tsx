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
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-14 flex items-center justify-between">
        {/* Left side - Royalmount mark and title */}
        <div className="flex items-center space-x-4">
          <img 
            src="/branding/royalmount-mark.svg" 
            alt="Royalmount" 
            className="h-6 w-6"
          />
          <h1 className="text-base font-semibold text-primary-foreground">
            Carbonleo – Royalmount Dashboard KPIs
          </h1>
        </div>

        {/* Right side - Carbonleo wordmark and actions */}
        <div className="flex items-center space-x-6">
          <Badge variant="outline" className="text-xs border-primary-foreground/20 text-primary-foreground/80">
            Last updated: {formatDateTime(lastUpdated)}
          </Badge>
          
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

          <img 
            src="/branding/carbonleo-wordmark.svg" 
            alt="Carbonleo" 
            className="h-5"
          />
        </div>
      </div>
    </header>
  );
}