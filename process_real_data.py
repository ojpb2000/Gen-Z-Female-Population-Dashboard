import pandas as pd
import json

# Leer el archivo CSV real
df = pd.read_csv('data/Female _GenZ_Populations.csv')

print("Estructura del archivo CSV:")
print(f"Filas: {len(df)}")
print(f"Columnas: {list(df.columns)}")
print("\nPrimeras 5 filas:")
print(df.head())

# Calcular el benchmark nacional
total_population = df['Total Population'].sum()
total_genz_females = df['Total Female GenZ'].sum()
national_benchmark = (total_genz_females / total_population) * 100

print(f"\nBenchmark Nacional:")
print(f"Población Total: {total_population:,}")
print(f"Total Gen Z Females: {total_genz_females:,}")
print(f"Benchmark Nacional: {national_benchmark:.2f}%")

# Obtener ciudades únicas
unique_dmas = df['DMA'].unique()
print(f"\nCiudades únicas en el dataset: {len(unique_dmas)}")
print("Primeras 20 ciudades:")
for i, dma in enumerate(unique_dmas[:20]):
    print(f"{i+1}. {dma}")

# Calcular índices por DMA
dma_analysis = df.groupby('DMA').agg({
    'Total Population': 'sum',
    'Total Female GenZ': 'sum',
    '2024 Females Age 15-19': 'sum',
    '2024 Females Age 20-24': 'sum', 
    '2024 Females Age 25-29': 'sum'
}).reset_index()

dma_analysis['GenZ_Percentage'] = (dma_analysis['Total Female GenZ'] / dma_analysis['Total Population']) * 100
dma_analysis['Index_vs_National'] = (dma_analysis['GenZ_Percentage'] / national_benchmark) * 100

# Ordenar por índice
dma_analysis = dma_analysis.sort_values('Index_vs_National', ascending=False)

print(f"\nTop 15 ciudades por índice Gen Z:")
print(dma_analysis[['DMA', 'Total Population', 'Total Female GenZ', 'GenZ_Percentage', 'Index_vs_National']].head(15))

# Crear datos para el dashboard
dashboard_data = []
for _, row in df.iterrows():
    # Calcular índice individual para cada ZIP
    zip_genz_percentage = row['GenZ Female %']
    zip_index = (zip_genz_percentage / national_benchmark) * 100
    
    # Calcular distribución de edades
    total_genz = row['Total Female GenZ']
    if total_genz > 0:
        age15_19_pct = (row['2024 Females Age 15-19'] / total_genz) * 100
        age20_24_pct = (row['2024 Females Age 20-24'] / total_genz) * 100
        age25_29_pct = (row['2024 Females Age 25-29'] / total_genz) * 100
    else:
        age15_19_pct = age20_24_pct = age25_29_pct = 0
    
    dashboard_data.append({
        'dma': row['DMA'],
        'zip': str(row['Zip']),
        'region': 'Unknown',  # Necesitaríamos mapear esto
        'population': int(row['Total Population']),
        'genZFemales': int(row['Total Female GenZ']),
        'concentration': row['GenZ Female %'] / 100,  # Convertir a decimal
        'index': round(zip_index, 1),
        'age15_19': round(age15_19_pct, 1),
        'age20_24': round(age20_24_pct, 1),
        'age25_29': round(age25_29_pct, 1)
    })

# Guardar datos procesados
with open('processed_data.json', 'w') as f:
    json.dump({
        'national_benchmark': national_benchmark,
        'total_population': total_population,
        'total_genz_females': total_genz_females,
        'unique_cities': len(unique_dmas),
        'data': dashboard_data[:1000]  # Limitar a 1000 registros para el dashboard
    }, f, indent=2)

print(f"\nDatos procesados guardados en processed_data.json")
print(f"Total registros procesados: {len(dashboard_data)}")
print(f"Registros para dashboard: 1000")

