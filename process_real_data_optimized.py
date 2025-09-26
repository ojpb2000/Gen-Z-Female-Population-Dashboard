import pandas as pd
import json
import time

print("🚀 Iniciando procesamiento optimizado del CSV real...")
start_time = time.time()

# Leer el archivo CSV real
print("📖 Leyendo archivo CSV...")
df = pd.read_csv('data/Female _GenZ_Populations.csv')

print(f"✅ Archivo leído: {len(df):,} filas, {len(df.columns)} columnas")
print(f"📊 Columnas: {list(df.columns)}")

# Calcular el benchmark nacional (optimizado)
print("🧮 Calculando benchmark nacional...")
total_population = df['Total Population'].sum()
total_genz_females = df['Total Female GenZ'].sum()
national_benchmark = (total_genz_females / total_population) * 100

print(f"📈 Benchmark Nacional: {national_benchmark:.2f}%")
print(f"👥 Población Total: {total_population:,}")
print(f"👩 Gen Z Females: {total_genz_females:,}")

# Obtener ciudades únicas
unique_dmas = df['DMA'].unique()
print(f"🏙️ Ciudades únicas: {len(unique_dmas)}")

# Procesar datos de manera optimizada (vectorizada)
print("⚡ Procesando datos de manera optimizada...")

# Calcular índices vectorizados
df['GenZ_Percentage'] = (df['Total Female GenZ'] / df['Total Population']) * 100
df['Index_vs_National'] = (df['GenZ_Percentage'] / national_benchmark) * 100

# Calcular distribución de edades de manera vectorizada
df['age15_19_pct'] = (df['2024 Females Age 15-19'] / df['Total Female GenZ'].replace(0, 1)) * 100
df['age20_24_pct'] = (df['2024 Females Age 20-24'] / df['Total Female GenZ'].replace(0, 1)) * 100
df['age25_29_pct'] = (df['2024 Females Age 25-29'] / df['Total Female GenZ'].replace(0, 1)) * 100

# Crear datos para el dashboard de manera optimizada
print("🔄 Creando datos para dashboard...")
dashboard_data = []

# Procesar en chunks para mejor rendimiento
chunk_size = 1000
total_chunks = len(df) // chunk_size + 1

for i in range(0, len(df), chunk_size):
    chunk = df.iloc[i:i+chunk_size]
    
    for _, row in chunk.iterrows():
        # Mapear regiones básicas (simplificado)
        region = "Unknown"
        dma_lower = str(row['DMA']).lower()
        
        if any(state in dma_lower for state in ['california', 'los angeles', 'san francisco', 'san diego', 'san jose']):
            region = "West Coast"
        elif any(state in dma_lower for state in ['texas', 'houston', 'dallas', 'san antonio', 'austin']):
            region = "Texas"
        elif any(state in dma_lower for state in ['florida', 'miami', 'tampa', 'orlando']):
            region = "Florida"
        elif any(state in dma_lower for state in ['new york', 'washington', 'boston', 'philadelphia']):
            region = "Northeast"
        elif any(state in dma_lower for state in ['chicago', 'detroit', 'minneapolis', 'milwaukee']):
            region = "Midwest"
        elif any(state in dma_lower for state in ['atlanta', 'charlotte', 'nashville', 'birmingham']):
            region = "Southeast"
        elif any(state in dma_lower for state in ['denver', 'phoenix', 'salt lake', 'las vegas']):
            region = "Mountain West"
        
        dashboard_data.append({
            'dma': str(row['DMA']),
            'zip': str(row['Zip']),
            'region': region,
            'population': int(row['Total Population']),
            'genZFemales': int(row['Total Female GenZ']),
            'concentration': round(row['GenZ Female %'] / 100, 4),
            'index': round(row['Index_vs_National'], 1),
            'age15_19': round(row['age15_19_pct'], 1),
            'age20_24': round(row['age20_24_pct'], 1),
            'age25_29': round(row['age25_29_pct'], 1)
        })
    
    # Mostrar progreso
    current_chunk = (i // chunk_size) + 1
    print(f"📦 Procesando chunk {current_chunk}/{total_chunks} ({len(dashboard_data):,} registros)")

# Calcular estadísticas por DMA
print("📊 Calculando estadísticas por DMA...")
dma_stats = df.groupby('DMA').agg({
    'Total Population': 'sum',
    'Total Female GenZ': 'sum',
    'Index_vs_National': 'mean',
    'GenZ_Percentage': 'mean'
}).reset_index()

dma_stats = dma_stats.sort_values('Index_vs_National', ascending=False)

# Guardar datos procesados
print("💾 Guardando datos procesados...")
output_data = {
    'metadata': {
        'national_benchmark': round(national_benchmark, 2),
        'total_population': int(total_population),
        'total_genz_females': int(total_genz_females),
        'unique_cities': len(unique_dmas),
        'total_zip_codes': len(dashboard_data),
        'processing_time': round(time.time() - start_time, 2)
    },
    'top_cities': dma_stats.head(20).to_dict('records'),
    'data': dashboard_data
}

# Guardar en archivo JSON
with open('real_data.json', 'w', encoding='utf-8') as f:
    json.dump(output_data, f, indent=2, ensure_ascii=False)

# Guardar también un resumen en CSV
dma_stats.to_csv('dma_analysis_real.csv', index=False)

end_time = time.time()
processing_time = end_time - start_time

print(f"\n🎉 ¡Procesamiento completado!")
print(f"⏱️ Tiempo total: {processing_time:.2f} segundos")
print(f"📁 Archivos generados:")
print(f"   - real_data.json ({len(dashboard_data):,} registros)")
print(f"   - dma_analysis_real.csv ({len(dma_stats)} ciudades)")
print(f"\n📈 Top 10 ciudades por índice Gen Z:")
for i, row in dma_stats.head(10).iterrows():
    print(f"   {i+1:2d}. {row['DMA']:<30} | Índice: {row['Index_vs_National']:6.1f} | Gen Z: {row['GenZ_Percentage']:5.2f}%")

print(f"\n✅ ¡Listo para actualizar el dashboard con datos reales!")

