import React, { useState } from "react";

const PuzzleStampBoard = () => {
  const imageUrl = "https://picsum.photos/600/600";

  const gridSize = 3;
  const totalTiles = gridSize * gridSize;

  const [tileStates, setTileStates] = useState([
    "stamped",
    "stamped",
    "stamped",
    "stamped",
    "preview",
    "stamped",
    "stamped",
    "stamped",
    "stamped",
  ]);

  const handleTileClick = (index) => {
    setTileStates((prev) => {
      const next = [...prev];
      if (next[index] === "locked") next[index] = "preview";
      else if (next[index] === "preview") next[index] = "stamped";
      else next[index] = "locked";
      return next;
    });
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>🧩 퍼즐 도장판</h3>

      <div
        style={{
          ...styles.board,
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {Array.from({ length: totalTiles }).map((_, index) => {
          const currentState = tileStates[index];

          const row = Math.floor(index / gridSize);
          const col = index % gridSize;
          const posX = (col / (gridSize - 1)) * 100;
          const posY = (row / (gridSize - 1)) * 100;

          let tileStyle = {
            ...styles.tile,
            backgroundImage: "none",
            backgroundColor: "#ffffff",
            border: "2px solid transparent",
            opacity: 1,
          };

          if (currentState === "stamped") {
            tileStyle.backgroundImage = `url(${imageUrl})`;
            tileStyle.backgroundPosition = `${posX}% ${posY}%`;
          } else if (currentState === "preview") {
            tileStyle.backgroundImage = `url(${imageUrl})`;
            tileStyle.backgroundPosition = `${posX}% ${posY}%`;
            tileStyle.opacity = 0.25;
          } else {
            tileStyle.backgroundColor = "#f3f4f6";
            tileStyle.border = "2px dashed #d1d5db";
          }

          return (
            <div
              key={index}
              style={tileStyle}
              onClick={() => handleTileClick(index)}
            >
              {currentState === "locked" && (
                <span style={styles.tileNumber}>{index + 1}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "sans-serif",
  },
  title: {
    marginBottom: "20px",
    color: "#374151",
  },
  board: {
    display: "grid",
    gap: "8px",
    width: "360px",
    backgroundColor: "#e5e7eb",
    padding: "8px",
    borderRadius: "12px",
    boxSizing: "border-box",
  },
  tile: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundSize: "344px 344px",
    borderRadius: "8px",
    cursor: "pointer",
    userSelect: "none",
    boxSizing: "border-box",
    aspectRatio: "1 / 1",
    width: "100%",
  },
  tileNumber: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#9ca3af",
  },
};

export default PuzzleStampBoard;
