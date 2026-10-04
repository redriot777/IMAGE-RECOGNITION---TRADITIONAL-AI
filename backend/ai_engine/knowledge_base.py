def generate_facts(features):
    facts = []
    
    def add_fact(fact_id, fact_name, source, value, threshold, condition_str):
        facts.append({
            "id": fact_id,
            "fact": fact_name,
            "source": source,
            "value": value,
            "threshold": threshold,
            "condition": condition_str,
            "status": "ACTIVE"
        })

    # Brightness facts
    b = features["average_brightness"]
    if b > 0.6: add_fact("F01", "brightness_is_high", "Average Brightness", b, 0.6, "> 0.6")
    elif b < 0.35: add_fact("F02", "brightness_is_low", "Average Brightness", b, 0.35, "< 0.35")
    else: add_fact("F03", "brightness_is_medium", "Average Brightness", b, "0.35 - 0.6", "between 0.35 and 0.6")

    # Dark Pixel Ratio facts
    dpr = features["dark_pixel_ratio"]
    if dpr > 0.5: add_fact("F04", "dark_pixel_ratio_is_high", "Dark Pixel Ratio", dpr, 0.5, "> 0.5")
    elif dpr < 0.2: add_fact("F05", "dark_pixel_ratio_is_low", "Dark Pixel Ratio", dpr, 0.2, "< 0.2")
    else: add_fact("F06", "dark_pixel_ratio_is_medium", "Dark Pixel Ratio", dpr, "0.2 - 0.5", "between 0.2 and 0.5")

    # Edge Density facts
    ed = features["edge_density"]
    if ed > 0.15: add_fact("F07", "edge_density_is_high", "Edge Density", ed, 0.15, "> 0.15")
    elif ed < 0.05: add_fact("F08", "edge_density_is_low", "Edge Density", ed, 0.05, "< 0.05")
    else: add_fact("F09", "edge_density_is_medium", "Edge Density", ed, "0.05 - 0.15", "between 0.05 and 0.15")

    # Contrast facts
    c = features["overall_contrast"]
    if c > 0.7: add_fact("F10", "contrast_is_high", "Overall Contrast", c, 0.7, "> 0.7")
    elif c < 0.3: add_fact("F11", "contrast_is_low", "Overall Contrast", c, 0.3, "< 0.3")

    # Spatial facts
    top = features["top_region_brightness"]
    if top > 0.6: add_fact("F12", "top_is_bright", "Top Region Brightness", top, 0.6, "> 0.6")
    elif top < 0.35: add_fact("F13", "top_is_dark", "Top Region Brightness", top, 0.35, "< 0.35")
    
    center = features["center_brightness"]
    if center > 0.6: add_fact("F14", "center_is_bright", "Center Brightness", center, 0.6, "> 0.6")
    elif center < 0.35: add_fact("F15", "center_is_dark", "Center Brightness", center, 0.35, "< 0.35")
    
    bottom = features["bottom_region_brightness"]
    if bottom > 0.6: add_fact("F16", "bottom_is_bright", "Bottom Region Brightness", bottom, 0.6, "> 0.6")
    elif bottom < 0.35: add_fact("F17", "bottom_is_dark", "Bottom Region Brightness", bottom, 0.35, "< 0.35")

    border = features["border_brightness"]
    if border > 0.6: add_fact("F18", "border_is_bright", "Border Brightness", border, 0.6, "> 0.6")
    elif border < 0.35: add_fact("F19", "border_is_dark", "Border Brightness", border, 0.35, "< 0.35")

    # Structural facts
    he = features["horizontal_edge_density"]
    ve = features["vertical_edge_density"]
    
    if he > 0.1: add_fact("F20", "horizontal_edges_high", "Horizontal Edge Density", he, 0.1, "> 0.1")
    if ve > 0.1: add_fact("F21", "vertical_edges_high", "Vertical Edge Density", ve, 0.1, "> 0.1")
    
    if he > 0.1 and ve > 0.1: add_fact("F22", "structure_is_dense", "Horizontal/Vertical Edges", min(he, ve), 0.1, "both > 0.1")
    if he < 0.05 and ve < 0.05: add_fact("F23", "structure_is_sparse", "Horizontal/Vertical Edges", max(he, ve), 0.05, "both < 0.05")

    return facts

def get_initial_working_memory(facts):
    return [f["fact"] for f in facts]
