# 💰 Conversor de Monedas Nacional

Este proyecto es una aplicación web que permite convertir montos de **Pesos Chilenos (CLP)** a otras divisas internacionales (Dólar, Euro, etc.) en tiempo real. Además, visualiza el historial de valor de la moneda seleccionada durante los últimos 10 días.

Proyecto desarrollado como parte del desafío "Conversor de Monedas" de la Academia Desafío Latam.

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructura semántica del contenido.
* **CSS3:** Estilizado de la interfaz (Diseño Dark Mode).
* **JavaScript (ES6+):** Lógica del negocio y manipulación del DOM.
* **Chart.js:** Librería externa para la renderización de gráficos dinámicos.
* **API mindicador.cl:** Fuente de datos para los tipos de cambio en tiempo real.

## 🚀 Características Principales

1.  **Consumo de API REST:**
    * Implementación de `fetch` con sintaxis `async/await` para obtener datos asíncronos.
    * Manejo de errores mediante bloques `try/catch` para informar al usuario si la conexión falla (mensaje en el DOM).

2.  **Cálculo Dinámico:**
    * Conversión matemática precisa basada en el valor actual de la moneda seleccionada.

3.  **Visualización de Datos:**
    * Integración de **Chart.js** para renderizar un gráfico de línea.
    * Muestra la variación del valor de la moneda en los últimos 10 días.
    * Actualización automática del gráfico al realizar una nueva búsqueda (destrucción y recreación del canvas).

4.  **Interfaz de Usuario:**
    * Diseño limpio y centrado.
    * Validación de inputs (monto y selección de moneda).

## 📂 Estructura de Archivos

```text
├── index.html      # Estructura principal y carga de librerías
├── style.css       # Estilos visuales
├── script.js       # Lógica de fetch, cálculo y configuración del gráfico
└── README.md       # Documentación del proyecto
