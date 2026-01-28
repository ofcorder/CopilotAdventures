// Cámara de Ecos - Servidor Web
// Interfaz web interactiva para la predicción de secuencias de números

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Clase CamaraDeEcos (lógica principal)
class CamaraDeEcos {
  constructor() {
    this.recuerdos = [];
    this.tituloCamara = '✨ Cámara de Ecos de Numeria ✨';
  }

  validarSecuencia(secuencia) {
    if (!Array.isArray(secuencia) || secuencia.length === 0) {
      return { valida: false, error: 'La secuencia debe ser un array no vacío' };
    }

    if (secuencia.length === 1) {
      return { valida: false, error: 'Se necesitan al menos 2 números para identificar un patrón' };
    }

    // Verificar que todos los elementos sean números
    if (!secuencia.every(num => typeof num === 'number' && !isNaN(num))) {
      return { valida: false, error: 'Todos los elementos deben ser números válidos' };
    }

    // Calcular diferencias entre números consecutivos
    const diferencias = [];
    for (let i = 1; i < secuencia.length; i++) {
      diferencias.push(secuencia[i] - secuencia[i - 1]);
    }

    // Verificar si todas las diferencias son iguales (progresión aritmética)
    const diferenciasUniformes = diferencias.every(d => d === diferencias[0]);

    if (!diferenciasUniformes) {
      return { valida: false, error: 'No es una progresión aritmética. Las diferencias no son uniformes.' };
    }

    return { valida: true, diferencias: diferencias[0] };
  }

  predecirSiguienteNumero(secuencia) {
    const validacion = this.validarSecuencia(secuencia);

    if (!validacion.valida) {
      return { exito: false, error: validacion.error };
    }

    const diferenciaComun = validacion.diferencias;
    const ultimoNumero = secuencia[secuencia.length - 1];
    const siguienteNumero = ultimoNumero + diferenciaComun;

    const prediccion = {
      secuencia,
      diferenciaComun,
      prediccion: siguienteNumero,
      timestamp: new Date().toLocaleString('es-ES')
    };

    // Almacenar en recuerdos
    this.recuerdos.push(prediccion);

    return {
      exito: true,
      secuencia,
      diferenciaComun,
      prediccion: siguienteNumero,
      conteoRecuerdos: this.recuerdos.length
    };
  }

  obtenerRecuerdos() {
    return {
      cantidad: this.recuerdos.length,
      recuerdos: this.recuerdos
    };
  }

  limpiarRecuerdos() {
    const cantidad = this.recuerdos.length;
    this.recuerdos = [];
    return { mensaje: `Se eliminaron ${cantidad} recuerdos`, cantidadEliminada: cantidad };
  }

  obtenerConteoDeRecuerdos() {
    return this.recuerdos.length;
  }
}

// Instancia global
const camara = new CamaraDeEcos();

// Rutas API

// GET - Obtener estado inicial
app.get('/api/status', (req, res) => {
  res.json({
    estado: 'conectado',
    titulo: camara.tituloCamara,
    recuerdos: camara.obtenerConteoDeRecuerdos(),
    version: '1.0.0'
  });
});

// POST - Predecir siguiente número
app.post('/api/predecir', (req, res) => {
  const { secuencia } = req.body;

  if (!secuencia) {
    return res.status(400).json({
      exito: false,
      error: 'Se requiere una secuencia de números'
    });
  }

  const resultado = camara.predecirSiguienteNumero(secuencia);
  res.json(resultado);
});

// GET - Obtener todos los recuerdos
app.get('/api/recuerdos', (req, res) => {
  const datos = camara.obtenerRecuerdos();
  res.json(datos);
});

// POST - Limpiar recuerdos
app.post('/api/limpiar', (req, res) => {
  const resultado = camara.limpiarRecuerdos();
  res.json(resultado);
});

// GET - Validar secuencia (sin almacenar)
app.post('/api/validar', (req, res) => {
  const { secuencia } = req.body;

  if (!secuencia) {
    return res.status(400).json({
      valida: false,
      error: 'Se requiere una secuencia'
    });
  }

  const validacion = camara.validarSecuencia(secuencia);
  res.json(validacion);
});

// GET - Obtener ejemplos de prueba
app.get('/api/ejemplos', (req, res) => {
  const ejemplos = [
    { nombre: 'Secuencia básica', secuencia: [3, 6, 9, 12], esperado: 15 },
    { nombre: 'Números pares', secuencia: [2, 4, 6, 8, 10], esperado: 12 },
    { nombre: 'Secuencia decreciente', secuencia: [20, 15, 10, 5], esperado: 0 },
    { nombre: 'Números grandes', secuencia: [100, 200, 300, 400], esperado: 500 },
    { nombre: 'Números negativos', secuencia: [-10, -5, 0, 5, 10], esperado: 15 },
    { nombre: 'Diferencia de 1', secuencia: [5, 6, 7, 8], esperado: 9 },
    { nombre: 'Solo dos números', secuencia: [5, 10], esperado: 15 },
    { nombre: 'Números iguales', secuencia: [7, 7, 7, 7], esperado: 7 }
  ];
  res.json(ejemplos);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                                                            ║');
  console.log('║      🌐 SERVIDOR WEB - CÁMARA DE ECOS INICIADO 🌐         ║');
  console.log('║                                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
  console.log('');
  console.log('📡 Endpoints disponibles:');
  console.log('   GET  /api/status       - Estado del servidor');
  console.log('   POST /api/predecir     - Predecir siguiente número');
  console.log('   GET  /api/recuerdos    - Obtener todos los recuerdos');
  console.log('   POST /api/limpiar      - Limpiar recuerdos');
  console.log('   POST /api/validar      - Validar secuencia');
  console.log('   GET  /api/ejemplos     - Obtener ejemplos de prueba');
  console.log('');
  console.log('🌐 Abre tu navegador en: http://localhost:3000');
  console.log('');
});
