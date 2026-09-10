# Careflux Student Decision System

The Product Architecture Lab treats decision rules as first-class product artifacts. Rules must be inspectable before they become software behavior.

Each rule has a priority, stage, condition, action, rationale, and validation status.

Actions are limited to continue, human review, or stop. This layer is not a clinical guideline and does not contain treatment instructions.

## Next design target

The next iteration should turn the rule registry into a scenario simulator: provide structured inputs, show which rules fire in priority order, and expose the resulting state without presenting it as a clinical recommendation.
