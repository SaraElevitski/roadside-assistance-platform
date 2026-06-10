
export interface HelpRequest {
   _id: number | '';
  location: RequestLocation;
  problemDescription: string;
  contactPhone: string;
  status: RequestStatusType;
  peopleStuck: number | '';
  priority: PriorityType | '';
  volunteerCode: string;
}

export interface RequestLocation {
  areaCode: number | '';
  name: string;
}


export const requestStatuses = ['ממתין', 'בטיפול', 'הסתיים'] as const;
export type RequestStatusType = typeof requestStatuses[number];


export const priorityOptions = ['נמוכה', 'בינונית', 'גבוהה', 'קריטית'] as const;
export type PriorityType = typeof priorityOptions[number];