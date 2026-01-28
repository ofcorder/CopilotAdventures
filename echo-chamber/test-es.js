/**
 * Suite de Pruebas Independientes para la Aplicación Echo Chamber
 * Este archivo prueba la funcionalidad principal sin requerir entrada interactiva
 */

// ============================================================================
// CLASE PREDICTOR DE SECUENCIAS (Copiada de index.js para pruebas)
// ============================================================================

class CamaraDeEcos {
  /**
   * Inicializar la Cámara de Ecos con almacenamiento de memoria para ecos anteriores
   */
  constructor() {
    this.memories = [];
    this.echoChamberTitle = '✨ Bienvenido a la Cámara de Ecos de Numeria ✨';
  }

  /**
   * Validar si una secuencia es una progresión aritmética válida
   * @param {number[]} sequence - La secuencia a validar
   * @returns {object} - Resultado de validación con bandera isValid y mensaje
   */
  validarSecuencia(sequence) {
    // Verificar si la secuencia es un array
    if (!Array.isArray(sequence)) {
      return {
        esValida: false,
        mensaje: '❌ Error: La entrada debe ser un array de números.',
      };
    }

    // Verificar longitud mínima de la secuencia
    if (sequence.length < 2) {
      return {
        esValida: false,
        mensaje: '❌ Error: La secuencia debe contener al menos 2 números.',
      };
    }

    // Verificar que todos los elementos sean números
    if (!sequence.every((num) => typeof num === 'number' && !isNaN(num))) {
      return {
        esValida: false,
        mensaje: '❌ Error: Todos los elementos de la secuencia deben ser números válidos.',
      };
    }

    // Calcular diferencias entre números consecutivos
    const differences = [];
    for (let i = 1; i < sequence.length; i++) {
      differences.push(sequence[i] - sequence[i - 1]);
    }

    // Verificar que todas las diferencias sean iguales (progresión aritmética)
    const diferenciaComun = differences[0];
    const esAritmetica = differences.every((diff) => diff === diferenciaComun);

    if (!esAritmetica) {
      return {
        esValida: false,
        mensaje: `❌ Error: No es una progresión aritmética. Las diferencias son: ${differences.join(', ')}`,
      };
    }

    return {
      esValida: true,
      mensaje: '✅ ¡Se detectó una progresión aritmética válida!',
      diferenciaComun,
      differences,
    };
  }

  /**
   * Predecir el siguiente número en una secuencia aritmética
   * @param {number[]} sequence - La secuencia de la que predecir
   * @returns {object} - Resultado de predicción con siguiente número o error
   */
  predecirSiguienteNumero(sequence) {
    // Validar la secuencia primero
    const validation = this.validarSecuencia(sequence);

    if (!validation.esValida) {
      return {
        exito: false,
        error: validation.mensaje,
      };
    }

    // Calcular el siguiente número
    const diferenciaComun = validation.diferenciaComun;
    const ultimoNumero = sequence[sequence.length - 1];
    const siguienteNumero = ultimoNumero + diferenciaComun;

    // Almacenar esta predicción en memoria
    const eco = {
      marca_tiempo: new Date().toLocaleTimeString(),
      secuencia: [...sequence],
      diferenciaComun,
      prediccion: siguienteNumero,
    };
    this.memories.push(eco);

    return {
      exito: true,
      secuencia: sequence,
      diferenciaComun,
      prediccion: siguienteNumero,
      mensaje: `🔮 El siguiente número en la secuencia es: ${siguienteNumero}`,
    };
  }

  /**
   * Mostrar la memoria de todos los ecos anteriores
   */
  mostrarMemorias() {
    if (this.memories.length === 0) {
      console.log('📭 La Cámara de Ecos aún no tiene memorias.');
      return;
    }

    console.log('\n📜 MEMORIAS DE LA CÁMARA DE ECOS:');
    console.log('━'.repeat(60));

    this.memories.forEach((eco, index) => {
      console.log(`\n🔔 Eco #${index + 1} (${eco.marca_tiempo}):`);
      console.log(`   Secuencia: [${eco.secuencia.join(', ')}]`);
      console.log(`   Diferencia Común: ${eco.diferenciaComun}`);
      console.log(`   Siguiente Número: ${eco.prediccion}`);
    });

    console.log('\n' + '━'.repeat(60));
  }

  /**
   * Limpiar todas las memorias de la Cámara de Ecos
   */
  limpiarMemorias() {
    this.memories = [];
    console.log('🧹 Todas las memorias han sido eliminadas de la Cámara de Ecos.');
  }

  /**
   * Obtener el número de memorias almacenadas
   * @returns {number} - Número de ecos almacenados
   */
  obtenerConteoDeMemorias() {
    return this.memories.length;
  }
}

// ============================================================================
// SUITE DE PRUEBAS
// ============================================================================

/**
 * Ejecutar suite de pruebas completa
 */
function ejecutarPruebas() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                                                            ║');
  console.log('║      ✨ SUITE DE PRUEBAS DE CÁMARA DE ECOS ✨             ║');
  console.log('║                                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  const camara = new CamaraDeEcos();
  let pruebasAprobadas = 0;
  let totalPruebas = 0;

  // Casos de Prueba
  const casosDePrueba = [
    {
      nombre: 'Secuencia de Muestra: Progresión Aritmética Básica',
      secuencia: [3, 6, 9, 12],
      siguienteEsperado: 15,
      diferEsperada: 3,
    },
    {
      nombre: 'Números Pares',
      secuencia: [2, 4, 6, 8, 10],
      siguienteEsperado: 12,
      diferEsperada: 2,
    },
    {
      nombre: 'Secuencia Decreciente',
      secuencia: [20, 15, 10, 5],
      siguienteEsperado: 0,
      diferEsperada: -5,
    },
    {
      nombre: 'Números Grandes',
      secuencia: [100, 200, 300, 400],
      siguienteEsperado: 500,
      diferEsperada: 100,
    },
    {
      nombre: 'Números Negativos',
      secuencia: [-10, -5, 0, 5, 10],
      siguienteEsperado: 15,
      diferEsperada: 5,
    },
    {
      nombre: 'Diferencia de 1',
      secuencia: [5, 6, 7, 8],
      siguienteEsperado: 9,
      diferEsperada: 1,
    },
    {
      nombre: 'Solo Dos Números',
      secuencia: [5, 10],
      siguienteEsperado: 15,
      diferEsperada: 5,
    },
    {
      nombre: 'Todos los Números Iguales',
      secuencia: [7, 7, 7, 7],
      siguienteEsperado: 7,
      diferEsperada: 0,
    },
  ];

  console.log('🧪 EJECUTANDO PRUEBAS FUNCIONALES:\n');

  casosDePrueba.forEach((caso, index) => {
    totalPruebas++;
    console.log(`Prueba ${totalPruebas}: ${caso.nombre}`);
    console.log('─'.repeat(60));

    const resultado = camara.predecirSiguienteNumero(caso.secuencia);

    if (resultado.exito) {
      const prediccionCorrecta = resultado.prediccion === caso.siguienteEsperado;
      const diferCorrecta = resultado.diferenciaComun === caso.diferEsperada;
      const pruebaPasada = prediccionCorrecta && diferCorrecta;

      console.log(`  Secuencia: [${caso.secuencia.join(', ')}]`);
      console.log(`  Predicción: ${resultado.prediccion} (Esperado: ${caso.siguienteEsperado})`);
      console.log(`  Diferencia: ${resultado.diferenciaComun} (Esperado: ${caso.diferEsperada})`);

      if (pruebaPasada) {
        console.log('  ✅ PASÓ\n');
        pruebasAprobadas++;
      } else {
        console.log('  ❌ FALLÓ\n');
      }
    } else {
      console.log(`  Error: ${resultado.error}`);
      console.log('  ❌ FALLÓ\n');
    }
  });

  // Pruebas de Manejo de Errores
  console.log('🚨 EJECUTANDO PRUEBAS DE MANEJO DE ERRORES:\n');

  const pruebasDeError = [
    {
      nombre: 'Inválido: Secuencia No Aritmética (Potencias de 2)',
      secuencia: [1, 2, 4, 8],
      debefallar: true,
    },
    {
      nombre: 'Inválido: Un Solo Número',
      secuencia: [5],
      debefallar: true,
    },
    {
      nombre: 'Inválido: Array Vacío',
      secuencia: [],
      debefallar: true,
    },
    {
      nombre: 'Inválido: Progresión Mixta',
      secuencia: [1, 3, 5, 8],
      debefallar: true,
    },
  ];

  pruebasDeError.forEach((caso, index) => {
    totalPruebas++;
    console.log(`Prueba de Error ${index + 1}: ${caso.nombre}`);
    console.log('─'.repeat(60));

    const resultado = camara.predecirSiguienteNumero(caso.secuencia);

    if (caso.debefallar && !resultado.exito) {
      console.log(`  ✅ PASÓ - Rechazado correctamente: ${resultado.error}\n`);
      pruebasAprobadas++;
    } else if (!caso.debefallar && resultado.exito) {
      console.log(`  ✅ PASÓ - Procesado correctamente\n`);
      pruebasAprobadas++;
    } else {
      console.log(`  ❌ FALLÓ\n`);
    }
  });

  // Pruebas de Memoria
  console.log('💾 EJECUTANDO PRUEBAS DE MEMORIA:\n');

  totalPruebas++;
  console.log(`Prueba ${totalPruebas}: Almacenamiento y Recuperación de Memoria`);
  console.log('─'.repeat(60));

  const conteoMemoriaInicial = camara.obtenerConteoDeMemorias();
  console.log(`  Conteo inicial de memoria: ${conteoMemoriaInicial}`);

  // Solo las pruebas exitosas se almacenan en memoria (las fallidas se rechazan)
  const memoriasEsperadas = casosDePrueba.length;
  console.log(`  Conteo de memoria esperado: ${memoriasEsperadas} (de predicciones exitosas)`);
  console.log(`  Conteo de memoria actual: ${camara.obtenerConteoDeMemorias()}`);

  if (camara.obtenerConteoDeMemorias() === memoriasEsperadas) {
    console.log('  ✅ PASÓ\n');
    pruebasAprobadas++;
  } else {
    console.log('  ❌ FALLÓ\n');
  }

  // Mostrar Memorias de Muestra
  console.log('📜 MEMORIAS DE MUESTRA DE LA CÁMARA DE ECOS:');
  console.log('━'.repeat(60));
  console.log('\nPrimeros 3 ecos almacenados en la cámara:\n');
  for (let i = 0; i < Math.min(3, camara.memories.length); i++) {
    const eco = camara.memories[i];
    console.log(
      `Eco #${i + 1}: [${eco.secuencia.join(', ')}] → ${eco.prediccion} (difer: ${eco.diferenciaComun})`
    );
  }
  console.log('━'.repeat(60));

  // Resumen Final
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                    📊 RESUMEN DE PRUEBAS                   ║');
  console.log('╠════════════════════════════════════════════════════════════╣');
  console.log(`║ Total de Pruebas:    ${String(totalPruebas).padEnd(46)}║`);
  console.log(`║ Pruebas Pasadas:     ${String(pruebasAprobadas).padEnd(46)}║`);
  console.log(`║ Pruebas Fallidas:    ${String(totalPruebas - pruebasAprobadas).padEnd(46)}║`);
  console.log(
    `║ Tasa de Éxito:       ${((pruebasAprobadas / totalPruebas) * 100).toFixed(2)}%${String('').padEnd(36)}║`
  );
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  if (pruebasAprobadas === totalPruebas) {
    console.log(
      '🎉 ¡Todas las pruebas pasaron! ¡La Cámara de Ecos funciona perfectamente!\n'
    );
    return true;
  } else {
    console.log(
      `⚠️  ${totalPruebas - pruebasAprobadas} prueba(s) fallida(s). Por favor, revisa el resultado anterior.\n`
    );
    return false;
  }
}

// Ejecutar pruebas
const todaslasPruebasAprobadas = ejecutarPruebas();
process.exit(todaslasPruebasAprobadas ? 0 : 1);
