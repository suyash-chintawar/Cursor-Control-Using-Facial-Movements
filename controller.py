import pyautogui as pyag

import face_analyser as analyser


DIRECTION_UP = 1
DIRECTION_LEFT = 2
DIRECTION_DOWN = 3
DIRECTION_RIGHT = 4


MODE_CURSOR = 2
MODE_SCROLL = 3


def _get_direction(nose_point, anchor_point, w=45, h=35, multiple=1):
    nx, ny = nose_point
    x, y = anchor_point

    if nx > x + multiple * w:
        return DIRECTION_RIGHT
    elif nx < x - multiple * w:
        return DIRECTION_LEFT

    if ny > y + multiple * h:
        return DIRECTION_DOWN
    elif ny < y - multiple * h:
        return DIRECTION_UP

    return None


mode = None
left_eye_brow_diff = None
right_eye_brow_diff = None

anchor = None
previous_action = None
HORIZONTAL_DRAG = 25
VERTICAL_DRAG = 15
SCROLL = 5

def perform(action, data):
    global mode, anchor, previous_action, left_eye_brow_diff, right_eye_brow_diff #, is_mode_selection

    if mode is None:
        if action is analyser.ACTION_OPEN_MOUTH:
            mode = MODE_CURSOR
            anchor = data.nose_point
            left_eye_brow_diff = data.left_eye_brow_diff
            right_eye_brow_diff = data.right_eye_brow_diff
            return 'Cursor mode activated'
    else:
        direction = _get_direction(data.nose_point, anchor)
        if direction is DIRECTION_UP:
            if mode is MODE_SCROLL:
                pyag.scroll(SCROLL)
                return "Scrolling Up"
            elif mode is MODE_CURSOR:
                pyag.moveRel(0, -VERTICAL_DRAG)
                return "Moving Up"
        elif direction is DIRECTION_DOWN:
            if mode is MODE_SCROLL:
                pyag.scroll(-SCROLL)
                return "Scrolling Down"
            elif mode is MODE_CURSOR:
                pyag.moveRel(0, VERTICAL_DRAG)
                return "Moving Down"
        elif direction is DIRECTION_LEFT:
            if mode is MODE_SCROLL:
                pyag.hscroll(-SCROLL)
                return "Scrolling Left"
            else:
                pyag.moveRel(-HORIZONTAL_DRAG, 0)
                return "Moving Left"
        elif direction is DIRECTION_RIGHT:
            if mode is MODE_SCROLL:
                pyag.hscroll(SCROLL)
                return "Scrolling Right"
            else:
                pyag.moveRel(HORIZONTAL_DRAG, 0)
                return "Moving Right"

    if action == previous_action or \
            (previous_action is not analyser.ACTION_NONE and action is not analyser.ACTION_NONE):
        return None

    previous_action = action


    if action is analyser.ACTION_SQUINT:
        if mode is MODE_CURSOR:
            mode = MODE_SCROLL
            return 'Scroll mode activated'
        elif mode is MODE_SCROLL:
            mode = MODE_CURSOR
            return 'Cursor mode activated'
        return None
    elif action is analyser.ACTION_OPEN_MOUTH:
        mode = None
        anchor = None
        return 'Controller Deactivated'
    elif action is analyser.ACTION_LEFT_WINK:
        if mode is not None:
            pyag.click(button="left")
            
            return "Left Click"
    elif action is analyser.ACTION_RIGHT_WINK:
        if mode is not None:
            pyag.click(button="right")
            
            return "Right Click"
    else:
        return None
