FROM python:3.4

# RUN apt-get install -y libpq-dev python-dev

RUN mkdir /code
WORKDIR /code
ADD ./requirements.txt /code/
RUN pip install -r requirements.txt
