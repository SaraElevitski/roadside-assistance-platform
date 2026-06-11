
export interface HelpRequest {
   _id: number ;
  location: RequestLocation;
  problemDescription: string;
  contactPhone: string;
  status: string | '';
  peopleStuck: number | '';
  priority: number | '';
  volunteerCode: string;
}

export interface RequestLocation {
  areaCode: number | '';
  name: string;
}


export type RequestStatus = 'ממתין' | 'בטיפול' | 'הסתיים';

export const ALL_STATUSES: RequestStatus[] = ['ממתין', 'בטיפול', 'הסתיים'];

export const priorityLabels: Record<number, string> = {
  1: 'נמוכה',
  2: 'בינונית',
  3: 'גבוהה',
  4: 'קריטית',
};


