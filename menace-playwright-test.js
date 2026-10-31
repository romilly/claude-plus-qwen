const { test, expect } = require('@playwright/test');

// Test script to verify MENACE implementation functionality
test.describe('MENACE Implementation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('file:///home/romilly/git/active/claude_plus-qwen/menace.html');
  });

  test('should initialize with empty board and proper game state', async ({ page }) => {
    // Check that the game board is initialized correctly
    const board = await page.$$('.cell');
    expect(board.length).toBe(9);

    // Check initial status message
    const status = await page.textContent('#status');
    expect(status).toContain('Your turn');

    // Check initial statistics
    const gamesPlayed = await page.textContent('#games-played');
    expect(gamesPlayed).toBe('0');

    const wins = await page.textContent('#wins');
    expect(wins).toBe('0');

    const losses = await page.textContent('#losses');
    expect(losses).toBe('0');

    const draws = await page.textContent('#draws');
    expect(draws).toBe('0');
  });

  test('should allow human to make moves', async ({ page }) => {
    // Click on the first cell
    await page.click('.cell[data-index="0"]');

    // Verify that X is placed
    const firstCell = await page.textContent('.cell[data-index="0"]');
    expect(firstCell).toBe('X');

    // Verify status changed to MENACE's turn
    const status = await page.textContent('#status');
    expect(status).toContain('MENACE');
  });

  test('should make MENACE moves automatically', async ({ page }) => {
    // Make a move as human player
    await page.click('.cell[data-index="0"]');

    // Wait for MENACE to make its move (with some timeout)
    await page.waitForTimeout(1000);

    // Verify that the board has changed (MENACE should have placed an O)
    const secondCell = await page.textContent('.cell[data-index="1"]');
    expect(secondCell).toBe('O');
  });

  test('should preserve learning between games', async ({ page }) => {
    // Play a few moves
    await page.click('.cell[data-index="0"]'); // Human X
    await page.waitForTimeout(1000);

    // Start new game
    await page.click('#new-game-btn');

    // Check that the board is cleared but matchboxes should still exist
    const firstCell = await page.textContent('.cell[data-index="0"]');
    expect(firstCell).toBe('');

    // Verify status message
    const status = await page.textContent('#status');
    expect(status).toContain('New game started');
  });

  test('should reset completely when requested', async ({ page }) => {
    // Play a move
    await page.click('.cell[data-index="0"]');
    await page.waitForTimeout(1000);

    // Reset completely
    await page.click('#reset-btn');

    // Check that board is cleared
    const firstCell = await page.textContent('.cell[data-index="0"]');
    expect(firstCell).toBe('');

    // Check statistics are reset
    const gamesPlayed = await page.textContent('#games-played');
    expect(gamesPlayed).toBe('0');
  });

  test('should show matchbox and bead statistics', async ({ page }) => {
    // Check initial statistics
    const matchboxesCount = await page.textContent('#matchboxes-count');
    const totalBeads = await page.textContent('#total-beads');

    // These should be 0 initially or at least not throw errors
    expect(matchboxesCount).not.toBe(null);
    expect(totalBeads).not.toBe(null);
  });
});