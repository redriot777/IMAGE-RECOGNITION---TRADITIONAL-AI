import cv2
import os

def preprocess_image(filepath, file_id):
    original_img = cv2.imread(filepath)
    if original_img is None:
        raise ValueError("Could not read image file.")
        
    # Resize to 400x300
    resized_img = cv2.resize(original_img, (400, 300))
    
    # Grayscale
    gray_img = cv2.cvtColor(resized_img, cv2.COLOR_BGR2GRAY)
    
    # Gaussian Blur
    blurred_img = cv2.GaussianBlur(gray_img, (5, 5), 0)
    
    # Threshold Map
    _, thresh_img = cv2.threshold(blurred_img, 127, 255, cv2.THRESH_BINARY)
    
    # Canny Edge Map
    edges_img = cv2.Canny(blurred_img, 100, 200)
    
    # Save processed images
    base_dir = "uploads"
    urls = {}
    
    def save_and_url(img, suffix):
        name = f"{file_id}_{suffix}.jpg"
        path = os.path.join(base_dir, name)
        cv2.imwrite(path, img)
        return f"/{base_dir}/{name}"
        
    urls['original'] = f"/uploads/{os.path.basename(filepath)}"
    urls['resized'] = save_and_url(resized_img, "resized")
    urls['grayscale'] = save_and_url(gray_img, "gray")
    urls['blurred'] = save_and_url(blurred_img, "blur")
    urls['threshold'] = save_and_url(thresh_img, "thresh")
    urls['edges'] = save_and_url(edges_img, "edges")
    
    return {
        "urls": urls,
        "images": {
            "resized": resized_img,
            "gray": gray_img,
            "blurred": blurred_img,
            "threshold": thresh_img,
            "edges": edges_img
        }
    }
