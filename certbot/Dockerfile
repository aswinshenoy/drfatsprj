FROM certbot/dns-cloudflare

# set working directory
WORKDIR /usr/src/app

# get CLOUDFLARE_API_TOKEN from environment variables
ARG CLOUDFLARE_API_TOKEN

# Create the cloudflare.ini file in the specified directory using environment variables
RUN mkdir -p .secrets/certbot/ && \
    echo "dns_cloudflare_api_token=${CLOUDFLARE_API_TOKEN}" > .secrets/certbot/cloudflare.ini \
    && chmod 600 .secrets/certbot/cloudflare.ini

RUN ls -la .secrets/certbot/
RUN cat .secrets/certbot/cloudflare.ini

# Define the default Certbot command using ENTRYPOINT and CMD
ENTRYPOINT ["certbot"]
CMD ["certonly", "-v", "--non-interactive", "--dns-cloudflare", "--dns-cloudflare-credentials", ".secrets/certbot/cloudflare.ini", "--email", "aswinshenoy65@gmail.com", "--agree-tos", "--no-eff-email", "-d", "apineu.com"]
