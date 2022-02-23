import controller

MOUTH_AR_THRESH = 0.5
MOUTH_CONSECUTIVE_THRESH = 15


EYE_AR_THRESH = 0.23
EYE_CONSECUTIVE_THRESH = 15


WINK_EYE_AR_THRESH = 0.19
WINK_EYE_AR_DIFF = 0.02
WINK_CONSECUTIVE_THRESH = 7


ACTION_NONE = 0
ACTION_OPEN_MOUTH = 1
ACTION_SQUINT = 2
ACTION_LEFT_WINK = 3
ACTION_RIGHT_WINK = 4


wink_counter = 0
eye_counter = 0
mouth_counter = 0


def action(data):
    global wink_counter, eye_counter, mouth_counter

    lBrow = data.left_eyebrow
    ylBrow = [point[1] for point in lBrow]
    avg_ylBrow = sum(ylBrow)/len(ylBrow)
    avg_ylEye = (data.left_eye[0][1]+data.left_eye[3][1])/2
    

    if data.eye_aspect_ratio_diff > WINK_EYE_AR_DIFF or \
            (controller.left_eye_brow_diff is not None and ((avg_ylEye-avg_ylBrow) - controller.left_eye_brow_diff >= 5)):
        if data.left_eye_aspect_ratio < data.right_eye_aspect_ratio:
            if data.left_eye_aspect_ratio < WINK_EYE_AR_THRESH:
                wink_counter += 1
                if wink_counter > WINK_CONSECUTIVE_THRESH:
                    return ACTION_LEFT_WINK
        elif data.right_eye_aspect_ratio < data.left_eye_aspect_ratio:
            if data.right_eye_aspect_ratio < WINK_EYE_AR_THRESH:
                wink_counter += 1
                if wink_counter > WINK_CONSECUTIVE_THRESH:
                    return ACTION_RIGHT_WINK
        else:
            wink_counter = 0
    else:
        wink_counter = 0

    if data.mouth_aspect_ratio > MOUTH_AR_THRESH:
        mouth_counter += 1
        if mouth_counter > MOUTH_CONSECUTIVE_THRESH:
            if data.eye_aspect_ratio <= EYE_AR_THRESH:
                eye_counter += 1
                if eye_counter > EYE_CONSECUTIVE_THRESH:
                    return ACTION_SQUINT
            else:
                return ACTION_OPEN_MOUTH
    else:
        mouth_counter = 0
        eye_counter = 0

    return ACTION_NONE
