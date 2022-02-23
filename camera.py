import cv2
import imutils


W = 640
H = 480

_vid = None


def init_camera():
    global _vid
    _vid = cv2.VideoCapture(0)


def destroy_camera():
    global _vid
    if _vid is not None:
        _vid.release()


def read_frame():
    global _vid
    if _vid is None:
        return None

    key = cv2.waitKey(1) & 0xFF
    if key == ord("q"):
        return None
    _, frame = _vid.read()
    return imutils.resize(cv2.flip(frame, 1), width=W, height=H)
