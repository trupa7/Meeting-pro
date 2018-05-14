export class Task {
  constructor(
    public taskName: string,
    public taskParticipant: string,
    public dueDate: string,
    public tags: string,
    public notes: string
  ) {}
}
