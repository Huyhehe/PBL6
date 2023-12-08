import { type RecognitionResult } from '@/types/client-types/ai-route'

export const mockTTS: RecognitionResult = {
  RecognitionStatus: 'Success',
  Offset: 700000,
  Duration: 8400000,
  NBest: [
    {
      Confidence: 0.9866041,
      Lexical: 'Good morning',
      ITN: 'Good morning',
      MaskedITN: 'good morning',
      Display: 'Good morning.',
      AccuracyScore: 70,
      FluencyScore: 100,
      CompletenessScore: 100,
      PronScore: 100,
      Words: [
        {
          Word: 'Good',
          Offset: 700000,
          Duration: 2600000,
          Confidence: 0,
          AccuracyScore: 70,
          ErrorType: 'None',
          Syllables: [
            {
              Syllable: 'guwd',
              Offset: 700000,
              Duration: 2600000,
              AccuracyScore: 100
            }
          ],
          Phonemes: [
            {
              Phoneme: 'g',
              Offset: 700000,
              Duration: 1200000,
              AccuracyScore: 100
            },
            {
              Phoneme: 'uw',
              Offset: 2000000,
              Duration: 400000,
              AccuracyScore: 70
            },
            {
              Phoneme: 'd',
              Offset: 2500000,
              Duration: 800000,
              AccuracyScore: 20
            }
          ]
        },
        {
          Word: 'morning',
          Offset: 3400000,
          Duration: 5700000,
          Confidence: 0,
          AccuracyScore: 100,
          ErrorType: 'None',
          Syllables: [
            {
              Syllable: 'maor',
              Offset: 3400000,
              Duration: 2100000,
              AccuracyScore: 100
            },
            {
              Syllable: 'nihng',
              Offset: 5600000,
              Duration: 3500000,
              AccuracyScore: 100
            }
          ],
          Phonemes: [
            {
              Phoneme: 'm',
              Offset: 3400000,
              Duration: 700000,
              AccuracyScore: 100
            },
            {
              Phoneme: 'ao',
              Offset: 4200000,
              Duration: 500000,
              AccuracyScore: 100
            },
            {
              Phoneme: 'r',
              Offset: 4800000,
              Duration: 700000,
              AccuracyScore: 100
            },
            {
              Phoneme: 'n',
              Offset: 5600000,
              Duration: 700000,
              AccuracyScore: 100
            },
            {
              Phoneme: 'ih',
              Offset: 6400000,
              Duration: 900000,
              AccuracyScore: 100
            },
            {
              Phoneme: 'ng',
              Offset: 7400000,
              Duration: 1700000,
              AccuracyScore: 100
            }
          ]
        }
      ]
    }
  ],
  DisplayText: 'Good morning.'
}
