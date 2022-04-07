import cv2
import numpy as np

import controller


COLOR_WHITE = (255, 255, 255)
COLOR_YELLOW = (0, 255, 255)
COLOR_RED = (0, 0, 255)
COLOR_GREEN = (0, 255, 0)
COLOR_BLUE = (255, 0, 0)
COLOR_BLACK = (0, 0, 0)


W, H = 45, 35


def mode_to_str(mode):
    if mode is controller.MODE_SCROLL:
        return 'Scroll Mode'
    elif mode is controller.MODE_CURSOR:
        return 'Cursor Mode'
    # elif mode is controller.MODE_TEAMS:
    #     return 'Teams Mode'
    else:
        return ''


def show(frame, data, mode, message, anchor):
    mode_str = mode_to_str(mode)

    if message is None:
        message = ''

    if data is not None:
        mouth_hull = cv2.convexHull(data.mouth)
        left_eye_hull = cv2.convexHull(data.left_eye)
        right_eye_hull = cv2.convexHull(data.right_eye)
        cv2.drawContours(frame, [mouth_hull], -1, COLOR_YELLOW, 1)
        cv2.drawContours(frame, [left_eye_hull], -1, COLOR_YELLOW, 1)
        cv2.drawContours(frame, [right_eye_hull], -1, COLOR_YELLOW, 1)

        for i in range(1, len(data.left_eyebrow)):
            cv2.line(frame, tuple(data.left_eyebrow[i-1]), tuple(data.left_eyebrow[i]), COLOR_YELLOW)

        for i in range(1, len(data.right_eyebrow)):
            cv2.line(frame, tuple(data.right_eyebrow[i-1]), tuple(data.right_eyebrow[i]), COLOR_YELLOW)

        for (x, y) in np.concatenate((data.mouth, data.left_eye, data.right_eye, data.left_eyebrow, data.right_eyebrow), axis=0):
            cv2.circle(frame, (x, y), 2, COLOR_GREEN, -1)

        if anchor is not None:
            x, y = anchor
            cv2.rectangle(frame, (x - W, y - H), (x + W, y + H), COLOR_GREEN, 2)
            cv2.line(frame, anchor, data.nose_point, COLOR_BLUE, 2)

    if mode_str is not '':
        cv2.putText(frame, mode_str.upper(), (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, COLOR_RED, 2)
        

        if mode_str == 'Cursor Mode':
            cv2.putText(frame, '   left wink : left click', (370, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, COLOR_YELLOW, 2)
            cv2.putText(frame, 'right wink : right click', (370, 70), cv2.FONT_HERSHEY_SIMPLEX, 0.7, COLOR_YELLOW, 2)
            cv2.putText(frame, 'Squint and open mouth for scrolling', (10, 450), cv2.FONT_HERSHEY_SIMPLEX, 0.7, COLOR_YELLOW, 2)
        elif mode_str=='Scroll Mode':
            cv2.putText(frame, 'Squint and open mouth for cursor movement', (10, 450), cv2.FONT_HERSHEY_SIMPLEX, 0.7, COLOR_YELLOW, 2)
        # elif mode_str == 'Teams Mode':
        #     cv2.putText(frame, 'left wink : toggle video ', (400, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, COLOR_BLACK, 2)
        #     cv2.putText(frame, 'right wink : toggle mic', (400, 100), cv2.FONT_HERSHEY_SIMPLEX, 0.7, COLOR_BLACK, 2)
    else:
        cv2.putText(frame, 'LOOK INTO THE CAMERA!', (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, COLOR_RED, 2)
        cv2.putText(frame, 'OPEN MOUTH TO START SYSTEM', (10, 90), cv2.FONT_HERSHEY_SIMPLEX, 0.7, COLOR_RED, 2)
    cv2.putText(frame, message, (10, 120), cv2.FONT_HERSHEY_SIMPLEX, 0.7, COLOR_RED, 2)

    # if controller.is_mode_selection:
    #     other_modes = controller.get_other_modes()
    #     if other_modes is not None:
    #         modes_str = f"Left = {mode_to_str(other_modes[0])} | Right = {mode_to_str(other_modes[1])}"
    #         cv2.putText(frame, modes_str, (10, 400), cv2.FONT_HERSHEY_SIMPLEX, 0.7, COLOR_RED, 2)

    # cv2.imshow("Frame", frame)
    return frame


def destroy_all_windows():
    cv2.destroyAllWindows()