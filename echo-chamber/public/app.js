// Cámara de Ecos - Aplicación Frontend

// Estado de la aplicación
let appState = {
    memories: [],
    predictions: 0,
    successful: 0,
    differences: []
};

// Elementos del DOM
const sequenceInput = document.getElementById('sequence-input');
const predictBtn = document.getElementById('predict-btn');
const validateBtn = document.getElementById('validate-btn');
const predictionResult = document.getElementById('prediction-result');
const errorMessage = document.getElementById('error-message');
const memoriesList = document.getElementById('memories-list');
const memoryCount = document.getElementById('memory-count');
const refreshBtn = document.getElementById('refresh-btn');
const clearBtn = document.getElementById('clear-btn');
const examplesContainer = document.getElementById('examples-container');
const statPredictions = document.getElementById('stat-predictions');
const statSuccessful = document.getElementById('stat-successful');
const statAvgDiff = document.getElementById('stat-avg-diff');

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔮 Cámara de Ecos - Inicializando...');
    
    // Cargar ejemplos
    loadExamples();
    
    // Cargar recuerdos iniciales
    loadMemories();
    
    // Event listeners
    predictBtn.addEventListener('click', handlePredict);
    validateBtn.addEventListener('click', handleValidate);
    refreshBtn.addEventListener('click', loadMemories);
    clearBtn.addEventListener('click', handleClear);
    sequenceInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handlePredict();
    });
    
    console.log('✨ Aplicación lista');
});

// Parsear entrada de secuencia
function parseSequence(input) {
    try {
        const numbers = input
            .split(',')
            .map(n => {
                const parsed = parseFloat(n.trim());
                if (isNaN(parsed)) throw new Error('Número inválido');
                return parsed;
            });
        
        if (numbers.length === 0) throw new Error('Secuencia vacía');
        
        return { success: true, data: numbers };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Mostrar mensaje de error
function showError(message) {
    errorMessage.textContent = '❌ ' + message;
    errorMessage.classList.remove('hidden');
    predictionResult.classList.add('hidden');
}

// Ocultar mensaje de error
function hideError() {
    errorMessage.classList.add('hidden');
}

// Mostrar resultado de predicción
function showPredictionResult(prediction) {
    document.getElementById('result-sequence').textContent = 
        '[' + prediction.secuencia.join(', ') + ']';
    document.getElementById('result-difference').textContent = 
        prediction.diferenciaComun;
    document.getElementById('result-prediction').textContent = 
        prediction.prediccion;
    
    predictionResult.classList.remove('hidden');
    hideError();
}

// Manejar predicción
async function handlePredict() {
    const input = sequenceInput.value.trim();
    
    if (!input) {
        showError('Por favor ingresa una secuencia de números');
        return;
    }
    
    const parsed = parseSequence(input);
    if (!parsed.success) {
        showError('Error: ' + parsed.error);
        return;
    }
    
    predictBtn.disabled = true;
    predictBtn.textContent = '⏳ Prediciendo...';
    
    try {
        const response = await fetch('/api/predecir', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ secuencia: parsed.data })
        });
        
        const result = await response.json();
        
        if (result.exito) {
            showPredictionResult(result);
            appState.predictions++;
            appState.successful++;
            appState.differences.push(result.diferenciaComun);
            updateStats();
            
            // Limpiar entrada
            sequenceInput.value = '';
            sequenceInput.focus();
            
            // Cargar recuerdos actualizados
            setTimeout(loadMemories, 500);
        } else {
            showError(result.error || 'Error desconocido');
        }
    } catch (error) {
        showError('Error de conexión: ' + error.message);
    } finally {
        predictBtn.disabled = false;
        predictBtn.textContent = '✨ Predecir';
    }
}

// Manejar validación
async function handleValidate() {
    const input = sequenceInput.value.trim();
    
    if (!input) {
        showError('Por favor ingresa una secuencia de números');
        return;
    }
    
    const parsed = parseSequence(input);
    if (!parsed.success) {
        showError('Error: ' + parsed.error);
        return;
    }
    
    validateBtn.disabled = true;
    const originalText = validateBtn.textContent;
    validateBtn.textContent = '⏳ Validando...';
    
    try {
        const response = await fetch('/api/validar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ secuencia: parsed.data })
        });
        
        const result = await response.json();
        
        if (result.valida) {
            showPredictionResult({
                secuencia: parsed.data,
                diferenciaComun: result.diferencias,
                prediccion: parsed.data[parsed.data.length - 1] + result.diferencias
            });
            hideError();
        } else {
            showError(result.error || 'No es una progresión aritmética válida');
        }
    } catch (error) {
        showError('Error de conexión: ' + error.message);
    } finally {
        validateBtn.disabled = false;
        validateBtn.textContent = originalText;
    }
}

// Cargar ejemplos
async function loadExamples() {
    try {
        const response = await fetch('/api/ejemplos');
        const ejemplos = await response.json();
        
        examplesContainer.innerHTML = '';
        
        ejemplos.forEach(ejemplo => {
            const btn = document.createElement('button');
            btn.className = 'example-btn';
            btn.innerHTML = `
                <span class="example-name">${ejemplo.nombre}</span>
                <span class="example-sequence">${ejemplo.secuencia.join(', ')} → ${ejemplo.esperado}</span>
            `;
            
            btn.addEventListener('click', () => {
                sequenceInput.value = ejemplo.secuencia.join(', ');
                sequenceInput.focus();
                handlePredict();
            });
            
            examplesContainer.appendChild(btn);
        });
    } catch (error) {
        console.error('Error cargando ejemplos:', error);
    }
}

// Cargar recuerdos
async function loadMemories() {
    try {
        const response = await fetch('/api/recuerdos');
        const data = await response.json();
        
        memoryCount.textContent = data.cantidad;
        
        if (data.recuerdos.length === 0) {
            memoriesList.innerHTML = '<p class="empty-message">No hay recuerdos aún. ¡Haz tu primera predicción!</p>';
        } else {
            memoriesList.innerHTML = '';
            
            data.recuerdos.forEach((memory, index) => {
                const item = document.createElement('div');
                item.className = 'memory-item';
                item.innerHTML = `
                    <div class="memory-sequence">${index + 1}. [${memory.secuencia.join(', ')}]</div>
                    <div class="memory-prediction">
                        <span>→ <strong>${memory.prediccion}</strong></span>
                        <span class="memory-diff">Δ: ${memory.diferenciaComun}</span>
                    </div>
                    <div class="memory-time">${memory.timestamp}</div>
                `;
                memoriesList.appendChild(item);
            });
        }
        
        appState.memories = data.recuerdos;
        updateStats();
    } catch (error) {
        console.error('Error cargando recuerdos:', error);
        memoriesList.innerHTML = '<p class="empty-message">Error cargando recuerdos</p>';
    }
}

// Actualizar estadísticas
function updateStats() {
    statPredictions.textContent = appState.predictions + appState.memories.length;
    statSuccessful.textContent = appState.memories.length;
    
    if (appState.differences.length > 0) {
        const avg = (appState.differences.reduce((a, b) => a + b, 0) / appState.differences.length).toFixed(2);
        statAvgDiff.textContent = avg;
    } else if (appState.memories.length > 0) {
        const diffs = appState.memories.map(m => m.diferenciaComun);
        const avg = (diffs.reduce((a, b) => a + b, 0) / diffs.length).toFixed(2);
        statAvgDiff.textContent = avg;
    }
}

// Manejar limpieza
async function handleClear() {
    const confirmed = confirm('⚠️ ¿Estás seguro de que deseas limpiar todos los recuerdos? Esta acción no se puede deshacer.');
    
    if (!confirmed) return;
    
    clearBtn.disabled = true;
    const originalText = clearBtn.textContent;
    clearBtn.textContent = '⏳ Limpiando...';
    
    try {
        const response = await fetch('/api/limpiar', {
            method: 'POST'
        });
        
        const result = await response.json();
        
        appState.predictions = 0;
        appState.successful = 0;
        appState.differences = [];
        
        loadMemories();
        predictionResult.classList.add('hidden');
        showError('✅ Todos los recuerdos han sido eliminados');
        setTimeout(hideError, 3000);
    } catch (error) {
        showError('Error al limpiar: ' + error.message);
    } finally {
        clearBtn.disabled = false;
        clearBtn.textContent = originalText;
    }
}

// Log de inicialización
console.log('🔮 Cámara de Ecos v1.0');
console.log('Un Predictor Mágico de Secuencias de Números');
