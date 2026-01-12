FROM public.ecr.aws/google-tag-manager/gtm-cloud-image:latest
ENV PORT=10000
CMD ["/gtm_server"]
