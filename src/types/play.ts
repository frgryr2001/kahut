export interface IPlayData {
  kahootId: number;
  assignmentId?: number;
  point: number;
  answers: (number | boolean | null)[];
}
