import type { Flashcard } from '../types'

const MIN_EASE = 1.3
const EASE_BOOST = 0.15
const INTERVALS = [1, 3, 7, 14, 30, 60, 120]

export function calculateNextReview(card: Flashcard, quality: number): Flashcard {
  const q = Math.max(0, Math.min(5, quality))

  let ease = card.easeFactor
  let reps = card.repetitions
  let interval: number

  if (q < 3) {
    reps = 0
    interval = 1
  } else {
    ease = Math.max(MIN_EASE, ease + (EASE_BOOST * (q - 3)))
    reps += 1
    interval = reps === 1 ? 1 : reps === 2 ? 3 : Math.round(INTERVALS[Math.min(reps - 1, INTERVALS.length - 1)] * ease)
  }

  const now = Date.now()
  return {
    ...card,
    easeFactor: parseFloat(ease.toFixed(2)),
    repetitions: reps,
    interval,
    lastReviewed: now,
    nextReview: now + interval * 86400000,
  }
}

export function getCardsDueToday(cards: Flashcard[]): Flashcard[] {
  const now = Date.now()
  return cards.filter(c => !c.nextReview || c.nextReview <= now)
}

export function getCardsByMasteryLevel(cards: Flashcard[]): { new: Flashcard[]; learning: Flashcard[]; due: Flashcard[]; mastered: Flashcard[] } {
  const now = Date.now()
  return {
    new: cards.filter(c => c.repetitions === 0),
    learning: cards.filter(c => c.repetitions > 0 && c.repetitions < 3),
    due: cards.filter(c => c.nextReview && c.nextReview <= now && c.repetitions >= 3),
    mastered: cards.filter(c => c.repetitions >= 5 && c.easeFactor >= 2.0),
  }
}
