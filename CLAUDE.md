# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-file browser Tic Tac Toe in `tictactoe.html` — no build, no dependencies, no package manager. HTML + inline `<style>` + inline `<script>` only.

## Run

Open `tictactoe.html` directly in any browser (double-click, or `Start-Process tictactoe.html` on Windows). There is no dev server, test runner, or lint configuration.

## Architecture

All state and logic live in the inline `<script>` at the bottom of `tictactoe.html`:

- `cells` — flat 9-element array indexed 0..8 (row-major, top-left to bottom-right). Empty string means unplayed.
- `currentPlayer` — `'X'` or `'O'`, toggled after each successful move.
- `gameOver` — locks the board after a win or draw until `reset()`.
- `wins` — hardcoded list of the 8 winning index triples; `checkWin()` returns the first matching triple so `play()` can highlight it via the `.win` CSS class.
- `render()` rebuilds the board DOM from `cells` on every move. UI state (disabled cells, X/O coloring, win highlight) is derived from `cells` + `gameOver` — there is no separate view state to keep in sync.

When changing game rules, edit `play()` and `checkWin()`; when changing appearance, edit the `<style>` block. The `wins` table is the source of truth for victory conditions.
