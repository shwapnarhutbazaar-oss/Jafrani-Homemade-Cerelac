FROM index.docker.io/google/gtm-cloud-image:stable
ENV PORT=10000
CMD ["/gtm_server"]
