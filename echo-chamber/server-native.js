// Cámara de Ecos - Servidor Web Nativo (sin dependencias)
// Usa módulos nativos de Node.js

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const PORT = 3000;
const HOST = 'localhost';

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

    // Verificar si todas las diferencias son iguales
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

// Funciones auxiliares
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
  };
  return types[ext] || 'text/plain';
}

function serveFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Archivo no encontrado</h1>');
      return;
    }
    
    res.writeHead(200, { 'Content-Type': getContentType(filePath) });
    res.end(data);
  });
}

// Crear servidor
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar OPTIONS
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Rutas de API
  if (pathname === '/api/status' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      estado: 'conectado',
      titulo: camara.tituloCamara,
      recuerdos: camara.obtenerConteoDeRecuerdos(),
      version: '1.0.0'
    }));
    return;
  }

  if (pathname === '/api/predecir' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        const { secuencia } = JSON.parse(body);
        const resultado = camara.predecirSiguienteNumero(secuencia);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(resultado));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error procesando la solicitud' }));
      }
    });
    return;
  }

  if (pathname === '/api/recuerdos' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(camara.obtenerRecuerdos()));
    return;
  }

  if (pathname === '/api/limpiar' && req.method === 'POST') {
    const resultado = camara.limpiarRecuerdos();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(resultado));
    return;
  }

  if (pathname === '/api/validar' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        const { secuencia } = JSON.parse(body);
        const validacion = camara.validarSecuencia(secuencia);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(validacion));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error validando' }));
      }
    });
    return;
  }

  if (pathname === '/api/ejemplos' && req.method === 'GET') {
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
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(ejemplos));
    return;
  }

  // Servir archivos estáticos
  if (pathname === '/' || pathname === '/index.html') {
    serveFile(path.join(__dirname, 'public', 'index.html'), res);
    return;
  }

  if (pathname.startsWith('/')) {
    const filePath = path.join(__dirname, 'public', pathname);
    
    // Seguridad: asegurar que el archivo está dentro de public
    if (path.normalize(filePath).startsWith(path.normalize(path.join(__dirname, 'public')))) {
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('<h1>404 - Archivo no encontrado</h1>');
        } else {
          serveFile(filePath, res);
        }
      });
      return;
    }
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end('<h1>404 - Ruta no encontrada</h1>');
});

// Iniciar servidor
server.listen(PORT, HOST, () => {
  console.log('');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                                                            ║');
  console.log('║      🌐 SERVIDOR WEB - CÁMARA DE ECOS INICIADO 🌐         ║');
  console.log('║                                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`🚀 Servidor corriendo en: http://${HOST}:${PORT}`);
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
  console.log('Presiona Ctrl+C para detener el servidor');
  console.log('');
});
