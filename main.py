from numpy import False_
import camera
import controller
import face
import face_analyser
import window

import cv2
from flask import Flask, render_template, Response

app = Flask(__name__)
camera.init_camera()

FRAME_GAP = None

# if __name__ == '__main__': 
def main_func():
    # camera.init_camera()
    global FRAME_GAP
    while True:
        frame = camera.read_frame()
        if frame is None:
            break

        data = face.get_data(frame)

        message = None
        if data is not None:
            action = face_analyser.action(data)

            if FRAME_GAP is not None:
                FRAME_GAP+=1
                # print(FRAME_GAP)
                if FRAME_GAP >= 40:
                    FRAME_GAP = None
                if action is face_analyser.ACTION_OPEN_MOUTH:
                    continue

            if action is face_analyser.ACTION_LEFT_WINK or action is face_analyser.ACTION_RIGHT_WINK or action is face_analyser.ACTION_OPEN_MOUTH:
                if FRAME_GAP==None:
                    message = controller.perform(action, data)
                    FRAME_GAP = 0
                    continue
            else:
                message = controller.perform(action, data)

        window.show(frame, data, controller.mode, message, controller.anchor)
        cv2.imwrite('t.jpg', frame)
        yield b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + open('t.jpg', 'rb').read() + b'\r\n'

    # camera.destroy_camera()
    # window.destroy_all_windows()

@app.route('/')
@app.route('/home')
def index():
    """Video streaming"""
    return render_template('index.html')


@app.route('/search')
def search():
    return render_template('search.html')

@app.route('/availability')
def availability():
    return render_template('availability.html')
    
@app.route('/fares')
def fares():
    return render_template('fares.html')

@app.route('/video_feed')
def video_feed():
    """Video streaming route. Put this in the src attribute of an img tag."""
    return Response(main_func(),
                mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run()