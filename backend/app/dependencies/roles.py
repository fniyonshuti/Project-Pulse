from fastapi import Request, HTTPException, Depends

def require_role(required_role: str):
    def role_checker(request: Request):
        user = request.state.user
        if user["role"] != required_role:
            raise HTTPException(status_code=403, detail="Forbidden: insufficient permissions")
    return role_checker
