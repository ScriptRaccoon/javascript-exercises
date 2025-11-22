/*
Sticker indices on the Rubik's Cube. We exclude
the centers because they do not really move.

            __________
           |  0  1  2 |
           |  3  *  4 |
           |  5  6  7 |
 ---------- ---------- ----------
|  8  9 10 | 11 12 13 | 14 15 16 |
| 17  * 18 | 19  * 20 | 21  * 22 |
| 23 24 25 | 26 27 28 | 29 30 31 |
 ---------- ---------- ----------
           | 32 33 34 |
           | 35  * 36 |
           | 37 38 39 |
            ----------
           | 40 41 42 |
           | 43  * 44 |
           | 45 46 47 |
            ---------- 
*/

import { PermUtils } from "./perm.utils"

/**
 * Number of stickers on the Rubik's Cube
 */
export const N = 6 * 8

/**
 * Move R as a permutation on the Rubik's Cube
 */
const R = PermUtils.convert_cycles(
	[
		[2, 42, 34, 13],
		[4, 44, 36, 20],
		[7, 47, 39, 28],
		[14, 16, 31, 29],
		[15, 22, 30, 21],
	],
	N,
)

/**
 * Move L as a permutation on the Rubik's Cube
 */
const L = PermUtils.convert_cycles(
	[
		[0, 11, 32, 40],
		[3, 19, 35, 43],
		[5, 26, 37, 45],
		[8, 10, 25, 23],
		[9, 18, 24, 17],
	],
	N,
)

/**
 * Move U as a permutation on the Rubik's Cube
 */
const U = PermUtils.convert_cycles(
	[
		[0, 2, 7, 5],
		[1, 4, 6, 3],
		[11, 8, 47, 14],
		[12, 9, 46, 15],
		[13, 10, 45, 16],
	],
	N,
)

/**
 * Move D as a permutation on the Rubik's Cube
 */
const D = PermUtils.convert_cycles(
	[
		[26, 29, 42, 23],
		[27, 30, 41, 24],
		[28, 31, 40, 25],
		[32, 34, 39, 37],
		[33, 36, 38, 35],
	],
	N,
)

/**
 * Move F as a permutation on the Rubik's Cube
 */
const F = PermUtils.convert_cycles(
	[
		[11, 13, 28, 26],
		[12, 20, 27, 19],
		[5, 14, 34, 25],
		[6, 21, 33, 18],
		[7, 29, 32, 10],
	],
	N,
)

/**
 * Move B as a permutation on the Rubik's Cube
 */
const B = PermUtils.convert_cycles(
	[
		[0, 23, 39, 16],
		[1, 17, 38, 22],
		[2, 8, 37, 31],
		[40, 42, 47, 45],
		[41, 44, 46, 43],
	],
	N,
)

/**
 * Dictionary with all basic moves on the Rubik's Cube
 */
export const move_dict = { R, L, U, D, F, B } as const
