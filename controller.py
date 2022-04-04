import pyautogui as pyag

import face_analyser as analyser


DIRECTION_UP = 1
DIRECTION_LEFT = 2
DIRECTION_DOWN = 3
DIRECTION_RIGHT = 4


MODE_CURSOR = 2
MODE_SCROLL = 3
# MODE_TEAMS = 4


def _get_direction(nose_point, anchor_point, w=35, h=35, multiple=1):
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
# is_mode_selection = False
anchor = None
previous_action = None
HORIZONTAL_DRAG = 25
VERTICAL_DRAG = 15
SCROLL = 5

# def get_other_modes():
#     if mode is MODE_CURSOR:
#         return [MODE_SCROLL, MODE_TEAMS]
#     elif mode is MODE_SCROLL:
#         return [MODE_CURSOR, MODE_TEAMS]
    # elif mode is MODE_TEAMS:
    #     return [MODE_CURSOR, MODE_SCROLL]


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

    # if is_mode_selection:
    #     other_modes = get_other_modes()
    #     if action is analyser.ACTION_LEFT_WINK:
    #         is_mode_selection = False
    #         mode = other_modes[0]
    #         return "Selected Option 1"
    #     elif action is analyser.ACTION_RIGHT_WINK:
    #         is_mode_selection = False
    #         mode = other_modes[1]
    #         return "Selected Option 2"
    #     return None

    if action is analyser.ACTION_SQUINT:
        # if not is_mode_selection:
        #     is_mode_selection = True
        #     return 'Switched to Selection Mode'
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
        # if mode is MODE_TEAMS:
        #     pyag.hotkey("ctrl", "shift", "o")
        #     print("Toggle Camera")
        #     return "Toggle Camera"
        if mode is not None:
            pyag.click(button="left")
            print('Left Click')
            return "Left Click"
    elif action is analyser.ACTION_RIGHT_WINK:
        # if mode is MODE_TEAMS:
        #     pyag.hotkey("ctrl", "shift", "m")
        #     print("Toggle Mic")
        #     return "Toggle Mic"
        if mode is not None:
            pyag.click(button="right")
            print('Right Click')
            return "Right Click"
    else:
        return None
