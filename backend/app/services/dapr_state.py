import httpx

DAPR_STATE_URL = "http://localhost:3500/v1.0/state/statestore"


def get_state(key: str):
    response = httpx.get(f"{DAPR_STATE_URL}/{key}", timeout=10)

    if response.status_code == 204 or not response.text:
        return None

    response.raise_for_status()
    return response.json()


def save_state(key: str, value):
    response = httpx.post(
        DAPR_STATE_URL,
        json=[{"key": key, "value": value}],
        timeout=10,
    )
    response.raise_for_status()


def delete_state(key: str):
    response = httpx.delete(f"{DAPR_STATE_URL}/{key}", timeout=10)

    if response.status_code not in [200, 204]:
        response.raise_for_status()