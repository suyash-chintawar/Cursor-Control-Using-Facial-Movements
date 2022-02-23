import cv2
import numpy as np

import controller


COLOR_WHITE = (255, 255, 255)
COLOR_YELLOW = (0, 255, 255)
COLOR_RED = (0, 0, 255)
COLOR_GREEN = (0, 255, 0)
COLOR_BLUE = (255, 0, 0)
COLOR_BLACK = (0, 0, 0)


W, H = 60, 35

def mode_to_str(mode):
    if mode is controller.MODE_SCROLL:
        return 'Scroll Mode'
    elif mode is controller.MODE_CURSOR:
        return 'Cursor Mode'
    elif mode is controller.MODE_TEAMS:
        return 'Teams Mode'
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

        for (x, y) in np.concatenate((data.mouth, data.left_eye, data.right_eye), axis=0):
            cv2.circle(frame, (x, y), 2, COLOR_GREEN, -1)

        if anchor is not None:
            x, y = anchor
            cv2.rectangle(frame, (x - W, y - H), (x + W, y + H), COLOR_GREEN, 2)
            cv2.line(frame, anchor, data.nose_point, COLOR_BLUE, 2)

    cv2.putText(frame, mode_str, (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, COLOR_RED, 2)
    cv2.putText(frame, message, (10, 120), cv2.FONT_HERSHEY_SIMPLEX, 0.7, COLOR_RED, 2)

    if controller.is_mode_selection:
        other_modes = controller.get_other_modes()
        modes_str = f"Left = {mode_to_str(other_modes[0])} | Right = {mode_to_str(other_modes[1])}"
        cv2.putText(frame, modes_str, (10, 180), cv2.FONT_HERSHEY_SIMPLEX, 0.7, COLOR_RED, 2)

    cv2.imshow("Frame", frame)


def destroy_all_windows():
    cv2.destroyAllWindows()
