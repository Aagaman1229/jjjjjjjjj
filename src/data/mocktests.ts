import type { MockTest } from '../types'

const v1 = Array.from({ length: 25 }, (_, i) => `ets_v1_${String(i + 1).padStart(3, '0')}`)
const v2 = Array.from({ length: 25 }, (_, i) => `ets_v2_${String(i + 1).padStart(3, '0')}`)
const q3 = Array.from({ length: 25 }, (_, i) => `ets_q3_${String(i + 1).padStart(3, '0')}`)
const q4 = Array.from({ length: 25 }, (_, i) => `ets_q4_${String(i + 1).padStart(3, '0')}`)

function qq(start: number, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `q_quant_${String(start + i).padStart(3, '0')}`)
}

function qv(start: number, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `q_verbal_${String(start + i).padStart(3, '0')}`)
}

export const mockTests: MockTest[] = [
  // ── ETS Full-Length Practice Test 1 ──
  {
    id: 'mt_ets_001',
    name: 'ETS Practice Test 1',
    duration: 150,
    totalQuestions: 100,
    sections: [
      { id: 'ets1_sec1', name: 'Verbal Reasoning 1', type: 'verbal', duration: 35, questionRange: [1, 25], questions: v1 },
      { id: 'ets1_sec2', name: 'Verbal Reasoning 2', type: 'verbal', duration: 35, questionRange: [26, 50], questions: v2 },
      { id: 'ets1_sec3', name: 'Quantitative Reasoning 1', type: 'quant', duration: 40, questionRange: [51, 75], questions: q3 },
      { id: 'ets1_sec4', name: 'Quantitative Reasoning 2', type: 'quant', duration: 40, questionRange: [76, 100], questions: q4 },
    ],
  },

  // ── Practice Test 1 (Original + Writing) ──
  {
    id: 'mt_001',
    name: 'Practice Test 1',
    duration: 165,
    totalQuestions: 82,
    sections: [
      { id: 'pt1_sec1', name: 'Quantitative Reasoning 1', type: 'quant', duration: 35, questionRange: [1, 20], questions: qq(1, 20) },
      { id: 'pt1_sec2', name: 'Verbal Reasoning 1', type: 'verbal', duration: 30, questionRange: [21, 40], questions: qv(1, 20) },
      { id: 'pt1_sec3', name: 'Quantitative Reasoning 2', type: 'quant', duration: 35, questionRange: [41, 60], questions: qq(21, 20) },
      { id: 'pt1_sec4', name: 'Verbal Reasoning 2', type: 'verbal', duration: 30, questionRange: [61, 80], questions: qv(21, 20) },
      { id: 'pt1_sec5', name: 'Analytical Writing', type: 'writing', duration: 60, questionRange: [81, 82], questions: [] },
    ],
  },

  // ── Practice Test 2 ──
  {
    id: 'mt_002',
    name: 'Practice Test 2',
    duration: 130,
    totalQuestions: 80,
    sections: [
      { id: 'pt2_sec1', name: 'Quantitative Reasoning 1', type: 'quant', duration: 35, questionRange: [1, 20], questions: qq(41, 20) },
      { id: 'pt2_sec2', name: 'Verbal Reasoning 1', type: 'verbal', duration: 30, questionRange: [21, 40], questions: qv(41, 20) },
      { id: 'pt2_sec3', name: 'Quantitative Reasoning 2', type: 'quant', duration: 35, questionRange: [41, 60], questions: qq(61, 20) },
      { id: 'pt2_sec4', name: 'Verbal Reasoning 2', type: 'verbal', duration: 30, questionRange: [61, 80], questions: qv(61, 20) },
    ],
  },

  // ── Practice Test 3 ──
  {
    id: 'mt_003',
    name: 'Practice Test 3',
    duration: 130,
    totalQuestions: 80,
    sections: [
      { id: 'pt3_sec1', name: 'Quantitative Reasoning 1', type: 'quant', duration: 35, questionRange: [1, 20], questions: qq(81, 20) },
      { id: 'pt3_sec2', name: 'Verbal Reasoning 1', type: 'verbal', duration: 30, questionRange: [21, 40], questions: qv(81, 20) },
      { id: 'pt3_sec3', name: 'Quantitative Reasoning 2', type: 'quant', duration: 35, questionRange: [41, 60], questions: qq(101, 20) },
      { id: 'pt3_sec4', name: 'Verbal Reasoning 2', type: 'verbal', duration: 30, questionRange: [61, 80], questions: qv(101, 20) },
    ],
  },

  // ── Practice Test 4 ──
  {
    id: 'mt_004',
    name: 'Practice Test 4',
    duration: 130,
    totalQuestions: 80,
    sections: [
      { id: 'pt4_sec1', name: 'Quantitative Reasoning 1', type: 'quant', duration: 35, questionRange: [1, 20], questions: qq(121, 20) },
      { id: 'pt4_sec2', name: 'Verbal Reasoning 1', type: 'verbal', duration: 30, questionRange: [21, 40], questions: qv(121, 20) },
      { id: 'pt4_sec3', name: 'Quantitative Reasoning 2', type: 'quant', duration: 35, questionRange: [41, 60], questions: qq(141, 20) },
      { id: 'pt4_sec4', name: 'Verbal Reasoning 2', type: 'verbal', duration: 30, questionRange: [61, 80], questions: qv(141, 20) },
    ],
  },

  // ── Practice Test 5 ──
  {
    id: 'mt_005',
    name: 'Practice Test 5',
    duration: 130,
    totalQuestions: 80,
    sections: [
      { id: 'pt5_sec1', name: 'Quantitative Reasoning 1', type: 'quant', duration: 35, questionRange: [1, 20], questions: qq(161, 20) },
      { id: 'pt5_sec2', name: 'Verbal Reasoning 1', type: 'verbal', duration: 30, questionRange: [21, 40], questions: qv(161, 20) },
      { id: 'pt5_sec3', name: 'Quantitative Reasoning 2', type: 'quant', duration: 35, questionRange: [41, 60], questions: qq(181, 20) },
      { id: 'pt5_sec4', name: 'Verbal Reasoning 2', type: 'verbal', duration: 30, questionRange: [61, 80], questions: qv(181, 20) },
    ],
  },

  // ── Practice Test 6 (Quant Focus) ──
  {
    id: 'mt_006',
    name: 'Practice Test 6 - Quant Focus',
    duration: 105,
    totalQuestions: 60,
    sections: [
      { id: 'pt6_sec1', name: 'Quantitative Reasoning 1', type: 'quant', duration: 35, questionRange: [1, 20], questions: qq(201, 20) },
      { id: 'pt6_sec2', name: 'Quantitative Reasoning 2', type: 'quant', duration: 35, questionRange: [21, 40], questions: qq(221, 20) },
      { id: 'pt6_sec3', name: 'Verbal Reasoning', type: 'verbal', duration: 35, questionRange: [41, 60], questions: qv(201, 20) },
    ],
  },

  // ── Practice Test 7 (Verbal Focus) ──
  {
    id: 'mt_007',
    name: 'Practice Test 7 - Verbal Focus',
    duration: 100,
    totalQuestions: 60,
    sections: [
      { id: 'pt7_sec1', name: 'Verbal Reasoning 1', type: 'verbal', duration: 35, questionRange: [1, 20], questions: qv(221, 20) },
      { id: 'pt7_sec2', name: 'Verbal Reasoning 2', type: 'verbal', duration: 35, questionRange: [21, 40], questions: qv(241, 20) },
      { id: 'pt7_sec3', name: 'Quantitative Reasoning', type: 'quant', duration: 30, questionRange: [41, 60], questions: qq(241, 20) },
    ],
  },

  // ── Quick Quant Drill ──
  {
    id: 'mt_quant_quick',
    name: 'Quick Quant Drill (15 min)',
    duration: 15,
    totalQuestions: 10,
    sections: [
      { id: 'qqd_sec1', name: 'Quantitative Reasoning', type: 'quant', duration: 15, questionRange: [1, 10], questions: qq(261, 10) },
    ],
  },

  // ── Quick Verbal Drill ──
  {
    id: 'mt_verbal_quick',
    name: 'Quick Verbal Drill (15 min)',
    duration: 15,
    totalQuestions: 10,
    sections: [
      { id: 'qvd_sec1', name: 'Verbal Reasoning', type: 'verbal', duration: 15, questionRange: [1, 10], questions: qv(261, 10) },
    ],
  },
]
