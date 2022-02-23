import camera
import controller
import face
import face_analyser
import window

if __name__ == '__main__':
    camera.init_camera()

    while True:
        frame = camera.read_frame()
        if frame is None:
            break

        data = face.get_data(frame)
        if data is not None:
            action = face_analyser.action(data)
            message = controller.perform(action, data)
        else:
            message = None

        window.show(frame, data, controller.mode, message, controller.anchor)

    camera.destroy_camera()
    window.destroy_all_windows()
