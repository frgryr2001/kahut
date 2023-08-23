export interface IPlayData {
  kahootId?: number | null;
  assignmentId?: number;
  point: number;
  answers: (number | boolean | null)[];
}

export interface IAssignmentData {
  id: number;
  pin: string;
  kahootId: number;
  expiredAt: number;
}
