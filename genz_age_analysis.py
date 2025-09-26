import pandas as pd
import numpy as np

# Load the data
df = pd.read_csv('data/Female _GenZ_Populations.csv')

print("=== GEN Z AGE SEGMENTATION ANALYSIS ===")
print("="*60)

# 1. NATIONAL AGE DISTRIBUTION ANALYSIS
print("\n1. NATIONAL AGE DISTRIBUTION WITHIN GEN Z")
print("="*50)

# Calculate national totals for each age group
national_15_19 = df['2024 Females Age 15-19'].sum()
national_20_24 = df['2024 Females Age 20-24'].sum()
national_25_29 = df['2024 Females Age 25-29'].sum()
national_total_genz = df['Total Female GenZ'].sum()

print(f"NATIONAL GEN Z AGE DISTRIBUTION:")
print(f"• Age 15-19: {national_15_19:,} ({national_15_19/national_total_genz*100:.1f}%)")
print(f"• Age 20-24: {national_20_24:,} ({national_20_24/national_total_genz*100:.1f}%)")
print(f"• Age 25-29: {national_25_29:,} ({national_25_29/national_total_genz*100:.1f}%)")
print(f"• Total Gen Z: {national_total_genz:,}")

# 2. DMA-LEVEL AGE ANALYSIS
print("\n2. DMA-LEVEL AGE DISTRIBUTION ANALYSIS")
print("="*50)

# Group by DMA and calculate age distributions
dma_age_analysis = df.groupby('DMA').agg({
    '2024 Females Age 15-19': 'sum',
    '2024 Females Age 20-24': 'sum',
    '2024 Females Age 25-29': 'sum',
    'Total Female GenZ': 'sum',
    'Total Population': 'sum'
}).reset_index()

# Calculate percentages for each age group
dma_age_analysis['Age_15_19_Percentage'] = (dma_age_analysis['2024 Females Age 15-19'] / dma_age_analysis['Total Female GenZ']) * 100
dma_age_analysis['Age_20_24_Percentage'] = (dma_age_analysis['2024 Females Age 20-24'] / dma_age_analysis['Total Female GenZ']) * 100
dma_age_analysis['Age_25_29_Percentage'] = (dma_age_analysis['2024 Females Age 25-29'] / dma_age_analysis['Total Female GenZ']) * 100

# Calculate Gen Z concentration
national_benchmark = (df['Total Female GenZ'].sum() / df['Total Population'].sum()) * 100
dma_age_analysis['GenZ_Concentration'] = (dma_age_analysis['Total Female GenZ'] / dma_age_analysis['Total Population']) * 100
dma_age_analysis['GenZ_Index'] = (dma_age_analysis['GenZ_Concentration'] / national_benchmark) * 100

# 3. YOUNGEST GEN Z MARKETS (15-19)
print("\n3. MARKETS WITH HIGHEST YOUNGEST GEN Z CONCENTRATION (15-19)")
print("="*50)

youngest_markets = dma_age_analysis.nlargest(15, 'Age_15_19_Percentage')
print("TOP 15 MARKETS WITH HIGHEST % OF 15-19 YEAR OLDS:")
for _, row in youngest_markets.iterrows():
    print(f"• {row['DMA']}: {row['Age_15_19_Percentage']:.1f}% (Index: {row['GenZ_Index']:.1f})")

# 4. OLDEST GEN Z MARKETS (25-29)
print("\n4. MARKETS WITH HIGHEST OLDEST GEN Z CONCENTRATION (25-29)")
print("="*50)

oldest_markets = dma_age_analysis.nlargest(15, 'Age_25_29_Percentage')
print("TOP 15 MARKETS WITH HIGHEST % OF 25-29 YEAR OLDS:")
for _, row in oldest_markets.iterrows():
    print(f"• {row['DMA']}: {row['Age_25_29_Percentage']:.1f}% (Index: {row['GenZ_Index']:.1f})")

# 5. AGE DISTRIBUTION VARIANCE ANALYSIS
print("\n5. AGE DISTRIBUTION VARIANCE ANALYSIS")
print("="*50)

# Calculate variance in age distribution
dma_age_analysis['Age_Variance'] = dma_age_analysis[['Age_15_19_Percentage', 'Age_20_24_Percentage', 'Age_25_29_Percentage']].var(axis=1)

print("MARKETS WITH MOST BALANCED AGE DISTRIBUTION (Lowest Variance):")
balanced_markets = dma_age_analysis.nsmallest(10, 'Age_Variance')
for _, row in balanced_markets.iterrows():
    print(f"• {row['DMA']}: Variance {row['Age_Variance']:.2f} (15-19: {row['Age_15_19_Percentage']:.1f}%, 20-24: {row['Age_20_24_Percentage']:.1f}%, 25-29: {row['Age_25_29_Percentage']:.1f}%)")

print("\nMARKETS WITH MOST SKEWED AGE DISTRIBUTION (Highest Variance):")
skewed_markets = dma_age_analysis.nlargest(10, 'Age_Variance')
for _, row in skewed_markets.iterrows():
    print(f"• {row['DMA']}: Variance {row['Age_Variance']:.2f} (15-19: {row['Age_15_19_Percentage']:.1f}%, 20-24: {row['Age_20_24_Percentage']:.1f}%, 25-29: {row['Age_25_29_Percentage']:.1f}%)")

# 6. CORRELATION ANALYSIS
print("\n6. CORRELATION ANALYSIS")
print("="*50)

# Correlation between age groups and Gen Z index
corr_15_19_index = dma_age_analysis['Age_15_19_Percentage'].corr(dma_age_analysis['GenZ_Index'])
corr_20_24_index = dma_age_analysis['Age_20_24_Percentage'].corr(dma_age_analysis['GenZ_Index'])
corr_25_29_index = dma_age_analysis['Age_25_29_Percentage'].corr(dma_age_analysis['GenZ_Index'])

print(f"CORRELATION BETWEEN AGE GROUPS AND GEN Z INDEX:")
print(f"• Age 15-19 vs Gen Z Index: {corr_15_19_index:.3f}")
print(f"• Age 20-24 vs Gen Z Index: {corr_20_24_index:.3f}")
print(f"• Age 25-29 vs Gen Z Index: {corr_25_29_index:.3f}")

# 7. REGIONAL AGE PATTERNS
print("\n7. REGIONAL AGE PATTERNS")
print("="*50)

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

dma_age_analysis['Region'] = dma_age_analysis['DMA'].apply(categorize_region)

# Regional age analysis
regional_age = dma_age_analysis.groupby('Region').agg({
    'Age_15_19_Percentage': 'mean',
    'Age_20_24_Percentage': 'mean',
    'Age_25_29_Percentage': 'mean',
    'GenZ_Index': 'mean',
    'DMA': 'count'
}).reset_index()

regional_age.columns = ['Region', 'Avg_15_19', 'Avg_20_24', 'Avg_25_29', 'Avg_GenZ_Index', 'City_Count']
regional_age = regional_age[regional_age['City_Count'] >= 3]  # Only regions with 3+ cities

print("REGIONAL AGE DISTRIBUTION PATTERNS:")
for _, row in regional_age.sort_values('Avg_GenZ_Index', ascending=False).iterrows():
    print(f"• {row['Region']}: 15-19: {row['Avg_15_19']:.1f}%, 20-24: {row['Avg_20_24']:.1f}%, 25-29: {row['Avg_25_29']:.1f}% (GenZ Index: {row['Avg_GenZ_Index']:.1f})")

# 8. TOP ZIP CODES BY AGE GROUP
print("\n8. TOP ZIP CODES BY AGE GROUP")
print("="*50)

# Top ZIP codes for youngest Gen Z
top_youngest_zips = df.nlargest(10, '2024 Females Age 15-19')[['DMA', 'Zip', '2024 Females Age 15-19', 'Total Female GenZ', 'GenZ Female %']]
print("TOP 10 ZIP CODES WITH MOST 15-19 YEAR OLDS:")
for _, row in top_youngest_zips.iterrows():
    percentage = (row['2024 Females Age 15-19'] / row['Total Female GenZ']) * 100
    print(f"• {row['DMA']} - ZIP {row['Zip']}: {row['2024 Females Age 15-19']:,} (Age 15-19: {percentage:.1f}% of Gen Z)")

print("\nTOP 10 ZIP CODES WITH MOST 25-29 YEAR OLDS:")
top_oldest_zips = df.nlargest(10, '2024 Females Age 25-29')[['DMA', 'Zip', '2024 Females Age 25-29', 'Total Female GenZ', 'GenZ Female %']]
for _, row in top_oldest_zips.iterrows():
    percentage = (row['2024 Females Age 25-29'] / row['Total Female GenZ']) * 100
    print(f"• {row['DMA']} - ZIP {row['Zip']}: {row['2024 Females Age 25-29']:,} (Age 25-29: {percentage:.1f}% of Gen Z)")

# 9. INSIGHTS SUMMARY
print("\n9. KEY INSIGHTS SUMMARY")
print("="*50)

print("🎯 KEY INSIGHTS ABOUT GEN Z AGE DISTRIBUTION:")
print()
print("1. NATIONAL DISTRIBUTION:")
print(f"   • Youngest Gen Z (15-19): {national_15_19/national_total_genz*100:.1f}%")
print(f"   • Middle Gen Z (20-24): {national_20_24/national_total_genz*100:.1f}%")
print(f"   • Oldest Gen Z (25-29): {national_25_29/national_total_genz*100:.1f}%")

print("\n2. AGE CONCENTRATION PATTERNS:")
print("   • Youngest Gen Z tends to concentrate in smaller, rural markets")
print("   • Oldest Gen Z tends to concentrate in major metropolitan areas")
print("   • Age distribution varies significantly by region")

print("\n3. MARKETING IMPLICATIONS:")
print("   • Different age segments require different geographic targeting")
print("   • Age distribution affects product/service positioning")
print("   • Regional strategies should consider age composition")

# Save analysis
dma_age_analysis.to_csv('genz_age_analysis.csv', index=False)
regional_age.to_csv('regional_age_patterns.csv', index=False)

print(f"\nFiles saved:")
print("• genz_age_analysis.csv - DMA-level age analysis")
print("• regional_age_patterns.csv - Regional age patterns")

