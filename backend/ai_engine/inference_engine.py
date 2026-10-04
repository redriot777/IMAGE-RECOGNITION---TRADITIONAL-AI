from ai_engine.rules import get_rules

def run_forward_chaining(initial_facts):
    working_memory = set(initial_facts)
    rules = get_rules()
    
    trace = []
    fired_rules = []
    failed_rules = []
    
    step = 1
    new_facts_added = True
    
    # Store rule evaluation details to avoid re-evaluating fired rules
    fired_rule_ids = set()
    
    while new_facts_added:
        new_facts_added = False
        
        for rule in rules:
            if rule["id"] in fired_rule_ids:
                continue
                
            conditions_met = True
            condition_details = []
            
            for cond in rule["conditions"]:
                is_met = cond in working_memory
                condition_details.append({
                    "fact": cond,
                    "satisfied": is_met
                })
                if not is_met:
                    conditions_met = False
                    
            if conditions_met:
                working_memory.add(rule["conclusion"])
                fired_rule_ids.add(rule["id"])
                new_facts_added = True
                
                fired_rules.append(rule)
                
                trace.append({
                    "step": step,
                    "rule_id": rule["id"],
                    "conditions": condition_details,
                    "fired": True,
                    "conclusion": rule["conclusion"],
                    "explanation": rule["explanation"],
                    "category": rule["category"]
                })
                step += 1
            else:
                if step == 1: # Only record failures on the first pass for the UI
                    failed_rules.append({
                        "id": rule["id"],
                        "conditions": condition_details,
                        "explanation": f"Rule {rule['id']} was not fired because some conditions were not satisfied."
                    })
                    
    return {
        "working_memory": list(working_memory),
        "trace": trace,
        "fired_rules": fired_rules,
        "failed_rules": failed_rules,
        "all_rules": rules
    }
