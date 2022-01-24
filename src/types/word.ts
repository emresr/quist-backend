export interface AddReqBody {
  title: string;
  definition: string;
  type: 'ADVERB' | 'ADJECTIVE' | 'NOUN';
}

export interface EditReqBody {
  id: number;
  title: string;
  definition: string;
  type: 'ADVERB' | 'ADJECTIVE' | 'NOUN';
}
