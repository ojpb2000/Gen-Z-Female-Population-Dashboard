import pandas as pd
import json
import time
import sys
import os

def log_message(message):
    """Función para logging con timestamp"""
    timestamp = time.strftime("%H:%M:%S")
    print(f"[{timestamp}] {message}")

def safe_divide(numerator, denominator, default=0):
    """División segura que evita división por cero"""
    try:
        return numerator / denominator if denominator != 0 else default
    except:
        return default

def main():
    try:
        log_message("🚀 Iniciando procesamiento inteligente del CSV...")
        start_time = time.time()
        
        # Verificar que el archivo existe
        csv_path = 'data/Female _GenZ_Populations.csv'
        if not os.path.exists(csv_path):
            log_message("❌ Error: No se encontró el archivo CSV")
            return False
        
        # Leer el archivo CSV
        log_message("📖 Leyendo archivo CSV...")
        df = pd.read_csv(csv_path)
        
        log_message(f"✅ Archivo leído: {len(df):,} filas")
        
        # Validar columnas
        required_columns = ['DMA', 'Zip', 'Total Population', 'Total Female GenZ', 'GenZ Female %']
        missing_columns = [col for col in required_columns if col not in df.columns]
        if missing_columns:
            log_message(f"❌ Error: Faltan columnas: {missing_columns}")
            return False
        
        # Calcular benchmark nacional
        log_message("🧮 Calculando benchmark nacional...")
        total_population = df['Total Population'].sum()
        total_genz_females = df['Total Female GenZ'].sum()
        national_benchmark = safe_divide(total_genz_females, total_population) * 100
        
        log_message(f"📈 Benchmark Nacional: {national_benchmark:.2f}%")
        log_message(f"👥 Población Total: {total_population:,}")
        log_message(f"👩 Gen Z Females: {total_genz_females:,}")
        
        # Obtener ciudades únicas
        unique_dmas = df['DMA'].unique()
        log_message(f"🏙️ Ciudades únicas: {len(unique_dmas)}")
        
        # Procesar datos en chunks pequeños
        log_message("⚡ Procesando datos en chunks...")
        dashboard_data = []
        chunk_size = 500  # Chunks más pequeños para mejor control
        total_chunks = (len(df) + chunk_size - 1) // chunk_size
        
        for i in range(0, len(df), chunk_size):
            chunk = df.iloc[i:i+chunk_size]
            current_chunk = (i // chunk_size) + 1
            
            log_message(f"📦 Procesando chunk {current_chunk}/{total_chunks}...")
            
            for _, row in chunk.iterrows():
                try:
                    # Calcular índice
                    zip_genz_pct = row['GenZ Female %']
                    zip_index = safe_divide(zip_genz_pct, national_benchmark) * 100
                    
                    # Calcular distribución de edades
                    total_genz = row['Total Female GenZ']
                    age15_19_pct = safe_divide(row['2024 Females Age 15-19'], total_genz) * 100
                    age20_24_pct = safe_divide(row['2024 Females Age 20-24'], total_genz) * 100
                    age25_29_pct = safe_divide(row['2024 Females Age 25-29'], total_genz) * 100
                    
                    # Mapear región básica
                    region = "Unknown"
                    dma_str = str(row['DMA']).lower()
                    
                    if any(state in dma_str for state in ['california', 'los angeles', 'san francisco', 'san diego']):
                        region = "West Coast"
                    elif any(state in dma_str for state in ['texas', 'houston', 'dallas', 'san antonio']):
                        region = "Texas"
                    elif any(state in dma_str for state in ['florida', 'miami', 'tampa', 'orlando']):
                        region = "Florida"
                    elif any(state in dma_str for state in ['new york', 'washington', 'boston', 'philadelphia']):
                        region = "Northeast"
                    elif any(state in dma_str for state in ['chicago', 'detroit', 'minneapolis']):
                        region = "Midwest"
                    elif any(state in dma_str for state in ['atlanta', 'charlotte', 'nashville']):
                        region = "Southeast"
                    elif any(state in dma_str for state in ['denver', 'phoenix', 'salt lake']):
                        region = "Mountain West"
                    
                    dashboard_data.append({
                        'dma': str(row['DMA']),
                        'zip': str(row['Zip']),
                        'region': region,
                        'population': int(row['Total Population']),
                        'genZFemales': int(row['Total Female GenZ']),
                        'concentration': round(zip_genz_pct / 100, 4),
                        'index': round(zip_index, 1),
                        'age15_19': round(age15_19_pct, 1),
                        'age20_24': round(age20_24_pct, 1),
                        'age25_29': round(age25_29_pct, 1)
                    })
                    
                except Exception as e:
                    log_message(f"⚠️ Error procesando fila {i}: {str(e)}")
                    continue
            
            # Mostrar progreso
            progress = (current_chunk / total_chunks) * 100
            log_message(f"📊 Progreso: {progress:.1f}% ({len(dashboard_data):,} registros procesados)")
        
        # Calcular estadísticas por DMA
        log_message("📊 Calculando estadísticas por DMA...")
        dma_stats = df.groupby('DMA').agg({
            'Total Population': 'sum',
            'Total Female GenZ': 'sum',
            'GenZ Female %': 'mean'
        }).reset_index()
        
        dma_stats['Index_vs_National'] = (dma_stats['GenZ Female %'] / national_benchmark) * 100
        dma_stats = dma_stats.sort_values('Index_vs_National', ascending=False)
        
        # Guardar datos
        log_message("💾 Guardando datos...")
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
        
        # Guardar archivos
        with open('real_data.json', 'w', encoding='utf-8') as f:
            json.dump(output_data, f, indent=2, ensure_ascii=False)
        
        dma_stats.to_csv('dma_analysis_real.csv', index=False)
        
        end_time = time.time()
        processing_time = end_time - start_time
        
        log_message(f"\n🎉 ¡Procesamiento completado exitosamente!")
        log_message(f"⏱️ Tiempo total: {processing_time:.2f} segundos")
        log_message(f"📁 Archivos generados:")
        log_message(f"   - real_data.json ({len(dashboard_data):,} registros)")
        log_message(f"   - dma_analysis_real.csv ({len(dma_stats)} ciudades)")
        
        log_message(f"\n📈 Top 10 ciudades por índice Gen Z:")
        for i, row in dma_stats.head(10).iterrows():
            log_message(f"   {i+1:2d}. {row['DMA']:<30} | Índice: {row['Index_vs_National']:6.1f}")
        
        return True
        
    except Exception as e:
        log_message(f"❌ Error crítico: {str(e)}")
        return False

if __name__ == "__main__":
    success = main()
    if success:
        log_message("✅ ¡Listo para actualizar el dashboard!")
    else:
        log_message("❌ Procesamiento falló. Revisar errores arriba.")
        sys.exit(1)

