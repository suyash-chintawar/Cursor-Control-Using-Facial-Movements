import cv2
import numpy as np
from imutils import face_utils
import dlib

from collections import namedtuple


def _eye_aspect_ratio(eye_landmarks):
    # Compute the euclidean distances between the two sets of
    # vertical eye landmarks (x, y)-coordinates
    a = np.linalg.norm(eye_landmarks[1] - eye_landmarks[5])
    b = np.linalg.norm(eye_landmarks[2] - eye_landmarks[4])

    # Compute the euclidean distance between the horizontal
    # eye landmark (x, y)-coordinates
    c = np.linalg.norm(eye_landmarks[0] - eye_landmarks[3])

    return (a + b) / (2.0 * c)


def _mouth_aspect_ratio(mouth_landmarks):
    # Compute the euclidean distances between the three sets
    # of vertical mouth landmarks (x, y)-coordinates
    a = np.linalg.norm(mouth_landmarks[13] - mouth_landmarks[19])
    b = np.linalg.norm(mouth_landmarks[14] - mouth_landmarks[18])
    c = np.linalg.norm(mouth_landmarks[15] - mouth_landmarks[17])

    # Compute the euclidean distance between the horizontal
    # mouth landmarks (x, y)-coordinates
    d = np.linalg.norm(mouth_landmarks[12] - mouth_landmarks[16])

    return (a + b + c) / (2 * d)


FaceData = namedtuple("FaceData", "shape mouth "
                                  "left_eye "
                                  "right_eye "
                                  "mouth_aspect_ratio "
                                  "left_eye_aspect_ratio "
                                  "right_eye_aspect_ratio "
                                  "eye_aspect_ratio "
                                  "eye_aspect_ratio_diff "
                                  "nose_point")


DLIB_SHAPE_PREDICTOR = "model/shape_predictor_68_face_landmarks.dat"
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(DLIB_SHAPE_PREDICTOR)


def _get_shape(frame):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    rects = detector(gray, 0)

    if len(rects) == 0:
        return None
    else:
        rect = rects[0]
        return face_utils.shape_to_np(predictor(gray, rect))


def get_data(frame):
    shape = _get_shape(frame)
    if shape is None:
        return None

    mouth = shape[slice(*face_utils.FACIAL_LANDMARKS_IDXS["mouth"])]
    nose = shape[slice(*face_utils.FACIAL_LANDMARKS_IDXS["nose"])]

    # intentionally flipped
    right_eye = shape[slice(*face_utils.FACIAL_LANDMARKS_IDXS["left_eye"])]
    left_eye = shape[slice(*face_utils.FACIAL_LANDMARKS_IDXS["right_eye"])]

    mouth_aspect_ratio = _mouth_aspect_ratio(mouth)
    left_eye_aspect_ratio = _eye_aspect_ratio(left_eye)
    right_eye_aspect_ratio = _eye_aspect_ratio(right_eye)
    eye_aspect_ratio = (left_eye_aspect_ratio + right_eye_aspect_ratio) / 2
    eye_aspect_ratio_diff = abs(left_eye_aspect_ratio - right_eye_aspect_ratio)

    return FaceData(shape=shape,
                    mouth=mouth,
                    left_eye=left_eye,
                    right_eye=right_eye,
                    mouth_aspect_ratio=mouth_aspect_ratio,
                    left_eye_aspect_ratio=left_eye_aspect_ratio,
                    right_eye_aspect_ratio=right_eye_aspect_ratio,
                    eye_aspect_ratio=eye_aspect_ratio,
                    eye_aspect_ratio_diff=eye_aspect_ratio_diff,
                    nose_point=(nose[3, 0], nose[3, 1]))