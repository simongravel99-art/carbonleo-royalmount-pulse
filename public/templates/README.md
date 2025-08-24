# Dashboard Data Import Template

## Overview
This folder contains CSV template files that can be imported into Excel to create the complete dashboard data template.

## Files Included
- `finance_template.csv` - Financial data (revenue, costs, profit metrics)
- `occupancy_template.csv` - Room occupancy and hotel metrics
- `sales_template.csv` - Sales data by category and performance
- `traffic_template.csv` - Visitor traffic and location analytics
- `ops_template.csv` - Operational efficiency and maintenance data
- `guest_experience_template.csv` - Guest satisfaction and review data
- `cleaning_quality_template.csv` - Cleaning quality scores and completion rates

## How to Create Excel Template

1. Open Microsoft Excel
2. Create a new workbook
3. Create 7 sheets with the following names:
   - finance
   - occupancy
   - sales
   - traffic
   - ops
   - guest_experience
   - cleaning_quality

4. For each sheet, import the corresponding CSV file:
   - Go to Data → Get Data → From Text/CSV
   - Select the corresponding CSV file
   - Import the data into the respective sheet

5. Save the workbook as an Excel file (.xlsx)

## Data Format Requirements

- **Date Format**: YYYY-MM-DD
- **Numeric Values**: Use decimal points (not commas) for decimal numbers
- **No Empty Cells**: Fill all cells with appropriate data
- **Headers**: Keep the exact column headers as shown in the templates
- **Sheet Names**: Use the exact sheet names listed above

## Usage in Dashboard

Once your Excel file is ready:
1. Go to the Admin section of the dashboard
2. Use the "Import Data" feature
3. Select your Excel file
4. The dashboard will automatically update with your data

## Sample Data

The template files contain sample data to help you understand the expected format and structure. Replace this sample data with your actual business data while maintaining the same column structure.