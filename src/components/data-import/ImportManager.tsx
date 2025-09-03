import React from 'react';
import { ExcelImporter } from './ExcelImporter';

export function ImportManager() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Royal Mount Dashboard Data Import</h2>
        <p className="text-muted-foreground">
          Import the complete Royal Mount Dashboard Excel template with all 12 required sheets to populate the entire dashboard.
        </p>
      </div>

      <ExcelImporter />
    </div>
  );
}