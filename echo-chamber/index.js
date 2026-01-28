/**
 * Cámara de Ecos: Un Predictor Mágico de Secuencias de Números
 * 
 * ¡Bienvenido a la Cámara de Ecos de Numeria! Este lugar místico está lleno de
 * ecos antiguos de patrones numéricos, y tu tarea es predecir el siguiente número
 * en la secuencia. Cada patrón sigue las leyes de la progresión aritmética, donde
 * la diferencia entre números consecutivos permanece constante.
 * 
 * Los recuerdos de ecos anteriores se almacenan en la cámara, permitiéndote
 * explorar múltiples patrones y dominar el arte de la predicción de secuencias.
 */

// ============================================================================
// CLASE CÁMARA DE ECOS
// ============================================================================

class CamaraDeEcos {
  /**
   * Inicializar la Cámara de Ecos con almacenamiento de memoria para ecos anteriores
   */
  constructor() {
    this.recuerdos = [];
    this.tituloCamara = '✨ Bienvenido a la Cámara de Ecos de Numeria ✨';
  }

  /**
   * Validar si una secuencia es una progresión aritmética válida
   * @param {number[]} secuencia - La secuencia a validar
   * @returns {object} - Resultado de validación con bandera esValida y mensaje
   */
  validarSecuencia(secuencia) {
    // Verificar si la secuencia es un array
    if (!Array.isArray(secuencia)) {
      return {
        esValida: false,
        mensaje: '❌ Error: La entrada debe ser un array de números.',
      };
    }

    // Verificar longitud mínima de la secuencia (necesitamos al menos 2 números para encontrar la diferencia)
    if (secuencia.length < 2) {
      return {
        esValida: false,
        mensaje: '❌ Error: La secuencia debe contener al menos 2 números.',
      };
    }

    // Verificar que todos los elementos sean números
    if (!secuencia.every((num) => typeof num === 'number' && !isNaN(num))) {
      return {
        esValida: false,
        mensaje: '❌ Error: Todos los elementos de la secuencia deben ser números válidos.',
      };
    }

    // Calcular diferencias entre números consecutivos
    const diferencias = [];
    for (let i = 1; i < secuencia.length; i++) {
      diferencias.push(secuencia[i] - secuencia[i - 1]);
    }

    // Verificar que todas las diferencias sean iguales (progresión aritmética)
    const diferenciaComun = diferencias[0];
    const esAritmetica = diferencias.every((dif) => dif === diferenciaComun);

    if (!esAritmetica) {
      return {
        esValida: false,
        mensaje: `❌ Error: No es una progresión aritmética. Las diferencias son: ${diferencias.join(', ')}`,
      };
    }

    return {
      esValida: true,
      mensaje: '✅ ¡Se detectó una progresión aritmética válida!',
      diferenciaComun,
      diferencias,
    };
  }

  /**
   * Predecir el siguiente número en una secuencia aritmética
   * @param {number[]} secuencia - La secuencia de la que predecir
   * @returns {object} - Resultado de predicción con siguiente número o error
   */
  predecirSiguienteNumero(secuencia) {
    // Validar la secuencia primero
    const validacion = this.validarSecuencia(secuencia);

    if (!validacion.esValida) {
      return {
        exito: false,
        error: validacion.mensaje,
      };
    }

    // Calcular el siguiente número
    const diferenciaComun = validacion.diferenciaComun;
    const ultimoNumero = secuencia[secuencia.length - 1];
    const siguienteNumero = ultimoNumero + diferenciaComun;

    // Almacenar esta predicción en memoria
    const eco = {
      marcaTiempo: new Date().toLocaleTimeString('es-ES'),
      secuencia: [...secuencia],
      diferenciaComun,
      prediccion: siguienteNumero,
    };
    this.recuerdos.push(eco);

    return {
      exito: true,
      secuencia,
      diferenciaComun,
      prediccion: siguienteNumero,
      mensaje: `🔮 El siguiente número en la secuencia es: ${siguienteNumero}`,
    };
  }

  /**
   * Mostrar los recuerdos de todos los ecos anteriores
   */
  mostrarRecuerdos() {
    if (this.recuerdos.length === 0) {
      console.log('📭 La Cámara de Ecos aún no tiene recuerdos.');
      return;
    }

    console.log('\n📜 RECUERDOS DE LA CÁMARA DE ECOS:');
    console.log('━'.repeat(60));

    this.recuerdos.forEach((eco, index) => {
      console.log(`\n🔔 Eco #${index + 1} (${eco.marcaTiempo}):`);
      console.log(`   Secuencia: [${eco.secuencia.join(', ')}]`);
      console.log(`   Diferencia Común: ${eco.diferenciaComun}`);
      console.log(`   Siguiente Número: ${eco.prediccion}`);
    });

    console.log('\n' + '━'.repeat(60));
  }

  /**
   * Limpiar todos los recuerdos de la Cámara de Ecos
   */
  limpiarRecuerdos() {
    this.recuerdos = [];
    console.log('🧹 Todos los recuerdos han sido eliminados de la Cámara de Ecos.');
  }

  /**
   * Obtener el número de recuerdos almacenados
   * @returns {number} - Número de ecos almacenados
   */
  obtenerConteoDeRecuerdos() {
    return this.recuerdos.length;
  }
}

// ============================================================================
// FUNCIONES DE LA APLICACIÓN
// ============================================================================

/**
 * Mostrar el mensaje de bienvenida e historia
 */
function mostrarBienvenida() {
  console.clear();
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                                                            ║');
  console.log('║         ✨ BIENVENIDO A LA CÁMARA DE ECOS DE NUMERIA ✨   ║');
  console.log('║                                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log('📖 LA HISTORIA:');
  console.log('━'.repeat(60));
  console.log(`
En la tierra mística de Numeria, existe una cámara antigua llena de ecos mágicos.
Cada eco lleva consigo una secuencia de números que sigue un patrón oculto: una
progresión aritmética donde la diferencia entre números consecutivos nunca cambia.

Tu misión: ¡Descubre el patrón y predice el siguiente número en cada secuencia!

La Cámara de Ecos recordará todas tus predicciones, almacenándolas en su memoria
eterna. ¿Podrás dominar el arte de la predicción de secuencias?
  `);
  console.log('━'.repeat(60) + '\n');
}

/**
 * Mostrar el menú principal
 */
function mostrarMenu() {
  console.log('\n📋 ¿QUÉ TE GUSTARÍA HACER?');
  console.log('━'.repeat(60));
  console.log('1. 🔮 Predecir el siguiente número en una secuencia');
  console.log('2. 📜 Ver todos los recuerdos (ecos anteriores)');
  console.log('3. 🧪 Ejecutar casos de prueba automatizados');
  console.log('4. 🧹 Limpiar todos los recuerdos');
  console.log('5. 📚 Ver datos de prueba de muestra');
  console.log('6. ❌ Salir de la Cámara de Ecos');
  console.log('━'.repeat(60) + '\n');
}

/**
 * Ejecutar casos de prueba exhaustivos para verificar la funcionalidad
 */
function ejecutarCasosDePrueba() {
  console.log('\n🧪 EJECUTANDO CASOS DE PRUEBA AUTOMATIZADOS:');
  console.log('═'.repeat(60));

  const camara = new CamaraDeEcos();

  const casosDePrueba = [
    {
      nombre: 'Secuencia de Muestra: Progresión Aritmética Básica',
      secuencia: [3, 6, 9, 12],
      siguienteEsperado: 15,
    },
    {
      nombre: 'Números Pares',
      secuencia: [2, 4, 6, 8, 10],
      siguienteEsperado: 12,
    },
    {
      nombre: 'Secuencia Decreciente',
      secuencia: [20, 15, 10, 5],
      siguienteEsperado: 0,
    },
    {
      nombre: 'Números Grandes',
      secuencia: [100, 200, 300, 400],
      siguienteEsperado: 500,
    },
    {
      nombre: 'Números Negativos',
      secuencia: [-10, -5, 0, 5, 10],
      siguienteEsperado: 15,
    },
    {
      nombre: 'Diferencia de 1',
      secuencia: [5, 6, 7, 8],
      siguienteEsperado: 9,
    },
  ];

  let pruebasAprobadas = 0;
  let pruebasFallidas = 0;

  casosDePrueba.forEach((caso, index) => {
    console.log(`\n📝 Prueba ${index + 1}: ${caso.nombre}`);
    console.log('─'.repeat(60));

    const resultado = camara.predecirSiguienteNumero(caso.secuencia);

    if (resultado.exito) {
      const pasada = resultado.prediccion === caso.siguienteEsperado;
      const estado = pasada ? '✅ PASÓ' : '❌ FALLÓ';
      console.log(`   Secuencia: [${caso.secuencia.join(', ')}]`);
      console.log(`   Predicción: ${resultado.prediccion}`);
      console.log(`   Esperado: ${caso.siguienteEsperado}`);
      console.log(`   Estado: ${estado}`);

      if (pasada) {
        pruebasAprobadas++;
      } else {
        pruebasFallidas++;
      }
    } else {
      console.log(`   Estado: ❌ FALLÓ (${resultado.error})`);
      pruebasFallidas++;
    }
  });

  // Pruebas de casos de error
  console.log(`\n📝 Prueba ${casosDePrueba.length + 1}: Entrada Inválida (No Aritmética)`);
  console.log('─'.repeat(60));
  const secuenciaInvalida = [1, 2, 4, 8]; // No aritmética (potencias de 2)
  const resultadoInvalido = camara.predecirSiguienteNumero(secuenciaInvalida);
  if (!resultadoInvalido.exito) {
    console.log(`   Estado: ✅ PASÓ (Manejo de errores funciona)`);
    console.log(`   Mensaje de Error: ${resultadoInvalido.error}`);
    pruebasAprobadas++;
  } else {
    console.log(`   Estado: ❌ FALLÓ (Debería haber detectado secuencia inválida)`);
    pruebasFallidas++;
  }

  console.log(`\n📝 Prueba ${casosDePrueba.length + 2}: Caso Límite (Solo 2 Números)`);
  console.log('─'.repeat(60));
  const dosNumeros = [5, 10];
  const resultadoDos = camara.predecirSiguienteNumero(dosNumeros);
  if (resultadoDos.exito && resultadoDos.prediccion === 15) {
    console.log(`   Secuencia: [${dosNumeros.join(', ')}]`);
    console.log(`   Predicción: ${resultadoDos.prediccion}`);
    console.log(`   Estado: ✅ PASÓ`);
    pruebasAprobadas++;
  } else {
    console.log(`   Estado: ❌ FALLÓ`);
    pruebasFallidas++;
  }

  // Mostrar resumen
  console.log('\n' + '═'.repeat(60));
  console.log('📊 RESUMEN DE PRUEBAS:');
  console.log(`   ✅ Aprobadas: ${pruebasAprobadas}`);
  console.log(`   ❌ Fallidas: ${pruebasFallidas}`);
  console.log(`   📈 Tasa de Éxito: ${((pruebasAprobadas / (pruebasAprobadas + pruebasFallidas)) * 100).toFixed(2)}%`);
  console.log('═'.repeat(60) + '\n');
}

/**
 * Mostrar datos de prueba de muestra para comprensión del usuario
 */
function mostrarDatosDemuestra() {
  console.log('\n📚 DATOS DE PRUEBA DE MUESTRA:');
  console.log('═'.repeat(60));

  const muestras = [
    {
      nombre: 'Patrón 1: Múltiplos de 3',
      secuencia: [3, 6, 9, 12],
      diferencia: 3,
      siguienteNumero: 15,
    },
    {
      nombre: 'Patrón 2: Números Pares',
      secuencia: [2, 4, 6, 8, 10],
      diferencia: 2,
      siguienteNumero: 12,
    },
    {
      nombre: 'Patrón 3: Decreciente por 5',
      secuencia: [50, 45, 40, 35],
      diferencia: -5,
      siguienteNumero: 30,
    },
    {
      nombre: 'Patrón 4: Números Fibonacci Lineales',
      secuencia: [1, 2, 3, 4, 5],
      diferencia: 1,
      siguienteNumero: 6,
    },
  ];

  muestras.forEach((muestra, index) => {
    console.log(`\n${index + 1}. ${muestra.nombre}`);
    console.log('   Secuencia: [' + muestra.secuencia.join(', ') + ']');
    console.log(`   Diferencia Común: ${muestra.diferencia}`);
    console.log(`   Siguiente Número: ${muestra.siguienteNumero}`);
  });

  console.log('\n' + '═'.repeat(60) + '\n');
}

// ============================================================================
// APLICACIÓN PRINCIPAL
// ============================================================================

/**
 * Bucle principal de la aplicación
 */
async function principal() {
  const camara = new CamaraDeEcos();
  mostrarBienvenida();

  // Ejecutar prueba inicial de demostración
  console.log(
    '🚀 Ejecutando prueba inicial con la secuencia de muestra [3, 6, 9, 12]...\n'
  );
  const resultadoMuestra = camara.predecirSiguienteNumero([3, 6, 9, 12]);
  console.log(`   ${resultadoMuestra.mensaje}`);
  console.log(`   Diferencia Común: ${resultadoMuestra.diferenciaComun}`);
  console.log('   ✨ ¡El patrón ha sido ecoado y almacenado en la memoria!\n');

  let continuarApp = true;

  while (continuarApp) {
    mostrarMenu();

    // En una aplicación real con entrada del usuario, obtendrías la opción aquí
    // Para propósitos de demostración, mostramos qué sucede con cada opción
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    await new Promise((resolve) => {
      rl.question('Ingresa tu opción (1-6): ', (respuesta) => {
        const opcion = respuesta.trim();

        switch (opcion) {
          case '1': {
            // Predecir siguiente número
            rl.question(
              'Ingresa una secuencia (números separados por comas): ',
              (entrada) => {
                try {
                  const numeros = entrada
                    .split(',')
                    .map((num) => parseInt(num.trim(), 10));

                  const resultado = camara.predecirSiguienteNumero(numeros);

                  if (resultado.exito) {
                    console.log(`\n${resultado.mensaje}`);
                    console.log(
                      `📊 Diferencia Común: ${resultado.diferenciaComun}`
                    );
                    console.log(`💾 ¡Este eco ha sido almacenado en la memoria!`);
                  } else {
                    console.log(resultado.error);
                  }
                } catch (error) {
                  console.log(
                    '❌ Error: Por favor ingresa números separados por comas.'
                  );
                }
                resolve();
              }
            );
            break;
          }
          case '2': {
            // Ver recuerdos
            camara.mostrarRecuerdos();
            resolve();
            break;
          }
          case '3': {
            // Ejecutar pruebas
            ejecutarCasosDePrueba();
            resolve();
            break;
          }
          case '4': {
            // Limpiar recuerdos
            camara.limpiarRecuerdos();
            resolve();
            break;
          }
          case '5': {
            // Mostrar datos de muestra
            mostrarDatosDemuestra();
            resolve();
            break;
          }
          case '6': {
            // Salir
            console.log(
              '\n👋 ¡Gracias por visitar la Cámara de Ecos de Numeria!'
            );
            console.log(
              '   Que los patrones guíen tu viaje matemático.\n'
            );
            continuarApp = false;
            resolve();
            break;
          }
          default:
            console.log('❌ Opción inválida. Por favor ingresa un número entre 1-6.');
            resolve();
        }

        rl.close();
      });
    });
  }
}

// Ejecutar la aplicación
principal().catch((error) => {
  console.error('Ocurrió un error:', error);
  process.exit(1);
});
