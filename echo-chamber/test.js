/**
 * Suite de Pruebas Independientes para la Aplicación Echo Chamber
 * Este archivo prueba la funcionalidad principal sin requerir entrada interactiva
 */

// ============================================================================
// SEQUENCE PREDICTOR CLASS (Copied from index.js for testing)
// ============================================================================

class EchoChamber {
  constructor() {
    this.memories = [];
    this.echoChamberTitle = '✨ Welcome to the Echo Chamber of Numeria ✨';
  }

  validateSequence(sequence) {
    if (!Array.isArray(sequence)) {
      return {
        isValid: false,
        message: '❌ Error: Input must be an array of numbers.',
      };
    }

    if (sequence.length < 2) {
      return {
        isValid: false,
        message: '❌ Error: Sequence must contain at least 2 numbers.',
      };
    }

    if (!sequence.every((num) => typeof num === 'number' && !isNaN(num))) {
      return {
        isValid: false,
        message: '❌ Error: All sequence elements must be valid numbers.',
      };
    }

    const differences = [];
    for (let i = 1; i < sequence.length; i++) {
      differences.push(sequence[i] - sequence[i - 1]);
    }

    const commonDifference = differences[0];
    const isArithmetic = differences.every((diff) => diff === commonDifference);

    if (!isArithmetic) {
      return {
        isValid: false,
        message: `❌ Error: Not an arithmetic progression. Differences are: ${differences.join(', ')}`,
      };
    }

    return {
      isValid: true,
      message: '✅ Valid arithmetic progression detected!',
      commonDifference,
      differences,
    };
  }

  predictNextNumber(sequence) {
    const validation = this.validateSequence(sequence);

    if (!validation.isValid) {
      return {
        success: false,
        error: validation.message,
      };
    }

    const commonDifference = validation.commonDifference;
    const lastNumber = sequence[sequence.length - 1];
    const nextNumber = lastNumber + commonDifference;

    const echo = {
      timestamp: new Date().toLocaleTimeString(),
      sequence: [...sequence],
      commonDifference,
      prediction: nextNumber,
    };
    this.memories.push(echo);

    return {
      success: true,
      sequence,
      commonDifference,
      prediction: nextNumber,
      message: `🔮 The next number in the sequence is: ${nextNumber}`,
    };
  }

  displayMemories() {
    if (this.memories.length === 0) {
      console.log('📭 The Echo Chamber has no memories yet.');
      return;
    }

    console.log('\n📜 MEMORIES OF THE ECHO CHAMBER:');
    console.log('━'.repeat(60));

    this.memories.forEach((echo, index) => {
      console.log(`\n🔔 Echo #${index + 1} (${echo.timestamp}):`);
      console.log(`   Sequence: [${echo.sequence.join(', ')}]`);
      console.log(`   Common Difference: ${echo.commonDifference}`);
      console.log(`   Next Number: ${echo.prediction}`);
    });

    console.log('\n' + '━'.repeat(60));
  }

  clearMemories() {
    this.memories = [];
    console.log('🧹 All memories have been cleared from the Echo Chamber.');
  }

  getMemoryCount() {
    return this.memories.length;
  }
}

// ============================================================================
// TEST SUITE
// ============================================================================

function runTests() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                                                            ║');
  console.log('║      ✨ ECHO CHAMBER TEST SUITE ✨                         ║');
  console.log('║                                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  const chamber = new EchoChamber();
  let passedTests = 0;
  let totalTests = 0;

  // Test Cases
  const testCases = [
    {
      name: 'Sample Sequence: Basic Arithmetic Progression',
      sequence: [3, 6, 9, 12],
      expectedNext: 15,
      expectedDiff: 3,
    },
    {
      name: 'Even Numbers',
      sequence: [2, 4, 6, 8, 10],
      expectedNext: 12,
      expectedDiff: 2,
    },
    {
      name: 'Decreasing Sequence',
      sequence: [20, 15, 10, 5],
      expectedNext: 0,
      expectedDiff: -5,
    },
    {
      name: 'Large Numbers',
      sequence: [100, 200, 300, 400],
      expectedNext: 500,
      expectedDiff: 100,
    },
    {
      name: 'Negative Numbers',
      sequence: [-10, -5, 0, 5, 10],
      expectedNext: 15,
      expectedDiff: 5,
    },
    {
      name: 'Difference of 1',
      sequence: [5, 6, 7, 8],
      expectedNext: 9,
      expectedDiff: 1,
    },
    {
      name: 'Two Numbers Only',
      sequence: [5, 10],
      expectedNext: 15,
      expectedDiff: 5,
    },
    {
      name: 'All Same Numbers',
      sequence: [7, 7, 7, 7],
      expectedNext: 7,
      expectedDiff: 0,
    },
  ];

  console.log('🧪 RUNNING FUNCTIONAL TESTS:\n');

  testCases.forEach((testCase, index) => {
    totalTests++;
    console.log(`Test ${totalTests}: ${testCase.name}`);
    console.log('─'.repeat(60));

    const result = chamber.predictNextNumber(testCase.sequence);

    if (result.success) {
      const predictionCorrect = result.prediction === testCase.expectedNext;
      const diffCorrect = result.commonDifference === testCase.expectedDiff;
      const testPassed = predictionCorrect && diffCorrect;

      console.log(`  Sequence: [${testCase.sequence.join(', ')}]`);
      console.log(`  Predicted: ${result.prediction} (Expected: ${testCase.expectedNext})`);
      console.log(`  Difference: ${result.commonDifference} (Expected: ${testCase.expectedDiff})`);

      if (testPassed) {
        console.log('  ✅ PASSED\n');
        passedTests++;
      } else {
        console.log('  ❌ FAILED\n');
      }
    } else {
      console.log(`  Error: ${result.error}`);
      console.log('  ❌ FAILED\n');
    }
  });

  // Error Handling Tests
  console.log('🚨 RUNNING ERROR HANDLING TESTS:\n');

  const errorTests = [
    {
      name: 'Invalid: Non-Arithmetic Sequence (Powers of 2)',
      sequence: [1, 2, 4, 8],
      shouldFail: true,
    },
    {
      name: 'Invalid: Single Number',
      sequence: [5],
      shouldFail: true,
    },
    {
      name: 'Invalid: Empty Array',
      sequence: [],
      shouldFail: true,
    },
    {
      name: 'Invalid: Mixed Progression',
      sequence: [1, 3, 5, 8],
      shouldFail: true,
    },
  ];

  errorTests.forEach((testCase, index) => {
    totalTests++;
    console.log(`Error Test ${index + 1}: ${testCase.name}`);
    console.log('─'.repeat(60));

    const result = chamber.predictNextNumber(testCase.sequence);

    if (testCase.shouldFail && !result.success) {
      console.log(`  ✅ PASSED - Correctly rejected: ${result.error}\n`);
      passedTests++;
    } else if (!testCase.shouldFail && result.success) {
      console.log(`  ✅ PASSED - Correctly processed\n`);
      passedTests++;
    } else {
      console.log(`  ❌ FAILED\n`);
    }
  });

  // Memory Tests
  console.log('💾 RUNNING MEMORY TESTS:\n');

  totalTests++;
  console.log(`Test ${totalTests}: Memory Storage and Retrieval`);
  console.log('─'.repeat(60));

  const initialMemoryCount = chamber.getMemoryCount();
  console.log(`  Initial memory count: ${initialMemoryCount}`);

  // Each test added to memories, so we should have 8 + 4 = 12 memories
  const expectedMemories = testCases.length + 4; // 8 functional tests + 4 error tests
  console.log(`  Expected memory count: ${expectedMemories}`);
  console.log(`  Actual memory count: ${chamber.getMemoryCount()}`);

  if (chamber.getMemoryCount() === expectedMemories) {
    console.log('  ✅ PASSED\n');
    passedTests++;
  } else {
    console.log('  ❌ FAILED\n');
  }

  // Display Sample Memories
  console.log('📜 SAMPLE MEMORIES FROM ECHO CHAMBER:');
  console.log('━'.repeat(60));
  console.log(
    '\nFirst 3 echoes stored in the chamber:\n'
  );
  for (let i = 0; i < Math.min(3, chamber.memories.length); i++) {
    const echo = chamber.memories[i];
    console.log(
      `Echo #${i + 1}: [${echo.sequence.join(', ')}] → ${echo.prediction} (diff: ${echo.commonDifference})`
    );
  }
  console.log('━'.repeat(60));

  // Final Summary
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                    📊 TEST SUMMARY                         ║');
  console.log('╠════════════════════════════════════════════════════════════╣');
  console.log(`║ Total Tests Run:     ${String(totalTests).padEnd(46)}║`);
  console.log(`║ Tests Passed:        ${String(passedTests).padEnd(46)}║`);
  console.log(`║ Tests Failed:        ${String(totalTests - passedTests).padEnd(46)}║`);
  console.log(
    `║ Success Rate:        ${((passedTests / totalTests) * 100).toFixed(2)}%${String('').padEnd(36)}║`
  );
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  if (passedTests === totalTests) {
    console.log(
      '🎉 All tests passed! The Echo Chamber is functioning perfectly!\n'
    );
    return true;
  } else {
    console.log(
      `⚠️  ${totalTests - passedTests} test(s) failed. Please review the output above.\n`
    );
    return false;
  }
}

// Run tests
const allTestsPassed = runTests();
process.exit(allTestsPassed ? 0 : 1);
