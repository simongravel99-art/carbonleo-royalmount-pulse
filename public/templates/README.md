# Dashboard Data Templates

This folder contains Excel/CSV templates for importing real data into the Royalmount Dashboard.

## Template Files

### CSV Templates (for easy Excel import)
- **overview-kpis.csv** - Key Performance Indicators for overview dashboard
- **tenant-sales.csv** - Individual tenant sales performance data  
- **traffic-data.csv** - Visitor traffic and market share metrics
- **finance-data.csv** - Financial metrics (NOI, rent, receivables)
- **operations-data.csv** - Operations metrics (energy, maintenance, safety)
- **guest-experience-data.csv** - Guest satisfaction and service metrics
- **cleaning-quality-data.csv** - Cleaning Quality System (CQS) scores

### Excel Template Structure
Each CSV can be imported into Excel and enhanced with:

1. **Data Validation**
   - Dropdown lists for categories
   - Date pickers for date fields
   - Number validation for numeric fields

2. **Conditional Formatting**
   - Green/red highlighting for performance vs targets
   - Progress bars for percentage values
   - Color coding by metric type

3. **Formulas**
   - Automatic GROC calculations
   - Trend calculations (% change)
   - Summary totals and averages

4. **Protection**
   - Lock formula cells
   - Allow only data entry in designated areas
   - Worksheet protection with password

## How to Use

### Step 1: Download Templates
1. Download the CSV template files from this folder
2. Open in Excel and save as .xlsx format
3. Add data validation and formatting as needed

### Step 2: Data Entry
1. Replace sample data with your actual values
2. Follow the column headers exactly as shown
3. Use consistent date formats (YYYY-MM-DD)
4. Ensure numeric values don't contain text

### Step 3: Import to Dashboard
1. Save your Excel file as CSV
2. Use the Dashboard Import Manager
3. Upload the CSV file for validation
4. Review any errors and correct data
5. Confirm import to update dashboard

## Data Validation Rules

### Required Fields
- **KPIs**: metric, value, format, category
- **Tenants**: tenantName, category, gla, sales
- **Traffic**: date, totalVisitors, marketShare
- **Finance**: month, baseRent, noi
- **Operations**: month, energyIndex, responseTime
- **Guest**: month, npsScore
- **Cleaning**: month, cqsScore

### Data Formats
- **Dates**: YYYY-MM-DD (e.g., 2024-03-15)
- **Numbers**: No commas, decimal point only
- **Percentages**: Enter as decimal (0.42 for 42%)
- **Currency**: Enter as number without $ symbol

### Category Values
- **Tenant Categories**: Fashion, Electronics, Food Service, Beauty, Sporting Goods, etc.
- **KPI Categories**: overview, finance, sales, traffic, operations, guest, cleaning
- **Format Types**: number, currency, percentage

## Error Handling

Common import errors and solutions:

1. **Missing Required Field**: Ensure all required columns have values
2. **Invalid Date Format**: Use YYYY-MM-DD format only
3. **Non-Numeric Values**: Remove text from number fields
4. **Invalid Category**: Use exact category names from templates
5. **Duplicate Records**: Remove duplicate entries before import

## Support

For questions about template usage or data import:
1. Review the sample data in each CSV file
2. Check the Import Manager validation messages
3. Ensure data follows the exact format shown in templates