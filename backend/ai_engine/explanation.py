def generate_explanation(features, trace, final_classification):
    exp = f"The system measured an average brightness of {features['average_brightness']:.2f}, "
    
    if "brightness_is_high" in [c["fact"] for s in trace for c in s.get("conditions", []) if c["satisfied"]]:
        exp += "which was classified as HIGH. "
    elif "brightness_is_low" in [c["fact"] for s in trace for c in s.get("conditions", []) if c["satisfied"]]:
        exp += "which was classified as LOW. "
    else:
        exp += "which was classified as MEDIUM. "
        
    exp += f"The dark pixel ratio was {features['dark_pixel_ratio']:.2f}. "
    exp += f"The edge density was {features['edge_density']:.2f}. "
    
    if len(trace) > 0:
        first_rule = trace[0]
        exp += f"These facts activated rule {first_rule['rule_id']}, which required "
        conds = [c["fact"] for c in first_rule["conditions"]]
        exp += " and ".join(conds).replace("_", " ") + ". "
        exp += f"The rule therefore added {first_rule['conclusion']} to working memory. "
        
        if len(trace) > 1:
            exp += f"Additional rules were evaluated before the final classification of {final_classification} was selected."
        else:
            exp += f"This led directly to the final classification of {final_classification}."
    else:
        exp += "No specific rules were fully satisfied by the extracted facts, leading to insufficient evidence for a strong classification."
        
    return exp

def get_final_classification(fired_rules):
    if not fired_rules:
        return {
            "primary": "UNKNOWN / INSUFFICIENT EVIDENCE",
            "support_level": "No support",
            "supporting": [],
            "score": "0/5"
        }
        
    # Sort rules by priority (highest first)
    sorted_rules = sorted(fired_rules, key=lambda r: r["priority"], reverse=True)
    
    primary = sorted_rules[0]["category"]
    
    support_score = len(fired_rules)
    if support_score >= 3:
        support_level = "Strong rule support"
        score = "5/5"
    elif support_score == 2:
        support_level = "Moderate rule support"
        score = "3/5"
    else:
        support_level = "Limited rule support"
        score = "1/5"
        
    supporting = list(set([r["category"] for r in sorted_rules[1:]]))
    
    return {
        "primary": primary,
        "support_level": support_level,
        "supporting": supporting,
        "score": score
    }
