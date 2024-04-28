FROM pypy:3.10-7-slim as base

ENV PYTHONUNBUFFERED 1

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get -y upgrade

RUN pip install virtualenv
ENV PATH="/venv/bin:$PATH"
RUN virtualenv /venv

FROM base as builder

RUN apt-get -y install --no-install-recommends syslog-ng postgresql build-essential libpq-dev

WORKDIR /venv
RUN /bin/bash -c "source /venv/bin/activate"
COPY requirements.txt /venv/requirements.txt
RUN pip install -r requirements.txt --no-cache-dir

RUN rm /venv/requirements.txt

WORKDIR /ats

COPY . .

RUN python -m compileall . -b
RUN find . -name "*.py" -exec rm -rf {} \;

RUN rm requirements.txt
RUN rm Dockerfile

FROM base as packager

RUN apt-get -y install --no-install-recommends libpq-dev postgresql-client postgresql-client-common

RUN mkdir /ats

COPY --from=builder /venv /venv
COPY --from=builder /ats /ats

WORKDIR /ats
RUN /bin/bash -c "source /venv/bin/activate"


RUN python manage.pyc collectstatic --noinput

ENV WEB_CONCURRENCY 5
ENV PORT 8000
ENV MAX_REQUESTS 1000
ENV MAX_REQUESTS_JITTER 50
ENV WORKER_CONNECTIONS 10000
ENV TIMEOUT 30
EXPOSE $PORT

CMD gunicorn --timeout $TIMEOUT --worker-connections $WORKER_CONNECTIONS --max-requests $MAX_REQUESTS --max-requests-jitter $MAX_REQUESTS_JITTER --workers $WEB_CONCURRENCY -b [::]:$PORT --log-level=error ats.wsgi