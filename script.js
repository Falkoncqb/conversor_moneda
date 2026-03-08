// Referencias a los elementos del DOM
const inputMonto = document.getElementById('montoCLP');
const selectMoneda = document.getElementById('moneda');
const btnBuscar = document.getElementById('btnBuscar');
const resultadoDiv = document.getElementById('resultado');
const errorDiv = document.getElementById('error');
const canvas = document.getElementById('myChart');

let myChart = null; // Variable para destruir el gráfico anterior si existe

// Función principal que se ejecuta al hacer click
btnBuscar.addEventListener('click', async () => {
    const monto = inputMonto.value;
    const moneda = selectMoneda.value;

    // Validación básica
    if (!monto || !moneda) {
        alert('debes ingresar una cifra y seleccionar la moneda a convertir !!!');
        return;
    }

    try {
        // Limpiamos errores previos
        errorDiv.innerHTML = '';
        resultadoDiv.innerHTML = 'Cargando...';

        // 1. Obtener datos de la API (Requerimiento 1 y 4) [cite: 50, 53]
        const datos = await obtenerDatosMoneda(moneda);
        
        // 2. Calcular y mostrar resultado (Requerimiento 2) 
        // La API devuelve una serie, el índice 0 es el valor más actual
        const valorActual = datos.serie[0].valor;
        const resultado = (monto / valorActual).toFixed(2);
        
        resultadoDiv.innerHTML = `Resultado: $${resultado}`;

        // 3. Renderizar gráfico de los últimos 10 días (Requerimiento 5) 
        renderizarGrafico(datos.serie);

    } catch (e) {
        // Mostrar error en el DOM (Requerimiento 4) 
        errorDiv.innerHTML = `Error al obtener datos: ${e.message}`;
        resultadoDiv.innerHTML = '...';
    }
});

// Función para hacer el fetch a la API
async function obtenerDatosMoneda(moneda) {
    const url = `https://mindicador.cl/api/${moneda}`;
    const res = await fetch(url);
    
    if (!res.ok) {
        throw new Error("No se pudo conectar con la API");
    }
    
    const data = await res.json();
    return data;
}

// Función para preparar y mostrar el gráfico
function renderizarGrafico(serie) {
    // Tomamos solo los últimos 10 registros [cite: 36]
    const ultimos10 = serie.slice(0, 10).reverse(); // Reverse para que el gráfico vaya de izq a der cronológicamente

    // Preparamos los arrays para Chart.js
    const labels = ultimos10.map(item => item.fecha.substring(0, 10)); // Cortamos la fecha para que se vea limpia
    const valores = ultimos10.map(item => item.valor);

    // Destruir gráfico anterior si existe para evitar superposición
    if (myChart) {
        myChart.destroy();
    }

    // Configuración de Chart.js
    myChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Historial últimos 10 días`,
                data: valores,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: 'black' // Color del texto de la leyenda
                    }
                }
            }
        }
    });
}