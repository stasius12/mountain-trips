FROM python:3

ENV PYTHONBUFFERED 1

COPY requirements.txt /

RUN pip install -r /requirements.txt && \
    pip install flake8

RUN mkdir /code
WORKDIR /code

COPY . /code/

EXPOSE 80