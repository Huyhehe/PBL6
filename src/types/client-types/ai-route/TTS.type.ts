type Syllable = {
  Syllable: string
  Offset: number
  Duration: number
  AccuracyScore: number
}

type Phoneme = {
  Phoneme: string
  Offset: number
  Duration: number
  AccuracyScore: number
}

type Word = {
  Word: string
  Offset: number
  Duration: number
  Confidence: number
  AccuracyScore: number
  ErrorType: string
  Syllables: Syllable[]
  Phonemes: Phoneme[]
}

type NBestItem = {
  Confidence: number
  Lexical: string
  ITN: string
  MaskedITN: string
  Display: string
  AccuracyScore: number
  FluencyScore: number
  CompletenessScore: number
  PronScore: number
  Words: Word[]
}

export type RecognitionResult = {
  RecognitionStatus: string
  Offset: number
  Duration: number
  NBest: NBestItem[]
  DisplayText: string
}
