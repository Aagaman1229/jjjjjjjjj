"""Fix mock test generation - proper distribution of questions"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))

from generate_mock_tests import questions_data, to_ts_value

OUT_DIR = r'C:\Gre_prep_app\gre-prep\src\data\generated'

# Collect question IDs by section
v1_ids = [q['id'] for q in questions_data if q['id'].startswith('ets_v1_')]
v2_ids = [q['id'] for q in questions_data if q['id'].startswith('ets_v2_')]
q3_ids = [q['id'] for q in questions_data if q['id'].startswith('ets_q3_')]
q4_ids = [q['id'] for q in questions_data if q['id'].startswith('ets_q4_')]

tests = []

# Full ETS test (100 questions, 4 sections)
tests.append({
    "id": "mt_ets_001",
    "name": "ETS Practice Test 1",
    "duration": 165,
    "totalQuestions": 100,
    "sections": [
        {"id": "sec_1_verbal", "name": "Verbal Reasoning Section 1", "type": "verbal", "duration": 35, "questionRange": [1, 25], "questions": v1_ids},
        {"id": "sec_2_verbal", "name": "Verbal Reasoning Section 2", "type": "verbal", "duration": 35, "questionRange": [26, 50], "questions": v2_ids},
        {"id": "sec_3_quant", "name": "Quantitative Reasoning Section 1", "type": "quant", "duration": 40, "questionRange": [51, 75], "questions": q3_ids},
        {"id": "sec_4_quant", "name": "Quantitative Reasoning Section 2", "type": "quant", "duration": 40, "questionRange": [76, 100], "questions": q4_ids},
    ]
})

# 4 shorter practice tests (20 quant + 20 verbal each, mixing sections)
for i in range(4):
    offset = i * 5
    q_quant = []
    # Take 10 from q3 + 10 from q4 with rotation
    for j in range(10):
        q_quant.append(q3_ids[(offset + j) % 25])
    for j in range(10):
        q_quant.append(q4_ids[(offset + j) % 25])
    
    q_verbal = []
    for j in range(10):
        q_verbal.append(v1_ids[(offset + j) % 25])
    for j in range(10):
        q_verbal.append(v2_ids[(offset + j) % 25])
    
    tests.append({
        "id": f"mt_practice_{i+2}",
        "name": f"Practice Test {i+2}",
        "duration": 80,
        "totalQuestions": 40,
        "sections": [
            {"id": f"pt{i+2}_sec_1_quant", "name": "Quantitative Reasoning", "type": "quant", "duration": 40, "questionRange": [1, 20], "questions": q_quant},
            {"id": f"pt{i+2}_sec_2_verbal", "name": "Verbal Reasoning", "type": "verbal", "duration": 40, "questionRange": [21, 40], "questions": q_verbal},
        ]
    })

# Write corrected mocktest file
lines = ["import type { MockTest } from '../types'\n"]
lines.append("export const generatedMockTests: MockTest[] = [")
for t in tests:
    lines.append("  {")
    for key, val in t.items():
        lines.append(f"    {key}: {to_ts_value(val)},")
    lines.append("  },")
lines.append("]\n")

with open(os.path.join(OUT_DIR, "ets_mocktests.ts"), "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

for t in tests:
    total = sum(len(s["questions"]) for s in t["sections"])
    print(f"{t['name']}: {total} questions across {len(t['sections'])} sections")
