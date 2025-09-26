import pandas as pd
import numpy as np

# Cargar los datos
df = pd.read_csv('data/Female _GenZ_Populations.csv')

print("=== METODOLOGÍA DE ANÁLISIS - CÁLCULO DE ÍNDICES ===")
print("="*60)

# 1. METODOLOGÍA DE CÁLCULO DE ÍNDICES
print("\n1. METODOLOGÍA DE CÁLCULO DE ÍNDICES")
print("="*50)

print("📊 PASO 1: CÁLCULO DEL BENCHMARK NACIONAL")
print("-" * 40)
total_population = df['Total Population'].sum()
total_female_genz = df['Total Female GenZ'].sum()
national_benchmark = (total_female_genz / total_population) * 100

print(f"Población total nacional: {total_population:,}")
print(f"Mujeres Gen Z total nacional: {total_female_genz:,}")
print(f"Benchmark nacional: {national_benchmark:.2f}%")
print(f"Fórmula: (Total Female GenZ / Total Population) × 100")

print("\n📊 PASO 2: CÁLCULO DE ÍNDICES POR DMA (CIUDAD)")
print("-" * 40)
print("Para cada ciudad (DMA):")
print("1. Sumar todas las filas donde DMA = [Nombre de Ciudad]")
print("2. Calcular porcentaje real: (Total Female GenZ / Total Population) × 100")
print("3. Calcular índice: (Porcentaje Ciudad / Benchmark Nacional) × 100")

# Ejemplo práctico con Gainesville
gainesville_data = df[df['DMA'] == 'Gainesville']
gainesville_pop = gainesville_data['Total Population'].sum()
gainesville_genz = gainesville_data['Total Female GenZ'].sum()
gainesville_percentage = (gainesville_genz / gainesville_pop) * 100
gainesville_index = (gainesville_percentage / national_benchmark) * 100

print(f"\nEjemplo - Gainesville:")
print(f"Población total Gainesville: {gainesville_pop:,}")
print(f"Mujeres Gen Z Gainesville: {gainesville_genz:,}")
print(f"Porcentaje Gainesville: {gainesville_percentage:.2f}%")
print(f"Índice Gainesville: {gainesville_index:.1f}")
print(f"Interpretación: Gainesville tiene {gainesville_index:.1f}% de la concentración nacional")

print("\n📊 PASO 3: CÁLCULO DE ÍNDICES POR ZIP CODE")
print("-" * 40)
print("Para cada ZIP code individual:")
print("1. Usar el porcentaje ya calculado en la columna 'GenZ Female %'")
print("2. Calcular índice: (Porcentaje ZIP / Benchmark Nacional) × 100")

# Ejemplo con un ZIP code específico
example_zip = df.iloc[0]  # Primer ZIP code
zip_percentage = example_zip['GenZ Female %']
zip_index = (zip_percentage / national_benchmark) * 100

print(f"\nEjemplo - ZIP {example_zip['Zip']} en {example_zip['DMA']}:")
print(f"Porcentaje ZIP: {zip_percentage:.2f}%")
print(f"Índice ZIP: {zip_index:.1f}")

print("\n📊 PASO 4: CÁLCULO DE ÍNDICES POR REGIÓN")
print("-" * 40)
print("Para regiones geográficas:")
print("1. Agrupar DMAs por región geográfica")
print("2. Sumar población y mujeres Gen Z por región")
print("3. Calcular porcentaje regional")
print("4. Calcular índice regional")

# 2. ANÁLISIS DETALLADO CON METODOLOGÍA
print("\n2. ANÁLISIS DETALLADO CON METODOLOGÍA")
print("="*50)

# Análisis por DMA con metodología explicada
dma_analysis = df.groupby('DMA').agg({
    'Total Population': 'sum',
    'Total Female GenZ': 'sum',
    'Zip': 'count'
}).reset_index()

dma_analysis['Real_GenZ_Percentage'] = (dma_analysis['Total Female GenZ'] / dma_analysis['Total Population']) * 100
dma_analysis['Index_vs_National'] = (dma_analysis['Real_GenZ_Percentage'] / national_benchmark) * 100
dma_analysis['ZIP_Count'] = dma_analysis['Zip']

# Categorizar por nivel de concentración
def categorize_concentration(index):
    if index >= 130:
        return 'Muy Alta (≥130)'
    elif index >= 120:
        return 'Alta (120-129)'
    elif index >= 110:
        return 'Media-Alta (110-119)'
    elif index >= 100:
        return 'Media (100-109)'
    elif index >= 90:
        return 'Media-Baja (90-99)'
    else:
        return 'Baja (<90)'

dma_analysis['Concentration_Level'] = dma_analysis['Index_vs_National'].apply(categorize_concentration)

print("CATEGORIZACIÓN DE CONCENTRACIÓN:")
concentration_summary = dma_analysis['Concentration_Level'].value_counts()
for level, count in concentration_summary.items():
    percentage = (count / len(dma_analysis)) * 100
    print(f"• {level}: {count} ciudades ({percentage:.1f}%)")

# 3. ANÁLISIS DE DISTRIBUCIÓN DE ÍNDICES
print("\n3. ANÁLISIS DE DISTRIBUCIÓN DE ÍNDICES")
print("="*50)

print("ESTADÍSTICAS DE ÍNDICES POR DMA:")
print(f"• Índice mínimo: {dma_analysis['Index_vs_National'].min():.1f}")
print(f"• Índice máximo: {dma_analysis['Index_vs_National'].max():.1f}")
print(f"• Índice promedio: {dma_analysis['Index_vs_National'].mean():.1f}")
print(f"• Índice mediano: {dma_analysis['Index_vs_National'].median():.1f}")
print(f"• Desviación estándar: {dma_analysis['Index_vs_National'].std():.1f}")

# Percentiles
percentiles = [10, 25, 50, 75, 90, 95, 99]
print(f"\nPERCENTILES DE ÍNDICES:")
for p in percentiles:
    value = np.percentile(dma_analysis['Index_vs_National'], p)
    print(f"• Percentil {p}: {value:.1f}")

# 4. ANÁLISIS DE CORRELACIONES
print("\n4. ANÁLISIS DE CORRELACIONES")
print("="*50)

# Correlación entre tamaño de población e índice
correlation_pop_index = dma_analysis['Total Population'].corr(dma_analysis['Index_vs_National'])
print(f"Correlación Población vs Índice: {correlation_pop_index:.3f}")

# Correlación entre número de ZIP codes e índice
correlation_zip_index = dma_analysis['ZIP_Count'].corr(dma_analysis['Index_vs_National'])
print(f"Correlación ZIP Count vs Índice: {correlation_zip_index:.3f}")

# 5. ANÁLISIS DE OUTLIERS
print("\n5. ANÁLISIS DE OUTLIERS")
print("="*50)

# Identificar outliers usando IQR
Q1 = dma_analysis['Index_vs_National'].quantile(0.25)
Q3 = dma_analysis['Index_vs_National'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

outliers = dma_analysis[(dma_analysis['Index_vs_National'] < lower_bound) | 
                       (dma_analysis['Index_vs_National'] > upper_bound)]

print(f"OUTLIERS IDENTIFICADOS: {len(outliers)} ciudades")
print("Ciudades con índices atípicamente altos:")
high_outliers = outliers[outliers['Index_vs_National'] > upper_bound].sort_values('Index_vs_National', ascending=False)
for _, row in high_outliers.head(10).iterrows():
    print(f"• {row['DMA']}: Índice {row['Index_vs_National']:.1f}")

print("\nCiudades con índices atípicamente bajos:")
low_outliers = outliers[outliers['Index_vs_National'] < lower_bound].sort_values('Index_vs_National')
for _, row in low_outliers.head(10).iterrows():
    print(f"• {row['DMA']}: Índice {row['Index_vs_National']:.1f}")

# 6. METODOLOGÍA PARA TABLA INTERACTIVA
print("\n6. METODOLOGÍA PARA TABLA INTERACTIVA")
print("="*50)

print("FUNCIONALIDADES DE LA TABLA INTERACTIVA:")
print("1. FILTROS DISPONIBLES:")
print("   • Por DMA (ciudad)")
print("   • Por rango de índice")
print("   • Por tamaño de población")
print("   • Por nivel de concentración")
print("   • Por región geográfica")

print("\n2. CÁLCULOS DINÁMICOS:")
print("   • Al filtrar por DMA: mostrar totales agregados de la ciudad")
print("   • Al filtrar por región: mostrar totales agregados de la región")
print("   • Al seleccionar múltiples ZIP codes: mostrar totales combinados")

print("\n3. MÉTRICAS A MOSTRAR:")
print("   • DMA (Ciudad)")
print("   • ZIP Code")
print("   • Población Total")
print("   • Mujeres Gen Z")
print("   • Porcentaje Gen Z")
print("   • Índice vs Nacional")
print("   • Nivel de Concentración")
print("   • Región Geográfica")

# 7. GUARDAR ANÁLISIS CON METODOLOGÍA
print("\n7. GUARDANDO ANÁLISIS CON METODOLOGÍA")
print("="*50)

# Crear dataset completo para tabla interactiva
interactive_data = df.copy()
interactive_data['Index_vs_National'] = (interactive_data['GenZ Female %'] / national_benchmark) * 100
interactive_data['Concentration_Level'] = interactive_data['Index_vs_National'].apply(categorize_concentration)

# Agregar información regional
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
    elif any(state in dma_lower for state in ['iowa', 'des moines']):
        return 'Iowa'
    elif any(state in dma_lower for state in ['missouri', 'st louis', 'kansas city']):
        return 'Missouri'
    elif any(state in dma_lower for state in ['kansas', 'wichita']):
        return 'Kansas'
    elif any(state in dma_lower for state in ['oklahoma', 'oklahoma city']):
        return 'Oklahoma'
    elif any(state in dma_lower for state in ['arkansas', 'little rock']):
        return 'Arkansas'
    elif any(state in dma_lower for state in ['louisiana', 'new orleans']):
        return 'Louisiana'
    elif any(state in dma_lower for state in ['mississippi', 'jackson']):
        return 'Mississippi'
    elif any(state in dma_lower for state in ['alabama', 'birmingham']):
        return 'Alabama'
    elif any(state in dma_lower for state in ['south carolina', 'charleston']):
        return 'South Carolina'
    elif any(state in dma_lower for state in ['virginia', 'richmond', 'norfolk']):
        return 'Virginia'
    elif any(state in dma_lower for state in ['west virginia', 'charleston']):
        return 'West Virginia'
    elif any(state in dma_lower for state in ['kentucky', 'louisville']):
        return 'Kentucky'
    elif any(state in dma_lower for state in ['indiana', 'indianapolis']):
        return 'Indiana'
    elif any(state in dma_lower for state in ['maine', 'portland']):
        return 'Maine'
    elif any(state in dma_lower for state in ['vermont', 'burlington']):
        return 'Vermont'
    elif any(state in dma_lower for state in ['new hampshire', 'manchester']):
        return 'New Hampshire'
    elif any(state in dma_lower for state in ['massachusetts', 'boston']):
        return 'Massachusetts'
    elif any(state in dma_lower for state in ['rhode island', 'providence']):
        return 'Rhode Island'
    elif any(state in dma_lower for state in ['connecticut', 'hartford']):
        return 'Connecticut'
    elif any(state in dma_lower for state in ['new jersey', 'newark']):
        return 'New Jersey'
    elif any(state in dma_lower for state in ['delaware', 'wilmington']):
        return 'Delaware'
    elif any(state in dma_lower for state in ['maryland', 'baltimore']):
        return 'Maryland'
    elif any(state in dma_lower for state in ['dc', 'washington']):
        return 'Washington DC'
    elif any(state in dma_lower for state in ['alaska', 'anchorage']):
        return 'Alaska'
    elif any(state in dma_lower for state in ['hawaii', 'honolulu']):
        return 'Hawaii'
    elif any(state in dma_lower for state in ['nevada', 'las vegas']):
        return 'Nevada'
    elif any(state in dma_lower for state in ['new mexico', 'albuquerque']):
        return 'New Mexico'
    elif any(state in dma_lower for state in ['wyoming', 'cheyenne']):
        return 'Wyoming'
    elif any(state in dma_lower for state in ['montana', 'billings']):
        return 'Montana'
    elif any(state in dma_lower for state in ['north dakota', 'fargo']):
        return 'North Dakota'
    elif any(state in dma_lower for state in ['south dakota', 'sioux falls']):
        return 'South Dakota'
    elif any(state in dma_lower for state in ['nebraska', 'omaha']):
        return 'Nebraska'
    else:
        return 'Other'

interactive_data['Region'] = interactive_data['DMA'].apply(categorize_region)

# Guardar archivos
dma_analysis.to_csv('metodologia_dma_analysis.csv', index=False)
interactive_data.to_csv('interactive_table_data.csv', index=False)

print("Archivos guardados:")
print("• metodologia_dma_analysis.csv - Análisis por DMA con metodología")
print("• interactive_table_data.csv - Datos completos para tabla interactiva")

print(f"\nRESUMEN DE METODOLOGÍA:")
print(f"• Benchmark nacional calculado: {national_benchmark:.2f}%")
print(f"• {len(dma_analysis)} ciudades analizadas")
print(f"• {len(interactive_data)} ZIP codes con índices calculados")
print(f"• Metodología de índices: (Porcentaje Local / Benchmark Nacional) × 100")

