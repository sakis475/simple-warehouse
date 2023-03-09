FROM postgres:15.2

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres

COPY ./scripts/create_dbs.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
