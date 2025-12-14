# 1. Base Image: Use 3.12-slim to avoid the 3.13 compilation issues
FROM python:3.12-slim

# 2. Environment Variables
# PYTHONDONTWRITEBYTECODE: Prevents Python from writing .pyc files
# PYTHONUNBUFFERED: Ensures logs are flushed immediately (helpful for Render logs)
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# 3. Set the working directory inside the container
WORKDIR /backend

# 4. Install system dependencies
# We add gcc in case some packages (like older pydantic) still need to compile
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# 5. Install Python dependencies
# Copy requirements first to leverage Docker cache
COPY ./backend/requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# 6. Copy the application code
COPY ./backend .

# 7. Create a non-root user for security (Optional but recommended)
RUN useradd -m appuser && chown -R appuser /backend
USER appuser

# 8. Expose the port (Render uses standard env vars, but 8000 is common for Uvicorn)
EXPOSE 10000

# 9. Start the application
# IMPORTANT: Replace 'main:app' with your actual filename and app instance name
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "10000"]
