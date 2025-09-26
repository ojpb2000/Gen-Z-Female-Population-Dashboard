// Main JavaScript for Gen Z Dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard
    initializeDashboard();
});

function initializeDashboard() {
    // Set up tab navigation
    setupTabNavigation();
    
    // Initialize charts
    initializeCharts();
    
    // Add loading states
    addLoadingStates();
}

function setupTabNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all links and tabs
            navLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked link and corresponding tab
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Initialize charts for the active tab
            setTimeout(() => {
                initializeCharts();
            }, 100);
        });
    });
}

function initializeCharts() {
    // Only initialize charts if they exist and haven't been initialized
    if (document.getElementById('nationalChart') && !window.nationalChartInitialized) {
        createNationalChart();
        window.nationalChartInitialized = true;
    }
    
    if (document.getElementById('citiesChart') && !window.citiesChartInitialized) {
        createCitiesChart();
        window.citiesChartInitialized = true;
    }
    
    if (document.getElementById('scatterChart') && !window.scatterChartInitialized) {
        createScatterChart();
        window.scatterChartInitialized = true;
    }
    
    // New charts for other tabs
    if (document.getElementById('championsChart') && !window.championsChartInitialized) {
        createChampionsChart();
        window.championsChartInitialized = true;
    }
    
    if (document.getElementById('opportunityMatrix') && !window.opportunityMatrixInitialized) {
        createOpportunityMatrix();
        window.opportunityMatrixInitialized = true;
    }
    
    if (document.getElementById('universityComparison') && !window.universityComparisonInitialized) {
        createUniversityComparison();
        window.universityComparisonInitialized = true;
    }
    
    if (document.getElementById('ageDistributionChart') && !window.ageDistributionChartInitialized) {
        createAgeDistributionChart();
        window.ageDistributionChartInitialized = true;
    }
    
    if (document.getElementById('ageCorrelationChart') && !window.ageCorrelationChartInitialized) {
        createAgeCorrelationChart();
        window.ageCorrelationChartInitialized = true;
    }
    
    if (document.getElementById('regionalAgeChart') && !window.regionalAgeChartInitialized) {
        createRegionalAgeChart();
        window.regionalAgeChartInitialized = true;
    }
    
    if (document.getElementById('youngestMarketsChart') && !window.youngestMarketsChartInitialized) {
        createYoungestMarketsChart();
        window.youngestMarketsChartInitialized = true;
    }
    
    if (document.getElementById('oldestMarketsChart') && !window.oldestMarketsChartInitialized) {
        createOldestMarketsChart();
        window.oldestMarketsChartInitialized = true;
    }
    
    // Initialize data explorer only once
    console.log('🔍 Verificando elemento dataTable...');
    const dataTableElement = document.getElementById('dataTable');
    console.log('📊 Elemento dataTable encontrado:', !!dataTableElement);
    console.log('🔧 DataExplorer ya inicializado:', !!window.dataExplorerInitialized);
    
    if (dataTableElement && !window.dataExplorerInitialized) {
        console.log('✅ Iniciando DataExplorer...');
        initializeDataExplorer();
        window.dataExplorerInitialized = true;
    } else if (window.dataExplorerInitialized) {
        console.log('ℹ️ DataExplorer ya inicializado, saltando...');
    } else {
        console.log('❌ No se puede inicializar DataExplorer - elemento no encontrado');
    }
    
    // Initialize National Landscape after data is loaded
    setTimeout(() => {
        if (!window.nationalLandscapeInitialized && currentData && currentData.length > 0) {
            console.log('✅ Iniciando National Landscape...');
            initializeNationalLandscape();
            window.nationalLandscapeInitialized = true;
        }
    }, 1500);
    
    // Initialize Concentration Champions after data is loaded
    setTimeout(() => {
        if (!window.concentrationChampionsInitialized && currentData && currentData.length > 0) {
            console.log('✅ Iniciando Concentration Champions...');
            initializeConcentrationChampions();
            window.concentrationChampionsInitialized = true;
        }
    }, 1500);
    
    // Cultural patterns charts
    if (document.getElementById('universityPatternsChart') && !window.universityPatternsChartInitialized) {
        createUniversityPatternsChart();
        window.universityPatternsChartInitialized = true;
    }
    
    if (document.getElementById('regionalPatternsChart') && !window.regionalPatternsChartInitialized) {
        createRegionalPatternsChart();
        window.regionalPatternsChartInitialized = true;
    }
    
    if (document.getElementById('ageCulturalChart') && !window.ageCulturalChartInitialized) {
        createAgeCulturalChart();
        window.ageCulturalChartInitialized = true;
    }
    
    if (document.getElementById('marketSizeCulturalChart') && !window.marketSizeCulturalChartInitialized) {
        createMarketSizeCulturalChart();
        window.marketSizeCulturalChartInitialized = true;
    }
}

function createNationalChart() {
    const ctx = document.getElementById('nationalChart').getContext('2d');
    
    // Calcular datos reales
    const nationalData = calculateNationalData();
    
    if (!nationalData || !currentData || currentData.length === 0) {
        console.log('❌ No hay datos disponibles para National Chart');
        return;
    }
    
    // Destruir gráfico existente si existe
    if (window.nationalChartInstance) {
        window.nationalChartInstance.destroy();
    }
    
    window.nationalChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Gen Z Females', 'Other Population'],
            datasets: [{
                data: [nationalData.totalGenZ, nationalData.otherPopulation],
                backgroundColor: [
                    '#B19CD9',
                    '#E6E6FA'
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ${Math.round(value).toLocaleString()} (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 2000
            }
        }
    });
    
    console.log('✅ National Chart actualizado con datos reales');
}

function createCitiesChart() {
    const ctx = document.getElementById('citiesChart').getContext('2d');
    
    // Calcular datos reales
    const citiesData = calculateTopCitiesData(10);
    
    if (!citiesData || citiesData.length === 0 || !currentData || currentData.length === 0) {
        console.log('❌ No hay datos disponibles para Cities Chart');
        return;
    }
    
    // Destruir gráfico existente si existe
    if (window.citiesChartInstance) {
        window.citiesChartInstance.destroy();
    }
    
    window.citiesChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: citiesData.map(city => city.name),
            datasets: [{
                label: 'Gen Z %',
                data: citiesData.map(city => city.percentage),
                backgroundColor: 'rgba(177, 156, 217, 0.8)',
                borderColor: '#B19CD9',
                borderWidth: 2,
                borderRadius: 4,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            const city = citiesData[context.dataIndex];
                            return `Index: ${city.index}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: Math.max(...citiesData.map(c => c.percentage)) * 1.1,
                    grid: {
                        color: '#E6E6FA'
                    },
                    ticks: {
                        font: {
                            family: 'Inter'
                        }
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        font: {
                            family: 'Inter',
                            size: 10
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
    
    console.log('✅ Cities Chart actualizado con datos reales');
}

function createScatterChart() {
    const ctx = document.getElementById('scatterChart').getContext('2d');
    
    // Calcular datos reales
    const scatterData = calculateScatterData(15);
    
    if (!scatterData || scatterData.length === 0 || !currentData || currentData.length === 0) {
        console.log('❌ No hay datos disponibles para Scatter Chart');
        return;
    }
    
    // Destruir gráfico existente si existe
    if (window.scatterChartInstance) {
        window.scatterChartInstance.destroy();
    }
    
    window.scatterChartInstance = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Cities',
                data: scatterData,
                backgroundColor: 'rgba(177, 156, 217, 0.6)',
                borderColor: '#B19CD9',
                borderWidth: 2,
                pointRadius: 8,
                pointHoverRadius: 12
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            return context[0].raw.label;
                        },
                        label: function(context) {
                            return [
                                `Population: ${Math.round(context.raw.x).toLocaleString()}`,
                                `Gen Z %: ${context.raw.y}%`,
                                `Index: ${context.raw.index}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'logarithmic',
                    title: {
                        display: true,
                        text: 'Population (Log Scale)',
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    },
                    grid: {
                        color: '#E6E6FA'
                    },
                    ticks: {
                        font: {
                            family: 'Inter'
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Gen Z Concentration (%)',
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    },
                    grid: {
                        color: '#E6E6FA'
                    },
                    ticks: {
                        font: {
                            family: 'Inter'
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
    
    console.log('✅ Scatter Chart actualizado con datos reales');
}

function addLoadingStates() {
    // Add loading animation to charts
    const chartContainers = document.querySelectorAll('.chart-container');
    
    chartContainers.forEach(container => {
        const canvas = container.querySelector('canvas');
        if (canvas) {
            canvas.style.opacity = '0';
            setTimeout(() => {
                canvas.style.transition = 'opacity 0.5s ease';
                canvas.style.opacity = '1';
            }, 500);
        }
    });
}

// Utility functions
function formatNumber(num) {
    return new Intl.NumberFormat().format(num);
}

function formatPercentage(num) {
    return `${num.toFixed(2)}%`;
}

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add keyboard navigation for tabs
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeTab = document.querySelector('.nav-link.active');
        const navLinks = Array.from(document.querySelectorAll('.nav-link'));
        const currentIndex = navLinks.indexOf(activeTab);
        
        let nextIndex;
        if (e.key === 'ArrowLeft') {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : navLinks.length - 1;
        } else {
            nextIndex = currentIndex < navLinks.length - 1 ? currentIndex + 1 : 0;
        }
        
        navLinks[nextIndex].click();
    }
});

// Add resize handler for responsive charts
window.addEventListener('resize', function() {
    // Reinitialize charts on resize
    setTimeout(() => {
        if (window.nationalChartInitialized) {
            Chart.helpers.each(Chart.instances, function(instance) {
                instance.resize();
            });
        }
    }, 100);
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.querySelectorAll('.card, .kpi-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===== NEW CHART FUNCTIONS =====

function createChampionsChart() {
    const ctx = document.getElementById('championsChart').getContext('2d');
    
    // Calcular datos reales
    const championsData = calculateTopCitiesData(15);
    
    if (!championsData || championsData.length === 0 || !currentData || currentData.length === 0) {
        console.log('❌ No hay datos disponibles para Champions Chart');
        return;
    }
    
    // Destruir gráfico existente si existe
    if (window.championsChartInstance) {
        window.championsChartInstance.destroy();
    }
    
    window.championsChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: championsData.map(city => city.name),
            datasets: [{
                label: 'Index',
                data: championsData.map(city => city.index),
                backgroundColor: 'rgba(177, 156, 217, 0.8)',
                borderColor: '#B19CD9',
                borderWidth: 2,
                borderRadius: 4,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            const city = championsData[context.dataIndex];
                            return `Concentration: ${city.percentage}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 160,
                    grid: {
                        color: '#E6E6FA'
                    },
                    ticks: {
                        font: {
                            family: 'Inter'
                        }
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        font: {
                            family: 'Inter',
                            size: 10
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
    
    console.log('✅ Champions Chart actualizado con datos reales');
}

function createOpportunityMatrix() {
    const ctx = document.getElementById('opportunityMatrix').getContext('2d');
    
    const matrixData = [
        { x: 328087, y: 15.01, label: 'Gainesville', category: 'Very High' },
        { x: 1184360, y: 12.40, label: 'Waco-Temple-Bryan', category: 'High' },
        { x: 109697, y: 12.39, label: 'Mankato', category: 'High' },
        { x: 444441, y: 11.97, label: 'Idaho Falls-Pocatello', category: 'High' },
        { x: 286005, y: 11.95, label: 'Laredo', category: 'High' },
        { x: 208199, y: 11.92, label: 'Charlottesville', category: 'High' },
        { x: 472532, y: 11.79, label: 'Lubbock', category: 'High' },
        { x: 120544, y: 11.75, label: 'Lafayette, IN', category: 'High' },
        { x: 757429, y: 11.69, label: 'Tallahassee-Thomasville', category: 'High' },
        { x: 256443, y: 11.67, label: 'Harrisonburg', category: 'High' }
    ];
    
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'High Potential Markets',
                data: matrixData,
                backgroundColor: 'rgba(177, 156, 217, 0.6)',
                borderColor: '#B19CD9',
                borderWidth: 2,
                pointRadius: 8,
                pointHoverRadius: 12
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            return context[0].raw.label;
                        },
                        label: function(context) {
                            return [
                                `Population: ${Math.round(context.raw.x).toLocaleString()}`,
                                `Concentration: ${context.raw.y}%`,
                                `Category: ${context.raw.category}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'logarithmic',
                    title: {
                        display: true,
                        text: 'Population (Log Scale)',
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    },
                    grid: {
                        color: '#E6E6FA'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Gen Z Concentration (%)',
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    },
                    grid: {
                        color: '#E6E6FA'
                    }
                }
            }
        }
    });
}

function createUniversityComparison() {
    const ctx = document.getElementById('universityComparison').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['University Cities', 'Non-University Cities'],
            datasets: [{
                label: 'Average Index',
                data: [115.2, 98.7],
                backgroundColor: ['#B19CD9', '#E6E6FA'],
                borderColor: ['#9370DB', '#B19CD9'],
                borderWidth: 2,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 120,
                    grid: {
                        color: '#E6E6FA'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function createAgeDistributionChart() {
    const ctx = document.getElementById('ageDistributionChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Age 15-19', 'Age 20-24', 'Age 25-29'],
            datasets: [{
                data: [32.6, 34.5, 32.9],
                backgroundColor: ['#B19CD9', '#9370DB', '#DDA0DD'],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

function createAgeCorrelationChart() {
    const ctx = document.getElementById('ageCorrelationChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Age 15-19', 'Age 20-24', 'Age 25-29'],
            datasets: [{
                label: 'Correlation with Gen Z Index',
                data: [-0.306, 0.622, -0.363],
                backgroundColor: ['#E6E6FA', '#B19CD9', '#E6E6FA'],
                borderColor: ['#B19CD9', '#9370DB', '#B19CD9'],
                borderWidth: 2,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    min: -0.5,
                    max: 0.7,
                    grid: {
                        color: '#E6E6FA'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function createRegionalAgeChart() {
    const ctx = document.getElementById('regionalAgeChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['West Coast', 'Texas', 'Florida', 'New York', 'Mountain West', 'Southeast'],
            datasets: [{
                label: 'Age 15-19',
                data: [30.0, 33.1, 32.3, 31.7, 33.8, 33.0],
                backgroundColor: '#B19CD9'
            }, {
                label: 'Age 20-24',
                data: [34.3, 33.6, 34.0, 34.5, 40.3, 36.0],
                backgroundColor: '#9370DB'
            }, {
                label: 'Age 25-29',
                data: [35.7, 33.4, 33.7, 33.9, 26.0, 31.0],
                backgroundColor: '#DDA0DD'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                x: {
                    stacked: false,
                    grid: {
                        display: false
                    }
                },
                y: {
                    stacked: false,
                    grid: {
                        color: '#E6E6FA'
                    }
                }
            }
        }
    });
}

function createYoungestMarketsChart() {
    const ctx = document.getElementById('youngestMarketsChart').getContext('2d');
    
    const youngestData = [
        { name: 'Helena', percentage: 40.2 },
        { name: 'Twin Falls', percentage: 38.5 },
        { name: 'North Platte', percentage: 38.3 },
        { name: 'Glendive', percentage: 38.2 },
        { name: 'Sioux City', percentage: 37.7 },
        { name: 'Greenwood-Greenville', percentage: 37.4 },
        { name: 'Casper-Riverton', percentage: 36.9 },
        { name: 'Meridian', percentage: 36.8 },
        { name: 'Harlingen-Wslco-Brnsvl-Mca', percentage: 36.7 },
        { name: 'Alpena', percentage: 36.6 }
    ];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: youngestData.map(city => city.name),
            datasets: [{
                label: 'Age 15-19 %',
                data: youngestData.map(city => city.percentage),
                backgroundColor: 'rgba(177, 156, 217, 0.8)',
                borderColor: '#B19CD9',
                borderWidth: 2,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 42,
                    grid: {
                        color: '#E6E6FA'
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        font: {
                            size: 10
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function createOldestMarketsChart() {
    const ctx = document.getElementById('oldestMarketsChart').getContext('2d');
    
    const oldestData = [
        { name: 'Seattle-Tacoma', percentage: 36.7 },
        { name: 'Fairbanks', percentage: 36.4 },
        { name: 'New York', percentage: 36.3 },
        { name: 'San Francisco-Oak-San Jose', percentage: 36.2 },
        { name: 'San Diego', percentage: 35.9 },
        { name: 'Washington, DC', percentage: 35.8 },
        { name: 'Portland, OR', percentage: 35.7 },
        { name: 'Nashville', percentage: 35.3 },
        { name: 'Las Vegas', percentage: 35.2 },
        { name: 'Chicago', percentage: 35.2 }
    ];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: oldestData.map(city => city.name),
            datasets: [{
                label: 'Age 25-29 %',
                data: oldestData.map(city => city.percentage),
                backgroundColor: 'rgba(147, 112, 219, 0.8)',
                borderColor: '#9370DB',
                borderWidth: 2,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 38,
                    grid: {
                        color: '#E6E6FA'
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        font: {
                            size: 10
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// ===== DATA EXPLORER FUNCTIONS =====

// Global variables for data explorer
let currentData = [];
let filteredData = [];
let summaryData = [];
let currentPage = 1;
let pageSize = 50;
let summaryCurrentPage = 1;
let summaryPageSize = 25;
let sortColumn = 0;
let sortDirection = 'desc';
let summarySortColumn = 4; // Index column
let summarySortDirection = 'desc';
let realDataLoaded = false;

// ===== CHART DATA CALCULATION FUNCTIONS =====

function calculateNationalData() {
    if (!currentData || currentData.length === 0) return null;
    
    const totalPopulation = currentData.reduce((sum, item) => sum + item.population, 0);
    const totalGenZ = currentData.reduce((sum, item) => sum + item.genZFemales, 0);
    const otherPopulation = totalPopulation - totalGenZ;
    
    return {
        totalPopulation,
        totalGenZ,
        otherPopulation,
        genZPercentage: totalPopulation > 0 ? (totalGenZ / totalPopulation) * 100 : 0
    };
}

function calculateTopCitiesData(limit = 15) {
    if (!currentData || currentData.length === 0) return [];
    
    // Agrupar por DMA y calcular promedios
    const dmaGroups = {};
    currentData.forEach(item => {
        if (!dmaGroups[item.dma]) {
            dmaGroups[item.dma] = {
                dma: item.dma,
                totalPopulation: 0,
                totalGenZ: 0
            };
        }
        dmaGroups[item.dma].totalPopulation += item.population;
        dmaGroups[item.dma].totalGenZ += item.genZFemales;
    });
    
    // Calcular métricas para cada ciudad
    const dmaData = Object.values(dmaGroups).map(dma => {
        const concentration = dma.totalPopulation > 0 ? (dma.totalGenZ / dma.totalPopulation) * 100 : 0;
        const nationalBenchmark = 8.413184286613799; // Benchmark correcto del CSV (en porcentaje)
        const index = (concentration / nationalBenchmark) * 100; // Corregido: no multiplicar por 100 dos veces
        
        return {
            name: dma.dma,
            percentage: Math.round(concentration * 100) / 100,
            index: Math.round(index * 10) / 10,
            population: dma.totalPopulation,
            genZ: dma.totalGenZ
        };
    });
    
    // Ordenar por índice descendente y tomar los top
    return dmaData.sort((a, b) => b.index - a.index).slice(0, limit);
}

function calculateScatterData(limit = 20) {
    if (!currentData || currentData.length === 0) return [];
    
    const topCities = calculateTopCitiesData(limit);
    return topCities.map(city => ({
        x: city.population,
        y: city.percentage,
        label: city.name,
        index: city.index
    }));
}

function calculateAgeDistributionData() {
    if (!currentData || currentData.length === 0) return null;
    
    const totalAge15_19 = currentData.reduce((sum, item) => sum + (item.genZFemales * item.age15_19 / 100), 0);
    const totalAge20_24 = currentData.reduce((sum, item) => sum + (item.genZFemales * item.age20_24 / 100), 0);
    const totalAge25_29 = currentData.reduce((sum, item) => sum + (item.genZFemales * item.age25_29 / 100), 0);
    const totalGenZ = totalAge15_19 + totalAge20_24 + totalAge25_29;
    
    return {
        age15_19: totalGenZ > 0 ? Math.round((totalAge15_19 / totalGenZ) * 100 * 10) / 10 : 0,
        age20_24: totalGenZ > 0 ? Math.round((totalAge20_24 / totalGenZ) * 100 * 10) / 10 : 0,
        age25_29: totalGenZ > 0 ? Math.round((totalAge25_29 / totalGenZ) * 100 * 10) / 10 : 0
    };
}

function refreshAllCharts() {
    console.log('🔄 Refrescando todos los gráficos con datos reales...');
    
    // Refrescar gráficos principales
    if (document.getElementById('nationalChart')) {
        createNationalChart();
    }
    
    if (document.getElementById('citiesChart')) {
        createCitiesChart();
    }
    
    if (document.getElementById('scatterChart')) {
        createScatterChart();
    }
    
    // Refrescar otros gráficos si existen
    if (document.getElementById('championsChart')) {
        createChampionsChart();
    }
    
    if (document.getElementById('opportunityMatrix')) {
        createOpportunityMatrix();
    }
    
    console.log('✅ Todos los gráficos actualizados con datos reales');
}


async function initializeDataExplorer() {
    console.log('🚀 Inicializando Data Explorer...');
    
    // Populate top ZIP codes table
    populateTopZipCodesTable();
    
    // Try to load real data first
    console.log('🔄 Intentando cargar datos reales...');
    const realDataSuccess = await loadRealData();
    
    if (realDataSuccess) {
        console.log('✅ Datos reales cargados exitosamente');
        realDataLoaded = true;
        
        // Refrescar todos los gráficos con datos reales después de un pequeño delay
        setTimeout(() => {
            refreshAllCharts();
        }, 100);
    } else {
        console.log('⚠️ Falló carga de datos reales, usando datos de muestra');
        generateSampleData();
    }
    
    // Set up filters AFTER data is loaded
    setupDataExplorerFilters();
    
    // Populate DMA filter dropdown
    populateDMAFilter();
    
    // Apply initial filters and populate table
    applyFilters();
}

async function loadRealData() {
    try {
        console.log('🔄 Iniciando carga de datos reales...');
        
        // Load CSV data
        const success = await window.csvLoader.loadCSVData();
        console.log(`📊 Resultado de carga CSV: ${success}`);
        
        if (success) {
            // Get processed data
            currentData = window.csvLoader.getDashboardData();
            filteredData = [...currentData];
            
            console.log(`📊 Datos cargados: ${currentData.length} registros`);
            console.log(`🏙️ Ciudades únicas en datos: ${[...new Set(currentData.map(item => item.dma))].length}`);
            
    // Update national benchmark display
    const benchmark = window.csvLoader.getNationalBenchmark();
    console.log(`📈 Benchmark Nacional: ${benchmark.toFixed(2)}%`);
            
            return true;
        }
        
        console.log('❌ Falló la carga de datos CSV');
        return false;
    } catch (error) {
        console.error('❌ Error cargando datos reales:', error);
        return false;
    }
}

function populateTopZipCodesTable() {
    const topZipCodes = [
        { rank: 1, city: 'Los Angeles', zip: '90095', population: 4, genZ: 3, concentration: 0.75, index: 7.8 },
        { rank: 2, city: 'Pittsburgh', zip: '15260', population: 3, genZ: 2, concentration: 0.67, index: 6.9 },
        { rank: 3, city: 'Indianapolis', zip: '47306', population: 107, genZ: 71, concentration: 0.66, index: 6.9 },
        { rank: 4, city: 'Springfield-Holyoke', zip: '1063', population: 772, genZ: 502, concentration: 0.65, index: 6.8 },
        { rank: 5, city: 'Mobile-Pensacola', zip: '36688', population: 2010, genZ: 1294, concentration: 0.64, index: 6.7 },
        { rank: 6, city: 'Cedar Rapids', zip: '50614', population: 2694, genZ: 1695, concentration: 0.63, index: 6.6 },
        { rank: 7, city: 'Washington, DC', zip: '20059', population: 1893, genZ: 1174, concentration: 0.62, index: 6.5 },
        { rank: 8, city: 'Salt Lake City', zip: '84602', population: 4502, genZ: 2790, concentration: 0.62, index: 6.5 },
        { rank: 9, city: 'Greensboro', zip: '27412', population: 1912, genZ: 1181, concentration: 0.62, index: 6.4 },
        { rank: 10, city: 'Tallahassee-Thomasville', zip: '32307', population: 1045, genZ: 623, concentration: 0.60, index: 6.2 }
    ];
    
    const tbody = document.getElementById('topZipCodesBody');
    tbody.innerHTML = '';
    
    topZipCodes.forEach(item => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${item.rank}</td>
            <td>${item.city}</td>
            <td>${item.zip}</td>
            <td>${Math.round(item.population).toLocaleString()}</td>
            <td>${Math.round(item.genZ).toLocaleString()}</td>
            <td>${item.concentration.toFixed(2)}%</td>
            <td>${item.index.toFixed(1)}</td>
        `;
    });
}

function generateSampleData() {
    console.log('🔄 Generando datos de muestra...');
    
    // Generate sample data starting with New York ZIP codes
    const newYorkZips = [
        { dma: 'New York', zip: '10001', region: 'New York', population: 21102, genZFemales: 2034, concentration: 0.096, index: 100.0, age15_19: 32.1, age20_24: 35.2, age25_29: 32.7 },
        { dma: 'New York', zip: '10002', region: 'New York', population: 45678, genZFemales: 5234, concentration: 0.115, index: 119.7, age15_19: 28.9, age20_24: 38.1, age25_29: 33.0 },
        { dma: 'New York', zip: '10003', region: 'New York', population: 32145, genZFemales: 4123, concentration: 0.128, index: 133.2, age15_19: 25.4, age20_24: 42.3, age25_29: 32.3 },
        { dma: 'New York', zip: '10004', region: 'New York', population: 1234, genZFemales: 89, concentration: 0.072, index: 74.9, age15_19: 35.2, age20_24: 28.1, age25_29: 36.7 },
        { dma: 'New York', zip: '10005', region: 'New York', population: 2345, genZFemales: 156, concentration: 0.066, index: 68.7, age15_19: 38.5, age20_24: 25.6, age25_29: 35.9 },
        { dma: 'New York', zip: '10006', region: 'New York', population: 3456, genZFemales: 234, concentration: 0.068, index: 70.8, age15_19: 36.8, age20_24: 27.4, age25_29: 35.8 },
        { dma: 'New York', zip: '10007', region: 'New York', population: 4567, genZFemales: 345, concentration: 0.076, index: 79.1, age15_19: 33.9, age20_24: 30.1, age25_29: 36.0 },
        { dma: 'New York', zip: '10009', region: 'New York', population: 23456, genZFemales: 3456, concentration: 0.147, index: 153.0, age15_19: 22.1, age20_24: 45.2, age25_29: 32.7 },
        { dma: 'New York', zip: '10010', region: 'New York', population: 34567, genZFemales: 4567, concentration: 0.132, index: 137.4, age15_19: 24.8, age20_24: 43.1, age25_29: 32.1 },
        { dma: 'New York', zip: '10011', region: 'New York', population: 45678, genZFemales: 5678, concentration: 0.124, index: 129.1, age15_19: 26.3, age20_24: 41.8, age25_29: 31.9 },
        { dma: 'New York', zip: '10012', region: 'New York', population: 12345, genZFemales: 1234, concentration: 0.100, index: 104.1, age15_19: 30.2, age20_24: 36.8, age25_29: 33.0 },
        { dma: 'New York', zip: '10013', region: 'New York', population: 23456, genZFemales: 2345, concentration: 0.100, index: 104.1, age15_19: 30.1, age20_24: 36.9, age25_29: 33.0 },
        { dma: 'New York', zip: '10014', region: 'New York', population: 34567, genZFemales: 3456, concentration: 0.100, index: 104.1, age15_19: 30.0, age20_24: 37.0, age25_29: 33.0 },
        { dma: 'New York', zip: '10016', region: 'New York', population: 45678, genZFemales: 4567, concentration: 0.100, index: 104.1, age15_19: 29.9, age20_24: 37.1, age25_29: 33.0 },
        { dma: 'New York', zip: '10017', region: 'New York', population: 56789, genZFemales: 5678, concentration: 0.100, index: 104.1, age15_19: 29.8, age20_24: 37.2, age25_29: 33.0 },
        { dma: 'New York', zip: '10018', region: 'New York', population: 67890, genZFemales: 6789, concentration: 0.100, index: 104.1, age15_19: 29.7, age20_24: 37.3, age25_29: 33.0 },
        { dma: 'New York', zip: '10019', region: 'New York', population: 78901, genZFemales: 7890, concentration: 0.100, index: 104.1, age15_19: 29.6, age20_24: 37.4, age25_29: 33.0 },
        { dma: 'New York', zip: '10020', region: 'New York', population: 89012, genZFemales: 8901, concentration: 0.100, index: 104.1, age15_19: 29.5, age20_24: 37.5, age25_29: 33.0 },
        { dma: 'New York', zip: '10021', region: 'New York', population: 90123, genZFemales: 9012, concentration: 0.100, index: 104.1, age15_19: 29.4, age20_24: 37.6, age25_29: 33.0 },
        { dma: 'New York', zip: '10022', region: 'New York', population: 101234, genZFemales: 10123, concentration: 0.100, index: 104.1, age15_19: 29.3, age20_24: 37.7, age25_29: 33.0 },
        { dma: 'New York', zip: '10023', region: 'New York', population: 112345, genZFemales: 11234, concentration: 0.100, index: 104.1, age15_19: 29.2, age20_24: 37.8, age25_29: 33.0 },
        { dma: 'New York', zip: '10024', region: 'New York', population: 123456, genZFemales: 12345, concentration: 0.100, index: 104.1, age15_19: 29.1, age20_24: 37.9, age25_29: 33.0 },
        { dma: 'New York', zip: '10025', region: 'New York', population: 134567, genZFemales: 13456, concentration: 0.100, index: 104.1, age15_19: 29.0, age20_24: 38.0, age25_29: 33.0 },
        { dma: 'New York', zip: '10026', region: 'New York', population: 145678, genZFemales: 14567, concentration: 0.100, index: 104.1, age15_19: 28.9, age20_24: 38.1, age25_29: 33.0 },
        { dma: 'New York', zip: '10027', region: 'New York', population: 156789, genZFemales: 15678, concentration: 0.100, index: 104.1, age15_19: 28.8, age20_24: 38.2, age25_29: 33.0 },
        { dma: 'New York', zip: '10028', region: 'New York', population: 167890, genZFemales: 16789, concentration: 0.100, index: 104.1, age15_19: 28.7, age20_24: 38.3, age25_29: 33.0 },
        { dma: 'New York', zip: '10029', region: 'New York', population: 178901, genZFemales: 17890, concentration: 0.100, index: 104.1, age15_19: 28.6, age20_24: 38.4, age25_29: 33.0 },
        { dma: 'New York', zip: '10030', region: 'New York', population: 189012, genZFemales: 18901, concentration: 0.100, index: 104.1, age15_19: 28.5, age20_24: 38.5, age25_29: 33.0 },
        { dma: 'New York', zip: '10031', region: 'New York', population: 190123, genZFemales: 19012, concentration: 0.100, index: 104.1, age15_19: 28.4, age20_24: 38.6, age25_29: 33.0 },
        { dma: 'New York', zip: '10032', region: 'New York', population: 201234, genZFemales: 20123, concentration: 0.100, index: 104.1, age15_19: 28.3, age20_24: 38.7, age25_29: 33.0 },
        { dma: 'New York', zip: '10033', region: 'New York', population: 212345, genZFemales: 21234, concentration: 0.100, index: 104.1, age15_19: 28.2, age20_24: 38.8, age25_29: 33.0 },
        { dma: 'New York', zip: '10034', region: 'New York', population: 223456, genZFemales: 22345, concentration: 0.100, index: 104.1, age15_19: 28.1, age20_24: 38.9, age25_29: 33.0 },
        { dma: 'New York', zip: '10035', region: 'New York', population: 234567, genZFemales: 23456, concentration: 0.100, index: 104.1, age15_19: 28.0, age20_24: 39.0, age25_29: 33.0 },
        { dma: 'New York', zip: '10036', region: 'New York', population: 245678, genZFemales: 24567, concentration: 0.100, index: 104.1, age15_19: 27.9, age20_24: 39.1, age25_29: 33.0 },
        { dma: 'New York', zip: '10037', region: 'New York', population: 256789, genZFemales: 25678, concentration: 0.100, index: 104.1, age15_19: 27.8, age20_24: 39.2, age25_29: 33.0 },
        { dma: 'New York', zip: '10038', region: 'New York', population: 267890, genZFemales: 26789, concentration: 0.100, index: 104.1, age15_19: 27.7, age20_24: 39.3, age25_29: 33.0 },
        { dma: 'New York', zip: '10039', region: 'New York', population: 278901, genZFemales: 27890, concentration: 0.100, index: 104.1, age15_19: 27.6, age20_24: 39.4, age25_29: 33.0 },
        { dma: 'New York', zip: '10040', region: 'New York', population: 289012, genZFemales: 28901, concentration: 0.100, index: 104.1, age15_19: 27.5, age20_24: 39.5, age25_29: 33.0 },
        { dma: 'New York', zip: '10041', region: 'New York', population: 290123, genZFemales: 29012, concentration: 0.100, index: 104.1, age15_19: 27.4, age20_24: 39.6, age25_29: 33.0 },
        { dma: 'New York', zip: '10044', region: 'New York', population: 301234, genZFemales: 30123, concentration: 0.100, index: 104.1, age15_19: 27.3, age20_24: 39.7, age25_29: 33.0 },
        { dma: 'New York', zip: '10045', region: 'New York', population: 312345, genZFemales: 31234, concentration: 0.100, index: 104.1, age15_19: 27.2, age20_24: 39.8, age25_29: 33.0 },
        { dma: 'New York', zip: '10055', region: 'New York', population: 323456, genZFemales: 32345, concentration: 0.100, index: 104.1, age15_19: 27.1, age20_24: 39.9, age25_29: 33.0 },
        { dma: 'New York', zip: '10060', region: 'New York', population: 334567, genZFemales: 33456, concentration: 0.100, index: 104.1, age15_19: 27.0, age20_24: 40.0, age25_29: 33.0 },
        { dma: 'New York', zip: '10065', region: 'New York', population: 345678, genZFemales: 34567, concentration: 0.100, index: 104.1, age15_19: 26.9, age20_24: 40.1, age25_29: 33.0 },
        { dma: 'New York', zip: '10069', region: 'New York', population: 356789, genZFemales: 35678, concentration: 0.100, index: 104.1, age15_19: 26.8, age20_24: 40.2, age25_29: 33.0 },
        { dma: 'New York', zip: '10075', region: 'New York', population: 367890, genZFemales: 36789, concentration: 0.100, index: 104.1, age15_19: 26.7, age20_24: 40.3, age25_29: 33.0 },
        { dma: 'New York', zip: '10080', region: 'New York', population: 378901, genZFemales: 37890, concentration: 0.100, index: 104.1, age15_19: 26.6, age20_24: 40.4, age25_29: 33.0 },
        { dma: 'New York', zip: '10081', region: 'New York', population: 389012, genZFemales: 38901, concentration: 0.100, index: 104.1, age15_19: 26.5, age20_24: 40.5, age25_29: 33.0 },
        { dma: 'New York', zip: '10087', region: 'New York', population: 390123, genZFemales: 39012, concentration: 0.100, index: 104.1, age15_19: 26.4, age20_24: 40.6, age25_29: 33.0 },
        { dma: 'New York', zip: '10090', region: 'New York', population: 401234, genZFemales: 40123, concentration: 0.100, index: 104.1, age15_19: 26.3, age20_24: 40.7, age25_29: 33.0 },
        { dma: 'New York', zip: '10101', region: 'New York', population: 412345, genZFemales: 41234, concentration: 0.100, index: 104.1, age15_19: 26.2, age20_24: 40.8, age25_29: 33.0 },
        { dma: 'New York', zip: '10102', region: 'New York', population: 423456, genZFemales: 42345, concentration: 0.100, index: 104.1, age15_19: 26.1, age20_24: 40.9, age25_29: 33.0 },
        { dma: 'New York', zip: '10103', region: 'New York', population: 434567, genZFemales: 43456, concentration: 0.100, index: 104.1, age15_19: 26.0, age20_24: 41.0, age25_29: 33.0 },
        { dma: 'New York', zip: '10104', region: 'New York', population: 445678, genZFemales: 44567, concentration: 0.100, index: 104.1, age15_19: 25.9, age20_24: 41.1, age25_29: 33.0 },
        { dma: 'New York', zip: '10105', region: 'New York', population: 456789, genZFemales: 45678, concentration: 0.100, index: 104.1, age15_19: 25.8, age20_24: 41.2, age25_29: 33.0 },
        { dma: 'New York', zip: '10106', region: 'New York', population: 467890, genZFemales: 46789, concentration: 0.100, index: 104.1, age15_19: 25.7, age20_24: 41.3, age25_29: 33.0 },
        { dma: 'New York', zip: '10107', region: 'New York', population: 478901, genZFemales: 47890, concentration: 0.100, index: 104.1, age15_19: 25.6, age20_24: 41.4, age25_29: 33.0 },
        { dma: 'New York', zip: '10108', region: 'New York', population: 489012, genZFemales: 48901, concentration: 0.100, index: 104.1, age15_19: 25.5, age20_24: 41.5, age25_29: 33.0 },
        { dma: 'New York', zip: '10109', region: 'New York', population: 490123, genZFemales: 49012, concentration: 0.100, index: 104.1, age15_19: 25.4, age20_24: 41.6, age25_29: 33.0 },
        { dma: 'New York', zip: '10110', region: 'New York', population: 501234, genZFemales: 50123, concentration: 0.100, index: 104.1, age15_19: 25.3, age20_24: 41.7, age25_29: 33.0 },
        { dma: 'New York', zip: '10111', region: 'New York', population: 512345, genZFemales: 51234, concentration: 0.100, index: 104.1, age15_19: 25.2, age20_24: 41.8, age25_29: 33.0 },
        { dma: 'New York', zip: '10112', region: 'New York', population: 523456, genZFemales: 52345, concentration: 0.100, index: 104.1, age15_19: 25.1, age20_24: 41.9, age25_29: 33.0 },
        { dma: 'New York', zip: '10115', region: 'New York', population: 534567, genZFemales: 53456, concentration: 0.100, index: 104.1, age15_19: 25.0, age20_24: 42.0, age25_29: 33.0 },
        { dma: 'New York', zip: '10118', region: 'New York', population: 545678, genZFemales: 54567, concentration: 0.100, index: 104.1, age15_19: 24.9, age20_24: 42.1, age25_29: 33.0 },
        { dma: 'New York', zip: '10119', region: 'New York', population: 556789, genZFemales: 55678, concentration: 0.100, index: 104.1, age15_19: 24.8, age20_24: 42.2, age25_29: 33.0 },
        { dma: 'New York', zip: '10120', region: 'New York', population: 567890, genZFemales: 56789, concentration: 0.100, index: 104.1, age15_19: 24.7, age20_24: 42.3, age25_29: 33.0 },
        { dma: 'New York', zip: '10121', region: 'New York', population: 578901, genZFemales: 57890, concentration: 0.100, index: 104.1, age15_19: 24.6, age20_24: 42.4, age25_29: 33.0 },
        { dma: 'New York', zip: '10122', region: 'New York', population: 589012, genZFemales: 58901, concentration: 0.100, index: 104.1, age15_19: 24.5, age20_24: 42.5, age25_29: 33.0 },
        { dma: 'New York', zip: '10123', region: 'New York', population: 590123, genZFemales: 59012, concentration: 0.100, index: 104.1, age15_19: 24.4, age20_24: 42.6, age25_29: 33.0 },
        { dma: 'New York', zip: '10128', region: 'New York', population: 601234, genZFemales: 60123, concentration: 0.100, index: 104.1, age15_19: 24.3, age20_24: 42.7, age25_29: 33.0 },
        { dma: 'New York', zip: '10151', region: 'New York', population: 612345, genZFemales: 61234, concentration: 0.100, index: 104.1, age15_19: 24.2, age20_24: 42.8, age25_29: 33.0 },
        { dma: 'New York', zip: '10152', region: 'New York', population: 623456, genZFemales: 62345, concentration: 0.100, index: 104.1, age15_19: 24.1, age20_24: 42.9, age25_29: 33.0 },
        { dma: 'New York', zip: '10153', region: 'New York', population: 634567, genZFemales: 63456, concentration: 0.100, index: 104.1, age15_19: 24.0, age20_24: 43.0, age25_29: 33.0 },
        { dma: 'New York', zip: '10154', region: 'New York', population: 645678, genZFemales: 64567, concentration: 0.100, index: 104.1, age15_19: 23.9, age20_24: 43.1, age25_29: 33.0 },
        { dma: 'New York', zip: '10155', region: 'New York', population: 656789, genZFemales: 65678, concentration: 0.100, index: 104.1, age15_19: 23.8, age20_24: 43.2, age25_29: 33.0 },
        { dma: 'New York', zip: '10158', region: 'New York', population: 667890, genZFemales: 66789, concentration: 0.100, index: 104.1, age15_19: 23.7, age20_24: 43.3, age25_29: 33.0 },
        { dma: 'New York', zip: '10161', region: 'New York', population: 678901, genZFemales: 67890, concentration: 0.100, index: 104.1, age15_19: 23.6, age20_24: 43.4, age25_29: 33.0 },
        { dma: 'New York', zip: '10162', region: 'New York', population: 689012, genZFemales: 68901, concentration: 0.100, index: 104.1, age15_19: 23.5, age20_24: 43.5, age25_29: 33.0 },
        { dma: 'New York', zip: '10165', region: 'New York', population: 690123, genZFemales: 69012, concentration: 0.100, index: 104.1, age15_19: 23.4, age20_24: 43.6, age25_29: 33.0 },
        { dma: 'New York', zip: '10166', region: 'New York', population: 701234, genZFemales: 70123, concentration: 0.100, index: 104.1, age15_19: 23.3, age20_24: 43.7, age25_29: 33.0 },
        { dma: 'New York', zip: '10167', region: 'New York', population: 712345, genZFemales: 71234, concentration: 0.100, index: 104.1, age15_19: 23.2, age20_24: 43.8, age25_29: 33.0 },
        { dma: 'New York', zip: '10168', region: 'New York', population: 723456, genZFemales: 72345, concentration: 0.100, index: 104.1, age15_19: 23.1, age20_24: 43.9, age25_29: 33.0 },
        { dma: 'New York', zip: '10169', region: 'New York', population: 734567, genZFemales: 73456, concentration: 0.100, index: 104.1, age15_19: 23.0, age20_24: 44.0, age25_29: 33.0 },
        { dma: 'New York', zip: '10170', region: 'New York', population: 745678, genZFemales: 74567, concentration: 0.100, index: 104.1, age15_19: 22.9, age20_24: 44.1, age25_29: 33.0 },
        { dma: 'New York', zip: '10171', region: 'New York', population: 756789, genZFemales: 75678, concentration: 0.100, index: 104.1, age15_19: 22.8, age20_24: 44.2, age25_29: 33.0 },
        { dma: 'New York', zip: '10172', region: 'New York', population: 767890, genZFemales: 76789, concentration: 0.100, index: 104.1, age15_19: 22.7, age20_24: 44.3, age25_29: 33.0 },
        { dma: 'New York', zip: '10173', region: 'New York', population: 778901, genZFemales: 77890, concentration: 0.100, index: 104.1, age15_19: 22.6, age20_24: 44.4, age25_29: 33.0 },
        { dma: 'New York', zip: '10174', region: 'New York', population: 789012, genZFemales: 78901, concentration: 0.100, index: 104.1, age15_19: 22.5, age20_24: 44.5, age25_29: 33.0 },
        { dma: 'New York', zip: '10175', region: 'New York', population: 790123, genZFemales: 79012, concentration: 0.100, index: 104.1, age15_19: 22.4, age20_24: 44.6, age25_29: 33.0 },
        { dma: 'New York', zip: '10176', region: 'New York', population: 801234, genZFemales: 80123, concentration: 0.100, index: 104.1, age15_19: 22.3, age20_24: 44.7, age25_29: 33.0 },
        { dma: 'New York', zip: '10177', region: 'New York', population: 812345, genZFemales: 81234, concentration: 0.100, index: 104.1, age15_19: 22.2, age20_24: 44.8, age25_29: 33.0 },
        { dma: 'New York', zip: '10178', region: 'New York', population: 823456, genZFemales: 82345, concentration: 0.100, index: 104.1, age15_19: 22.1, age20_24: 44.9, age25_29: 33.0 },
        { dma: 'New York', zip: '10199', region: 'New York', population: 834567, genZFemales: 83456, concentration: 0.100, index: 104.1, age15_19: 22.0, age20_24: 45.0, age25_29: 33.0 }
    ];
    
    // Add more cities to the data
    const moreCities = [
        // Los Angeles ZIP codes
        { dma: 'Los Angeles', zip: '90001', region: 'West Coast', population: 45678, genZFemales: 4567, concentration: 0.100, index: 104.1, age15_19: 30.0, age20_24: 37.0, age25_29: 33.0 },
        { dma: 'Los Angeles', zip: '90002', region: 'West Coast', population: 34567, genZFemales: 3456, concentration: 0.100, index: 104.1, age15_19: 30.1, age20_24: 36.9, age25_29: 33.0 },
        { dma: 'Los Angeles', zip: '90003', region: 'West Coast', population: 23456, genZFemales: 2345, concentration: 0.100, index: 104.1, age15_19: 30.2, age20_24: 36.8, age25_29: 33.0 },
        { dma: 'Los Angeles', zip: '90004', region: 'West Coast', population: 12345, genZFemales: 1234, concentration: 0.100, index: 104.1, age15_19: 30.3, age20_24: 36.7, age25_29: 33.0 },
        { dma: 'Los Angeles', zip: '90005', region: 'West Coast', population: 56789, genZFemales: 5678, concentration: 0.100, index: 104.1, age15_19: 30.4, age20_24: 36.6, age25_29: 33.0 },
        
        // Chicago ZIP codes
        { dma: 'Chicago', zip: '60601', region: 'Illinois', population: 12345, genZFemales: 1234, concentration: 0.100, index: 104.1, age15_19: 30.0, age20_24: 37.0, age25_29: 33.0 },
        { dma: 'Chicago', zip: '60602', region: 'Illinois', population: 23456, genZFemales: 2345, concentration: 0.100, index: 104.1, age15_19: 30.1, age20_24: 36.9, age25_29: 33.0 },
        { dma: 'Chicago', zip: '60603', region: 'Illinois', population: 34567, genZFemales: 3456, concentration: 0.100, index: 104.1, age15_19: 30.2, age20_24: 36.8, age25_29: 33.0 },
        { dma: 'Chicago', zip: '60604', region: 'Illinois', population: 45678, genZFemales: 4567, concentration: 0.100, index: 104.1, age15_19: 30.3, age20_24: 36.7, age25_29: 33.0 },
        { dma: 'Chicago', zip: '60605', region: 'Illinois', population: 56789, genZFemales: 5678, concentration: 0.100, index: 104.1, age15_19: 30.4, age20_24: 36.6, age25_29: 33.0 },
        
        // Houston ZIP codes
        { dma: 'Houston', zip: '77001', region: 'Texas', population: 12345, genZFemales: 1234, concentration: 0.100, index: 104.1, age15_19: 30.0, age20_24: 37.0, age25_29: 33.0 },
        { dma: 'Houston', zip: '77002', region: 'Texas', population: 23456, genZFemales: 2345, concentration: 0.100, index: 104.1, age15_19: 30.1, age20_24: 36.9, age25_29: 33.0 },
        { dma: 'Houston', zip: '77003', region: 'Texas', population: 34567, genZFemales: 3456, concentration: 0.100, index: 104.1, age15_19: 30.2, age20_24: 36.8, age25_29: 33.0 },
        { dma: 'Houston', zip: '77004', region: 'Texas', population: 45678, genZFemales: 4567, concentration: 0.100, index: 104.1, age15_19: 30.3, age20_24: 36.7, age25_29: 33.0 },
        { dma: 'Houston', zip: '77005', region: 'Texas', population: 56789, genZFemales: 5678, concentration: 0.100, index: 104.1, age15_19: 30.4, age20_24: 36.6, age25_29: 33.0 },
        
        // Miami ZIP codes
        { dma: 'Miami', zip: '33101', region: 'Florida', population: 12345, genZFemales: 1234, concentration: 0.100, index: 104.1, age15_19: 30.0, age20_24: 37.0, age25_29: 33.0 },
        { dma: 'Miami', zip: '33102', region: 'Florida', population: 23456, genZFemales: 2345, concentration: 0.100, index: 104.1, age15_19: 30.1, age20_24: 36.9, age25_29: 33.0 },
        { dma: 'Miami', zip: '33103', region: 'Florida', population: 34567, genZFemales: 3456, concentration: 0.100, index: 104.1, age15_19: 30.2, age20_24: 36.8, age25_29: 33.0 },
        { dma: 'Miami', zip: '33104', region: 'Florida', population: 45678, genZFemales: 4567, concentration: 0.100, index: 104.1, age15_19: 30.3, age20_24: 36.7, age25_29: 33.0 },
        { dma: 'Miami', zip: '33105', region: 'Florida', population: 56789, genZFemales: 5678, concentration: 0.100, index: 104.1, age15_19: 30.4, age20_24: 36.6, age25_29: 33.0 },
        
        // Phoenix ZIP codes
        { dma: 'Phoenix', zip: '85001', region: 'Mountain West', population: 12345, genZFemales: 1234, concentration: 0.100, index: 104.1, age15_19: 30.0, age20_24: 37.0, age25_29: 33.0 },
        { dma: 'Phoenix', zip: '85002', region: 'Mountain West', population: 23456, genZFemales: 2345, concentration: 0.100, index: 104.1, age15_19: 30.1, age20_24: 36.9, age25_29: 33.0 },
        { dma: 'Phoenix', zip: '85003', region: 'Mountain West', population: 34567, genZFemales: 3456, concentration: 0.100, index: 104.1, age15_19: 30.2, age20_24: 36.8, age25_29: 33.0 },
        { dma: 'Phoenix', zip: '85004', region: 'Mountain West', population: 45678, genZFemales: 4567, concentration: 0.100, index: 104.1, age15_19: 30.3, age20_24: 36.7, age25_29: 33.0 },
        { dma: 'Phoenix', zip: '85005', region: 'Mountain West', population: 56789, genZFemales: 5678, concentration: 0.100, index: 104.1, age15_19: 30.4, age20_24: 36.6, age25_29: 33.0 },
        
        // Philadelphia ZIP codes
        { dma: 'Philadelphia', zip: '19101', region: 'Pennsylvania', population: 12345, genZFemales: 1234, concentration: 0.100, index: 104.1, age15_19: 30.0, age20_24: 37.0, age25_29: 33.0 },
        { dma: 'Philadelphia', zip: '19102', region: 'Pennsylvania', population: 23456, genZFemales: 2345, concentration: 0.100, index: 104.1, age15_19: 30.1, age20_24: 36.9, age25_29: 33.0 },
        { dma: 'Philadelphia', zip: '19103', region: 'Pennsylvania', population: 34567, genZFemales: 3456, concentration: 0.100, index: 104.1, age15_19: 30.2, age20_24: 36.8, age25_29: 33.0 },
        { dma: 'Philadelphia', zip: '19104', region: 'Pennsylvania', population: 45678, genZFemales: 4567, concentration: 0.100, index: 104.1, age15_19: 30.3, age20_24: 36.7, age25_29: 33.0 },
        { dma: 'Philadelphia', zip: '19105', region: 'Pennsylvania', population: 56789, genZFemales: 5678, concentration: 0.100, index: 104.1, age15_19: 30.4, age20_24: 36.6, age25_29: 33.0 }
    ];
    
    // Add even more cities
    const additionalCities = [
        // San Antonio ZIP codes
        { dma: 'San Antonio', zip: '78201', region: 'Texas', population: 12345, genZFemales: 1234, concentration: 0.100, index: 104.1, age15_19: 30.0, age20_24: 37.0, age25_29: 33.0 },
        { dma: 'San Antonio', zip: '78202', region: 'Texas', population: 23456, genZFemales: 2345, concentration: 0.100, index: 104.1, age15_19: 30.1, age20_24: 36.9, age25_29: 33.0 },
        { dma: 'San Antonio', zip: '78203', region: 'Texas', population: 34567, genZFemales: 3456, concentration: 0.100, index: 104.1, age15_19: 30.2, age20_24: 36.8, age25_29: 33.0 },
        { dma: 'San Antonio', zip: '78204', region: 'Texas', population: 45678, genZFemales: 4567, concentration: 0.100, index: 104.1, age15_19: 30.3, age20_24: 36.7, age25_29: 33.0 },
        { dma: 'San Antonio', zip: '78205', region: 'Texas', population: 56789, genZFemales: 5678, concentration: 0.100, index: 104.1, age15_19: 30.4, age20_24: 36.6, age25_29: 33.0 },
        
        // Dallas ZIP codes
        { dma: 'Dallas', zip: '75201', region: 'Texas', population: 12345, genZFemales: 1234, concentration: 0.100, index: 104.1, age15_19: 30.0, age20_24: 37.0, age25_29: 33.0 },
        { dma: 'Dallas', zip: '75202', region: 'Texas', population: 23456, genZFemales: 2345, concentration: 0.100, index: 104.1, age15_19: 30.1, age20_24: 36.9, age25_29: 33.0 },
        { dma: 'Dallas', zip: '75203', region: 'Texas', population: 34567, genZFemales: 3456, concentration: 0.100, index: 104.1, age15_19: 30.2, age20_24: 36.8, age25_29: 33.0 },
        { dma: 'Dallas', zip: '75204', region: 'Texas', population: 45678, genZFemales: 4567, concentration: 0.100, index: 104.1, age15_19: 30.3, age20_24: 36.7, age25_29: 33.0 },
        { dma: 'Dallas', zip: '75205', region: 'Texas', population: 56789, genZFemales: 5678, concentration: 0.100, index: 104.1, age15_19: 30.4, age20_24: 36.6, age25_29: 33.0 },
        
        // San Diego ZIP codes
        { dma: 'San Diego', zip: '92101', region: 'West Coast', population: 12345, genZFemales: 1234, concentration: 0.100, index: 104.1, age15_19: 30.0, age20_24: 37.0, age25_29: 33.0 },
        { dma: 'San Diego', zip: '92102', region: 'West Coast', population: 23456, genZFemales: 2345, concentration: 0.100, index: 104.1, age15_19: 30.1, age20_24: 36.9, age25_29: 33.0 },
        { dma: 'San Diego', zip: '92103', region: 'West Coast', population: 34567, genZFemales: 3456, concentration: 0.100, index: 104.1, age15_19: 30.2, age20_24: 36.8, age25_29: 33.0 },
        { dma: 'San Diego', zip: '92104', region: 'West Coast', population: 45678, genZFemales: 4567, concentration: 0.100, index: 104.1, age15_19: 30.3, age20_24: 36.7, age25_29: 33.0 },
        { dma: 'San Diego', zip: '92105', region: 'West Coast', population: 56789, genZFemales: 5678, concentration: 0.100, index: 104.1, age15_19: 30.4, age20_24: 36.6, age25_29: 33.0 },
        
        // San Jose ZIP codes
        { dma: 'San Jose', zip: '95101', region: 'West Coast', population: 12345, genZFemales: 1234, concentration: 0.100, index: 104.1, age15_19: 30.0, age20_24: 37.0, age25_29: 33.0 },
        { dma: 'San Jose', zip: '95102', region: 'West Coast', population: 23456, genZFemales: 2345, concentration: 0.100, index: 104.1, age15_19: 30.1, age20_24: 36.9, age25_29: 33.0 },
        { dma: 'San Jose', zip: '95103', region: 'West Coast', population: 34567, genZFemales: 3456, concentration: 0.100, index: 104.1, age15_19: 30.2, age20_24: 36.8, age25_29: 33.0 },
        { dma: 'San Jose', zip: '95104', region: 'West Coast', population: 45678, genZFemales: 4567, concentration: 0.100, index: 104.1, age15_19: 30.3, age20_24: 36.7, age25_29: 33.0 },
        { dma: 'San Jose', zip: '95105', region: 'West Coast', population: 56789, genZFemales: 5678, concentration: 0.100, index: 104.1, age15_19: 30.4, age20_24: 36.6, age25_29: 33.0 },
        
        // Austin ZIP codes
        { dma: 'Austin', zip: '78701', region: 'Texas', population: 12345, genZFemales: 1234, concentration: 0.100, index: 104.1, age15_19: 30.0, age20_24: 37.0, age25_29: 33.0 },
        { dma: 'Austin', zip: '78702', region: 'Texas', population: 23456, genZFemales: 2345, concentration: 0.100, index: 104.1, age15_19: 30.1, age20_24: 36.9, age25_29: 33.0 },
        { dma: 'Austin', zip: '78703', region: 'Texas', population: 34567, genZFemales: 3456, concentration: 0.100, index: 104.1, age15_19: 30.2, age20_24: 36.8, age25_29: 33.0 },
        { dma: 'Austin', zip: '78704', region: 'Texas', population: 45678, genZFemales: 4567, concentration: 0.100, index: 104.1, age15_19: 30.3, age20_24: 36.7, age25_29: 33.0 },
        { dma: 'Austin', zip: '78705', region: 'Texas', population: 56789, genZFemales: 5678, concentration: 0.100, index: 104.1, age15_19: 30.4, age20_24: 36.6, age25_29: 33.0 },
        
        // Jacksonville ZIP codes
        { dma: 'Jacksonville', zip: '32201', region: 'Florida', population: 12345, genZFemales: 1234, concentration: 0.100, index: 104.1, age15_19: 30.0, age20_24: 37.0, age25_29: 33.0 },
        { dma: 'Jacksonville', zip: '32202', region: 'Florida', population: 23456, genZFemales: 2345, concentration: 0.100, index: 104.1, age15_19: 30.1, age20_24: 36.9, age25_29: 33.0 },
        { dma: 'Jacksonville', zip: '32203', region: 'Florida', population: 34567, genZFemales: 3456, concentration: 0.100, index: 104.1, age15_19: 30.2, age20_24: 36.8, age25_29: 33.0 },
        { dma: 'Jacksonville', zip: '32204', region: 'Florida', population: 45678, genZFemales: 4567, concentration: 0.100, index: 104.1, age15_19: 30.3, age20_24: 36.7, age25_29: 33.0 },
        { dma: 'Jacksonville', zip: '32205', region: 'Florida', population: 56789, genZFemales: 5678, concentration: 0.100, index: 104.1, age15_19: 30.4, age20_24: 36.6, age25_29: 33.0 },
        
        // Columbus ZIP codes
        { dma: 'Columbus', zip: '43201', region: 'Ohio', population: 12345, genZFemales: 1234, concentration: 0.100, index: 104.1, age15_19: 30.0, age20_24: 37.0, age25_29: 33.0 },
        { dma: 'Columbus', zip: '43202', region: 'Ohio', population: 23456, genZFemales: 2345, concentration: 0.100, index: 104.1, age15_19: 30.1, age20_24: 36.9, age25_29: 33.0 },
        { dma: 'Columbus', zip: '43203', region: 'Ohio', population: 34567, genZFemales: 3456, concentration: 0.100, index: 104.1, age15_19: 30.2, age20_24: 36.8, age25_29: 33.0 },
        { dma: 'Columbus', zip: '43204', region: 'Ohio', population: 45678, genZFemales: 4567, concentration: 0.100, index: 104.1, age15_19: 30.3, age20_24: 36.7, age25_29: 33.0 },
        { dma: 'Columbus', zip: '43205', region: 'Ohio', population: 56789, genZFemales: 5678, concentration: 0.100, index: 104.1, age15_19: 30.4, age20_24: 36.6, age25_29: 33.0 },
        
        // Fort Worth ZIP codes
        { dma: 'Fort Worth', zip: '76101', region: 'Texas', population: 12345, genZFemales: 1234, concentration: 0.100, index: 104.1, age15_19: 30.0, age20_24: 37.0, age25_29: 33.0 },
        { dma: 'Fort Worth', zip: '76102', region: 'Texas', population: 23456, genZFemales: 2345, concentration: 0.100, index: 104.1, age15_19: 30.1, age20_24: 36.9, age25_29: 33.0 },
        { dma: 'Fort Worth', zip: '76103', region: 'Texas', population: 34567, genZFemales: 3456, concentration: 0.100, index: 104.1, age15_19: 30.2, age20_24: 36.8, age25_29: 33.0 },
        { dma: 'Fort Worth', zip: '76104', region: 'Texas', population: 45678, genZFemales: 4567, concentration: 0.100, index: 104.1, age15_19: 30.3, age20_24: 36.7, age25_29: 33.0 },
        { dma: 'Fort Worth', zip: '76105', region: 'Texas', population: 56789, genZFemales: 5678, concentration: 0.100, index: 104.1, age15_19: 30.4, age20_24: 36.6, age25_29: 33.0 },
        
        // Charlotte ZIP codes
        { dma: 'Charlotte', zip: '28201', region: 'Carolinas', population: 12345, genZFemales: 1234, concentration: 0.100, index: 104.1, age15_19: 30.0, age20_24: 37.0, age25_29: 33.0 },
        { dma: 'Charlotte', zip: '28202', region: 'Carolinas', population: 23456, genZFemales: 2345, concentration: 0.100, index: 104.1, age15_19: 30.1, age20_24: 36.9, age25_29: 33.0 },
        { dma: 'Charlotte', zip: '28203', region: 'Carolinas', population: 34567, genZFemales: 3456, concentration: 0.100, index: 104.1, age15_19: 30.2, age20_24: 36.8, age25_29: 33.0 },
        { dma: 'Charlotte', zip: '28204', region: 'Carolinas', population: 45678, genZFemales: 4567, concentration: 0.100, index: 104.1, age15_19: 30.3, age20_24: 36.7, age25_29: 33.0 },
        { dma: 'Charlotte', zip: '28205', region: 'Carolinas', population: 56789, genZFemales: 5678, concentration: 0.100, index: 104.1, age15_19: 30.4, age20_24: 36.6, age25_29: 33.0 },
        
        // Seattle ZIP codes
        { dma: 'Seattle', zip: '98101', region: 'West Coast', population: 12345, genZFemales: 1234, concentration: 0.100, index: 104.1, age15_19: 30.0, age20_24: 37.0, age25_29: 33.0 },
        { dma: 'Seattle', zip: '98102', region: 'West Coast', population: 23456, genZFemales: 2345, concentration: 0.100, index: 104.1, age15_19: 30.1, age20_24: 36.9, age25_29: 33.0 },
        { dma: 'Seattle', zip: '98103', region: 'West Coast', population: 34567, genZFemales: 3456, concentration: 0.100, index: 104.1, age15_19: 30.2, age20_24: 36.8, age25_29: 33.0 },
        { dma: 'Seattle', zip: '98104', region: 'West Coast', population: 45678, genZFemales: 4567, concentration: 0.100, index: 104.1, age15_19: 30.3, age20_24: 36.7, age25_29: 33.0 },
        { dma: 'Seattle', zip: '98105', region: 'West Coast', population: 56789, genZFemales: 5678, concentration: 0.100, index: 104.1, age15_19: 30.4, age20_24: 36.6, age25_29: 33.0 },
        
        // Denver ZIP codes
        { dma: 'Denver', zip: '80201', region: 'Mountain West', population: 12345, genZFemales: 1234, concentration: 0.100, index: 104.1, age15_19: 30.0, age20_24: 37.0, age25_29: 33.0 },
        { dma: 'Denver', zip: '80202', region: 'Mountain West', population: 23456, genZFemales: 2345, concentration: 0.100, index: 104.1, age15_19: 30.1, age20_24: 36.9, age25_29: 33.0 },
        { dma: 'Denver', zip: '80203', region: 'Mountain West', population: 34567, genZFemales: 3456, concentration: 0.100, index: 104.1, age15_19: 30.2, age20_24: 36.8, age25_29: 33.0 },
        { dma: 'Denver', zip: '80204', region: 'Mountain West', population: 45678, genZFemales: 4567, concentration: 0.100, index: 104.1, age15_19: 30.3, age20_24: 36.7, age25_29: 33.0 },
        { dma: 'Denver', zip: '80205', region: 'Mountain West', population: 56789, genZFemales: 5678, concentration: 0.100, index: 104.1, age15_19: 30.4, age20_24: 36.6, age25_29: 33.0 },
        
        // Washington DC ZIP codes
        { dma: 'Washington DC', zip: '20001', region: 'New York', population: 12345, genZFemales: 1234, concentration: 0.100, index: 104.1, age15_19: 30.0, age20_24: 37.0, age25_29: 33.0 },
        { dma: 'Washington DC', zip: '20002', region: 'New York', population: 23456, genZFemales: 2345, concentration: 0.100, index: 104.1, age15_19: 30.1, age20_24: 36.9, age25_29: 33.0 },
        { dma: 'Washington DC', zip: '20003', region: 'New York', population: 34567, genZFemales: 3456, concentration: 0.100, index: 104.1, age15_19: 30.2, age20_24: 36.8, age25_29: 33.0 },
        { dma: 'Washington DC', zip: '20004', region: 'New York', population: 45678, genZFemales: 4567, concentration: 0.100, index: 104.1, age15_19: 30.3, age20_24: 36.7, age25_29: 33.0 },
        { dma: 'Washington DC', zip: '20005', region: 'New York', population: 56789, genZFemales: 5678, concentration: 0.100, index: 104.1, age15_19: 30.4, age20_24: 36.6, age25_29: 33.0 }
    ];
    
    currentData = [...newYorkZips, ...moreCities, ...additionalCities];
    filteredData = [...currentData];
    
    console.log(`✅ Datos de muestra generados: ${currentData.length} registros`);
    console.log(`🏙️ Ciudades disponibles: ${[...new Set(currentData.map(item => item.dma))].length}`);
    
    // Populate DMA filter dropdown
    populateDMAFilter();
}

function populateDMAFilter() {
    const dmaFilter = document.getElementById('dmaFilter');
    if (!dmaFilter) {
        console.log('❌ No se encontró el elemento dmaFilter');
        return;
    }
    
    if (!currentData || currentData.length === 0) {
        console.log('❌ No hay datos disponibles para poblar el filtro');
        return;
    }
    
    const uniqueDMAs = [...new Set(currentData.map(item => item.dma))].sort();
    
    console.log(`🏙️ Poblando filtro con ${uniqueDMAs.length} ciudades únicas`);
    console.log(`📊 Total de registros en currentData: ${currentData.length}`);
    console.log(`🏙️ Primeras 10 ciudades:`, uniqueDMAs.slice(0, 10));
    
    // Clear existing options except "All Cities"
    dmaFilter.innerHTML = '<option value="">All Cities</option>';
    
    uniqueDMAs.forEach(dma => {
        const option = document.createElement('option');
        option.value = dma;
        option.textContent = dma;
        dmaFilter.appendChild(option);
    });
    
    console.log(`✅ Filtro poblado con ${uniqueDMAs.length} opciones`);
}

function setupDataExplorerFilters() {
    console.log('🔧 Configurando filtros...');
    
    // Add event listeners to filters (with error handling)
    const dmaFilter = document.getElementById('dmaFilter');
    const indexFilter = document.getElementById('indexFilter');
    const populationFilter = document.getElementById('populationFilter');
    const zipSearch = document.getElementById('zipSearch');
    
    if (dmaFilter) {
        dmaFilter.addEventListener('change', applyFilters);
        console.log('✅ DMA filter configurado');
    } else {
        console.log('❌ DMA filter no encontrado');
    }
    
    
    if (indexFilter) {
        indexFilter.addEventListener('change', applyFilters);
        console.log('✅ Index filter configurado');
    }
    
    if (populationFilter) {
        populationFilter.addEventListener('change', applyFilters);
        console.log('✅ Population filter configurado');
    }
    
    if (zipSearch) {
        zipSearch.addEventListener('input', applyFilters);
        console.log('✅ ZIP search configurado');
    }
    
    // Add clear filters button
    const clearFiltersBtn = document.getElementById('clearFilters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearFilters);
        console.log('✅ Clear filters button configurado');
    }
}

function applyFilters() {
    console.log('🔍 Aplicando filtros...');
    
    const dmaFilterEl = document.getElementById('dmaFilter');
    const indexFilterEl = document.getElementById('indexFilter');
    const populationFilterEl = document.getElementById('populationFilter');
    const zipSearchEl = document.getElementById('zipSearch');
    
    const dmaFilter = dmaFilterEl ? dmaFilterEl.value : '';
    const indexFilter = indexFilterEl ? indexFilterEl.value : '';
    const populationFilter = populationFilterEl ? populationFilterEl.value : '';
    const zipSearch = zipSearchEl ? zipSearchEl.value.toLowerCase() : '';
    
    console.log(`📊 Datos actuales: ${currentData.length} registros`);
    console.log(`🔍 Filtros aplicados: DMA=${dmaFilter}, Index=${indexFilter}, Population=${populationFilter}, ZIP=${zipSearch}`);
    
    filteredData = currentData.filter(item => {
        // DMA filter
        if (dmaFilter && item.dma !== dmaFilter) return false;
        
        
        // Index filter - NOT applied to individual ZIP codes, only to aggregated city data
        // This filter will be applied later in generateSummaryData()
        
        // Population filter
        if (populationFilter) {
            switch(populationFilter) {
                case 'large': if (item.population < 50000) return false; break;
                case 'medium': if (item.population < 10000 || item.population >= 50000) return false; break;
                case 'small': if (item.population >= 10000) return false; break;
            }
        }
        
        // ZIP code search
        if (zipSearch && !item.zip.toLowerCase().includes(zipSearch)) return false;
        
        return true;
    });
    
    currentPage = 1;
    
    console.log(`✅ Filtros aplicados: ${filteredData.length} registros filtrados de ${currentData.length} totales`);
    
    populateDataTable();
    updateKPIs();
    generateSummaryData();
}

function populateDataTable() {
    const tbody = document.getElementById('dataTableBody');
    tbody.innerHTML = '';
    
    // Sort data
    const sortedData = [...filteredData].sort((a, b) => {
        const aVal = a[getColumnKey(sortColumn)];
        const bVal = b[getColumnKey(sortColumn)];
        
        if (sortDirection === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, sortedData.length);
    const pageData = sortedData.slice(startIndex, endIndex);
    
    // Populate table
    pageData.forEach(item => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${item.dma}</td>
            <td>${item.zip}</td>
            <td>${Math.round(item.population).toLocaleString()}</td>
            <td>${Math.round(item.genZFemales).toLocaleString()}</td>
            <td>${item.concentration.toFixed(2)}%</td>
            <td>${item.index.toFixed(1)}</td>
            <td>${item.age15_19.toFixed(1)}%</td>
            <td>${item.age20_24.toFixed(1)}%</td>
            <td>${item.age25_29.toFixed(1)}%</td>
        `;
    });
    
    // Update pagination
    updatePagination(sortedData.length);
}

function getColumnKey(columnIndex) {
    const keys = ['dma', 'zip', 'population', 'genZFemales', 'concentration', 'index', 'age15_19', 'age20_24', 'age25_29'];
    return keys[columnIndex] || 'dma';
}

function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / pageSize);
    const paginationDiv = document.getElementById('pagination');
    
    let paginationHTML = '';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<button class="btn btn-secondary" onclick="goToPage(${currentPage - 1})">Previous</button> `;
    }
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        if (i === currentPage) {
            paginationHTML += `<button class="btn btn-primary" disabled>${i}</button> `;
        } else {
            paginationHTML += `<button class="btn btn-secondary" onclick="goToPage(${i})">${i}</button> `;
        }
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<button class="btn btn-secondary" onclick="goToPage(${currentPage + 1})">Next</button> `;
    }
    
    paginationHTML += `<span style="margin-left: 1rem;">Showing ${((currentPage - 1) * pageSize) + 1}-${Math.min(currentPage * pageSize, totalItems)} of ${totalItems} entries</span>`;
    
    paginationDiv.innerHTML = paginationHTML;
}

function updateKPIs() {
    const totalPopulation = filteredData.reduce((sum, item) => sum + item.population, 0);
    const totalGenZ = filteredData.reduce((sum, item) => sum + item.genZFemales, 0);
    const genZPercentage = totalPopulation > 0 ? (totalGenZ / totalPopulation) * 100 : 0;
    
    // Recalcular el Index usando la fórmula original aplicada al conjunto filtrado
    // Index = (GenZ % del conjunto / Benchmark Nacional) * 100
    // El benchmark nacional está en formato decimal (0.08413184286613799 = 8.41%)
    const nationalBenchmark = 0.08413184286613799; // Benchmark nacional del CSV (formato decimal)
    const calculatedIndex = (genZPercentage / (nationalBenchmark * 100)) * 100;
    
    document.getElementById('filteredCount').textContent = Math.round(filteredData.length).toLocaleString();
    document.getElementById('avgIndex').textContent = calculatedIndex.toFixed(1);
    // Format Total Population - show in K if less than 1M, otherwise in M
    const populationDisplay = totalPopulation >= 1000000 
        ? (totalPopulation / 1000000).toFixed(1) + 'M'
        : Math.round(totalPopulation / 1000) + 'K';
    document.getElementById('totalPopulation').textContent = populationDisplay;
    // Format Gen Z Females - show in K if less than 1M, otherwise in M
    const genZDisplay = totalGenZ >= 1000000 
        ? (totalGenZ / 1000000).toFixed(1) + 'M'
        : Math.round(totalGenZ / 1000) + 'K';
    document.getElementById('totalGenZ').textContent = genZDisplay;
    document.getElementById('genZPercentage').textContent = genZPercentage.toFixed(2) + '%';
    
    // Update the title based on current filter
    updateDataExplorerTitle();
}

// Update the Data Explorer title based on current filters
function updateDataExplorerTitle() {
    const titleElement = document.querySelector('#dataExplorer .card-header h2');
    const subtitleElement = document.querySelector('#dataExplorer .card-header p');
    
    if (!titleElement || !subtitleElement) return;
    
    const dmaFilter = document.getElementById('dmaFilter');
    const currentDMA = dmaFilter ? dmaFilter.value : '';
    
    if (currentDMA && currentDMA !== 'all') {
        // Show DMA name in title
        titleElement.textContent = `Data Explorer - ${currentDMA}`;
        subtitleElement.textContent = `Detailed analysis for ${currentDMA} ZIP codes`;
    } else {
        // Show default title
        titleElement.textContent = 'The Data Explorer';
        subtitleElement.textContent = 'Dive deep into the data and perform your own analysis';
    }
}

// Generate summary data by aggregating ZIP codes by city (DMA)
function generateSummaryData() {
    const dmaGroups = {};
    
    filteredData.forEach(item => {
        if (!dmaGroups[item.dma]) {
            dmaGroups[item.dma] = {
                dma: item.dma,
                population: 0,
                genZFemales: 0,
                age15_19: 0,
                age20_24: 0,
                age25_29: 0,
                zipCount: 0
            };
        }
        
        dmaGroups[item.dma].population += item.population;
        dmaGroups[item.dma].genZFemales += item.genZFemales;
        dmaGroups[item.dma].age15_19 += item.age15_19;
        dmaGroups[item.dma].age20_24 += item.age20_24;
        dmaGroups[item.dma].age25_29 += item.age25_29;
        dmaGroups[item.dma].zipCount += 1;
    });
    
    // Convert to array and calculate averages and percentages
    summaryData = Object.values(dmaGroups).map(city => {
        const concentration = city.population > 0 ? (city.genZFemales / city.population) * 100 : 0;
        const nationalBenchmark = 0.08413184286613799;
        const index = (concentration / (nationalBenchmark * 100)) * 100;
        
        return {
            dma: city.dma,
            population: city.population,
            genZFemales: city.genZFemales,
            concentration: concentration,
            index: index,
            age15_19: city.age15_19 / city.zipCount,
            age20_24: city.age20_24 / city.zipCount,
            age25_29: city.age25_29 / city.zipCount,
            zipCount: city.zipCount
        };
    });
    
    // Apply Population and Index filters to summary data
    const indexFilterEl = document.getElementById('indexFilter');
    const populationFilterEl = document.getElementById('populationFilter');
    
    const indexFilter = indexFilterEl ? indexFilterEl.value : '';
    const populationFilter = populationFilterEl ? populationFilterEl.value : '';
    
    summaryData = summaryData.filter(city => {
        // Index filter
        if (indexFilter) {
            switch(indexFilter) {
                case 'high': if (city.index < 120) return false; break;
                case 'medium-high': if (city.index < 110 || city.index >= 120) return false; break;
                case 'medium': if (city.index < 100 || city.index >= 110) return false; break;
                case 'medium-low': if (city.index < 90 || city.index >= 100) return false; break;
                case 'low': if (city.index >= 90) return false; break;
            }
        }
        
        // Population filter
        if (populationFilter) {
            switch(populationFilter) {
                case 'large': if (city.population < 50000) return false; break;
                case 'medium': if (city.population < 10000 || city.population >= 50000) return false; break;
                case 'small': if (city.population >= 10000) return false; break;
            }
        }
        
        return true;
    });
    
    populateSummaryTable();
}

// Populate summary table
function populateSummaryTable() {
    const tbody = document.getElementById('summaryTableBody');
    tbody.innerHTML = '';
    
    // Sort data
    const sortedData = [...summaryData].sort((a, b) => {
        const aVal = a[getSummaryColumnKey(summarySortColumn)];
        const bVal = b[getSummaryColumnKey(summarySortColumn)];
        
        if (typeof aVal === 'string') {
            return summarySortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        } else {
            return summarySortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        }
    });
    
    // Pagination
    const startIndex = (summaryCurrentPage - 1) * summaryPageSize;
    const endIndex = startIndex + summaryPageSize;
    const paginatedData = sortedData.slice(startIndex, endIndex);
    
    paginatedData.forEach(item => {
        const row = document.createElement('tr');
        row.style.cursor = 'pointer';
        row.title = 'Click to filter by this city';
        row.innerHTML = `
            <td>${item.dma}</td>
            <td>${Math.round(item.population).toLocaleString()}</td>
            <td>${Math.round(item.genZFemales).toLocaleString()}</td>
            <td>${item.concentration.toFixed(2)}%</td>
            <td>${item.index.toFixed(1)}</td>
            <td>${item.age15_19.toFixed(1)}%</td>
            <td>${item.age20_24.toFixed(1)}%</td>
            <td>${item.age25_29.toFixed(1)}%</td>
        `;
        
        // Add click event to filter by this city
        row.addEventListener('click', () => {
            filterByCity(item.dma);
        });
        
        // Add hover effect
        row.addEventListener('mouseenter', () => {
            row.style.backgroundColor = 'var(--primary-purple-lighter)';
        });
        
        row.addEventListener('mouseleave', () => {
            row.style.backgroundColor = '';
        });
        
        tbody.appendChild(row);
    });
    
    updateSummaryPagination();
}

// Filter main table by city when clicking on summary table row
function filterByCity(cityName) {
    console.log(`🏙️ Filtrando por ciudad: ${cityName}`);
    
    // Set the DMA filter
    const dmaFilterEl = document.getElementById('dmaFilter');
    if (dmaFilterEl) {
        dmaFilterEl.value = cityName;
    }
    
    // Clear other filters to show all ZIP codes for this city
    document.getElementById('indexFilter').value = '';
    document.getElementById('populationFilter').value = '';
    document.getElementById('zipSearch').value = '';
    
    // Apply the filter
    applyFilters();
    
    // Scroll to the main table
    document.getElementById('dataTable').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
    
    // Show a brief notification
    showNotification(`Filtered by ${cityName}`, 'info');
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'info' ? 'var(--primary-purple)' : '#e74c3c'};
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        font-size: 0.9rem;
        font-weight: 500;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// ===== NATIONAL LANDSCAPE FUNCTIONS =====

// Initialize National Landscape tab
function initializeNationalLandscape() {
    console.log('🏛️ Initializing National Landscape...');
    
    if (!currentData || currentData.length === 0) {
        console.log('❌ No data available for National Landscape initialization');
        return;
    }
    
    // Update KPIs and charts
    updateNationalKPIs();
    updateNationalCharts();
}

// Update National KPIs
function updateNationalKPIs(filteredData = currentData) {
    if (!filteredData || filteredData.length === 0) return;
    
    const totalPopulation = filteredData.reduce((sum, item) => sum + item.population, 0);
    const totalGenZ = filteredData.reduce((sum, item) => sum + item.genZFemales, 0);
    const uniqueDMAs = [...new Set(filteredData.map(item => item.dma))];
    
    // Calculate high performers
    const dmaGroups = {};
    filteredData.forEach(item => {
        if (!dmaGroups[item.dma]) {
            dmaGroups[item.dma] = {
                population: 0,
                genZFemales: 0
            };
        }
        dmaGroups[item.dma].population += item.population;
        dmaGroups[item.dma].genZFemales += item.genZFemales;
    });
    
    const highPerformers = Object.values(dmaGroups).filter(city => {
        const concentration = city.population > 0 ? (city.genZFemales / city.population) * 100 : 0;
        const nationalBenchmark = 8.413184286613799;
        const index = (concentration / nationalBenchmark) * 100;
        return index >= 120;
    }).length;
    
    // Update KPI elements
    const nationalBenchmarkEl = document.getElementById('nationalBenchmark');
    const nationalGenZEl = document.getElementById('nationalGenZ');
    const nationalPopulationEl = document.getElementById('nationalPopulation');
    const nationalDMAsEl = document.getElementById('nationalDMAs');
    const nationalHighPerformersEl = document.getElementById('nationalHighPerformers');
    
    if (nationalBenchmarkEl) nationalBenchmarkEl.textContent = '8.41%';
    if (nationalGenZEl) {
        const genZDisplay = totalGenZ >= 1000000 
            ? (totalGenZ / 1000000).toFixed(1) + 'M'
            : Math.round(totalGenZ / 1000) + 'K';
        nationalGenZEl.textContent = genZDisplay;
    }
    if (nationalPopulationEl) {
        const populationDisplay = totalPopulation >= 1000000 
            ? (totalPopulation / 1000000).toFixed(1) + 'M'
            : Math.round(totalPopulation / 1000) + 'K';
        nationalPopulationEl.textContent = populationDisplay;
    }
    if (nationalDMAsEl) nationalDMAsEl.textContent = uniqueDMAs.length.toLocaleString();
    if (nationalHighPerformersEl) nationalHighPerformersEl.textContent = highPerformers.toLocaleString();
}

// Update National Charts
function updateNationalCharts(filteredData = currentData) {
    if (!filteredData || filteredData.length === 0) return;
    
    // Update existing charts with filtered data
    if (window.nationalChart) {
        window.nationalChart.destroy();
    }
    createNationalChart(filteredData);
    
    if (window.topCitiesChart) {
        window.topCitiesChart.destroy();
    }
    createCitiesChart(filteredData);
}

// ===== CONCENTRATION CHAMPIONS FUNCTIONS =====

// Initialize Concentration Champions tab
function initializeConcentrationChampions() {
    console.log('🏆 Initializing Concentration Champions...');
    
    if (!currentData || currentData.length === 0) {
        console.log('❌ No data available for Concentration Champions initialization');
        return;
    }
    
    // Update KPIs and charts
    updateChampionsKPIs();
    updateChampionsCharts();
}

// Update Champions KPIs
function updateChampionsKPIs(filteredData = currentData) {
    if (!filteredData || filteredData.length === 0) return;
    
    // Aggregate data by DMA
    const dmaGroups = {};
    filteredData.forEach(item => {
        if (!dmaGroups[item.dma]) {
            dmaGroups[item.dma] = {
                dma: item.dma,
                population: 0,
                genZFemales: 0
            };
        }
        dmaGroups[item.dma].population += item.population;
        dmaGroups[item.dma].genZFemales += item.genZFemales;
    });
    
    // Calculate metrics for each city
    const cityMetrics = Object.values(dmaGroups).map(city => {
        const concentration = city.population > 0 ? (city.genZFemales / city.population) * 100 : 0;
        const nationalBenchmark = 8.413184286613799;
        const index = (concentration / nationalBenchmark) * 100;
        
        return {
            dma: city.dma,
            population: city.population,
            genZFemales: city.genZFemales,
            concentration: concentration,
            index: index
        };
    });
    
    // Sort by index (descending)
    cityMetrics.sort((a, b) => b.index - a.index);
    
    // Calculate statistics
    const highestIndex = cityMetrics[0] || { index: 0, dma: 'N/A' };
    const highPotentialMarkets = cityMetrics.filter(city => city.index >= 120).length;
    const highestConcentration = cityMetrics[0] || { concentration: 0, dma: 'N/A' };
    
    // University cities (simplified detection based on common university city names)
    const universityKeywords = ['university', 'college', 'state', 'tech', 'polytechnic', 'institute'];
    const universityCities = cityMetrics.filter(city => 
        universityKeywords.some(keyword => city.dma.toLowerCase().includes(keyword))
    ).length;
    
    const avgIndex = cityMetrics.length > 0 
        ? cityMetrics.reduce((sum, city) => sum + city.index, 0) / cityMetrics.length 
        : 0;
    
    // Update KPI elements
    const highestIndexEl = document.getElementById('championsHighestIndex');
    const highestIndexCityEl = document.getElementById('championsHighestIndexCity');
    const highPotentialEl = document.getElementById('championsHighPotential');
    const highestConcentrationEl = document.getElementById('championsHighestConcentration');
    const highestConcentrationCityEl = document.getElementById('championsHighestConcentrationCity');
    const universityCitiesEl = document.getElementById('championsUniversityCities');
    const avgIndexEl = document.getElementById('championsAvgIndex');
    
    if (highestIndexEl) highestIndexEl.textContent = highestIndex.index.toFixed(1);
    if (highestIndexCityEl) highestIndexCityEl.textContent = highestIndex.dma;
    if (highPotentialEl) highPotentialEl.textContent = highPotentialMarkets.toLocaleString();
    if (highestConcentrationEl) highestConcentrationEl.textContent = highestConcentration.concentration.toFixed(2) + '%';
    if (highestConcentrationCityEl) highestConcentrationCityEl.textContent = highestConcentration.dma;
    if (universityCitiesEl) universityCitiesEl.textContent = universityCities.toLocaleString();
    if (avgIndexEl) avgIndexEl.textContent = avgIndex.toFixed(1);
}

// Update Champions Charts
function updateChampionsCharts(filteredData = currentData) {
    if (!filteredData || filteredData.length === 0) return;
    
    // Update existing charts with filtered data
    if (window.championsChart) {
        window.championsChart.destroy();
    }
    createChampionsChart(filteredData);
    
    if (window.opportunityMatrixChart) {
        window.opportunityMatrixChart.destroy();
    }
    createOpportunityMatrix(filteredData);
    
    if (window.universityComparisonChart) {
        window.universityComparisonChart.destroy();
    }
    createUniversityComparison(filteredData);
}

// Get column key for summary table
function getSummaryColumnKey(columnIndex) {
    const keys = ['dma', 'population', 'genZFemales', 'concentration', 'index', 'age15_19', 'age20_24', 'age25_29'];
    return keys[columnIndex] || 'dma';
}

// Sort summary table
function sortSummaryTable(columnIndex) {
    if (summarySortColumn === columnIndex) {
        summarySortDirection = summarySortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        summarySortColumn = columnIndex;
        summarySortDirection = 'asc';
    }
    
    // Update sort arrows
    document.querySelectorAll('#summaryTable th .sort-arrow').forEach(arrow => {
        arrow.textContent = '↕';
    });
    
    const currentArrow = document.querySelector(`#summaryTable th:nth-child(${columnIndex + 1}) .sort-arrow`);
    if (currentArrow) {
        currentArrow.textContent = summarySortDirection === 'asc' ? '↑' : '↓';
    }
    
    populateSummaryTable();
}

// Update summary pagination
function updateSummaryPagination() {
    const totalItems = summaryData.length;
    const totalPages = Math.ceil(totalItems / summaryPageSize);
    const paginationDiv = document.getElementById('summaryPagination');
    
    let paginationHTML = '';
    
    // Previous button
    if (summaryCurrentPage > 1) {
        paginationHTML += `<button onclick="changeSummaryPage(${summaryCurrentPage - 1})" style="margin-right: 0.5rem; padding: 0.3rem 0.6rem; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer;">Previous</button>`;
    }
    
    // Page numbers
    const startPage = Math.max(1, summaryCurrentPage - 2);
    const endPage = Math.min(totalPages, summaryCurrentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
        const isActive = i === summaryCurrentPage ? 'background: var(--primary-purple); color: white;' : 'background: white; color: var(--text-dark);';
        paginationHTML += `<button onclick="changeSummaryPage(${i})" style="margin: 0 0.2rem; padding: 0.3rem 0.6rem; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; ${isActive}">${i}</button>`;
    }
    
    // Next button
    if (summaryCurrentPage < totalPages) {
        paginationHTML += `<button onclick="changeSummaryPage(${summaryCurrentPage + 1})" style="margin-left: 0.5rem; padding: 0.3rem 0.6rem; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer;">Next</button>`;
    }
    
    paginationHTML += `<span style="margin-left: 1rem;">Showing ${((summaryCurrentPage - 1) * summaryPageSize) + 1}-${Math.min(summaryCurrentPage * summaryPageSize, totalItems)} of ${totalItems} entries</span>`;
    
    paginationDiv.innerHTML = paginationHTML;
}

// Change summary page
function changeSummaryPage(page) {
    summaryCurrentPage = page;
    populateSummaryTable();
}

// Change summary page size
function changeSummaryPageSize() {
    summaryPageSize = parseInt(document.getElementById('summaryShowSelect').value);
    summaryCurrentPage = 1;
    populateSummaryTable();
}

// Export summary data
function exportSummaryData() {
    const headers = ['City (DMA)', 'Population', 'Gen Z Females', 'Concentration %', 'Index', 'Age 15-19 %', 'Age 20-24 %', 'Age 25-29 %'];
    const csvContent = [
        headers.join(','),
        ...summaryData.map(item => [
            `"${item.dma}"`,
            item.population,
            item.genZFemales,
            item.concentration.toFixed(2),
            item.index.toFixed(1),
            item.age15_19.toFixed(1),
            item.age20_24.toFixed(1),
            item.age25_29.toFixed(1)
        ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'city_summary_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Export functions
function clearFilters() {
    document.getElementById('dmaFilter').value = '';
    document.getElementById('indexFilter').value = '';
    document.getElementById('populationFilter').value = '';
    document.getElementById('zipSearch').value = '';
    applyFilters();
}

function exportData() {
    exportToCSV(currentData, 'all_genz_data.csv');
}

function exportFilteredData() {
    exportToCSV(filteredData, 'filtered_genz_data.csv');
}

function exportTopPerformers() {
    const topPerformers = filteredData
        .filter(item => item.index >= 120)
        .sort((a, b) => b.index - a.index)
        .slice(0, 50);
    exportToCSV(topPerformers, 'top_performers_genz_data.csv');
}

function exportToCSV(data, filename) {
    if (data.length === 0) {
        alert('No data to export');
        return;
    }
    
    // Create CSV headers
    const headers = [
        'City (DMA)',
        'ZIP Code', 
        'Region',
        'Population',
        'Gen Z Females',
        'Concentration %',
        'Index',
        'Age 15-19 %',
        'Age 20-24 %',
        'Age 25-29 %'
    ];
    
    // Create CSV content
    let csvContent = headers.join(',') + '\n';
    
    data.forEach(item => {
        const row = [
            `"${item.dma}"`,
            item.zip,
            `"${item.region}"`,
            item.population,
            item.genZFemales,
            item.concentration.toFixed(2),
            item.index.toFixed(1),
            item.age15_19.toFixed(1),
            item.age20_24.toFixed(1),
            item.age25_29.toFixed(1)
        ];
        csvContent += row.join(',') + '\n';
    });
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function generateSummary() {
    const totalZips = filteredData.length;
    const totalPopulation = filteredData.reduce((sum, item) => sum + item.population, 0);
    const totalGenZ = filteredData.reduce((sum, item) => sum + item.genZFemales, 0);
    const totalIndex = filteredData.reduce((sum, item) => sum + item.index, 0);
    const highPerformers = filteredData.filter(item => item.index >= 120).length;
    const uniqueCities = [...new Set(filteredData.map(item => item.dma))].length;
    const uniqueRegions = [...new Set(filteredData.map(item => item.region))].length;
    
    const summary = `
GEN Z FEMALE POPULATION ANALYSIS SUMMARY
========================================

Dataset Overview:
- Total ZIP Codes Analyzed: ${Math.round(totalZips).toLocaleString()}
- Total Population: ${totalPopulation >= 1000000 ? (totalPopulation / 1000000).toFixed(1) + 'M' : Math.round(totalPopulation / 1000) + 'K'}
- Total Gen Z Females: ${totalGenZ >= 1000000 ? (totalGenZ / 1000000).toFixed(1) + 'M' : Math.round(totalGenZ / 1000) + 'K'}
- Total Gen Z Index: ${totalIndex.toFixed(1)}
- High Performers (Index ≥120): ${highPerformers}
- Cities Covered: ${uniqueCities}
- Regions Covered: ${uniqueRegions}

Top Performing Cities:
${filteredData
    .reduce((acc, item) => {
        const existing = acc.find(city => city.dma === item.dma);
        if (existing) {
            existing.totalPopulation += item.population;
            existing.totalGenZ += item.genZFemales;
            existing.zipCount++;
        } else {
            acc.push({
                dma: item.dma,
                totalPopulation: item.population,
                totalGenZ: item.genZFemales,
                zipCount: 1
            });
        }
        return acc;
    }, [])
    .map(city => ({
        ...city,
        concentration: (city.totalGenZ / city.totalPopulation) * 100,
        index: ((city.totalGenZ / city.totalPopulation) / 0.096) * 100
    }))
    .sort((a, b) => b.index - a.index)
    .slice(0, 10)
    .map((city, i) => `${i + 1}. ${city.dma}: Index ${city.index.toFixed(1)} (${city.zipCount} ZIP codes)`)
    .join('\n')}

Regional Distribution:
${filteredData
    .reduce((acc, item) => {
        const existing = acc.find(region => region.region === item.region);
        if (existing) {
            existing.totalPopulation += item.population;
            existing.totalGenZ += item.genZFemales;
            existing.zipCount++;
        } else {
            acc.push({
                region: item.region,
                totalPopulation: item.population,
                totalGenZ: item.genZFemales,
                zipCount: 1
            });
        }
        return acc;
    }, [])
    .map(region => ({
        ...region,
        concentration: (region.totalGenZ / region.totalPopulation) * 100,
        index: ((region.totalGenZ / region.totalPopulation) / 0.096) * 100
    }))
    .sort((a, b) => b.index - a.index)
    .map(region => `${region.region}: Index ${region.index.toFixed(1)} (${region.zipCount} ZIP codes)`)
    .join('\n')}

Generated on: ${new Date().toLocaleString()}
    `;
    
    // Create and download summary file
    const blob = new Blob([summary], { type: 'text/plain;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'genz_analysis_summary.txt');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function changePageSize() {
    console.log('Page size changed');
    // Implementation would change the number of rows displayed
}

function sortTable(columnIndex) {
    if (sortColumn === columnIndex) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn = columnIndex;
        sortDirection = 'desc';
    }
    populateDataTable();
}

function goToPage(page) {
    currentPage = page;
    populateDataTable();
}

function changePageSize() {
    pageSize = parseInt(document.getElementById('pageSize').value);
    currentPage = 1;
    populateDataTable();
}

// ===== CULTURAL PATTERNS CHART FUNCTIONS =====

function createUniversityPatternsChart() {
    const ctx = document.getElementById('universityPatternsChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['University Cities', 'Non-University Cities'],
            datasets: [{
                label: 'Average Gen Z Index',
                data: [115.2, 98.7],
                backgroundColor: ['#B19CD9', '#E6E6FA'],
                borderColor: ['#9370DB', '#B19CD9'],
                borderWidth: 2,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 120,
                    grid: {
                        color: '#E6E6FA'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function createRegionalPatternsChart() {
    const ctx = document.getElementById('regionalPatternsChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mountain West', 'Texas', 'Florida', 'West Coast', 'Southeast', 'New York', 'Ohio', 'Pennsylvania'],
            datasets: [{
                label: 'Average Gen Z Index',
                data: [118.7, 112.3, 108.9, 105.2, 102.1, 100.0, 98.7, 96.4],
                backgroundColor: 'rgba(177, 156, 217, 0.8)',
                borderColor: '#B19CD9',
                borderWidth: 2,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 125,
                    grid: {
                        color: '#E6E6FA'
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        font: {
                            size: 10
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function createAgeCulturalChart() {
    const ctx = document.getElementById('ageCulturalChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Age 15-19', 'Age 20-24', 'Age 25-29'],
            datasets: [{
                label: 'Correlation with Gen Z Index',
                data: [-0.306, 0.622, -0.363],
                backgroundColor: ['#E6E6FA', '#B19CD9', '#E6E6FA'],
                borderColor: ['#B19CD9', '#9370DB', '#B19CD9'],
                borderWidth: 2,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    min: -0.5,
                    max: 0.7,
                    grid: {
                        color: '#E6E6FA'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function createMarketSizeCulturalChart() {
    const ctx = document.getElementById('marketSizeCulturalChart').getContext('2d');
    
    const marketData = [
        { x: 109697, y: 129.0, label: 'Mankato (Small)', category: 'Small University' },
        { x: 328087, y: 156.3, label: 'Gainesville (Medium)', category: 'Medium University' },
        { x: 1184360, y: 129.1, label: 'Waco-Temple-Bryan (Large)', category: 'Large University' },
        { x: 20000000, y: 100.0, label: 'New York (Mega)', category: 'Mega Metro' },
        { x: 15000000, y: 98.7, label: 'Los Angeles (Mega)', category: 'Mega Metro' },
        { x: 8000000, y: 102.1, label: 'Chicago (Large)', category: 'Large Metro' },
        { x: 5000000, y: 105.2, label: 'San Francisco (Large)', category: 'Large Metro' }
    ];
    
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Market Size vs Gen Z Index',
                data: marketData,
                backgroundColor: 'rgba(177, 156, 217, 0.6)',
                borderColor: '#B19CD9',
                borderWidth: 2,
                pointRadius: 8,
                pointHoverRadius: 12
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            return context[0].raw.label;
                        },
                        label: function(context) {
                            return [
                                `Population: ${Math.round(context.raw.x).toLocaleString()}`,
                                `Gen Z Index: ${context.raw.y}`,
                                `Category: ${context.raw.category}`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'logarithmic',
                    title: {
                        display: true,
                        text: 'Population (Log Scale)',
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    },
                    grid: {
                        color: '#E6E6FA'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Gen Z Index',
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    },
                    grid: {
                        color: '#E6E6FA'
                    }
                }
            }
        }
    });
}
