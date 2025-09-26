import pandas as pd
import numpy as np

# Cargar los datos
df = pd.read_csv('data/Female _GenZ_Populations.csv')

print("=== ANÁLISIS DE OPORTUNIDADES DE MERCADO ===")

# 1. ANÁLISIS DE MERCADOS EMERGENTES
print("\n1. MERCADOS EMERGENTES - CIUDADES CON ALTO POTENCIAL")
print("="*60)

# Calcular métricas por DMA
dma_analysis = df.groupby('DMA').agg({
    'Total Population': 'sum',
    'Total Female GenZ': 'sum',
    'Zip': 'count'
}).reset_index()

dma_analysis['Real_GenZ_Percentage'] = (dma_analysis['Total Female GenZ'] / dma_analysis['Total Population']) * 100
national_avg = (df['Total Female GenZ'].sum() / df['Total Population'].sum()) * 100
dma_analysis['Index_vs_National'] = (dma_analysis['Real_GenZ_Percentage'] / national_avg) * 100
dma_analysis['ZIP_Density'] = dma_analysis['Zip'] / dma_analysis['Total Population'] * 100000  # ZIP codes por 100K habitantes

# Categorizar oportunidades de mercado
def categorize_market_opportunity(row):
    if row['Index_vs_National'] >= 120 and row['Total Population'] >= 200000:
        return 'High Potential - Large Market'
    elif row['Index_vs_National'] >= 120 and row['Total Population'] < 200000:
        return 'High Potential - Niche Market'
    elif row['Index_vs_National'] >= 110 and row['Total Population'] >= 500000:
        return 'Medium-High Potential - Large Market'
    elif row['Index_vs_National'] >= 110 and row['Total Population'] < 500000:
        return 'Medium-High Potential - Niche Market'
    elif row['Index_vs_National'] >= 100 and row['Total Population'] >= 1000000:
        return 'Standard Potential - Major Market'
    else:
        return 'Below Average Potential'

dma_analysis['Market_Category'] = dma_analysis.apply(categorize_market_opportunity, axis=1)

# Mostrar mercados de alto potencial
high_potential = dma_analysis[dma_analysis['Market_Category'].str.contains('High Potential')].sort_values('Index_vs_National', ascending=False)

print("MERCADOS DE ALTO POTENCIAL:")
for _, row in high_potential.head(10).iterrows():
    print(f"• {row['DMA']}")
    print(f"  Población: {row['Total Population']:,} | Gen Z: {row['Real_GenZ_Percentage']:.2f}% | Índice: {row['Index_vs_National']:.1f}")
    print(f"  Categoría: {row['Market_Category']}")
    print()

# 2. ANÁLISIS DE DENSIDAD GEOGRÁFICA
print("\n2. ANÁLISIS DE DENSIDAD GEOGRÁFICA")
print("="*60)

# ZIP codes con mayor concentración absoluta
top_zip_absolute = df.nlargest(20, 'Total Female GenZ')[['DMA', 'Zip', 'Total Population', 'Total Female GenZ', 'GenZ Female %']]
print("TOP 20 ZIP CODES CON MAYOR NÚMERO ABSOLUTO DE MUJERES GEN Z:")
for _, row in top_zip_absolute.iterrows():
    print(f"• {row['DMA']} - ZIP {row['Zip']}: {row['Total Female GenZ']:,} mujeres Gen Z ({row['GenZ Female %']:.2f}%)")

print("\n" + "="*60)

# ZIP codes con mayor concentración relativa
top_zip_relative = df.nlargest(20, 'GenZ Female %')[['DMA', 'Zip', 'Total Population', 'Total Female GenZ', 'GenZ Female %']]
print("TOP 20 ZIP CODES CON MAYOR CONCENTRACIÓN RELATIVA DE MUJERES GEN Z:")
for _, row in top_zip_relative.iterrows():
    print(f"• {row['DMA']} - ZIP {row['Zip']}: {row['GenZ Female %']:.2f}% ({row['Total Female GenZ']:,} mujeres)")

# 3. ANÁLISIS DE CLUSTERS GEOGRÁFICOS
print("\n3. ANÁLISIS DE CLUSTERS GEOGRÁFICOS")
print("="*60)

# Identificar clusters de ZIP codes con alta concentración
high_concentration_threshold = df['GenZ Female %'].quantile(0.90)  # Top 10%
high_conc_zips = df[df['GenZ Female %'] >= high_concentration_threshold]

# Agrupar por DMA para ver clusters
cluster_analysis = high_conc_zips.groupby('DMA').agg({
    'Zip': 'count',
    'Total Population': 'sum',
    'Total Female GenZ': 'sum',
    'GenZ Female %': 'mean'
}).reset_index()

cluster_analysis = cluster_analysis.sort_values('Zip', ascending=False)
cluster_analysis.columns = ['DMA', 'High_Conc_ZIPs', 'Total_Population', 'Total_Female_GenZ', 'Avg_GenZ_Percentage']

print("CLUSTERS DE ZIP CODES CON ALTA CONCENTRACIÓN GEN Z:")
for _, row in cluster_analysis.head(15).iterrows():
    print(f"• {row['DMA']}: {row['High_Conc_ZIPs']} ZIP codes con alta concentración")
    print(f"  Población total en cluster: {row['Total_Population']:,}")
    print(f"  Mujeres Gen Z en cluster: {row['Total_Female_GenZ']:,}")
    print(f"  Concentración promedio: {row['Avg_GenZ_Percentage']:.2f}%")
    print()

# 4. ANÁLISIS DE OPORTUNIDADES POR SEGMENTO DE EDAD
print("\n4. ANÁLISIS POR SEGMENTO DE EDAD GEN Z")
print("="*60)

# Analizar distribución por edad
age_analysis = df.groupby('DMA').agg({
    '2024 Females Age 15-19': 'sum',
    '2024 Females Age 20-24': 'sum',
    '2024 Females Age 25-29': 'sum',
    'Total Female GenZ': 'sum'
}).reset_index()

age_analysis['Age_15_19_Percentage'] = (age_analysis['2024 Females Age 15-19'] / age_analysis['Total Female GenZ']) * 100
age_analysis['Age_20_24_Percentage'] = (age_analysis['2024 Females Age 20-24'] / age_analysis['Total Female GenZ']) * 100
age_analysis['Age_25_29_Percentage'] = (age_analysis['2024 Females Age 25-29'] / age_analysis['Total Female GenZ']) * 100

# Identificar mercados con diferentes perfiles de edad
print("MERCADOS CON MAYOR CONCENTRACIÓN DE GEN Z JÓVENES (15-19):")
young_genz = age_analysis.nlargest(10, 'Age_15_19_Percentage')
for _, row in young_genz.iterrows():
    print(f"• {row['DMA']}: {row['Age_15_19_Percentage']:.1f}% en rango 15-19")

print("\nMERCADOS CON MAYOR CONCENTRACIÓN DE GEN Z ADULTOS (25-29):")
adult_genz = age_analysis.nlargest(10, 'Age_25_29_Percentage')
for _, row in adult_genz.iterrows():
    print(f"• {row['DMA']}: {row['Age_25_29_Percentage']:.1f}% en rango 25-29")

# 5. INSIGHTS ESTRATÉGICOS
print("\n5. INSIGHTS ESTRATÉGICOS PARA EL DASHBOARD")
print("="*60)

print("🎯 INSIGHTS CLAVE PARA VISUALIZACIÓN:")
print()
print("1. MAPA INTERACTIVO:")
print("   - Mostrar concentración por ZIP code con códigos de color")
print("   - Clusters de alta concentración para targeting geográfico")
print("   - Comparación regional vs benchmark nacional")
print()

print("2. ANÁLISIS COMPARATIVO:")
print("   - Ranking de DMAs por índice de concentración")
print("   - Análisis por tamaño de mercado (población)")
print("   - Segmentación por edad dentro de Gen Z")
print()

print("3. OPORTUNIDADES DE MERCADO:")
print("   - Mercados emergentes con alto potencial")
print("   - ZIP codes con mayor densidad absoluta y relativa")
print("   - Patrones geográficos y culturales")
print()

print("4. MÉTRICAS CLAVE:")
print(f"   - Benchmark nacional: {national_avg:.2f}%")
print(f"   - Rango de concentración: {df['GenZ Female %'].min():.2f}% - {df['GenZ Female %'].max():.2f}%")
print(f"   - Total de mercados analizados: {len(dma_analysis)}")
print(f"   - ZIP codes con alta concentración: {len(high_conc_zips)}")

# 6. RECOMENDACIONES PARA TABS DEL DASHBOARD
print("\n6. RECOMENDACIONES PARA TABS DEL DASHBOARD")
print("="*60)

print("📊 ESTRUCTURA RECOMENDADA DEL DASHBOARD:")
print()
print("TAB 1: VISTA GENERAL")
print("   - KPIs principales (benchmark nacional, totales)")
print("   - Gráfico de distribución nacional")
print("   - Top 10 ciudades con mayor concentración")
print()

print("TAB 2: MAPA INTERACTIVO")
print("   - Mapa de calor por ZIP code")
print("   - Filtros por DMA, concentración, población")
print("   - Clusters de alta concentración")
print()

print("TAB 3: ANÁLISIS COMPARATIVO")
print("   - Ranking de DMAs con índices")
print("   - Análisis por tamaño de mercado")
print("   - Comparación regional")
print()

print("TAB 4: OPORTUNIDADES DE MERCADO")
print("   - Mercados de alto potencial")
print("   - ZIP codes con mayor densidad")
print("   - Segmentación por edad Gen Z")
print()

print("TAB 5: INSIGHTS CULTURALES")
print("   - Patrones por tipo de ciudad (universitaria, etc.)")
print("   - Análisis de tendencias geográficas")
print("   - Recomendaciones estratégicas")

# Guardar análisis final
dma_analysis.to_csv('market_opportunity_analysis.csv', index=False)
cluster_analysis.to_csv('geographic_clusters.csv', index=False)
age_analysis.to_csv('age_segment_analysis.csv', index=False)

print(f"\nArchivos de análisis de mercado guardados:")
print("- market_opportunity_analysis.csv")
print("- geographic_clusters.csv")
print("- age_segment_analysis.csv")

