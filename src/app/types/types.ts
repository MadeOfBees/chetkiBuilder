type PieceTypes = "chetkiEndPiece" | "chetkiMidPiece" | "generalBead";

type Piece = {
  type: PieceTypes;
  name: string;
  weight?: number;
  material: string;
  price?: number;
  imgFile: string;
  partURL?: string;
};

type Pieces = { piece: Piece; quantity: number }[];

type Setup = {
  name: string;
  pieces: Pieces;
  cordType: string;
  setupURL?: string;
  weight?: number;
  price?: number;
  imgFile?: string;
  approved: boolean;
};