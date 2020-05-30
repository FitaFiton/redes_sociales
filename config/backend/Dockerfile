FROM python:3.6
ENV PYTHONUNBUFFERED 1

COPY ./config/backend/entrypoint.sh .
COPY ./config/backend/requirements.txt .
RUN pip3 install --upgrade pip -r requirements.txt

