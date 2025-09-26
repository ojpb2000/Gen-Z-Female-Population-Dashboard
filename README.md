# Gen Z Female Population Dashboard

A comprehensive interactive dashboard analyzing Gen Z female population distribution across US ZIP codes and DMAs (Designated Market Areas).

## 🎯 Overview

This dashboard provides deep insights into Gen Z female demographics, concentration patterns, and market opportunities across the United States. Built with real population data from 29,381 ZIP codes across 210 DMAs.

## 📊 Features

### **National Landscape**
- National benchmark analysis
- Total population and Gen Z female statistics
- High-performing market identification
- Interactive charts and visualizations

### **Concentration Champions**
- Top-performing cities by Gen Z concentration
- University city analysis
- Market opportunity matrix
- Performance benchmarking

### **Data Explorer**
- Interactive ZIP code exploration
- City summary tables
- Advanced filtering and sorting
- Export capabilities

### **Age Divide Analysis**
- Age distribution patterns (15-19, 20-24, 25-29)
- Regional age variations
- Demographic insights

### **Cultural Patterns**
- University vs non-university city performance
- Cultural demographic analysis
- Pattern identification

## 🚀 Live Demo

Visit the live dashboard: [https://ojpb2000.github.io/Gen-Z-Female-Population-Dashboard/](https://ojpb2000.github.io/Gen-Z-Female-Population-Dashboard/)

## 📈 Key Insights

- **210 DMAs** analyzed across the United States
- **29,381 ZIP codes** with detailed population data
- **32.4M Gen Z females** nationwide
- **8.41%** national benchmark for Gen Z female concentration
- **Gainesville, FL** leads with highest concentration (15.01%)

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js
- **Data Processing**: Custom CSV processing
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
├── index.html              # Main dashboard page
├── assets/
│   ├── css/
│   │   └── styles.css      # Dashboard styling
│   └── js/
│       ├── main.js         # Core dashboard functionality
│       └── csv-loader.js   # Data loading and processing
├── data/
│   └── Female _GenZ_Populations.csv  # Source data
└── README.md               # Project documentation
```

## 🔧 Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/ojpb2000/Gen-Z-Female-Population-Dashboard.git
   cd Gen-Z-Female-Population-Dashboard
   ```

2. **Start a local server**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000`

## 📊 Data Sources

- **Population Data**: US Census and demographic data
- **DMA Definitions**: Nielsen Designated Market Areas
- **ZIP Code Mapping**: US Postal Service data

## 🎨 Dashboard Features

### Interactive Elements
- **Filtering**: By DMA, population range, index range
- **Sorting**: All tables support multi-column sorting
- **Search**: ZIP code search functionality
- **Export**: CSV export for filtered data

### Visualizations
- **Doughnut Charts**: Population distribution
- **Bar Charts**: Top performing cities
- **Scatter Plots**: Population vs concentration analysis
- **KPI Cards**: Key performance indicators

## 📈 Methodology

The dashboard uses a sophisticated indexing system:

```
Index = (City Gen Z % / National Benchmark %) × 100
```

Where:
- **National Benchmark**: 8.41% Gen Z female concentration
- **Index 100**: Average performance
- **Index >120**: High-potential markets
- **Index <90**: Below-average markets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **GitHub**: [@ojpb2000](https://github.com/ojpb2000)
- **Project Link**: [https://github.com/ojpb2000/Gen-Z-Female-Population-Dashboard](https://github.com/ojpb2000/Gen-Z-Female-Population-Dashboard)

## 🙏 Acknowledgments

- US Census Bureau for population data
- Nielsen for DMA definitions
- Chart.js for visualization capabilities
- GitHub for hosting and deployment

---

**Built with ❤️ for data-driven insights into Gen Z demographics**