# Nine Men's Morris

A complete browser-based implementation of the classic strategy board game Nine Men's Morris (circa 100 AD).

## How to Play

Open `index.html` in any modern browser. No server or build step required.

### Game Phases

1. **Placing** — Each player alternately places their 9 pieces on any empty point
2. **Moving** — Move one piece along a line to an adjacent empty point
3. **Flying** — When down to 3 pieces, jump to ANY empty point

### Forming Mills

Get three in a row along a board line to form a **mill** and remove an opponent's piece. Pieces in mills can't be removed unless all opponent pieces are in mills.

### Winning

Reduce your opponent to 2 pieces, or block them so they have no legal moves.

## Controls

- Click empty points with green glow to place
- Click your pieces (any color) to select, then click blue/purple targets to move
- Click red-pulsing opponent pieces to remove after forming a mill

## Files

- `index.html` — Single self-contained file (HTML + CSS + JS, no dependencies)
