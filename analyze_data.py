import pandas as pd
import numpy as np

# Cargar los datos
df = pd.read_csv('data/Female _GenZ_Populations.csv')

print("=== ANÁLISIS GENERAL DEL DATASET ===")
print(f"Total de filas: {len(df):,}")
print(f"Columnas: {list(df.columns)}")
print(f"DMAs únicos: {df['DMA'].nunique()}")
print(f"ZIP codes únicos: {df['Zip'].nunique()}")

print("\n=== MÉTRICAS NACIONALES ===")
total_population = df['Total Population'].sum()
total_female_genz = df['Total Female GenZ'].sum()
national_genz_percentage = (total_female_genz / total_population) * 100

print(f"Población total: {total_population:,}")
print(f"Mujeres Gen Z total: {total_female_genz:,}")
print(f"Porcentaje nacional de mujeres Gen Z: {national_genz_percentage:.2f}%")

print("\n=== ANÁLISIS POR DMA (CIUDAD) ===")
# Agrupar por DMA
dma_analysis = df.groupby('DMA').agg({
    'Total Population': 'sum',
    'Total Female GenZ': 'sum',
    'GenZ Female %': 'mean'
}).reset_index()

# Calcular porcentaje real por DMA
dma_analysis['Real_GenZ_Percentage'] = (dma_analysis['Total Female GenZ'] / dma_analysis['Total Population']) * 100

# Calcular índice vs nacional
dma_analysis['Index_vs_National'] = (dma_analysis['Real_GenZ_Percentage'] / national_genz_percentage) * 100

# Ordenar por índice
dma_analysis = dma_analysis.sort_values('Index_vs_National', ascending=False)

print("\nTop 15 DMAs con mayor índice de mujeres Gen Z:")
print(dma_analysis.head(15)[['DMA', 'Total Population', 'Total Female GenZ', 'Real_GenZ_Percentage', 'Index_vs_National']].to_string(index=False))

print("\nBottom 15 DMAs con menor índice de mujeres Gen Z:")
print(dma_analysis.tail(15)[['DMA', 'Total Population', 'Total Female GenZ', 'Real_GenZ_Percentage', 'Index_vs_National']].to_string(index=False))

print("\n=== ANÁLISIS DE DISTRIBUCIÓN ===")
print(f"Promedio de población por ZIP: {df['Total Population'].mean():.0f}")
print(f"Mediana de población por ZIP: {df['Total Population'].median():.0f}")
print(f"Promedio de mujeres Gen Z por ZIP: {df['Total Female GenZ'].mean():.0f}")
print(f"Mediana de mujeres Gen Z por ZIP: {df['Total Female GenZ'].median():.0f}")

print("\n=== ESTADÍSTICAS DEL PORCENTAJE GEN Z ===")
print(f"Porcentaje mínimo: {df['GenZ Female %'].min():.2f}%")
print(f"Porcentaje máximo: {df['GenZ Female %'].max():.2f}%")
print(f"Porcentaje promedio: {df['GenZ Female %'].mean():.2f}%")
print(f"Porcentaje mediano: {df['GenZ Female %'].median():.2f}%")

# Análisis de outliers
q1 = df['GenZ Female %'].quantile(0.25)
q3 = df['GenZ Female %'].quantile(0.75)
iqr = q3 - q1
lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

outliers = df[(df['GenZ Female %'] < lower_bound) | (df['GenZ Female %'] > upper_bound)]
print(f"\nZIP codes con porcentajes atípicos: {len(outliers)}")

if len(outliers) > 0:
    print("Top 10 ZIP codes con porcentajes más altos:")
    top_outliers = outliers.nlargest(10, 'GenZ Female %')[['DMA', 'Zip', 'Total Population', 'Total Female GenZ', 'GenZ Female %']]
    print(top_outliers.to_string(index=False))

# Guardar análisis detallado
dma_analysis.to_csv('dma_analysis.csv', index=False)
print(f"\nAnálisis por DMA guardado en 'dma_analysis.csv'")
