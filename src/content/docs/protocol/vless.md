---
title: VLESS
---

VLESS is a lightweight, simplified version of VMess. It does not include its own encryption layer and relies on the transport layer (typically TLS) for security.

## Network Support

- **TCP**: Supported natively.
- **UDP**: Supported via **UDP over Stream**.
    - **NAT Type**: **Symmetric NAT**. Similar to VMess, the current implementation maps one session to one remote destination.

### Configuration

VLESS configuration is very minimal:

*   **Address**: The IP or hostname of the server.
*   **Port**: The server port.
*   **UUID**: Your unique user ID for authentication.

### Example Configuration

```json
{
  "name": "My VLESS Server",
  "protocols": [
    {
      "simple": {
        "host": "vless.example.com",
        "port": 443
      }
    },
    {
      "tls": {
        "enable": true,
        "servernames": ["vless.example.com"]
      }
    },
    {
      "vless": {
        "uuid": "YOUR-UUID-HERE"
      }
    }
  ]
}
```

### Developer Details

#### Implementation
VLESS in `yuhaiin` is implemented as a thin wrapper. Since it has no internal encryption, it **must** be used with TLS or another secure transport to protect the traffic and the UUID.

#### Protocol Structure
VLESS sends a 1-byte version (0), followed by the 16-byte UUID, a 1-byte command (1 for TCP, 2 for UDP), and then the destination address and port.