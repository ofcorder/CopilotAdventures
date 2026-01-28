"""
Echo Chamber: A Magical Number Sequence Predictor
Test Suite - Python Implementation

This file demonstrates the Echo Chamber application functionality
using Python to validate the sequence prediction logic.
"""

# ============================================================================
# SEQUENCE PREDICTOR CLASS
# ============================================================================


class EchoChamber:
    """The Echo Chamber of Numeria - A mystical sequence predictor"""

    def __init__(self):
        """Initialize the Echo Chamber with memory storage"""
        self.memories = []
        self.echo_chamber_title = "✨ Welcome to the Echo Chamber of Numeria ✨"

    def validate_sequence(self, sequence):
        """
        Validate if a sequence is a valid arithmetic progression.

        Args:
            sequence (list): The sequence to validate

        Returns:
            dict: Validation result with isValid flag and message
        """
        # Check if sequence is a list
        if not isinstance(sequence, list):
            return {
                "is_valid": False,
                "message": "❌ Error: Input must be a list of numbers.",
            }

        # Check minimum sequence length
        if len(sequence) < 2:
            return {
                "is_valid": False,
                "message": "❌ Error: Sequence must contain at least 2 numbers.",
            }

        # Check if all elements are numbers
        if not all(isinstance(num, (int, float)) and not (isinstance(num, bool)) for num in sequence):
            return {
                "is_valid": False,
                "message": "❌ Error: All sequence elements must be valid numbers.",
            }

        # Calculate differences between consecutive numbers
        differences = []
        for i in range(1, len(sequence)):
            differences.append(sequence[i] - sequence[i - 1])

        # Verify all differences are equal (arithmetic progression)
        common_difference = differences[0]
        is_arithmetic = all(diff == common_difference for diff in differences)

        if not is_arithmetic:
            return {
                "is_valid": False,
                "message": f"❌ Error: Not an arithmetic progression. Differences are: {differences}",
            }

        return {
            "is_valid": True,
            "message": "✅ Valid arithmetic progression detected!",
            "common_difference": common_difference,
            "differences": differences,
        }

    def predict_next_number(self, sequence):
        """
        Predict the next number in an arithmetic sequence.

        Args:
            sequence (list): The sequence to predict from

        Returns:
            dict: Prediction result with next number or error
        """
        # Validate the sequence first
        validation = self.validate_sequence(sequence)

        if not validation["is_valid"]:
            return {
                "success": False,
                "error": validation["message"],
            }

        # Calculate the next number
        common_difference = validation["common_difference"]
        last_number = sequence[-1]
        next_number = last_number + common_difference

        # Store this prediction in memory
        from datetime import datetime

        echo = {
            "timestamp": datetime.now().strftime("%H:%M:%S"),
            "sequence": sequence.copy(),
            "common_difference": common_difference,
            "prediction": next_number,
        }
        self.memories.append(echo)

        return {
            "success": True,
            "sequence": sequence,
            "common_difference": common_difference,
            "prediction": next_number,
            "message": f"🔮 The next number in the sequence is: {next_number}",
        }

    def display_memories(self):
        """Display the memory of all previous echoes"""
        if len(self.memories) == 0:
            print("📭 The Echo Chamber has no memories yet.")
            return

        print("\n📜 MEMORIES OF THE ECHO CHAMBER:")
        print("━" * 60)

        for index, echo in enumerate(self.memories, 1):
            print(f"\n🔔 Echo #{index} ({echo['timestamp']}):")
            print(f"   Sequence: [{', '.join(map(str, echo['sequence']))}]")
            print(f"   Common Difference: {echo['common_difference']}")
            print(f"   Next Number: {echo['prediction']}")

        print("\n" + "━" * 60)

    def clear_memories(self):
        """Clear all memories from the Echo Chamber"""
        self.memories = []
        print("🧹 All memories have been cleared from the Echo Chamber.")

    def get_memory_count(self):
        """Get the count of memories stored"""
        return len(self.memories)


# ============================================================================
# TEST SUITE
# ============================================================================


def run_tests():
    """Run comprehensive test suite"""
    print("\n╔════════════════════════════════════════════════════════════╗")
    print("║                                                            ║")
    print("║      ✨ ECHO CHAMBER TEST SUITE ✨                         ║")
    print("║                                                            ║")
    print("╚════════════════════════════════════════════════════════════╝\n")

    chamber = EchoChamber()
    passed_tests = 0
    total_tests = 0

    # Functional Test Cases
    test_cases = [
        {
            "name": "Sample Sequence: Basic Arithmetic Progression",
            "sequence": [3, 6, 9, 12],
            "expected_next": 15,
            "expected_diff": 3,
        },
        {
            "name": "Even Numbers",
            "sequence": [2, 4, 6, 8, 10],
            "expected_next": 12,
            "expected_diff": 2,
        },
        {
            "name": "Decreasing Sequence",
            "sequence": [20, 15, 10, 5],
            "expected_next": 0,
            "expected_diff": -5,
        },
        {
            "name": "Large Numbers",
            "sequence": [100, 200, 300, 400],
            "expected_next": 500,
            "expected_diff": 100,
        },
        {
            "name": "Negative Numbers",
            "sequence": [-10, -5, 0, 5, 10],
            "expected_next": 15,
            "expected_diff": 5,
        },
        {
            "name": "Difference of 1",
            "sequence": [5, 6, 7, 8],
            "expected_next": 9,
            "expected_diff": 1,
        },
        {
            "name": "Two Numbers Only",
            "sequence": [5, 10],
            "expected_next": 15,
            "expected_diff": 5,
        },
        {
            "name": "All Same Numbers",
            "sequence": [7, 7, 7, 7],
            "expected_next": 7,
            "expected_diff": 0,
        },
    ]

    print("🧪 RUNNING FUNCTIONAL TESTS:\n")

    for test_case in test_cases:
        total_tests += 1
        print(f"Test {total_tests}: {test_case['name']}")
        print("─" * 60)

        result = chamber.predict_next_number(test_case["sequence"])

        if result["success"]:
            prediction_correct = result["prediction"] == test_case["expected_next"]
            diff_correct = result["common_difference"] == test_case["expected_diff"]
            test_passed = prediction_correct and diff_correct

            print(f"  Sequence: [{', '.join(map(str, test_case['sequence']))}]")
            print(
                f"  Predicted: {result['prediction']} (Expected: {test_case['expected_next']})"
            )
            print(
                f"  Difference: {result['common_difference']} (Expected: {test_case['expected_diff']})"
            )

            if test_passed:
                print("  ✅ PASSED\n")
                passed_tests += 1
            else:
                print("  ❌ FAILED\n")
        else:
            print(f"  Error: {result['error']}")
            print("  ❌ FAILED\n")

    # Error Handling Tests
    print("🚨 RUNNING ERROR HANDLING TESTS:\n")

    error_tests = [
        {
            "name": "Invalid: Non-Arithmetic Sequence (Powers of 2)",
            "sequence": [1, 2, 4, 8],
            "should_fail": True,
        },
        {
            "name": "Invalid: Single Number",
            "sequence": [5],
            "should_fail": True,
        },
        {
            "name": "Invalid: Empty List",
            "sequence": [],
            "should_fail": True,
        },
        {
            "name": "Invalid: Mixed Progression",
            "sequence": [1, 3, 5, 8],
            "should_fail": True,
        },
    ]

    for index, test_case in enumerate(error_tests, 1):
        total_tests += 1
        print(f"Error Test {index}: {test_case['name']}")
        print("─" * 60)

        result = chamber.predict_next_number(test_case["sequence"])

        if test_case["should_fail"] and not result["success"]:
            print(f"  ✅ PASSED - Correctly rejected: {result['error']}\n")
            passed_tests += 1
        elif not test_case["should_fail"] and result["success"]:
            print("  ✅ PASSED - Correctly processed\n")
            passed_tests += 1
        else:
            print("  ❌ FAILED\n")

    # Memory Tests
    print("💾 RUNNING MEMORY TESTS:\n")

    total_tests += 1
    print(f"Test {total_tests}: Memory Storage and Retrieval")
    print("─" * 60)

    initial_memory_count = chamber.get_memory_count()
    print(f"  Initial memory count: {initial_memory_count}")

    # Only successful tests are stored in memories (failed ones are rejected)
    # So we expect only the passed functional tests (8)
    expected_memories = passed_tests - 4  # Subtract the error tests we already passed
    if expected_memories <= 0:
        expected_memories = len(test_cases)  # 8 functional tests should all be in memory
    
    print(f"  Expected memory count: {len(test_cases)} (from successful predictions)")
    print(f"  Actual memory count: {chamber.get_memory_count()}")

    if chamber.get_memory_count() == len(test_cases):
        print("  ✅ PASSED\n")
        passed_tests += 1
    else:
        print("  ❌ FAILED\n")

    # Display Sample Memories
    print("📜 SAMPLE MEMORIES FROM ECHO CHAMBER:")
    print("━" * 60)
    print("\nFirst 3 echoes stored in the chamber:\n")
    for i in range(min(3, len(chamber.memories))):
        echo = chamber.memories[i]
        seq_str = ", ".join(map(str, echo["sequence"]))
        print(
            f"Echo #{i + 1}: [{seq_str}] → {echo['prediction']} (diff: {echo['common_difference']})"
        )
    print("━" * 60)

    # Final Summary
    print("\n╔════════════════════════════════════════════════════════════╗")
    print("║                    📊 TEST SUMMARY                         ║")
    print("╠════════════════════════════════════════════════════════════╣")
    print(f"║ Total Tests Run:     {str(total_tests).ljust(46)}║")
    print(f"║ Tests Passed:        {str(passed_tests).ljust(46)}║")
    print(f"║ Tests Failed:        {str(total_tests - passed_tests).ljust(46)}║")
    success_rate = (passed_tests / total_tests) * 100
    print(f"║ Success Rate:        {f'{success_rate:.2f}%'.ljust(46)}║")
    print("╚════════════════════════════════════════════════════════════╝\n")

    if passed_tests == total_tests:
        print("🎉 All tests passed! The Echo Chamber is functioning perfectly!\n")
        return True
    else:
        print(
            f"⚠️  {total_tests - passed_tests} test(s) failed. Please review the output above.\n"
        )
        return False


# Run tests
if __name__ == "__main__":
    all_tests_passed = run_tests()
    exit(0 if all_tests_passed else 1)
