"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<Piece[]>([]);

  const url: string =
    process.env.NODE_ENV === "production"
      ? "https://skilltoydb-d07aa887e817.herokuapp.com"
      : "http://localhost:3000";

  const getData = async () => {
    const response = await fetch(`${url}/api/allPieces?skillToyType=Chetki`);
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const doubleRoundBead: boolean = false; // False for Ao2, True for MellowBlock
  const defaultNumberOfMidPieces: number = 18; // Ao2 default is 18

  const defaultChetki = (): Setup => {
    const findDefaultPieceByType = (type: PieceTypes): Piece => {
      const foundPiece: Piece | undefined = data.find(
        (piece) => piece.type === type
      );
      if (foundPiece) {
        return foundPiece;
      } else {
        return {
          type: type,
          name: `Default ${type}`,
          material: "Default",
          imgFile: "default.jpg",
        };
      }
    };
    const midPiecePart: Piece = findDefaultPieceByType(
      "chetkiMidPiece" as PieceTypes
    );
    const endPiecePart: Piece = findDefaultPieceByType(
      "chetkiEndPiece" as PieceTypes
    );
    const generalBeadPart: Piece = findDefaultPieceByType(
      "generalBead" as PieceTypes
    );
    let chetkiSetup: Setup = {
      name: "Default Chetki",
      pieces: [
        { piece: endPiecePart, quantity: 1 },
        { piece: midPiecePart, quantity: defaultNumberOfMidPieces },
        { piece: endPiecePart, quantity: 1 },
        { piece: generalBeadPart, quantity: 1 },
      ],
      cordType: "Paracord",
      approved: true,
    };
    if (doubleRoundBead) {
      chetkiSetup.pieces.unshift({ piece: generalBeadPart, quantity: 1 });
    }
    return chetkiSetup;
  };

  return (
    <div>
      {data.length > 0 && (
        <div className="flex flex-row">
          <div className="w-1/2">
            <ul>
              <li>Default Chetki:</li>
              {defaultChetki().pieces.map((piece, index) => (
                <li key={index}>
                  {piece.quantity} x {piece.piece.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/2">
            <ul>
              <li>All Pieces:</li>
              {data.map((piece, index) => (
                <li key={index}>{piece.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
