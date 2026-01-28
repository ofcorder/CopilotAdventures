/**
 * Echo Chamber: A Magical Number Sequence Predictor
 * 
 * Welcome to the Echo Chamber of Numeria! This mystical place echoes ancient
 * number patterns, and your task is to predict the next number in the sequence.
 * Each pattern follows the laws of arithmetic progression, where the difference
 * between consecutive numbers remains constant.
 * 
 * The memories of previous echoes are stored in the chamber, allowing you to
 * explore multiple patterns and master the art of sequence prediction.
 */

// ============================================================================
// SEQUENCE PREDICTOR CLASS
// ============================================================================

class EchoChamber {
  /**
   * Initialize the Echo Chamber with memory storage for previous echoes
   */
  constructor() {
    this.memories = [];
    this.echoChamberTitle = '✨ Welcome to the Echo Chamber of Numeria ✨';
  }

  /**
   * Validate if a sequence is a valid arithmetic progression
   * @param {number[]} sequence - The sequence to validate
   * @returns {object} - Validation result with isValid flag and message
   */
  validateSequence(sequence) {
    // Check if sequence is an array
    if (!Array.isArray(sequence)) {
      return {
        isValid: false,
        message: '❌ Error: Input must be an array of numbers.',
      };
    }

    // Check minimum sequence length (need at least 2 numbers to find difference)
    if (sequence.length < 2) {
      return {
        isValid: false,
        message: '❌ Error: Sequence must contain at least 2 numbers.',
      };
    }

    // Check if all elements are numbers
    if (!sequence.every((num) => typeof num === 'number' && !isNaN(num))) {
      return {
        isValid: false,
        message: '❌ Error: All sequence elements must be valid numbers.',
      };
    }

    // Calculate differences between consecutive numbers
    const differences = [];
    for (let i = 1; i < sequence.length; i++) {
      differences.push(sequence[i] - sequence[i - 1]);
    }

    // Verify all differences are equal (arithmetic progression)
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

  /**
   * Predict the next number in an arithmetic sequence
   * @param {number[]} sequence - The sequence to predict from
   * @returns {object} - Prediction result with next number or error
   */
  predictNextNumber(sequence) {
    // Validate the sequence first
    const validation = this.validateSequence(sequence);

    if (!validation.isValid) {
      return {
        success: false,
        error: validation.message,
      };
    }

    // Calculate the next number
    const commonDifference = validation.commonDifference;
    const lastNumber = sequence[sequence.length - 1];
    const nextNumber = lastNumber + commonDifference;

    // Store this prediction in memory
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

  /**
   * Display the memory of all previous echoes
   */
  displayMemories() {
    if (this.memories.length === 0) {
      console.log('📭 The Echo Chamber has no memories yet.');
      return;
    }

    console.log('\n📜 MEMORIES OF THE ECHO CHAMBER:');
    console.log('━'.repeat(60));

    this.memories.forEach((echo, index) => {
      console.log(
        `\n🔔 Echo #${index + 1} (${echo.timestamp}):`
      );
      console.log(`   Sequence: [${echo.sequence.join(', ')}]`);
      console.log(`   Common Difference: ${echo.commonDifference}`);
      console.log(`   Next Number: ${echo.prediction}`);
    });

    console.log('\n' + '━'.repeat(60));
  }

  /**
   * Clear all memories from the Echo Chamber
   */
  clearMemories() {
    this.memories = [];
    console.log('🧹 All memories have been cleared from the Echo Chamber.');
  }

  /**
   * Get the count of memories stored
   * @returns {number} - Number of echoes stored
   */
  getMemoryCount() {
    return this.memories.length;
  }
}

// ============================================================================
// APPLICATION FUNCTIONS
// ============================================================================

/**
 * Display the welcome message and story
 */
function displayWelcome() {
  console.clear();
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                                                            ║');
  console.log('║         ✨ WELCOME TO THE ECHO CHAMBER OF NUMERIA ✨      ║');
  console.log('║                                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log('📖 THE STORY:');
  console.log('━'.repeat(60));
  console.log(`
In the mystical land of Numeria, there exists an ancient chamber filled with
magical echoes. Each echo carries a sequence of numbers that follows a hidden
pattern - an arithmetic progression where the difference between consecutive
numbers never changes.

Your quest: Discover the pattern and predict the next number in each sequence!

The Echo Chamber will remember all of your predictions, storing them in its
eternal memory. Will you master the art of sequence prediction?
  `);
  console.log('━'.repeat(60) + '\n');
}

/**
 * Display the main menu
 */
function displayMenu() {
  console.log('\n📋 WHAT WOULD YOU LIKE TO DO?');
  console.log('━'.repeat(60));
  console.log('1. 🔮 Predict the next number in a sequence');
  console.log('2. 📜 View all memories (previous echoes)');
  console.log('3. 🧪 Run automated test cases');
  console.log('4. 🧹 Clear all memories');
  console.log('5. 📚 View sample test data');
  console.log('6. ❌ Exit the Echo Chamber');
  console.log('━'.repeat(60) + '\n');
}

/**
 * Run comprehensive test cases to verify functionality
 */
function runTestCases() {
  console.log('\n🧪 RUNNING AUTOMATED TEST CASES:');
  console.log('═'.repeat(60));

  const chamber = new EchoChamber();

  const testCases = [
    {
      name: 'Sample Sequence: Basic Arithmetic Progression',
      sequence: [3, 6, 9, 12],
      expectedNext: 15,
    },
    {
      name: 'Fibonacci-like but Linear: Even Numbers',
      sequence: [2, 4, 6, 8, 10],
      expectedNext: 12,
    },
    {
      name: 'Decreasing Sequence',
      sequence: [20, 15, 10, 5],
      expectedNext: 0,
    },
    {
      name: 'Large Numbers',
      sequence: [100, 200, 300, 400],
      expectedNext: 500,
    },
    {
      name: 'Negative Numbers',
      sequence: [-10, -5, 0, 5, 10],
      expectedNext: 15,
    },
    {
      name: 'Difference of 1',
      sequence: [5, 6, 7, 8],
      expectedNext: 9,
    },
  ];

  let passedTests = 0;
  let failedTests = 0;

  testCases.forEach((testCase, index) => {
    console.log(`\n📝 Test ${index + 1}: ${testCase.name}`);
    console.log('─'.repeat(60));

    const result = chamber.predictNextNumber(testCase.sequence);

    if (result.success) {
      const passed = result.prediction === testCase.expectedNext;
      const status = passed ? '✅ PASSED' : '❌ FAILED';
      console.log(`   Sequence: [${testCase.sequence.join(', ')}]`);
      console.log(`   Predicted: ${result.prediction}`);
      console.log(`   Expected: ${testCase.expectedNext}`);
      console.log(`   Status: ${status}`);

      if (passed) {
        passedTests++;
      } else {
        failedTests++;
      }
    } else {
      console.log(`   Status: ❌ FAILED (${result.error})`);
      failedTests++;
    }
  });

  // Test error cases
  console.log(`\n📝 Test ${testCases.length + 1}: Invalid Input (Not Arithmetic)`);
  console.log('─'.repeat(60));
  const invalidSequence = [1, 2, 4, 8]; // Not arithmetic (powers of 2)
  const invalidResult = chamber.predictNextNumber(invalidSequence);
  if (!invalidResult.success) {
    console.log(`   Status: ✅ PASSED (Error handling works)`);
    console.log(`   Error Message: ${invalidResult.error}`);
    passedTests++;
  } else {
    console.log(`   Status: ❌ FAILED (Should have detected invalid sequence)`);
    failedTests++;
  }

  console.log(`\n📝 Test ${testCases.length + 2}: Edge Case (Only 2 Numbers)`);
  console.log('─'.repeat(60));
  const twoNumbers = [5, 10];
  const twoResult = chamber.predictNextNumber(twoNumbers);
  if (twoResult.success && twoResult.prediction === 15) {
    console.log(`   Sequence: [${twoNumbers.join(', ')}]`);
    console.log(`   Predicted: ${twoResult.prediction}`);
    console.log(`   Status: ✅ PASSED`);
    passedTests++;
  } else {
    console.log(`   Status: ❌ FAILED`);
    failedTests++;
  }

  // Display summary
  console.log('\n' + '═'.repeat(60));
  console.log('📊 TEST SUMMARY:');
  console.log(`   ✅ Passed: ${passedTests}`);
  console.log(`   ❌ Failed: ${failedTests}`);
  console.log(`   📈 Success Rate: ${((passedTests / (passedTests + failedTests)) * 100).toFixed(2)}%`);
  console.log('═'.repeat(60) + '\n');
}

/**
 * Display sample test data for user understanding
 */
function displaySampleData() {
  console.log('\n📚 SAMPLE TEST DATA:');
  console.log('═'.repeat(60));

  const samples = [
    {
      name: 'Pattern 1: Multiples of 3',
      sequence: [3, 6, 9, 12],
      difference: 3,
      nextNumber: 15,
    },
    {
      name: 'Pattern 2: Even Numbers',
      sequence: [2, 4, 6, 8, 10],
      difference: 2,
      nextNumber: 12,
    },
    {
      name: 'Pattern 3: Decreasing by 5',
      sequence: [50, 45, 40, 35],
      difference: -5,
      nextNumber: 30,
    },
    {
      name: 'Pattern 4: Fibonacci Numbers (Linear)',
      sequence: [1, 2, 3, 4, 5],
      difference: 1,
      nextNumber: 6,
    },
  ];

  samples.forEach((sample, index) => {
    console.log(`\n${index + 1}. ${sample.name}`);
    console.log('   Sequence: [' + sample.sequence.join(', ') + ']');
    console.log(`   Common Difference: ${sample.difference}`);
    console.log(`   Next Number: ${sample.nextNumber}`);
  });

  console.log('\n' + '═'.repeat(60) + '\n');
}

// ============================================================================
// MAIN APPLICATION
// ============================================================================

/**
 * Main application loop
 */
async function main() {
  const chamber = new EchoChamber();
  displayWelcome();

  // Run initial test demonstration
  console.log(
    '🚀 Running initial test with the sample sequence [3, 6, 9, 12]...\n'
  );
  const sampleResult = chamber.predictNextNumber([3, 6, 9, 12]);
  console.log(`   ${sampleResult.message}`);
  console.log(`   Common Difference: ${sampleResult.commonDifference}`);
  console.log('   ✨ The pattern has been echoed and stored in memory!\n');

  let continueApp = true;

  while (continueApp) {
    displayMenu();

    // In a real application with user input, you would get the choice here
    // For demonstration purposes, we'll show what happens with each option
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    await new Promise((resolve) => {
      rl.question('Enter your choice (1-6): ', (answer) => {
        const choice = answer.trim();

        switch (choice) {
          case '1': {
            // Predict next number
            rl.question(
              'Enter a sequence (comma-separated numbers): ',
              (input) => {
                try {
                  const numbers = input
                    .split(',')
                    .map((num) => parseInt(num.trim(), 10));

                  const result = chamber.predictNextNumber(numbers);

                  if (result.success) {
                    console.log(`\n${result.message}`);
                    console.log(
                      `📊 Common Difference: ${result.commonDifference}`
                    );
                    console.log(`💾 This echo has been stored in memory!`);
                  } else {
                    console.log(result.error);
                  }
                } catch (error) {
                  console.log(
                    '❌ Error: Please enter numbers separated by commas.'
                  );
                }
                resolve();
              }
            );
            break;
          }
          case '2': {
            // View memories
            chamber.displayMemories();
            resolve();
            break;
          }
          case '3': {
            // Run tests
            runTestCases();
            resolve();
            break;
          }
          case '4': {
            // Clear memories
            chamber.clearMemories();
            resolve();
            break;
          }
          case '5': {
            // Display sample data
            displaySampleData();
            resolve();
            break;
          }
          case '6': {
            // Exit
            console.log(
              '\n👋 Thank you for visiting the Echo Chamber of Numeria!'
            );
            console.log(
              '   May the patterns guide you on your mathematical journey.\n'
            );
            continueApp = false;
            resolve();
            break;
          }
          default:
            console.log('❌ Invalid choice. Please enter a number between 1-6.');
            resolve();
        }

        rl.close();
      });
    });
  }
}

// Run the application
main().catch((error) => {
  console.error('An error occurred:', error);
  process.exit(1);
});
