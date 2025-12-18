# BeakNet Public API

## GET /api/latest

Returns latest indoor and outdoor sensor data.

### Authentication

None (public, read-only)

### Response example

```json
{
  "timestamp": "...",
  "indoor": {
    "temperature": 22,
    "humidity": 42
  },
  "outdoor": {
    "temperature": 22.1,
    "humidity": 39.9
  }
}
