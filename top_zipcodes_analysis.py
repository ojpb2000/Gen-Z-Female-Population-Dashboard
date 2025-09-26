import pandas as pd
import numpy as np

# Load the data
df = pd.read_csv('data/Female _GenZ_Populations.csv')

print("=== TOP ZIP CODES ANALYSIS ===")
print("="*60)

# Calculate national benchmark
national_benchmark = (df['Total Female GenZ'].sum() / df['Total Population'].sum()) * 100
df['Index_vs_National'] = (df['GenZ Female %'] / national_benchmark) * 100

# 1. TOP ZIP CODES BY ABSOLUTE NUMBERS
print("\n1. TOP 20 ZIP CODES BY ABSOLUTE NUMBER OF GEN Z FEMALES")
print("="*60)

top_absolute = df.nlargest(20, 'Total Female GenZ')[['DMA', 'Zip', 'Total Population', 'Total Female GenZ', 'GenZ Female %', 'Index_vs_National']]
for i, (_, row) in enumerate(top_absolute.iterrows(), 1):
    print(f"{i:2d}. {row['DMA']} - ZIP {row['Zip']}")
    print(f"    Population: {row['Total Population']:,} | Gen Z: {row['Total Female GenZ']:,} | %: {row['GenZ Female %']:.2f}% | Index: {row['Index_vs_National']:.1f}")
    print()

# 2. TOP ZIP CODES BY CONCENTRATION PERCENTAGE
print("\n2. TOP 20 ZIP CODES BY CONCENTRATION PERCENTAGE")
print("="*60)

top_concentration = df.nlargest(20, 'GenZ Female %')[['DMA', 'Zip', 'Total Population', 'Total Female GenZ', 'GenZ Female %', 'Index_vs_National']]
for i, (_, row) in enumerate(top_concentration.iterrows(), 1):
    print(f"{i:2d}. {row['DMA']} - ZIP {row['Zip']}")
    print(f"    Population: {row['Total Population']:,} | Gen Z: {row['Total Female GenZ']:,} | %: {row['GenZ Female %']:.2f}% | Index: {row['Index_vs_National']:.1f}")
    print()

# 3. TOP ZIP CODES BY INDEX (vs National)
print("\n3. TOP 20 ZIP CODES BY INDEX vs NATIONAL")
print("="*60)

top_index = df.nlargest(20, 'Index_vs_National')[['DMA', 'Zip', 'Total Population', 'Total Female GenZ', 'GenZ Female %', 'Index_vs_National']]
for i, (_, row) in enumerate(top_index.iterrows(), 1):
    print(f"{i:2d}. {row['DMA']} - ZIP {row['Zip']}")
    print(f"    Population: {row['Total Population']:,} | Gen Z: {row['Total Female GenZ']:,} | %: {row['GenZ Female %']:.2f}% | Index: {row['Index_vs_National']:.1f}")
    print()

# 4. TOP ZIP CODES BY DMA (Best performing ZIP in each major DMA)
print("\n4. TOP ZIP CODE IN EACH MAJOR DMA (Population > 1M)")
print("="*60)

# Get major DMAs (population > 1M)
major_dmas = df.groupby('DMA')['Total Population'].sum().reset_index()
major_dmas = major_dmas[major_dmas['Total Population'] > 1000000]['DMA'].tolist()

for dma in major_dmas:
    dma_data = df[df['DMA'] == dma]
    best_zip = dma_data.loc[dma_data['Index_vs_National'].idxmax()]
    print(f"• {dma}")
    print(f"  Best ZIP: {best_zip['Zip']} | Population: {best_zip['Total Population']:,} | Gen Z: {best_zip['Total Female GenZ']:,} | Index: {best_zip['Index_vs_National']:.1f}")
    print()

# 5. ZIP CODES WITH HIGH INDEX AND SIGNIFICANT POPULATION
print("\n5. TOP 20 ZIP CODES: HIGH INDEX (≥120) + SIGNIFICANT POPULATION (≥10K)")
print("="*60)

high_index_significant = df[(df['Index_vs_National'] >= 120) & (df['Total Population'] >= 10000)].nlargest(20, 'Index_vs_National')
if len(high_index_significant) > 0:
    for i, (_, row) in enumerate(high_index_significant.iterrows(), 1):
        print(f"{i:2d}. {row['DMA']} - ZIP {row['Zip']}")
        print(f"    Population: {row['Total Population']:,} | Gen Z: {row['Total Female GenZ']:,} | %: {row['GenZ Female %']:.2f}% | Index: {row['Index_vs_National']:.1f}")
        print()
else:
    print("No ZIP codes found with Index ≥120 and Population ≥10K")

# 6. ZIP CODES BY AGE GROUP CONCENTRATION
print("\n6. TOP 10 ZIP CODES BY AGE GROUP CONCENTRATION")
print("="*60)

# Top ZIP codes for youngest Gen Z (15-19)
print("YOUNGEST GEN Z (15-19):")
top_youngest = df.nlargest(10, '2024 Females Age 15-19')[['DMA', 'Zip', '2024 Females Age 15-19', 'Total Female GenZ', 'GenZ Female %', 'Index_vs_National']]
for i, (_, row) in enumerate(top_youngest.iterrows(), 1):
    percentage = (row['2024 Females Age 15-19'] / row['Total Female GenZ']) * 100
    print(f"{i:2d}. {row['DMA']} - ZIP {row['Zip']} | {row['2024 Females Age 15-19']:,} (Age 15-19: {percentage:.1f}% of Gen Z)")

print("\nOLDEST GEN Z (25-29):")
top_oldest = df.nlargest(10, '2024 Females Age 25-29')[['DMA', 'Zip', '2024 Females Age 25-29', 'Total Female GenZ', 'GenZ Female %', 'Index_vs_National']]
for i, (_, row) in enumerate(top_oldest.iterrows(), 1):
    percentage = (row['2024 Females Age 25-29'] / row['Total Female GenZ']) * 100
    print(f"{i:2d}. {row['DMA']} - ZIP {row['Zip']} | {row['2024 Females Age 25-29']:,} (Age 25-29: {percentage:.1f}% of Gen Z)")

# 7. REGIONAL TOP ZIP CODES
print("\n7. TOP ZIP CODES BY REGION")
print("="*60)

# Categorize regions
def categorize_region(dma):
    dma_lower = dma.lower()
    if any(state in dma_lower for state in ['california', 'los angeles', 'san francisco', 'san diego']):
        return 'West Coast'
    elif any(state in dma_lower for state in ['texas', 'houston', 'dallas', 'austin']):
        return 'Texas'
    elif any(state in dma_lower for state in ['florida', 'miami', 'orlando', 'tampa']):
        return 'Florida'
    elif any(state in dma_lower for state in ['new york', 'buffalo', 'rochester']):
        return 'New York'
    elif any(state in dma_lower for state in ['washington', 'seattle']):
        return 'Pacific Northwest'
    elif any(state in dma_lower for state in ['utah', 'salt lake']):
        return 'Mountain West'
    elif any(state in dma_lower for state in ['colorado', 'denver']):
        return 'Rocky Mountains'
    elif any(state in dma_lower for state in ['arizona', 'phoenix']):
        return 'Southwest'
    elif any(state in dma_lower for state in ['georgia', 'atlanta']):
        return 'Southeast'
    elif any(state in dma_lower for state in ['north carolina', 'charlotte', 'raleigh']):
        return 'Carolinas'
    elif any(state in dma_lower for state in ['ohio', 'cleveland', 'columbus']):
        return 'Ohio'
    elif any(state in dma_lower for state in ['pennsylvania', 'philadelphia', 'pittsburgh']):
        return 'Pennsylvania'
    elif any(state in dma_lower for state in ['illinois', 'chicago']):
        return 'Illinois'
    elif any(state in dma_lower for state in ['michigan', 'detroit']):
        return 'Michigan'
    elif any(state in dma_lower for state in ['wisconsin', 'milwaukee']):
        return 'Wisconsin'
    elif any(state in dma_lower for state in ['minnesota', 'minneapolis']):
        return 'Minnesota'
    elif any(state in dma_lower for state in ['massachusetts', 'boston']):
        return 'Massachusetts'
    else:
        return 'Other'

df['Region'] = df['DMA'].apply(categorize_region)

# Top ZIP codes by region
regions = ['West Coast', 'Texas', 'Florida', 'New York', 'Mountain West', 'Southeast', 'Carolinas', 'Ohio', 'Pennsylvania', 'Illinois']
for region in regions:
    region_data = df[df['Region'] == region]
    if len(region_data) > 0:
        top_region_zip = region_data.loc[region_data['Index_vs_National'].idxmax()]
        print(f"• {region}: {top_region_zip['DMA']} - ZIP {top_region_zip['Zip']} | Index: {top_region_zip['Index_vs_National']:.1f}")

# 8. SAVE TOP ZIP CODES DATA
print("\n8. SAVING TOP ZIP CODES DATA")
print("="*60)

# Create comprehensive top ZIP codes dataset
top_zipcodes_data = df.nlargest(100, 'Index_vs_National')[['DMA', 'Zip', 'Region', 'Total Population', 'Total Female GenZ', 'GenZ Female %', 'Index_vs_National', '2024 Females Age 15-19', '2024 Females Age 20-24', '2024 Females Age 25-29']]

# Add age percentages
top_zipcodes_data['Age_15_19_Percentage'] = (top_zipcodes_data['2024 Females Age 15-19'] / top_zipcodes_data['Total Female GenZ']) * 100
top_zipcodes_data['Age_20_24_Percentage'] = (top_zipcodes_data['2024 Females Age 20-24'] / top_zipcodes_data['Total Female GenZ']) * 100
top_zipcodes_data['Age_25_29_Percentage'] = (top_zipcodes_data['2024 Females Age 25-29'] / top_zipcodes_data['Total Female GenZ']) * 100

top_zipcodes_data.to_csv('top_zipcodes_analysis.csv', index=False)

print("Files saved:")
print("• top_zipcodes_analysis.csv - Top 100 ZIP codes by index")

print(f"\nSUMMARY:")
print(f"• Total ZIP codes analyzed: {len(df):,}")
print(f"• ZIP codes with Index ≥120: {len(df[df['Index_vs_National'] >= 120]):,}")
print(f"• ZIP codes with Index ≥150: {len(df[df['Index_vs_National'] >= 150]):,}")
print(f"• Highest index found: {df['Index_vs_National'].max():.1f}")
print(f"• Average index: {df['Index_vs_National'].mean():.1f}")

