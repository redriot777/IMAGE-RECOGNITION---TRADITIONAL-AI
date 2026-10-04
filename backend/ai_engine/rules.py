def get_rules():
    return [
        {
            "id": "R01",
            "conditions": ["brightness_is_high", "dark_pixel_ratio_is_low"],
            "conclusion": "scene_is_daylight",
            "explanation": "High overall brightness combined with a low proportion of dark pixels supports a daylight-like scene classification.",
            "category": "DAYLIGHT-LIKE",
            "priority": 2
        },
        {
            "id": "R02",
            "conditions": ["brightness_is_low", "dark_pixel_ratio_is_high"],
            "conclusion": "scene_is_night",
            "explanation": "Low overall brightness combined with a high proportion of dark pixels supports a night-like scene classification.",
            "category": "NIGHT-LIKE",
            "priority": 2
        },
        {
            "id": "R03",
            "conditions": ["brightness_is_high", "contrast_is_low"],
            "conclusion": "scene_is_bright",
            "explanation": "High brightness with low contrast suggests a uniformly bright scene (e.g., snow or overexposed).",
            "category": "BRIGHT SCENE",
            "priority": 1
        },
        {
            "id": "R04",
            "conditions": ["contrast_is_high", "edge_density_is_high"],
            "conclusion": "scene_is_high_contrast",
            "explanation": "High contrast and many edges indicate a visually busy and well-defined scene.",
            "category": "HIGH-CONTRAST SCENE",
            "priority": 1
        },
        {
            "id": "R05",
            "conditions": ["contrast_is_low", "edge_density_is_low"],
            "conclusion": "scene_is_low_contrast",
            "explanation": "Low contrast and few edges indicate a flat or minimal scene.",
            "category": "LOW-CONTRAST SCENE",
            "priority": 1
        },
        {
            "id": "R06",
            "conditions": ["edge_density_is_high", "vertical_edges_high"],
            "conclusion": "scene_is_structural",
            "explanation": "High edge density with strong vertical components suggests man-made structures or buildings.",
            "category": "STRUCTURAL SCENE",
            "priority": 2
        },
        {
            "id": "R07",
            "conditions": ["edge_density_is_high", "horizontal_edges_high"],
            "conclusion": "scene_is_textured",
            "explanation": "High edge density with strong horizontal components suggests textured surfaces like fields, water ripples, or landscapes.",
            "category": "TEXTURED SCENE",
            "priority": 2
        },
        {
            "id": "R08",
            "conditions": ["edge_density_is_low", "center_is_bright"],
            "conclusion": "scene_is_open",
            "explanation": "Low edge density with a bright center suggests an open natural scene, possibly looking at the sky.",
            "category": "OPEN/NATURAL-LIKE SCENE",
            "priority": 2
        },
        {
            "id": "R09",
            "conditions": ["structure_is_dense", "contrast_is_high"],
            "conclusion": "scene_is_complex_indoor",
            "explanation": "Dense structures with high contrast typically indicate complex indoor environments with artificial lighting.",
            "category": "INDOOR-LIKE",
            "priority": 2
        },
        {
            "id": "R10",
            "conditions": ["brightness_is_medium", "top_is_bright", "bottom_is_dark"],
            "conclusion": "scene_is_outdoor_horizon",
            "explanation": "A bright top half (sky) and dark bottom half (ground) is a classic outdoor horizon pattern.",
            "category": "OUTDOOR-LIKE",
            "priority": 3
        },
        {
            "id": "R11",
            "conditions": ["brightness_is_low", "center_is_bright", "border_is_dark"],
            "conclusion": "scene_is_spotlit",
            "explanation": "A bright center surrounded by dark borders indicates a spotlit object or scene.",
            "category": "DARK SCENE",
            "priority": 2
        },
        {
            "id": "R12",
            "conditions": ["top_is_bright", "contrast_is_high", "edge_density_is_low"],
            "conclusion": "scene_is_sunset",
            "explanation": "A bright top, high contrast, and low edge density forms a sunset/sunrise-like visual pattern.",
            "category": "SUNSET/SUNRISE-LIKE",
            "priority": 3
        },
        {
            "id": "R13",
            "conditions": ["structure_is_sparse", "brightness_is_high"],
            "conclusion": "scene_is_minimal",
            "explanation": "Sparse structure combined with high brightness indicates a minimal or empty scene.",
            "category": "MINIMAL/LOW-DETAIL SCENE",
            "priority": 1
        },
        {
            "id": "R14",
            "conditions": ["brightness_is_medium", "structure_is_dense"],
            "conclusion": "scene_is_indoor",
            "explanation": "Moderate brightness and dense structure suggests an indoor environment with various objects and walls.",
            "category": "INDOOR-LIKE",
            "priority": 2
        },
        {
            "id": "R15",
            "conditions": ["horizontal_edges_high", "top_is_bright", "bottom_is_dark"],
            "conclusion": "scene_is_landscape",
            "explanation": "Strong horizontal edges with a bright sky and dark ground strongly suggest an outdoor landscape.",
            "category": "OUTDOOR-LIKE",
            "priority": 3
        },
        {
            "id": "R16",
            "conditions": ["contrast_is_low", "brightness_is_low"],
            "conclusion": "scene_is_very_dark",
            "explanation": "Low contrast and low brightness indicates an underexposed or very dark scene.",
            "category": "DARK SCENE",
            "priority": 1
        },
        {
            "id": "R17",
            "conditions": ["edge_density_is_high", "contrast_is_low"],
            "conclusion": "scene_is_foggy",
            "explanation": "High edges but low contrast can indicate a foggy or hazy environment.",
            "category": "LOW-CONTRAST SCENE",
            "priority": 2
        },
        {
            "id": "R18",
            "conditions": ["top_is_dark", "bottom_is_bright"],
            "conclusion": "scene_is_indoor_floor",
            "explanation": "A dark top and bright bottom is unusual outdoors, typically indicating an indoor view looking down at a lit floor.",
            "category": "INDOOR-LIKE",
            "priority": 2
        },
        {
            "id": "R19",
            "conditions": ["center_is_dark", "border_is_bright"],
            "conclusion": "scene_is_silhouetted",
            "explanation": "A dark center with bright borders indicates a silhouetted object against a bright background.",
            "category": "HIGH-CONTRAST SCENE",
            "priority": 2
        },
        {
            "id": "R20",
            "conditions": ["brightness_is_medium", "edge_density_is_medium", "contrast_is_high"],
            "conclusion": "scene_is_balanced_complex",
            "explanation": "Medium brightness and edges with high contrast indicates a balanced but visually complex scene.",
            "category": "TEXTURED SCENE",
            "priority": 1
        }
    ]
