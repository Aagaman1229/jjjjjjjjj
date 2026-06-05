import type { Topic } from '../types'

export const curriculum: Topic[] = [
  // ---------------------------------------------------------------------------
  //  QUANT � 15 Topics
  // ---------------------------------------------------------------------------
  {
    id: 'arithmetic',
    title: 'Arithmetic',
    description: 'Master the building blocks of GRE math: integers, place value, the order of operations (PEMDAS), and absolute value. Covers addition, subtraction, multiplication, and division with positive and negative numbers — essential foundation for every quant topic on the test.',
    icon: '\u2795',
    category: 'quant',
    lessons: [
      {
        id: 'arithmetic-integers-place-value',
        title: 'Integers and Place Value',
        topicId: 'arithmetic',
        content: `## Overview

The integer number system is the bedrock of GRE arithmetic. Integers are whole numbers — positive, negative, and zero — with no fractional or decimal parts. Understanding place value means recognizing that each digit in a number occupies a position worth a specific power of 10, and this concept extends to decimals as well. The GRE heavily tests your ability to identify digit values in large numbers and decimals, especially when combined with operations.

## Key Concepts

### Place Value

In the number 47,382, the digit 4 is in the ten-thousands place (40,000), 7 is in the thousands place (7,000), 3 is in the hundreds place (300), 8 is in the tens place (80), and 2 is in the ones place (2). In 3.14159, the 1 is in the tenths place (1/10), the 4 is in the hundredths place (4/100), and the 1 is in the thousandths place (1/1000). The GRE often tests whether you can identify the value of a digit in a large number or a decimal, especially when combined with operations.

### Comparing and Ordering Integers

On the number line, values increase as you move to the right. Every positive integer is greater than zero, and zero is greater than every negative integer. For negative numbers, the one with the smaller absolute value is actually larger: -3 > -10 because -3 is to the right of -10 on the number line.

### Integer Operations

The four basic operations are addition, subtraction, multiplication, and division. Addition is combining quantities; subtraction is finding the difference. Multiplication is repeated addition, and division is splitting into equal groups. The GRE expects you to perform these operations fluently with integers of any size.

- When adding integers with the same sign, add their absolute values and keep the sign.
- When adding integers with different signs, subtract the smaller absolute value from the larger one and keep the sign of the number with the larger absolute value.
- For subtraction, change the subtraction to addition of the opposite: a - b = a + (-b). This is a crucial rule that prevents sign errors.
- **Sign rules**: same signs yield a positive result; different signs yield a negative result. An even number of negative factors produces a positive product; an odd number produces a negative product.

### PEMDAS and Order of Operations

PEMDAS (Parentheses, Exponents, Multiplication and Division, Addition and Subtraction) dictates the order of operations. Multiplication and division are at the same level, performed left to right. Addition and subtraction are likewise at the same level, performed left to right.

> **Key Insight:** "Please Excuse My Dear Aunt Sally" means you do not necessarily multiply before dividing — you do whichever comes first when reading left to right.

### Absolute Value

Absolute value measures distance from zero on the number line. It is always non-negative. The absolute value of 5 is 5; the absolute value of -5 is also 5.

- The equation |x| = 5 has two solutions: x = 5 and x = -5.
- The inequality |x| < 5 means -5 < x < 5.
- The inequality |x| > 5 means x < -5 or x > 5.

> **Key Insight:** If |a| = |b|, you cannot conclude a = b; you only know they are the same distance from zero. Similarly, if |a| = a, you know a ≥ 0, but if |a| = -a, you know a ≤ 0. These subtleties separate strong GRE performers from average ones.

## Important Rules

- Place value: each digit's position determines its value (units, tens, hundreds, etc.)
- Sign rules for multiplication/division: like signs produce positive, unlike signs produce negative
- PEMDAS: Parentheses first, then Exponents, then Multiplication/Division (left to right), then Addition/Subtraction (left to right)
- Absolute value |x|: distance from zero; |x| = a means x = a or x = -a
- For any real number x, |x| ≥ 0, and |x| = x if x ≥ 0, |x| = -x if x < 0
`,
        objectives: [
          'Identify the place value of any digit in an integer or decimal',
          'Perform addition, subtraction, multiplication, and division with integers using correct sign rules',
          'Apply the order of operations (PEMDAS) correctly to multi-step expressions',
          'Solve equations and inequalities involving absolute value',
          'Compare and order integers on the number line'
        ],
        explanation: 'Integers form the complete set of whole numbers and their negatives. Place value assigns each digit a positional weight in powers of 10. The order of operations (PEMDAS) governs which calculation to perform first. Absolute value measures distance from zero, always yielding a non-negative result.',
        keyIdeas: [
          'Place value: each digit\'s position determines its value (units, tens, hundreds, etc.)',
          'Sign rules for multiplication/division: like signs produce positive, unlike signs produce negative',
          'PEMDAS: Parentheses first, then Exponents, then Multiplication/Division (left to right), then Addition/Subtraction (left to right)',
          'Absolute value |x|: distance from zero; |x| = a means x = a or x = -a',
          'For any real number x, |x| \u2265 0, and |x| = x if x \u2265 0, |x| = -x if x < 0'
        ],
        formulas: [
          {
            id: 'add_integers_diff_signs',
            name: 'Adding Integers with Different Signs',
            formula: 'a + b = sign(larger |value|) \u00d7 (|a| - |b|) when a and b have opposite signs',
            explanation: 'To add integers with different signs, find the difference of their absolute values and keep the sign of the number with the larger absolute value.',
            usage: 'Use whenever adding two integers that have opposite signs.',
            category: 'arithmetic',
            examples: ['15 + (-8) = +7', '-12 + 7 = -5']
          },
          {
            id: 'subtract_integers',
            name: 'Subtracting Integers',
            formula: 'a - b = a + (-b)',
            explanation: 'Subtraction is equivalent to adding the opposite (additive inverse).',
            usage: 'Use to simplify any integer subtraction.',
            category: 'arithmetic',
            examples: ['7 - (-3) = 7 + 3 = 10', '-5 - 8 = -5 + (-8) = -13']
          },
          {
            id: 'abs_value_eq',
            name: 'Absolute Value Equations',
            formula: '|x| = a \u21d2 x = a or x = -a (for a \u2265 0)',
            explanation: 'An absolute value equation with a positive constant produces two possible solutions.',
            usage: 'Use to solve any equation involving absolute value.',
            category: 'arithmetic',
            examples: ['|x - 3| = 7 \u21d2 x - 3 = 7 or x - 3 = -7 \u21d2 x = 10 or x = -4']
          }
        ],
        examples: [
          {
            question: 'What is the value of 6 + 4 \u00f7 2 - 3 \u00d7 2?',
            solution: '6 + 4 \u00f7 2 - 3 \u00d7 2 = 6 + 2 - 6 = 2',
            explanation: 'By PEMDAS, we perform division and multiplication before addition and subtraction. 4 \u00f7 2 = 2 and 3 \u00d7 2 = 6. Then we have 6 + 2 - 6 = 2.'
          },
          {
            question: 'If |2x - 5| = 9, what are the possible values of x?',
            solution: 'x = 7 or x = -2',
            explanation: 'Set up two equations: 2x - 5 = 9 or 2x - 5 = -9. Solve the first: 2x = 14, x = 7. Solve the second: 2x = -4, x = -2.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Evaluate: 12 - 3 \u00d7 (4 + 2) \u00f7 3\u00b2 + 1',
            solution: 'We apply PEMDAS step by step. First, parentheses: (4 + 2) = 6. Then exponents: 3\u00b2 = 9. Then multiplication and division left to right: 3 \u00d7 6 = 18, then 18 \u00f7 9 = 2. Then addition and subtraction left to right: 12 - 2 + 1 = 11.',
            steps: [
              'Parentheses: 4 + 2 = 6, giving 12 - 3 \u00d7 6 \u00f7 3\u00b2 + 1',
              'Exponents: 3\u00b2 = 9, giving 12 - 3 \u00d7 6 \u00f7 9 + 1',
              'Multiplication/Division L\u2192R: 3 \u00d7 6 = 18, giving 12 - 18 \u00f7 9 + 1',
              '18 \u00f7 9 = 2, giving 12 - 2 + 1',
              'Addition/Subtraction L\u2192R: 12 - 2 = 10, 10 + 1 = 11'
            ],
            answer: '11'
          },
          {
            problem: 'If the temperature starts at -8\u00b0C, rises 15\u00b0C, then drops 7\u00b0C, what is the final temperature?',
            solution: 'Start at -8. A rise of 15 means add 15: -8 + 15 = 7. A drop of 7 means subtract 7: 7 - 7 = 0.',
            steps: [
              'Starting temperature: -8\u00b0C',
              'After rising 15\u00b0C: -8 + 15 = 7\u00b0C',
              'After dropping 7\u00b0C: 7 - 7 = 0\u00b0C'
            ],
            answer: '0\u00b0C'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Thinking that |-3| = -3 because "absolute value makes negatives positive"',
            correction: '|-3| = 3. Absolute value returns the distance from zero, which is always non-negative.',
            explanation: 'The absolute value of a number is its distance from zero on the number line. Distance is always positive (or zero). So |-3| = 3, not -3.'
          }
        ],
        shortcuts: [
          {
            technique: 'Adding a negative is subtraction',
            description: 'Instead of thinking "add a negative number," just subtract its absolute value.',
            example: '17 + (-9) = 17 - 9 = 8'
          },
          {
            technique: 'Subtracting a negative is addition',
            description: 'When you see minus a negative, change both minus signs to plus: a - (-b) = a + b.',
            example: '10 - (-3) = 10 + 3 = 13'
          }
        ],
        practiceQuestions: ['q_quant_001', 'q_quant_002', 'q_quant_003', 'q_quant_004', 'q_quant_005', 'q_quant_006']
      },
      {
        id: 'arithmetic-pemdas-operations',
        title: 'PEMDAS and Integer Operations',
        topicId: 'arithmetic',
        content: `## Overview

The order of operations is the single most important convention in arithmetic because it ensures that every mathematical expression has one unambiguous value. PEMDAS stands for Parentheses, Exponents, Multiplication and Division (same level, left to right), and Addition and Subtraction (same level, left to right). Mastering PEMDAS requires deliberate practice and pattern recognition.

## Key Concepts

### PEMDAS Hierarchy

- **Parentheses** override the default order. Always compute what is inside parentheses first. Nested parentheses work from the innermost outward.
- **Exponents** indicate repeated multiplication. The expression 2⁵ = 2 × 2 × 2 × 2 × 2 = 32. Zero exponents: any non-zero number raised to the power 0 equals 1 (a⁰ = 1).
- **Multiplication and Division** have equal priority; perform whichever appears first when reading left to right.
- **Addition and Subtraction** have equal priority; perform whichever appears first when reading left to right.

> **Key Insight:** A common misunderstanding is that multiplication must always come before division. This is false. Consider 12 ÷ 4 × 3. Reading left to right: 12 ÷ 4 = 3, then 3 × 3 = 9. If you incorrectly multiply first, you get 1.

### The Distributive Property

The distributive property connects multiplication with addition and subtraction: a(b + c) = ab + ac. This is especially useful when simplifying expressions and verifying your work. For example, 3(x + 5) = 3x + 15.

### Commutative and Associative Properties

- **Commutative property**: a + b = b + a, and a × b = b × a. Subtraction and division are NOT commutative.
- **Associative property**: (a + b) + c = a + (b + c), and (a × b) × c = a × (b × c).

### Evaluating Variable Expressions

When evaluating expressions with variables, the same order of operations applies. Given x = 3, evaluate 2x² + 5x - 4: exponents come first (x² = 9), then multiplication (2 × 9 = 18, 5 × 3 = 15), then addition and subtraction (18 + 15 - 4 = 29).

## Important Rules

- Multiplication and division have equal priority; process left to right
- Addition and subtraction have equal priority; process left to right
- The distributive property: a(b + c) = ab + ac
- The commutative property: a + b = b + a, ab = ba
- The associative property: (a + b) + c = a + (b + c), (ab)c = a(bc)
- Exponents apply only to the immediately preceding base unless parentheses indicate otherwise

> **Key Insight:** On the GRE, the best strategy is to rewrite expressions step by step, performing exactly one operation at a time. Speed comes from recognizing patterns rather than from calculating faster.

`,
        objectives: [
          'Apply the correct order of operations to evaluate numerical expressions',
          'Use the distributive, commutative, and associative properties to simplify expressions',
          'Evaluate expressions with integer exponents correctly',
          'Distinguish between (ab)\u207f and a\u00d7b\u207f in algebraic expressions',
          'Simplify nested parentheses and bracket expressions systematically'
        ],
        explanation: 'PEMDAS establishes a universal hierarchy: Parentheses \u2192 Exponents \u2192 Multiplication/Division (L\u2192R) \u2192 Addition/Subtraction (L\u2192R). Multiplication and division share priority; addition and subtraction share priority.',
        keyIdeas: [
          'Multiplication and division have equal priority; process left to right',
          'Addition and subtraction have equal priority; process left to right',
          'The distributive property: a(b + c) = ab + ac',
          'The commutative property: a + b = b + a, ab = ba',
          'The associative property: (a + b) + c = a + (b + c), (ab)c = a(bc)'
        ],
        formulas: [
          {
            id: 'distributive',
            name: 'Distributive Property',
            formula: 'a(b + c) = ab + ac',
            explanation: 'Multiplication distributes over addition (and subtraction). This property underlies algebraic expansion and factoring.',
            usage: 'Use to expand expressions like 3(x + 4) or to factor expressions like 6x + 9 = 3(2x + 3).',
            category: 'arithmetic',
            examples: ['5(x + 3) = 5x + 15', '-2(3x - 4) = -6x + 8']
          },
          {
            id: 'power_priority',
            name: 'Exponent Priority in PEMDAS',
            formula: 'ab\u207f means a \u00d7 (b\u207f), NOT (ab)\u207f',
            explanation: 'Exponents apply only to the immediately preceding base unless parentheses indicate otherwise.',
            usage: 'Use to correctly interpret expressions like 3x\u00b2, 2\u00b3\u207a\u00b9, and similar compound expressions.',
            category: 'arithmetic',
            examples: ['3x\u00b2 means 3 \u00d7 (x\u00b2), not (3x)\u00b2', '-2\u2074 = -(2\u2074) = -16, not (-2)\u2074 = 16']
          }
        ],
        examples: [
          {
            question: 'Simplify: 5 + 2[(3 + 1)\u00b2 \u00f7 8]',
            solution: '5 + 2[(4)\u00b2 \u00f7 8] = 5 + 2[16 \u00f7 8] = 5 + 2[2] = 5 + 4 = 9',
            explanation: 'Work from innermost parentheses: (3+1) = 4. Then apply the exponent: 4\u00b2 = 16. Then divide: 16 \u00f7 8 = 2. Then multiply: 2 \u00d7 2 = 4. Finally add: 5 + 4 = 9.'
          },
          {
            question: 'What is the value of 15 - 3 \u00d7 2\u00b3 \u00f7 4?',
            solution: '15 - 3 \u00d7 8 \u00f7 4 = 15 - 24 \u00f7 4 = 15 - 6 = 9',
            explanation: 'Exponent first: 2\u00b3 = 8. Then multiplication and division left to right: 3 \u00d7 8 = 24, then 24 \u00f7 4 = 6. Finally subtract: 15 - 6 = 9.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Simplify: (8 - 2 \u00d7 3)\u00b7\u00b2 + 4 \u00f7 2\u00b2 - 1',
            solution: 'Inside parentheses, multiplication before subtraction: 2 \u00d7 3 = 6, then 8 - 6 = 2. The decimal .\u00b7\u00b2 is 0.2 squared: 0.04. Also, 2\u00b2 = 4, so 4 \u00f7 4 = 1. Then 0.04 + 1 - 1 = 0.04.',
            steps: [
              'Inside parentheses: multiply first: 2 \u00d7 3 = 6, giving 8 - 6 = 2',
              'Now we have: 2\u00b7\u00b2 + 4 \u00f7 2\u00b2 - 1',
              'Exponents: 2\u00b7\u00b2 = 0.04 and 2\u00b2 = 4',
              'Now: 0.04 + 4 \u00f7 4 - 1 = 0.04 + 1 - 1',
              'Addition/Subtraction: 0.04 + 0 = 0.04'
            ],
            answer: '0.04'
          },
          {
            problem: 'If a = 3 and b = -2, evaluate: 2a\u00b2b - 3ab + 4',
            solution: 'Substitute: 2(3)\u00b2(-2) - 3(3)(-2) + 4. Exponent first: 3\u00b2 = 9. Then multiplications: 2 \u00d7 9 \u00d7 (-2) = -36, and 3 \u00d7 3 \u00d7 (-2) = -18. Then -36 - (-18) + 4 = -36 + 18 + 4 = -14.',
            steps: [
              'Substitute: 2(3)\u00b2(-2) - 3(3)(-2) + 4',
              'Exponent: 3\u00b2 = 9, giving 2(9)(-2) - 3(3)(-2) + 4',
              'Multiply: 2 \u00d7 9 \u00d7 (-2) = -36',
              'Multiply: 3 \u00d7 3 \u00d7 (-2) = -18',
              'Now: -36 - (-18) + 4 = -36 + 18 + 4 = -14'
            ],
            answer: '-14'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Calculating 12 \u00f7 3 \u00d7 2 as 12 \u00f7 (3 \u00d7 2) = 12 \u00f7 6 = 2',
            correction: '12 \u00f7 3 \u00d7 2 = (12 \u00f7 3) \u00d7 2 = 4 \u00d7 2 = 8',
            explanation: 'Multiplication and division have equal precedence and are evaluated left to right.'
          },
          {
            mistake: 'Thinking -3\u00b2 = 9',
            correction: '-3\u00b2 = -(3\u00b2) = -9',
            explanation: 'The exponent applies only to the 3, not to the negative sign. To get 9, you need parentheses: (-3)\u00b2 = 9.'
          }
        ],
        shortcuts: [
          {
            technique: 'Cancel before multiplying',
            description: 'When evaluating fractions with multiplication, cancel common factors in numerators and denominators before multiplying.',
            example: '(12 \u00d7 5) \u00f7 (3 \u00d7 4) = (12/3) \u00d7 (5/4) = 4 \u00d7 1.25 = 5'
          },
          {
            technique: 'Change subtraction to addition of the opposite',
            description: 'Convert all subtractions to "add the opposite" to avoid sign errors.',
            example: '8 - 3 - 5 + 2 = 8 + (-3) + (-5) + 2 = (8+2) + (-3-5) = 10 - 8 = 2'
          }
        ],
        practiceQuestions: ['q_quant_001', 'q_quant_002', 'q_quant_003', 'q_quant_004', 'q_quant_005', 'q_quant_006']
      },
      {
        id: 'arithmetic-absolute-value',
        title: 'Absolute Value and the Number Line',
        topicId: 'arithmetic',
        content: `## Overview

Absolute value is one of the most frequently tested foundational concepts on the GRE Quantitative section. The absolute value of a number x, written |x|, is its distance from zero on the number line, regardless of direction. Because distance cannot be negative, absolute value is always non-negative: |x| ≥ 0 for every real number x.

## Key Concepts

### Definition of Absolute Value

The formal definition is piecewise: |x| = x if x ≥ 0, and |x| = -x if x < 0. This means absolute value is the "unsigned" version of a number. The absolute value of 7 is 7; the absolute value of -7 is also 7.

### Absolute Value Equations

The equation |x| = a (where a > 0) has two solutions: x = a and x = -a. Graphically, there are two points on the number line exactly a units from zero. When the absolute value involves a linear expression, isolate the absolute value first, then split into cases.

> **Key Insight:** For |2x + 1| = 5, first isolate, then write two equations: 2x + 1 = 5 or 2x + 1 = -5. Solve each: x = 2 or x = -3.

### Absolute Value Inequalities

- The inequality |x| < a describes all numbers whose distance from zero is less than a. This translates to -a < x < a. For example, |x| < 3 means -3 < x < 3.
- The inequality |x| > a describes numbers whose distance from zero exceeds a, which means x < -a or x > a.

### The Triangle Inequality

The triangle inequality states that |a + b| ≤ |a| + |b|. Equality occurs when a and b have the same sign or one is zero. This means |a + b| can never exceed |a| + |b|, but it can be much smaller if a and b have opposite signs.

### Properties of Absolute Value

- |ab| = |a| × |b|
- |a/b| = |a|/|b| (provided b ≠ 0)
- |a - b| represents the distance between a and b on the number line

> **Key Insight:** The distance interpretation is especially powerful. Instead of solving |x - 5| < 2 algebraically, you can think "x is within 2 units of 5," which immediately gives 3 < x < 7.

## Important Rules

- |x| = x for x ≥ 0 and |x| = -x for x < 0
- |x| = a (a > 0) has two solutions: x = a or x = -a
- |x| < a ⇒ -a < x < a; |x| > a ⇒ x < -a or x > a
- |a - b| is the distance between a and b on the number line
- Triangle inequality: |a + b| ≤ |a| + |b|
- Squaring both sides removes absolute value: |x| = √(x²)

`,
        objectives: [
          'Define and compute absolute value using the piecewise definition',
          'Solve absolute value equations and inequalities algebraically',
          'Interpret absolute value as distance on the number line',
          'Apply the triangle inequality in quantitative comparisons',
          'Translate absolute value expressions into compound inequalities'
        ],
        explanation: 'Absolute value is distance from zero, always non-negative. Equations |x| = a split into x = \u00b1a. Inequalities |x| < a become -a < x < a; |x| > a becomes x < -a or x > a.',
        keyIdeas: [
          '|x| = x for x \u2265 0 and |x| = -x for x < 0',
          '|x| = a (a > 0) has two solutions: x = a or x = -a',
          '|x| < a \u21d2 -a < x < a; |x| > a \u21d2 x < -a or x > a',
          '|a - b| is the distance between a and b on the number line',
          'Triangle inequality: |a + b| \u2264 |a| + |b|'
        ],
        formulas: [
          {
            id: 'triangle_inequality',
            name: 'Triangle Inequality',
            formula: '|a + b| \u2264 |a| + |b|',
            explanation: 'The absolute value of a sum is always less than or equal to the sum of the absolute values.',
            usage: 'Use in quantitative comparisons where you need to bound the value of |a + b|.',
            category: 'arithmetic',
            examples: ['|5 + (-3)| = 2 \u2264 5 + 3 = 8', '|4 + 7| = 11 = 4 + 7 (equality since same sign)']
          },
          {
            id: 'abs_value_product',
            name: 'Absolute Value of a Product',
            formula: '|ab| = |a| \u00d7 |b|',
            explanation: 'The absolute value of a product equals the product of the individual absolute values.',
            usage: 'Use to simplify expressions like |-3x| = 3|x| or to reason about the sign of a product.',
            category: 'arithmetic',
            examples: ['|-5 \u00d7 3| = |-15| = 15, and |-5| \u00d7 |3| = 5 \u00d7 3 = 15']
          }
        ],
        examples: [
          {
            question: 'If |3x - 6| \u2264 9, what is the range of x?',
            solution: '-1 \u2264 x \u2264 5',
            explanation: '|3x - 6| \u2264 9 means -9 \u2264 3x - 6 \u2264 9. Add 6 throughout: -3 \u2264 3x \u2264 15. Divide by 3: -1 \u2264 x \u2264 5.'
          },
          {
            question: 'Quantity A: |a + b|, Quantity B: |a| + |b|. If a = -7 and b = 4, which is larger?',
            solution: 'Quantity A = |-7 + 4| = |-3| = 3. Quantity B = |-7| + |4| = 7 + 4 = 11. Quantity B is larger.',
            explanation: 'This demonstrates the triangle inequality. Since a and b have opposite signs, |a + b| is significantly less than |a| + |b|.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Solve |2x - 5| + 3 = 12',
            solution: 'First isolate the absolute value: |2x - 5| + 3 = 12 \u21d2 |2x - 5| = 9. Then split into two equations: 2x - 5 = 9 or 2x - 5 = -9. Solve first: 2x = 14, x = 7. Solve second: 2x = -4, x = -2.',
            steps: [
              'Isolate absolute value: subtract 3 from both sides \u21d2 |2x - 5| = 9',
              'Write two equations: 2x - 5 = 9 OR 2x - 5 = -9',
              'Solve first: 2x = 14 \u21d2 x = 7',
              'Solve second: 2x = -4 \u21d2 x = -2'
            ],
            answer: 'x = 7 or x = -2'
          },
          {
            problem: 'On the number line, how many integers satisfy |x + 3| < 5?',
            solution: '|x + 3| < 5 means -5 < x + 3 < 5. Subtract 3: -8 < x < 2. The integers satisfying this are -7, -6, -5, -4, -3, -2, -1, 0, 1. That is 9 integers.',
            steps: [
              'Rewrite inequality: -5 < x + 3 < 5',
              'Subtract 3 throughout: -8 < x < 2',
              'List integers strictly between -8 and 2: -7, -6, -5, -4, -3, -2, -1, 0, 1',
              'Count: 9 integers'
            ],
            answer: '9'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Solving |x - 4| > 3 as x - 4 > 3 OR x - 4 < 3, giving x > 7 or x < 7',
            correction: '|x - 4| > 3 means x - 4 > 3 OR x - 4 < -3, giving x > 7 or x < 1.',
            explanation: 'For "greater than," the two cases go in opposite directions: one is positive, the other is negative.'
          }
        ],
        shortcuts: [
          {
            technique: 'Distance interpretation for absolute value',
            description: 'Read |x - a| < b as "x is within b units of a." This makes compound inequalities intuitive.',
            example: '|x - 10| < 3 \u21d2 x is between 7 and 13 (within 3 units of 10)'
          },
          {
            technique: 'Square both sides to remove absolute value',
            description: 'Since |x| = \u221a(x\u00b2), squaring an absolute value equation removes the absolute value.',
            example: '|3x - 1| = 5 \u21d2 (3x - 1)\u00b2 = 25'
          }
        ],
        practiceQuestions: ['q_quant_001', 'q_quant_002', 'q_quant_003', 'q_quant_004', 'q_quant_005', 'q_quant_006']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  TOPIC 2: FRACTIONS & DECIMALS
  // ---------------------------------------------------------------------------
  {
    id: 'fractions-decimals',
    title: 'Fractions and Decimals',
    description: 'Learn to work fluently with fractions, decimals, and complex fractions — including operations, conversions, and comparisons. Rational numbers appear in nearly every GRE quant section, making this a critical topic to master.',
    icon: '\u00BD',
    category: 'quant',
    lessons: [
      {
        id: 'fractions-basics-operations',
        title: 'Fractions: Operations and Basics',
        topicId: 'fractions-decimals',
        content: `## Overview

A fraction represents a part of a whole. The numerator (top number) indicates how many parts we have; the denominator (bottom number) indicates how many equal parts make the whole. Fraction problems on the GRE test both computation and conceptual understanding, requiring fluency with fractions in all forms without a calculator.

## Key Concepts

### Types of Fractions

- **Proper fraction**: numerator less than denominator (3/5)
- **Improper fraction**: numerator greater than or equal to denominator (7/4)
- **Mixed number**: combines a whole number and a proper fraction (2 1/3)

### The Fundamental Property of Fractions

The single most important rule: you can multiply or divide the numerator and denominator by the same non-zero number without changing the value of the fraction. This is the basis for simplifying fractions (reducing to lowest terms) and finding common denominators.

### Simplifying Fractions

To simplify a fraction, divide the numerator and denominator by their greatest common divisor (GCD). For 18/24, the GCD of 18 and 24 is 6. Dividing: 18 ÷ 6 = 3, 24 ÷ 6 = 4, so 18/24 = 3/4.

### Operations with Fractions

- **Adding and subtracting**: requires a common denominator. Use the product of the two denominators as the common denominator: 2/3 + 3/5 = 10/15 + 9/15 = 19/15.
- **Multiplying**: multiply numerators together and denominators together. Simplify at the end (or cancel first to keep numbers smaller).
- **Dividing**: multiply by the reciprocal of the divisor. For 3/4 ÷ 2/5: 3/4 × 5/2 = 15/8 = 1 7/8.

### Comparing Fractions

- When numerators are the same, the fraction with the smaller denominator is larger (1/3 > 1/5).
- When denominators are the same, the fraction with the larger numerator is larger (4/7 > 3/7).
- When neither matches, cross-multiply: to compare a/b and c/d, compare a × d with b × c. If ad > bc, then a/b > c/d.

### Complex Fractions

Complex fractions have fractions in the numerator, denominator, or both. Simplify by rewriting the main fraction bar as division. For example, (2/3)/(4/5) = 2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6.

## Important Rules

- a/b = (a÷d)/(b÷d) for any d ≠ 0 that divides both a and b
- To add fractions: find a common denominator, then add numerators
- To multiply fractions: multiply numerators, multiply denominators
- To divide fractions: multiply by the reciprocal of the divisor
- Cross-multiplication: a/b = c/d ⇔ ad = bc
- Cancel common factors between numerators and denominators before multiplying

`,
        objectives: [
          'Simplify fractions to lowest terms using GCD',
          'Add, subtract, multiply, and divide fractions fluently',
          'Compare fractions using cross-multiplication',
          'Convert between improper fractions and mixed numbers',
          'Simplify complex fractions'
        ],
        explanation: 'Fractions represent division of numerator by denominator. The fundamental property allows multiplying/dividing numerator and denominator by the same number. Add/subtract requires common denominators; multiply straight across; divide by multiplying by the reciprocal.',
        keyIdeas: [
          'a/b = (a\u00f7d)/(b\u00f7d) for any d \u2260 0 that divides both a and b',
          'To add fractions: find a common denominator, then add numerators',
          'To multiply fractions: multiply numerators, multiply denominators',
          'To divide fractions: multiply by the reciprocal of the divisor',
          'Cross-multiplication: a/b = c/d \u21d4 ad = bc'
        ],
        formulas: [
          {
            id: 'fraction_addition',
            name: 'Adding Fractions',
            formula: 'a/b + c/d = (ad + bc) / bd',
            explanation: 'The general formula for adding two fractions. The common denominator is the product of the two denominators.',
            usage: 'Use as a universal method for adding any two fractions.',
            category: 'arithmetic',
            examples: ['2/5 + 3/7 = (14 + 15)/35 = 29/35']
          },
          {
            id: 'fraction_division',
            name: 'Dividing Fractions',
            formula: 'a/b \u00f7 c/d = a/b \u00d7 d/c = ad/(bc)',
            explanation: 'To divide by a fraction, multiply by its reciprocal (swap numerator and denominator of the divisor).',
            usage: 'Use for all fraction division. Remember: "Keep, Change, Flip".',
            category: 'arithmetic',
            examples: ['3/4 \u00f7 2/3 = 3/4 \u00d7 3/2 = 9/8']
          }
        ],
        examples: [
          {
            question: 'Simplify: 3/8 + 5/12',
            solution: 'LCM of 8 and 12 is 24. 3/8 = 9/24, 5/12 = 10/24. Sum = 19/24.',
            explanation: 'Find the least common denominator (LCD = LCM of denominators). Convert each fraction to an equivalent fraction with denominator 24. Then add numerators.'
          },
          {
            question: 'Which is larger, 5/8 or 7/11?',
            solution: 'Cross-multiply: 5 \u00d7 11 = 55, 8 \u00d7 7 = 56. Since 55 < 56, 5/8 < 7/11. So 7/11 is larger.',
            explanation: 'Cross-multiplying compares the two products: ad and bc. If ad > bc, then a/b > c/d.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Calculate: (2/3 + 1/6) \u00f7 (3/4 - 1/2)',
            solution: 'First simplify inside each parenthesis. 2/3 + 1/6: common denominator 6 gives 4/6 + 1/6 = 5/6. 3/4 - 1/2: common denominator 4 gives 3/4 - 2/4 = 1/4. Then (5/6) \u00f7 (1/4) = 5/6 \u00d7 4/1 = 20/6 = 10/3 = 3 1/3.',
            steps: [
              'Add fractions in numerator: 2/3 = 4/6, so 4/6 + 1/6 = 5/6',
              'Subtract fractions in denominator: 1/2 = 2/4, so 3/4 - 2/4 = 1/4',
              'Divide: (5/6) \u00f7 (1/4) = 5/6 \u00d7 4/1 = 20/6',
              'Simplify: 20/6 = 10/3 = 3 1/3'
            ],
            answer: '10/3 or 3 1/3'
          },
          {
            problem: 'A recipe calls for 2/3 cup of sugar. If you want to make 3/4 of the recipe, how much sugar do you need?',
            solution: 'Multiply the amounts: (3/4) \u00d7 (2/3) = (3 \u00d7 2)/(4 \u00d7 3) = 6/12 = 1/2 cup.',
            steps: [
              'Write the multiplication: (3/4) \u00d7 (2/3)',
              'Multiply numerators: 3 \u00d7 2 = 6',
              'Multiply denominators: 4 \u00d7 3 = 12',
              'Simplify: 6/12 = 1/2'
            ],
            answer: '1/2 cup'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Adding fractions by adding numerators and denominators: 2/5 + 3/7 = 5/12',
            correction: '2/5 + 3/7 = (2\u00d77 + 3\u00d75)/(5\u00d77) = (14+15)/35 = 29/35',
            explanation: 'You cannot add numerators and denominators directly. You must first express both fractions with a common denominator, then add only the numerators.'
          },
          {
            mistake: 'In fraction division, multiplying by the same fraction instead of the reciprocal: 2/3 \u00f7 4/5 = 2/3 \u00d7 4/5 = 8/15',
            correction: '2/3 \u00f7 4/5 = 2/3 \u00d7 5/4 = 10/12 = 5/6',
            explanation: 'Dividing by a fraction requires multiplying by its reciprocal (flip the numerator and denominator).'
          }
        ],
        shortcuts: [
          {
            technique: 'Cancel before multiplying',
            description: 'When multiplying fractions, cancel common factors between any numerator and any denominator before multiplying.',
            example: '8/15 \u00d7 5/12: cancel 8 and 12 (factor 4), cancel 5 and 15 (factor 5): 2/3 \u00d7 1/3 = 2/9'
          },
          {
            technique: 'Bowtie method for addition',
            description: 'For adding two fractions, multiply diagonally and multiply denominators: a/b + c/d = (ad + bc)/bd.',
            example: '3/4 + 2/5 = (3\u00d75 + 4\u00d72)/(4\u00d75) = (15 + 8)/20 = 23/20'
          }
        ],
        practiceQuestions: ['q_quant_001', 'q_quant_002', 'q_quant_003', 'q_quant_004', 'q_quant_005', 'q_quant_006']
      },
      {
        id: 'fractions-decimals-conversions',
        title: 'Decimal Operations and Fraction-Decimal Conversions',
        topicId: 'fractions-decimals',
        content: `## Overview

Decimals are an alternative way of writing fractions whose denominators are powers of 10. The decimal 0.375 means 375/1000, which simplifies to 3/8. Understanding the relationship between fractions and decimals is essential for the GRE because problems may present numbers in either form. Converting between forms strategically can simplify complex arithmetic.

## Key Concepts

### Converting Fractions to Decimals

Divide the numerator by the denominator. For 3/8, perform 3 ÷ 8 = 0.375. Some fractions produce terminating decimals (denominators whose prime factors are only 2 and/or 5). Others produce repeating decimals: 1/3 = 0.333..., 1/7 = 0.142857142857...

### Converting Decimals to Fractions

Write the decimal over the appropriate power of 10 and simplify. For 0.425, write 425/1000, then simplify by dividing by 25: 17/40.

> **Key Insight:** Recognizing common decimal-fraction equivalents saves time: 0.5 = 1/2, 0.25 = 1/4, 0.2 = 1/5, 0.125 = 1/8, 0.75 = 3/4, 0.6 = 3/5.

### Adding and Subtracting Decimals

Line up the decimal points and perform the operation as with whole numbers. For 12.45 + 3.7, write 12.45 + 03.70 = 16.15.

### Multiplying Decimals

Multiply as if they were whole numbers, then count the total number of decimal places in both factors and place the decimal point that many places from the right. For 2.5 × 0.3: 25 × 3 = 75. Total decimal places = 1 + 1 = 2, so the answer is 0.75.

### Dividing Decimals

Move the decimal point in the divisor to make it a whole number, then move the decimal point in the dividend the same number of places. For 4.2 ÷ 0.6, move one place: 42 ÷ 6 = 7.

### Comparing Decimals

Look at the highest place value first. 0.09 vs 0.1: compare tenths place: 0.09 has 0 tenths, 0.1 has 1 tenth, so 0.09 < 0.1.

## Important Rules

- A fraction with denominator having only prime factors 2 or 5 produces a terminating decimal
- To convert a decimal to a fraction, write it over the appropriate power of 10 and simplify
- Decimal multiplication: multiply as whole numbers, then place decimal at total count of decimal places
- Memorize common conversions: 1/2 = 0.5, 1/4 = 0.25, 3/4 = 0.75, 1/8 = 0.125, 1/3 = 0.333...
- Convert decimals to fractions before multiplying or dividing for easier simplification

`,
        objectives: [
          'Convert fluently between fractions and decimals',
          'Add, subtract, multiply, and divide decimals accurately',
          'Identify terminating versus repeating decimals',
          'Compare and order decimals and fractions',
          'Round decimals to specified place values'
        ],
        explanation: 'Decimals are fractions with denominators that are powers of 10. Converting between forms requires division (fraction to decimal) or writing over a power of 10 (decimal to fraction).',
        keyIdeas: [
          'A fraction with denominator having only prime factors 2 or 5 produces a terminating decimal',
          'To convert a decimal to a fraction, write it over the appropriate power of 10 and simplify',
          'Decimal multiplication: multiply as whole numbers, then place decimal at total count of decimal places',
          'Memorize common conversions: 1/2 = 0.5, 1/4 = 0.25, 3/4 = 0.75, 1/8 = 0.125, 1/3 = 0.333...'
        ],
        formulas: [
          {
            id: 'fraction_to_decimal',
            name: 'Fraction to Decimal',
            formula: 'a/b = a \u00f7 b',
            explanation: 'Every fraction represents a division. Performing the division yields the decimal equivalent.',
            usage: 'Use to convert any fraction to decimal form. The result may terminate or repeat.',
            category: 'arithmetic',
            examples: ['3/8 = 3 \u00f7 8 = 0.375 (terminating)', '2/3 = 2 \u00f7 3 = 0.666... (repeating)']
          },
          {
            id: 'decimal_multiply',
            name: 'Decimal Multiplication',
            formula: 'Count total decimal places in both factors; product has that many decimal places',
            explanation: 'When multiplying decimals, ignore decimal points initially, multiply as whole numbers, then count total decimal places.',
            usage: 'Use for all decimal multiplication problems.',
            category: 'arithmetic',
            examples: ['0.04 \u00d7 0.2: 4 \u00d7 2 = 8; total decimals = 2+1 = 3; answer = 0.008']
          }
        ],
        examples: [
          {
            question: 'Convert 7/8 to a decimal.',
            solution: '7 \u00f7 8 = 0.875',
            explanation: 'Divide numerator by denominator. 8 goes into 7 zero times (0.). 8 into 70 is 8 (0.8), remainder 6. 8 into 60 is 7 (0.87), remainder 4. 8 into 40 is 5 (0.875).'
          },
          {
            question: 'Convert 0.325 to a fraction in simplest form.',
            solution: '0.325 = 325/1000 = 13/40',
            explanation: 'Write 0.325 as 325/1000 (3 decimal places means denominator is 1000). Simplify by dividing numerator and denominator by GCD(325,1000) = 25: 325\u00f725 = 13, 1000\u00f725 = 40.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Calculate 0.625 \u00f7 0.25 without a calculator.',
            solution: 'Rewrite as fraction: 0.625 = 5/8, 0.25 = 1/4. Then 5/8 \u00f7 1/4 = 5/8 \u00d7 4/1 = 20/8 = 5/2 = 2.5.',
            steps: [
              'Convert 0.625 to fraction: 625/1000 = 5/8',
              'Convert 0.25 to fraction: 25/100 = 1/4',
              'Divide fractions: (5/8) \u00f7 (1/4) = 5/8 \u00d7 4/1',
              'Multiply: 20/8 = 5/2',
              'Convert to decimal: 5/2 = 2.5'
            ],
            answer: '2.5'
          },
          {
            problem: 'Arrange in ascending order: 0.3, 0.33, 0.303, 0.033',
            solution: 'Convert to consistent form. 0.033 has 0 in tenths place, so it is smallest. Then compare 0.3, 0.33, 0.303. 0.3 = 0.300. 0.303 > 0.300 but 0.330 > 0.303. So ordering: 0.033 < 0.3 < 0.303 < 0.33.',
            steps: [
              'Write all with 3 decimal places: 0.300, 0.330, 0.303, 0.033',
              'Compare the hundredths place for ties',
              '0.033 is clearly smallest (0 tenths)',
              '0.300 < 0.303 < 0.330'
            ],
            answer: '0.033, 0.3, 0.303, 0.33'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Thinking 0.09 is greater than 0.1 because 9 > 1',
            correction: '0.1 = 0.10, and 0.09 < 0.10, so 0.09 < 0.1.',
            explanation: 'When comparing decimals, align the decimal points and compare digit by digit from left to right.'
          },
          {
            mistake: 'Multiplying 0.5 \u00d7 0.5 and getting 2.5',
            correction: '0.5 \u00d7 0.5 = 0.25 (half of a half is a quarter)',
            explanation: 'When multiplying decimals less than 1, the product is smaller than both factors.'
          }
        ],
        shortcuts: [
          {
            technique: 'Use fractions for complex decimal operations',
            description: 'Convert decimals to fractions before multiplying or dividing. Fractions are often easier to simplify.',
            example: '0.375 \u00d7 0.8 = 3/8 \u00d7 4/5 = 12/40 = 3/10 = 0.3'
          },
          {
            technique: 'Moving decimal points for division',
            description: 'To divide by a decimal, move both decimal points right until the divisor is a whole number.',
            example: '3.6 \u00f7 0.09 = 360 \u00f7 9 = 40 (move both decimal points 2 places right)'
          }
        ],
        practiceQuestions: ['q_quant_009', 'q_quant_010', 'q_quant_011', 'q_quant_012', 'q_quant_061', 'q_quant_062']
      },
      {
        id: 'complex-fractions-reciprocals',
        title: 'Complex Fractions and Reciprocals',
        topicId: 'fractions-decimals',
        content: `## Overview

A complex fraction is a fraction whose numerator, denominator, or both contain fractions. These appear regularly on the GRE, often in quantitative comparison problems. Each complex fraction problem typically reduces to one of two strategies: treat as division, or multiply by the LCM of internal denominators.

## Key Concepts

### Method 1: Division Approach

Treat the main fraction bar as division. For (a/b)/(c/d), rewrite as (a/b) ÷ (c/d) = (a/b) × (d/c) = ad/(bc). For example, (3/4)/(5/6) = 3/4 ÷ 5/6 = 3/4 × 6/5 = 18/20 = 9/10.

### Method 2: LCM Approach

Multiply both numerator and denominator of the complex fraction by the least common multiple (LCM) of all the denominators within the complex fraction.

> **Key Insight:** For (2/3 + 1/4)/(5/6), the internal denominators are 3, 4, and 6, whose LCM is 12. Multiply numerator and denominator by 12: (12 × 2/3 + 12 × 1/4)/(12 × 5/6) = (8 + 3)/10 = 11/10.

### Reciprocals

The reciprocal of a non-zero number x is 1/x. For a fraction a/b, the reciprocal is b/a (provided a ≠ 0). The product of any number and its reciprocal is 1: x × (1/x) = 1.

### Algebraic Complex Fractions

On the GRE, complex fractions often appear in disguise. Expressions like (x + 1/x)/(x - 1/x) are complex fractions. The strategy: multiply numerator and denominator by x to clear the internal fractions: (x² + 1)/(x² - 1).

## Important Rules

- (a/b)/(c/d) = a/b ÷ c/d = a/b × d/c = ad/bc
- Multiplying numerator and denominator by the LCM of all internal denominators clears the fractions
- The reciprocal of a fraction a/b is b/a (a,b ≠ 0)
- Any number times its reciprocal equals 1
- Zero has no reciprocal (division by zero is undefined)
- The reciprocal of a sum is not the sum of the reciprocals: 1/(a + b) ≠ 1/a + 1/b

`,
        objectives: [
          'Simplify complex fractions using the division method',
          'Simplify complex fractions using the LCM method',
          'Find reciprocals of integers, fractions, and decimals',
          'Apply complex fraction techniques to algebraic expressions'
        ],
        explanation: 'A complex fraction has fractions within its numerator or denominator. Simplify by treating the main fraction bar as division or by multiplying numerator and denominator by the LCM of all internal denominators.',
        keyIdeas: [
          '(a/b)/(c/d) = a/b \u00f7 c/d = a/b \u00d7 d/c = ad/bc',
          'Multiplying numerator and denominator by the LCM of all internal denominators clears the fractions',
          'The reciprocal of a fraction a/b is b/a (a,b \u2260 0)',
          'Any number times its reciprocal equals 1',
          'Zero has no reciprocal (division by zero is undefined)'
        ],
        formulas: [
          {
            id: 'complex_fraction_division',
            name: 'Complex Fraction as Division',
            formula: '(a/b)/(c/d) = (a/b) \u00f7 (c/d) = (a/b) \u00d7 (d/c) = ad/(bc)',
            explanation: 'Every complex fraction represents division of the numerator by the denominator.',
            usage: 'Use for any complex fraction where both numerator and denominator are single fractions.',
            category: 'arithmetic',
            examples: ['(2/3)/(5/7) = 2/3 \u00d7 7/5 = 14/15']
          }
        ],
        examples: [
          {
            question: 'Simplify: (5/6)/(2/3)',
            solution: '(5/6) \u00f7 (2/3) = 5/6 \u00d7 3/2 = 15/12 = 5/4',
            explanation: 'Rewrite the complex fraction as division of the numerator by the denominator. Then multiply by the reciprocal.'
          },
          {
            question: 'Simplify: (1/2 + 1/3)/(1/4 - 1/6)',
            solution: 'Multiply numerator and denominator by LCM of 2,3,4,6 = 12. Numerator: 12(1/2+1/3) = 6+4 = 10. Denominator: 12(1/4-1/6) = 3-2 = 1. Result: 10/1 = 10.',
            explanation: 'The LCM method cleans up all fractions at once.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Simplify: (x + 1/x)/(x - 1/x)',
            solution: 'Multiply numerator and denominator by x: (x(x) + x(1/x))/(x(x) - x(1/x)) = (x\u00b2 + 1)/(x\u00b2 - 1).',
            steps: [
              'Identify the internal denominator: x',
              'Multiply numerator and denominator by x: x(x + 1/x) / x(x - 1/x)',
              'Simplify: (x\u00b2 + 1) / (x\u00b2 - 1)',
              'Optional: factor denominator = (x\u00b2 + 1)/((x-1)(x+1))'
            ],
            answer: '(x\u00b2 + 1)/(x\u00b2 - 1)'
          },
          {
            problem: 'If a = 2/3, b = 3/4, and c = 1/2, find the value of (a + b)/(b - c).',
            solution: 'First compute a + b = 2/3 + 3/4 = 8/12 + 9/12 = 17/12. Then b - c = 3/4 - 1/2 = 3/4 - 2/4 = 1/4. Then (17/12)/(1/4) = 17/12 \u00d7 4/1 = 68/12 = 17/3 = 5 2/3.',
            steps: [
              'Find sum: a + b = 2/3 + 3/4 = 8/12 + 9/12 = 17/12',
              'Find difference: b - c = 3/4 - 1/2 = 3/4 - 2/4 = 1/4',
              'Divide: (17/12) \u00f7 (1/4) = 17/12 \u00d7 4/1 = 68/12',
              'Simplify: 68/12 = 17/3 = 5 2/3'
            ],
            answer: '17/3'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Taking the reciprocal of a sum: 1/(a + b) = 1/a + 1/b',
            correction: '1/(a + b) cannot be split into a sum of reciprocals.',
            explanation: 'The reciprocal of a sum is not the sum of the reciprocals. For example, 1/(2+3) = 1/5, which is not 1/2 + 1/3 = 5/6.'
          }
        ],
        shortcuts: [
          {
            technique: 'Nested complex fractions: work from the bottom up',
            description: 'For deeply nested fractions like a/(b/(c/d)), simplify the innermost fraction first.',
            example: '1/(2/(3/4)) = 1/(2 \u00d7 4/3) = 1/(8/3) = 3/8'
          },
          {
            technique: 'Use the LCM method for sums in complex fractions',
            description: 'When numerator or denominator contains sums of fractions, multiplying by the LCM clears all internal fractions in one step.',
            example: '(1/3 + 1/4 + 1/6)/(1/2) \u2192 multiply by 12: (4+3+2)/6 = 9/6 = 3/2'
          }
        ],
        practiceQuestions: ['q_quant_009', 'q_quant_010', 'q_quant_011', 'q_quant_012', 'q_quant_061', 'q_quant_062']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  TOPIC 3: RATIOS & PROPORTIONS
  // ---------------------------------------------------------------------------
  {
    id: 'ratios-proportions',
    title: 'Ratios and Proportions',
    description: 'Understand how to compare quantities using ratios, find equivalent ratios, and solve direct and inverse proportion problems. A foundational skill for word problems, data interpretation, and quantitative comparisons on the GRE.',
    icon: '\u2696\uFE0F',
    category: 'quant',
    lessons: [
      {
        id: 'ratios-basics',
        title: 'Ratio Basics and Equivalent Ratios',
        topicId: 'ratios-proportions',
        content: `## Overview

A ratio is a comparison of two or more quantities. Ratios can be written in three ways: using a colon (3:5), as a fraction (3/5), or with the word "to" (3 to 5). All three forms represent the same relationship. Ratios indicate relative size, not absolute quantities.

## Key Concepts

### Understanding Ratios

If the ratio of boys to girls in a class is 3:5, there are 3 boys for every 5 girls. The actual numbers could be 3 and 5, 6 and 10, 30 and 50, or any multiple. The ratio tells us that for every 3 boys, there are 5 girls, so the total is 3 + 5 = 8 parts.

### Finding Actual Quantities

To find actual quantities from a ratio, multiply each part of the ratio by a common factor. If boys:girls = 3:5 and the total number of students is 48, then each "part" represents 48 ÷ 8 = 6 students. Boys = 3 × 6 = 18, girls = 5 × 6 = 30.

### Equivalent Ratios

Equivalent ratios are ratios that express the same relationship. The ratio 2:3 is equivalent to 4:6, 6:9, 10:15, and so on. Multiplying or dividing both terms by the same non-zero number produces an equivalent ratio.

### Comparing Ratios

To determine which of two ratios is larger, convert both to fractions and compare, or find a common term. For example, to compare 5:8 and 3:5, convert to fractions: 5/8 = 0.625, 3/5 = 0.6. So 5:8 > 3:5.

### Combining Ratios

A common GRE problem: "The ratio of x to y is 3:4, and the ratio of y to z is 2:5. Find the ratio of x:y:z." To combine, ensure the common term (y) has the same value in both ratios. Multiply the first ratio by 2: x:y = 6:8. Multiply the second ratio by 4: y:z = 8:20. Now y is 8 in both, so x:y:z = 6:8:20, which simplifies to 3:4:10.

### Part-to-Part vs. Part-to-Whole

A ratio of 3:2 between two quantities can be interpreted as 3/5 of the total is the first quantity and 2/5 of the total is the second.

## Important Rules

- A ratio a:b means for every a units of the first, there are b units of the second
- To find actual quantities: total ÷ sum of ratio parts = value per part
- Equivalent ratios are formed by scaling all terms by the same factor
- To combine ratios, make the common term equal in both
- Part-to-whole: a/(a+b) is the fraction of the total represented by the first quantity
- The ratio a:b means the first quantity is a/b times the second

`,
        objectives: [
          'Express ratios in colon, fraction, and word form',
          'Find actual quantities from a given ratio and total',
          'Generate equivalent ratios by scaling',
          'Combine multiple ratios into a single three-term ratio',
          'Distinguish between part-to-part and part-to-whole ratios'
        ],
        explanation: 'A ratio compares quantities proportionally. To find actual values from a ratio, determine the value per "part" by dividing the total by the sum of ratio terms.',
        keyIdeas: [
          'A ratio a:b means for every a units of the first, there are b units of the second',
          'To find actual quantities: total \u00f7 sum of ratio parts = value per part',
          'Equivalent ratios are formed by scaling all terms by the same factor',
          'To combine ratios, make the common term equal in both',
          'Part-to-whole: a/(a+b) is the fraction of the total represented by the first quantity'
        ],
        formulas: [
          {
            id: 'ratio_actual',
            name: 'Finding Actual Quantities from a Ratio',
            formula: 'Value per part = Total \u00f7 (a + b + c + ...), then each quantity = its ratio term \u00d7 value per part',
            explanation: 'When a total is divided according to a ratio, each ratio term represents a number of "parts."',
            usage: 'Use whenever you are given a ratio and a total and need to find individual quantities.',
            category: 'arithmetic',
            examples: [' split in ratio 2:3: each part = 100/5 = 20, so shares are  and ']
          }
        ],
        examples: [
          {
            question: 'The ratio of apples to oranges in a basket is 3:7. There are 60 total fruits. How many oranges are there?',
            solution: 'Total parts = 3 + 7 = 10. Each part = 60/10 = 6. Oranges = 7 \u00d7 6 = 42.',
            explanation: 'The ratio tells us that for every 10 parts total, 7 parts are oranges.'
          },
          {
            question: 'If the ratio of a:b is 5:2 and the ratio of b:c is 3:4, find a:c.',
            solution: 'Make b the same in both. a:b = 5:2 = 15:6. b:c = 3:4 = 6:8. So a:c = 15:8.',
            explanation: 'Multiply the first ratio by 3 and the second by 2 to make b = 6 in both.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Three friends split  in the ratio 3:4:5. How much does the friend with the largest share receive?',
            solution: 'Total parts = 3 + 4 + 5 = 12. Value per part = 240/12 = . Largest share = 5 \u00d7  = .',
            steps: [
              'Sum the ratio terms: 3 + 4 + 5 = 12',
              'Find value per part:  \u00f7 12 = ',
              'Largest ratio term is 5: 5 \u00d7  = '
            ],
            answer: ''
          },
          {
            problem: 'In a class, the ratio of boys to girls is 3:5. If 10 more boys join, the ratio becomes 1:1. How many students are there originally?',
            solution: 'Let the original class have 3x boys and 5x girls. After 10 boys join: (3x + 10)/5x = 1/1. Cross-multiply: 3x + 10 = 5x. Solve: 2x = 10, x = 5. Original students = 8x = 40.',
            steps: [
              'Set up variables: boys = 3x, girls = 5x, total = 8x',
              'After addition: boys = 3x + 10, girls = 5x, ratio = 1:1',
              'Equation: 3x + 10 = 5x',
              'Solve: 10 = 2x, x = 5',
              'Original total = 8 \u00d7 5 = 40'
            ],
            answer: '40 students'
          }
        ],
        commonMistakes: [
          {
            mistake: 'If the ratio of cats to dogs is 3:4, thinking dogs are 3/4 of cats',
            correction: 'Dogs are 4/3 of cats. Cats are 3/4 of dogs.',
            explanation: 'The ratio a:b means the first quantity is a/b times the second.'
          }
        ],
        shortcuts: [
          {
            technique: 'Part-value method',
            description: 'Divide the total by the sum of ratio parts to get the value "per part," then multiply.',
            example: ' split 2:3:5. Sum = 10. Per part = . Shares = , , .'
          },
          {
            technique: 'Fraction method for ratios',
            description: 'Convert a ratio a:b to fractions: the first is a/(a+b) of the total; the second is b/(a+b).',
            example: 'In ratio 4:5, first is 4/9 of total, second is 5/9.'
          }
        ],
        practiceQuestions: ['q_quant_009', 'q_quant_010', 'q_quant_011', 'q_quant_012', 'q_quant_061', 'q_quant_062']
      },
      {
        id: 'direct-inverse-proportion',
        title: 'Direct and Inverse Proportion',
        topicId: 'ratios-proportions',
        content: `## Overview

Two quantities are in direct proportion if they increase or decrease together at the same rate. Two quantities are in inverse proportion if one increases as the other decreases. Recognizing whether a relationship is direct or inverse is critical for solving GRE word problems.

## Key Concepts

### Direct Proportion

If y is directly proportional to x, then y = kx for some constant k (called the constant of proportionality). This means the ratio y/x is constant. If x doubles, y doubles; if x is cut in half, y is cut in half.

Examples of direct proportion: distance traveled at constant speed (d = rt); cost of items (total cost = price per item × number of items).

### Inverse Proportion

If y is inversely proportional to x, then y = k/x, or equivalently xy = k. When x doubles, y halves; when x is multiplied by 3, y is divided by 3.

Examples of inverse proportion: time to complete a job with varying number of workers (t = k/w); speed and time for a fixed distance (t = d/s).

### Solving Proportion Problems

- **Direct proportion**: set up the proportion and cross-multiply. If 5 pounds of apples cost $8.75, then 5/8.75 = 8/x, so x = (8 × 8.75)/5 = $14.00.
- **Inverse proportion**: find the constant product. If 4 workers can paint a house in 6 days, then 4 × 6 = 24 worker-days. So 6 workers take 24/6 = 4 days.

## Important Rules

- Direct proportion: when one quantity doubles, the other doubles
- Inverse proportion: when one quantity doubles, the other halves
- Direct proportion equation: y = kx, where k = y/x
- Inverse proportion equation: y = k/x, where k = xy
- To solve proportionality problems, first find the constant k
- If both quantities move in the same direction, it is direct. If they move in opposite directions, it is inverse.

`,
        objectives: [
          'Distinguish between direct and inverse proportional relationships',
          'Set up and solve direct proportion equations using cross-multiplication',
          'Set up and solve inverse proportion equations',
          'Apply proportional reasoning to multi-step word problems'
        ],
        explanation: 'Direct proportion: y = kx (ratio y/x is constant). Inverse proportion: y = k/x (product xy is constant).',
        keyIdeas: [
          'Direct proportion: when one quantity doubles, the other doubles',
          'Inverse proportion: when one quantity doubles, the other halves',
          'Direct proportion equation: y = kx, where k = y/x',
          'Inverse proportion equation: y = k/x, where k = xy',
          'To solve proportionality problems, first find the constant k'
        ],
        formulas: [
          {
            id: 'direct_proportion',
            name: 'Direct Proportion',
            formula: 'y = kx, where k = y/x is constant',
            explanation: 'Two quantities are directly proportional when their ratio is constant.',
            usage: 'Use when quantities "vary directly" or "are directly proportional."',
            category: 'arithmetic',
            examples: ['If y=12 when x=3, then k=4. When x=7, y=4\u00d77=28']
          },
          {
            id: 'inverse_proportion',
            name: 'Inverse Proportion',
            formula: 'y = k/x, where k = xy is constant',
            explanation: 'Two quantities are inversely proportional when their product is constant.',
            usage: 'Use when a problem says "varies inversely" or "inversely proportional."',
            category: 'arithmetic',
            examples: ['If y=10 when x=2, then k=20. When x=5, y=20/5=4']
          }
        ],
        examples: [
          {
            question: 'If y varies directly with x, and y = 15 when x = 6, find y when x = 10.',
            solution: 'k = y/x = 15/6 = 2.5. Then y = 2.5 \u00d7 10 = 25.',
            explanation: 'In direct proportion, the ratio y/x is constant.'
          },
          {
            question: 'If p varies inversely with q, and p = 8 when q = 3, find p when q = 12.',
            solution: 'k = p \u00d7 q = 8 \u00d7 3 = 24. Then p = 24/12 = 2.',
            explanation: 'In inverse proportion, the product pq is constant.'
          }
        ],
        solvedExamples: [
          {
            problem: 'The time to build a wall varies inversely with the number of workers. If 6 workers can build the wall in 10 days, how long will it take 15 workers?',
            solution: 'Let t = time, w = workers. t = k/w. Given t=10, w=6: k = 10 \u00d7 6 = 60. For w=15: t = 60/15 = 4 days.',
            steps: [
              'Recognize inverse proportion: t \u00d7 w = constant',
              'Find constant: k = 6 \u00d7 10 = 60',
              'Substitute w=15: t = 60/15',
              'Answer: 4 days'
            ],
            answer: '4 days'
          },
          {
            problem: 'The weight of a metal sphere varies directly with the cube of its radius. A sphere of radius 4 cm weighs 128 g. What is the radius of a sphere weighing 54 g?',
            solution: 'W = kr\u00b3. Given r=4, W=128: k = 128/64 = 2. Then 54 = 2r\u00b3, so r\u00b3 = 27, r = 3 cm.',
            steps: [
              'Set up direct proportion: W = kr\u00b3',
              'Find k: 128 = k(4\u00b3) = 64k, so k = 2',
              'Solve for r: 54 = 2r\u00b3, so r\u00b3 = 27',
              'Take cube root: r = 3'
            ],
            answer: '3 cm'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Assuming all relationships are directly proportional',
            correction: 'Check whether the product or the ratio is constant.',
            explanation: 'If product is constant across data pairs, it is inverse proportion, not direct.'
          }
        ],
        shortcuts: [
          {
            technique: 'Unit rate method',
            description: 'For direct proportion, find the "unit rate" (value per one unit) and multiply.',
            example: '12 items cost  \u2192 1 item costs .50 \u2192 20 items cost '
          },
          {
            technique: 'Product constant for inverse',
            description: 'For inverse proportion, multiply the given pair to get the constant, then divide.',
            example: '8 workers take 9 days \u2192 constant = 72 worker-days \u2192 12 workers take 6 days'
          }
        ],
        practiceQuestions: ['q_quant_009', 'q_quant_010', 'q_quant_011', 'q_quant_012', 'q_quant_061', 'q_quant_062']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  TOPIC 4: PERCENTAGES (fixed $ signs)
  // ---------------------------------------------------------------------------
  {
    id: 'percentages',
    title: 'Percentages',
    description: 'Master percent-based reasoning including percent change, successive increases/decreases, simple and compound interest, and mixture problems. Percentages are among the most frequently tested concepts in the GRE Quant section.',
    icon: '\u0025',
    category: 'quant',
    lessons: [
      {
        id: 'percentages-basics-change',
        title: 'Percentages: Basics and Percent Change',
        topicId: 'percentages',
        content: `## Overview

Percent literally means "per hundred" (from Latin per centum). A percentage is a fraction with denominator 100. 25% means 25/100 = 1/4 = 0.25. The three components of any percent problem are Part, Percent, and Whole. The fundamental relationship is Part = (Percent/100) \u00d7 Whole.

## Key Concepts

### The Percent Formula

If you know any two of the three components, you can find the third:
- To find 15% of 200: Part = (15/100) \u00d7 200 = 30
- To find what percent 30 is of 200: Percent = (30/200) \u00d7 100 = 15%
- To find the whole when 30 is 15% of it: Whole = 30 \u00f7 (15/100) = 30 \u00d7 (100/15) = 200

### Percent Change

Percent change measures the relative difference between an original value and a new value: Percent Change = ((New - Original) / Original) \u00d7 100%. A positive result indicates an increase; a negative result indicates a decrease.

For example, if a price rises from $80 to $100, the percent change is ((100 - 80)/80) \u00d7 100 = 25%. If a price drops from $100 to $80, the percent change is ((80 - 100)/100) \u00d7 100 = -20%.

### Successive Percent Changes

> **Key Insight:** A 50% increase followed by a 50% decrease does NOT return to the original. Starting with 100: increase by 50% gives 150. Then decrease by 50% of 150 gives 150 - 75 = 75, which is 25% less than the original.

Successive percent changes cannot be added. A 10% increase followed by a 20% increase is not a 30% increase. Using the multiplier method: multiply by (1 + 0.10) = 1.10, then by (1 + 0.20) = 1.20. Combined multiplier = 1.10 \u00d7 1.20 = 1.32, a 32% increase.

### The Multiplier Method

- Percent increase formula: New = Original \u00d7 (1 + p/100)
- Percent decrease formula: New = Original \u00d7 (1 - p/100)

These multiplier forms are powerful because they chain together neatly for successive changes.

### Finding the Original Value

If a price after a 20% increase is $48, then 48 = Original \u00d7 1.20, so Original = 48/1.20 = $40. If a price after a 15% discount is $42.50, then 42.50 = Original \u00d7 0.85, so Original = 42.50/0.85 = $50.

## Important Rules

- Part = (Percent/100) \u00d7 Whole. Rearrange to find any missing term.
- Percent Change = ((New - Original)/Original) \u00d7 100%
- Multiplier for p% increase: (1 + p/100); for p% decrease: (1 - p/100)
- Successive percent changes are multiplied, not added
- A p% change followed by a q% change does NOT equal (p+q)%
- The two changes act on different bases; the increase uses the original base, the decrease uses the new (larger) base

`,
        objectives: [
          'Apply the percent formula Part = (Percent/100) \u00d7 Whole',
          'Calculate percent increase and percent decrease',
          'Use the multiplier method for successive percent changes',
          'Find the original value before a percent change',
          'Translate "percent more/less than" statements into equations'
        ],
        explanation: 'Percent means "per hundred." The fundamental formula Part = (Percent/100) \u00d7 Whole links the three quantities. Use multipliers (1 \u00b1 p/100) to chain successive changes.',
        keyIdeas: [
          'Part = (Percent/100) \u00d7 Whole. Rearrange to find any missing term.',
          'Percent Change = ((New - Original)/Original) \u00d7 100%',
          'Multiplier for p% increase: (1 + p/100); for p% decrease: (1 - p/100)',
          'Successive percent changes are multiplied, not added',
          'A p% change followed by a q% change does NOT equal (p+q)%'
        ],
        formulas: [
          {
            id: 'percent_multiplier',
            name: 'Percent Multiplier',
            formula: 'New = Original \u00d7 (1 \u00b1 r/100) where r = percent rate',
            explanation: 'The multiplier method: increase uses (1 + r/100), decrease uses (1 - r/100).',
            usage: 'Use for all percent change problems, especially successive changes.',
            category: 'arithmetic',
            examples: ['$40 with 25% increase: 40 \u00d7 1.25 = $50', '$50 with 20% decrease: 50 \u00d7 0.80 = $40']
          }
        ],
        examples: [
          {
            question: 'A laptop costs $1,200. It goes on sale for 15% off, and then an additional 10% off the sale price. What is the final price?',
            solution: 'First discount: 1200 \u00d7 0.85 = $1,020. Second discount: 1020 \u00d7 0.90 = $918.',
            explanation: 'Combined multiplier: 0.85 \u00d7 0.90 = 0.765, so final is 76.5% of $1,200 = $918.'
          },
          {
            question: 'If a population increases from 50,000 to 65,000, what is the percent increase?',
            solution: 'Percent increase = ((65,000 - 50,000)/50,000) \u00d7 100 = (15,000/50,000) \u00d7 100 = 30%.',
            explanation: 'Subtract original from new to find the change (15,000). Divide by the original (50,000).'
          }
        ],
        solvedExamples: [
          {
            problem: 'The price of a stock fell by 25% from Monday to Tuesday, then rose by 25% from Tuesday to Wednesday. If the price on Wednesday is $75, what was the price on Monday?',
            solution: 'Let Monday price = x. Tuesday: x \u00d7 0.75 = 0.75x. Wednesday: 0.75x \u00d7 1.25 = 0.9375x. Given 0.9375x = 75, so x = 75/0.9375 = $80.',
            steps: [
              'Set Monday price = x',
              'After 25% drop: x(0.75) = 0.75x',
              'After 25% rise: 0.75x(1.25) = 0.9375x',
              'Equation: 0.9375x = 75',
              'Solve: x = 75/0.9375 = 80'
            ],
            answer: '$80'
          },
          {
            problem: 'A store marks up an item by 40% and then offers a 30% discount. What is the net percent change?',
            solution: 'Combined multiplier: 1.40 \u00d7 0.70 = 0.98. This is a decrease: 1 - 0.98 = 0.02 = 2% decrease.',
            steps: [
              'Markup multiplier: 1 + 0.40 = 1.40',
              'Discount multiplier: 1 - 0.30 = 0.70',
              'Net multiplier: 1.40 \u00d7 0.70 = 0.98',
              'Net change = 0.98 - 1 = -0.02 = 2% decrease'
            ],
            answer: '2% decrease'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Assuming a 25% increase followed by a 25% decrease returns to the original value',
            correction: '1.25 \u00d7 0.75 = 0.9375, a 6.25% decrease overall.',
            explanation: 'The two changes act on different bases. The increase uses the original base; the decrease uses the new (larger) base.'
          },
          {
            mistake: 'Adding successive percent changes: 10% + 20% = 30%',
            correction: '1.10 \u00d7 1.20 = 1.32, a 32% increase.',
            explanation: 'Percent changes are multiplicative, not additive.'
          }
        ],
        shortcuts: [
          {
            technique: 'Decimal shift for common percents',
            description: '10% = 1/10 (divide by 10). 5% = half of 10%. 1% = 1/100 (move decimal left 2 places).',
            example: '10% of 250 = 25; 5% of 250 = 12.5; 1% of 250 = 2.5'
          },
          {
            technique: 'Reverse percentage calculation',
            description: 'If x is after a p% increase, before = x/(1 + p/100).',
            example: 'After 20% increase, price = $60. Before = 60/1.20 = $50.'
          }
        ],
        practiceQuestions: ['q_quant_013', 'q_quant_014', 'q_quant_015', 'q_quant_016', 'q_quant_017', 'q_quant_018']
      },
      {
        id: 'percentages-interest-mixtures',
        title: 'Interest, Mixtures, and Advanced Percentages',
        topicId: 'percentages',
        content: `## Overview

Interest problems are a common application of percentages on the GRE. Simple interest is earned only on the original principal, while compound interest earns interest on previously earned interest. Mixture problems involve combining two or more items to create a mixture with a specific concentration.

## Key Concepts

### Simple Interest

Simple interest is earned only on the original principal: I = P \u00d7 r \u00d7 t, where I is interest, P is principal, r is the annual interest rate (as a decimal), and t is time in years. The total amount after t years is A = P + I = P(1 + rt).

For example, $2,000 invested at 6% simple interest for 5 years yields I = 2000 \u00d7 0.06 \u00d7 5 = $600. Total = $2,600.

### Compound Interest

Compound interest earns interest on previously earned interest. The formula: A = P(1 + r/n)^(n\u00d7t), where n is the number of compounding periods per year. Annual compounding (n=1): A = P(1 + r)^t.

For $2,000 at 6% compounded annually for 5 years: A = 2000(1.06)^5 = 2000 \u00d7 1.3382 = $2,676.45.

### Mixture Problems

The key principle: total amount of the substance in the mixture equals the sum of the amounts from each component.

For a mixture of two solutions: (conc_A \u00d7 vol_A) + (conc_B \u00d7 vol_B) = (conc_mixture \u00d7 total_volume).

### The Alligation Method

The alligation method is a shortcut for mixture problems. Draw a number line: place the lower and higher values at the ends and the target in the middle. The ratio of the distances gives the ratio of the amounts needed.

> **Key Insight:** For two-component mixture problems, Quantity of Lower / Quantity of Higher = (Target - Lower) / (Higher - Target).

### Weighted Averages

Weighted averages are similar to mixtures. If exams are worth 60% and homework 40%, and you score 85% on exams and 70% on homework, your weighted average is (0.60 \u00d7 85 + 0.40 \u00d7 70) = 51 + 28 = 79%.

## Important Rules

- Simple interest earns only on the principal; compound interest earns on accumulated interest
- Compound interest formula: A = P(1 + r/n)^(nt)
- Mixture equation: (conc_A \u00d7 qty_A) + (conc_B \u00d7 qty_B) = target_conc \u00d7 (qty_A + qty_B)
- Alligation: the ratio of distances to the target equals the ratio of quantities
- Weighted average: sum of (weight \u00d7 value) divided by sum of weights
- In mixture problems, both the amount of the substance and the total volume change

`,
        objectives: [
          'Calculate simple interest and final amount',
          'Calculate compound interest for annual compounding',
          'Solve mixture problems using algebraic equations',
          'Use the alligation method as a shortcut for mixture problems',
          'Compute weighted averages in academic and financial contexts'
        ],
        explanation: 'Simple interest: I = Prt. Compound interest: A = P(1 + r/n)^(nt). Mixture problems: weighted sum of individual concentrations equals total concentration.',
        keyIdeas: [
          'Simple interest earns only on the principal; compound interest earns on accumulated interest',
          'Compound interest formula: A = P(1 + r/n)^(nt)',
          'Mixture equation: (conc_A \u00d7 qty_A) + (conc_B \u00d7 qty_B) = target_conc \u00d7 (qty_A + qty_B)',
          'Alligation: the ratio of distances to the target equals the ratio of quantities',
          'Weighted average: \u03a3(w_i \u00d7 x_i) / \u03a3w_i'
        ],
        formulas: [
          {
            id: 'alligation',
            name: 'Alligation Method',
            formula: 'Quantity of Lower / Quantity of Higher = (Target - Lower) / (Higher - Target)',
            explanation: 'Provides a quick way to find the ratio in which two components should be mixed.',
            usage: 'Use for two-component mixture problems.',
            category: 'arithmetic',
            examples: ['Mix $6/lb and $10/lb for $7/lb: ratio = (10-7):(7-6) = 3:1']
          }
        ],
        examples: [
          {
            question: 'How many liters of a 60% acid solution must be added to 30 liters of a 20% acid solution to make a 30% acid solution?',
            solution: 'Let x = liters of 60% solution. 0.60x + 0.20(30) = 0.30(x + 30). 0.60x + 6 = 0.30x + 9. 0.30x = 3. x = 10 liters.',
            explanation: 'The total amount of pure acid in the mixture equals the sum of pure acid from each solution.'
          },
          {
            question: 'If $3,000 is invested at 8% compounded annually, what is the amount after 3 years?',
            solution: 'A = 3000(1.08)\u00b3 = 3000 \u00d7 1.2597 = $3,779.14',
            explanation: 'Apply the compound interest formula with P = 3000, r = 0.08, n = 1, t = 3.'
          }
        ],
        solvedExamples: [
          {
            problem: 'A chemist needs 40 liters of a 25% saline solution. She has a 10% and a 40% solution. How many liters of each should she mix?',
            solution: 'Let x = liters of 10%, y = liters of 40%. x + y = 40, and 0.10x + 0.40y = 0.25(40) = 10. From first: x = 40 - y. Substitute: 0.10(40 - y) + 0.40y = 10. Simplify: 4 - 0.1y + 0.4y = 10. 0.3y = 6, y = 20. Then x = 20.',
            steps: [
              'x + y = 40 (total volume)',
              '0.10x + 0.40y = 10 (total salt)',
              'Substitute x = 40 - y: 0.10(40 - y) + 0.40y = 10',
              'Simplify: 4 - 0.1y + 0.4y = 10 \u2192 0.3y = 6',
              'y = 20 liters of 40%, x = 20 liters of 10%'
            ],
            answer: '20 L of 10% and 20 L of 40%'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Using simple interest formula for compound interest problems',
            correction: 'Compound interest uses A = P(1 + r/n)^(nt). Simple interest uses I = Prt.',
            explanation: 'Simple interest is linear; compound interest is exponential.'
          },
          {
            mistake: 'In mixture problems, forgetting that total volume also changes',
            correction: 'The denominator on the right side must be the sum of the volumes.',
            explanation: 'When adding two solutions, both the amount of the substance and the total volume change.'
          }
        ],
        shortcuts: [
          {
            technique: 'Alligation visual shortcut',
            description: 'Draw a number line with the two component values at ends and target in middle. The ratio of quantities is the inverse of the distances.',
            example: 'Mix $5 and $8 tea for $6 tea: 5---6---8. Distances: 1 and 2. Ratio of $5:$8 = 2:1.'
          },
          {
            technique: 'Rule of 72 for compound interest',
            description: 'To estimate doubling time: 72 / annual interest rate (as a percent) \u2248 years to double.',
            example: 'At 8% annually: 72/8 = 9 years to double.'
          }
        ],
        practiceQuestions: ['q_quant_013', 'q_quant_014', 'q_quant_015', 'q_quant_016', 'q_quant_017', 'q_quant_018']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  TOPIC 5: EXPONENTS & ROOTS
  // ---------------------------------------------------------------------------
  {
    id: 'exponents-roots',
    title: 'Exponents and Roots',
    description: 'Learn the laws of exponents, negative and fractional exponents, radicals, and root operations. Exponential reasoning is essential for algebra, scientific notation, and comparing large quantities on the GRE.',
    icon: '\u207F',
    category: 'quant',
    lessons: [
      {
        id: 'exponents-laws',
        title: 'Laws of Exponents',
        topicId: 'exponents-roots',
        content: `## Overview

Exponents represent repeated multiplication. The expression a\u207f means "multiply a by itself n times." The base is a, the exponent is n. The laws of exponents govern how to combine exponential expressions and are essential for the GRE, appearing in almost every quant section.

## Key Concepts

### Product Rule

a^m \u00d7 a^n = a^(m+n). When multiplying two expressions with the same base, add the exponents. For example, x\u00b3 \u00d7 x\u2075 = x^(3+5) = x\u2078.

### Quotient Rule

a^m / a^n = a^(m-n). When dividing, subtract the exponents. For example, y\u2077 / y\u00b2 = y^(7-2) = y\u2075.

### Power Rule

(a^m)^n = a^(m\u00d7n). When raising a power to another power, multiply the exponents. For example, (x\u00b3)\u2074 = x^(3\u00d74) = x\u00b9\u00b2.

### Product of Powers

(ab)^n = a^n b^n. The exponent distributes to each factor. For example, (2x)\u00b3 = 2\u00b3 x\u00b3 = 8x\u00b3.

### Zero Exponent

a\u2070 = 1 (for a \u2260 0). Any non-zero base raised to the power of zero equals 1. This follows from the quotient rule: a^m/a^m = a^(m-m) = a\u2070 = 1.

### Negative Exponents

a^(-n) = 1/a^n (for a \u2260 0). A negative exponent indicates the reciprocal of the positive exponent. For example, 2\u207b\u00b3 = 1/2\u00b3 = 1/8. Also, 1/a^(-n) = a^n.

### Parentheses Matter

> **Key Insight:** The GRE often tests the difference between expressions like (-2)\u2074 and -2\u2074. (-2)\u2074 = (-2)(-2)(-2)(-2) = 16. But -2\u2074 = -(2\u2074) = -16. The parentheses make all the difference.

### Scientific Notation

Scientific notation on the GRE uses exponents: 3.5 \u00d7 10^6 = 3,500,000. Multiplying numbers in scientific notation: (3 \u00d7 10^4)(2 \u00d7 10^5) = 6 \u00d7 10^9.

### Comparing Exponential Expressions

A common GRE problem: comparing expressions like 2^30 vs 3^20. Rewrite with a common exponent: 2^30 = (2^3)^10 = 8^10, and 3^20 = (3^2)^10 = 9^10. Since 9 > 8, 3^20 > 2^30.

## Important Rules

- Product rule: add exponents when multiplying same bases
- Quotient rule: subtract exponents when dividing same bases
- Power rule: multiply exponents when raising a power to a power
- Any non-zero base to the zero power equals 1
- Negative exponents mean reciprocal: a^(-n) = 1/a^n
- When bases are different, you cannot add exponents; (ab)^n = a^n b^n is the correct rule
- Negative exponents indicate reciprocals, not negative numbers

`,
        objectives: [
          'Apply the product, quotient, and power rules of exponents',
          'Simplify expressions with negative and zero exponents',
          'Distinguish between (-a)^n and -a^n',
          'Multiply and divide numbers in scientific notation',
          'Compare exponential expressions with different bases'
        ],
        explanation: 'Exponents denote repeated multiplication. Laws: a^m \u00d7 a^n = a^(m+n); a^m/a^n = a^(m-n); (a^m)^n = a^(mn); (ab)^n = a^n b^n; a\u2070 = 1; a^(-n) = 1/a^n.',
        keyIdeas: [
          'Product rule: add exponents when multiplying same bases',
          'Quotient rule: subtract exponents when dividing same bases',
          'Power rule: multiply exponents when raising a power to a power',
          'Any non-zero base to the zero power equals 1',
          'Negative exponents mean reciprocal: a^(-n) = 1/a^n'
        ],
        formulas: [
          {
            id: 'exponent_product_rule',
            name: 'Product Rule for Exponents',
            formula: 'a^m \u00d7 a^n = a^(m+n)',
            explanation: 'When multiplying two expressions with the same base, add the exponents.',
            usage: 'Use whenever you multiply exponential expressions with identical bases.',
            category: 'arithmetic',
            examples: ['x\u2075 \u00d7 x\u00b3 = x\u2078', '2\u00b3 \u00d7 2\u2074 = 2\u2077 = 128']
          },
          {
            id: 'exponent_power_rule',
            name: 'Power Rule for Exponents',
            formula: '(a^m)^n = a^(m \u00d7 n)',
            explanation: 'When raising an exponential expression to another exponent, multiply the exponents.',
            usage: 'Use for nested exponents like (x\u00b3)\u2074 or (2\u00b2)\u2075.',
            category: 'arithmetic',
            examples: ['(5\u00b2)\u00b3 = 5^(2\u00d73) = 5^6 = 15,625', '(x^a)^b = x^(ab)']
          }
        ],
        examples: [
          {
            question: 'Simplify: (2x\u00b2y\u00b3)(3x\u2075y)',
            solution: '(2 \u00d7 3)(x\u00b2 \u00d7 x\u2075)(y\u00b3 \u00d7 y) = 6x\u2077y\u2074',
            explanation: 'Multiply the coefficients (2 \u00d7 3 = 6). For the x terms, add exponents: 2 + 5 = 7. For the y terms, add exponents: 3 + 1 = 4.'
          },
          {
            question: 'Simplify: (2/3)^(-2)',
            solution: '(2/3)^(-2) = 1/(2/3)\u00b2 = 1/(4/9) = 9/4',
            explanation: 'In general, (a/b)^(-n) = (b/a)^n.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Simplify: (x\u2074y\u207b\u00b2)\u00b3 / (x\u207b\u00b9y\u2075)\u00b2',
            solution: 'Apply power rule to numerator: x\u00b9\u00b2y\u207b\u2076. Apply power rule to denominator: x\u207b\u00b2y\u00b9\u2070. Then quotient rule: x^(12-(-2))y^(-6-10) = x\u00b9\u2074y\u207b\u00b9\u2076 = x\u00b9\u2074/y\u00b9\u2076.',
            steps: [
              'Numerator: (x\u2074)\u00b3 = x\u00b9\u00b2, (y\u207b\u00b2)\u00b3 = y\u207b\u2076',
              'Denominator: (x\u207b\u00b9)\u00b2 = x\u207b\u00b2, (y\u2075)\u00b2 = y\u00b9\u2070',
              'Division: x\u00b9\u00b2 / x\u207b\u00b2 = x^(12+2) = x\u00b9\u2074',
              'Division: y\u207b\u2076 / y\u00b9\u2070 = y^(-6-10) = y\u207b\u00b9\u2076',
              'Final: x\u00b9\u2074/y\u00b9\u2076'
            ],
            answer: 'x\u00b9\u2074/y\u00b9\u2076'
          },
          {
            problem: 'If 2^x = 8^(x-1), find x.',
            solution: 'Rewrite 8 as 2\u00b3: 8^(x-1) = (2\u00b3)^(x-1) = 2^(3x-3). So 2^x = 2^(3x-3). Bases equal, so exponents equal: x = 3x - 3. Solve: -2x = -3, x = 1.5.',
            steps: [
              'Rewrite 8 as 2\u00b3: 8^(x-1) = (2\u00b3)^(x-1)',
              'Apply power rule: 2^(3x-3)',
              'Equation: 2^x = 2^(3x-3)',
              'Set exponents equal: x = 3x - 3',
              'Solve: -2x = -3 \u2192 x = 1.5'
            ],
            answer: 'x = 3/2'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Adding exponents when multiplying different bases: 2\u00b3 \u00d7 3\u00b3 = 6\u2076',
            correction: '2\u00b3 \u00d7 3\u00b3 = 8 \u00d7 27 = 216 = 6\u00b3. The product rule requires the same base.',
            explanation: 'When bases are different, you cannot add exponents. (ab)^n = a^n b^n is the correct rule.'
          },
          {
            mistake: 'Thinking a^(-n) = -a^n (negative exponent makes the result negative)',
            correction: 'a^(-n) = 1/a^n, which is always positive if a > 0.',
            explanation: 'Negative exponents indicate reciprocals, not negative numbers.'
          }
        ],
        shortcuts: [
          {
            technique: 'Rewrite to common base for comparison',
            description: 'When comparing a^m and b^n, try rewriting both with the same base or same exponent.',
            example: 'Compare 4^5 and 8^3: 4^5 = (2^2)^5 = 2^10, 8^3 = (2^3)^3 = 2^9. Since 2^10 > 2^9, 4^5 > 8^3.'
          },
          {
            technique: 'Factor out common powers',
            description: 'When adding/subtracting exponential expressions, factor the common power.',
            example: '2^7 + 2^7 = 2^7(1 + 1) = 2^7 \u00d7 2 = 2^8'
          }
        ],
        practiceQuestions: ['q_quant_013', 'q_quant_014', 'q_quant_015', 'q_quant_016', 'q_quant_017', 'q_quant_018']
      },
      {
        id: 'radicals-roots',
        title: 'Radicals and Roots',
        topicId: 'exponents-roots',
        content: `## Overview

A radical (or root) is the inverse operation of an exponent. The square root of x, written \u221ax, is a number that when multiplied by itself gives x. The principal (non-negative) square root is always used on the GRE. Fractional exponents provide another way to express roots.

## Key Concepts

### Fractional Exponents

x^(1/n) = \u207f\u221ax. For example, 9^(1/2) = \u221a9 = 3. And x^(m/n) = (\u207f\u221ax)^m = \u207f\u221a(x^m). For example, 8^(2/3) = (\u00b3\u221a8)\u00b2 = 2\u00b2 = 4.

### Properties of Radicals

- \u221a(ab) = \u221aa \u00d7 \u221ab (for non-negative a, b)
- \u221a(a/b) = \u221aa / \u221ab (for non-negative a, b > 0)

> **Key Insight:** \u221a(a + b) cannot be split. Example: \u221a(9 + 16) = \u221a25 = 5, but \u221a9 + \u221a16 = 3 + 4 = 7.

### Simplifying Radicals

Remove perfect square factors. \u221a72 = \u221a(36 \u00d7 2) = \u221a36 \u00d7 \u221a2 = 6\u221a2. \u221a200 = \u221a(100 \u00d7 2) = 10\u221a2.

### Adding and Subtracting Radicals

You can only combine like radicals (same radicand and index). 3\u221a2 + 5\u221a2 = 8\u221a2, but 3\u221a2 + 3\u221a3 cannot be combined.

### Rationalizing the Denominator

Remove radicals from the denominator:
- For 3/\u221a5, multiply numerator and denominator by \u221a5: (3\u221a5)/(\u221a5 \u00d7 \u221a5) = (3\u221a5)/5
- For 4/(3 - \u221a2), multiply by the conjugate (3 + \u221a2): 4(3 + \u221a2)/(9 - 2) = (12 + 4\u221a2)/7

### Solving Radical Equations

Isolate the radical and square both sides. For \u221a(x + 3) = 5, square: x + 3 = 25, x = 22.

> **Key Insight:** Always check solutions because squaring can introduce extraneous solutions. For \u221a(2x + 1) = x - 1, squaring gives 2x + 1 = x\u00b2 - 2x + 1, so x\u00b2 - 4x = 0, x = 0 or x = 4. Check: x = 0 gives \u221a1 = -1 (false). Only x = 4 works.

## Important Rules

- \u221a(ab) = \u221aa \u00d7 \u221ab and \u221a(a/b) = \u221aa/\u221ab
- Fractional exponents: x^(m/n) = (\u207f\u221ax)^m = \u207f\u221a(x^m)
- Only like radicals (same index and radicand) can be added/subtracted
- Rationalize: multiply numerator and denominator by the radical or its conjugate
- Always check solutions to radical equations for extraneous roots
- Memorize squares up to 20\u00b2 and cubes up to 5\u00b3 for instant radical simplification

`,
        objectives: [
          'Simplify radical expressions by removing perfect square factors',
          'Convert between radical and fractional exponent notation',
          'Add, subtract, multiply, and divide radical expressions',
          'Rationalize denominators containing radicals',
          'Solve equations involving radicals and check for extraneous solutions'
        ],
        explanation: 'Radicals are inverse operations of exponents: \u207f\u221ax = x^(1/n). Simplify by extracting perfect powers. Rationalize by multiplying by the radical or conjugate.',
        keyIdeas: [
          '\u221a(ab) = \u221aa \u00d7 \u221ab and \u221a(a/b) = \u221aa/\u221ab',
          'Fractional exponents: x^(m/n) = (\u207f\u221ax)^m = \u207f\u221a(x^m)',
          'Only like radicals (same index and radicand) can be added/subtracted',
          'Rationalize: multiply numerator and denominator by the radical or its conjugate',
          'Always check solutions to radical equations for extraneous roots'
        ],
        formulas: [
          {
            id: 'fractional_exponent',
            name: 'Fractional Exponents',
            formula: 'a^(m/n) = (\u207f\u221aa)^m = \u207f\u221a(a^m)',
            explanation: 'A fractional exponent combines powers and roots.',
            usage: 'Use to convert between radical and exponent form.',
            category: 'arithmetic',
            examples: ['8^(2/3) = (\u00b3\u221a8)\u00b2 = 2\u00b2 = 4', 'x^(1/2) = \u221ax']
          },
          {
            id: 'rationalize_conjugate',
            name: 'Rationalize Using Conjugate',
            formula: '1/(a + \u221ab) = (a - \u221ab)/(a\u00b2 - b)',
            explanation: 'Multiply numerator and denominator by the conjugate (a - \u221ab).',
            usage: 'Use when the denominator contains a sum or difference with a square root.',
            category: 'arithmetic',
            examples: ['1/(3+\u221a2) = (3-\u221a2)/(9-2) = (3-\u221a2)/7']
          }
        ],
        examples: [
          {
            question: 'Simplify: 2\u221a18 + 3\u221a8 - \u221a50',
            solution: '2\u221a(9\u00d72) + 3\u221a(4\u00d72) - \u221a(25\u00d72) = 2(3\u221a2) + 3(2\u221a2) - 5\u221a2 = 6\u221a2 + 6\u221a2 - 5\u221a2 = 7\u221a2',
            explanation: 'First simplify each radical by extracting perfect squares.'
          },
          {
            question: 'Simplify: (3\u221a2)/(\u221a6)',
            solution: '(3\u221a2)/(\u221a6) = 3\u221a(2/6) = 3\u221a(1/3) = 3/\u221a3 = (3\u221a3)/3 = \u221a3',
            explanation: 'Combine the radicals into one square root and simplify.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Solve for x: \u221a(2x + 5) + 1 = 6',
            solution: 'Isolate the radical: \u221a(2x + 5) = 5. Square both sides: 2x + 5 = 25. Solve: 2x = 20, x = 10. Check: \u221a(20+5) + 1 = \u221a25 + 1 = 5 + 1 = 6. Valid.',
            steps: [
              'Subtract 1: \u221a(2x + 5) = 5',
              'Square both sides: 2x + 5 = 25',
              'Subtract 5: 2x = 20',
              'Divide by 2: x = 10',
              'Check: \u221a(2(10)+5)+1 = \u221a25+1 = 6 \u2713'
            ],
            answer: 'x = 10'
          },
          {
            problem: 'Simplify: \u221a(48) + \u221a(27) - \u221a(12)',
            solution: '\u221a48 = \u221a(16\u00d73) = 4\u221a3. \u221a27 = \u221a(9\u00d73) = 3\u221a3. \u221a12 = \u221a(4\u00d73) = 2\u221a3. Then 4\u221a3 + 3\u221a3 - 2\u221a3 = 5\u221a3.',
            steps: [
              'Simplify \u221a48: 48 = 16 \u00d7 3, so 4\u221a3',
              'Simplify \u221a27: 27 = 9 \u00d7 3, so 3\u221a3',
              'Simplify \u221a12: 12 = 4 \u00d7 3, so 2\u221a3',
              'Combine: 4\u221a3 + 3\u221a3 - 2\u221a3 = 5\u221a3'
            ],
            answer: '5\u221a3'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Assuming \u221a(a + b) = \u221aa + \u221ab',
            correction: '\u221a(a + b) cannot be split. Example: \u221a(9 + 16) = \u221a25 = 5, but \u221a9 + \u221a16 = 3 + 4 = 7.',
            explanation: 'Radicals do not distribute over addition.'
          },
          {
            mistake: 'Forgetting to check solutions of radical equations',
            correction: 'Always substitute solutions back into the original equation. Squaring can introduce extraneous solutions.',
            explanation: 'When you square both sides, the new equation may have solutions that do not satisfy the original equation.'
          }
        ],
        shortcuts: [
          {
            technique: 'Perfect square recognition',
            description: 'Memorize squares up to 20\u00b2 and cubes up to 5\u00b3 for instant radical simplification.',
            example: '\u221a144 = 12, \u221a169 = 13, \u00b3\u221a125 = 5'
          },
          {
            technique: 'Rationalize by pulling out the radical',
            description: 'For 1/\u221a(ab), split the radical first: 1/(\u221aa \u00d7 \u221ab), then rationalize step by step.',
            example: '1/\u221a6 = 1/(\u221a2 \u00d7 \u221a3) = (\u221a2 \u00d7 \u221a3)/6'
          }
        ],
        practiceQuestions: ['q_quant_013', 'q_quant_014', 'q_quant_015', 'q_quant_016', 'q_quant_017', 'q_quant_018']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  TOPIC 6: NUMBER PROPERTIES
  // ---------------------------------------------------------------------------
  {
    id: 'number-properties',
    title: 'Number Properties',
    description: 'Explore the properties of integers: odd/even rules, positive/negative relationships, divisibility, prime factorization, GCD, and LCM. These concepts are tested heavily in quantitative comparison and data sufficiency problems.',
    icon: '\u0031\u20E3',
    category: 'quant',
    lessons: [
      {
        id: 'number-properties-odds-evens',
        title: 'Odds, Evens, Positives, and Negatives',
        topicId: 'number-properties',
        content: `## Overview

Understanding the properties of even and odd numbers is essential for the GRE. An even number is any integer divisible by 2 (..., -4, -2, 0, 2, 4, ...). An odd number is any integer not divisible by 2 (..., -3, -1, 1, 3, ...). The GRE often tests these rules with variables and combines them with positive/negative reasoning.

## Key Concepts

### Even and Odd Rules

- Even \u00b1 Even = Even
- Odd \u00b1 Odd = Even
- Even \u00b1 Odd = Odd
- Even \u00d7 Even = Even
- Even \u00d7 Odd = Even
- Odd \u00d7 Odd = Odd

These rules derive from the definitions: an even number can be written as 2k, an odd number as 2k + 1.

### Variable Parity

If x is an integer, then 2x is always even, 2x + 1 is always odd, and x(x+1) is always even (since one of any two consecutive integers is even).

### Positive and Negative Rules

- The product of two positives is positive.
- The product of two negatives is positive.
- The product of a positive and a negative is negative.
- Division follows the same sign rules as multiplication.

### Combined Parity and Sign Reasoning

If x\u00b2 > 0, then x could be positive or negative (but not zero). If x\u00b3 < 0, then x must be negative. If x is a non-zero integer and x\u00b2 is even, then x must be even (since the square of an odd number is odd).

### Consecutive Integers

Consecutive integers alternate between odd and even. The sum of two consecutive integers is always odd. The product of three consecutive integers is always divisible by 6.

## Important Rules

- Even \u00b1 Even = Even, Odd \u00b1 Odd = Even, Even \u00b1 Odd = Odd
- Even \u00d7 any integer = Even; Odd \u00d7 Odd = Odd
- x(x+1) is always even (product of consecutive integers)
- Same signs \u2192 positive product; different signs \u2192 negative product
- If x\u00b2 is even, then x is even (contrapositive: odd squares are odd)
- 0 is even because 0 = 2 \u00d7 0, which is divisible by 2
- If a product is even, at least one factor must be even (not necessarily both)

`,
        objectives: [
          'Determine parity (even/odd) of sums, products, and powers of integers',
          'Apply sign rules for multiplication and division of positives and negatives',
          'Reason about the parity of variable expressions',
          'Combine parity and sign reasoning in multi-step problems',
          'Identify properties of consecutive integers'
        ],
        explanation: 'Even numbers are divisible by 2 (2k); odd numbers are not (2k+1). Same-sign products are positive; different-sign products are negative.',
        keyIdeas: [
          'Even \u00b1 Even = Even, Odd \u00b1 Odd = Even, Even \u00b1 Odd = Odd',
          'Even \u00d7 any integer = Even; Odd \u00d7 Odd = Odd',
          'x(x+1) is always even (product of consecutive integers)',
          'Same signs \u2192 positive product; different signs \u2192 negative product',
          'If x\u00b2 is even, then x is even (contrapositive: odd squares are odd)'
        ],
        formulas: [
          {
            id: 'even_odd_ops',
            name: 'Even and Odd Operations',
            formula: 'Even \u00b1 Even = Even | Odd \u00b1 Odd = Even | Even \u00b1 Odd = Odd | Even \u00d7 Even = Even | Even \u00d7 Odd = Even | Odd \u00d7 Odd = Odd',
            explanation: 'Rules for how parity behaves under arithmetic operations.',
            usage: 'Use to instantly determine whether a result is even or odd.',
            category: 'number_properties',
            examples: ['If x is odd: x\u00b2 is odd, x+1 is even, 3x is odd, x(x+1) is even']
          }
        ],
        examples: [
          {
            question: 'If a is an odd integer and b is an even integer, which of the following must be odd? (A) a + b (B) ab (C) a\u00b2 + b (D) (a+1)b',
            solution: '(C) a\u00b2 + b: odd\u00b2 = odd, odd + even = odd. (A) odd + even = odd, also works. But check all: (B) odd \u00d7 even = even. (D) (odd+1) = even, even \u00d7 even = even. So (A) and (C) are odd.',
            explanation: 'Apply the parity rules systematically to each expression.'
          },
          {
            question: 'If xy > 0 and yz < 0, what is the sign of xz?',
            solution: 'xy > 0 means x and y have the same sign. yz < 0 means y and z have opposite signs. Therefore, x and z have opposite signs, so xz < 0 (negative).',
            explanation: 'Use the sign relationships as a chain of logic.'
          }
        ],
        solvedExamples: [
          {
            problem: 'If x is a positive integer and x\u00b2 + x is odd, what can be concluded about x?',
            solution: 'x\u00b2 + x = x(x+1). Since x and x+1 are consecutive integers, their product is always even. Therefore x(x+1) can never be odd. No such positive integer x exists.',
            steps: [
              'Factor: x\u00b2 + x = x(x+1)',
              'x and x+1 are consecutive integers',
              'One of any two consecutive integers is even',
              'Therefore x(x+1) is always even',
              'Conclusion: impossible for x\u00b2 + x to be odd'
            ],
            answer: 'No such positive integer x exists'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Assuming 0 is neither even nor odd',
            correction: '0 is even because 0 = 2 \u00d7 0, which is divisible by 2.',
            explanation: '0 is an even integer by definition. It is divisible by 2 with no remainder.'
          },
          {
            mistake: 'Thinking that if a product is even then both factors must be even',
            correction: 'If a product is even, at least one factor must be even. Both could be even, or one could be even and the other odd.',
            explanation: 'Even \u00d7 Odd = Even, so an even product does not require both factors to be even.'
          }
        ],
        shortcuts: [
          {
            technique: 'Consecutive integer product shortcut',
            description: 'The product of n consecutive integers is always divisible by n!',
            example: 'Product of 3 consecutive integers is always divisible by 6 (= 3!)'
          },
          {
            technique: 'Parity of powers',
            description: 'The parity of a power matches the parity of the base: odd^n is odd, even^n is even.',
            example: 'If x is odd, x\u2075 is odd. If x is even, x\u2075 is even.'
          }
        ],
        practiceQuestions: ['q_quant_013', 'q_quant_014', 'q_quant_015', 'q_quant_016', 'q_quant_017', 'q_quant_018']
      },
      {
        id: 'number-properties-divisibility-primes',
        title: 'Divisibility, Primes, GCD, and LCM',
        topicId: 'number-properties',
        content: `## Overview

Divisibility is a core concept in GRE number properties. An integer a is divisible by integer b (b \u2260 0) if there exists an integer k such that a = bk. Understanding divisibility rules, prime numbers, GCD, and LCM is essential for quantitative comparison and data sufficiency problems.

## Key Concepts

### Divisibility Rules

- Divisible by 2: last digit is even (0, 2, 4, 6, 8)
- Divisible by 3: sum of digits is divisible by 3
- Divisible by 4: last two digits form a number divisible by 4
- Divisible by 5: last digit is 0 or 5
- Divisible by 6: divisible by both 2 and 3
- Divisible by 9: sum of digits is divisible by 9
- Divisible by 10: last digit is 0

### Prime Numbers

A prime number is a positive integer greater than 1 that has exactly two positive divisors: 1 and itself. The first few primes are 2, 3, 5, 7, 11, 13, 17, 19, 23, 29. Note that 2 is the only even prime number. 1 is NOT prime.

### Composite Numbers and Prime Factorization

A composite number has more than two positive divisors. Every composite number can be expressed as a unique product of primes (the Fundamental Theorem of Arithmetic). For example, 84 = 2\u00b2 \u00d7 3 \u00d7 7.

### Greatest Common Divisor (GCD)

The GCD of two numbers is the largest positive integer that divides both. To find the GCD, prime-factorize both numbers and multiply the common primes with the smallest exponents. For 36 = 2\u00b2 \u00d7 3\u00b2 and 48 = 2\u2074 \u00d7 3, the GCD = 2\u00b2 \u00d7 3 = 12.

### Least Common Multiple (LCM)

The LCM is the smallest positive integer divisible by both numbers. To find the LCM, multiply each prime factor with the largest exponent. For 36 and 48, LCM = 2\u2074 \u00d7 3\u00b2 = 16 \u00d7 9 = 144.

### GCD-LCM Relationship

For any two positive integers a and b, GCD(a,b) \u00d7 LCM(a,b) = a \u00d7 b. This is useful for checking work or finding one when the other is known.

### Counting Factors

If n = a^p \u00d7 b^q \u00d7 c^r, then the number of positive factors = (p+1)(q+1)(r+1). For 72 = 2\u00b3 \u00d7 3\u00b2, number of factors = (3+1)(2+1) = 4 \u00d7 3 = 12.

## Important Rules

- A prime has exactly two factors: 1 and itself
- Every composite number has a unique prime factorization
- GCD uses the smallest exponents of common primes
- LCM uses the largest exponents of all primes
- GCD(a,b) \u00d7 LCM(a,b) = a \u00d7 b
- 1 is neither prime nor composite
- GCD \u2264 both numbers; LCM \u2265 both numbers

`,
        objectives: [
          'Apply divisibility rules for 2, 3, 4, 5, 6, 9, and 10',
          'Identify prime numbers and perform prime factorization',
          'Compute the GCD and LCM of two or more integers',
          'Use the GCD-LCM product relationship',
          'Calculate the number of positive factors of an integer'
        ],
        explanation: 'GCD is the largest common factor; LCM is the smallest common multiple. GCD \u00d7 LCM = product of the two numbers. Number of factors = product of (exponent+1) for each prime factor.',
        keyIdeas: [
          'A prime has exactly two factors: 1 and itself',
          'Every composite number has a unique prime factorization',
          'GCD uses the smallest exponents of common primes',
          'LCM uses the largest exponents of all primes',
          'GCD(a,b) \u00d7 LCM(a,b) = a \u00d7 b'
        ],
        formulas: [
          {
            id: 'factor_count',
            name: 'Number of Factors',
            formula: 'If n = a^p \u00d7 b^q \u00d7 c^r, then #factors = (p+1)(q+1)(r+1)',
            explanation: 'To count all positive factors, prime-factorize, add 1 to each exponent, multiply.',
            usage: 'Use for problems asking "how many positive divisors."',
            category: 'number_properties',
            examples: ['12 = 2\u00b2\u00d73\u00b9: factors = (2+1)(1+1) = 6', '72 = 2\u00b3\u00d73\u00b2: factors = (3+1)(2+1) = 12']
          },
          {
            id: 'gcd_lcm_relation',
            name: 'GCD-LCM Product Relationship',
            formula: 'GCD(a,b) \u00d7 LCM(a,b) = a \u00d7 b',
            explanation: 'The product of the GCD and LCM of two numbers equals the product of the numbers themselves.',
            usage: 'Use to find the LCM if GCD is known, or vice versa.',
            category: 'number_properties',
            examples: ['For 6 and 10: GCD=2, LCM=30, product=60 = 6\u00d710']
          }
        ],
        examples: [
          {
            question: 'What is the prime factorization of 252?',
            solution: '252 = 2 \u00d7 126 = 2 \u00d7 2 \u00d7 63 = 2\u00b2 \u00d7 7 \u00d7 9 = 2\u00b2 \u00d7 3\u00b2 \u00d7 7',
            explanation: 'Divide by the smallest prime repeatedly. 252 \u00f7 2 = 126. 126 \u00f7 2 = 63. 63 \u00f7 3 = 21. 21 \u00f7 3 = 7. 7 is prime.'
          },
          {
            question: 'What is the GCD and LCM of 48 and 60?',
            solution: '48 = 2\u2074 \u00d7 3, 60 = 2\u00b2 \u00d7 3 \u00d7 5. GCD = 2\u00b2 \u00d7 3 = 12. LCM = 2\u2074 \u00d7 3 \u00d7 5 = 240.',
            explanation: 'For GCD, take shared primes with smallest exponents. For LCM, take all primes with largest exponents.'
          }
        ],
        solvedExamples: [
          {
            problem: 'How many positive factors does 180 have?',
            solution: '180 = 2\u00b2 \u00d7 3\u00b2 \u00d7 5. Number of factors = (2+1)(2+1)(1+1) = 3 \u00d7 3 \u00d7 2 = 18.',
            steps: [
              'Prime factorize 180: 180 = 2\u00b2 \u00d7 3\u00b2 \u00d7 5\u00b9',
              'Add 1 to each exponent: 2+1=3, 2+1=3, 1+1=2',
              'Multiply: 3 \u00d7 3 \u00d7 2 = 18'
            ],
            answer: '18 factors'
          },
          {
            problem: 'Find the smallest positive integer that is divisible by both 12 and 18.',
            solution: 'This is the LCM. 12 = 2\u00b2 \u00d7 3. 18 = 2 \u00d7 3\u00b2. LCM = 2\u00b2 \u00d7 3\u00b2 = 4 \u00d7 9 = 36.',
            steps: [
              'Prime factorize 12: 2\u00b2 \u00d7 3',
              'Prime factorize 18: 2 \u00d7 3\u00b2',
              'LCM uses highest exponent of each prime: 2\u00b2, 3\u00b2',
              'Multiply: 4 \u00d7 9 = 36'
            ],
            answer: '36'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Thinking 1 is a prime number',
            correction: '1 is neither prime nor composite. A prime must have exactly two distinct positive divisors.',
            explanation: '1 has only one positive divisor (itself), so it does not meet the definition of a prime number.'
          },
          {
            mistake: 'Confusing GCD and LCM: assuming GCD is always larger than LCM',
            correction: 'GCD \u2264 both numbers. LCM \u2265 both numbers. GCD is never larger than LCM.',
            explanation: 'GCD is the largest common divisor (always \u2264 each number). LCM is the smallest common multiple (always \u2265 each number).'
          }
        ],
        shortcuts: [
          {
            technique: 'GCD via Euclidean algorithm',
            description: 'Repeatedly subtract or take remainders: GCD(a,b) = GCD(b, a mod b).',
            example: 'GCD(48,18): 48 mod 18 = 12, GCD(18,12): 18 mod 12 = 6, GCD(12,6): 12 mod 6 = 0, so GCD = 6'
          },
          {
            technique: 'LCM from GCD',
            description: 'LCM(a,b) = (a \u00d7 b) / GCD(a,b). Use when GCD is easy to find.',
            example: 'GCD(12,18) = 6, so LCM = (12 \u00d7 18)/6 = 216/6 = 36'
          }
        ],
        practiceQuestions: ['q_quant_013', 'q_quant_014', 'q_quant_015', 'q_quant_016', 'q_quant_017', 'q_quant_018']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  TOPIC 7: ALGEBRA
  // ---------------------------------------------------------------------------
  {
    id: 'algebra',
    title: 'Algebra',
    description: 'Solve linear equations, systems of equations, and inequalities. Covers substitution, elimination, function notation, and domain restrictions — core algebra skills that appear throughout the GRE Quant section.',
    icon: '\u0078',
    category: 'quant',
    lessons: [
      {
        id: 'algebra-linear-equations',
        title: 'Linear Equations and Inequalities',
        topicId: 'algebra',
        content: `## Overview

A linear equation is an equation of the form ax + b = 0, where x is the variable and a \u2260 0. Solving linear equations is a fundamental skill for the GRE. The goal is to isolate the variable on one side of the equation by performing the same operation on both sides.

## Key Concepts

### Solving Linear Equations

To solve 3x + 7 = 22, subtract 7 from both sides: 3x = 15. Then divide by 3: x = 5. When the variable appears on both sides, collect terms. For 5x - 8 = 2x + 10, subtract 2x: 3x - 8 = 10. Add 8: 3x = 18. Divide: x = 6.

### Equations with Fractions

Multiply both sides by the common denominator to clear fractions. For (2x/3) + 1 = (x/2) - 3, multiply by 6: 4x + 6 = 3x - 18. Then x = -24.

### Systems of Linear Equations

The GRE uses two primary methods:

- **Substitution**: solve one equation for one variable, substitute into the other. For 2x + y = 10 and x - y = 2, solve the second: x = y + 2. Substitute: 2(y+2) + y = 10. 3y = 6, y = 2. Then x = 4.

- **Elimination**: add or subtract equations to cancel a variable. For 3x + 2y = 18 and x - 2y = 2, add: 4x = 20, x = 5. Substitute: 5 - 2y = 2, y = 1.5.

### Linear Inequalities

Solved similarly to equations, with one critical difference: multiplying or dividing by a negative number reverses the inequality sign. For -2x > 8, dividing by -2 gives x < -4.

### Compound Inequalities

-3 < 2x + 1 < 7 can be solved by subtracting 1 throughout: -4 < 2x < 6, then dividing by 2: -2 < x < 3.

### Functions

Functions on the GRE are typically tested as f(x) notation. To evaluate f(3) for f(x) = 2x\u00b2 - 3x + 1, substitute: f(3) = 2(9) - 9 + 1 = 18 - 9 + 1 = 10.

### Domain Restrictions

The domain of a function is the set of allowable inputs. Watch for restrictions: denominators cannot be zero, and expressions under even roots must be non-negative.

## Important Rules

- To isolate a variable, apply inverse operations in reverse order of PEMDAS
- For inequalities, multiplying/dividing by a negative flips the inequality sign
- Substitution: solve one equation, plug into the other
- Elimination: add/subtract equations to cancel a variable
- f(x) notation: substitute the input value for x in the expression
- Always perform the same operation on both sides of the equation to maintain equality

> **Key Insight:** When adding or subtracting equations for elimination, align like terms vertically and add or subtract entire equations. Each equation is an expression; you must add/subtract left sides and right sides separately.

`,
        objectives: [
          'Solve linear equations in one variable',
          'Solve systems of two linear equations using substitution and elimination',
          'Solve linear inequalities and compound inequalities',
          'Evaluate functions at given inputs',
          'Identify domain restrictions for algebraic expressions'
        ],
        explanation: 'Solve equations by isolating the variable through inverse operations. For inequalities, reverse the sign when multiplying/dividing by a negative. Systems are solved by substitution or elimination.',
        keyIdeas: [
          'To isolate a variable, apply inverse operations in reverse order of PEMDAS',
          'For inequalities, multiplying/dividing by a negative flips the inequality sign',
          'Substitution: solve one equation, plug into the other',
          'Elimination: add/subtract equations to cancel a variable',
          'f(x) notation: substitute the input value for x in the expression'
        ],
        formulas: [
          {
            id: 'linear_equation',
            name: 'Linear Equation Standard Form',
            formula: 'ax + b = 0, solve: x = -b/a',
            explanation: 'A linear equation in one variable has the form ax + b = 0.',
            usage: 'Use as the standard framework for any linear equation.',
            category: 'algebra',
            examples: ['3x + 12 = 0: x = -12/3 = -4']
          }
        ],
        examples: [
          {
            question: 'Solve: 4(x - 3) = 2x + 8',
            solution: '4x - 12 = 2x + 8. 2x - 12 = 8. 2x = 20. x = 10.',
            explanation: 'Distribute first, then collect variable terms on one side and constants on the other.'
          },
          {
            question: 'Solve the system: x + 2y = 7 and 3x - y = 7',
            solution: 'From first: x = 7 - 2y. Substitute: 3(7-2y) - y = 7. 21 - 6y - y = 7. 21 - 7y = 7. -7y = -14. y = 2. Then x = 7 - 4 = 3.',
            explanation: 'Use substitution. Solve one equation for one variable and plug into the other.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Solve: (x + 2)/3 - (x - 1)/2 = 1',
            solution: 'Multiply by LCM = 6: 2(x+2) - 3(x-1) = 6. 2x + 4 - 3x + 3 = 6. -x + 7 = 6. -x = -1. x = 1.',
            steps: [
              'Multiply both sides by 6: 6[(x+2)/3 - (x-1)/2] = 6(1)',
              'Simplify: 2(x+2) - 3(x-1) = 6',
              'Distribute: 2x + 4 - 3x + 3 = 6',
              'Combine: -x + 7 = 6',
              'Solve: -x = -1, x = 1'
            ],
            answer: 'x = 1'
          },
          {
            problem: 'Solve the inequality: 3(x - 2) \u2265 5x + 4',
            solution: '3x - 6 \u2265 5x + 4. -2x - 6 \u2265 4. -2x \u2265 10. x \u2264 -5 (dividing by -2 flips the inequality).',
            steps: [
              'Distribute: 3x - 6 \u2265 5x + 4',
              'Subtract 5x: -2x - 6 \u2265 4',
              'Add 6: -2x \u2265 10',
              'Divide by -2 (flip sign): x \u2264 -5'
            ],
            answer: 'x \u2264 -5'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Forgetting to flip the inequality sign when dividing by a negative',
            correction: 'When multiplying or dividing both sides of an inequality by a negative, reverse the direction of the inequality.',
            explanation: 'For example, -x > 5 becomes x < -5 when dividing by -1.'
          },
          {
            mistake: 'Adding/subtracting across the equals sign incorrectly in systems',
            correction: 'When using elimination, align like terms vertically and add or subtract entire equations.',
            explanation: 'Each equation is an expression; you must add/subtract left sides and right sides separately.'
          }
        ],
        shortcuts: [
          {
            technique: 'Cross-multiplication for proportions',
            description: 'For a/b = c/d, multiply diagonally: ad = bc. This eliminates fractions in one step.',
            example: 'x/5 = 3/4 \u2192 4x = 15 \u2192 x = 15/4 = 3.75'
          },
          {
            technique: 'Quick elimination by scaling',
            description: 'Multiply an equation by a constant so that coefficients of one variable are opposites, then add.',
            example: '2x + 3y = 12 and 4x - y = 10: multiply second by 3: 12x - 3y = 30. Add to first: 14x = 42, x = 3.'
          }
        ],
        practiceQuestions: ['q_quant_019', 'q_quant_020', 'q_quant_021', 'q_quant_022', 'q_quant_079', 'q_quant_080']
      },
      {
        id: 'algebra-inequalities-functions',
        title: 'Inequalities and Functions',
        topicId: 'algebra',
        content: `## Overview

Inequalities on the GRE go beyond simple linear cases. You must be comfortable with compound inequalities, absolute value inequalities, and inequalities within quantitative comparison problems. Functions are tested through direct evaluation, composition, and graphical interpretation.

## Key Concepts

### Compound Inequalities

Compound inequalities involve multiple inequality signs. To solve -2 \u2264 3x + 1 \u2264 7, work on all three parts simultaneously: subtract 1: -3 \u2264 3x \u2264 6, divide by 3: -1 \u2264 x \u2264 2.

When a variable appears in two separate inequalities forming a compound condition, consider the range of values satisfying both. For example, x > -3 and x \u2264 5 gives -3 < x \u2264 5.

### Absolute Value Inequalities

- |x - a| < b means a - b < x < a + b
- |x - a| > b means x < a - b or x > a + b

These appear frequently on the GRE in quantitative comparison format.

### Linear and Quadratic Functions

- A linear function f(x) = mx + b produces a straight line when graphed, with slope m and y-intercept b.
- Quadratic functions f(x) = ax\u00b2 + bx + c produce parabolas. The sign of a determines whether the parabola opens upward (a > 0) or downward (a < 0). The vertex (turning point) is at x = -b/(2a).

### Domain of a Function

The domain is all x for which the function is defined:
- For f(x) = 1/(x-3), x \u2260 3
- For g(x) = \u221a(x+2), x \u2265 -2
- For h(x) = 1/\u221a(x-5), x > 5

### Function Composition

Function notation f(g(x)) represents composition: apply g first, then f. If f(x) = x\u00b2 and g(x) = x + 3, then f(g(2)) = f(5) = 25. Composition is not generally commutative: f(g(x)) \u2260 g(f(x)).

### Inverse Functions

If f and g are inverses, then f(g(x)) = x and g(f(x)) = x. The inverse of f(x) = 2x + 3 is found by swapping x and y: x = 2y + 3, solving: y = (x-3)/2. So f\u207b\u00b9(x) = (x-3)/2.

## Important Rules

- Compound inequality: perform same operation on all parts
- Absolute value |x| < a: -a < x < a; |x| > a: x < -a or x > a
- Domain excludes values that cause division by zero or negative even roots
- Function composition: f(g(x)) means apply g first, then f
- Inverse function: swap x and y, solve for y
- Evaluate from the inside out for composition: f(g(x)) means g first, then f

`,
        objectives: [
          'Solve compound and absolute value inequalities',
          'Evaluate and compose functions using function notation',
          'Identify domain restrictions for rational and radical functions',
          'Find the inverse of a linear function',
          'Interpret linear and quadratic functions graphically'
        ],
        explanation: 'Compound inequalities require simultaneous operations. Functions map inputs to outputs. The domain is all valid inputs where the function is defined. Composition applies functions sequentially.',
        keyIdeas: [
          'Compound inequality: perform same operation on all parts',
          'Absolute value |x| < a: -a < x < a; |x| > a: x < -a or x > a',
          'Domain excludes values that cause division by zero or negative even roots',
          'Function composition: f(g(x)) means apply g first, then f',
          'Inverse function: swap x and y, solve for y'
        ],
        formulas: [
          {
            id: 'function_composition',
            name: 'Function Composition',
            formula: '(f \u2218 g)(x) = f(g(x))',
            explanation: 'Composition applies g to x, then applies f to the result.',
            usage: 'Use whenever you need to evaluate nested functions.',
            category: 'algebra',
            examples: ['f(x)=x\u00b2, g(x)=x+1: f(g(3)) = f(4) = 16']
          }
        ],
        examples: [
          {
            question: 'If f(x) = x\u00b2 - 4x and g(x) = 2x + 1, find f(g(-1)).',
            solution: 'g(-1) = 2(-1) + 1 = -1. f(-1) = (-1)\u00b2 - 4(-1) = 1 + 4 = 5.',
            explanation: 'Evaluate the inner function first: g(-1) = -1. Then plug into the outer function: f(-1) = 5.'
          },
          {
            question: 'Find the domain of f(x) = \u221a(6 - 2x) / (x - 4)',
            solution: 'The numerator requires 6 - 2x \u2265 0, so x \u2264 3. The denominator requires x \u2260 4. Combining: x \u2264 3.',
            explanation: 'The square root requires non-negative radicand. The denominator cannot be zero. Intersection of conditions.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Find the inverse of f(x) = (3x - 1)/2',
            solution: 'Replace f(x) with y: y = (3x - 1)/2. Swap x and y: x = (3y - 1)/2. Solve: 2x = 3y - 1. 3y = 2x + 1. y = (2x + 1)/3. So f\u207b\u00b9(x) = (2x + 1)/3.',
            steps: [
              'Write y = (3x - 1)/2',
              'Swap x and y: x = (3y - 1)/2',
              'Multiply by 2: 2x = 3y - 1',
              'Add 1: 2x + 1 = 3y',
              'Divide by 3: y = (2x + 1)/3'
            ],
            answer: 'f\u207b\u00b9(x) = (2x + 1)/3'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Confusing f(g(x)) with g(f(x))',
            correction: 'Evaluate from the inside out. f(g(x)) means g first, then f.',
            explanation: 'These are usually different. For f(x)=x\u00b2 and g(x)=x+1: f(g(2)) = f(3)=9, but g(f(2)) = g(4)=5.'
          },
          {
            mistake: 'Forgetting domain restrictions when solving algebraically',
            correction: 'Always check that your solution does not make a denominator zero or a radicand negative.',
            explanation: 'Algebraic manipulation can produce solutions that are not in the domain. Always verify.'
          }
        ],
        shortcuts: [
          {
            technique: 'Vertical line test for functions',
            description: 'A graph represents a function if and only if no vertical line intersects it more than once.',
            example: 'A circle fails the vertical line test and is not a function of x.'
          },
          {
            technique: 'Range of quadratic from vertex',
            description: 'For f(x) = ax\u00b2+bx+c, the vertex x = -b/(2a) gives min (if a>0) or max (if a<0).',
            example: 'f(x) = x\u00b2 - 6x + 10: vertex at x = 3, f(3) = 1, so range is y \u2265 1.'
          }
        ],
        practiceQuestions: ['q_quant_019', 'q_quant_020', 'q_quant_021', 'q_quant_022', 'q_quant_079', 'q_quant_080']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  TOPIC 8: QUADRATIC EQUATIONS
  // ---------------------------------------------------------------------------
  {
    id: 'quadratic-equations',
    title: 'Quadratic Equations',
    description: 'Master factoring quadratics, the quadratic formula, the discriminant, and sum/product of roots. Quadratic equations appear in algebra, coordinate geometry, and word problems throughout the GRE Quant section.',
    icon: '\u0078\u00B2',
    category: 'quant',
    lessons: [
      {
        id: 'quadratic-factoring',
        title: 'Factoring Quadratics',
        topicId: 'quadratic-equations',
        content: `## Overview

A quadratic equation has the standard form ax\u00b2 + bx + c = 0, where a \u2260 0. Solving quadratics is a key GRE skill, tested both directly and within larger problems. Factoring is the most efficient method when the quadratic can be factored easily.

## Key Concepts

### Factoring When a = 1

To factor x\u00b2 + 5x + 6, find two numbers that multiply to 6 (the constant term c) and add to 5 (the coefficient b). The numbers 2 and 3 work: (x + 2)(x + 3) = x\u00b2 + 3x + 2x + 6 = x\u00b2 + 5x + 6.

### Special Factoring Patterns

- **Difference of squares**: a\u00b2 - b\u00b2 = (a + b)(a - b). Example: x\u00b2 - 25 = (x + 5)(x - 5).
- **Perfect square trinomial**: a\u00b2 + 2ab + b\u00b2 = (a + b)\u00b2. Example: x\u00b2 + 10x + 25 = (x + 5)\u00b2.
- **Perfect square trinomial**: a\u00b2 - 2ab + b\u00b2 = (a - b)\u00b2. Example: x\u00b2 - 8x + 16 = (x - 4)\u00b2.

### Factoring When a \u2260 1

For 2x\u00b2 + 7x + 3, multiply a \u00d7 c = 2 \u00d7 3 = 6. Find two numbers that multiply to 6 and add to 7: 1 and 6. Rewrite: 2x\u00b2 + x + 6x + 3. Group: x(2x+1) + 3(2x+1) = (x+3)(2x+1).

### Zero Product Property

If AB = 0, then A = 0 or B = 0 (or both). This is why factoring works for solving equations. Once you factor a quadratic, set each factor equal to zero and solve.

For example, x\u00b2 - x - 12 = 0 factors to (x - 4)(x + 3) = 0. Then x - 4 = 0 or x + 3 = 0, giving x = 4 or x = -3.

### Rearranging to Standard Form

Equations that are not initially in standard form must be rearranged. For x\u00b2 = 5x, bring all terms to one side: x\u00b2 - 5x = 0. Factor out x: x(x - 5) = 0. So x = 0 or x = 5.

> **Key Insight:** Never divide both sides by x, as you would lose the x = 0 solution. Factor instead.

## Important Rules

- x\u00b2 + bx + c factors to (x + m)(x + n) where mn = c and m+n = b
- Difference of squares: a\u00b2 - b\u00b2 = (a+b)(a-b)
- Perfect square: a\u00b2 + 2ab + b\u00b2 = (a+b)\u00b2
- Zero product property: if AB = 0, then A = 0 or B = 0
- Never divide both sides of a quadratic by a variable (you lose solutions)
- Always bring all terms to one side so that one side equals 0 before factoring

`,
        objectives: [
          'Factor quadratic expressions with leading coefficient 1',
          'Factor quadratics with leading coefficient other than 1 using the grouping method',
          'Recognize and factor difference of squares and perfect square trinomials',
          'Apply the zero product property to solve factored equations',
          'Solve quadratic equations by factoring'
        ],
        explanation: 'Factoring transforms ax\u00b2 + bx + c into (px + q)(rx + s). The zero product property then gives solutions. Recognize difference of squares (a\u00b2-b\u00b2) and perfect squares (a\u00b2\u00b12ab+b\u00b2).',
        keyIdeas: [
          'x\u00b2 + bx + c factors to (x + m)(x + n) where mn = c and m+n = b',
          'Difference of squares: a\u00b2 - b\u00b2 = (a+b)(a-b)',
          'Perfect square: a\u00b2 + 2ab + b\u00b2 = (a+b)\u00b2',
          'Zero product property: if AB = 0, then A = 0 or B = 0',
          'Never divide both sides of a quadratic by a variable (you lose solutions)'
        ],
        formulas: [
          {
            id: 'diff_squares',
            name: 'Difference of Squares',
            formula: 'a\u00b2 - b\u00b2 = (a + b)(a - b)',
            explanation: 'The difference of two perfect squares factors into the product of their sum and difference.',
            usage: 'Use to quickly factor expressions like x\u00b2-9, 4x\u00b2-25.',
            category: 'algebra',
            examples: ['x\u00b2-16 = (x+4)(x-4)', '99\u00b2-1 = (99+1)(99-1) = 100\u00d798 = 9,800']
          },
          {
            id: 'foil',
            name: 'FOIL Method',
            formula: '(a + b)(c + d) = ac + ad + bc + bd',
            explanation: 'FOIL stands for First, Outer, Inner, Last � the four products when expanding two binomials.',
            usage: 'Use to expand products of binomials or verify factoring.',
            category: 'algebra',
            examples: ['(x+3)(x-2) = x\u00b2 + x - 6']
          }
        ],
        examples: [
          {
            question: 'Factor: x\u00b2 - 6x + 8',
            solution: 'Find two numbers that multiply to 8 and add to -6: -2 and -4. So (x - 2)(x - 4).',
            explanation: 'The constant is positive (8) and the coefficient is negative (-6), so both factors must be negative.'
          },
          {
            question: 'Solve: 3x\u00b2 - 5x - 2 = 0',
            solution: 'a\u00d7c = 3\u00d7(-2) = -6. Numbers: -6 and 1 (product -6, sum -5). Rewrite: 3x\u00b2 - 6x + x - 2 = 0. Group: 3x(x-2) + 1(x-2) = 0. (3x+1)(x-2) = 0. So x = -1/3 or x = 2.',
            explanation: 'Use the grouping method when a \u2260 1. Multiply a and c, find factors that sum to b, then group.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Solve by factoring: 2x\u00b2 = 7x - 3',
            solution: 'Bring all terms to one side: 2x\u00b2 - 7x + 3 = 0. ac = 6, factors summing to -7: -1 and -6. Rewrite: 2x\u00b2 - x - 6x + 3 = 0. Group: x(2x-1) - 3(2x-1) = 0. (x-3)(2x-1) = 0. So x = 3 or x = 1/2.',
            steps: [
              'Write in standard form: 2x\u00b2 - 7x + 3 = 0',
              'a\u00d7c = 2\u00d73 = 6',
              'Find factors of 6 that sum to -7: -1 and -6',
              'Rewrite: 2x\u00b2 - x - 6x + 3 = 0',
              'Group: x(2x-1) - 3(2x-1) = (x-3)(2x-1) = 0',
              'Solutions: x = 3, x = 1/2'
            ],
            answer: 'x = 3 or x = 1/2'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Dividing both sides of x\u00b2 = 3x by x to get x = 3, losing x = 0',
            correction: 'Bring all terms to one side: x\u00b2 - 3x = 0, factor: x(x-3) = 0. Solutions: x = 0, x = 3.',
            explanation: 'Dividing by x assumes x \u2260 0, which eliminates a valid solution. Factor instead.'
          },
          {
            mistake: 'Forgetting to set the equation to zero before factoring',
            correction: 'Bring all terms to one side so that one side equals 0, then factor.',
            explanation: 'The zero product property only works when one side is zero. If the equation equals another number, factoring alone does not yield solutions.'
          }
        ],
        shortcuts: [
          {
            technique: 'Factoring by sum and product',
            description: 'For x\u00b2+bx+c, find m,n such that m+n=b and mn=c. The factors are (x+m)(x+n).',
            example: 'x\u00b2 - 5x + 6: m+n=-5, mn=6 \u2192 m=-2, n=-3 \u2192 (x-2)(x-3)'
          },
          {
            technique: 'Difference of squares mental math',
            description: 'Any difference of squares factors instantly: a\u00b2-b\u00b2 = (a+b)(a-b).',
            example: 'x\u00b2 - 49 = (x+7)(x-7)'
          }
        ],
        practiceQuestions: ['q_quant_019', 'q_quant_020', 'q_quant_021', 'q_quant_022', 'q_quant_079', 'q_quant_080']
      },
      {
        id: 'quadratic-formula-discriminant',
        title: 'Quadratic Formula and Discriminant',
        topicId: 'quadratic-equations',
        content: `## Overview

The **quadratic formula** solves any quadratic equation **ax\u00b2 + bx + c = 0**:
> **Key Insight:** x = [-b \u00b1 \u221a(b\u00b2 - 4ac)] / (2a) — this formula always works, even when factoring is difficult or impossible.

---

## Key Concepts

### The Discriminant

The expression under the square root, **D = b\u00b2 - 4ac**, is called the **discriminant**. It reveals the nature of the solutions:

- **D > 0**: two distinct real solutions
- **D = 0**: exactly one real solution (a repeated root)
- **D < 0**: no real solutions (the GRE only considers real)

On the GRE, the discriminant is frequently tested in **quantitative comparison** problems.

### Sum and Product of Roots

For **ax\u00b2 + bx + c = 0** with roots **r\u2081** and **r\u2082**:
- **Sum**: r\u2081 + r\u2082 = **-b/a**
- **Product**: r\u2081r\u2082 = **c/a**

> **Key Insight:** Use sum/product formulas when you need only the combination of solutions, not the roots themselves.

### Applying the Quadratic Formula

For **3x\u00b2 + 5x - 2 = 0**: a = 3, b = 5, c = -2. D = 25 - 4(3)(-2) = 25 + 24 = 49. x = [-5 \u00b1 \u221a49] / (6) = [-5 \u00b1 7] / 6. So x = 2/6 = **1/3** or x = -12/6 = **-2**.

---

## Important Rules

- If D > 0: two distinct real solutions
- If D = 0: one real solution (repeated root)
- If D < 0: no real solutions
- Sum of roots = -b/a
- Product of roots = c/a
- Use the formula when factoring is not readily apparent
- On the GRE, if a quadratic does not factor easily, use the formula immediately`,
        objectives: [
          'Apply the quadratic formula to solve any quadratic equation',
          'Use the discriminant to determine the number and nature of solutions',
          'Find the sum and product of roots without solving',
          'Distinguish between factoring and formula approaches',
          'Solve quadratic equations with rational and irrational solutions'
        ],
        explanation: 'The quadratic formula x = [-b \u00b1 \u221a(b\u00b2-4ac)]/(2a) solves any quadratic. The discriminant D = b\u00b2-4ac determines root count: D>0 (two real), D=0 (one real), D<0 (no real). Sum of roots = -b/a, product = c/a.',
        keyIdeas: [
          'Quadratic formula: x = [-b \u00b1 \u221a(b\u00b2 - 4ac)] / (2a)',
          'Discriminant D = b\u00b2 - 4ac: positive = 2 real solutions, zero = 1 real, negative = 0 real',
          'Sum of roots: r\u2081 + r\u2082 = -b/a',
          'Product of roots: r\u2081r\u2082 = c/a',
          'Use the formula when factoring is not readily apparent'
        ],
        formulas: [
          {
            id: 'quadratic_formula',
            name: 'Quadratic Formula',
            formula: 'x = [-b \u00b1 \u221a(b\u00b2 - 4ac)] / (2a)',
            explanation: 'Solves any quadratic equation ax\u00b2 + bx + c = 0.',
            usage: 'Use when a quadratic cannot be factored easily.',
            category: 'algebra',
            examples: ['x\u00b2-5x+6=0: x = [5\u00b1\u221a(25-24)]/2 = [5\u00b11]/2 \u2192 x=3 or x=2']
          },
          {
            id: 'sum_product_roots',
            name: 'Sum and Product of Roots',
            formula: 'Sum = -b/a, Product = c/a',
            explanation: 'For a quadratic ax\u00b2+bx+c=0, the sum and product of the roots can be found without solving.',
            usage: 'Use to find the sum or product of solutions, useful for quantitative comparison.',
            category: 'algebra',
            examples: ['For x\u00b2-7x+12=0: sum = 7, product = 12 (roots are 3 and 4)']
          }
        ],
        examples: [
          {
            question: 'Use the discriminant to determine how many real solutions 2x\u00b2 - 3x + 5 = 0 has.',
            solution: 'D = (-3)\u00b2 - 4(2)(5) = 9 - 40 = -31. Since D < 0, no real solutions.',
            explanation: 'The discriminant is negative, so the quadratic has no real roots.'
          },
          {
            question: 'Find the sum and product of the roots of 3x\u00b2 + 6x - 9 = 0.',
            solution: 'Sum = -6/3 = -2. Product = -9/3 = -3.',
            explanation: 'Use the sum and product formulas directly without solving for the roots.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Solve using the quadratic formula: 4x\u00b2 - 4x - 3 = 0',
            solution: 'a = 4, b = -4, c = -3. D = 16 - 4(4)(-3) = 16 + 48 = 64. x = [4 \u00b1 8] / 8. x = 12/8 = 3/2 or x = -4/8 = -1/2.',
            steps: [
              'Identify a=4, b=-4, c=-3',
              'Compute discriminant: b\u00b2-4ac = 16+48 = 64',
              'Apply formula: x = [-(-4) \u00b1 \u221a64] / (2\u00d74) = [4 \u00b1 8] / 8',
              'First solution: (4+8)/8 = 12/8 = 3/2',
              'Second solution: (4-8)/8 = -4/8 = -1/2'
            ],
            answer: 'x = 3/2 or x = -1/2'
          },
          {
            problem: 'For what value of k does x\u00b2 + kx + 9 = 0 have exactly one real solution?',
            solution: 'For exactly one solution, discriminant D = 0. k\u00b2 - 4(1)(9) = 0. k\u00b2 - 36 = 0. k\u00b2 = 36. k = \u00b16.',
            steps: [
              'For one real solution, D = 0',
              'D = b\u00b2 - 4ac = k\u00b2 - 36',
              'Set equal to 0: k\u00b2 - 36 = 0',
              'Solve: k\u00b2 = 36, k = \u00b16'
            ],
            answer: 'k = 6 or k = -6'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Forgetting the negative sign on b in the quadratic formula',
            correction: 'If b = -5, then -b = 5. The formula uses -b in the numerator.',
            explanation: 'The formula is x = [-b \u00b1 \u221a(b\u00b2-4ac)]/(2a). Forgetting the negative sign is the most common error.'
          },
          {
            mistake: 'Using the sum formula as b/a instead of -b/a',
            correction: 'Sum of roots = -b/a, not b/a.',
            explanation: 'From ax\u00b2+bx+c=0, if roots are r\u2081 and r\u2082, the factored form is a(x-r\u2081)(x-r\u2082). Expanding gives ax\u00b2 - a(r\u2081+r\u2082)x + ar\u2081r\u2082. So -b/a = r\u2081+r\u2082.'
          }
        ],
        shortcuts: [
          {
            technique: 'Integer root test',
            description: 'If a quadratic has integer roots, they must be factors of c (when a=1). Test pairs of factors of c that sum to b.',
            example: 'x\u00b2 - 7x + 12: factors of 12 are (1,12), (2,6), (3,4). Only 3+4=7, so roots are 3 and 4.'
          },
          {
            technique: 'Discriminant for perfect squares',
            description: 'If the discriminant is a perfect square, the quadratic has rational solutions. Otherwise, solutions are irrational.',
            example: 'D=49 (perfect square) \u2192 rational solutions. D=5 (not perfect square) \u2192 irrational solutions.'
          }
        ],
        practiceQuestions: ['q_quant_001', 'q_quant_002', 'q_quant_003', 'q_quant_004', 'q_quant_005', 'q_quant_006']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  TOPIC 9: COORDINATE GEOMETRY
  // ---------------------------------------------------------------------------
  {
    id: 'coordinate-geometry',
    title: 'Coordinate Geometry',
    description: 'Learn to work with the coordinate plane: slope, equations of lines, distance and midpoint formulas, and parabola properties. Coordinate geometry bridges algebra and geometry on the GRE.',
    icon: '\u25CB',
    category: 'quant',
    lessons: [
      {
        id: 'coordinate-slope-lines',
        title: 'Slope and Lines in the Coordinate Plane',
        topicId: 'coordinate-geometry',
        content: `## Overview

**Coordinate geometry** combines algebra and geometry by placing points on the **xy-plane**. Every point is identified by an ordered pair **(x, y)**.

---

## Key Concepts

### Slope of a Line

**Slope** measures steepness and direction: **m = (y\u2082 - y\u2081)/(x\u2082 - x\u2081)**.

- **Positive slope**: rises left to right
- **Negative slope**: falls left to right
- **Zero slope**: horizontal
- **Undefined slope**: vertical (division by zero)

> **Key Insight:** Parallel lines have **equal** slopes. Perpendicular lines have slopes that are **negative reciprocals**: m\u2081 \u00d7 m\u2082 = -1.

### Forms of a Line

| Form | Equation | Use Case |
|------|----------|----------|
| **Slope-Intercept** | y = mx + b | Quick graphing, y-intercept |
| **Point-Slope** | y - y\u2081 = m(x - x\u2081) | Given a point and slope |
| **Standard** | Ax + By = C | Quick intercepts |

- **x-intercept**: set y = 0
- **y-intercept**: set x = 0
- From standard form: slope = **-A/B**, x-intercept = **C/A**, y-intercept = **C/B**

---

## Important Rules

- Slope = rise / run = (y\u2082 - y\u2081) / (x\u2082 - x\u2081)
- Parallel lines: m\u2081 = m\u2082
- Perpendicular lines: m\u2081 \u00d7 m\u2082 = -1
- Horizontal line: y = constant (slope 0)
- Vertical line: x = constant (undefined slope)
- To find if a point lies on a line: substitute coordinates and check equality`,

        objectives: [
          'Calculate the slope of a line given two points',
          'Write equations of lines in slope-intercept and point-slope forms',
          'Identify parallel and perpendicular lines from their slopes',
          'Find x- and y-intercepts of a line',
          'Determine whether a point lies on a given line'
        ],
        explanation: 'Slope m = (y\u2082-y\u2081)/(x\u2082-x\u2081). Lines: y = mx + b (slope-intercept). Parallel lines have equal slopes; perpendicular lines have negative reciprocal slopes.',
        keyIdeas: [
          'Slope = rise/run = (y\u2082-y\u2081)/(x\u2082-x\u2081)',
          'y = mx + b: m = slope, b = y-intercept',
          'Parallel lines: m\u2081 = m\u2082',
          'Perpendicular lines: m\u2081 \u00d7 m\u2082 = -1',
          'Horizontal line: y = constant (slope 0); Vertical line: x = constant (undefined slope)'
        ],
        formulas: [
          {
            id: 'slope',
            name: 'Slope of a Line',
            formula: 'm = (y\u2082 - y\u2081) / (x\u2082 - x\u2081)',
            explanation: 'Slope measures the steepness of a line: the ratio of vertical change to horizontal change.',
            usage: 'Use to find slope between two points, check parallelism, or check perpendicularity.',
            category: 'algebra',
            examples: ['Points (1,2) and (4,8): m = (8-2)/(4-1) = 6/3 = 2']
          },
          {
            id: 'slope_intercept',
            name: 'Slope-Intercept Form',
            formula: 'y = mx + b',
            explanation: 'The equation of a line where m is slope and b is the y-intercept.',
            usage: 'Use to graph quickly or find y-intercept.',
            category: 'algebra',
            examples: ['Line with slope 3, y-intercept -2: y = 3x - 2']
          }
        ],
        examples: [
          {
            question: 'What is the slope of the line through (3, -2) and (5, 6)?',
            solution: 'm = (6 - (-2))/(5 - 3) = 8/2 = 4.',
            explanation: 'Plug into the slope formula: y\u2082-y\u2081 over x\u2082-x\u2081.'
          },
          {
            question: 'Find the equation of the line perpendicular to y = 2x - 5 that passes through (4, 1).',
            solution: 'Perpendicular slope = -1/2. Using point-slope: y - 1 = (-1/2)(x - 4). y - 1 = (-1/2)x + 2. y = (-1/2)x + 3.',
            explanation: 'Take the negative reciprocal of the original slope (2 \u2192 -1/2). Then use point-slope form.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Find the equation of the line passing through (2, -1) and (6, 3).',
            solution: 'm = (3-(-1))/(6-2) = 4/4 = 1. Using point (2,-1): y - (-1) = 1(x - 2). y + 1 = x - 2. y = x - 3.',
            steps: [
              'Calculate slope: (3-(-1))/(6-2) = 4/4 = 1',
              'Use point-slope form: y - y\u2081 = m(x - x\u2081)',
              'Substitute (2,-1): y + 1 = 1(x - 2)',
              'Simplify: y + 1 = x - 2',
              'Final: y = x - 3'
            ],
            answer: 'y = x - 3'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Confusing x\u2081 and y\u2081 in the slope formula: using (x\u2082-x\u2081)/(y\u2082-y\u2081)',
            correction: 'Slope = (y\u2082-y\u2081)/(x\u2082-x\u2081). Rise over run, not run over rise.',
            explanation: 'The order matters. Subtract y-coordinates in the numerator and x-coordinates in the denominator.'
          },
          {
            mistake: 'Thinking perpendicular slopes are just the opposite sign (e.g., 3 and -3)',
            correction: 'Perpendicular slopes are negative reciprocals: m\u2081 = 3, m\u2082 = -1/3.',
            explanation: 'The product of perpendicular slopes must equal -1. Only the negative reciprocal satisfies this.'
          }
        ],
        shortcuts: [
          {
            technique: 'Identifying slope from standard form',
            description: 'For Ax + By = C, slope = -A/B.',
            example: '3x + 4y = 12: slope = -3/4'
          },
          {
            technique: 'Quick intercepts from standard form',
            description: 'For Ax + By = C: x-intercept = C/A, y-intercept = C/B.',
            example: '2x + 5y = 10: x-int = 5, y-int = 2'
          }
        ],
        practiceQuestions: ['q_quant_001', 'q_quant_002', 'q_quant_003', 'q_quant_004', 'q_quant_005', 'q_quant_006']
      },
      {
        id: 'coordinate-distance-midpoint-parabolas',
        title: 'Distance, Midpoint, and Parabolas',
        topicId: 'coordinate-geometry',
        content: `The distance formula calculates the straight-line distance between two points. It is derived from the Pythagorean theorem: d = \u221a[(x\u2082-x\u2081)\u00b2 + (y\u2082-y\u2081)\u00b2]. For points (2,1) and (6,4): d = \u221a[(4)\u00b2 + (3)\u00b2] = \u221a25 = 5.

The midpoint formula finds the point exactly halfway between two points. The midpoint's coordinates are the averages of the endpoints: M = ((x\u2081+x\u2082)/2, (y\u2081+y\u2082)/2). For (2,1) and (6,4): M = ((2+6)/2, (1+4)/2) = (4, 2.5).

If you know one endpoint and the midpoint, you can find the other endpoint. If M = (3,5) and one endpoint A = (1,2), then: (1+x)/2 = 3 \u2192 x = 5, (2+y)/2 = 5 \u2192 y = 8. So B = (5,8).

Parabolas are the graphs of quadratic functions f(x) = ax\u00b2 + bx + c. Key features:
- The parabola opens upward if a > 0, downward if a < 0.
- The vertex (turning point) is at x = -b/(2a).
- The y-intercept is at (0, c).
- The x-intercepts (roots) are found by solving ax\u00b2 + bx + c = 0.

For f(x) = x\u00b2 - 4x + 3: a = 1 (opens upward). Vertex at x = 4/2 = 2, f(2) = 4 - 8 + 3 = -1. Y-intercept: (0,3). X-intercepts: x\u00b2 - 4x + 3 = 0 \u2192 (x-1)(x-3) = 0 \u2192 x = 1, 3.

The GRE may ask you to match a graph to its equation. Key discriminators: direction of opening (sign of a), y-intercept, vertex location, and whether the parabola has 0, 1, or 2 x-intercepts.

A parabola can also be written in vertex form: f(x) = a(x - h)\u00b2 + k, where (h, k) is the vertex. Completing the square converts standard form to vertex form. For x\u00b2 - 6x + 5: x\u00b2 - 6x + 9 - 9 + 5 = (x-3)\u00b2 - 4, so vertex is (3, -4).

The axis of symmetry is the vertical line x = h (through the vertex). The parabola is symmetric about this line.`,
        objectives: [
          'Calculate the distance between two points using the distance formula',
          'Find the midpoint of a line segment',
          'Find an endpoint given the midpoint and the other endpoint',
          'Identify key features of a parabola: vertex, intercepts, direction of opening',
          'Convert a quadratic between standard and vertex form'
        ],
        explanation: 'Distance d = \u221a[(x\u2082-x\u2081)\u00b2 + (y\u2082-y\u2081)\u00b2]. Midpoint = ((x\u2081+x\u2082)/2, (y\u2081+y\u2082)/2). Parabolas graph quadratics: vertex at x = -b/(2a), opens up if a>0, down if a<0.',
        keyIdeas: [
          'Distance formula is the Pythagorean theorem on the coordinate plane',
          'Midpoint is the average of the coordinates',
          'Parabola opens up (a>0) or down (a<0)',
          'Vertex formula: x = -b/(2a), then plug in to find y',
          'Vertex form: f(x) = a(x-h)\u00b2 + k, vertex at (h,k)'
        ],
        formulas: [
          {
            id: 'distance_formula',
            name: 'Distance Formula',
            formula: 'd = \u221a[(x\u2082 - x\u2081)\u00b2 + (y\u2082 - y\u2081)\u00b2]',
            explanation: 'Finds the straight-line distance between two points. Derived from the Pythagorean theorem.',
            usage: 'Use to calculate distance between any two points on the xy-plane.',
            category: 'algebra',
            examples: ['(1,1) to (4,5): d = \u221a[9+16] = \u221a25 = 5']
          },
          {
            id: 'midpoint',
            name: 'Midpoint Formula',
            formula: 'Midpoint = ((x\u2081 + x\u2082)/2, (y\u2081 + y\u2082)/2)',
            explanation: 'The midpoint is the average of the x-coordinates and the average of the y-coordinates.',
            usage: 'Use to find the point halfway between two points.',
            category: 'algebra',
            examples: ['Midpoint of (2,4) and (6,8) = ((2+6)/2, (4+8)/2) = (4,6)']
          }
        ],
        examples: [
          {
            question: 'Find the distance between (-1, 3) and (3, 6).',
            solution: 'd = \u221a[(3-(-1))\u00b2 + (6-3)\u00b2] = \u221a[16 + 9] = \u221a25 = 5.',
            explanation: 'Subtract the x-coordinates: 4. Subtract the y-coordinates: 3. Square both, sum, take the square root.'
          },
          {
            question: 'For the parabola y = 2x\u00b2 + 8x + 5, find the vertex.',
            solution: 'x = -b/(2a) = -8/(4) = -2. y = 2(4) + 8(-2) + 5 = 8 - 16 + 5 = -3. Vertex: (-2, -3).',
            explanation: 'Use the vertex formula x = -b/(2a). Substitute to find the y-coordinate.'
          }
        ],
        solvedExamples: [
          {
            problem: 'The midpoint of AB is (3, -1). If A = (7, 4), find B.',
            solution: 'Let B = (x,y). (7+x)/2 = 3 \u2192 7+x = 6 \u2192 x = -1. (4+y)/2 = -1 \u2192 4+y = -2 \u2192 y = -6. So B = (-1, -6).',
            steps: [
              'Use midpoint formula: ((7+x)/2, (4+y)/2) = (3, -1)',
              'Solve for x: (7+x)/2 = 3 \u2192 7+x = 6 \u2192 x = -1',
              'Solve for y: (4+y)/2 = -1 \u2192 4+y = -2 \u2192 y = -6',
              'B = (-1, -6)'
            ],
            answer: 'B = (-1, -6)'
          },
          {
            problem: 'Write y = x\u00b2 + 6x + 10 in vertex form and find the vertex.',
            solution: 'Complete the square: y = (x\u00b2 + 6x + 9) + 10 - 9 = (x+3)\u00b2 + 1. Vertex: (-3, 1).',
            steps: [
              'Group x terms: y = (x\u00b2 + 6x) + 10',
              'Take half of 6: 3, square it: 9',
              'Add and subtract 9: (x\u00b2 + 6x + 9) + 10 - 9',
              'Factor: (x+3)\u00b2 + 1',
              'Vertex: (-3, 1)'
            ],
            answer: 'y = (x+3)\u00b2 + 1, vertex = (-3, 1)'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Forgetting the square root in the distance formula',
            correction: 'After summing the squared differences, take the square root. d = \u221a[...], not just the sum.',
            explanation: 'The sum of squares gives the squared distance. The actual distance requires the square root.'
          },
          {
            mistake: 'Using the vertex formula incorrectly: x = -b/a instead of x = -b/(2a)',
            correction: 'The vertex x-coordinate is -b/(2a), not -b/a.',
            explanation: 'The vertex formula comes from the derivative (or completing the square). The divisor is 2a, not a.'
          }
        ],
        shortcuts: [
          {
            technique: '3-4-5 triangle for distance',
            description: 'If the horizontal and vertical distances between two points are 3 and 4, the distance is 5 (by Pythagorean triple).',
            example: '(1,1) to (4,5): dx=3, dy=4, d=5'
          },
          {
            technique: 'Vertex from intercept form',
            description: 'If a parabola has x-intercepts r\u2081 and r\u2082, the vertex x-coordinate is (r\u2081+r\u2082)/2.',
            example: 'Parabola with x-intercepts 1 and 7: vertex x = 4'
          }
        ],
        practiceQuestions: ['q_quant_001', 'q_quant_002', 'q_quant_003', 'q_quant_004', 'q_quant_005', 'q_quant_006']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  TOPIC 10: GEOMETRY - LINES & ANGLES
  // ---------------------------------------------------------------------------
  {
    id: 'geometry-lines-angles',
    title: 'Geometry: Lines and Angles',
    description: 'Understand angle types, relationships between parallel lines and transversals, and properties of perpendicular lines. Foundational geometry knowledge tested in both pure geometry and integrated problems.',
    icon: '\u2220',
    category: 'quant',
    lessons: [
      {
        id: 'lines-angles-basics',
        title: 'Lines, Angles, and Transversals',
        topicId: 'geometry-lines-angles',
        content: `## Overview

Geometry on the GRE begins with the properties of **lines** and **angles**. An **angle** is formed by two rays sharing a common endpoint (the **vertex**). Angles are measured in **degrees**.

---

## Key Concepts

### Angle Types

| Type | Measure |
|------|---------|
| **Acute** | less than 90\u00b0 |
| **Right** | exactly 90\u00b0 |
| **Obtuse** | between 90\u00b0 and 180\u00b0 |
| **Straight** | exactly 180\u00b0 |
| **Reflex** | greater than 180\u00b0 |

### Complementary and Supplementary

- **Complementary**: two angles summing to **90\u00b0**
- **Supplementary**: two angles summing to **180\u00b0**

### Intersecting Lines and Transversals

When two lines intersect:
- **Vertical angles** (opposite each other) are **equal**
- **Adjacent angles** are **supplementary**

When a **transversal** intersects **two parallel lines**:
- **Corresponding angles** are equal
- **Alternate interior angles** are equal
- **Alternate exterior angles** are equal
- **Consecutive (same-side) interior angles** sum to 180\u00b0

> **Key Insight:** If lines are NOT parallel, these angle relationships do not hold. The GRE indicates parallel lines with matching arrow symbols.

### Perpendicular Lines and Bisectors

- **Perpendicular lines** intersect at a **90\u00b0** angle (notation: l \u22a5 m)
- **Angle bisector**: divides an angle into two equal parts
- **Perpendicular bisector**: divides a segment into two equal parts and is perpendicular to it

---

## Important Rules

- Complementary: sum = 90\u00b0; Supplementary: sum = 180\u00b0
- Vertical angles are always equal
- Sum of angles around a point = 360\u00b0
- Sum of angles on a straight line = 180\u00b0
- Parallel lines with transversal: corresponding, alternate interior, alternate exterior angles are equal
- Consecutive interior angles (parallel lines) sum to 180\u00b0`,

        objectives: [
          'Identify acute, right, obtuse, and straight angles',
          'Find complementary and supplementary angles',
          'Apply vertical angle and adjacent angle relationships',
          'Use angle relationships formed by parallel lines and a transversal',
          'Solve multi-step angle problems using multiple relationships'
        ],
        explanation: 'Adjacent angles on a line sum to 180\u00b0. Vertical angles are equal. Parallel lines cut by a transversal create equal corresponding, alternate interior, and alternate exterior angles. Consecutive interior angles sum to 180\u00b0.',
        keyIdeas: [
          'Complementary: sum = 90\u00b0; Supplementary: sum = 180\u00b0',
          'Vertical angles are always equal',
          'Parallel lines with transversal: corresponding, alternate interior, alternate exterior angles are equal',
          'Consecutive interior angles (parallel lines) sum to 180\u00b0',
          'Sum of angles around a point = 360\u00b0'
        ],
        formulas: [
          {
            id: 'angle_relationships',
            name: 'Parallel Line Angle Relationships',
            formula: 'Corresponding \u2220 = Alternate Interior \u2220 = Alternate Exterior \u2220 | Consecutive Interior sum = 180\u00b0',
            explanation: 'When a transversal cuts parallel lines, specific angle pairs are either equal or supplementary.',
            usage: 'Use when the problem involves parallel lines and a transversal. Identify the angle pair relationship.',
            category: 'geometry',
            examples: ['Corresponding angles: top-left on one intersection equals top-left on the other']
          }
        ],
        examples: [
          {
            question: 'Two angles are complementary. One is 28\u00b0. Find the other.',
            solution: '90\u00b0 - 28\u00b0 = 62\u00b0.',
            explanation: 'Complementary angles sum to 90\u00b0. Subtract the given angle from 90\u00b0.'
          },
          {
            question: 'Two parallel lines are cut by a transversal. One corresponding angle is 65\u00b0. Find all other angles.',
            solution: 'The corresponding angle on the other parallel line is also 65\u00b0. Vertical angles to these are also 65\u00b0. Adjacent angles (supplementary) are 115\u00b0 each.',
            explanation: 'Corresponding angles are equal. Vertical angles are equal. Linear pairs are supplementary.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Two parallel lines are cut by a transversal. One consecutive interior angle is 110\u00b0. Find the other consecutive interior angle and the corresponding angle to the given 110\u00b0 angle.',
            solution: 'Consecutive interior angles are supplementary: 180\u00b0 - 110\u00b0 = 70\u00b0. The corresponding angle to the 110\u00b0 angle is on the other parallel line in the same relative position; since corresponding angles are equal, it is also 110\u00b0.',
            steps: [
              'Consecutive interior angles sum to 180\u00b0',
              'Other consecutive interior = 180 - 110 = 70\u00b0',
              'Corresponding angles are equal',
              'Corresponding to 110\u00b0 = 110\u00b0'
            ],
            answer: '70\u00b0 (consecutive interior), 110\u00b0 (corresponding)'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Assuming all pairs of angles formed by a transversal are equal (even when lines are not parallel)',
            correction: 'Corresponding, alternate, and consecutive interior relationships only hold when the lines are parallel.',
            explanation: 'If lines are not parallel, these angle pairs have no fixed relationship. The GRE will indicate parallel lines with matching arrow symbols.'
          },
          {
            mistake: 'Confusing complementary (90\u00b0) with supplementary (180\u00b0)',
            correction: 'Complementary sums to 90\u00b0 (like a right angle). Supplementary sums to 180\u00b0 (like a straight line).',
            explanation: 'Memorize: "C" for Corner (90\u00b0), "S" for Straight line (180\u00b0).'
          }
        ],
        shortcuts: [
          {
            technique: 'Vertical angles are always equal',
            description: 'When two lines cross, opposite angles are equal. This is always true regardless of whether lines are parallel.',
            example: 'If one angle is 40\u00b0, the vertical angle is also 40\u00b0, and adjacent angles are 140\u00b0.'
          },
          {
            technique: 'Parallel line shortcut',
            description: 'If parallel lines are cut by a transversal, every acute angle in the diagram equals every other acute angle; every obtuse angle equals every other obtuse angle.',
            example: 'If one acute angle is 50\u00b0, all acute angles are 50\u00b0 and all obtuse angles are 130\u00b0.'
          }
        ],
        practiceQuestions: ['q_quant_023', 'q_quant_024', 'q_quant_025', 'q_quant_026', 'q_quant_027', 'q_quant_028']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  TOPIC 11: GEOMETRY - TRIANGLES
  // ---------------------------------------------------------------------------
  {
    id: 'geometry-triangles',
    title: 'Geometry: Triangles',
    description: 'Explore triangle properties, the Pythagorean theorem, special right triangles (30-60-90 and 45-45-90), and the triangle inequality. Triangles are the most tested shape in GRE geometry.',
    icon: '\u25B3',
    category: 'quant',
    lessons: [
      {
        id: 'triangles-basics-pythagorean',
        title: 'Triangle Properties and the Pythagorean Theorem',
        topicId: 'geometry-triangles',
        content: `## Overview

A **triangle** is a three-sided polygon. The sum of the interior angles of any triangle is **180\u00b0** \u2014 one of the most frequently used facts in GRE geometry.

---

## Key Concepts

### Classification by Angles

- **Acute**: all angles < 90\u00b0
- **Right**: one angle = 90\u00b0
- **Obtuse**: one angle > 90\u00b0

### Classification by Sides

- **Scalene**: all sides different
- **Isosceles**: at least two sides equal (base angles opposite equal sides are also equal)
- **Equilateral**: all three sides equal (all angles = 60\u00b0)

### Area

> **Key Insight:** **A = (1/2) \u00d7 base \u00d7 height** \u2014 the height must be perpendicular to the base. For right triangles, the legs serve as base and height.

### Pythagorean Theorem

In a right triangle: **a\u00b2 + b\u00b2 = c\u00b2**, where **c** is the hypotenuse (longest side, opposite the 90\u00b0 angle).

**Common Pythagorean triples**: (3,4,5), (5,12,13), (8,15,17), (7,24,25), (9,40,41). Multiples also work: (6,8,10), (9,12,15).

### Triangle Inequality

The sum of any two sides must be **greater than** the third side. For sides a, b, c: **a + b > c**, **a + c > b**, **b + c > a**. If any inequality fails, no triangle exists.

### Special Triangles

- **Isosceles**: base angles are equal; base angles = (180\u00b0 - vertex)/2 each
- **Equilateral**: A = **(s\u00b2\u221a3)/4**, height = **(s\u221a3)/2**

---

## Important Rules

- Interior angles sum to 180\u00b0
- Pythagorean theorem: a\u00b2 + b\u00b2 = c\u00b2 (c = hypotenuse, right triangles only)
- Triangle inequality: a + b > c for all sides
- Largest side is opposite the largest angle; smallest side opposite the smallest angle
- In isosceles triangles, base angles are equal`,

        objectives: [
          'Apply the angle sum property (180\u00b0) to find missing angles',
          'Identify scalene, isosceles, and equilateral triangles',
          'Use the Pythagorean theorem to find missing sides of right triangles',
          'Recognize common Pythagorean triples',
          'Apply the triangle inequality to determine valid side lengths'
        ],
        explanation: 'Triangle angles sum to 180\u00b0. Pythagorean theorem: a\u00b2 + b\u00b2 = c\u00b2 for right triangles. Triangle inequality: sum of any two sides exceeds the third. Area = (1/2)bh.',
        keyIdeas: [
          'Interior angles sum to 180\u00b0',
          'Pythagorean theorem: a\u00b2 + b\u00b2 = c\u00b2 (c = hypotenuse)',
          'Pythagorean triples: (3,4,5), (5,12,13), (8,15,17)',
          'Triangle inequality: a + b > c for all sides',
          'In an isosceles triangle, base angles are equal'
        ],
        formulas: [
          {
            id: 'area_triangle',
            name: 'Area of a Triangle',
            formula: 'A = \u00bd \u00d7 b \u00d7 h',
            explanation: 'The area equals half the product of the base and the perpendicular height.',
            usage: 'Use for any triangle. The height must be perpendicular to the chosen base.',
            category: 'geometry',
            examples: ['Base 10, height 6: A = \u00bd\u00d710\u00d76 = 30']
          },
          {
            id: 'pythagorean',
            name: 'Pythagorean Theorem',
            formula: 'a\u00b2 + b\u00b2 = c\u00b2',
            explanation: 'In a right triangle, the square of the hypotenuse equals the sum of squares of the legs.',
            usage: 'Use to find the third side of a right triangle.',
            category: 'geometry',
            examples: ['Legs 6 and 8: c\u00b2=36+64=100, c=10', 'Hypotenuse 13, leg 5: b\u00b2=169-25=144, b=12']
          }
        ],
        examples: [
          {
            question: 'A triangle has angles 45\u00b0 and 70\u00b0. Find the third angle.',
            solution: '180\u00b0 - 45\u00b0 - 70\u00b0 = 65\u00b0.',
            explanation: 'The sum of interior angles of any triangle is 180\u00b0.'
          },
          {
            question: 'Can sides of length 3, 7, and 11 form a triangle?',
            solution: 'Check: 3 + 7 = 10 < 11. The triangle inequality fails, so no triangle exists.',
            explanation: 'The sum of the two smaller sides must exceed the largest side. Here 3+7=10 is not greater than 11.'
          }
        ],
        solvedExamples: [
          {
            problem: 'A right triangle has legs of length 9 and 12. Find the hypotenuse and the area.',
            solution: 'Hypotenuse: c\u00b2 = 9\u00b2 + 12\u00b2 = 81 + 144 = 225, c = 15. Area: A = \u00bd \u00d7 9 \u00d7 12 = 54.',
            steps: [
              'Apply Pythagorean theorem: c\u00b2 = 81 + 144 = 225',
              'Take square root: c = 15',
              'Area = (1/2)(9)(12) = 54'
            ],
            answer: 'Hypotenuse = 15, Area = 54'
          },
          {
            problem: 'An isosceles triangle has a vertex angle of 40\u00b0. Find the base angles.',
            solution: 'Base angles are equal. Sum: 180\u00b0 = 40\u00b0 + 2x. 2x = 140\u00b0, x = 70\u00b0. Each base angle = 70\u00b0.',
            steps: [
              'Let base angles = x each',
              '180 = 40 + 2x',
              '2x = 140',
              'x = 70\u00b0'
            ],
            answer: '70\u00b0 each'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Applying the Pythagorean theorem to non-right triangles',
            correction: 'The Pythagorean theorem applies ONLY to right triangles. For other triangles, use angle relationships or the law of cosines (rare on GRE).',
            explanation: 'Unless the problem states or implies a right angle (90\u00b0), do not use the Pythagorean theorem.'
          },
          {
            mistake: 'Identifying the hypotenuse as the longest side but then using it as a leg',
            correction: 'In a\u00b2 + b\u00b2 = c\u00b2, c must be the hypotenuse (longest side, opposite the right angle).',
            explanation: 'Always identify the hypotenuse first. It is always opposite the 90\u00b0 angle and is the longest side.'
          }
        ],
        shortcuts: [
          {
            technique: 'Recognizing Pythagorean multiples',
            description: 'If two sides of a right triangle are multiples of a Pythagorean triple, the third side follows the same multiple.',
            example: 'Legs 6 and 8: 6=2\u00d73, 8=2\u00d74, so hyp = 2\u00d75 = 10'
          },
          {
            technique: 'Special right triangle shortcuts',
            description: '30-60-90: sides x, x\u221a3, 2x. 45-45-90: sides x, x, x\u221a2.',
            example: '30-60-90 with short leg 5: long leg = 5\u221a3, hyp = 10'
          }
        ],
        practiceQuestions: ['q_quant_023', 'q_quant_024', 'q_quant_025', 'q_quant_026', 'q_quant_027', 'q_quant_028']
      },
      {
        id: 'special-right-triangles',
        title: 'Special Right Triangles',
        topicId: 'geometry-triangles',
        content: `## Overview

Two **special right triangles** appear frequently on the GRE: the **30-60-90** triangle and the **45-45-90** triangle. Their side ratios are fixed, allowing you to find all side lengths from a single given side.

---

## Key Concepts

### 30-60-90 Triangle

Angles: **30\u00b0**, **60\u00b0**, **90\u00b0**. Side ratios:

| Side | Ratio |
|------|-------|
| Short leg (opposite 30\u00b0) | **x** |
| Long leg (opposite 60\u00b0) | **x\u221a3** |
| Hypotenuse (opposite 90\u00b0) | **2x** |

If short leg = 5: long leg = 5\u221a3, hyp = 10. If hyp = 12: short leg = 6, long leg = 6\u221a3.

### 45-45-90 Triangle (Isosceles Right Triangle)

Angles: **45\u00b0**, **45\u00b0**, **90\u00b0**. Side ratios:

| Side | Ratio |
|------|-------|
| Each leg | **x** |
| Hypotenuse | **x\u221a2** |

If leg = 7: hyp = 7\u221a2. If hyp = 10: leg = 10/\u221a2 = **5\u221a2**.

> **Key Insight:** Never default to the Pythagorean theorem when you identify a special right triangle \u2014 use the fixed ratios instead.

### Applications

- A square divided by a diagonal forms **two 45-45-90 triangles**
- An equilateral triangle divided by an altitude forms **two 30-60-90 triangles**
- Equilateral triangle of side s: area = **(s\u00b2\u221a3)/4**, height = **(s\u221a3)/2**

---

## Important Rules

- 30-60-90: sides are x : x\u221a3 : 2x
- 45-45-90: legs are equal (x), hyp = x\u221a2
- The altitude of an equilateral triangle creates two 30-60-90 triangles
- The diagonal of a square creates two 45-45-90 triangles
- Rationalize denominators: 1/\u221a2 = \u221a2/2, 2/\u221a3 = 2\u221a3/3`,

        objectives: [
          'Use the side ratios of 30-60-90 triangles (x : x\u221a3 : 2x)',
          'Use the side ratios of 45-45-90 triangles (x : x : x\u221a2)',
          'Find any side of a special right triangle given one side',
          'Apply special right triangles to equilateral triangles and squares',
          'Recognize when to use special ratios vs. the Pythagorean theorem'
        ],
        explanation: '30-60-90 ratios: short leg = x, long leg = x\u221a3, hyp = 2x. 45-45-90 ratios: leg = x, hyp = x\u221a2. These ratios are fixed and allow finding all sides from one.',
        keyIdeas: [
          '30-60-90: side opposite 30\u00b0 = x, opposite 60\u00b0 = x\u221a3, hyp = 2x',
          '45-45-90: legs are equal (x), hyp = x\u221a2',
          'An altitude of an equilateral triangle creates two 30-60-90 triangles',
          'The diagonal of a square creates two 45-45-90 triangles',
          'Rationalize denominators: 1/\u221a2 = \u221a2/2, 2/\u221a3 = 2\u221a3/3'
        ],
        formulas: [
          {
            id: 'triangle_30_60',
            name: '30-60-90 Triangle Ratios',
            formula: 'Sides = x : x\u221a3 : 2x',
            explanation: 'A 30-60-90 triangle has side lengths in a fixed ratio.',
            usage: 'Use when you see a right triangle with a 30\u00b0 or 60\u00b0 angle.',
            category: 'geometry',
            examples: ['Short leg = 5: long leg = 5\u221a3, hyp = 10', 'Hyp = 12: short leg = 6, long leg = 6\u221a3']
          },
          {
            id: 'triangle_45_45',
            name: '45-45-90 Triangle Ratios',
            formula: 'Sides = x : x : x\u221a2',
            explanation: 'A 45-45-90 triangle (isosceles right triangle) has legs of equal length.',
            usage: 'Use for right triangles with two equal legs or a 45\u00b0 angle.',
            category: 'geometry',
            examples: ['Leg = 7: hyp = 7\u221a2', 'Hyp = 10: leg = 10/\u221a2 = 5\u221a2']
          }
        ],
        examples: [
          {
            question: 'In a 30-60-90 triangle, the side opposite the 60\u00b0 angle is 9. Find the other sides.',
            solution: 'Long leg = x\u221a3 = 9, so x = 9/\u221a3 = 3\u221a3 (short leg). Hypotenuse = 2x = 6\u221a3.',
            explanation: 'Identify which side is given relative to the angles, then use the ratio to solve for x.'
          },
          {
            question: 'The diagonal of a square is 8. Find the side length.',
            solution: 'Diagonal of a square = side \u00d7 \u221a2. So side = 8/\u221a2 = 4\u221a2.',
            explanation: 'The diagonal divides a square into two 45-45-90 triangles. The diagonal is the hypotenuse.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Find the area of an equilateral triangle with side length 10.',
            solution: 'Area = (s\u00b2\u221a3)/4 = (100\u221a3)/4 = 25\u221a3. Alternatively, height = 5\u221a3 (from 30-60-90), area = (1/2)(10)(5\u221a3) = 25\u221a3.',
            steps: [
              'Use formula: Area = (s\u00b2\u221a3)/4',
              'Substitute s = 10: (100\u221a3)/4 = 25\u221a3',
              'Or: height = (10\u221a3)/2 = 5\u221a3',
              'Area = (1/2)(10)(5\u221a3) = 25\u221a3'
            ],
            answer: '25\u221a3'
          },
          {
            problem: 'A ladder forms a 60\u00b0 angle with the ground and reaches 15 feet up a wall. How long is the ladder?',
            solution: 'The wall, ground, and ladder form a 30-60-90 triangle. The wall (side opposite 60\u00b0) = x\u221a3 = 15. x = 15/\u221a3 = 5\u221a3 (distance from wall to ladder base). The ladder is the hypotenuse: 2x = 10\u221a3 \u2248 17.3 feet.',
            steps: [
              '30-60-90 triangle: ground angle = 60\u00b0, so wall is opposite 60\u00b0',
              'x\u221a3 = 15, so x = 15/\u221a3 = 5\u221a3',
              'Ladder (hyp) = 2x = 10\u221a3 feet'
            ],
            answer: '10\u221a3 feet'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Confusing which side is x, x\u221a3, and 2x in a 30-60-90 triangle',
            correction: 'The smallest side (opposite 30\u00b0) is x. The middle side (opposite 60\u00b0) is x\u221a3. The longest (opposite 90\u00b0) is 2x.',
            explanation: 'Remember: 30\u00b0 is the smallest angle, so it faces the shortest side. 60\u00b0 is larger, so it faces the middle side.'
          },
          {
            mistake: 'Forgetting to rationalize the denominator',
            correction: 'Leave answers like 6/\u221a3 as 2\u221a3 or 8/\u221a2 as 4\u221a2.',
            explanation: 'The GRE expects simplified radical form. Rationalize denominators by multiplying numerator and denominator by the radical.'
          }
        ],
        shortcuts: [
          {
            technique: 'Equilateral height formula',
            description: 'Height of equilateral triangle = (s\u221a3)/2. Can be derived from 30-60-90 ratios.',
            example: 'Side 12: height = 6\u221a3, area = (1/2)(12)(6\u221a3) = 36\u221a3'
          },
          {
            technique: 'Diagonal of a square',
            description: 'Diagonal = s\u221a2. Side = diagonal/\u221a2.',
            example: 'Square of side 5: diagonal = 5\u221a2. Square with diagonal 10: side = 5\u221a2.'
          }
        ],
        practiceQuestions: ['q_quant_023', 'q_quant_024', 'q_quant_025', 'q_quant_026', 'q_quant_027', 'q_quant_028']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  TOPIC 12: GEOMETRY - CIRCLES, POLYGONS & 3D
  // ---------------------------------------------------------------------------
  {
    id: 'geometry-circles-polygons',
    title: 'Geometry: Circles, Polygons, and 3D Figures',
    description: 'Calculate area, circumference, volume, and surface area for circles, polygons, rectangular solids, cubes, cylinders, and spheres. Covers inscribed/circumscribed figures and scaling relationships.',
    icon: '\u2B55',
    category: 'quant',
    lessons: [
      {
        id: 'circles-polygons',
        title: 'Circles and Polygons',
        topicId: 'geometry-circles-polygons',
        content: `## Overview

A **circle** is the set of all points at a fixed distance (**radius r**) from a center point. A **polygon** is a closed figure with straight sides. These shapes and their relationships are central to GRE geometry.

---

## Key Concepts

### Circle Basics

- **Radius (r)**: distance from center to edge
- **Diameter (d)**: d = **2r**
- **Circumference**: C = **2\u03c0r** = **\u03c0d**
- **Area**: A = **\u03c0r\u00b2**

### Arcs and Sectors

- **Arc length** = (central angle / 360\u00b0) \u00d7 2\u03c0r
- **Sector area** = (central angle / 360\u00b0) \u00d7 \u03c0r\u00b2

> **Key Insight:** An **inscribed angle** is **half** the measure of the intercepted arc. An angle inscribed in a semicircle is a **right angle (90\u00b0)**.

### Tangent Properties

- A **tangent** touches the circle at exactly one point
- The radius drawn to the point of tangency is **perpendicular** to the tangent
- From an external point, the two tangent segments are **equal in length**

### Polygons

Sum of interior angles of an **n-sided polygon**: **(n - 2) \u00d7 180\u00b0**

| Polygon | Area Formula |
|---------|-------------|
| **Rectangle** | A = l \u00d7 w |
| **Square** | A = s\u00b2 |
| **Parallelogram** | A = b \u00d7 h |
| **Trapezoid** | A = \u00bd(b\u2081 + b\u2082)h |
| **Rhombus** | A = \u00bd(d\u2081d\u2082) |

---

## Important Rules

- \u03c0 \u2248 3.14 \u2248 22/7; the GRE often leaves answers in terms of \u03c0
- Arc length and sector area are proportional to the central angle
- An inscribed angle is half the central angle subtending the same arc
- Radius to tangent point is perpendicular to the tangent line
- Sum of exterior angles of any polygon = 360\u00b0
- Circle inscribed in square: touches each side at midpoint; square inscribed in circle: diagonal = diameter`,

        objectives: [
          'Calculate circumference, area, arc length, and sector area of circles',
          'Apply inscribed angle and tangent properties',
          'Compute the sum of interior angles of any polygon',
          'Use area formulas for rectangles, triangles, trapezoids, and parallelograms',
          'Solve problems involving inscribed and circumscribed figures'
        ],
        explanation: 'Circle: C = 2\u03c0r, A = \u03c0r\u00b2. Arc length = (\u03b8/360) \u00d7 2\u03c0r. Polygon interior sum = (n-2) \u00d7 180\u00b0. Inscribed angle = half the intercepted arc.',
        keyIdeas: [
          '\u03c0 \u2248 3.14 \u2248 22/7. The GRE often leaves answers in terms of \u03c0.',
          'Arc length and sector area are proportional to the central angle',
          'An inscribed angle is half the central angle subtending the same arc',
          'Radius to tangent point is perpendicular to the tangent line',
          'Sum of exterior angles of any polygon = 360\u00b0'
        ],
        formulas: [
          {
            id: 'area_circle',
            name: 'Area of a Circle',
            formula: 'A = \u03c0r\u00b2',
            explanation: 'The area enclosed by a circle is \u03c0 times the square of its radius.',
            usage: 'Use to find area of a circle, or find radius from area.',
            category: 'geometry',
            examples: ['Radius 5: A = \u03c0\u00d725 = 25\u03c0', 'Area 36\u03c0: r\u00b2 = 36, r = 6']
          },
          {
            id: 'circumference',
            name: 'Circumference of a Circle',
            formula: 'C = 2\u03c0r = \u03c0d',
            explanation: 'The distance around a circle equals 2\u03c0 times the radius.',
            usage: 'Use for perimeter-of-circle problems, arc length, or wheel rotation problems.',
            category: 'geometry',
            examples: ['Radius 7: C = 2\u03c0\u00d77 = 14\u03c0']
          },
          {
            id: 'sum_interior_angles',
            name: 'Sum of Interior Angles',
            formula: 'S = (n - 2) \u00d7 180\u00b0',
            explanation: 'The sum of interior angles of any polygon with n sides.',
            usage: 'Use to find angle sum or each angle of a regular polygon.',
            category: 'geometry',
            examples: ['Pentagon (n=5): S = 540\u00b0', 'Regular hexagon each angle: 720\u00b0/6 = 120\u00b0']
          }
        ],
        examples: [
          {
            question: 'A circle has radius 6. Find the area of a sector with central angle 60\u00b0.',
            solution: 'Sector area = (60/360) \u00d7 \u03c0(6\u00b2) = (1/6) \u00d7 36\u03c0 = 6\u03c0.',
            explanation: 'The sector is a fraction of the whole circle, proportional to the central angle over 360\u00b0.'
          },
          {
            question: 'What is the sum of interior angles of an octagon?',
            solution: 'S = (8-2) \u00d7 180\u00b0 = 6 \u00d7 180\u00b0 = 1,080\u00b0.',
            explanation: 'For an n-sided polygon, the sum is (n-2) \u00d7 180\u00b0.'
          }
        ],
        solvedExamples: [
          {
            problem: 'A square is inscribed in a circle of radius 5. Find the area of the square.',
            solution: 'The diagonal of the square = diameter of circle = 10. For a square, diagonal = s\u221a2, so s = 10/\u221a2 = 5\u221a2. Area = s\u00b2 = (5\u221a2)\u00b2 = 50.',
            steps: [
              'Diameter of circle = 2 \u00d7 5 = 10',
              'Diagonal of inscribed square = diameter = 10',
              'Side of square s = 10/\u221a2 = 5\u221a2',
              'Area = s\u00b2 = 50'
            ],
            answer: '50'
          },
          {
            problem: 'A regular hexagon has side length 4. Find its area.',
            solution: 'A regular hexagon can be divided into 6 equilateral triangles. Each equilateral triangle has side 4, area = (4\u00b2\u221a3)/4 = 4\u221a3. Total area = 6 \u00d7 4\u221a3 = 24\u221a3.',
            steps: [
              'Regular hexagon = 6 equilateral triangles of side 4',
              'Area of one equilateral triangle: (16\u221a3)/4 = 4\u221a3',
              'Total area = 6 \u00d7 4\u221a3 = 24\u221a3'
            ],
            answer: '24\u221a3'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Confusing radius with diameter in formulas (using d instead of r)',
            correction: 'Area uses radius (A = \u03c0r\u00b2). Circumference can use either (C = 2\u03c0r = \u03c0d).',
            explanation: 'The most common error is using the diameter in the area formula. Always check whether you are given r or d.'
          },
          {
            mistake: 'Using the radius for the arc length formula with the diameter',
            correction: 'Arc length = (\u03b8/360) \u00d7 2\u03c0r, where r is the radius. Do not use the diameter.',
            explanation: 'The circumference is 2\u03c0r. The arc is a fraction of the circumference.'
          }
        ],
        shortcuts: [
          {
            technique: 'Central angle shortcuts',
            description: 'Arc length to circumference ratio equals central angle to 360 ratio equals sector area to circle area ratio.',
            example: 'If central angle is 90\u00b0, arc = (1/4) circumference, sector = (1/4) area.'
          },
          {
            technique: 'Regular polygon as triangles',
            description: 'Any regular n-gon can be divided into n isosceles triangles from the center.',
            example: 'Regular hexagon: 6 equilateral triangles. Regular octagon: 8 isosceles triangles.'
          }
        ],
        practiceQuestions: ['q_quant_023', 'q_quant_024', 'q_quant_025', 'q_quant_026', 'q_quant_027', 'q_quant_028']
      },
      {
        id: '3d-figures-volume-surface',
        title: '3D Figures: Volume and Surface Area',
        topicId: 'geometry-circles-polygons',
        content: `## Overview

Three-dimensional geometry on the GRE focuses on **rectangular solids**, **cubes**, **cylinders**, and occasionally **spheres**. Master these shapes and how scaling affects volume and surface area.

---

## Key Concepts

### Rectangular Solid (Box)

- **Volume**: V = **l \u00d7 w \u00d7 h**
- **Surface Area**: SA = **2(lw + lh + wh)**
- **Longest diagonal**: d = **\u221a(l\u00b2 + w\u00b2 + h\u00b2)**

### Cube

- **Volume**: V = **s\u00b3**
- **Surface Area**: SA = **6s\u00b2**
- **Longest diagonal**: **s\u221a3**

### Cylinder

- **Volume**: V = **\u03c0r\u00b2h**
- **Surface Area**: SA = **2\u03c0r\u00b2** (bases) + **2\u03c0rh** (lateral) = 2\u03c0r(r + h)

### Sphere

- **Volume**: V = **(4/3)\u03c0r\u00b3**
- **Surface Area**: SA = **4\u03c0r\u00b2**

> **Key Insight:** Volume scales with the **cube** of the linear factor (double dimensions = 8\u00d7 volume). Surface area scales with the **square** (double dimensions = 4\u00d7 surface area).

### Applications

- **Water level problems**: added volume = base area \u00d7 rise in height
- **Packing problems**: number of cubes = (L/s) \u00d7 (W/s) \u00d7 (H/s) for perfect fit
- **Composite solids**: compute whole volume minus removed portion

---

## Important Rules

- Rectangular solid: V = lwh, SA = 2(lw + lh + wh)
- Cube: V = s\u00b3, SA = 6s\u00b2
- Cylinder: V = \u03c0r\u00b2h, SA = 2\u03c0r\u00b2 + 2\u03c0rh
- Sphere: V = (4/3)\u03c0r\u00b3, SA = 4\u03c0r\u00b2
- If linear dimensions scale by factor k, volume scales by k\u00b3, surface area by k\u00b2
- For composite volumes: add or subtract volumes of basic shapes`,

        objectives: [
          'Calculate volume and surface area of rectangular solids, cubes, and cylinders',
          'Compute the diagonal of a rectangular solid',
          'Determine how volume changes when dimensions are scaled',
          'Solve water-level and packing problems',
          'Find volumes of composite solids'
        ],
        explanation: 'Rectangular solid: V = lwh, SA = 2(lw+lh+wh). Cube: V = s\u00b3, SA = 6s\u00b2. Cylinder: V = \u03c0r\u00b2h, SA = 2\u03c0r\u00b2 + 2\u03c0rh. Sphere: V = (4/3)\u03c0r\u00b3.',
        keyIdeas: [
          'Volume scales with the cube of linear scaling factor',
          'Surface area scales with the square of linear scaling factor',
          'Diagonal of rectangular solid: d = \u221a(l\u00b2 + w\u00b2 + h\u00b2)',
          'Lateral surface area of cylinder = 2\u03c0rh (the side)',
          'For composite volumes, add or subtract volumes of basic shapes'
        ],
        formulas: [
          {
            id: 'vol_cylinder',
            name: 'Volume of a Cylinder',
            formula: 'V = \u03c0r\u00b2h',
            explanation: 'The volume of a cylinder equals the area of its circular base multiplied by its height.',
            usage: 'Use for cylinder volume problems, water in tanks, canisters.',
            category: 'geometry',
            examples: ['Radius 3, height 10: V = \u03c0\u00d79\u00d710 = 90\u03c0']
          },
          {
            id: 'vol_rectangular',
            name: 'Volume of a Rectangular Solid',
            formula: 'V = l \u00d7 w \u00d7 h',
            explanation: 'The volume of a box equals the product of its length, width, and height.',
            usage: 'Use for boxes, rooms, tanks, or any rectangular prism.',
            category: 'geometry',
            examples: ['Length 5, width 4, height 3: V = 5\u00d74\u00d73 = 60']
          }
        ],
        examples: [
          {
            question: 'A cube has surface area 54. Find its volume.',
            solution: 'SA = 6s\u00b2 = 54, so s\u00b2 = 9, s = 3. Volume = 3\u00b3 = 27.',
            explanation: 'From surface area, find the side length, then compute the volume.'
          },
          {
            question: 'A cylinder has radius 4 and height 10. Find its volume and lateral surface area.',
            solution: 'V = \u03c0 \u00d7 16 \u00d7 10 = 160\u03c0. Lateral SA = 2\u03c0 \u00d7 4 \u00d7 10 = 80\u03c0.',
            explanation: 'Use the volume formula V = \u03c0r\u00b2h and lateral area formula 2\u03c0rh.'
          }
        ],
        solvedExamples: [
          {
            problem: 'A rectangular tank is 20 cm long, 15 cm wide, and contains water 8 cm deep. If 1,800 cm\u00b3 of water is added, how much does the water level rise?',
            solution: 'The added water volume = base area \u00d7 rise. Base area = 20 \u00d7 15 = 300 cm\u00b2. Rise = 1800/300 = 6 cm.',
            steps: [
              'Base area = length \u00d7 width = 20 \u00d7 15 = 300 cm\u00b2',
              'Added volume = base area \u00d7 rise in height',
              'Rise = 1800/300 = 6 cm'
            ],
            answer: '6 cm'
          },
          {
            problem: 'If the radius of a cylinder is doubled and the height is halved, what happens to the volume?',
            solution: 'Original V = \u03c0r\u00b2h. New V = \u03c0(2r)\u00b2(h/2) = \u03c0(4r\u00b2)(h/2) = 2\u03c0r\u00b2h. The volume doubles.',
            steps: [
              'Original: V = \u03c0r\u00b2h',
              'New radius = 2r, new height = h/2',
              'New V = \u03c0(2r)\u00b2(h/2) = \u03c0(4r\u00b2)(h/2) = 2\u03c0r\u00b2h',
              'Ratio = 2\u03c0r\u00b2h / (\u03c0r\u00b2h) = 2'
            ],
            answer: 'The volume doubles'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Forgetting to include both bases in cylinder surface area',
            correction: 'Total SA = 2\u03c0r\u00b2 + 2\u03c0rh (two bases + lateral area).',
            explanation: 'The formula 2\u03c0rh is only the lateral (side) area. The top and bottom bases add 2\u03c0r\u00b2.'
          },
          {
            mistake: 'Using diameter instead of radius in volume formulas',
            correction: 'If given diameter d, use r = d/2 in all formulas.',
            explanation: 'All cylinder and sphere formulas use radius. The diameter must be halved first.'
          }
        ],
        shortcuts: [
          {
            technique: 'Scaling shortcuts',
            description: 'If linear dimensions are scaled by factor k, volume scales by k\u00b3 and surface area by k\u00b2.',
            example: 'Double radius of sphere: volume increases 8\u00d7, surface area increases 4\u00d7.'
          },
          {
            technique: 'Water displacement',
            description: 'Volume of submerged object = rise in water level \u00d7 base area of container.',
            example: 'Object submerged in 10\u00d712 tank raises water 3 cm: volume = 10\u00d712\u00d73 = 360 cm\u00b3.'
          }
        ],
        practiceQuestions: ['q_quant_023', 'q_quant_024', 'q_quant_025', 'q_quant_026', 'q_quant_027', 'q_quant_028']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  TOPIC 13: STATISTICS
  // ---------------------------------------------------------------------------
  {
    id: 'statistics',
    title: 'Statistics',
    description: 'Master descriptive statistics: mean, median, mode, range, standard deviation, quartiles, and percentiles. Learn how data transformations affect these measures — a common GRE topic.',
    icon: '\uD83D\uDCCA',
    category: 'quant',
    lessons: [
      {
        id: 'statistics-central-tendency',
        title: 'Measures of Central Tendency: Mean, Median, Mode',
        topicId: 'statistics',
        content: `## Overview

Statistics on the GRE focuses on **descriptive statistics**: summarizing data sets with numerical measures. Key concepts include mean, median, mode, range, and weighted averages.

---

## Key Concepts

### Arithmetic Mean (Average)

**Mean = \u03a3x / n**. The sum of all values divided by the count.

> **Key Insight:** To find a missing value given the mean: total sum = mean \u00d7 n, then subtract the sum of known values.

### Weighted Average

When values have different importance: **Weighted Avg = \u03a3(w_i x_i) / \u03a3w_i**

Example: test (85%, weight 60%) + homework (70%, weight 40%) = (0.6 \u00d7 85 + 0.4 \u00d7 70) = **79%**

### Median

The **middle value** when data is arranged in ascending order:
- **Odd n**: median = (n+1)/2 th value
- **Even n**: median = average of the two middle values

> **Key Insight:** The median is **resistant to outliers**; the mean is not. In right-skewed data, mean > median. In left-skewed data, mean < median.

### Mode and Range

- **Mode**: the most frequently occurring value (can be none, one, or multiple)
- **Range**: **Max - Min**

### Combining Groups

If group A has n\u2081 elements with mean \u03bc\u2081 and group B has n\u2082 elements with mean \u03bc\u2082: **combined mean = (n\u2081\u03bc\u2081 + n\u2082\u03bc\u2082) / (n\u2081 + n\u2082)**

---

## Important Rules

- Mean = sum / n; sensitive to outliers
- Median = middle value of ordered data; resistant to outliers
- For symmetric data, mean = median
- For right-skewed data, mean > median
- For left-skewed data, mean < median
- Adding a constant to every value shifts the mean by that constant (median and mode too)
- Multiplying every value by k multiplies the mean, median, mode, and range by k`,

        objectives: [
          'Calculate the mean, median, mode, and range of a data set',
          'Find a missing value given the mean of a set',
          'Compute weighted averages',
          'Compare mean and median in symmetric and skewed distributions',
          'Calculate the combined mean of two or more groups'
        ],
        explanation: 'Mean = sum/n. Median = middle value of ordered data. Mode = most frequent value. Range = max - min. Weighted average = \u03a3(w_i x_i)/\u03a3w_i.',
        keyIdeas: [
          'The mean is sensitive to outliers; the median is not',
          'For symmetric data (bell curve), mean = median',
          'For right-skewed data, mean > median',
          'Combined mean = (n\u2081\u03bc\u2081 + n\u2082\u03bc\u2082)/(n\u2081+n\u2082)',
          'The median is the 50th percentile (Q\u2082)'
        ],
        formulas: [
          {
            id: 'mean',
            name: 'Arithmetic Mean',
            formula: 'Mean = \u03a3x / n',
            explanation: 'The mean is the sum of all values divided by the count.',
            usage: 'Use for average problems, finding total from mean, or finding missing values.',
            category: 'statistics',
            examples: ['{10,20,30,40}: mean=100/4=25', 'If mean of 5 numbers is 12 and four are {8,10,14,16}, 5th=60-48=12']
          },
          {
            id: 'weighted_avg',
            name: 'Weighted Average',
            formula: 'Weighted Avg = \u03a3(w_i x_i) / \u03a3w_i',
            explanation: 'Multiply each value by its weight, sum, divide by total weight.',
            usage: 'Use for grade averaging, mixture problems, or combining group averages.',
            category: 'statistics',
            examples: ['Test (90, weight 3) and Quiz (80, weight 1): (270+80)/4 = 87.5']
          }
        ],
        examples: [
          {
            question: 'The mean of 6 numbers is 15. If one number is removed, the mean becomes 14. What number was removed?',
            solution: 'Sum of 6 numbers = 6 \u00d7 15 = 90. Sum of 5 numbers = 5 \u00d7 14 = 70. Removed number = 90 - 70 = 20.',
            explanation: 'Find the total sum from the mean, then subtract to find the removed value.'
          },
          {
            question: 'Data set A: {5, 7, 9, 11, 13}. Data set B: {5, 7, 9, 11, 50}. Compare mean and median of each.',
            solution: 'Set A: mean = 9, median = 9 (symmetric). Set B: mean = 16.4, median = 9 (skewed right, mean > median).',
            explanation: 'The outlier 50 in set B pulls the mean up but does not affect the median.'
          }
        ],
        solvedExamples: [
          {
            problem: 'A class has 20 students. The average score on a test is 82. If the teacher adds 5 bonus points to each student\'s score, what is the new average?',
            solution: 'New mean = old mean + 5 = 87. Adding a constant to every value adds that constant to the mean.',
            steps: [
              'Original mean = 82',
              'Adding 5 to each value: new sum = old sum + 20(5) = old sum + 100',
              'New mean = (old sum + 100)/20 = old mean + 5 = 87'
            ],
            answer: '87'
          },
          {
            problem: 'In a data set, the mean of 8 numbers is 20. If each number is multiplied by 3, what is the new mean?',
            solution: 'New mean = 3 \u00d7 20 = 60. Multiplying every value by a constant multiplies the mean by that constant.',
            steps: [
              'Original mean = 20',
              'Each value multiplied by 3',
              'New sum = 3 \u00d7 original sum',
              'New mean = 3 \u00d7 20 = 60'
            ],
            answer: '60'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Computing median without ordering the data first',
            correction: 'Always arrange data in ascending order before finding the median.',
            explanation: 'The median is the middle value of ordered data. Without ordering, you might pick a value that is not central.'
          },
          {
            mistake: 'Assuming mean and median are always equal',
            correction: 'Mean and median are equal only for symmetric distributions. For skewed data, they differ.',
            explanation: 'Outliers and skewness affect the mean but not the median.'
          }
        ],
        shortcuts: [
          {
            technique: 'Effect of adding/subtracting constants',
            description: 'Adding a constant to every data point shifts mean, median, and mode by that constant. Range and SD are unchanged.',
            example: 'Add 10 to {5,10,15}: mean goes from 10 to 20, median from 10 to 20, range stays 10.'
          },
          {
            technique: 'Effect of multiplying by constants',
            description: 'Multiplying every value by k multiplies mean, median, mode, range, and SD by k.',
            example: 'Multiply {2,4,6} by 3: mean 4 \u2192 12, range 4 \u2192 12, SD also triples.'
          }
        ],
        practiceQuestions: ['q_quant_023', 'q_quant_024', 'q_quant_025', 'q_quant_026', 'q_quant_027', 'q_quant_028']
      },
      {
        id: 'statistics-dispersion-quartiles',
        title: 'Standard Deviation, Quartiles, and Data Distribution',
        topicId: 'statistics',
        content: `## Overview

**Standard deviation (SD)** measures the spread or dispersion of data around the mean. **Quartiles** and **percentiles** describe the distribution of data. Together they provide a complete picture of data spread.

---

## Key Concepts

### Standard Deviation

**\u03c3 = \u221a[\u03a3(x_i - \u03bc)\u00b2 / n]**

Steps to compute:
1. Find the mean (\u03bc)
2. Subtract the mean from each value (deviations)
3. **Square** each deviation
4. Find the **average** of squared deviations (variance)
5. Take the **square root**

For {4, 6, 8}: mean = 6. Variance = (4 + 0 + 4)/3 = 8/3 \u2248 2.67. SD = \u221a(8/3) \u2248 **1.63**

> **Key Insight:** The GRE rarely requires full SD calculation \u2014 it tests **conceptual understanding**:
> - Adding a constant to all values does **NOT** change the SD
> - Multiplying all values by **k** multiplies the SD by **|k|**
> - SD = 0 only when all values are identical
> - Range does **not** determine SD

### Quartiles and IQR

Quartiles divide ordered data into **four equal parts**:

| Quartile | Description |
|----------|-------------|
| **Q\u2081** | Median of the lower half (25th percentile) |
| **Q\u2082** | Median of the whole set (50th percentile) |
| **Q\u2083** | Median of the upper half (75th percentile) |

**IQR = Q\u2083 - Q\u2081** \u2014 the spread of the middle 50% of data. The IQR is **resistant to outliers**.

### Five-Number Summary and Box Plots

**Min, Q\u2081, Median, Q\u2083, Max** \u2014 displayed visually in a **box plot** (box = IQR, whiskers = min to max).

### Normal Distribution

In a normal distribution:
- **68%** of data falls within **1 SD**
- **95%** within **2 SDs**
- **99.7%** within **3 SDs**

---

## Important Rules

- SD measures spread around the mean
- Adding a constant to all values: SD unchanged
- Multiplying all values by k: SD multiplies by |k|
- IQR is the range of the middle 50% of data
- The five-number summary: min, Q\u2081, median, Q\u2083, max`,

        objectives: [
          'Interpret standard deviation as a measure of spread',
          'Determine how SD changes when constants are added or values are scaled',
          'Find quartiles and the interquartile range of a data set',
          'Read and interpret box plots',
          'Understand percentiles and the normal distribution'
        ],
        explanation: 'Standard deviation measures spread around the mean. Adding constants does not change SD; multiplying by k multiplies SD by |k|. Quartiles divide data into fourths. IQR = Q\u2083 - Q\u2081.',
        keyIdeas: [
          'SD = 0 means all values are identical',
          'Adding a constant to all values: SD unchanged',
          'Multiplying all values by k: SD multiplies by |k|',
          'IQR is the range of the middle 50% of data',
          'The five-number summary: min, Q\u2081, median, Q\u2083, max'
        ],
        formulas: [
          {
            id: 'std_dev',
            name: 'Standard Deviation',
            formula: '\u03c3 = \u221a[ \u03a3(x_i - \u03bc)\u00b2 / n ]',
            explanation: 'Standard deviation measures how spread out values are from the mean.',
            usage: 'GRE rarely requires full calculation. Know how operations affect SD.',
            category: 'statistics',
            examples: ['{4,6,8}: \u03bc=6, deviations\u00b2=4+0+4=8, \u03c3=\u221a(8/3)\u22481.63']
          },
          {
            id: 'interquartile_range',
            name: 'Interquartile Range',
            formula: 'IQR = Q\u2083 - Q\u2081',
            explanation: 'The IQR measures the spread of the middle 50% of data.',
            usage: 'Use with box plots or to describe spread not affected by outliers.',
            category: 'statistics',
            examples: ['{1,3,5,7,9,11,13}: Q\u2081=3, Q\u2083=11, IQR=8']
          }
        ],
        examples: [
          {
            question: 'Data set X has a mean of 50 and SD of 5. Each value is increased by 10. What is the new mean and SD?',
            solution: 'New mean = 50 + 10 = 60. New SD = 5 (unchanged).',
            explanation: 'Adding a constant shifts all values equally, so the mean shifts but the spread (SD) does not change.'
          },
          {
            question: 'Data set Y has values {2, 4, 6, 8, 10, 12, 14}. Find Q\u2081, median, and Q\u2083.',
            solution: 'Median (Q\u2082) = 8. Lower half: {2,4,6}, Q\u2081 = 4. Upper half: {10,12,14}, Q\u2083 = 12.',
            explanation: 'Divide the ordered set in half. The median of the lower half is Q\u2081; the upper half is Q\u2083.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Data set A has mean 20 and SD 3. Data set B is created by multiplying every value in A by 2 and then adding 5. Find the mean and SD of B.',
            solution: 'Mean of B = 2(20) + 5 = 45. SD of B = |2| \u00d7 3 = 6. (Multiplying by 2 doubles the SD; adding 5 does not change it.)',
            steps: [
              'Multiplying by 2: mean doubles to 40, SD doubles to 6',
              'Adding 5: mean increases to 45, SD unchanged at 6'
            ],
            answer: 'Mean = 45, SD = 6'
          },
          {
            problem: 'In a normally distributed data set, the mean is 100 and SD is 15. Between what two values do approximately 68% of the data fall?',
            solution: '68% falls within 1 SD of the mean: 100 - 15 = 85 to 100 + 15 = 115.',
            steps: [
              'One SD below mean: 100 - 15 = 85',
              'One SD above mean: 100 + 15 = 115',
              '68% of data falls between 85 and 115'
            ],
            answer: '85 and 115'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Thinking that adding a constant changes the standard deviation',
            correction: 'Adding a constant to every value does NOT change the SD. The spread remains the same.',
            explanation: 'SD measures dispersion around the mean. When all values shift by the same amount, the mean shifts equally, so the deviations from the mean are unchanged.'
          },
          {
            mistake: 'Confusing Q\u2081 with the minimum value or Q\u2083 with the maximum',
            correction: 'Q\u2081 is the median of the lower half. Q\u2083 is the median of the upper half. They are not the extremes.',
            explanation: 'The minimum is the smallest value; Q\u2081 is the 25th percentile. The maximum is the largest; Q\u2083 is the 75th percentile.'
          }
        ],
        shortcuts: [
          {
            technique: 'SD and range relationship',
            description: 'For roughly symmetric data, SD \u2248 range/4. For moderately sized data sets, this provides a quick estimate.',
            example: 'Range = 40, estimated SD \u2248 10'
          },
          {
            technique: 'Empirical rule (68-95-99.7)',
            description: 'In a normal distribution: 68% within 1 SD, 95% within 2 SDs, 99.7% within 3 SDs.',
            example: 'Mean=50, SD=10: 68% between 40-60, 95% between 30-70, 99.7% between 20-80.'
          }
        ],
        practiceQuestions: ['q_quant_029', 'q_quant_030', 'q_quant_031', 'q_quant_099', 'q_quant_100', 'q_quant_101']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  TOPIC 14: PROBABILITY
  // ---------------------------------------------------------------------------
  {
    id: 'probability',
    title: 'Probability',
    description: 'Learn fundamental probability concepts: the AND/OR rules, complements, conditional probability, combinations, and permutations. Essential for solving the probability problems that appear in every GRE Quant section.',
    icon: '\uD83C\uDFB2',
    category: 'quant',
    lessons: [
      {
        id: 'probability-basics',
        title: 'Basic Probability, Complements, AND/OR Rules',
        topicId: 'probability',
        content: `## Overview

**Probability** measures the likelihood of an event occurring. P(E) is always between **0 and 1** inclusive. The core formula: **P(E) = favorable outcomes / total possible outcomes** (all equally likely).

---

## Key Concepts

### Complement Rule

P(**not** E) = **1 - P(E)**. If P(rain) = 0.3, then P(no rain) = **0.7**.

### AND Rule (Multiplication)

For **independent** events: **P(A and B) = P(A) \u00d7 P(B)**

Flipping a coin and rolling a die: P(heads and 6) = (1/2)(1/6) = **1/12**

For **dependent** events (without replacement): **P(A and B) = P(A) \u00d7 P(B|A)**

Drawing two aces: (4/52)(3/51) = **1/221**

### OR Rule (Addition)

For **mutually exclusive** events (cannot both occur): **P(A or B) = P(A) + P(B)**

For **overlapping** events: **P(A or B) = P(A) + P(B) - P(A and B)**

Drawing a heart (13/52) or a king (4/52): P = 13/52 + 4/52 - 1/52 = **4/13**

> **Key Insight:** The subtraction in the OR rule avoids **double-counting** the overlap.

### At Least One

**P(at least one success) = 1 - P(no successes)**

Flipping a coin 3 times: P(at least one head) = 1 - (1/2)\u00b3 = 1 - 1/8 = **7/8**

---

## Important Rules

- P(E) is always between 0 and 1 (inclusive)
- Complement: P(not E) = 1 - P(E)
- Independent events: P(A and B) = P(A)P(B)
- Dependent events: P(A and B) = P(A) \u00d7 P(B|A)
- General OR rule: P(A or B) = P(A) + P(B) - P(A and B)
- At least one: P(at least one) = 1 - P(none)`,

        objectives: [
          'Calculate basic probabilities as favorable/total outcomes',
          'Apply the complement rule P(not E) = 1 - P(E)',
          'Apply the AND rule for both independent and dependent events',
          'Apply the OR rule for mutually exclusive and non-mutually exclusive events',
          'Solve "at least one" probability problems using the complement'
        ],
        explanation: 'P(E) = favorable/total. AND for independent: multiply. AND for dependent: multiply with condition. OR for mutually exclusive: add. OR for overlapping: add then subtract overlap. Complement: P(not E) = 1 - P(E).',
        keyIdeas: [
          'P(E) is always between 0 and 1 (inclusive)',
          'Complement: P(not E) = 1 - P(E)',
          'Independent events: P(A and B) = P(A)P(B)',
          'General OR rule: P(A or B) = P(A) + P(B) - P(A and B)',
          'At least one: P(at least one) = 1 - P(none)'
        ],
        formulas: [
          {
            id: 'basic_prob',
            name: 'Basic Probability',
            formula: 'P(E) = Number of favorable outcomes / Total possible outcomes',
            explanation: 'Probability measures likelihood from 0 (impossible) to 1 (certain).',
            usage: 'Use for any basic probability problem.',
            category: 'probability',
            examples: ['Rolling a 4 on a fair die: P = 1/6', 'Drawing a heart from a deck: 13/52 = 1/4']
          },
          {
            id: 'and_rule',
            name: 'AND (Multiplication) Rule',
            formula: 'P(A and B) = P(A) \u00d7 P(B)',
            explanation: 'For independent events, the probability both occur equals the product of their individual probabilities.',
            usage: 'Use for "and" problems with independent events.',
            category: 'probability',
            examples: ['Flip heads (1/2) AND roll 6 (1/6): P = 1/2 \u00d7 1/6 = 1/12']
          },
          {
            id: 'or_rule',
            name: 'OR (Addition) Rule',
            formula: 'P(A or B) = P(A) + P(B) - P(A and B)',
            explanation: 'The probability that A or B (or both) occur equals sum minus overlap.',
            usage: 'Use for "or" problems.',
            category: 'probability',
            examples: ['Heart (13/52) or King (4/52): P = 13/52+4/52-1/52 = 16/52 = 4/13']
          }
        ],
        examples: [
          {
            question: 'A bag contains 5 red marbles, 3 blue marbles, and 2 green marbles. What is the probability of drawing a blue marble?',
            solution: 'Total marbles = 10. P(blue) = 3/10.',
            explanation: 'Favorable outcomes (blue) = 3. Total outcomes = 10. P = 3/10.'
          },
          {
            question: 'Two fair dice are rolled. What is the probability of getting a sum of 7?',
            solution: 'Outcomes summing to 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6 outcomes. Total outcomes = 36. P = 6/36 = 1/6.',
            explanation: 'List all possible pairs that sum to 7. There are 6 favorable outcomes out of 36 total.'
          }
        ],
        solvedExamples: [
          {
            problem: 'A card is drawn from a standard 52-card deck. What is the probability that it is either a face card (J,Q,K) or a heart?',
            solution: 'P(face) = 12/52. P(heart) = 13/52. P(face and heart) = 3/52 (J\u2665, Q\u2665, K\u2665). P(face or heart) = 12/52 + 13/52 - 3/52 = 22/52 = 11/26.',
            steps: [
              'Count face cards: 4 suits \u00d7 3 = 12',
              'Count hearts: 13',
              'Overlap (face hearts): 3',
              'P = (12 + 13 - 3)/52 = 22/52 = 11/26'
            ],
            answer: '11/26'
          },
          {
            problem: 'Four coins are flipped. What is the probability of getting at least one head?',
            solution: 'P(at least one head) = 1 - P(no heads) = 1 - (1/2)\u2074 = 1 - 1/16 = 15/16.',
            steps: [
              'P(tail on one coin) = 1/2',
              'P(all tails) = (1/2)(1/2)(1/2)(1/2) = 1/16',
              'P(at least one head) = 1 - 1/16 = 15/16'
            ],
            answer: '15/16'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Adding probabilities for "and" scenarios instead of multiplying',
            correction: 'P(A and B) = P(A) \u00d7 P(B) for independent events. Addition is for "or."',
            explanation: 'The AND rule involves multiplication (both must happen). The OR rule involves addition (at least one happens).'
          },
          {
            mistake: 'Forgetting to subtract the overlap in the OR rule',
            correction: 'When events can both occur, subtract P(A and B) to avoid double-counting.',
            explanation: 'If A and B overlaps are counted in both P(A) and P(B), you must subtract the overlap once.'
          }
        ],
        shortcuts: [
          {
            technique: 'Complement for "at least one"',
            description: 'Always solve "at least one" problems by finding the probability of "none" and subtracting from 1.',
            example: 'P(at least one 6 in 3 rolls) = 1 - (5/6)\u00b3 = 1 - 125/216 = 91/216'
          },
          {
            technique: 'Probability of "not both"',
            description: 'P(not both A and B) = 1 - P(A and B). Useful for "at most one" scenarios.',
            example: 'P(not both heads in 2 flips) = 1 - (1/2)(1/2) = 3/4'
          }
        ],
        practiceQuestions: ['q_quant_029', 'q_quant_030', 'q_quant_031', 'q_quant_099', 'q_quant_100', 'q_quant_101']
      },
      {
        id: 'combinations-permutations',
        title: 'Combinations and Permutations',
        topicId: 'probability',
        content: `## Overview

**Combinations** and **permutations** count the number of ways to select or arrange items. They are essential for probability problems involving counting on the GRE.

---

## Key Concepts

### Permutations (Order Matters)

**P(n, r) = n! / (n - r)!** \u2014 the number of ways to arrange r items chosen from n items.

Example: arranging 3 books on a shelf from 5 books: P(5,3) = 5! / 2! = **60**

### Combinations (Order Does Not Matter)

**C(n, r) = n! / [r! \u00d7 (n - r)!]** \u2014 the number of ways to choose r items from n items.

Example: choosing 3 committee members from 5 people: C(5,3) = 5!/(3!\u00d72!) = **10**

> **Key Insight:** If selecting a **president, VP, treasurer** \u2014 order matters (use P). If selecting a **committee** \u2014 order does not matter (use C).

### Factorials

**n! = n \u00d7 (n-1) \u00d7 (n-2) \u00d7 ... \u00d7 3 \u00d7 2 \u00d7 1**. By definition, **0! = 1**.

| n | n! |
|---|----|
| 5! | 120 |
| 6! | 720 |
| 7! | 5,040 |

### Special Cases

- C(n,0) = C(n,n) = **1**
- C(n,1) = **n**
- C(n,r) = **C(n, n-r)**

### Fundamental Counting Principle

If one event can happen in **m** ways and another in **n** ways, the number of ways both can happen is **m \u00d7 n**. Extends to any number of independent events.

---

## Important Rules

- Permutation: order matters (arrangements, rankings, schedules)
- Combination: order does not matter (teams, committees, groups)
- C(n,r) = C(n, n-r) \u2014 choosing r is same as choosing which n-r to exclude
- n! = n \u00d7 (n-1) \u00d7 ... \u00d7 1, and 0! = 1
- Fundamental counting principle: multiply choices for each independent step
- For identical items: arrangements = n! / (n\u2081! \u00d7 n\u2082! \u00d7 ...)`,

        objectives: [
          'Distinguish between permutations (order matters) and combinations (order does not)',
          'Calculate n! and use it in permutation and combination formulas',
          'Compute P(n,r) and C(n,r)',
          'Apply the fundamental counting principle to multi-step selections',
          'Use combinations to calculate probabilities in selection problems'
        ],
        explanation: 'Permutations P(n,r) = n!/(n-r)! count arrangements (order matters). Combinations C(n,r) = n!/[r!(n-r)!] count selections (order does not). The fundamental counting principle: multiply the number of choices for each independent decision.',
        keyIdeas: [
          'Permutation: order matters (arrangements, rankings, schedules)',
          'Combination: order does not matter (teams, committees, groups)',
          'C(n,r) = C(n, n-r) � choosing r is same as choosing which n-r to exclude',
          'n! = n \u00d7 (n-1) \u00d7 ... \u00d7 1, and 0! = 1',
          'Fundamental counting principle: multiply choices for each independent step'
        ],
        formulas: [
          {
            id: 'combinations',
            name: 'Combinations (nCr)',
            formula: 'C(n, r) = n! / [r! \u00d7 (n - r)!]',
            explanation: 'The number of ways to choose r items from n items where order does NOT matter.',
            usage: 'Use when selecting a committee, team, or group.',
            category: 'probability',
            examples: ['Choose 3 from 5: C(5,3)=10', 'C(10,2)=45']
          },
          {
            id: 'permutations',
            name: 'Permutations (nPr)',
            formula: 'P(n, r) = n! / (n - r)!',
            explanation: 'The number of ways to arrange r items from n items where order DOES matter.',
            usage: 'Use for seating arrangements, rankings, schedules, or sequences.',
            category: 'probability',
            examples: ['Arrange 2 from 5: P(5,2)=20', '3 people in 3 chairs: P(3,3)=6']
          }
        ],
        examples: [
          {
            question: 'How many different 4-digit PINs can be formed from the digits 0-9 if digits can repeat?',
            solution: 'For each digit: 10 choices. Total = 10 \u00d7 10 \u00d7 10 \u00d7 10 = 10,000.',
            explanation: 'Use the fundamental counting principle. Each of the 4 positions has 10 independent choices.'
          },
          {
            question: 'How many ways can a president, VP, and secretary be chosen from 12 members?',
            solution: 'P(12,3) = 12!/(12-3)! = 12!/9! = 12 \u00d7 11 \u00d7 10 = 1,320.',
            explanation: 'Order matters (different roles), so use permutations.'
          }
        ],
        solvedExamples: [
          {
            problem: 'A committee of 4 people is to be chosen from 10 candidates. How many different committees are possible?',
            solution: 'C(10,4) = 10!/(4!\u00d76!) = (10\u00d79\u00d78\u00d77)/(4\u00d73\u00d72\u00d71) = 5040/24 = 210.',
            steps: [
              'Order does not matter (committee), so use combinations',
              'C(10,4) = 10!/(4!6!)',
              'Simplify: (10\u00d79\u00d78\u00d77)/(4\u00d73\u00d72\u00d71)',
              'Numerator: 5040, Denominator: 24',
              'Result: 210'
            ],
            answer: '210'
          },
          {
            problem: 'What is the probability of drawing exactly 2 aces in a 5-card poker hand from a standard 52-card deck?',
            solution: 'Total hands: C(52,5). Favorable: choose 2 aces from 4 (C(4,2)) and 3 non-aces from 48 (C(48,3)). P = [C(4,2) \u00d7 C(48,3)] / C(52,5). C(4,2)=6, C(48,3)=17296, C(52,5)=2,598,960. P = (6\u00d717296)/2598960 \u2248 0.040.',
            steps: [
              'Total possible hands: C(52,5) = 2,598,960',
              'Choose 2 aces from 4: C(4,2) = 6',
              'Choose 3 non-aces from 48: C(48,3) = 17,296',
              'Favorable = 6 \u00d7 17,296 = 103,776',
              'P = 103,776 / 2,598,960 \u2248 0.040'
            ],
            answer: 'Approximately 0.040 (or 1/25)'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Using permutations when the problem asks for combinations (or vice versa)',
            correction: 'Ask: does the order/position matter? If selecting a "team," order does not matter (combinations). If assigning "roles" or "positions," order matters (permutations).',
            explanation: 'Distinguish: selecting 3 people for a committee (combination) vs. selecting a president, VP, and treasurer (permutation).'
          },
          {
            mistake: 'Forgetting that 0! = 1',
            correction: '0! is defined as 1. This makes formulas work for edge cases like C(n,0) or C(n,n).',
            explanation: 'With 0! = 1, C(n,0) = n!/(0!\u00d7n!) = 1 and P(n,n) = n!/0! = n!.'
          }
        ],
        shortcuts: [
          {
            technique: 'C(n,r) symmetric property',
            description: 'C(n,r) = C(n, n-r). Compute the easier side.',
            example: 'C(100,98) = C(100,2) = (100\u00d799)/2 = 4,950'
          },
          {
            technique: 'Arrangements with identical items',
            description: 'For n items with groups of identical items (n\u2081, n\u2082, ...), arrangements = n!/(n\u2081!\u00d7n\u2082!\u00d7...).',
            example: 'Letters in "BOOK": 4!/(2!) = 12 arrangements (the two Os are identical)'
          }
        ],
        practiceQuestions: ['q_quant_029', 'q_quant_030', 'q_quant_031', 'q_quant_099', 'q_quant_100', 'q_quant_101']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  TOPIC 15: WORD PROBLEMS
  // ---------------------------------------------------------------------------
  {
    id: 'word-problems',
    title: 'Word Problems',
    description: 'Apply mathematical reasoning to real-world scenarios: rate/work/distance problems, mixture and concentration, age relationships, and consecutive integer puzzles. These problems test your ability to translate words into equations.',
    icon: '\uD83D\uDCDD',
    category: 'quant',
    lessons: [
      {
        id: 'word-problems-rate-work-distance',
        title: 'Rate, Work, and Distance Problems',
        topicId: 'word-problems',
        content: `## Overview

**Rate problems** on the GRE involve the relationship between **rate**, **time**, and a **quantity** (distance, work, or cost). The foundational formula: **Quantity = Rate \u00d7 Time**.

---

## Key Concepts

### Distance-Rate-Time

**D = R \u00d7 T**. If a car travels at 60 mph for 3 hours, distance = 60 \u00d7 3 = **180 miles**.

### Relative Motion

| Scenario | Combined Speed | Example |
|----------|---------------|---------|
| **Toward each other** | **Sum** of speeds | 300 miles apart at 40 + 60 mph: meet in **3 hours** |
| **Same direction (chase)** | **Difference** of speeds | 30-mile gap at 50 - 40 mph: catch in **3 hours** |

### Average Speed

> **Key Insight:** Average speed is **NOT** the average of the speeds. It is **total distance / total time**.

60 miles at 30 mph + 60 miles at 60 mph: total D = 120, total T = 3 hrs, avg speed = **40 mph** (not 45).

### Work Problems

Combined rate: **1/T = 1/t\u2081 + 1/t\u2082**, where T is the time together.

If pipe A fills a tank in 4 hours and pipe B in 6 hours: 1/T = 1/4 + 1/6 = 5/12, so T = **2.4 hours**.

### Filling and Draining

When one entity fills and another drains: **net rate = fill rate - drain rate**.

Pipe A fills at 10 L/min, pipe B drains at 4 L/min: net fill rate = **6 L/min**.

---

## Important Rules

- Distance = Rate \u00d7 Time; rearrange to find any missing variable
- Combined work: 1/T = 1/t\u2081 + 1/t\u2082
- Average speed is NOT the arithmetic mean of speeds
- Relative speed (toward): sum of speeds; (same direction): difference
- For two workers with times a and b: combined time = ab/(a+b)
- Use a table with columns for rate, time, and quantity to organize information`,

        objectives: [
          'Solve distance-rate-time problems including round trips and relative motion',
          'Calculate average speed correctly (total distance/total time)',
          'Solve combined work problems using reciprocals',
          'Solve problems with filling and draining rates',
          'Organize information using rate tables'
        ],
        explanation: 'D = RT. For work together: 1/T = 1/t\u2081 + 1/t\u2082. Average speed = total distance/total time. Relative speed toward = sum; same direction = difference.',
        keyIdeas: [
          'Distance = Rate \u00d7 Time. Rearrange to find any missing variable.',
          'Combined work: 1/T = 1/t\u2081 + 1/t\u2082',
          'Average speed is NOT the arithmetic mean of speeds',
          'Relative speed (toward each other): sum of speeds',
          'Relative speed (same direction): difference of speeds'
        ],
        formulas: [
          {
            id: 'combined_work',
            name: 'Combined Work',
            formula: '1/T = 1/t\u2081 + 1/t\u2082 + 1/t\u2083 + ...',
            explanation: 'When workers work together, the reciprocal of combined time equals sum of reciprocals of individual times.',
            usage: 'Use for problems where two or more people/pipes/machines work together.',
            category: 'arithmetic',
            examples: ['Pipe A fills in 4 hrs, Pipe B in 6 hrs: 1/T = 1/4+1/6 = 5/12, T = 12/5 = 2.4 hrs']
          },
          {
            id: 'avg_speed',
            name: 'Average Speed',
            formula: 'Average Speed = Total Distance / Total Time',
            explanation: 'Average speed is total distance divided by total time, NOT the average of the speeds.',
            usage: 'Use for multi-leg trips with different speeds.',
            category: 'arithmetic',
            examples: ['60 mi at 30 mph + 60 mi at 60 mph: total D=120, total T=2+1=3 hrs, avg speed=40 mph']
          }
        ],
        examples: [
          {
            question: 'A cyclist travels 10 miles at 5 mph and 15 miles at 10 mph. What is the average speed?',
            solution: 'Time for first leg: 10/5 = 2 hours. Time for second leg: 15/10 = 1.5 hours. Total distance = 25 miles. Total time = 3.5 hours. Average speed = 25/3.5 \u2248 7.14 mph.',
            explanation: 'Find each leg time separately, then use total distance/total time.'
          },
          {
            question: 'Bob can paint a room in 6 hours. Alice can paint the same room in 3 hours. How long will it take them working together?',
            solution: '1/T = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2. So T = 2 hours.',
            explanation: 'Use the combined work formula: add the reciprocals of individual times.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Train A leaves station X traveling at 70 mph. Two hours later, Train B leaves the same station traveling at 90 mph on the same track. How long will it take Train B to catch Train A?',
            solution: 'In 2 hours, Train A has traveled 70 \u00d7 2 = 140 miles. The relative speed (B catching A) is 90 - 70 = 20 mph. Time to close the gap: 140/20 = 7 hours.',
            steps: [
              'Distance Train A covers in 2 hours: 70 \u00d7 2 = 140 miles',
              'Relative speed: 90 - 70 = 20 mph',
              'Time to catch: gap/relative speed = 140/20 = 7 hours'
            ],
            answer: '7 hours'
          },
          {
            problem: 'One pipe can fill a tank in 8 hours. Another pipe can fill it in 12 hours. A drain can empty the full tank in 24 hours. If all three are open simultaneously, how long to fill the tank?',
            solution: 'Fill rates: 1/8 and 1/12 tank/hour. Drain rate: 1/24 tank/hour. Net rate = 1/8 + 1/12 - 1/24 = 3/24 + 2/24 - 1/24 = 4/24 = 1/6. Time = 6 hours.',
            steps: [
              'First pipe rate: 1/8',
              'Second pipe rate: 1/12',
              'Drain rate: -1/24',
              'Net rate: 1/8 + 1/12 - 1/24 = 3/24 + 2/24 - 1/24 = 4/24 = 1/6',
              'Time = 1/(1/6) = 6 hours'
            ],
            answer: '6 hours'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Averaging speeds instead of using total distance/total time',
            correction: 'Average speed = total distance / total time. Do not simply average the speed numbers.',
            explanation: 'If different legs take different amounts of time, the speeds are not equally weighted in the average.'
          },
          {
            mistake: 'Adding times directly in combined work problems',
            correction: 'Use the reciprocal formula: 1/T = 1/t\u2081 + 1/t\u2082. Do not add t\u2081 + t\u2082.',
            explanation: 'Work rates add, not times. If you add times directly, you would incorrectly conclude two workers take longer than one.'
          }
        ],
        shortcuts: [
          {
            technique: 'Product-over-sum for two workers',
            description: 'For two workers with times a and b: combined time = ab/(a+b).',
            example: '6 and 3: combined = (6\u00d73)/(6+3) = 18/9 = 2 hours'
          },
          {
            technique: 'Meeting time for two travelers',
            description: 'Time to meet = initial distance / (sum of speeds).',
            example: '300 miles apart, speeds 40 and 60: time = 300/100 = 3 hours'
          }
        ],
        practiceQuestions: ['q_quant_032', 'q_quant_033', 'q_quant_034', 'q_quant_035', 'q_quant_036', 'q_quant_037']
      },
      {
        id: 'word-problems-mixtures-age-integers',
        title: 'Mixture, Age, and Consecutive Integer Problems',
        topicId: 'word-problems',
        content: `## Overview

**Age**, **consecutive integer**, **mixture**, and **digit** problems test your ability to **translate words into equations**. Each type follows specific patterns that make them predictable once you learn the setup.

---

## Key Concepts

### Age Problems

> **Key Insight:** Age differences remain **constant** over time. If John is 10 years older than Mary today, he is 10 years older at any point in time.

Set up a table: rows for each person, columns for Past, Present, Future. Let x = current unknown age.

Example: "Mary is 3 times as old as her son. In 10 years, she will be twice as old." Son = x, Mary = 3x. In 10 years: 3x + 10 = 2(x + 10) \u2192 x = 10. Son is **10**, Mary is **30**.

### Consecutive Integer Problems

| Type | Representation |
|------|---------------|
| Consecutive integers | n, n+1, n+2, ... |
| Consecutive even/odd | n, n+2, n+4, ... |

Example: three consecutive odds sum to 57: n + (n+2) + (n+4) = 57 \u2192 n = 17. Integers: **17, 19, 21**.

### Mixture Problems

**General equation**: (value\u2081 \u00d7 qty\u2081) + (value\u2082 \u00d7 qty\u2082) = target \u00d7 total

**Alligation method**: draw a number line with component values at ends and target in the middle. The ratio of distances equals the ratio of quantities.

### Digit Problems

A two-digit number with tens digit T and units digit U:
- Value = **10T + U**
- Reversed = **10U + T**
- Difference = **9(T - U)**

---

## Important Rules

- Age difference between two people is constant over time
- Let x = current age; express future/past ages as x + t or x - t
- Consecutive integers: n, n+1, n+2; consecutive evens/odds: n, n+2, n+4
- Mixture equation: weighted sum of components = target \u00d7 total
- Two-digit number: value = 10T + U, reverse = 10U + T`,

        objectives: [
          'Solve age problems by defining variables and using the constant age difference property',
          'Set up and solve consecutive integer problems',
          'Solve mixture problems involving prices and concentrations',
          'Use the alligation method for two-component mixtures',
          'Solve digit reversal and number property word problems'
        ],
        explanation: 'Age: differences stay constant over time. Consecutive integers: n, n+1, n+2... Consecutive evens/odds: n, n+2, n+4... Mixtures: (value_1 \u00d7 qty_1) + (value_2 \u00d7 qty_2) = target \u00d7 total.',
        keyIdeas: [
          'Age difference between two people is constant over time',
          'Let x = current age; express future/past ages as x + t or x - t',
          'Consecutive integers: n, n+1, n+2; consecutive evens: n, n+2, n+4',
          'Mixture equation: weighted sum of components = target \u00d7 total',
          'Two-digit number: value = 10T + U, reverse = 10U + T'
        ],
        formulas: [
          {
            id: 'consecutive_sum',
            name: 'Sum of Consecutive Integers',
            formula: 'Sum = n \u00d7 (first + last) / 2',
            explanation: 'The sum of a consecutive integer sequence equals the number of terms times the average of first and last.',
            usage: 'Use for sums of consecutive integers, evens, or odds.',
            category: 'number_properties',
            examples: ['Sum 1+2+...+100 = 100\u00d7(1+100)/2 = 5,050']
          }
        ],
        examples: [
          {
            question: 'Five years ago, Maria was twice as old as her son. In three years, she will be 1.5 times as old as her son. Find their current ages.',
            solution: 'Let son = x, Maria = y. Five years ago: y-5 = 2(x-5). In three years: y+3 = 1.5(x+3). From first: y = 2x - 5. Substitute: 2x-5+3 = 1.5x+4.5. 2x-2 = 1.5x+4.5. 0.5x = 6.5. x=13, y=21.',
            explanation: 'Set up two equations based on the time conditions and solve the system.'
          },
          {
            question: 'Find three consecutive even integers whose sum is 78.',
            solution: 'Let integers be n, n+2, n+4. Sum: n + (n+2) + (n+4) = 3n + 6 = 78. 3n = 72, n = 24. Integers: 24, 26, 28.',
            explanation: 'Consecutive evens differ by 2. Set up the sum and solve for n.'
          }
        ],
        solvedExamples: [
          {
            problem: 'A chemist has 20 liters of a 30% acid solution. How many liters of 60% acid solution must be added to obtain a 40% solution?',
            solution: 'Let x = liters of 60% added. Acid equation: 0.30(20) + 0.60x = 0.40(20 + x). 6 + 0.6x = 8 + 0.4x. 0.2x = 2. x = 10 liters.',
            steps: [
              'Set up acid equation: 0.30(20) + 0.60x = 0.40(20+x)',
              'Simplify: 6 + 0.6x = 8 + 0.4x',
              'Subtract 0.4x: 6 + 0.2x = 8',
              'Subtract 6: 0.2x = 2',
              'Divide: x = 10'
            ],
            answer: '10 liters'
          },
          {
            problem: 'The sum of the digits of a two-digit number is 11. If the digits are reversed, the new number is 27 less than the original. Find the original number.',
            solution: 'Let tens digit = T, units digit = U. T + U = 11. Original = 10T + U. Reversed = 10U + T. 10T + U - (10U + T) = 27. 9T - 9U = 27. T - U = 3. With T+U=11 and T-U=3: adding gives 2T=14, T=7. Then U=4. Original number = 74.',
            steps: [
              'T + U = 11',
              'Original - Reversed = 27: (10T+U) - (10U+T) = 27 \u2192 9T-9U=27 \u2192 T-U=3',
              'Solve system: T+U=11, T-U=3',
              'Add: 2T=14, T=7',
              'U=11-7=4, number=74'
            ],
            answer: '74'
          }
        ],
        commonMistakes: [
          {
            mistake: 'In age problems, forgetting to adjust both ages by the same number of years',
            correction: 'When moving forward or backward in time, add or subtract the same amount from EVERY person\'s age.',
            explanation: 'If we go 5 years into the future, both the mother and the son age 5 years, not just one of them.'
          },
          {
            mistake: 'Using the same variable for consecutive evens but only adding 1 (n, n+1, n+2)',
            correction: 'Consecutive even/odd integers differ by 2: n, n+2, n+4.',
            explanation: 'Even numbers like 2, 4, 6 differ by 2, not 1. Odd numbers like 3, 5, 7 also differ by 2.'
          }
        ],
        shortcuts: [
          {
            technique: 'Age difference trick',
            description: 'The age difference is constant. If a problem gives ratio at two different times, set the difference equal.',
            example: 'Dad is 3x son now, and in 10 years will be 2x son: 3x - x = (2y - y) where y = son in 10 years, then 2x = y.'
          },
          {
            technique: 'Digit reversal shortcut',
            description: 'The difference between a two-digit number and its reverse is always 9 times the difference of the digits.',
            example: '73 - 37 = 36 = 9 \u00d7 (7-3). 84 - 48 = 36 = 9 \u00d7 (8-4).'
          }
        ],
        practiceQuestions: ['q_quant_032', 'q_quant_033', 'q_quant_034', 'q_quant_035', 'q_quant_036', 'q_quant_037']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  VERBAL � 8 Topics
  // ---------------------------------------------------------------------------
  {
    id: 'text-completion-single',
    title: 'Text Completion - Single Blank',
    description: 'Learn how to solve single-blank Text Completion questions using context clues, signal words, and logical reasoning. Covers supporting signals, contrast signals, and strategies for predicting the correct answer before looking at choices.',
    icon: '\uD83D\uDCDD',
    category: 'verbal',
    lessons: [
      {
        id: 'tc-single-context-clues',
        title: 'Context Clues and Signal Words',
        topicId: 'text-completion-single',
        content: `## Overview

Text Completion questions on the GRE test your ability to understand how words function within a sentence's logical structure. Single-blank questions are the most common entry point: you must choose the single word that best completes the passage based on **context clues** and **signal words** that reveal the intended meaning.

## Key Concepts

### Context Clues

Context clues are words and phrases in the passage that hint at the missing word's meaning. There are three main types:
- **Definition/Explanation**: the passage directly defines the missing word — *"The professor was known for her ___ approach; she believed in adapting her teaching to each student's needs"* suggests **flexible** or **adaptive**.
- **Example clues**: specific examples illustrate the missing concept — *"She had several ___ interests, including painting, sculpting, and sketching"* suggests **artistic**.
- **Inference clues**: you must reason from the general context — *"The team's ___ performance led to their relegation; they lost 20 of 22 matches"* suggests **poor** or **abysmal**.

### Signal Words

**Supporting signals** indicate the blank continues in the same direction as the clue:
- *Similarly, likewise, also, and, moreover, furthermore, in addition*
- *Indeed, in fact, certainly*
- *Because, since, for* (cause-effect)
- *Thus, therefore, consequently* (result)

**Contrast signals** indicate the blank goes in the opposite direction:
- *But, however, yet, nevertheless, nonetheless*
- *Although, though, even though, despite, in spite of*
- *While, whereas, on the other hand*
- *Rather than, instead of, unlike, contrary to*

## Important Rules

- Read the **entire sentence first**, ignoring the blank, to understand the full context.
- Identify **signal words** and **context clues** before predicting.
- Predict a word that fits, then match your prediction to the answer choices.
- Wrong answers are often plausible in isolation but fail to match specific context cues.
- Always test your answer by **rereading the full sentence** with your choice inserted.

> **Key Insight:** Predicting the answer *before* looking at the choices prevents you from being seduced by attractive wrong answers. The GRE rewards logic over vocabulary recall.

---`,
        objectives: [
          'Identify three types of context clues in Text Completion passages',
          'Recognize supporting and contrast signal words',
          'Predict the missing word before looking at answer choices',
          'Eliminate answer choices that do not match the context',
          'Test selected answers by rereading the complete sentence'
        ],
        explanation: 'Read the full sentence, identify signal words (supporting or contrast), predict the missing word, then match to answer choices. Contrast signals reverse the expected direction; supporting signals continue it.',
        keyIdeas: [
          'Read the entire sentence before examining answer choices',
          'Supporting signals (and, because, thus) continue the same idea',
          'Contrast signals (but, although, despite) reverse the direction',
          'Predict your own word before looking at the options',
          'Reread the full sentence with your selected answer to verify'
        ],
        formulas: [],
        examples: [
          {
            question: 'The scientist was known for her ___ approach to research, preferring to explore multiple hypotheses simultaneously rather than focusing on a single theory.',
            solution: 'multifaceted or eclectic',
            explanation: 'The clue "preferring to explore multiple hypotheses simultaneously" supports a word meaning "diverse" or "wide-ranging."'
          },
          {
            question: 'Though the book was initially met with ___ reviews, it eventually gained widespread acclaim.',
            solution: 'unfavorable or negative',
            explanation: '"Though" is a contrast signal. The second part says "gained widespread acclaim," so the blank must be the opposite: negative reviews.'
          }
        ],
        solvedExamples: [
          {
            problem: 'The professor\'s lectures were ___: he could transform even the most tedious subject into a fascinating discussion.',
            solution: 'The clue says he transforms tedious subjects into fascinating discussions. The missing word describes how he lectures. The answer should be words like "engaging," "captivating," or "enlightening." Among the choices, "captivating" fits perfectly.',
            steps: [
              'Read full sentence, identify structure: "lectures were ___: he could transform..."',
              'The colon (:) is a supporting signal � the second part explains the first',
              'Context clue: "transform tedious subject into fascinating discussion"',
              'Predict: "interesting," "compelling"',
              'Match: "captivating" works'
            ],
            answer: 'captivating'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Choosing a word without reading the entire sentence first',
            correction: 'Read the whole sentence to understand the full context before looking at answer choices.',
            explanation: 'Individual phrases can be misleading. The full sentence provides necessary context for the correct meaning.'
          },
          {
            mistake: 'Ignoring signal words that reverse the meaning',
            correction: 'Circle signal words like "although" or "despite" � they tell you the blank must contrast with another part of the sentence.',
            explanation: 'Contrast signals completely change the expected direction of the blank. Missing them leads to choosing the opposite of the correct word.'
          }
        ],
        shortcuts: [
          {
            technique: 'Eliminate extremes first',
            description: 'If a word is too extreme (very strong positive or negative), it is often wrong unless the context clearly demands it.',
            example: 'For a moderate criticism context, "venomous" is probably too strong; "critical" is better.'
          },
          {
            technique: 'Two-word test',
            description: 'If you are between two choices, plug each into the sentence and see which one flows more naturally with the overall tone.',
            example: 'Both "hesitant" and "reluctant" may work, but the specific context may favor one.'
          }
        ],
        practiceQuestions: ['q_quant_032', 'q_quant_033', 'q_quant_034', 'q_quant_035', 'q_quant_036', 'q_quant_037']
      },
      {
        id: 'tc-single-advanced-strategies',
        title: 'Advanced Strategies for Single-Blank TC',
        topicId: 'text-completion-single',
        content: `## Overview

Beyond basic context clues, single-blank Text Completions on the GRE require sophisticated reasoning about **tone**, **logic**, and **sentence structure**. Advanced passages often contain complex syntax, multiple clauses, and subtle relationships between ideas.

## Key Concepts

### Logical Sentence Structures

Identifying the logical structure of a sentence is a critical skill. Common structures include:
- **Cause and effect**: "Because X, the result was Y." The blank often appears in either the cause or the effect.
- **Condition and consequence**: "If X were true, then Y would follow."
- **Comparison/contrast**: "Unlike X, which is A, Y is B."
- **Concession**: "Although X is true, Y is also true."

When a sentence has multiple clauses, determine how each clause relates to the others. Ask: is the second clause **supporting**, **contrasting**, or **explaining** the first? Draw arrows to visualize these relationships.

### Author\u2019s Attitude and Tone

Recognizing the **author\u2019s attitude** constrains the blank. If the passage is academic and objective, the blank is unlikely to be an emotional or slang term. If the passage is critical, the blank is likely negative \u2014 but still formal.

### Advanced Context Techniques

**Word sandwiches**: two parts of the sentence both support the blank from different angles. Example: *"The scientist was both ___ and ___; she never gave up, yet she remained open to new ideas."* First clue (never gave up) suggests **persistent**; second (open to new ideas) suggests **flexible**.

**Literal vs. figurative language**: the GRE sometimes uses figurative context. *"The CEO was a ___ when it came to budgeting; every department felt his tight grip."* The clue "tight grip" figuratively suggests **miser** or **tightwad**.

**Secondary meanings**: many GRE words have multiple meanings. The word **qualify** can mean "to limit or modify" (in academic context) or "to meet the requirements." Be alert for less common meanings.

## Important Rules

- Treat each Text Completion as a **logic puzzle**, not a vocabulary test.
- Map the **relationships between clauses** before selecting an answer.
- Consider the author\u2019s **tone and register** \u2014 match the blank to the passage\u2019s formality.
- Watch for **figurative language** that implies meaning indirectly.
- For word sandwiches, use **both clues** to triangulate the correct meaning.

> **Key Insight:** Logic matters more than vocabulary for consistent success. The reasoning process of identifying clues and signals is what separates top scorers from average ones.

---`,
        objectives: [
          'Identify advanced logical structures in TC passages',
          'Determine the author\'s attitude and match the blank\'s tone',
          'Analyze multi-clause sentences and their inter-relationships',
          'Recognize literal and figurative language in context',
          'Apply a systematic logic-first, vocabulary-second approach'
        ],
        explanation: 'Treat each TC as a logic puzzle. Map the relationships between clauses, identify the author\'s tone, use context clues from multiple parts of the sentence, and be aware of secondary word meanings.',
        keyIdeas: [
          'Map logical structures: cause-effect, contrast, concession, comparison',
          'The author\'s attitude (positive, negative, neutral) constrains the blank',
          'Use "word sandwiches" � clues from multiple parts of the sentence',
          'Watch for figurative language that implies meaning indirectly',
          'Logic is more important than vocabulary for consistent accuracy'
        ],
        formulas: [],
        examples: [
          {
            question: 'Far from being ___, the professor was remarkably accessible, often holding extra office hours and responding to emails promptly.',
            solution: 'aloof or inaccessible',
            explanation: '"Far from" is a contrast signal. The blank is the opposite of "accessible." Aloof means distant and unfriendly, which contrasts with being accessible.'
          },
          {
            question: 'The film\'s ___ plot � involving time travel, parallel dimensions, and doppelgangers � left many viewers confused.',
            solution: 'convoluted or labyrinthine',
            explanation: 'The list of confusing plot elements (time travel, parallel dimensions) serves as examples supporting a word meaning "complicated" or "intricate."'
          }
        ],
        solvedExamples: [
          {
            problem: 'Although the candidate attempted to appear ___, his carefully scripted responses revealed a politician who was anything but spontaneous.',
            solution: 'The clue: "anything but spontaneous" tells us he is NOT spontaneous. The blank is what he tried to appear. The contrast signal "although" connects his appearance (blank) to the reality (not spontaneous). So the blank should be "spontaneous" or a synonym. The correct answer is "offhand" or "impromptu."',
            steps: [
              '"Although" indicates contrast between appearance and reality',
              'Reality: he is "anything but spontaneous"',
              'Therefore appearance (blank) = the opposite = spontaneous',
              'Match to choices: "offhand" = casual, spontaneous'
            ],
            answer: 'offhand'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Choosing a word that fits one clause but contradicts another',
            correction: 'Every word must be consistent with ALL parts of the sentence, not just the surrounding clause.',
            explanation: 'A word may seem to fit the immediate context but contradict a signal word or another clause. Test your answer against the entire sentence.'
          },
          {
            mistake: 'Overlooking the tone/formality level of the passage',
            correction: 'Match the formality of the blank to the passage\'s overall register. Academic passages require formal vocabulary.',
            explanation: 'Using a colloquial word in an otherwise formal passage is a common error. The register of the blank should match the register of the surrounding text.'
          }
        ],
        shortcuts: [
          {
            technique: 'The "concession" shortcut',
            description: 'In "Although X, Y" sentences, X and Y are opposites. If you know one, you know the other must be its opposite.',
            example: '"Although the plan seemed ___, it proved effective." The blank must be the opposite of effective: "flawed" or "unpromising."'
          },
          {
            technique: 'The "because" shortcut',
            description: 'In "X because Y" sentences, X and Y support each other. The blank is consistent with the other part.',
            example: '"The project failed because the team was ___. " The blank must match "failed": "incompetent" or "disorganized."'
          }
        ],
        practiceQuestions: ['q_quant_032', 'q_quant_033', 'q_quant_034', 'q_quant_035', 'q_quant_036', 'q_quant_037']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  TOPIC 17: TEXT COMPLETION - MULTI BLANK
  // ---------------------------------------------------------------------------
  {
    id: 'text-completion-multi',
    title: 'Text Completion - Multi Blank',
    description: 'Master multi-blank Text Completion questions by understanding how blanks relate to each other. Covers same-direction and opposite-direction relationships, systematic elimination, and combination testing strategies.',
    icon: '\uD83D\uDCDD\uD83D\uDCDD',
    category: 'verbal',
    lessons: [
      {
        id: 'tc-multi-relationship',
        title: 'Relationship Between Blanks',
        topicId: 'text-completion-multi',
        content: `## Overview

Multi-blank Text Completion questions have two or three blanks, each with its own set of answer choices. The key difference from single-blank questions is that the blanks are **interdependent**: the word you choose for one blank affects the possibilities for the others.

## Key Concepts

### Blank Relationships

Blanks can relate in several ways:
- **Same-direction** (both positive or both negative): signaled by *and, also, similarly*
- **Opposite-direction** (one positive, one negative): signaled by *but, however, although*
- **Cause-effect**: one blank causes or results from the other
- **Parallel/consecutive**: two blanks in a list describing the same subject

### Back-to-Back Blanks

When blanks appear consecutively \u2014 *"The ___ and ___ nature of the project"* \u2014 they likely share the same relationship to the subject. Both modify the same noun and probably work in the **same direction**.

## Important Rules

- Read the **entire passage first** to understand the overall meaning before analyzing individual blanks.
- Identify the **logical structure** of the passage (support, contrast, cause-effect).
- **Start with the most constrained blank** \u2014 the one with the strongest context clues.
- Eliminate clearly wrong words first, then test only the remaining **plausible combinations**.
- Do NOT try all possible combinations; use the relationship between blanks to narrow choices.
- Test your final combination by **reading the complete sentence** with your chosen words inserted.

> **Key Insight:** Multi-blank questions test your ability to manage multiple constraints simultaneously. Start with the blank that gives you the most information \u2014 it will constrain the others.

---`,
        objectives: [
          'Analyze the relationship between blanks in multi-blank TC questions',
          'Start with the most constrained blank to simplify the problem',
          'Use the relationship between blanks to eliminate answer choices',
          'Test combinations of words by reading the complete sentence',
          'Develop a systematic approach to multi-blank passages'
        ],
        explanation: 'Read the entire passage. Identify how blanks relate (same direction, opposite, cause-effect). Start with the most constrained blank, use it to narrow other blanks, and test final combinations.',
        keyIdeas: [
          'Blanks in multi-blank questions are interdependent',
          'Start with the blank that has the clearest context clues',
          'Identify the relationship direction between blanks (same or opposite)',
          'Eliminate clearly wrong individual words before testing combinations',
          'Reread the complete sentence with your chosen combination to verify'
        ],
        formulas: [],
        examples: [
          {
            question: 'The professor was (i)___ by the student\'s (ii)___ argument, as she had expected a more rigorous analysis.',
            solution: 'Blank (i): underwhelmed or disappointed. Blank (ii): weak or superficial.',
            explanation: '"As she had expected a more rigorous analysis" means the argument was NOT rigorous. So blank (ii) means "weak." The professor\'s reaction (i) would be negative: "disappointed" or "underwhelmed."'
          },
          {
            question: 'The new policy was both (i)___ and (ii)___, simultaneously reducing costs while improving outcomes.',
            solution: 'Blank (i): efficient. Blank (ii): effective.',
            explanation: 'The clue "reducing costs while improving outcomes" supports two positive attributes. "Efficient" relates to cost reduction; "effective" relates to improved outcomes.'
          }
        ],
        solvedExamples: [
          {
            problem: 'The scientist was (i)___ by the results, which not only confirmed her hypothesis but also revealed an (ii)___ pattern she had not anticipated. The data suggested a (iii)___ mechanism at work, one that operated on a scale she had never before considered.',
            solution: 'Blank (i): astonished/amazed (positive reaction to confirmation + unexpected finding). Blank (ii): unexpected/unforeseen (signal: "had not anticipated"). Blank (iii): novel/unprecedented (signal: "operated on a scale she had never before considered").',
            steps: [
              'Blank (i): "confirmed her hypothesis" + "had not anticipated" = surprised but pleased',
              'Blank (ii): "had not anticipated" directly tells us this means unexpected',
              'Blank (iii): "never before considered" tells us this means unprecedented',
              'Check combination: astonished by unexpected results revealing a novel mechanism'
            ],
            answer: 'astonished, unexpected, novel'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Treating each blank independently and only testing combinations at the end',
            correction: 'Blanks are connected. Use the relationship between blanks to eliminate choices early.',
            explanation: 'If two blanks are connected by "and," they must both be positive or both negative. If connected by "but," they must be opposites.'
          },
          {
            mistake: 'Choosing words that are individually plausible but do not work together',
            correction: 'After selecting individual words, read the entire sentence to ensure the combination makes logical sense.',
            explanation: 'Word A may fit blank 1 and word B may fit blank 2 individually, but together they may create a nonsensical sentence.'
          }
        ],
        shortcuts: [
          {
            technique: 'Eliminate by blank relationship',
            description: 'If the blanks are connected by "and," eliminate options where the two words have opposite connotations.',
            example: 'Blank (i) and (ii) connected by "and": eliminate if one word is positive and the other is negative.'
          },
          {
            technique: 'Contrast pairs shortcut',
            description: 'If blanks are in a "but" relationship, once you determine one blank, the other must be approximately opposite.',
            example: 'If blank (i) is "generous," blank (ii) after "but" should be something like "stingy" or "miserly."'
          }
        ],
        practiceQuestions: ['q_quant_032', 'q_quant_033', 'q_quant_034', 'q_quant_035', 'q_quant_036', 'q_quant_037']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  TOPIC 18: SENTENCE EQUIVALENCE
  // ---------------------------------------------------------------------------
  {
    id: 'sentence-equivalence',
    title: 'Sentence Equivalence',
    description: 'Learn the unique Sentence Equivalence format: selecting two words that both complete the sentence with equivalent meaning. Covers synonym strategies, trap avoidance, and meaning cluster analysis.',
    icon: '\uD83D\uDD11\uD83D\uDD11',
    category: 'verbal',
    lessons: [
      {
        id: 'se-synonym-strategy',
        title: 'Synonym Strategy and Avoiding Traps',
        topicId: 'sentence-equivalence',
        content: `## Overview

Sentence Equivalence questions present a single sentence with one blank and six answer choices. You must select **TWO answer choices** that both produce sentences that are logically complete and meaningfully similar. The two correct answers must be synonyms (or near-synonyms) **in the context of the sentence**.

## Key Concepts

### The Synonym Strategy

1. Read the sentence and identify **context clues** and **signal words**.
2. **Predict** the meaning of the blank before scanning choices.
3. Scan the six choices for **pairs of words** that match your prediction.
4. Verify that each selected word, when plugged in, creates a **logical sentence**.
5. Confirm that the two selected words produce sentences that mean **essentially the same thing**.

### Common Traps

- **False synonym pairs**: words that are synonyms in general but do not fit the context
- **Orphan words**: a word that fits the sentence but has **no viable partner** among the choices
- **Meaning mismatches**: two words that are related but **produce different meanings** in context
- **Noise pairs**: two words associated with each other but **not synonyms**

## Important Rules

- Both words must independently complete the sentence **and** produce the same overall meaning.
- Do NOT select a pair just because they are synonyms \u2014 they must **both work in the sentence**.
- Use **meaning cluster analysis**: group the six choices into meaning clusters (usually 2-3). The correct answer is one of the clusters with 2+ words.
- If 5 of 6 choices form clear pairs and one does not, the **unpaired word is likely a trap**.
- Always **test each word in the sentence independently** before confirming the pair.

> **Key Insight:** The sentence, not a thesaurus, determines the correct pair. Two words may be synonyms in general, but only one may work in the specific context due to collocation, connotation, or grammatical constraints.

---`,
        objectives: [
          'Identify the two correct answers that complete the sentence with equivalent meaning',
          'Predict the blank\'s meaning before scanning answer choices',
          'Recognize and avoid common trap pairs',
          'Verify that each selected word independently creates a logical sentence',
          'Confirm that the two sentences produced are meaningfully equivalent'
        ],
        explanation: 'Select two words that both independently complete the sentence and produce equivalent overall meaning. Predict the meaning first, find pairs that match, and verify each word works in context.',
        keyIdeas: [
          'The two correct words must be near-synonyms in the sentence\'s context',
          'Predict the blank\'s meaning before looking at choices',
          'Do not select words just because they are synonyms � both must fit the sentence',
          'Watch for trap pairs: related but different meanings, or synonyms that do not fit',
          'Read the sentence with each selected word to verify overall meaning'
        ],
        formulas: [],
        examples: [
          {
            question: 'The experiment\'s results were ___, clearly supporting the research team\'s initial hypothesis.',
            options: ['ambiguous', 'conclusive', 'unexpected', 'equivocal', 'definitive', 'surprising'],
            solution: 'conclusive and definitive',
            explanation: '"Clearly supporting the initial hypothesis" means the results left no doubt. Both "conclusive" and "definitive" express this certainty. "Ambiguous" and "equivocal" are traps � they are synonyms but mean the opposite of what the context requires.'
          },
          {
            question: 'The speaker\'s tone was ___, expressing doubt about the feasibility of the proposed plan.',
            options: ['sanguine', 'skeptical', 'optimistic', 'dubious', 'enthusiastic', 'confident'],
            solution: 'skeptical and dubious',
            explanation: '"Expressing doubt" is the clue. Both "skeptical" and "dubious" convey doubt. "Sanguine," "optimistic," "enthusiastic," and "confident" are synonyms of each other but express the opposite of doubt.'
          }
        ],
        solvedExamples: [
          {
            problem: 'The diplomat\'s response was carefully ___, avoiding any direct commitment while appearing cooperative.',
            options: ['unequivocal', 'evasive', 'candid', 'circumspect', 'noncommittal', 'forthright'],
            solution: 'The clue "avoiding any direct commitment while appearing cooperative" suggests deliberately vague or carefully worded. "Evasive" means intentionally avoiding direct answers. "Noncommittal" means not committing to a position. Both fit. "Circumspect" also means cautious, but it has a more positive connotation (careful, prudent) rather than the strategic dodging implied. The correct pair is "evasive" and "noncommittal."',
            steps: [
              'Read sentence: "avoiding any direct commitment while appearing cooperative"',
              'Predict: deliberately vague, strategically unclear',
              'Scan choices: evasive, noncommittal match this prediction',
              'Verify: "evasive response" fits; "noncommittal response" fits',
              'Confirm both produce equivalent meaning'
            ],
            answer: 'evasive and noncommittal'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Selecting two words that are exact synonyms but do not fit the sentence',
            correction: 'Always test each word in the sentence independently. The sentence, not a thesaurus, determines the correct pair.',
            explanation: 'Two words may be synonyms in general but only one may work in the specific context due to collocation, connotation, or grammatical constraints.'
          },
          {
            mistake: 'Getting distracted by a pair of words that are both related to the topic but not synonyms',
            correction: 'Look for synonym pairs, not topic-related pairs. The words must have the same meaning in context.',
            explanation: 'If the passage is about a debate, "argument" and "discussion" might seem related, but they are not synonyms in most contexts.'
          }
        ],
        shortcuts: [
          {
            technique: 'Eliminate by meaning cluster',
            description: 'Group the six choices into meaning clusters (usually 2-3 clusters). The correct answer is one of the clusters of 2+ words.',
            example: 'Choices: happy, sad, joyful, gloomy, angry, furious. Clusters: {happy, joyful}, {sad, gloomy}, {angry, furious}. Pick the cluster that matches the context.'
          },
          {
            technique: 'When stranded, look at the odd word out',
            description: 'If 5 of 6 choices form clear pairs and one does not pair with anyone, the unpaired word is likely a trap.',
            example: 'Choices: timid, bold, shy, reticent, outgoing, reserved. Pairs: {timid, shy, reticent, reserved}, {bold, outgoing}. The context determines which pair is correct.'
          }
        ],
        practiceQuestions: ['q_quant_032', 'q_quant_033', 'q_quant_034', 'q_quant_035', 'q_quant_036', 'q_quant_037']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  TOPIC 19: RC - MAIN IDEA & STRUCTURE
  // ---------------------------------------------------------------------------
  {
    id: 'rc-main-idea',
    title: 'Reading Comprehension - Main Idea and Structure',
    description: 'Develop essential reading comprehension skills: passage mapping, identifying the main idea and primary purpose, recognizing structural signal words, and eliminating wrong answer choices systematically.',
    icon: '\uD83D\uDCDA',
    category: 'verbal',
    lessons: [
      {
        id: 'rc-main-idea-passage-mapping',
        title: 'Passage Mapping and Primary Purpose',
        topicId: 'rc-main-idea',
        content: `## Overview

Reading Comprehension on the GRE tests your ability to understand, analyze, and reason about written passages. The most fundamental skill is identifying the **main idea** (also called the **primary purpose** or central theme) \u2014 the single idea that the entire passage revolves around.

## Key Concepts

### Passage Mapping

Passage mapping is a technique for tracking the structure of a passage as you read. For each paragraph, note:
- What is the paragraph\u2019s **function**? (Introduce, argue, contrast, provide evidence, conclude)
- What is the paragraph\u2019s **main point**?
- How does it **relate** to the previous paragraph? (Support, contrast, extend)

A typical passage map:
- P1: Introduces topic X and presents traditional view
- P2: Author challenges traditional view with evidence
- P3: Author offers alternative explanation
- P4: Concludes with implications

### Primary Purpose Questions

The primary purpose must encompass the **ENTIRE passage**, not just part of it. Correct answers use active verbs like: *argue, challenge, propose, discuss, examine, critique, defend, compare*. Wrong answers are often: too specific (only one paragraph), too broad (beyond scope), or contradict the passage.

### Structural Signal Words

- **Contrast**: however, but, yet, nevertheless, on the other hand
- **Support**: for example, for instance, specifically, in particular
- **Extension**: furthermore, moreover, in addition, also
- **Conclusion**: therefore, thus, consequently, hence, in conclusion
- **Author\u2019s opinion**: unfortunately, surprisingly, importantly, notably

## Important Rules

- The main idea is **NOT necessarily the first sentence** \u2014 it is the central claim uniting all paragraphs.
- When reading actively, ask: *"Why is the author telling me this?"* and *"How does this sentence support the main idea?"*
- The primary purpose answer must cover the **whole passage**, not just a single paragraph.
- Distinguish the **topic** (what the passage is about) from the **main idea** (what the author says about it).
- Check the **first and last sentences** of the passage first \u2014 the main idea often appears there.

> **Key Insight:** Passage mapping turns passive reading into active analysis. By labeling each paragraph\u2019s function, you build the mental map you need to answer both main idea and structure questions correctly.

---`,
        objectives: [
          'Identify the main idea or primary purpose of any RC passage',
          'Create a passage map showing the function and relationship of each paragraph',
          'Distinguish the main idea from supporting details and examples',
          'Use signal words to identify passage structure',
          'Eliminate wrong answer choices that are too broad, too specific, or contradictory'
        ],
        explanation: 'The main idea is the central claim uniting the entire passage. Passage mapping tracks each paragraph\'s function. Primary purpose answers use active verbs (challenge, propose, examine) and must cover the whole passage.',
        keyIdeas: [
          'Every passage has ONE main idea that all parts serve',
          'Passage maps: label each paragraph\'s function and relationship',
          'Primary purpose must cover the ENTIRE passage',
          'Signal words (however, therefore, for example) reveal structural relationships',
          'Wrong answers are often too narrow, too broad, or opposite to the passage'
        ],
        formulas: [],
        examples: [
          {
            question: 'Passage: Two paragraphs. P1 discusses traditional economic theories about market efficiency. P2 presents recent studies that challenge these theories with evidence of behavioral biases.',
            solution: 'The primary purpose is to "challenge traditional economic theories using behavioral evidence" or "discuss how behavioral economics challenges classical assumptions."',
            explanation: 'The passage moves from stating the traditional view to challenging it. Both paragraphs are needed � P1 sets up what is being challenged, P2 provides the challenge.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Passage: "Historians have long argued that the Industrial Revolution led to improved living standards. However, recent scholarship suggests this view is overly simplistic. While wages did increase, housing conditions deteriorated, and pollution created new health crises. Moreover, the benefits were distributed extremely unevenly, with factory owners accumulating vast wealth while workers faced precarious employment."\n\nWhat is the primary purpose of the passage?',
            solution: 'The passage challenges a traditional view. It starts with what "historians have long argued," then uses "however" to introduce a counterargument with specific evidence. The primary purpose is to "challenge the conventional view that the Industrial Revolution uniformly improved living standards."',
            steps: [
              'Identify the traditional view: "Industrial Revolution led to improved living standards"',
              'Notice the contrast signal: "However"',
              'Identify the evidence that follows: wages increased BUT housing deteriorated, pollution created health crises, benefits were uneven',
              'Synthesize: the passage argues the traditional view is too simplistic',
              'Select the answer: "Challenge a prevailing historical interpretation"'
            ],
            answer: 'Challenge the conventional view about the Industrial Revolution\'s impact on living standards'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Choosing an answer that describes only the first paragraph',
            correction: 'The primary purpose must account for the entire passage, not just the introduction.',
            explanation: 'If the first paragraph describes a theory and the second challenges it, the purpose is to challenge the theory, not just to describe it.'
          },
          {
            mistake: 'Confusing the topic with the main idea',
            correction: 'The topic is what the passage is about (e.g., "the Industrial Revolution"). The main idea is what the author says about it (e.g., "its effects were more complex than traditionally thought").',
            explanation: 'Answers that just state the topic ("discusses the Industrial Revolution") are too broad. The main idea requires the author\'s specific claim.'
          }
        ],
        shortcuts: [
          {
            technique: 'First and last sentence check',
            description: 'The main idea often appears in the first paragraph (thesis) or the last paragraph (conclusion). Check these locations first.',
            example: 'If the first sentence says "Commonly believed X is actually false," the main idea is likely challenging X.'
          },
          {
            technique: 'Signal word focus',
            description: 'Words like "however," "but," "yet," "therefore" often precede the author\'s main point. Focus on sentences following these signals.',
            example: 'After "However," the author usually presents their own view or evidence that challenges what came before.'
          }
        ],
        practiceQuestions: ['q_quant_040', 'q_quant_041', 'q_quant_119', 'q_quant_120', 'q_quant_122', 'q_quant_123']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  TOPIC 20: RC - INFERENCE & DETAIL
  // ---------------------------------------------------------------------------
  {
    id: 'rc-inference-detail',
    title: 'Reading Comprehension - Inference and Detail',
    description: 'Distinguish between explicit details and logical inferences in RC passages. Covers the "must be true" test for inference questions and efficient strategies for locating supporting evidence.',
    icon: '\uD83D\uDD0D',
    category: 'verbal',
    lessons: [
      {
        id: 'rc-inference-strategies',
        title: 'Inference Strategies and Detail Questions',
        topicId: 'rc-inference-detail',
        content: `## Overview

Reading Comprehension questions test two distinct skill sets: finding **explicit details** (information directly stated) and making **logical inferences** (information implied but not directly stated). Mastering both is essential for RC success.

## Key Concepts

### Detail Questions

Detail questions ask about information directly stated in the passage. Strategy:
- Locate the relevant part using **keywords** from the question
- Read the **surrounding context** carefully
- Match the answer choice to the **passage content** exactly
- Watch for **trap answers** that use the same words but change the meaning

### Inference Questions

Inference questions require you to understand what **MUST be true** based on the passage. Strategy:
- Identify what the passage **explicitly says**
- Determine what **logically follows** from that information
- The correct inference is **strongly supported** by the text
- The correct inference does **NOT contradict** anything in the text

Apply the **"must be true" test**: ask "Does this HAVE to be true based on the passage?" If it could be false, it is not a valid inference.

### Supporting Evidence Questions

These are **reverse detail questions**: you are given a claim and must find the part of the passage that best supports it.

## Important Rules

- A **detail** is directly stated; an **inference** is logically derived from the text.
- If an answer choice contains **new information not connected** to the passage, it is wrong.
- The GRE RC inference is **very conservative** \u2014 the best inference requires the **smallest logical leap** from the text.
- Common wrong answer types: **too extreme** (absolute words like *always, never*), **out of scope**, **reverse logic**, **overly specific**.
- If you find yourself making a **big logical leap**, you have probably gone too far.

> **Key Insight:** The correct inference equals the passage content plus exactly one logical step. If you need two or more steps, the answer is probably wrong.

---`,
        objectives: [
          'Distinguish between detail questions (explicitly stated) and inference questions (implicitly suggested)',
          'Locate specific details in the passage efficiently using keywords',
          'Make valid inferences that are strongly supported by the text',
          'Apply the "must be true" test to evaluate inference answer choices',
          'Identify and eliminate wrong answer types for inference questions'
        ],
        explanation: 'Detail questions test information directly stated in the passage. Inference questions test what logically follows. Use the "must be true" test: a valid inference is necessarily true given the passage. Avoid leaps beyond what the text supports.',
        keyIdeas: [
          'Details are explicitly stated; inferences are logically derived',
          'Use keywords to locate relevant sections of the passage quickly',
          'For inference questions, ask "must this be true?"',
          'Eliminate answers that are extreme, out of scope, or reverse logic',
          'The best inference requires the smallest logical leap from the text'
        ],
        formulas: [],
        examples: [
          {
            question: 'Passage states: "Caffeine consumption has been linked to increased alertness, though studies show this effect diminishes with regular use." Which of the following can be inferred?',
            solution: 'Regular caffeine users may not experience the same level of alertness boost as occasional users.',
            explanation: 'The passage explicitly states the effect "diminishes with regular use." The inference that regular users get less benefit is directly supported � it is almost a restatement.'
          },
          {
            question: 'Passage: "The island\'s native bird population declined sharply after the introduction of predatory mammals." Which detail is stated?',
            solution: 'The decline followed the introduction of predatory mammals.',
            explanation: 'This is directly stated. No inference needed. The question tests whether you can locate and paraphrase a specific detail.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Passage: "While the artist\'s early work was largely ignored by critics, her later paintings commanded record prices at auction. Some scholars attribute this shift to changing tastes in the art world, while others point to her evolving technique."\n\nWhich of the following can be inferred about the artist\'s early work?',
            solution: 'The passage says early work was "largely ignored by critics." We can infer the early work was not commercially successful because if it were successful, it would likely not be ignored. However, the passage does not explicitly say commercial outcome. The safest inference: "The early work did not receive significant critical attention."',
            steps: [
              'Find the relevant text: "early work was largely ignored by critics"',
              'Identify what is directly said: critics ignored early work',
              'Consider what follows: later work "commanded record prices"',
              'Safe inference: early work did NOT command record prices',
              'Most conservative inference: early work lacked critical recognition'
            ],
            answer: 'The artist\'s early work did not receive significant critical acclaim'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Choosing an answer that requires too many assumptions',
            correction: 'The correct inference should require minimal logical steps from the text. Each additional assumption reduces the likelihood of correctness.',
            explanation: 'If you find yourself thinking "A, so B, so C, therefore D," you have gone too far. The GRE rewards conservative, well-supported inferences.'
          },
          {
            mistake: 'Confusing what the author says with what the author cites others as saying',
            correction: 'Attribute claims correctly. The author may present a view without endorsing it.',
            explanation: 'If the passage says "Some critics argue X," the author is not necessarily agreeing with X. An inference that the author believes X would be unsupported.'
          }
        ],
        shortcuts: [
          {
            technique: 'Detail location scanning',
            description: 'Scan the passage for keywords from the question (names, dates, technical terms). Read the surrounding 2-3 sentences carefully.',
            example: 'If the question mentions "photosynthesis," find that word in the passage and read the sentences around it.'
          },
          {
            technique: 'Inference = passage + one logical step',
            description: 'A valid inference is the passage content plus exactly one logical step. If you need two or more steps, it is probably wrong.',
            example: 'Passage says "X causes Y." Inference: "if X increases, Y likely increases." This is one step.'
          }
        ],
        practiceQuestions: ['q_quant_040', 'q_quant_041', 'q_quant_119', 'q_quant_120', 'q_quant_122', 'q_quant_123']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  TOPIC 21: RC - TONE & STYLE
  // ---------------------------------------------------------------------------
  {
    id: 'rc-tone-style',
    title: 'Reading Comprehension - Tone and Style',
    description: 'Analyze the author\'s attitude, tone, and use of rhetorical devices in RC passages. Covers identifying positive/negative/neutral language, literary devices, and determining the function of specific sentences.',
    icon: '\uD83C\uDFA8',
    category: 'verbal',
    lessons: [
      {
        id: 'rc-tone-author-attitude',
        title: 'Author\'s Attitude and Rhetorical Strategies',
        topicId: 'rc-tone-style',
        content: `## Overview

Tone and style questions on the GRE ask about the **author\u2019s attitude**, the **tone of the passage**, or the **rhetorical function** of specific elements. These questions test your ability to read between the lines and analyze how language conveys meaning beyond the literal level.

## Key Concepts

### Author\u2019s Attitude

The author\u2019s attitude can be positive, negative, or neutral. But the GRE tests nuanced distinctions:
- **Approving vs. enthusiastic** (intensity differences)
- **Critical vs. dismissive** (different types of negativity)
- **Skeptical vs. neutral** (degree of certainty)
- **Objective vs. subjective** (presence of personal judgment)

### Signal Words for Tone

- **Positive**: fortunately, remarkably, importantly, notably, groundbreaking
- **Negative**: unfortunately, regrettably, problematic, flawed, misguided
- **Neutral/Objective**: indicates, suggests, reports, describes, notes
- **Skeptical**: questionable, dubious, unsubstantiated, speculative

### Literary and Rhetorical Devices

- **Analogy**: comparing two things to explain or persuade
- **Metaphor**: figurative comparison without "like" or "as"
- **Hyperbole**: exaggeration for effect
- **Understatement**: presenting something as less important than it is
- **Irony**: saying the opposite of what is meant
- **Rhetorical question**: question asked for effect, not answer

### Determining Function

To determine the function of a sentence or paragraph: locate the element, read surrounding context, and ask why the author included it. Is it evidence for a claim? A counterargument? An illustration? Look for structural signal words that indicate function.

## Important Rules

- Consider the **cumulative effect** of word choices throughout the passage, not just one strong word.
- A single strong word ("disastrous") may indicate a negative tone, but the surrounding passage may be balanced.
- Distinguish between what the **author says** and what the **author cites others as saying**.
- Moderate words like "problematic" suggest criticism but not the strong negativity of words like "disastrous."
- If the passage starts with "While X is true, Y is problematic," the overall tone is determined by the **second part** (after the concession).

> **Key Insight:** Tone on the GRE is rarely purely positive or negative \u2014 it is often nuanced, qualified, or mixed. The best approach is to analyze the ratio of positive to negative language throughout the passage.

---`,
        objectives: [
          'Identify the author\'s attitude toward the subject (positive, negative, neutral, skeptical)',
          'Recognize the tone of a passage through word choice analysis',
          'Identify common literary and rhetorical devices',
          'Determine the rhetorical function of specific sentences or paragraphs',
          'Distinguish between the author\'s views and views the author cites'
        ],
        explanation: 'Tone is conveyed through word choice and rhetorical devices. Author attitude ranges from supportive to critical to neutral. Each sentence serves a specific function (evidence, counterargument, illustration). Context determines function.',
        keyIdeas: [
          'Author attitude is revealed through positive/negative/neutral word choices',
          'Tone questions require holistically assessing the entire passage',
          'Literary devices: analogy, metaphor, irony, rhetorical questions',
          'Every sentence serves a purpose: support, contrast, illustrate, concede',
          'Distinguish the author\'s opinion from opinions the author reports'
        ],
        formulas: [],
        examples: [
          {
            question: 'Passage uses phrases like "purportedly groundbreaking," "questionable methodology," and "overstated claims." What is the author\'s attitude?',
            solution: 'The author is critical or skeptical.',
            explanation: '"Purportedly" casts doubt. "Questionable methodology" directly criticizes. "Overstated claims" suggests exaggeration. The cumulative effect is clearly critical.'
          },
          {
            question: 'Passage: "While the theory has its proponents, it fails to account for several key observations." The phrase "fails to account" primarily serves to:',
            solution: 'Introduce a criticism or limitation of the theory.',
            explanation: '"While" concedes something positive (it has proponents), but the main clause introduces a weakness. The function is to present a counterpoint or limitation.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Passage: "The study\'s conclusions, while intriguing, rest on a surprisingly small sample. Moreover, the researchers failed to control for socioeconomic variables that could easily account for the observed differences. One might reasonably ask whether the dramatic headlines that greeted this study were entirely warranted."\n\nThe tone of the passage can best be described as:',
            solution: 'The tone is skeptical. The author acknowledges the study is "intriguing" but immediately criticizes it ("surprisingly small sample," "failed to control for"). The rhetorical question ("one might reasonably ask") is a polite way of saying the conclusions are overblown. The overall attitude is skeptical � the author doubts the study fully merits the attention it received.',
            steps: [
              'Identify positive language: "intriguing"',
              'Identify negative language: "surprisingly small," "failed to control"',
              'Analyze the rhetorical question: suggests headlines were not warranted',
              'Balance: the positive is quickly dismissed; the dominant tone is critical',
              'Conclusion: skeptical is the best description'
            ],
            answer: 'Skeptical'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Confusing a neutral presentation of opposing views with endorsement of one side',
            correction: 'If the author presents both sides without indicating preference, the tone is objective/neutral, not approving or critical.',
            explanation: 'A balanced discussion of a debate is not the same as the author agreeing with one side. Look for evaluative language to determine the author\'s stance.'
          },
          {
            mistake: 'Over-interpreting mild criticism as harsh rejection',
            correction: 'Moderate words like "problematic" suggest criticism but not the strong negativity of words like "disastrous" or "catastrophic."',
            explanation: 'The GRE tests nuanced tone distinctions. "Questionable" is weaker than "false"; "problematic" is weaker than "devastating."'
          }
        ],
        shortcuts: [
          {
            technique: 'Adjective frequency analysis',
            description: 'The ratio of positive to negative adjectives in the passage is the strongest indicator of tone. Count qualitative adjectives.',
            example: 'If a passage uses 5 negative adjectives and 1 positive, the tone is predominantly critical.'
          },
          {
            technique: 'Concession check',
            description: 'If the author starts with "While X is true, Y is problematic," the overall tone is determined by the second part (after the concession).',
            example: '"While interesting, this approach is fundamentally flawed" = overall critical tone.'
          }
        ],
        practiceQuestions: ['q_quant_040', 'q_quant_041', 'q_quant_119', 'q_quant_120', 'q_quant_122', 'q_quant_123']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  TOPIC 22: CRITICAL REASONING
  // ---------------------------------------------------------------------------
  {
    id: 'critical-reasoning',
    title: 'Critical Reasoning',
    description: 'Master Critical Reasoning by learning to identify assumptions, strengthen or weaken arguments, resolve paradoxes, and analyze boldface structures. These logic-based questions are a core part of the GRE Verbal section.',
    icon: '\uD83E\uDDEA',
    category: 'verbal',
    lessons: [
      {
        id: 'cr-assumptions-strengthen-weaken',
        title: 'Assumptions, Strengthen, and Weaken',
        topicId: 'critical-reasoning',
        content: `## Overview

Critical Reasoning questions present a short argument and ask you to analyze its logical structure. The most common types are **Assumption**, **Strengthen**, **Weaken**, **Paradox**, and **Boldface** questions. Master these by learning to identify the core components of any argument and how they relate to each other.

## Key Concepts

### Argument Structure

Every argument has a **conclusion** (the main point) and **premises** (evidence supporting it). The gap between premises and conclusion is the **assumption** \u2014 an unstated premise that must be true for the argument to hold.

To find assumptions, ask: *"What must be true for this conclusion to follow from these premises?"*

### Strengthen and Weaken

**Strengthen questions**: choose an answer that makes the argument more convincing by providing additional evidence, eliminating an alternative explanation, or confirming a key assumption.

**Weaken questions**: choose an answer that undermines the argument by providing evidence the conclusion is false, introducing an alternative explanation, showing the assumption is false, or revealing a flaw in the reasoning.

### Paradox Questions

Paradox questions present a seeming contradiction. The correct answer shows how both **seemingly conflicting facts can be true simultaneously**. The answer does NOT eliminate either fact \u2014 it reconciles them.

### Boldface Questions

Boldface questions ask about the **function** of specific sentences. Identify whether each bolded portion is a premise, conclusion, counterargument, or evidence. Use signal words: *therefore* (conclusion), *because* (premise), *however* (counterpoint).

## Important Rules

- Identify the argument\u2019s **core**: conclusion + key premise + assumption.
- For strengthen/weaken, consider what would make the assumption **more or less likely** to be true.
- Apply the **negation test** for assumptions: negate the suspected assumption. If the negated statement destroys the argument, it is a necessary assumption.
- For paradox questions, find an answer that explains why **both** facts are true \u2014 do not deny either fact.
- For boldface questions, use signal words to identify the logical function of each sentence.

> **Key Insight:** Every Critical Reasoning question comes down to identifying the logical relationship between premises and conclusion. Once you find the assumption, you can strengthen it, weaken it, or recognize its function in the argument.

---`,
        objectives: [
          'Identify the conclusion, premises, and assumptions in an argument',
          'Select answers that strengthen arguments by supporting assumptions or providing evidence',
          'Select answers that weaken arguments by challenging assumptions or providing counterexamples',
          'Resolve paradoxes by finding explanations that reconcile conflicting facts',
          'Identify the logical function of boldfaced sentences in arguments'
        ],
        explanation: 'Every argument has premises + conclusion. The assumption fills the gap between them. Strengthen = support assumption. Weaken = challenge assumption. Paradox = reconcile conflicting facts. Boldface = identify logical function.',
        keyIdeas: [
          'Assumptions are unstated premises necessary for the argument to hold',
          'Strengthen: support the assumption or provide additional evidence',
          'Weaken: challenge the assumption or provide a counterexample',
          'Paradox resolution: show how both conflicting facts are simultaneously true',
          'Boldface: identify whether each portion is premise, conclusion, or counterargument'
        ],
        formulas: [],
        examples: [
          {
            question: 'Argument: "The new drug reduced symptoms in 80% of trial participants. Therefore, it is an effective treatment." What is the assumption?',
            solution: 'The assumption is that the trial participants are representative of the broader population and that the reduction was clinically meaningful.',
            explanation: 'The argument assumes that results from the trial apply to the general population. It also assumes that 80% symptom reduction constitutes "effective."'
          },
          {
            question: 'Argument: "Our city\'s recycling program has increased recycling rates by 30%. Therefore, the program is a success." Which of the following would weaken this argument?',
            solution: 'An answer that says "The increased rates are due to a new state law requiring recycling, not the city program" would weaken the argument by offering an alternative explanation.',
            explanation: 'The argument assumes the city program caused the increase. Showing an alternative cause weakens the causal claim.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Argument: "Employees who take regular breaks are more productive than those who do not. Therefore, companies should mandate regular breaks for all employees."\n\nWhich of the following, if true, most strengthens the argument?',
            solution: 'To strengthen, we support the assumption that mandated breaks would produce the same effect as voluntary breaks and that increased productivity would benefit the company. A strong answer: "Studies show that even when breaks are mandatory, productivity gains are similar to those observed in voluntary-break situations."',
            steps: [
              'Identify conclusion: "Companies should mandate regular breaks"',
              'Identify premise: "Those who take breaks are more productive"',
              'Identify assumption: Mandatory breaks would have the same effect',
              'Find answer that supports this assumption',
              'Correct answer confirms mandatory breaks work similarly'
            ],
            answer: 'Studies show mandatory breaks produce comparable productivity gains'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Choosing a strengthener that actually weakens the argument or is irrelevant',
            correction: 'Ask: "Does this answer make the conclusion more likely to be true?" If no, it is not a strengthener.',
            explanation: 'Some answers seem related to the topic but do not actually affect the logical validity of the argument.'
          },
          {
            mistake: 'In paradox questions, choosing an answer that eliminates one of the conflicting facts',
            correction: 'The correct answer explains why both facts are true � it does not deny either fact.',
            explanation: 'A paradox resolution acknowledges both facts and shows how they can coexist. Denying one fact creates a different problem.'
          }
        ],
        shortcuts: [
          {
            technique: 'Negation test for assumptions',
            description: 'To test if something is a necessary assumption, negate it. If the negated statement destroys the argument, it is a necessary assumption.',
            example: 'Argument: "All observed swans are white, so all swans are white." Negate assumption: "The observed swans are NOT representative." This destroys the argument.'
          },
          {
            technique: 'Boldface function keywords',
            description: '"Therefore, thus, hence" introduce the conclusion. "Because, since, for" introduce premises. "However, but, yet" introduce counterarguments.',
            example: 'First boldface: "However, some critics argue..." = counterargument. Second boldface: "Therefore, the original theory is flawed" = conclusion.'
          }
        ],
        practiceQuestions: ['q_quant_043', 'q_quant_046', 'q_quant_127', 'q_quant_129', 'q_quant_130', 'q_quant_131']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  TOPIC 23: VOCABULARY IN CONTEXT
  // ---------------------------------------------------------------------------
  {
    id: 'vocabulary-context',
    title: 'Vocabulary in Context',
    description: 'Build GRE vocabulary strategically by learning common Latin and Greek roots, prefixes, and suffixes. Covers using context clues to deduce word meanings and recognizing high-frequency GRE vocabulary.',
    icon: '\uD83D\uDCD6',
    category: 'verbal',
    lessons: [
      {
        id: 'vocab-roots-affixes',
        title: 'Word Roots, Prefixes, and Suffixes',
        topicId: 'vocabulary-context',
        content: `## Overview

Building a strong GRE vocabulary is about **understanding word structure**, not memorizing lists. Most GRE words are built from **Latin and Greek roots**, **prefixes**, and **suffixes**. Learning these building blocks allows you to deduce the meaning of unfamiliar words on test day.

## Key Concepts

### Prefixes Indicating Negation

- **un-** : not (unprecedented, unorthodox)
- **in-/im-/il-/ir-** : not (inconsequential, impeccable, illegal, irrefutable)
- **dis-** : not, opposite (disparate, disingenuous)
- **a-/an-** : without (amoral, anomalous)
- **anti-** : against (antithesis, antipathy)
- **contra-/counter-** : against (contradict, counterpart)

### Prefixes Indicating Direction

- **pre-** : before (precede, predict, preclude)
- **post-** : after (postpone, posthumous)
- **pro-** : forward, for (promote, proponent)
- **re-** : again, back (reiterate, relegate)
- **sub-** : under (subordinate, subjugate)
- **super-/supra-** : above (superficial, supramental)
- **trans-** : across (transcend, transient)
- **inter-** : between (intermittent, intervene)

### Common Roots

- **bene-** : good (benefactor, benevolent, benign)
- **mal-** : bad (malevolent, malicious, malpractice)
- **dic-/dict-** : say (diction, predict, contradict)
- **duc-/duct-** : lead (deduce, conduct, induce)
- **graph-/gram-** : write (graphic, epigram, grammar)
- **log-/logue-** : word, speech (monologue, eulogy, logic)
- **magn-** : great (magnanimous, magnate, magnitude)
- **path-** : feeling (apathy, empathy, antipathy)
- **spec-/spect-** : look (inspect, circumspect, perspective)
- **voc-/vok-** : call (vociferous, evoke, provocative)

### Context Clues for Vocabulary

When encountering an unfamiliar word, examine: the **surrounding words and phrases**, **signal words** indicating relationship to known ideas, the word\u2019s **part of speech**, and any **examples or definitions** provided nearby.

## Important Rules

- Combine **root knowledge** with **context analysis** for the best results.
- Break down unfamiliar words into their component parts: prefix + root + suffix.
- If you do not know a word, use the context to infer whether it has a **positive or negative connotation** \u2014 this alone can eliminate wrong answers.
- Learn one root and you learn **multiple words**: the root *spec* (look) gives inspect, circumspect, perspective, retrospective, spectacle, spectator, speculate.
- Focus on **high-frequency academic words** that appear across multiple passages: *ambiguous, empirical, hypothesis, paradigm, synthesis, validate*.

> **Key Insight:** A word like "circumspect" can be broken down: circum- (around) + spect (look) = looking around = cautious, prudent. Combined with context, you can deduce the meaning without ever having memorized the word.

---`,
        objectives: [
          'Break down unfamiliar words into prefixes, roots, and suffixes',
          'Use knowledge of common Latin and Greek roots to deduce word meanings',
          'Apply context clues to determine the meaning of unfamiliar words',
          'Recognize high-frequency GRE vocabulary words in reading passages',
          'Build a systematic approach to vocabulary acquisition'
        ],
        explanation: 'Most GRE words are built from Latin/Greek roots, prefixes, and suffixes. Breaking down words into components reveals meaning. Context clues in surrounding text provide additional support. Combine both strategies for best results.',
        keyIdeas: [
          'Prefixes often indicate negation (un-, in-, dis-) or direction (pre-, post-, sub-)',
          'Roots carry the core meaning: bene (good), mal (bad), dict (say), spec (look)',
          'Suffixes determine part of speech: -tion (noun), -ous (adjective), -ly (adverb)',
          'Context clues: look at surrounding words, signal words, and examples',
          'Combine root analysis with context clues for accurate word meaning'
        ],
        formulas: [],
        examples: [
          {
            question: 'Using root analysis, what does "benevolent" mean?',
            solution: 'Bene (good) + volent (wishing) = well-wishing, kindly, generous.',
            explanation: 'The root "bene" means good. The -volent comes from Latin "volo" meaning to wish. So benevolent literally means "wishing good."'
          },
          {
            question: 'Context: "The speaker\'s peripatetic career took him to over fifty countries across six continents." What does "peripatetic" mean?',
            solution: 'Traveling from place to place, itinerant.',
            explanation: 'The context clue "took him to over fifty countries" indicates constant travel and movement. Peripatetic means traveling or wandering.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Using prefixes and roots, determine the meaning of "antithesis."',
            solution: 'Anti- = against. Thesis = proposition/idea. Antithesis = the direct opposite, a contrast or opposition between two things.',
            steps: [
              'Identify prefix: anti- = against',
              'Identify root: thesis = proposition, idea, or statement',
              'Combine: against + proposition = opposite idea',
              'Verify with context: "Freedom is the antithesis of captivity"'
            ],
            answer: 'The direct opposite; a contrast or opposition'
          },
          {
            problem: 'Context: "The witness gave a desultory account, jumping between events without any clear chronology." What does "desultory" mean?',
            solution: 'The clue "jumping between events without any clear chronology" suggests something lacking a plan, purpose, or sequence. Desultory means jumping from one thing to another, unmethodical, random.',
            steps: [
              'Identify context clue: "jumping between events without clear chronology"',
              'Recognize the lack of structure or order',
              'Possible meanings: random, disconnected, aimless',
              'Confirm: desultory = lacking consistency or orderly sequence'
            ],
            answer: 'Lacking a plan, purpose, or enthusiasm; random and disconnected'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Assuming a word has the same meaning as a similar-looking English word (false cognate)',
            correction: 'Check the actual definition rather than assuming based on similar words. "Enervate" looks like "energize" but means to weaken or drain energy.',
            explanation: 'False cognates are especially dangerous. "Enervate" resembles "energize" but means the opposite � to weaken, to drain of energy.'
          },
          {
            mistake: 'Ignoring context when you "know" a word\'s definition',
            correction: 'Always check the context to confirm the specific meaning. Many GRE words have multiple meanings.',
            explanation: '"Qualify" can mean "to meet requirements" OR "to limit/modify a statement." Context determines which meaning applies.'
          }
        ],
        shortcuts: [
          {
            technique: 'Root families',
            description: 'Learn one root and you learn multiple words. The root "spec" (look) gives: inspect, circumspect, perspective, retrospective, spectacle, spectator, speculate.',
            example: 'All "spec" words involve looking or observing in some way.'
          },
          {
            technique: 'Context replacement test',
            description: 'Replace the unfamiliar word with a known word that fits the context. If the sentence still makes sense, you have likely identified the correct meaning.',
            example: '"The ___ man donated millions to charity." Try "generous": it fits. The actual word "magnanimous" = generous/forgiving, which also fits.'
          }
        ],
        practiceQuestions: ['q_quant_043', 'q_quant_046', 'q_quant_127', 'q_quant_129', 'q_quant_130', 'q_quant_131']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  WRITING � 2 Topics
  // ---------------------------------------------------------------------------
  {
    id: 'issue-essay',
    title: 'Issue Essay',
    description: 'Master the GRE Issue Essay: analyzing prompts, crafting a clear thesis, structuring a 5-paragraph essay, using the PEA (Point-Evidence-Analysis) method, and addressing counterarguments for a higher score.',
    icon: '\u270D\uFE0F',
    category: 'writing',
    lessons: [
      {
        id: 'issue-essay-strategy',
        title: 'Issue Essay: Prompts, Thesis, and Structure',
        topicId: 'issue-essay',
        content: `## Overview

The GRE Issue Essay (Analyze an Issue) requires you to take a position on a given prompt and support it with reasoning and examples. You have **30 minutes**. The essay is scored on a **6-point scale**. Your task is not to find the "right" answer but to present a **well-reasoned argument**.

## Key Concepts

### Understanding the Prompt

Issue prompts are statements about complex topics \u2014 education, technology, government, society, ethics. They follow patterns like: *"Governments should prioritize economic growth over environmental protection"* or *"The primary purpose of education should be to prepare students for careers."*

### Crafting a Thesis

Your thesis must take a **clear position**: agree, disagree, or a **qualified position** (often the strongest). A qualified thesis acknowledges the other side: *"While economic growth is important, it cannot come at the expense of environmental sustainability."* Place your thesis at the **end of your introduction**.

### Essay Structure (5 Paragraphs)

1. **Introduction**: Hook + context + thesis statement
2. **Body 1**: First supporting point + evidence + analysis
3. **Body 2**: Second supporting point + evidence + analysis
4. **Body 3**: Address counterargument or provide additional support
5. **Conclusion**: Restate thesis + summarize main points + broader implications

Each body paragraph follows the **PEA structure**:
- **Point**: Topic sentence stating the paragraph\u2019s main idea
- **Evidence**: Specific example, data, or reasoning
- **Analysis**: Explain HOW the evidence supports your thesis

## Important Rules

- Use the **PEA method** (Point-Evidence-Analysis) for every body paragraph.
- **Acknowledge counterarguments**: addressing the opposing view shows critical thinking.
- Use strong evidence: **historical examples, current events, literature, scientific studies**. Quality over quantity.
- **Avoid**: first-person statements ("I think," "I believe"), overly emotional language, unsupported generalizations.
- Manage your 30 minutes: **5 minutes plan**, **20 minutes write**, **5 minutes revise**.
- Write in a **formal, academic style**.

> **Key Insight:** The GRE Issue Essay is not about being right \u2014 it is about demonstrating clear, logical, and persuasive writing. A qualified thesis with well-analyzed evidence earns higher scores than a strong opinion with weak support.

---`,
        objectives: [
          'Analyze Issue prompts and develop a clear, arguable thesis',
          'Structure a five-paragraph essay with introduction, body, and conclusion',
          'Use the PEA (Point-Evidence-Analysis) method in body paragraphs',
          'Address counterarguments to strengthen the essay',
          'Manage time effectively across planning, writing, and revision'
        ],
        explanation: 'The Issue Essay requires taking a position on a prompt and supporting it with evidence. Use a 5-paragraph structure: introduction with thesis, 3 body paragraphs (PEA), and conclusion. Address counterarguments for a higher score.',
        keyIdeas: [
          'Take a clear position: agree, disagree, or qualified stance',
          'Use the PEA structure: Point, Evidence, Analysis',
          'Address counterarguments to demonstrate critical thinking',
          'Use specific, relevant examples as evidence',
          'Manage 30 minutes: 5 plan, 20 write, 5 revise'
        ],
        formulas: [],
        examples: [
          {
            question: 'Issue Prompt: "The best way to understand a society is through its artistic expression rather than through its political institutions."',
            solution: 'Thesis: "While political institutions reveal a society\'s structure and governance, artistic expression provides a deeper understanding of its values, struggles, and aspirations, making art an equally if not more valuable lens for understanding a society."',
            explanation: 'This thesis takes a qualified position that acknowledges both sides but leans toward the prompt\'s claim. It is specific, arguable, and provides a roadmap for the essay.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Issue Prompt: "Educational institutions should prioritize teaching practical skills over theoretical knowledge."\n\nWrite an outline for this essay.',
            solution: 'Thesis: "While practical skills are essential for career readiness, a complete education must balance practical training with theoretical knowledge to develop adaptable, critical thinkers."\n\nOutline:\nP1 (Intro): Hook about rapid workplace changes, context about education debate, thesis.\nP2 (Body 1): Practical skills are immediately valuable. Evidence: vocational training programs, internship success rates.\nP3 (Body 2): Theoretical knowledge builds adaptability. Evidence: liberal arts graduates\' career switching success.\nP4 (Body 3): Counterargument: Some argue time constraints force choices. Rebuttal: Integrated approaches exist (co-op programs, project-based learning).\nP5 (Conclusion): Restate balanced thesis, broader implications for workforce and society.',
            steps: [
              'Analyze prompt: practical vs. theoretical',
              'Develop qualified thesis: both are important',
              'Plan body 1: strength of practical skills',
              'Plan body 2: strength of theoretical knowledge',
              'Plan body 3: counterargument and rebuttal',
              'Plan conclusion: synthesis and implications'
            ],
            answer: 'Thesis: Education must balance practical and theoretical learning.'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Writing a thesis that is too vague or obvious ("There are good arguments on both sides.")',
            correction: 'Take a specific, arguable position. A qualified position is fine as long as it is clear where you stand.',
            explanation: 'A thesis that merely states both sides exist does not provide a clear argument. The reader should know your position from the thesis statement.'
          },
          {
            mistake: 'Using examples without explaining how they support the thesis',
            correction: 'After presenting an example, explicitly connect it back to your thesis. Explain WHY and HOW it supports your argument.',
            explanation: 'Evidence without analysis is just a list. The analysis is what demonstrates your reasoning ability and earns points.'
          }
        ],
        shortcuts: [
          {
            technique: 'Pre-writing template',
            description: 'Before writing, sketch a quick outline: thesis, 3 main points, counterargument. This saves time and ensures structure.',
            example: 'Thesis: qualified position. P2: first reason + example. P3: second reason + example. P4: counterargument + rebuttal. P5: conclusion.'
          },
          {
            technique: 'Example bank',
            description: 'Prepare 3-4 versatile examples (historical, literary, current events, personal) before test day. Adapt them to the prompt during the essay.',
            example: 'Example: The Industrial Revolution can illustrate economic progress, social costs, technological innovation, or regulatory responses depending on the prompt.'
          }
        ],
        practiceQuestions: ['q_quant_047', 'q_quant_048', 'q_quant_049', 'q_quant_050', 'q_quant_137', 'q_quant_138']
      }
    ]
  },
  // ---------------------------------------------------------------------------
  //  TOPIC 25: ARGUMENT ESSAY
  // ---------------------------------------------------------------------------
  {
    id: 'argument-essay',
    title: 'Argument Essay',
    description: 'Learn to critique arguments effectively for the GRE Argument Essay. Covers identifying logical flaws (hasty generalization, false causality, unstated assumptions), structuring the critique, and using precise analytical language.',
    icon: '\uD83D\uDCDD',
    category: 'writing',
    lessons: [
      {
        id: 'argument-essay-flaws',
        title: 'Analyzing Flaws and Structuring the Argument Essay',
        topicId: 'argument-essay',
        content: `## Overview

The GRE Argument Essay (Analyze an Argument) is fundamentally different from the Issue Essay. Instead of presenting your own position, you **critique the logic of an argument** presented in the prompt. You have **30 minutes**. You do NOT give your opinion on the topic \u2014 you analyze the argument\u2019s structure and identify its logical flaws.

## Key Concepts

### Common Logical Flaws

1. **Hasty Generalization**: drawing a broad conclusion from insufficient evidence
2. **False Causality (Post Hoc)**: assuming because B followed A, A caused B
3. **Correlation vs. Causation**: assuming two correlated variables have a causal relationship
4. **Unstated Assumption**: the argument relies on an unproven assumption
5. **Sample Bias**: evidence comes from an unrepresentative sample
6. **False Analogy**: comparing two things that are not sufficiently similar
7. **Either-Or Fallacy**: presenting only two options when more exist
8. **Circular Reasoning**: premises assume the conclusion
9. **Red Herring**: introducing irrelevant information to distract
10. **Sweeping Generalization**: applying a general rule to a specific case

### Essay Structure (5 Paragraphs)

1. **Introduction**: Briefly summarize the argument, state it is flawed, preview main weaknesses
2. **Body 1**: Analyze the first major flaw
3. **Body 2**: Analyze the second major flaw
4. **Body 3**: Analyze the third major flaw
5. **Conclusion**: Summarize flaws and state what would strengthen the argument

Each body paragraph should: **identify** the flaw by name, **quote or paraphrase** the relevant part, **explain WHY** it is a flaw, and **describe** what evidence would strengthen the argument.

### Language for Argument Analysis

- "The argument **assumes that**... without providing evidence..."
- "The author cites X as evidence that Y. However, this correlation does **not establish causation**."
- "The conclusion relies on the **unstated assumption** that..."
- "The evidence is based on a sample that **may not be representative**..."

## Important Rules

- **Identify 3-4 distinct flaws**. Depth of analysis matters more than the number of flaws.
- For each flaw, explain **clearly why it undermines the argument**.
- **Avoid**: giving your opinion on the topic, suggesting your own solutions, or using first-person ("I think").
- The essay is an **objective analysis** of someone else\u2019s argument.
- Suggest what **evidence would fix each flaw** \u2014 this demonstrates deeper understanding.
- Aim for **thorough, precise analysis** over quantity of flaws identified.

> **Key Insight:** The Argument Essay rewards analytical precision. Name the flaw, quote the text, explain why it is a problem, and describe what would fix it. This four-part structure for each flaw is the key to a high score.

---`,
        objectives: [
          'Identify common logical flaws in arguments',
          'Structure a 5-paragraph argument analysis essay',
          'Explain clearly why each flaw undermines the argument',
          'Use precise language for describing logical weaknesses',
          'Suggest what evidence would strengthen the argument'
        ],
        explanation: 'Critique the argument\'s logic, not the topic. Identify 3-4 distinct flaws (hasty generalization, false causality, unstated assumption, sample bias). For each flaw, explain why it weakens the argument and what would strengthen it.',
        keyIdeas: [
          'You critique the argument\'s reasoning, not the topic itself',
          'Common flaws: hasty generalization, false causality, unstated assumptions, sample bias',
          'Structure: intro (summarize + preview), 3 body paragraphs (one flaw each), conclusion',
          'For each flaw: identify it, quote the argument, explain why it is a flaw',
          'Suggest what evidence would fix each flaw'
        ],
        formulas: [],
        examples: [
          {
            question: 'Argument: "A study of 100 customers found that 80% preferred our new product. Therefore, the new product will be a market success." Identify a flaw.',
            solution: 'Sample bias: 100 customers may not be representative of the entire market. The study did not specify how customers were selected � they may have been existing fans of the brand.',
            explanation: 'The sample size is small (100) and potentially biased. A representative sample of the target market is needed to support the conclusion.'
          },
          {
            question: 'Argument: "Since the city implemented a bike-sharing program, traffic congestion has decreased by 15%. Therefore, the bike-sharing program caused the decrease." Identify a flaw.',
            solution: 'False causality: the decrease may be due to other factors � improved public transit, increased fuel prices, road construction, or a recession reducing driving.',
            explanation: 'Correlation (bike-sharing started, congestion decreased) does not prove causation. Other factors could explain the change.'
          }
        ],
        solvedExamples: [
          {
            problem: 'Argument: "Last year, our company implemented a four-day workweek. Since then, employee satisfaction surveys have improved by 25%. Therefore, the four-day workweek was responsible for the increase in satisfaction, and all companies should adopt this policy."\n\nIdentify three flaws in the argument.',
            solution: 'Flaw 1 (False Causality): Employee satisfaction may have increased for other reasons � a new manager, salary increases, or improved working conditions. Flaw 2 (Hasty Generalization): Results from one company may not apply to all companies in different industries and sizes. Flaw 3 (Unstated Assumption): The argument assumes improved satisfaction is solely due to the four-day workweek without considering other changes that occurred simultaneously.',
            steps: [
              'Identify conclusion: "four-day workweek caused satisfaction increase and all companies should adopt"',
              'Flaw 1: Correlation vs. causation � other factors could explain the increase',
              'Flaw 2: Hasty generalization � one company\'s experience does not apply to all',
              'Flaw 3: Unstated assumption � no other changes occurred during the period',
              'For each flaw, explain why it undermines the argument'
            ],
            answer: 'False causality, hasty generalization, and unstated assumption.'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Writing an Issue-style essay that gives your opinion on the topic',
            correction: 'The Argument Essay is not about your views. It is an objective analysis of the argument\'s logical structure.',
            explanation: 'If the argument is about bike-sharing, do not write about whether you like bike-sharing. Write about whether the reasoning from evidence to conclusion is valid.'
          },
          {
            mistake: 'Mentioning flaws without explaining WHY they are problematic',
            correction: 'For each flaw, explain: "This is a flaw because..." Then describe how it undermines the argument.',
            explanation: 'Simply naming a flaw ("this is a hasty generalization") is not enough. You must explain what makes it hasty and why that matters for the argument.'
          }
        ],
        shortcuts: [
          {
            technique: 'Flaw identification checklist',
            description: 'Read the argument and check: Is there a causal claim? Is the sample representative? Are there unstated assumptions? Is the evidence sufficient?',
            example: 'Causal claim? Check for false causality. Sample? Check for bias. Assumptions? Check for missing evidence. Sufficiency? Check for hasty generalization.'
          },
          {
            technique: 'Strengthening language',
            description: 'For each flaw, suggest specific evidence that would fix it: "To strengthen the argument, the author would need to provide evidence that..."',
            example: '"To establish causation, the author would need to rule out alternative explanations such as..."'
          }
        ],
        practiceQuestions: ['q_quant_047', 'q_quant_048', 'q_quant_049', 'q_quant_050', 'q_quant_137', 'q_quant_138']
      }
    ]
}
];

export function getTopicById(id: string): Topic | undefined {
  return curriculum.find((t) => t.id === id)
}

