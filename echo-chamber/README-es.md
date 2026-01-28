# 🔮 Cámara de Ecos: Un Predictor Mágico de Secuencias de Números

¡Bienvenido a la Cámara de Ecos de Numeria! Esta aplicación demuestra la predicción de secuencias utilizando progresiones aritméticas en un entorno interactivo con temática de fantasía. La aplicación enseña algoritmos principales como el reconocimiento de patrones y secuencias matemáticas mientras mantiene una narrativa atractiva.

## 📖 Descripción General

La Cámara de Ecos es un lugar encantado donde los antiguos patrones numéricos resuenan a través de sus salones místicos. Tu misión es:

1. **Descubre el Patrón** - Identifica la diferencia común en las progresiones aritméticas
2. **Predice el Futuro** - Calcula el siguiente número en la secuencia
3. **Almacena Recuerdos** - Archiva todas las predicciones en la memoria eterna de la cámara
4. **Domina Secuencias** - Prueba tus habilidades con múltiples patrones

### ¿Qué es una Progresión Aritmética?

Una progresión aritmética es una secuencia donde la diferencia entre números consecutivos es constante. Por ejemplo:
- `[3, 6, 9, 12, ...]` tiene una diferencia común de **3**
- `[20, 15, 10, 5, ...]` tiene una diferencia común de **-5**
- `[5, 10, 15, 20, ...]` tiene una diferencia común de **5**

## 🚀 Inicio Rápido

### Requisitos Previos

- **Node.js** (para ejecutar `index.js`)
- **Python 3.x** (para ejecutar las pruebas o usar la versión de Python)

### Ejecutar la Aplicación (JavaScript)

```bash
cd echo-chamber
node index.js
```

Esto lanza una aplicación interactiva donde puedes:
- Predecir el siguiente número en secuencias
- Ver recuerdos almacenados
- Ejecutar pruebas automatizadas
- Limpiar la memoria
- Ver datos de ejemplo
- Explorar patrones interactivamente

### Ejecutar la Suite de Pruebas

**Usando Python** (recomendado - no requiere Node.js):
```bash
cd echo-chamber
python3 test.py
```

**Usando Node.js**:
```bash
cd echo-chamber
node test.js
```

## 📁 Estructura del Proyecto

```
echo-chamber/
├── index.js              # Aplicación principal interactiva (JavaScript)
├── index-en.js           # Versión en inglés (disponible)
├── test.js               # Suite de pruebas (versión en español)
├── test.py               # Suite de pruebas (versión Python en español)
├── test_spanish.js       # Suite de pruebas (copia en español)
├── test-es.js            # Suite de pruebas alternativa
├── README.md             # Este archivo de documentación
├── README-en.md          # Documentación en inglés (disponible)
└── other files...        # Archivos de documentación adicionales
```

## 🎯 Características Principales

### 1. Validación de Secuencias

La aplicación valida que las secuencias de entrada sean progresiones aritméticas válidas:

```javascript
const camara = new CamaraDeEcos();
const resultado = camara.validarSecuencia([3, 6, 9, 12]);
// Retorna: { esValida: true, diferenciaComun: 3, ... }
```

**Controles de Validación:**
- ✅ La entrada debe ser un array
- ✅ Se requiere un mínimo de 2 números
- ✅ Todos los elementos deben ser números
- ✅ Las diferencias entre números consecutivos deben ser iguales

### 2. Predicción de Números

Predice el siguiente número basándote en la diferencia común:

```javascript
const resultado = camara.predecirSiguienteNumero([3, 6, 9, 12]);
// Retorna: { 
//   exito: true, 
//   prediccion: 15, 
//   diferenciaComun: 3, 
//   mensaje: "🔮 El siguiente número en la secuencia es: 15" 
// }
```

### 3. Gestión de Memoria

Almacena y recupera predicciones anteriores:

```javascript
camara.mostrarRecuerdos();           // Mostrar todos los ecos almacenados
camara.obtenerConteoDeRecuerdos();   // Obtener número de predicciones
camara.limpiarRecuerdos();           // Limpiar toda la memoria
```

### 4. Manejo de Errores

Manejo exhaustivo de errores para entradas inválidas:

```javascript
// Progresión no aritmética
const resultado = camara.predecirSiguienteNumero([1, 2, 4, 8]);
// Retorna: { 
//   exito: false, 
//   error: "No es una progresión aritmética..." 
// }
```

## 🧪 Cobertura de Pruebas

La aplicación incluye suites de pruebas exhaustivas con **100% de tasa de éxito**:

### Pruebas Funcionales (8 pruebas)
- ✅ Progresión aritmética básica (muestra: [3, 6, 9, 12])
- ✅ Patrón de números pares
- ✅ Secuencia decreciente
- ✅ Números grandes
- ✅ Números negativos
- ✅ Diferencia única de 1
- ✅ Solo dos números
- ✅ Todos los números iguales (diferencia de 0)

### Pruebas de Manejo de Errores (4 pruebas)
- ✅ Secuencias no aritméticas (rechazadas correctamente)
- ✅ Entrada de número único (rechazada correctamente)
- ✅ Secuencias vacías (rechazadas correctamente)
- ✅ Progresiones mixtas (rechazadas correctamente)

### Pruebas de Memoria (1 prueba)
- ✅ Almacenamiento y recuperación de memoria

**Resumen de Resultados de Pruebas:**
```
Total de Pruebas: 13
Pruebas Aprobadas: 13
Pruebas Fallidas: 0
Tasa de Éxito: 100.00%
```

## 💻 Referencia de API

### Clase CamaraDeEcos

#### Constructor
```javascript
const camara = new CamaraDeEcos();
```

#### Métodos

##### `validarSecuencia(secuencia)`
Valida si una secuencia es una progresión aritmética.

**Parámetros:**
- `secuencia` (Array): Lista de números a validar

**Retorna:**
- `esValida` (boolean): Si la secuencia es válida
- `mensaje` (string): Mensaje de validación
- `diferenciaComun` (number): La diferencia constante (si es válida)
- `diferencias` (Array): Todas las diferencias calculadas (si es válida)

**Ejemplo:**
```javascript
const resultado = camara.validarSecuencia([2, 4, 6, 8]);
console.log(resultado.diferenciaComun); // 2
```

##### `predecirSiguienteNumero(secuencia)`
Predice el siguiente número en una secuencia aritmética.

**Parámetros:**
- `secuencia` (Array): La secuencia de la que predecir

**Retorna:**
- `exito` (boolean): Si la predicción fue exitosa
- `prediccion` (number): El siguiente número predicho
- `diferenciaComun` (number): La diferencia constante
- `mensaje` (string): Mensaje de éxito

**Ejemplo:**
```javascript
const resultado = camara.predecirSiguienteNumero([5, 10, 15, 20]);
console.log(resultado.prediccion); // 25
```

##### `mostrarRecuerdos()`
Muestra todos los ecos almacenados (predicciones) en un formato de tabla.

**Ejemplo:**
```javascript
camara.mostrarRecuerdos();
// Salida:
// 📜 RECUERDOS DE LA CÁMARA DE ECOS:
// Eco #1: [3, 6, 9, 12] → 15 (dif: 3)
```

##### `limpiarRecuerdos()`
Limpia todos los recuerdos almacenados de la cámara.

**Ejemplo:**
```javascript
camara.limpiarRecuerdos();
// Salida: 🧹 Todos los recuerdos han sido eliminados...
```

##### `obtenerConteoDeRecuerdos()`
Retorna el número de recuerdos almacenados.

**Retorna:**
- (number): Número de ecos almacenados

**Ejemplo:**
```javascript
const conteo = camara.obtenerConteoDeRecuerdos(); // 8
```

## 📊 Datos de Muestra

### Secuencias de Ejemplo para Probar

| Secuencia | Diferencia Común | Siguiente Número |
|-----------|-----------------|-----------------|
| [3, 6, 9, 12] | 3 | 15 |
| [2, 4, 6, 8, 10] | 2 | 12 |
| [50, 45, 40, 35] | -5 | 30 |
| [1, 2, 3, 4, 5] | 1 | 6 |
| [-10, -5, 0, 5, 10] | 5 | 15 |
| [100, 200, 300, 400] | 100 | 500 |

## 🎮 Guía del Modo Interactivo

Cuando ejecutas `node index.js`, encontrarás este menú:

```
📋 ¿QUÉ TE GUSTARÍA HACER?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. 🔮 Predecir el siguiente número en una secuencia
2. 📜 Ver todos los recuerdos (ecos anteriores)
3. 🧪 Ejecutar casos de prueba automatizados
4. 🧹 Limpiar todos los recuerdos
5. 📚 Ver datos de prueba de muestra
6. ❌ Salir de la Cámara de Ecos
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Opciones del Menú

**Opción 1: Predecir Siguiente Número**
- Ingresa una secuencia como números separados por comas: `3, 6, 9, 12`
- La aplicación calcula y muestra el siguiente número: `15`
- La predicción se almacena en la memoria

**Opción 2: Ver Recuerdos**
- Muestra todas las predicciones almacenadas previamente
- Muestra secuencia, diferencia común y valor predicho
- Incluye marca de tiempo para cada eco

**Opción 3: Ejecutar Pruebas Automatizadas**
- Ejecuta los 13 casos de prueba
- Muestra estado de aprobación/fallo para cada prueba
- Muestra tasa de éxito general
- Demuestra varios patrones de secuencias

**Opción 4: Limpiar Recuerdos**
- Elimina todos los ecos almacenados de la cámara
- Confirma la eliminación exitosa

**Opción 5: Ver Datos de Muestra**
- Muestra secuencias de ejemplo que puedes probar
- Muestra resultados esperados para aprender

**Opción 6: Salir**
- Cierra la aplicación correctamente
- Muestra mensaje de despedida

## 🏗️ Detalles de Implementación

### Arquitectura

La aplicación sigue principios de diseño orientado a objetos:

1. **Clase CamaraDeEcos** - Lógica principal para validación y predicción de secuencias
2. **Capa de Validación** - Asegura integridad de datos antes del procesamiento
3. **Sistema de Memoria** - Almacena todas las predicciones exitosas con marcas de tiempo
4. **Manejo de Errores** - Mensajes de error exhaustivos para guía del usuario
5. **Capa de Interfaz** - Interfaz de consola amigable con retroalimentación visual

### Explicación del Algoritmo

**Fórmula de Progresión Aritmética:**
```
Siguiente Número = Último Número + Diferencia Común

Donde:
Diferencia Común = Cualquier Número - Número Anterior
(verificado para ser constante en toda la secuencia)
```

**Proceso de Validación:**
```
1. Verificar que la entrada sea un array con ≥ 2 elementos
2. Verificar que todos los elementos sean números
3. Calcular diferencias entre números consecutivos
4. Verificar que todas las diferencias sean iguales
5. Si es válida, retornar diferencia común
6. Si es inválida, retornar mensaje de error
```

### Características de Rendimiento

- **Complejidad de Tiempo:** O(n) donde n es la longitud de la secuencia
  - La validación requiere verificar todas las diferencias una vez
  - La predicción es O(1) después de la validación
  
- **Complejidad de Espacio:** O(n)
  - Almacena cada predicción en array de memoria
  - Se crea array de diferencias durante validación

## 🐛 Ejemplos de Manejo de Errores

### Entradas Inválidas

```javascript
// Secuencia no aritmética
camara.predecirSiguienteNumero([1, 2, 4, 8])
// ❌ Error: No es una progresión aritmética. Las diferencias son: [1, 2, 4]

// Número único
camara.predecirSiguienteNumero([5])
// ❌ Error: La secuencia debe contener al menos 2 números.

// Secuencia vacía
camara.predecirSiguienteNumero([])
// ❌ Error: La secuencia debe contener al menos 2 números.

// Progresión mixta
camara.predecirSiguienteNumero([1, 3, 5, 8])
// ❌ Error: No es una progresión aritmética. Las diferencias son: [2, 2, 3]
```

## 📚 Resultados de Aprendizaje

Al explorar la Cámara de Ecos, aprenderás:

1. **Diseño de Algoritmos** - Cómo validar datos y manejar errores
2. **Reconocimiento de Patrones** - Identificar secuencias matemáticas
3. **Estructuras de Datos** - Trabajar con arrays y objetos
4. **Lógica de Validación** - Sanitización de entrada y verificación
5. **Diseño de Interfaz de Usuario** - Crear aplicaciones basadas en consola
6. **Pruebas** - Desarrollo de suites de pruebas exhaustivas

## 🎓 Aplicaciones Educativas

### Para Estudiantes
- Aprender progresiones aritméticas de manera interactiva
- Entender patrones de diseño de algoritmos
- Practicar manejo de errores en código
- Explorar desarrollo dirigido por pruebas

### Para Educadores
- Herramienta interactiva para enseñar secuencias
- Casos de prueba personalizables para uso en clase
- Ejemplos de código claros con comentarios
- Narrativa temática atractiva

## 🔧 Extendiendo la Aplicación

### Agregar Nuevas Características

1. **Soporte para Progresiones Geométricas**
   - Modificar validación para verificar razón constante
   - Actualizar fórmula de predicción

2. **Análisis de Secuencias**
   - Calcular suma de n términos
   - Encontrar términos en posiciones específicas
   - Identificar tipo de secuencia

3. **Exportación de Datos**
   - Guardar recuerdos en archivo
   - Exportar resultados como JSON/CSV

4. **Niveles de Dificultad**
   - Ocultar respuestas en niveles avanzados
   - Desafíos cronometrados
   - Sistema de clasificación

## 📋 Solución de Problemas

### La aplicación no inicia (versión Node.js)
- Verifica que Node.js esté instalado: `node --version`
- Verifica permisos del archivo: `chmod +x index.js`

### Problemas con versión Python
- Verifica Python 3: `python3 --version`
- Usa Python 3.6+ para mejor compatibilidad

### Las pruebas fallan
- Asegúrate que todos los archivos estén en el mismo directorio
- Verifica espacios en blanco o problemas de fin de línea
- Verifica compatibilidad de versión de Node.js o Python

## 📞 Soporte

Para problemas o preguntas:
1. Revisa la salida de las pruebas para mensajes de error detallados
2. Consulta la sección de Referencia de API
3. Examina datos de muestra y ejemplos
4. Ejecuta la suite de pruebas para verificar funcionalidad

## 📄 Licencia

La aplicación Cámara de Ecos es parte del proyecto educativo CopilotAdventures. Consulta el LICENCIA principal del repositorio para detalles.

## 🙏 Agradecimientos

La Cámara de Ecos se inspira en:
- Progresiones aritméticas matemáticas clásicas
- Ficción interactiva y mundos de fantasía
- Marcos de programación educativa
- Diseño de aplicaciones basadas en consola

---

**¡Que los patrones guíen tu viaje matemático a través de la Cámara de Ecos de Numeria!** ✨🔮
