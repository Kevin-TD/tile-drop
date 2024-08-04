const FPS = 60

const BACKGROUND_OUTLINE_COLOR = new RGBA(0, 0, 0, 0)
const BACKGROUND_FILL_COLOR = new RGBA(100, 100, 255)

const SCORE_TEXT_ALIGN = "center"
const SCORE_TEXT_BASELINE = "middle"
const SCORE_TEXT_FILL_STYLE = "white"
const SCORE_X_POSITION = 0.5
const SCORE_Y_POSITION = 0.05

const NEW_RECTANGLE_START_X = 0.5 
const NEW_RECTANGLE_START_Y = 0.1 
const NEW_RECTANGLE_WIDTH = 0.1 
const NEW_RECTANGLE_HEIGHT = 0.1 
const NEW_RECTANGLE_OUTLINE_COLOR = new RGBA(0,0,0,0)

const COLOR_SCORE_MAP = {
    2: new RGBA(72, 200, 208), 
    4: new RGBA(238, 133, 74),
    8: new RGBA(106, 204, 100),
    16: new RGBA(214, 95, 95),
    32: new RGBA(149, 108, 180),
    64: new RGBA(140, 97, 60),
    128: new RGBA(220, 126, 192),
    256: new RGBA(121, 121, 121),
    512: new RGBA(213, 187, 103),
    1024: new RGBA(130, 198, 226),
    2048: new RGBA(72, 120, 208),
}

const GRAVITY = 0.5 / FPS 