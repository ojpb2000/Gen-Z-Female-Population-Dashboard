import pandas as pd
import numpy as np

# Cargar los datos
df = pd.read_csv('data/Female _GenZ_Populations.csv')

print("=== ANÁLISIS PROFUNDO DE INSIGHTS ===")

# 1. ANÁLISIS GEOGRÁFICO REGIONAL
print("\n1. ANÁLISIS GEOGRÁFICO REGIONAL")
print("="*50)

# Identificar patrones por regiones (basado en nombres de ciudades)
def categorize_region(dma):
    dma_lower = dma.lower()
    if any(state in dma_lower for state in ['california', 'los angeles', 'san francisco', 'san diego', 'sacramento']):
        return 'West Coast'
    elif any(state in dma_lower for state in ['texas', 'houston', 'dallas', 'austin', 'san antonio']):
        return 'Texas'
    elif any(state in dma_lower for state in ['florida', 'miami', 'orlando', 'tampa', 'jacksonville']):
        return 'Florida'
    elif any(state in dma_lower for state in ['new york', 'buffalo', 'rochester', 'syracuse']):
        return 'New York'
    elif any(state in dma_lower for state in ['washington', 'seattle', 'spokane']):
        return 'Pacific Northwest'
    elif any(state in dma_lower for state in ['utah', 'salt lake', 'provo']):
        return 'Mountain West'
    elif any(state in dma_lower for state in ['colorado', 'denver', 'colorado springs']):
        return 'Rocky Mountains'
    elif any(state in dma_lower for state in ['arizona', 'phoenix', 'tucson']):
        return 'Southwest'
    elif any(state in dma_lower for state in ['georgia', 'atlanta', 'savannah']):
        return 'Southeast'
    elif any(state in dma_lower for state in ['north carolina', 'charlotte', 'raleigh', 'greensboro']):
        return 'Carolinas'
    elif any(state in dma_lower for state in ['tennessee', 'nashville', 'memphis', 'knoxville']):
        return 'Tennessee'
    elif any(state in dma_lower for state in ['ohio', 'cleveland', 'columbus', 'cincinnati']):
        return 'Ohio'
    elif any(state in dma_lower for state in ['pennsylvania', 'philadelphia', 'pittsburgh']):
        return 'Pennsylvania'
    elif any(state in dma_lower for state in ['illinois', 'chicago', 'springfield']):
        return 'Illinois'
    elif any(state in dma_lower for state in ['michigan', 'detroit', 'grand rapids']):
        return 'Michigan'
    elif any(state in dma_lower for state in ['wisconsin', 'milwaukee', 'madison']):
        return 'Wisconsin'
    elif any(state in dma_lower for state in ['minnesota', 'minneapolis', 'st paul']):
        return 'Minnesota'
    elif any(state in dma_lower for state in ['iowa', 'des moines', 'cedar rapids']):
        return 'Iowa'
    elif any(state in dma_lower for state in ['missouri', 'st louis', 'kansas city']):
        return 'Missouri'
    elif any(state in dma_lower for state in ['kansas', 'wichita', 'topeka']):
        return 'Kansas'
    elif any(state in dma_lower for state in ['oklahoma', 'oklahoma city', 'tulsa']):
        return 'Oklahoma'
    elif any(state in dma_lower for state in ['arkansas', 'little rock', 'fayetteville']):
        return 'Arkansas'
    elif any(state in dma_lower for state in ['louisiana', 'new orleans', 'baton rouge']):
        return 'Louisiana'
    elif any(state in dma_lower for state in ['mississippi', 'jackson', 'biloxi']):
        return 'Mississippi'
    elif any(state in dma_lower for state in ['alabama', 'birmingham', 'montgomery']):
        return 'Alabama'
    elif any(state in dma_lower for state in ['south carolina', 'charleston', 'columbia']):
        return 'South Carolina'
    elif any(state in dma_lower for state in ['virginia', 'richmond', 'norfolk', 'roanoke']):
        return 'Virginia'
    elif any(state in dma_lower for state in ['west virginia', 'charleston', 'huntington']):
        return 'West Virginia'
    elif any(state in dma_lower for state in ['kentucky', 'louisville', 'lexington']):
        return 'Kentucky'
    elif any(state in dma_lower for state in ['indiana', 'indianapolis', 'fort wayne']):
        return 'Indiana'
    elif any(state in dma_lower for state in ['maine', 'portland', 'bangor']):
        return 'Maine'
    elif any(state in dma_lower for state in ['vermont', 'burlington']):
        return 'Vermont'
    elif any(state in dma_lower for state in ['new hampshire', 'manchester', 'concord']):
        return 'New Hampshire'
    elif any(state in dma_lower for state in ['massachusetts', 'boston', 'springfield']):
        return 'Massachusetts'
    elif any(state in dma_lower for state in ['rhode island', 'providence']):
        return 'Rhode Island'
    elif any(state in dma_lower for state in ['connecticut', 'hartford', 'new haven']):
        return 'Connecticut'
    elif any(state in dma_lower for state in ['new jersey', 'newark', 'trenton']):
        return 'New Jersey'
    elif any(state in dma_lower for state in ['delaware', 'wilmington']):
        return 'Delaware'
    elif any(state in dma_lower for state in ['maryland', 'baltimore', 'annapolis']):
        return 'Maryland'
    elif any(state in dma_lower for state in ['dc', 'washington']):
        return 'Washington DC'
    elif any(state in dma_lower for state in ['alaska', 'anchorage', 'fairbanks']):
        return 'Alaska'
    elif any(state in dma_lower for state in ['hawaii', 'honolulu']):
        return 'Hawaii'
    elif any(state in dma_lower for state in ['nevada', 'las vegas', 'reno']):
        return 'Nevada'
    elif any(state in dma_lower for state in ['new mexico', 'albuquerque', 'santa fe']):
        return 'New Mexico'
    elif any(state in dma_lower for state in ['wyoming', 'cheyenne', 'casper']):
        return 'Wyoming'
    elif any(state in dma_lower for state in ['montana', 'billings', 'missoula']):
        return 'Montana'
    elif any(state in dma_lower for state in ['north dakota', 'fargo', 'bismarck']):
        return 'North Dakota'
    elif any(state in dma_lower for state in ['south dakota', 'sioux falls', 'rapid city']):
        return 'South Dakota'
    elif any(state in dma_lower for state in ['nebraska', 'omaha', 'lincoln']):
        return 'Nebraska'
    else:
        return 'Other'

df['Region'] = df['DMA'].apply(categorize_region)

# Análisis por región
regional_analysis = df.groupby('Region').agg({
    'Total Population': 'sum',
    'Total Female GenZ': 'sum',
    'GenZ Female %': 'mean'
}).reset_index()

regional_analysis['Real_GenZ_Percentage'] = (regional_analysis['Total Female GenZ'] / regional_analysis['Total Population']) * 100
national_avg = (df['Total Female GenZ'].sum() / df['Total Population'].sum()) * 100
regional_analysis['Index_vs_National'] = (regional_analysis['Real_GenZ_Percentage'] / national_avg) * 100

regional_analysis = regional_analysis.sort_values('Index_vs_National', ascending=False)

print("Top 10 regiones con mayor concentración de mujeres Gen Z:")
for _, row in regional_analysis.head(10).iterrows():
    print(f"{row['Region']}: {row['Real_GenZ_Percentage']:.2f}% (Índice: {row['Index_vs_National']:.1f})")

# 2. ANÁLISIS DE TAMAÑO DE CIUDAD
print("\n2. ANÁLISIS POR TAMAÑO DE CIUDAD")
print("="*50)

# Categorizar ciudades por tamaño
def categorize_city_size(total_pop):
    if total_pop < 100000:
        return 'Small (<100K)'
    elif total_pop < 500000:
        return 'Medium (100K-500K)'
    elif total_pop < 1000000:
        return 'Large (500K-1M)'
    elif total_pop < 2000000:
        return 'Very Large (1M-2M)'
    else:
        return 'Metropolitan (>2M)'

dma_analysis = df.groupby('DMA').agg({
    'Total Population': 'sum',
    'Total Female GenZ': 'sum'
}).reset_index()

dma_analysis['City_Size'] = dma_analysis['Total Population'].apply(categorize_city_size)
dma_analysis['Real_GenZ_Percentage'] = (dma_analysis['Total Female GenZ'] / dma_analysis['Total Population']) * 100
dma_analysis['Index_vs_National'] = (dma_analysis['Real_GenZ_Percentage'] / national_avg) * 100

size_analysis = dma_analysis.groupby('City_Size').agg({
    'Real_GenZ_Percentage': 'mean',
    'Index_vs_National': 'mean',
    'DMA': 'count'
}).reset_index()

size_analysis.columns = ['City_Size', 'Avg_GenZ_Percentage', 'Avg_Index', 'Number_of_Cities']
size_analysis = size_analysis.sort_values('Avg_Index', ascending=False)

print("Concentración de mujeres Gen Z por tamaño de ciudad:")
for _, row in size_analysis.iterrows():
    print(f"{row['City_Size']}: {row['Avg_GenZ_Percentage']:.2f}% (Índice: {row['Avg_Index']:.1f}) - {row['Number_of_Cities']} ciudades")

# 3. ANÁLISIS DE DENSIDAD GEOGRÁFICA
print("\n3. ANÁLISIS DE DENSIDAD GEOGRÁFICA")
print("="*50)

# Analizar ZIP codes con mayor concentración
high_concentration_zips = df[df['GenZ Female %'] > df['GenZ Female %'].quantile(0.95)]
print(f"ZIP codes en el top 5% de concentración Gen Z:")
print(f"Promedio de población: {high_concentration_zips['Total Population'].mean():.0f}")
print(f"Promedio de mujeres Gen Z: {high_concentration_zips['Total Female GenZ'].mean():.0f}")
print(f"Porcentaje promedio: {high_concentration_zips['GenZ Female %'].mean():.2f}%")

# Top DMAs con más ZIP codes de alta concentración
high_conc_dmas = high_concentration_zips['DMA'].value_counts().head(10)
print(f"\nDMAs con más ZIP codes de alta concentración Gen Z:")
for dma, count in high_conc_dmas.items():
    print(f"{dma}: {count} ZIP codes")

# 4. ANÁLISIS DE PATRONES CULTURALES/ECONÓMICOS
print("\n4. ANÁLISIS DE PATRONES CULTURALES/ECONÓMICOS")
print("="*50)

# Identificar ciudades universitarias
university_cities = ['gainesville', 'charlottesville', 'harrisonburg', 'blacksburg', 'college station', 
                    'boulder', 'madison', 'ann arbor', 'champaign', 'bloomington', 'columbia', 'athens']

university_dmas = df[df['DMA'].str.lower().str.contains('|'.join(university_cities), na=False)]
if len(university_dmas) > 0:
    univ_analysis = university_dmas.groupby('DMA').agg({
        'Total Population': 'sum',
        'Total Female GenZ': 'sum'
    }).reset_index()
    univ_analysis['Real_GenZ_Percentage'] = (univ_analysis['Total Female GenZ'] / univ_analysis['Total Population']) * 100
    univ_analysis['Index_vs_National'] = (univ_analysis['Real_GenZ_Percentage'] / national_avg) * 100
    
    print("Ciudades universitarias con mayor concentración Gen Z:")
    for _, row in univ_analysis.sort_values('Index_vs_National', ascending=False).head(5).iterrows():
        print(f"{row['DMA']}: {row['Real_GenZ_Percentage']:.2f}% (Índice: {row['Index_vs_National']:.1f})")

# 5. INSIGHTS CLAVE PARA EL DASHBOARD
print("\n5. INSIGHTS CLAVE PARA EL DASHBOARD")
print("="*50)

print("🎯 INSIGHTS PRINCIPALES:")
print("1. BENCHMARK NACIONAL: 9.61% de mujeres Gen Z en la población total")
print("2. RANGOS DE CONCENTRACIÓN:")
print(f"   - Mínimo: {df['GenZ Female %'].min():.2f}%")
print(f"   - Máximo: {df['GenZ Female %'].max():.2f}%")
print(f"   - Promedio: {df['GenZ Female %'].mean():.2f}%")

print("\n3. TOP 5 CIUDADES CON MAYOR CONCENTRACIÓN:")
top_cities = dma_analysis.nlargest(5, 'Index_vs_National')
for _, row in top_cities.iterrows():
    print(f"   - {row['DMA']}: {row['Real_GenZ_Percentage']:.2f}% (Índice: {row['Index_vs_National']:.1f})")

print("\n4. PATRONES GEOGRÁFICOS:")
print("   - Ciudades universitarias tienden a tener mayor concentración")
print("   - Regiones del sur y oeste muestran patrones interesantes")
print("   - Ciudades pequeñas vs grandes tienen diferentes concentraciones")

print("\n5. OPORTUNIDADES DE MERCADO:")
print("   - ZIP codes con alta concentración para targeting específico")
print("   - DMAs con índices altos para campañas regionales")
print("   - Análisis de densidad para optimización de recursos")

# Guardar análisis detallado
dma_analysis.to_csv('detailed_dma_analysis.csv', index=False)
regional_analysis.to_csv('regional_analysis.csv', index=False)
size_analysis.to_csv('city_size_analysis.csv', index=False)

print(f"\nArchivos de análisis guardados:")
print("- detailed_dma_analysis.csv")
print("- regional_analysis.csv") 
print("- city_size_analysis.csv")

