// CSV Loader para cargar datos reales directamente en el dashboard
class CSVDataLoader {
    constructor() {
        this.data = [];
        this.nationalBenchmark = 0;
        this.isLoaded = false;
    }

    async loadCSVData() {
        try {
            console.log('🔄 Cargando datos reales del CSV...');
            
            // Cargar el archivo CSV
            const response = await fetch('data/Female _GenZ_Populations.csv');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const csvText = await response.text();
            console.log('✅ CSV cargado, procesando...');
            console.log(`📄 Tamaño del CSV: ${csvText.length} caracteres`);
            
            // Parsear CSV
            const lines = csvText.split('\n');
            const headers = lines[0].split(',');
            
            console.log(`📊 Total de líneas: ${lines.length}`);
            console.log('📊 Headers encontrados:', headers);
            
            // Procesar cada línea
            this.data = [];
            let processedLines = 0;
            let validLines = 0;
            let skippedLines = 0;
            
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim()) {
                    processedLines++;
                    const values = this.parseCSVLine(lines[i]);
                    if (values.length >= 8) {
                        const row = {
                            dma: values[0].trim().replace(/"/g, '').replace(/\s+/g, ' '),
                            zip: values[1].trim(),
                            totalPopulation: parseInt(values[2]) || 0,
                            age15_19: parseInt(values[3]) || 0,
                            age20_24: parseInt(values[4]) || 0,
                            age25_29: parseInt(values[5]) || 0,
                            totalGenZ: parseInt(values[6]) || 0,
                            genZPercentage: parseFloat(values[7]) || 0
                        };
                        
                        // Incluir todos los registros, incluso con población 0
                        this.data.push(row);
                        validLines++;
                        
                        // Solo contar como saltados los que no tienen datos válidos
                        if (row.totalPopulation === 0 && row.totalGenZ === 0) {
                            skippedLines++;
                        }
                    } else {
                        skippedLines++;
                    }
                }
                
                // Mostrar progreso cada 1000 filas
                if (i % 1000 === 0) {
                    const uniqueCitiesSoFar = [...new Set(this.data.map(row => row.dma))].length;
                    console.log(`📦 Procesadas ${i} filas... (${this.data.length} válidas, ${uniqueCitiesSoFar} ciudades únicas)`);
                }
            }
            
            console.log(`📊 Resumen del procesamiento:`);
            console.log(`   - Líneas procesadas: ${processedLines}`);
            console.log(`   - Líneas válidas: ${validLines}`);
            console.log(`   - Líneas saltadas: ${skippedLines}`);
            console.log(`   - Total registros: ${this.data.length}`);
            
            console.log(`✅ Procesadas ${this.data.length} filas válidas`);
            console.log(`📊 Líneas procesadas: ${processedLines}, válidas: ${validLines}, saltadas: ${skippedLines}`);
            
            console.log(`📊 Registros procesados: ${this.data.length}`);
            console.log(`🏙️ DMAs únicas en datos: ${[...new Set(this.data.map(row => row.dma))].length}`);
            
            // Calcular benchmark nacional
            this.calculateNationalBenchmark();
            
            // Procesar datos para el dashboard
            this.processDataForDashboard();
            
            this.isLoaded = true;
            console.log('🎉 Datos reales cargados exitosamente!');
            
            return true;
            
        } catch (error) {
            console.error('❌ Error cargando CSV:', error);
            return false;
        }
    }

    parseCSVLine(line) {
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                // Clean and trim the value
                const cleanValue = current.trim().replace(/"/g, '');
                values.push(cleanValue);
                current = '';
            } else {
                current += char;
            }
        }
        
        // Add the last value
        const cleanValue = current.trim().replace(/"/g, '');
        values.push(cleanValue);
        
        return values;
    }

    calculateNationalBenchmark() {
        const totalPopulation = this.data.reduce((sum, row) => sum + row.totalPopulation, 0);
        const totalGenZ = this.data.reduce((sum, row) => sum + row.totalGenZ, 0);
        
        this.nationalBenchmark = (totalGenZ / totalPopulation) * 100;
        
        console.log(`📈 Benchmark Nacional: ${this.nationalBenchmark.toFixed(2)}%`);
        console.log(`👥 Población Total: ${totalPopulation.toLocaleString()}`);
        console.log(`👩 Gen Z Females: ${totalGenZ.toLocaleString()}`);
    }

    processDataForDashboard() {
        console.log('🔄 Procesando datos para dashboard...');
        
        // Mapear regiones
        const regionMap = {
            'california': 'West Coast',
            'los angeles': 'West Coast',
            'san francisco': 'West Coast',
            'san diego': 'West Coast',
            'san jose': 'West Coast',
            'seattle': 'West Coast',
            'texas': 'Texas',
            'houston': 'Texas',
            'dallas': 'Texas',
            'san antonio': 'Texas',
            'austin': 'Texas',
            'fort worth': 'Texas',
            'florida': 'Florida',
            'miami': 'Florida',
            'tampa': 'Florida',
            'orlando': 'Florida',
            'jacksonville': 'Florida',
            'new york': 'Northeast',
            'washington': 'Northeast',
            'boston': 'Northeast',
            'philadelphia': 'Northeast',
            'chicago': 'Midwest',
            'detroit': 'Midwest',
            'minneapolis': 'Midwest',
            'milwaukee': 'Midwest',
            'atlanta': 'Southeast',
            'charlotte': 'Southeast',
            'nashville': 'Southeast',
            'birmingham': 'Southeast',
            'denver': 'Mountain West',
            'phoenix': 'Mountain West',
            'salt lake': 'Mountain West',
            'las vegas': 'Mountain West'
        };

        // Convertir datos al formato del dashboard
        this.dashboardData = this.data.map(row => {
            // Calcular índice
            const index = (row.genZPercentage / this.nationalBenchmark) * 100;
            
            // Log para debugging (solo las primeras 10 ciudades)
            if (this.data.indexOf(row) < 10) {
                console.log(`🏙️ Procesando ciudad: "${row.dma}"`);
            }
            
            // Determinar región
            let region = 'Unknown';
            const dmaLower = row.dma.toLowerCase();
            for (const [key, value] of Object.entries(regionMap)) {
                if (dmaLower.includes(key)) {
                    region = value;
                    break;
                }
            }
            
            // Calcular distribución de edades
            const totalGenZ = row.totalGenZ;
            const age15_19_pct = totalGenZ > 0 ? (row.age15_19 / totalGenZ) * 100 : 0;
            const age20_24_pct = totalGenZ > 0 ? (row.age20_24 / totalGenZ) * 100 : 0;
            const age25_29_pct = totalGenZ > 0 ? (row.age25_29 / totalGenZ) * 100 : 0;
            
            return {
                dma: row.dma,
                zip: row.zip,
                region: region,
                population: row.totalPopulation,
                genZFemales: row.totalGenZ,
                concentration: row.genZPercentage,
                index: Math.round(index * 10) / 10,
                age15_19: Math.round(age15_19_pct * 10) / 10,
                age20_24: Math.round(age20_24_pct * 10) / 10,
                age25_29: Math.round(age25_29_pct * 10) / 10
            };
        });
        
        console.log(`✅ ${this.dashboardData.length} registros procesados para dashboard`);
        
        // Mostrar estadísticas de ciudades únicas
        const uniqueCities = [...new Set(this.dashboardData.map(row => row.dma))];
        console.log(`🏙️ Total ciudades únicas: ${uniqueCities.length}`);
        console.log(`🏙️ Primeras 10 ciudades: ${uniqueCities.slice(0, 10).join(', ')}`);
        console.log(`🏙️ Últimas 10 ciudades: ${uniqueCities.slice(-10).join(', ')}`);
    }

    getDashboardData() {
        return this.dashboardData || [];
    }

    getNationalBenchmark() {
        return this.nationalBenchmark;
    }

    getUniqueCities() {
        const cities = [...new Set(this.dashboardData.map(row => row.dma))];
        return cities.sort();
    }

    getUniqueRegions() {
        const regions = [...new Set(this.dashboardData.map(row => row.region))];
        return regions.sort();
    }
}

// Crear instancia global
window.csvLoader = new CSVDataLoader();
