from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from app.security.auth_utils import decode_access_token

PUBLIC_PATHS = [
    "/auth/login",
    "/auth/register",
    "/docs",
    "/openapi.json"
]

class AuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):

        # Skip public routes
        for path in PUBLIC_PATHS:
            if request.url.path.startswith(path):
                return await call_next(request)

        # Get Authorization header
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return JSONResponse(
                status_code=401,
                content={"detail": "Authorization header missing"}
            )

        # Extract token ("Bearer <token>")
        parts = auth_header.split(" ")
        if len(parts) != 2 or parts[0].lower() != "bearer":
            return JSONResponse(
                status_code=401,
                content={"detail": "Invalid Authorization format"}
            )

        token = parts[1]

        # Decode JWT token
        try:
            payload = decode_access_token(token)
            request.state.user = payload  # Save user info in request
        except Exception:
            return JSONResponse(
                status_code=401,
                content={"detail": "Invalid or expired token"}
            )

        # Continue request
        response = await call_next(request)
        return response
