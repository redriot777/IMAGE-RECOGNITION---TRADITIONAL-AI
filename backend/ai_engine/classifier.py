from ai_engine.preprocessing import preprocess_image
from ai_engine.feature_extraction import extract_features
from ai_engine.knowledge_base import generate_facts, get_initial_working_memory
from ai_engine.inference_engine import run_forward_chaining
from ai_engine.explanation import generate_explanation, get_final_classification

def run_traditional_ai_pipeline(filepath, file_id):
    # 1. Preprocessing
    prep_result = preprocess_image(filepath, file_id)
    
    # 2. Feature Extraction
    features = extract_features(prep_result["images"])
    
    # 3. Knowledge Base
    facts = generate_facts(features)
    initial_wm = get_initial_working_memory(facts)
    
    # 4. Inference Engine
    inference_result = run_forward_chaining(initial_wm)
    
    # 5. Classification & Explanation
    classification = get_final_classification(inference_result["fired_rules"])
    explanation = generate_explanation(features, inference_result["trace"], classification["primary"])
    
    return {
        "preprocessing_urls": prep_result["urls"],
        "features": features,
        "facts": facts,
        "working_memory": inference_result["working_memory"],
        "trace": inference_result["trace"],
        "fired_rules": inference_result["fired_rules"],
        "failed_rules": inference_result["failed_rules"],
        "all_rules": inference_result["all_rules"],
        "classification": classification,
        "explanation": explanation
    }
