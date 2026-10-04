import numpy as np
import cv2

def extract_features(images):
    gray = images["gray"]
    edges = images["edges"]
    
    h, w = gray.shape
    total_pixels = h * w
    
    # A. INTENSITY FEATURES
    average_brightness = np.mean(gray) / 255.0
    min_intensity = np.min(gray) / 255.0
    max_intensity = np.max(gray) / 255.0
    
    bright_pixels = np.sum(gray > 180)
    dark_pixels = np.sum(gray < 75)
    
    bright_pixel_ratio = bright_pixels / total_pixels
    dark_pixel_ratio = dark_pixels / total_pixels
    intensity_std = np.std(gray) / 255.0
    
    # B. CONTRAST FEATURES
    overall_contrast = max_intensity - min_intensity
    
    # C. STRUCTURAL FEATURES
    edge_density = np.sum(edges > 0) / total_pixels
    
    # Calculate horizontal and vertical edge density using Sobel
    sobel_x = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
    sobel_y = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)
    
    horiz_edges = np.sum(np.abs(sobel_y) > 100) / total_pixels
    vert_edges = np.sum(np.abs(sobel_x) > 100) / total_pixels
    
    # D. SPATIAL FEATURES (3x3 grid)
    cell_h, cell_w = h // 3, w // 3
    
    grid = {}
    regions = ["top_left", "top_center", "top_right", 
               "middle_left", "center", "middle_right", 
               "bottom_left", "bottom_center", "bottom_right"]
               
    idx = 0
    for r in range(3):
        for c in range(3):
            cell = gray[r*cell_h:(r+1)*cell_h, c*cell_w:(c+1)*cell_w]
            grid[regions[idx]] = np.mean(cell) / 255.0
            idx += 1
            
    top_region_brightness = (grid["top_left"] + grid["top_center"] + grid["top_right"]) / 3
    middle_region_brightness = (grid["middle_left"] + grid["center"] + grid["middle_right"]) / 3
    bottom_region_brightness = (grid["bottom_left"] + grid["bottom_center"] + grid["bottom_right"]) / 3
    center_brightness = grid["center"]
    
    border_brightness = (grid["top_left"] + grid["top_center"] + grid["top_right"] +
                         grid["bottom_left"] + grid["bottom_center"] + grid["bottom_right"] +
                         grid["middle_left"] + grid["middle_right"]) / 8
                         
    return {
        "average_brightness": float(average_brightness),
        "min_intensity": float(min_intensity),
        "max_intensity": float(max_intensity),
        "bright_pixel_ratio": float(bright_pixel_ratio),
        "dark_pixel_ratio": float(dark_pixel_ratio),
        "intensity_std": float(intensity_std),
        "overall_contrast": float(overall_contrast),
        "edge_density": float(edge_density),
        "horizontal_edge_density": float(horiz_edges),
        "vertical_edge_density": float(vert_edges),
        "spatial_grid": {k: float(v) for k, v in grid.items()},
        "top_region_brightness": float(top_region_brightness),
        "middle_region_brightness": float(middle_region_brightness),
        "bottom_region_brightness": float(bottom_region_brightness),
        "center_brightness": float(center_brightness),
        "border_brightness": float(border_brightness)
    }
