// export const misconceptionsContent = {
//   1: {
//     title: "Negative Exponent ≠ Negative Value",
//     explanation:
//       "A negative exponent does NOT make the number negative. It means take the reciprocal (flip the fraction).",
//     example:
//       "3^-2 = 1 / (3 × 3) = 1/9",
//   },

//   2: {
//     title: "Zero Exponent Rule",
//     explanation:
//       "Any non-zero number raised to the power 0 is always 1.",
//     example:
//       "5^0 = 1",
//   },

//   3: {
//     title: "Decimal Place Value",
//     explanation:
//       "Digits after decimal correspond to negative powers of 10 (tenths = 10^-1, hundredths = 10^-2).",
//     example:
//       "0.05 = 5 × 10^-2",
//   },

//   4: {
//     title: "Negative Exponent in Division",
//     explanation:
//       "Subtracting a negative exponent becomes addition.",
//     example:
//       "3^2 ÷ 3^-2 = 3^(2 + 2) = 3^4",
//   },

//   5: {
//     title: "Exponent is NOT Multiplication",
//     explanation:
//       "Exponent means repeated multiplication, not base × exponent.",
//     example:
//       "2^3 = 2 × 2 × 2 = 8 (not 6)",
//   },

//   6: {
//     title: "Standard Form Direction",
//     explanation:
//       "Small numbers use negative exponents, large numbers use positive.",
//     example:
//       "0.001 = 10^-3",
//   },

//   7: {
//     title: "Adding Standard Form",
//     explanation:
//       "You can only add numbers if exponents are equal.",
//     example:
//       "2×10^3 + 4×10^2 → convert first → 2.4×10^3",
//   },

//   8: {
//     title: "Exponent Rules Confusion",
//     explanation:
//       "Parentheses → multiply exponents. Same base multiplication → add exponents.",
//     example:
//       "(2^3)^2 = 2^6, but 2^3 × 2^2 = 2^5",
//   }
// };

export const misconceptionsContent = {
  1: {
    title: "Negative Exponent ≠ Negative Value",
    misconception:
      "Students think a negative exponent makes the number negative (e.g., 3^-2 = -9).",
    explanation:
      "A negative exponent means take the reciprocal. It tells you how many times to divide, not to change the sign.",
    example: "3^-2 = 1 / (3 × 3) = 1/9",
    tip: "👉 Negative exponent = flip, NOT minus sign",

    practiceQuestions: [
      {
        question: "Evaluate 5^-2",
        options: ["-10", "-25", "1/25", "1/10"],
        correctAnswer: "1/25",
        solution: "5^-2 = 1/(5×5) = 1/25"
      },
      {
        question: "Which is correct?",
        options: ["2^-3 = -8", "2^-3 = 1/8", "2^-3 = -6", "2^-3 = 1/6"],
        correctAnswer: "2^-3 = 1/8",
        solution: "Negative exponent creates reciprocal → 1/2^3 = 1/8"
      }
    ]
  },

  2: {
    title: "Zero Exponent Rule",
    misconception:
      "Students think any number to power 0 becomes 0.",
    explanation:
      "Any non-zero number raised to 0 is always 1 due to exponent patterns.",
    example: "5^0 = 1",
    tip: "👉 Anything to power 0 = 1",

    practiceQuestions: [
      {
        question: "Find (100 + 5)^0",
        options: ["0", "105", "1", "100"],
        correctAnswer: "1",
        solution: "Any non-zero number to power 0 is 1"
      },
      {
        question: "Evaluate 3 × 4^0",
        options: ["0", "12", "7", "3"],
        correctAnswer: "3",
        solution: "4^0 = 1 → 3×1 = 3"
      }
    ]
  },

  3: {
    title: "Decimal Place Value",
    misconception:
      "Students think decimal places use positive exponents.",
    explanation:
      "Digits after decimal use negative powers of 10 (tenths = 10^-1, hundredths = 10^-2).",
    example: "0.05 = 5 × 10^-2",
    tip: "👉 Move right → powers become negative",

    practiceQuestions: [
      {
        question: "In 0.05, 5 is multiplied by:",
        options: ["10^-1", "10^-2", "10^2", "10^0"],
        correctAnswer: "10^-2",
        solution: "Second decimal place = hundredths = 10^-2"
      },
      {
        question: "Expanded form of 0.7?",
        options: ["7×10^1", "7×10^0", "7×10^-1", "7×10^-2"],
        correctAnswer: "7×10^-1",
        solution: "First decimal place = tenths = 10^-1"
      }
    ]
  },

  4: {
    title: "Negative Exponent in Division",
    misconception:
      "Students forget minus minus becomes plus.",
    explanation:
      "When dividing powers, subtract exponents. Subtracting a negative becomes addition.",
    example: "3^2 ÷ 3^-2 = 3^(2 + 2) = 3^4",
    tip: "👉 Minus minus = plus",

    practiceQuestions: [
      {
        question: "Simplify 3^2 ÷ 3^-2",
        options: ["3^0", "3^4", "3^-4", "1"],
        correctAnswer: "3^4",
        solution: "3^(2 - (-2)) = 3^4"
      },
      {
        question: "Simplify 5^-1 ÷ 5^-3",
        options: ["5^2", "5^-4", "5^4", "5^-2"],
        correctAnswer: "5^2",
        solution: "5^(-1 - (-3)) = 5^2"
      }
    ]
  },

  5: {
    title: "Exponent is NOT Multiplication",
    misconception:
      "Students multiply base and exponent.",
    explanation:
      "Exponent means repeated multiplication, not base × exponent.",
    example: "2^3 = 2 × 2 × 2 = 8",
    tip: "👉 Power = repeat multiplication",

    practiceQuestions: [
      {
        question: "Evaluate 4^3",
        options: ["12", "7", "64", "16"],
        correctAnswer: "64",
        solution: "4×4×4 = 64"
      },
      {
        question: "Which represents 2×2×2×2×2?",
        options: ["2×5", "5^2", "2^5", "10"],
        correctAnswer: "2^5",
        solution: "2 repeated 5 times = 2^5"
      }
    ]
  },

  6: {
    title: "Standard Form Direction",
    misconception:
      "Students move decimal wrong or use wrong exponent sign.",
    explanation:
      "Small numbers → move right → negative exponent. Large → move left → positive exponent.",
    example: "0.00045 = 4.5 × 10^-4",
    tip: "👉 Small → negative exponent",

    practiceQuestions: [
      {
        question: "Express 0.00045 in standard form",
        options: ["4.5×10^4", "4.5×10^-4", "45×10^-5", "0.45×10^-3"],
        correctAnswer: "4.5×10^-4",
        solution: "Move 4 places → exponent = -4"
      },
      {
        question: "Convert 7.2×10^-3",
        options: ["0.0072", "7200", "0.072", "0.00072"],
        correctAnswer: "0.0072",
        solution: "Move decimal 3 places left"
      }
    ]
  },

  7: {
    title: "Adding Standard Form Numbers",
    misconception:
      "Students add coefficients without matching exponents.",
    explanation:
      "You must make exponents same before adding.",
    example: "2×10^3 + 4×10^2 = 2.4×10^3",
    tip: "👉 Same power first",

    practiceQuestions: [
      {
        question: "Add 2×10^3 + 4×10^2",
        options: ["6×10^5", "2.4×10^3", "6×10^3", "2.4×10^2"],
        correctAnswer: "2.4×10^3",
        solution: "Convert 4×10^2 → 0.4×10^3"
      },
      {
        question: "First step for subtracting 2×10^-5 from 5×10^-4?",
        options: [
          "Subtract directly",
          "Add exponents",
          "Convert to same exponent",
          "Divide by 10"
        ],
        correctAnswer: "Convert to same exponent",
        solution: "Make exponents equal first"
      }
    ]
  },

  8: {
    title: "Exponent Rules Confusion",
    misconception:
      "Students mix up product and power rules.",
    explanation:
      "Brackets → multiply exponents. Same base multiplication → add exponents.",
    example: "(2^3)^2 = 2^6, but 2^3 × 2^2 = 2^5",
    tip: "👉 Brackets = multiply, same base = add",

    practiceQuestions: [
      {
        question: "Simplify (4^2)^-3",
        options: ["4^-1", "4^5", "4^-6", "4^6"],
        correctAnswer: "4^-6",
        solution: "2 × (-3) = -6"
      },
      {
        question: "Simplify 10^-2 × 10^-4",
        options: ["10^-4", "10^-6", "10^0", "10^-2"],
        correctAnswer: "10^-6",
        solution: "Add exponents → -2 + (-4) = -6"
      }
    ]
  }
};