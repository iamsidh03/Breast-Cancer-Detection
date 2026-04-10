from PIL import Image
import numpy as np
import cv2

# FILE VALIDATION
def validate_file(file_path):
    allowed = ["jpg", "jpeg", "png"]
    if not file_path.lower().endswith(tuple(allowed)):
        return False, "Only JPG/PNG images allowed"
    return True, None


#  IMAGE QUALITY CHECK
def check_image_quality(file_path):
    img = cv2.imread(file_path)

    if img is None:
        return False, "Invalid image file"

    h, w, _ = img.shape
    if h < 100 or w < 100:
        return False, "Image too small"

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    variance = cv2.Laplacian(gray, cv2.CV_64F).var()

    if variance < 50:
        return False, "Image is too blurry"

    return True, None


#   HISTOPATHOLOGY CHECK
def check_histopathology_pattern(file_path):
    img = Image.open(file_path).convert("RGB")
    img = np.array(img)

    hsv = cv2.cvtColor(img, cv2.COLOR_RGB2HSV)

    lower = np.array([110, 40, 40])
    upper = np.array([180, 255, 255])

    mask = cv2.inRange(hsv, lower, upper)

    ratio = np.sum(mask > 0) / (img.shape[0] * img.shape[1])

    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    texture = cv2.Laplacian(gray, cv2.CV_64F).var()

    if ratio < 0.03 and texture < 20:
        return False, "Not a histopathology image"

    return True, None