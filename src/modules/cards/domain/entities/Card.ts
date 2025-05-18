/**
 * Card entity representing a kudos card in the system
 */
export class Card {
  constructor(
    public readonly id: string,
    public readonly recipientName: string,
    public readonly teamId: number,
    public readonly teamName: string,
    public readonly categoryId: number,
    public readonly categoryName: string,
    public readonly message: string,
    public readonly createdBy: string,
    public readonly creatorName: string,
    public readonly createdAt: string,
    public readonly updatedAt: string
  ) {}
} 