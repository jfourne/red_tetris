export const NB_PIECES = 7

/**
 * Piece type const
 * mainly used for color display
 */

export const P_NONE = 0
export const P_DEFAULT = 1
export const P_I = 2
export const P_J = 3
export const P_L = 4
export const P_O = 5
export const P_S = 6
export const P_T = 7
export const P_Z = 8

export const P_PREV = 7

/**
 * Wallkick data arrays
 */

export const ROT_0 = 0
export const ROT_R = 1
export const ROT_2 = 2
export const ROT_L = 3

export const BLOCK_KICK = [
  {
    "from" : ROT_0,
    "to" : ROT_R,
    "tests" : [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
  },
  {
    "from" : ROT_R,
    "to" : ROT_0,
    "tests" : [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
  },
  {
    "from" : ROT_R,
    "to" : ROT_2,
    "tests" : [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
  },
  {
    "from" : ROT_2,
    "to" : ROT_R,
    "tests" : [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
  },
  {
    "from" : ROT_2,
    "to" : ROT_L,
    "tests" : [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
  },
  {
    "from" : ROT_L,
    "to" : ROT_2,
    "tests" : [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
  },
  {
    "from" : ROT_L,
    "to" : ROT_0,
    "tests" : [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
  },
  {
    "from" : ROT_0,
    "to" : ROT_L,
    "tests" : [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
  },
]

export const BLOCKI_KICK = [
  {
    "from" : ROT_0,
    "to" : ROT_R,
    "tests" : [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
  },
  {
    "from" : ROT_R,
    "to" : ROT_0,
    "tests" : [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
  },
  {
    "from" : ROT_R,
    "to" : ROT_2,
    "tests" : [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]],
  },
  {
    "from" : ROT_2,
    "to" : ROT_R,
    "tests" : [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
  },
  {
    "from" : ROT_2,
    "to" : ROT_L,
    "tests" : [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
  },
  {
    "from" : ROT_L,
    "to" : ROT_2,
    "tests" : [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
  },
  {
    "from" : ROT_L,
    "to" : ROT_0,
    "tests" : [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
  },
  {
    "from" : ROT_0,
    "to" : ROT_L,
    "tests" : [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]],
  },
]


 /**
  * block variations
  */

const blockI = [
  [
    [P_NONE, P_NONE, P_NONE, P_NONE],
    [P_I, P_I, P_I, P_I],
    [P_NONE, P_NONE, P_NONE, P_NONE],
    [P_NONE, P_NONE, P_NONE, P_NONE],
  ],
  [
    [P_NONE, P_NONE, P_I, P_NONE],
    [P_NONE, P_NONE, P_I, P_NONE],
    [P_NONE, P_NONE, P_I, P_NONE],
    [P_NONE, P_NONE, P_I, P_NONE],
  ],
  [
    [P_NONE, P_NONE, P_NONE, P_NONE],
    [P_NONE, P_NONE, P_NONE, P_NONE],
    [P_I, P_I, P_I, P_I],
    [P_NONE, P_NONE, P_NONE, P_NONE],
  ],
  [
    [P_NONE, P_I, P_NONE, P_NONE],
    [P_NONE, P_I, P_NONE, P_NONE],
    [P_NONE, P_I, P_NONE, P_NONE],
    [P_NONE, P_I, P_NONE, P_NONE],
  ],
];

const blockJ = [
  [
    [P_J, P_NONE, P_NONE],
    [P_J, P_J, P_J],
    [P_NONE, P_NONE, P_NONE],
  ],
  [
    [P_NONE, P_J, P_J],
    [P_NONE, P_J, P_NONE],
    [P_NONE, P_J, P_NONE],
  ],
  [
    [P_NONE, P_NONE, P_NONE],
    [P_J, P_J, P_J],
    [P_NONE, P_NONE, P_J],
  ],
  [
    [P_NONE, P_J, P_NONE],
    [P_NONE, P_J, P_NONE],
    [P_J, P_J, P_NONE],
  ],
]

const blockL = [
  [
    [P_NONE, P_NONE, P_L],
    [P_L, P_L, P_L],
    [P_NONE, P_NONE, P_NONE],
  ],
  [
    [P_NONE, P_L, P_NONE],
    [P_NONE, P_L, P_NONE],
    [P_NONE, P_L, P_L],
  ],
  [
    [P_NONE, P_NONE, P_NONE],
    [P_L, P_L, P_L],
    [P_L, P_NONE, P_NONE],
  ],
  [
    [P_L, P_L, P_NONE],
    [P_NONE, P_L, P_NONE],
    [P_NONE, P_L, P_NONE],
  ],
]

const blockO = [
  [
    [P_O, P_O],
    [P_O, P_O],
  ],
]

const blockS = [
  [
    [P_NONE, P_S, P_S],
    [P_S, P_S, P_NONE],
    [P_NONE, P_NONE, P_NONE],
  ],
  [
    [P_NONE, P_S, P_NONE],
    [P_NONE, P_S, P_S],
    [P_NONE, P_NONE, P_S],
  ],
  [
    [P_NONE, P_NONE, P_NONE],
    [P_NONE, P_S, P_S],
    [P_S, P_S, P_NONE],
  ],
  [
    [P_S, P_NONE, P_NONE],
    [P_S, P_S, P_NONE],
    [P_NONE, P_S, P_NONE],
  ],
]

const blockT = [
  [
    [P_NONE, P_T, P_NONE],
    [P_T, P_T, P_T],
    [P_NONE, P_NONE, P_NONE],
  ],
  [
    [P_NONE, P_T, P_NONE],
    [P_NONE, P_T, P_T],
    [P_NONE, P_T, P_NONE],
  ],
  [
    [P_NONE, P_NONE, P_NONE],
    [P_T, P_T, P_T],
    [P_NONE, P_T, P_NONE],
  ],
  [
    [P_NONE, P_T, P_NONE],
    [P_T, P_T, P_NONE],
    [P_NONE, P_T, P_NONE],
  ],
]

const blockZ = [
  [
    [P_Z, P_Z, P_NONE],
    [P_NONE, P_Z, P_Z],
    [P_NONE, P_NONE, P_NONE],
  ],
  [
    [P_NONE, P_NONE, P_Z],
    [P_NONE, P_Z, P_Z],
    [P_NONE, P_Z, P_NONE],
  ],
  [
    [P_NONE, P_NONE, P_NONE],
    [P_Z, P_Z, P_NONE],
    [P_NONE, P_Z, P_Z],
  ],
  [
    [P_NONE, P_Z, P_NONE],
    [P_Z, P_Z, P_NONE],
    [P_Z, P_NONE, P_NONE],
  ],
]

export const PIECES = [
  blockI,
  blockJ,
  blockL,
  blockO,
  blockS,
  blockT,
  blockZ
]