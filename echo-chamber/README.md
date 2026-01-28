# 🔮 Echo Chamber: A Magical Number Sequence Predictor

Welcome to the Echo Chamber of Numeria! This application demonstrates sequence prediction using arithmetic progressions in a fantasy-themed interactive environment. The application teaches core algorithms like pattern recognition and mathematical sequences while maintaining an engaging narrative.

## 📖 Overview

The Echo Chamber is an enchanted place where ancient number patterns echo through mystical halls. Your quest is to:

1. **Discover the Pattern** - Identify the common difference in arithmetic progressions
2. **Predict the Future** - Calculate the next number in the sequence
3. **Store Memories** - Archive all predictions in the chamber's eternal memory
4. **Master Sequences** - Test your skills with multiple patterns

### What is an Arithmetic Progression?

An arithmetic progression is a sequence where the difference between consecutive numbers is constant. For example:
- `[3, 6, 9, 12, ...]` has a common difference of **3**
- `[20, 15, 10, 5, ...]` has a common difference of **-5**
- `[5, 10, 15, 20, ...]` has a common difference of **5**

## 🚀 Quick Start

### Prerequisites

- **Node.js** (for running `index.js`)
- **Python 3.x** (for running tests or using the Python version)

### Running the Application (JavaScript)

```bash
cd echo-chamber
node index.js
```

This launches an interactive application where you can:
- Predict next numbers in sequences
- View stored memories
- Run automated tests
- Clear memory
- View sample data

### Running the Test Suite

**Using Python** (recommended - no Node.js required):
```bash
cd echo-chamber
python3 test.py
```

**Using Node.js** (requires Node.js installed):
```bash
cd echo-chamber
node test.js
```

## 📁 Project Structure

```
echo-chamber/
├── index.js           # Main interactive application (JavaScript)
├── test.js            # Automated test suite (JavaScript version)
├── test.py            # Automated test suite (Python version)
└── README.md          # This documentation file
```

## 🎯 Core Features

### 1. Sequence Validation

The application validates that input sequences are valid arithmetic progressions:

```javascript
const chamber = new EchoChamber();
const result = chamber.validateSequence([3, 6, 9, 12]);
// Returns: { isValid: true, commonDifference: 3, ... }
```

**Validation Checks:**
- ✅ Input must be an array/list
- ✅ Minimum 2 numbers required
- ✅ All elements must be numbers
- ✅ Differences between consecutive numbers must be equal

### 2. Number Prediction

Predict the next number based on the common difference:

```javascript
const result = chamber.predictNextNumber([3, 6, 9, 12]);
// Returns: { 
//   success: true, 
//   prediction: 15, 
//   commonDifference: 3, 
//   message: "🔮 The next number in the sequence is: 15" 
// }
```

### 3. Memory Management

Store and retrieve previous predictions:

```javascript
chamber.displayMemories();      // Show all stored echoes
chamber.getMemoryCount();       // Get number of stored predictions
chamber.clearMemories();        // Clear all memories
```

### 4. Error Handling

Comprehensive error handling for invalid inputs:

```javascript
// Non-arithmetic progression
const result = chamber.predictNextNumber([1, 2, 4, 8]);
// Returns: { 
//   success: false, 
//   error: "Not an arithmetic progression..." 
// }
```

## 🧪 Test Coverage

The application includes comprehensive test suites with **100% pass rate**:

### Functional Tests (8 tests)
- ✅ Basic arithmetic progression (sample: [3, 6, 9, 12])
- ✅ Even numbers pattern
- ✅ Decreasing sequence
- ✅ Large numbers
- ✅ Negative numbers
- ✅ Single difference of 1
- ✅ Two numbers only
- ✅ All same numbers (difference of 0)

### Error Handling Tests (4 tests)
- ✅ Non-arithmetic sequences (correctly rejected)
- ✅ Single number input (correctly rejected)
- ✅ Empty sequences (correctly rejected)
- ✅ Mixed progressions (correctly rejected)

### Memory Tests (1 test)
- ✅ Memory storage and retrieval

**Test Results Summary:**
```
Total Tests Run:     13
Tests Passed:        13
Tests Failed:        0
Success Rate:        100.00%
```

## 💻 API Reference

### EchoChamber Class

#### Constructor
```javascript
const chamber = new EchoChamber();
```

#### Methods

##### `validateSequence(sequence)`
Validates if a sequence is an arithmetic progression.

**Parameters:**
- `sequence` (Array): List of numbers to validate

**Returns:**
- `isValid` (boolean): Whether the sequence is valid
- `message` (string): Validation message
- `commonDifference` (number): The constant difference (if valid)
- `differences` (Array): All calculated differences (if valid)

**Example:**
```javascript
const result = chamber.validateSequence([2, 4, 6, 8]);
console.log(result.commonDifference); // 2
```

##### `predictNextNumber(sequence)`
Predicts the next number in an arithmetic sequence.

**Parameters:**
- `sequence` (Array): The sequence to predict from

**Returns:**
- `success` (boolean): Whether prediction was successful
- `prediction` (number): The predicted next number
- `commonDifference` (number): The constant difference
- `message` (string): Success message

**Example:**
```javascript
const result = chamber.predictNextNumber([5, 10, 15, 20]);
console.log(result.prediction); // 25
```

##### `displayMemories()`
Displays all stored echoes (predictions) in a formatted table.

**Example:**
```javascript
chamber.displayMemories();
// Output:
// 📜 MEMORIES OF THE ECHO CHAMBER:
// Echo #1: [3, 6, 9, 12] → 15 (diff: 3)
```

##### `clearMemories()`
Clears all stored memories from the chamber.

**Example:**
```javascript
chamber.clearMemories();
// Output: 🧹 All memories have been cleared...
```

##### `getMemoryCount()`
Returns the number of stored memories.

**Returns:**
- (number): Count of stored echoes

**Example:**
```javascript
const count = chamber.getMemoryCount(); // 8
```

## 📊 Sample Data

### Example Sequences to Try

| Sequence | Common Difference | Next Number |
|----------|------------------|-------------|
| [3, 6, 9, 12] | 3 | 15 |
| [2, 4, 6, 8, 10] | 2 | 12 |
| [50, 45, 40, 35] | -5 | 30 |
| [1, 2, 3, 4, 5] | 1 | 6 |
| [-10, -5, 0, 5, 10] | 5 | 15 |
| [100, 200, 300, 400] | 100 | 500 |

## 🎮 Interactive Mode Guide

When running `node index.js`, you'll encounter this menu:

```
📋 WHAT WOULD YOU LIKE TO DO?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. 🔮 Predict the next number in a sequence
2. 📜 View all memories (previous echoes)
3. 🧪 Run automated test cases
4. 🧹 Clear all memories
5. 📚 View sample test data
6. ❌ Exit the Echo Chamber
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Menu Options

**Option 1: Predict Next Number**
- Enter a sequence as comma-separated numbers: `3, 6, 9, 12`
- The application calculates and displays the next number: `15`
- The prediction is stored in memory

**Option 2: View Memories**
- Displays all previously stored predictions
- Shows sequence, common difference, and predicted value
- Includes timestamp for each echo

**Option 3: Run Automated Tests**
- Executes all 13 test cases
- Displays pass/fail status for each test
- Shows overall success rate
- Demonstrates various sequence patterns

**Option 4: Clear Memories**
- Removes all stored echoes from the chamber
- Confirms successful deletion

**Option 5: View Sample Data**
- Displays example sequences you can try
- Shows expected results for learning

**Option 6: Exit**
- Gracefully closes the application
- Displays farewell message

## 🏗️ Implementation Details

### Architecture

The application follows object-oriented design principles:

1. **EchoChamber Class** - Core logic for sequence validation and prediction
2. **Validation Layer** - Ensures data integrity before processing
3. **Memory System** - Stores all successful predictions with timestamps
4. **Error Handling** - Comprehensive error messages for user guidance
5. **UI Layer** - User-friendly console interface with visual feedback

### Algorithm Explanation

**Arithmetic Progression Formula:**
```
Next Number = Last Number + Common Difference

Where:
Common Difference = Any Number - Previous Number
(verified to be constant across entire sequence)
```

**Validation Process:**
```
1. Check input is array with ≥ 2 elements
2. Verify all elements are numbers
3. Calculate differences between consecutive numbers
4. Verify all differences are equal
5. If valid, return common difference
6. If invalid, return error message
```

### Performance Characteristics

- **Time Complexity:** O(n) where n is sequence length
  - Validation requires checking all differences once
  - Prediction is O(1) after validation
  
- **Space Complexity:** O(n)
  - Stores each prediction in memory array
  - Difference array created during validation

## 🐛 Error Handling Examples

### Invalid Inputs

```javascript
// Non-arithmetic sequence
chamber.predictNextNumber([1, 2, 4, 8])
// ❌ Error: Not an arithmetic progression. Differences are: [1, 2, 4]

// Single number
chamber.predictNextNumber([5])
// ❌ Error: Sequence must contain at least 2 numbers.

// Empty sequence
chamber.predictNextNumber([])
// ❌ Error: Sequence must contain at least 2 numbers.

// Mixed progression
chamber.predictNextNumber([1, 3, 5, 8])
// ❌ Error: Not an arithmetic progression. Differences are: [2, 2, 3]
```

## 📚 Learning Outcomes

By exploring the Echo Chamber, you'll learn:

1. **Algorithm Design** - How to validate data and handle errors
2. **Pattern Recognition** - Identifying mathematical sequences
3. **Data Structures** - Working with arrays and objects
4. **Validation Logic** - Input sanitization and verification
5. **User Interface Design** - Creating console-based applications
6. **Testing** - Comprehensive test case development

## 🎓 Educational Applications

### For Students
- Learn arithmetic progressions in an interactive way
- Understand algorithm design patterns
- Practice error handling in code
- Explore test-driven development

### For Educators
- Interactive tool for teaching sequences
- Customizable test cases for classroom use
- Clear code examples with comments
- Engaging fantasy-themed narrative

## 🔧 Extending the Application

### Adding New Features

1. **Support for Geometric Progressions**
   - Modify validation to check for constant ratio
   - Update prediction formula

2. **Sequence Analysis**
   - Calculate sum of n terms
   - Find terms at specific positions
   - Identify sequence type

3. **Data Export**
   - Save memories to file
   - Export results as JSON/CSV

4. **Difficulty Levels**
   - Hide answers at advanced levels
   - Timed challenges
   - Leaderboard system

## 📋 Troubleshooting

### Application won't start (Node.js version)
- Verify Node.js is installed: `node --version`
- Check file permissions: `chmod +x index.js`

### Python version issues
- Verify Python 3: `python3 --version`
- Use Python 3.6+ for best compatibility

### Tests failing
- Ensure all files are in the same directory
- Check for whitespace or line ending issues
- Verify Node.js or Python version compatibility

## 📞 Support

For issues or questions:
1. Check the test output for detailed error messages
2. Review the API reference section
3. Examine sample data and examples
4. Run the test suite to verify functionality

## 📄 License

This Echo Chamber application is part of the CopilotAdventures educational project. See the main repository LICENSE for details.

## 🙏 Acknowledgments

The Echo Chamber draws inspiration from:
- Classic arithmetic progression mathematics
- Interactive fiction and fantasy worlds
- Educational programming frameworks
- Console-based application design

---

**May the patterns guide your mathematical journey through the Echo Chamber of Numeria!** ✨🔮
