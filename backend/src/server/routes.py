from controllers.health import HealthCheck

ROUTES = [
    [HealthCheck, "/health"]
]